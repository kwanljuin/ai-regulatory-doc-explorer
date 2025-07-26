import {
  SECDocument,
  DocumentFilters,
  APIResponse,
  SECSubmissionsResponse,
} from "@/types";

const SEC_BASE_URL = "https://www.sec.gov/Archives/edgar";
const SEC_API_BASE = "https://data.sec.gov";

// Required headers for SEC API compliance
const SEC_HEADERS = {
  "User-Agent": "Regulatory Explorer v1.0 (contact@company.com)", // Required by SEC
  Accept: "application/json",
  Host: "data.sec.gov",
};

export class SECEdgarClient {
  private async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async searchDocuments(
    filters: DocumentFilters
  ): Promise<APIResponse<SECDocument[]>> {
    // Rate limit: SEC requires max 10 requests per second
    await this.delay(100);

    try {
      // Use the SEC's submissions endpoint to get recent filings
      const url = `${SEC_API_BASE}/submissions/CIK${filters.companyCIK}.json`;

      const response = await fetch(url, {
        headers: SEC_HEADERS,
      });

      if (!response.ok) {
        throw new Error(
          `SEC API error: ${response.status} ${response.statusText}`
        );
      }

      const data: SECSubmissionsResponse = await response.json();

      const documents = this.transformSECSubmissions(data, filters);

      return {
        data: documents,
        total: documents.length,
        hasMore:
          documents.length > (filters.offset || 0) + (filters.limit || 50),
      };
    } catch (error) {
      console.error("SEC API Error:", error);
      throw new Error("Failed to fetch SEC documents");
    }
  }

  async getDocumentContent(accessionNumber: string): Promise<string> {
    await this.delay(100);

    try {
      // Extract CIK from accession number (first 10 digits, remove leading zeros)
      const cik = accessionNumber.substring(0, 10).replace(/^0+/, "");

      // Format accession number for URL (remove dashes)
      const formattedAccession = accessionNumber.replace(/-/g, "");

      const url = `${SEC_BASE_URL}/data/${cik}/${formattedAccession}/${accessionNumber}.txt`;

      const response = await fetch(url, {
        headers: {
          "User-Agent": "Regulatory Explorer v1.0 (contact@yourcompany.com)",
        },
      });

      if (!response.ok) {
        throw new Error(`Document fetch error: ${response.status}`);
      }

      const content = await response.text();

      // Extract meaningful content from SEC document format
      return this.extractDocumentText(content);
    } catch (error) {
      console.error("Document fetch error:", error);
      throw new Error("Failed to fetch document content");
    }
  }

  private transformSECSubmissions(
    data: SECSubmissionsResponse,
    filters: DocumentFilters
  ): SECDocument[] {
    const filings = data.filings?.recent || {};
    const forms = filings.form || [];

    return forms
      .map((form: string, index: number) => {
        const filingDate = filings.filingDate?.[index];
        const accessionNumber = filings.accessionNumber?.[index];
        const doc: SECDocument = {
          accessionNumber,
          filingDate,
          reportDate: filings.reportDate?.[index] || filingDate,
          companyName: data.name || "Unknown Company",
          formType: form,
          size: filings.size?.[index] || 0,
          documentUrl: accessionNumber
            ? this.buildDocumentUrl(accessionNumber)
            : undefined,
          description: filings.primaryDocument?.[index] || `${form} Filing`,
          cik: data.cik || "",
        };

        return doc;
      })
      .filter(Boolean) // Remove null entries
      .filter((doc) => this.matchesFilters(doc!, filters)); // Apply filters
  }

  private matchesFilters(doc: SECDocument, filters: DocumentFilters): boolean {
    // Filter by form type
    if (filters.formType && !doc.formType.includes(filters.formType)) {
      return false;
    }

    // Filter by date range
    if (
      filters.startDate &&
      doc?.filingDate &&
      doc?.filingDate < filters.startDate
    ) {
      return false;
    }
    if (
      filters.endDate &&
      doc?.filingDate &&
      doc?.filingDate > filters.endDate
    ) {
      return false;
    }

    // Filter by company CIK
    if (filters.companyCIK) {
      const searchTerm = filters.companyCIK.toLowerCase();
      if (!doc.cik.toLowerCase().includes(searchTerm)) {
        return false;
      }
    }

    return true;
  }

  private extractDocumentText(content: string): string {
    // SEC documents often contain HTML and metadata
    // Extract the meaningful text content

    // Remove HTML tags
    let text = content.replace(/<[^>]*>/g, " ");

    // Remove excessive whitespace
    text = text.replace(/\s+/g, " ").trim();

    // Limit content size for AI processing
    return text.slice(0, 50000); // ~50KB limit
  }

  private buildDocumentUrl(accessionNumber: string): string {
    if (!accessionNumber) return "";
    const formatted = accessionNumber.replace(/-/g, "");
    return `${SEC_BASE_URL}/data/${formatted}/${accessionNumber}-index.html`;
  }
}

export const secEdgarClient = new SECEdgarClient();
