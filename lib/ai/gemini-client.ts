import { GoogleGenerativeAI } from "@google/generative-ai";
import { DocumentAnalysis } from "@/types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export class GeminiAnalyzer {
  private model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

  async analyzeDocument(
    documentContent: string,
    documentType: string
  ): Promise<DocumentAnalysis> {
    const prompt = this.buildAnalysisPrompt(documentContent, documentType);

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return this.parseAnalysisResponse(text);
    } catch (error) {
      console.error("Gemini analysis error:", error);
      throw new Error("Failed to analyze document");
    }
  }

  private buildAnalysisPrompt(content: string, formType: string): string {
    // Truncate content to fit within Gemini's context window
    const truncatedContent = content.slice(0, 30000);

    return `
      You are a regulatory compliance expert analyzing SEC ${formType} filings. 

      Analyze this regulatory document and provide a detailed compliance analysis in JSON format:

      {
        "executiveSummary": "2-3 sentence overview of the document's main purpose and significance",
        "keyRequirements": ["List of major compliance requirements", "Each as a separate item"],
        "importantDates": [
          {
            "date": "YYYY-MM-DD",
            "description": "What happens on this date"
          }
        ],
        "riskFactors": ["Major risk factors mentioned", "Regulatory concerns", "Compliance challenges"],
        "actionItems": ["What companies should do", "Investor considerations", "Compliance steps needed"]
      }

      Focus on:
      - Regulatory compliance implications
      - Key deadlines and requirements
      - Risk factors for businesses
      - Actionable insights for stakeholders

      Document Type: ${formType}
      Document Content: ${truncatedContent}

      Respond ONLY with valid JSON, no additional text.
    `;
  }

  private parseAnalysisResponse(response: string): DocumentAnalysis {
    try {
      // Clean up response if it has markdown formatting
      const cleanResponse = response.replace(/```json\n?|\n?```/g, "").trim();
      const parsed = JSON.parse(cleanResponse);

      return {
        executiveSummary: parsed.executiveSummary || "",
        keyRequirements: parsed.keyRequirements || [],
        importantDates: parsed.importantDates || [],
        riskFactors: parsed.riskFactors || [],
        actionItems: parsed.actionItems || [],
        analysisDate: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Failed to parse analysis response:", error);
      throw new Error("Failed to parse AI analysis results");
    }
  }
}

export const geminiAnalyzer = new GeminiAnalyzer();
