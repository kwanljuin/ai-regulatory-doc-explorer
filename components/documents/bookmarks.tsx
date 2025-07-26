"use client";
import { useBookmarkStore } from "@/stores/bookmark-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, Trash2 } from "lucide-react";
import { useState } from "react";
import { DocumentCard } from "./document-list";

export default function Bookmarks() {
  const { getBookmarks, toggleBookmark } = useBookmarkStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const bookmarkedDocuments = getBookmarks();

  // In a real app, will fetch bookmarked documents
  // For now, just show a simple list
  if (bookmarkedDocuments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bookmark className="w-5 h-5" />
            Bookmarks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            No bookmarked documents yet
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5" />
            Bookmarks ({bookmarkedDocuments.length})
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Collapse" : "Expand"}
          </Button>
        </CardTitle>
      </CardHeader>

      {isExpanded && (
        <CardContent>
          <div className="space-y-2">
            {bookmarkedDocuments.map((doc) => (
              <DocumentCard key={doc.accessionNumber} doc={doc} />
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
