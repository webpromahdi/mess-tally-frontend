import { Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { SummaryData } from "@/lib/types/summary.types";

export function SummaryHeader({
  data,
  onExport,
}: {
  data: SummaryData;
  onExport?: () => void;
}) {
  const { month, mess } = data;
  return (
    <header className="flex flex-wrap items-end justify-between gap-3">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h1 className="text-h1 text-ink">Summary</h1>
          {month && (
            <Badge
              variant={
                month.status === "ACTIVE" ? "month-active" : "month-closed"
              }
              size="sm"
            >
              {month.status === "ACTIVE" ? "Active" : "Closed"}
            </Badge>
          )}
        </div>
        <p className="mt-1 text-body-sm text-ink-muted">
          {month ? `${month.longLabel} · ` : ""}
          {mess.name}
        </p>
      </div>
      {month && (
        <Button variant="outline" onClick={onExport}>
          <Download className="size-4" />
          Export
        </Button>
      )}
    </header>
  );
}
