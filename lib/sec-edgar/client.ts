import {
  SECDocument,
  DocumentFilters,
  APIResponse,
  SECAPISubmissionResponse,
} from "@/types";

const SEC_BASE_URL = "https://www.sec.gov/Archives/edgar";
const SEC_API_BASE = "https://data.sec.gov";

// Required headers for SEC API compliance
const SEC_HEADERS = {
  "User-Agent": "Regulatory Explorer v1.0 (contact@yourcompany.com)",
  Accept: "application/json",
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
      // Using SEC's submissions endpoint for better structure
      const params = new URLSearchParams({
        forms: filters.formType || "10-K,10-Q,8-K",
        count: (filters.limit || 50).toString(),
        start: (filters.offset || 0).toString(),
      });

      if (filters.startDate) params.append("startdt", filters.startDate);
      if (filters.endDate) params.append("enddt", filters.endDate);

      const response = await fetch(
        `${SEC_API_BASE}/api/xbrl/submissions?${params}`,
        { headers: SEC_HEADERS }
      );

      if (!response.ok) {
        throw new Error(`SEC API error: ${response.status}`);
      }

      const data = await response.json();

      return {
        data: this.transformSECData(data),
        total: data.total || 0,
        hasMore:
          (filters.offset || 0) + (filters.limit || 50) < (data.total || 0),
      };
    } catch (error) {
      console.error("SEC API Error:", error);
      throw new Error("Failed to fetch SEC documents");
    }
  }

  async getDocumentContent(accessionNumber: string): Promise<string> {
    await this.delay(100);

    try {
      // Format accession number for URL
      const formattedAccession = accessionNumber.replace(/-/g, "");
      const url = `${SEC_BASE_URL}/data/${formattedAccession}/${accessionNumber}.txt`;

      const response = await fetch(url, { headers: SEC_HEADERS });

      if (!response.ok) {
        throw new Error(`Document fetch error: ${response.status}`);
      }

      return await response.text();
    } catch (error) {
      console.error("Document fetch error:", error);
      throw new Error("Failed to fetch document content");
    }
  }

  private transformSECData(data: SECAPISubmissionResponse): SECDocument[] {
    // Transform SEC API response to our format
    const filings = data.filings?.recent || {};
    const forms = filings.form || [];

    if (!forms.length) {
      return [];
    }

    return forms.map((form: string, index: number) => ({
      accessionNumber: filings.accessionNumber?.[index] || "",
      filingDate: filings.filingDate?.[index] || "",
      reportDate: filings.reportDate?.[index] || "",
      companyName: data.name || "Unknown Company",
      formType: form,
      size: filings.size?.[index] || 0,
      documentUrl:
        filings?.accessionNumber != null && filings.accessionNumber?.[index]
          ? this.buildDocumentUrl(filings.accessionNumber[index])
          : "",
      description: filings.primaryDocument?.[index] || "",
      cik: data.cik || "",
    }));
  }

  private buildDocumentUrl(accessionNumber: string): string {
    if (!accessionNumber) return "";
    const formatted = accessionNumber.replace(/-/g, "");
    return `${SEC_BASE_URL}/data/${formatted}/${accessionNumber}-index.html`;
  }
}

export const secEdgarClient = new SECEdgarClient();
