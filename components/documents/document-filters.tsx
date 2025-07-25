"use client";
import { useUIStore } from "@/stores/ui-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MAJOR_COMPANIES } from "@/lib/constants/companies";
import { RotateCcw } from "lucide-react";

const FORM_TYPES = [
  { value: "10-K", label: "10-K (Annual Report)" },
  { value: "10-Q", label: "10-Q (Quarterly Report)" },
  { value: "8-K", label: "8-K (Current Report)" },
  { value: "DEF 14A", label: "DEF 14A (Proxy Statement)" },
  { value: "10-K/A", label: "10-K/A (Annual Report Amendment)" },
  { value: "4", label: "Form 4 (Insider Trading)" },
  { value: "S-1", label: "S-1 (IPO Registration)" },
  { value: "20-F", label: "20-F (Foreign Company Annual)" },
];

const defaultCompany = MAJOR_COMPANIES[0];

export default function DocumentFilters() {
  const { filters, setFilters } = useUIStore();

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ [key]: value || undefined });
  };

  const reset = () => {
    setFilters({
      formType: undefined,
      startDate: undefined,
      endDate: undefined,
      companyCIK: defaultCompany.cik,
    });
  };

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <CardTitle>Filter Documents</CardTitle>
        <Button variant="outline" onClick={reset}>
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </CardHeader>
      <CardContent className="@container space-y-4">
        <div className="grid grid-cols-1 @md:grid-cols-2 gap-4">
          {/* Company Filter */}
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Select
              value={filters?.companyCIK}
              defaultValue={defaultCompany.cik}
              onValueChange={(value) => handleFilterChange("companyCIK", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a company" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {MAJOR_COMPANIES.map((company) => (
                  <SelectItem key={company.cik} value={company.cik}>
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium">{company.name}</span>
                      {company.ticker && (
                        <span className="text-sm text-muted-foreground ml-2">
                          {company.ticker}
                        </span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Form Type Filter */}
          <div className="space-y-2">
            <Label htmlFor="form-type">Document Type</Label>
            <Select
              value={filters?.formType}
              defaultValue={undefined}
              onValueChange={(value) => handleFilterChange("formType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select form type" />
              </SelectTrigger>
              <SelectContent>
                {FORM_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Date Range Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start-date">Start Date</Label>
            <Input
              id="start-date"
              type="date"
              value={filters?.startDate || ""}
              onChange={(e) => handleFilterChange("startDate", e.target.value)}
              max={filters.endDate || undefined}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="end-date">End Date</Label>
            <Input
              id="end-date"
              type="date"
              value={filters?.endDate || ""}
              onChange={(e) => handleFilterChange("endDate", e.target.value)}
              min={filters.startDate || undefined}
              max={new Date().toISOString().split("T")[0]} // Can't be future date
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
