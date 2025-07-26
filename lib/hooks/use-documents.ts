import { useInfiniteQuery } from "@tanstack/react-query";
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
