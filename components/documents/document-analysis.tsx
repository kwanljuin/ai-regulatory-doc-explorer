"use client";
import { useDocumentAnalysis } from "@/lib/hooks/use-analysis";
import { useUIStore } from "@/stores/ui-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, CheckCircle, Calendar, X, Loader2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function DocumentAnalysis() {
  const { selectedDocument, setSelectedDocument } = useUIStore();
  const {
    data: analysis,
    isLoading,
    error,
  } = useDocumentAnalysis(
    selectedDocument || "",
    "SEC" // We'll enhance this to pass actual form type
  );

  if (!selectedDocument) return null;

  return (
    <Dialog
      open={!!selectedDocument}
      onOpenChange={() => setSelectedDocument(null)}
    >
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Document Analysis
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedDocument(null)}
            >
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="ml-2">Analyzing document...</span>
          </div>
        )}

        {error && (
          <div className="text-center py-8 text-red-600">
            Failed to analyze document. Please try again.
          </div>
        )}

        {analysis && (
          <div className="space-y-6">
            {/* Executive Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Executive Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {analysis.executiveSummary}
                </p>
              </CardContent>
            </Card>

            {/* Key Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Key Compliance Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.keyRequirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Important Dates */}
            {analysis.importantDates.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Important Dates & Deadlines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysis.importantDates.map((dateItem, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Badge variant="outline">
                          {formatDate(dateItem.date)}
                        </Badge>
                        <span>{dateItem.description}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Risk Factors */}
            {analysis.riskFactors.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    Risk Factors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysis.riskFactors.map((risk, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                        <span>{risk}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Action Items */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recommended Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.actionItems.map((action, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="text-xs text-muted-foreground text-center">
              Analysis generated on {formatDate(analysis.analysisDate)}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
