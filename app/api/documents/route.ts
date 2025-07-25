import { NextRequest, NextResponse } from "next/server";
import { secEdgarClient } from "@/lib/sec-edgar/client";
import { DocumentFilters } from "@/types";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const filters: DocumentFilters = {
      formType: searchParams.get("formType") || undefined,
      startDate: searchParams.get("startDate") || undefined,
      endDate: searchParams.get("endDate") || undefined,
      companyCIK: searchParams.get("companyCIK") || undefined,
      offset: parseInt(searchParams.get("offset") || "0"),
      limit: parseInt(searchParams.get("limit") || "50"),
    };

    const result = await secEdgarClient.searchDocuments(filters);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Documents API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch documents" },
      { status: 500 }
    );
  }
}
