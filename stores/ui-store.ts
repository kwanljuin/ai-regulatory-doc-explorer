import { create } from "zustand";
import { DocumentFilters } from "@/types";

interface UIStore {
  filters: DocumentFilters;
  selectedDocument: string | null;
  isAnalyzing: boolean;
  setFilters: (filters: Partial<DocumentFilters>) => void;
  setSelectedDocument: (id: string | null) => void;
  setIsAnalyzing: (analyzing: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  filters: {
    limit: 50,
    offset: 0,
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
