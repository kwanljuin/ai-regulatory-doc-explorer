import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { secEdgarClient } from "@/lib/sec-edgar/client";
import { DocumentFilters } from "@/types";

export const useDocuments = (filters: DocumentFilters) => {
  return useInfiniteQuery({
    queryKey: ["documents", filters],
    queryFn: ({ pageParam = 0 }) =>
      secEdgarClient.searchDocuments({
        ...filters,
        offset: pageParam,
      }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasMore ? allPages.length * (filters.limit || 50) : undefined,
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
  });
};

export const useDocumentContent = (accessionNumber: string) => {
  return useQuery({
    queryKey: ["document-content", accessionNumber],
    queryFn: () => secEdgarClient.getDocumentContent(accessionNumber),
    enabled: !!accessionNumber,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};
