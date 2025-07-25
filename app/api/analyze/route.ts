import { NextRequest, NextResponse } from "next/server";
import { geminiAnalyzer } from "@/lib/ai/gemini-client";
import { secEdgarClient } from "@/lib/sec-edgar/client";

export async function POST(request: NextRequest) {
  try {
    const { accessionNumber, formType } = await request.json();

    if (!accessionNumber) {
      return NextResponse.json(
        { error: "Accession number is required" },
        { status: 400 }
      );
    }

    // Fetch document content
    const documentContent = await secEdgarClient.getDocumentContent(
      accessionNumber
    );

    // Analyze with AI
    const analysis = await geminiAnalyzer.analyzeDocument(
      documentContent,
      formType
    );

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Analysis API error:", error);
    return NextResponse.json(
      { error: "Failed to analyze document" },
      { status: 500 }
    );
  }
}
