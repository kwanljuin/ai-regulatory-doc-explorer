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
import { RotateCcw } from "lucide-react";
import { Label } from "@/components/ui/label";

const FORM_TYPES = [
  { value: "all", label: "All Forms" },
  { value: "10-K", label: "10-K (Annual Report)" },
  { value: "10-Q", label: "10-Q (Quarterly Report)" },
  { value: "8-K", label: "8-K (Current Report)" },
  { value: "DEF 14A", label: "DEF 14A (Proxy Statement)" },
  { value: "10-K/A", label: "10-K/A (Annual Report Amendment)" },
];

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
      companyName: undefined,
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
          <div className="space-y-2">
            <Label htmlFor="form-type">Document Type</Label>
            <Select
              value={filters?.formType}
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

          <div className="space-y-2">
            <Label htmlFor="company-name">Company Name</Label>
            <Input
              id="company-name"
              placeholder="Enter company name"
              value={filters?.companyName || ""}
              onChange={(e) =>
                handleFilterChange("companyName", e.target.value)
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-1 @md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start-date">Start Date</Label>
            <Input
              id="start-date"
              type="date"
              value={filters?.startDate || ""}
              onChange={(e) => handleFilterChange("startDate", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="end-date">End Date</Label>
            <Input
              id="end-date"
              type="date"
              value={filters?.endDate || ""}
              onChange={(e) => handleFilterChange("endDate", e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
