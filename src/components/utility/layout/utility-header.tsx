import { Plus, Receipt } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { UtilityData } from "@/lib/types/utility.types";

/** Title, month status and the manager-only write actions (hidden when locked). */
export function UtilityHeader({
  data,
  onDeposit,
  onBill,
}: {
  data: UtilityData;
  onDeposit?: () => void;
  onBill?: () => void;
}) {
  const { month, mess, viewer } = data;
  const canWrite = !!month && !month.isLocked && viewer.isManager;
  return (
    <header className="flex flex-wrap items-end justify-between gap-3">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h1 className="text-h1 text-ink">Utility fund</h1>
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
      {canWrite && (
        <div className="flex flex-wrap gap-2">
          <Button variant="primary" onClick={onDeposit}>
            <Plus />
            Record Deposit
          </Button>
          <Button variant="accent" onClick={onBill}>
            <Receipt />
            Add Bill
          </Button>
        </div>
      )}
    </header>
  );
}
