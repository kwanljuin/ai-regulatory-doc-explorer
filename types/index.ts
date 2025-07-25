export interface SECDocument {
  accessionNumber: string | undefined;
  filingDate: string | undefined;
  reportDate: string | undefined;
  companyName: string;
  formType: string;
  size: number;
  documentUrl: string | undefined;
  description: string;
  cik: string;
}

export interface DocumentFilters {
  formType?: string;
  startDate?: string;
  endDate?: string;
  companyCIK?: string;
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

export interface SECSubmissionsResponse {
  cik: string;
  entityType?: string;
  sic?: string;
  sicDescription?: string;
  ownerOrg?: string;
  insiderTransactionForOwnerExists?: number;
  insiderTransactionForIssuerExists?: number;
  name: string;
  tickers?: Array<string>;
  exchanges?: Array<string>;
  ein?: string | undefined;
  lei?: string | undefined;
  description?: string;
  website?: string;
  investorWebsite?: string;
  category?: string;
  fiscalYearEnd?: string;
  stateOfIncorporation?: string;
  stateOfIncorporationDescription?: string;
  addresses?: {
    mailing?: {
      street1?: string;
      street2?: string | undefined;
      city?: string;
      stateOrCountry?: string;
      zipCode?: string;
      stateOrCountryDescription?: string;
      isForeignLocation?: number;
      foreignStateTerritory?: string | undefined;
      country?: string | undefined;
      countryCode?: string | undefined;
    };
    business?: {
      street1?: string;
      street2?: string | undefined;
      city?: string;
      stateOrCountry?: string;
      zipCode?: string;
      stateOrCountryDescription?: string;
      isForeignLocation?: number;
      foreignStateTerritory?: string | undefined;
      country?: string | undefined;
      countryCode?: string | undefined;
    };
  };
  phone?: string;
  flags?: string;
  formerNames?: Array<{
    name?: string;
    from?: string;
    to?: string;
  }>;
  filings?: {
    recent?: {
      accessionNumber?: Array<string>;
      filingDate?: Array<string>;
      reportDate?: Array<string>;
      acceptanceDateTime?: Array<string>;
      act?: Array<string>;
      form?: Array<string>;
      fileNumber?: Array<string>;
      filmNumber?: Array<string>;
      items?: Array<string>;
      core_type?: Array<string>;
      size?: Array<number>;
      isXBRL?: Array<number>;
      isInlineXBRL?: Array<number>;
      primaryDocument?: Array<string>;
      primaryDocDescription?: Array<string>;
    };
    files?: Array<{
      name?: string;
      filingCount?: number;
      filingFrom?: string;
      filingTo?: string;
    }>;
  };
}
