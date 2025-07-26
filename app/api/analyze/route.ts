import { NextRequest, NextResponse } from "next/server";
import { geminiAnalyzer } from "@/lib/ai/gemini-client";
import { secEdgarClient } from "@/lib/sec-edgar/client";

export async function POST(request: NextRequest) {
  try {
    const { cik, accessionNumber, formType } = await request.json();

    if (!accessionNumber) {
      return NextResponse.json(
        { error: "Accession number not found" },
        { status: 400 }
      );
    }

    if (!cik) {
      return NextResponse.json({ error: "CIK not found" }, { status: 400 });
    }

    // Fetch document content
    const documentContent = await secEdgarClient.getDocumentContent(
      cik,
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
