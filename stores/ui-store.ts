import { create } from "zustand";
import { DocumentFilters } from "@/types";
import { MAJOR_COMPANIES } from "@/lib/constants/companies";

interface UIStore {
  filters: DocumentFilters;
  selectedDocument: string | null;
  isAnalyzing: boolean;
  setFilters: (filters: Partial<DocumentFilters>) => void;
  setSelectedDocument: (id: string | null) => void;
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
  setSelectedDocument: (id) => set({ selectedDocument: id }),
  setIsAnalyzing: (analyzing) => set({ isAnalyzing: analyzing }),
}));
