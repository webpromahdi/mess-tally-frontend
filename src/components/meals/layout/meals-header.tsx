import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { MealsGridData } from "@/lib/types/meal.types";

/** Title, month status and the "Log day" action (hidden when locked, Design.md §12.6). */
export function MealsHeader({
  data,
  onLogDay,
}: {
  data: MealsGridData;
  onLogDay?: () => void;
}) {
  const { month, mess } = data;
  const canLog = month && !month.isLocked && onLogDay;
  return (
    <header className="flex flex-wrap items-end justify-between gap-3">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h1 className="text-h1 text-ink">Daily meals</h1>
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
      {canLog && (
        <Button variant="accent" onClick={onLogDay}>
          <Plus />
          Log day
        </Button>
      )}
    </header>
  );
}
