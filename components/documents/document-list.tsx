"use client";
import { useDocuments } from "@/lib/hooks/use-documents";
import { useUIStore } from "@/stores/ui-store";
import { useBookmarkStore } from "@/stores/bookmark-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark, ExternalLink, Calendar, Building2 } from "lucide-react";
import { formatDate, formatFileSize } from "@/lib/utils";
import { SECDocument } from "@/types";

export default function DocumentList() {
  const { filters } = useUIStore();
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useDocuments(filters);

  if (isLoading) return <DocumentListSkeleton />;
  if (error)
    return (
      <div className="text-center text-red-600">Error loading documents</div>
    );

  const documents = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div className="space-y-4">
      {documents.map((doc: SECDocument) => (
        <DocumentCard key={doc.accessionNumber} doc={doc} />
      ))}

      {hasNextPage && (
        <div className="text-center">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            variant="outline"
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
}

const DocumentListSkeleton = () => (
  <div className="space-y-4">
    {[...Array(5)].map((_, i) => (
      <Card key={i}>
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

export const DocumentCard = ({ doc }: { doc: SECDocument }) => {
  const { toggleBookmark, isBookmarked } = useBookmarkStore();
  const { setSelectedDocument } = useUIStore();

  return (
    <Card
      key={doc.accessionNumber}
      className="hover:shadow-md transition-shadow"
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{doc.companyName}</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{doc.formType}</Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                doc?.accessionNumber ? toggleBookmark(doc) : null
              }
              className={
                doc?.accessionNumber && isBookmarked(doc.accessionNumber)
                  ? "text-yellow-600"
                  : ""
              }
            >
              <Bookmark className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground mb-4">
          {doc?.filingDate && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Filed: {formatDate(doc.filingDate)}
            </div>
          )}
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            CIK: {doc.cik}
          </div>
          <div>Size: {formatFileSize(doc.size)}</div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => (doc ? setSelectedDocument(doc) : null)}
            variant="default"
            size="sm"
          >
            Analyze Document
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a
              href={doc.documentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              View Original
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
