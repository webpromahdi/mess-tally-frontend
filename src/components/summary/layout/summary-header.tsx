import { Download, FileText, Lock, Unlock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { SummaryData } from "@/lib/types/summary.types";

export function SummaryHeader({
  data,
  isPro,
  exporting,
  statementExporting,
  monthBusy,
  onExportCsv,
  onExportStatement,
  onToggleMonth,
}: {
  data: SummaryData;
  isPro: boolean;
  exporting?: boolean;
  statementExporting?: boolean;
  monthBusy?: boolean;
  onExportCsv?: () => void;
  onExportStatement?: () => void;
  onToggleMonth?: () => void;
}) {
  const { month, mess, viewer } = data;
  const closed = month?.status === "CLOSED";
  return (
    <header className="flex flex-wrap items-end justify-between gap-3">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h1 className="text-h1 text-ink">Summary</h1>
          {month && (
            <Badge variant={closed ? "month-closed" : "month-active"} size="sm">
              {closed ? "Closed" : "Active"}
            </Badge>
          )}
        </div>
        <p className="mt-1 text-body-sm text-ink-muted">
          {month ? `${month.longLabel} · ` : ""}
          {mess.name}
        </p>
      </div>
      {month && (
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={onExportCsv} disabled={exporting}>
            <Download className="size-4" />
            {exporting ? "Exporting…" : "Export CSV"}
          </Button>
          {isPro && (
            <Button
              variant="outline"
              onClick={onExportStatement}
              disabled={statementExporting || !closed}
              title={
                closed
                  ? "Download your PDF statement"
                  : "PDF statements are available for closed months."
              }
            >
              <FileText className="size-4" />
              {statementExporting ? "Preparing…" : "PDF statement"}
            </Button>
          )}
          {viewer.isManager && onToggleMonth && (
            <Button
              variant={closed ? "accent" : "primary"}
              onClick={onToggleMonth}
              disabled={monthBusy}
            >
              {closed ? (
                <Unlock className="size-4" />
              ) : (
                <Lock className="size-4" />
              )}
              {monthBusy
                ? "Updating…"
                : closed
                  ? "Reopen month"
                  : "Close month"}
            </Button>
          )}
        </div>
      )}
    </header>
  );
}
