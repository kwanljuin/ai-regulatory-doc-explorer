import { create } from "zustand";
import { DocumentFilters, SECDocument } from "@/types";
import { MAJOR_COMPANIES } from "@/lib/constants/companies";

interface UIStore {
  filters: DocumentFilters;
  selectedDocument: SECDocument | null;
  isAnalyzing: boolean;
  setFilters: (filters: Partial<DocumentFilters>) => void;
  setSelectedDocument: (data: SECDocument | null) => void;
  setIsAnalyzing: (analyzing: boolean) => void;
}

const defaultCompany = MAJOR_COMPANIES[0];

export const useUIStore = create<UIStore>((set) => ({
  filters: {
    limit: 50,
    offset: 0,
    companyCIK: defaultCompany.cik,
  },
  selectedDocument: null,
  isAnalyzing: false,
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters, offset: 0 },
    })),
  setSelectedDocument: (data) => set({ selectedDocument: data }),
  setIsAnalyzing: (analyzing) => set({ isAnalyzing: analyzing }),
}));
