import { useQuery } from "@tanstack/react-query";
import { DocumentAnalysis } from "@/types";

export const useDocumentAnalysis = (
  accessionNumber: string,
  formType: string
) => {
  return useQuery<DocumentAnalysis>({
    queryKey: ["document-analysis", accessionNumber],
    queryFn: async () => {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessionNumber, formType }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze document");
      }

      return response.json();
    },
    enabled: !!accessionNumber,
    staleTime: 30 * 60 * 1000, // 30 minutes
    retry: 1, // AI analysis is expensive, limit retries
  });
};
