export interface SECDocument {
  accessionNumber: string;
  filingDate: string;
  reportDate: string;
  companyName: string;
  formType: string;
  size: number;
  documentUrl: string;
  description: string;
  cik: string;
}

export interface DocumentFilters {
  formType?: string;
  startDate?: string;
  endDate?: string;
  companyName?: string;
  offset?: number;
  limit?: number;
}

export interface DocumentAnalysis {
  executiveSummary: string;
  keyRequirements: string[];
  importantDates: Array<{
    date: string;
    description: string;
  }>;
  riskFactors: string[];
  actionItems: string[];
  analysisDate: string;
}

export interface APIResponse<T> {
  data: T;
  total: number;
  hasMore: boolean;
}

export interface SECAPISubmissionResponse {
  name?: string;
  cik?: string;
  filings?: {
    recent?: {
      accessionNumber?: string[];
      filingDate?: string[];
      reportDate?: string[];
      form?: string[];
      size?: number[];
      primaryDocument?: string[];
    };
  };
  total?: number;
}
