import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { BazarData } from "@/lib/types/bazar.types";

/** Title, month status and the "Add Bazar Trip" action (hidden when locked). */
export function BazarHeader({
  data,
  onAdd,
}: {
  data: BazarData;
  onAdd?: () => void;
}) {
  const { month, mess } = data;
  const canAdd = month && !month.isLocked && onAdd;
  return (
    <header className="flex flex-wrap items-end justify-between gap-3">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h1 className="text-h1 text-ink">Bazar</h1>
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
      {canAdd && (
        <Button variant="accent" onClick={onAdd}>
          <Plus />
          Add Bazar Trip
        </Button>
      )}
    </header>
  );
}
