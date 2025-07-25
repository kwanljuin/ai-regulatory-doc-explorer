export interface Company {
  cik: string;
  name: string;
  ticker?: string;
}

export const MAJOR_COMPANIES: Company[] = [
  { cik: "0000320193", name: "Apple Inc.", ticker: "AAPL" },
  { cik: "0001018724", name: "Amazon.com Inc.", ticker: "AMZN" },
  { cik: "0001652044", name: "Alphabet Inc.", ticker: "GOOGL" },
  { cik: "0000789019", name: "Microsoft Corporation", ticker: "MSFT" },
  { cik: "0001326801", name: "Meta Platforms Inc.", ticker: "META" },
  { cik: "0001318605", name: "Tesla Inc.", ticker: "TSLA" },
  { cik: "0001065280", name: "Netflix Inc.", ticker: "NFLX" },
  {
    cik: "0000051143",
    name: "International Business Machines Corporation",
    ticker: "IBM",
  },
  { cik: "0000066740", name: "Nvidia Corporation", ticker: "NVDA" },
  { cik: "0000886982", name: "Salesforce Inc.", ticker: "CRM" },
  { cik: "0001467858", name: "Uber Technologies Inc.", ticker: "UBER" },
  { cik: "0001559720", name: "Zoom Video Communications Inc.", ticker: "ZM" },
  { cik: "0001045810", name: "Nvidia Corporation", ticker: "NVDA" },
  { cik: "0000200406", name: "Johnson & Johnson", ticker: "JNJ" },
  { cik: "0000732712", name: "Visa Inc.", ticker: "V" },
];

// Helper function to get CIKs array
export const getMajorCompanyCIKs = (): string[] => {
  return MAJOR_COMPANIES.map((company) => company.cik);
};

// Helper function to find company by CIK
export const getCompanyByCIK = (cik: string): Company | undefined => {
  return MAJOR_COMPANIES.find((company) => company.cik === cik);
};

// Helper function to find company by name (fuzzy search)
export const searchCompaniesByName = (searchTerm: string): Company[] => {
  const term = searchTerm.toLowerCase();
  return MAJOR_COMPANIES.filter(
    (company) =>
      company.name.toLowerCase().includes(term) ||
      company.ticker?.toLowerCase().includes(term)
  );
};
