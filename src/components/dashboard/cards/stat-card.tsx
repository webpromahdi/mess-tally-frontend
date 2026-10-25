import type { ReactNode } from "react";
import { IconTile, type IconTileTone } from "@/components/shared";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/** Design.md §10.8 Stat Card without the trend badge (no previous-period data in the API). */
export function StatCard({
  label,
  value,
  unit,
  hint,
  icon,
  tone = "aubergine",
  className,
}: {
  label: string;
  value: string;
  unit?: string;
  hint?: ReactNode;
  icon: ReactNode;
  tone?: IconTileTone;
  className?: string;
}) {
  return (
    <Card className={cn("flex flex-col gap-4 p-4 sm:p-5", className)}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-label text-ink-muted">{label}</p>
        <IconTile tone={tone} size="sm">
          {icon}
        </IconTile>
      </div>
      <div className="mt-auto min-w-0">
        <p className="text-amount-md whitespace-nowrap text-ink tabular-nums">
          {value}
          {unit && (
            <span className="ml-1 text-body-sm font-medium text-ink-subtle">
              {unit}
            </span>
          )}
        </p>
        {hint && <p className="mt-1 text-caption text-ink-subtle">{hint}</p>}
      </div>
    </Card>
  );
}
