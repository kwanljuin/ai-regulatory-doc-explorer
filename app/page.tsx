"use client";
import DocumentList from "@/components/documents/document-list";
import DocumentFilters from "@/components/documents/document-filters";
import DocumentAnalysis from "@/components/documents/document-analysis";
import Bookmarks from "@/components/documents/bookmarks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Regulatory Document Explorer
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                AI-powered SEC filing analysis and discovery
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <DocumentFilters />
            <Bookmarks />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Document List</CardTitle>
              </CardHeader>
              <CardContent>
                <DocumentList />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Document Analysis Modal */}
      <DocumentAnalysis />
    </div>
  );
}
