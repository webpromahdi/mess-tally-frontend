import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, Eyebrow } from "@/components/ui/card";
import { formatBDT } from "@/lib/format";
import { isSettled } from "@/lib/summary";
import type { SummaryData } from "@/lib/types/summary.types";
import { cn } from "@/lib/utils";

function Stat({
  label,
  value,
  hint,
  tone,
  badge,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  tone?: "error" | "success";
  badge?: ReactNode;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between gap-2">
        <Eyebrow>{label}</Eyebrow>
        {badge}
      </div>
      <p
        className={cn(
          "mt-1.5 truncate text-h2 tabular-nums sm:text-h1",
          tone === "error" && "text-error",
          tone === "success" && "text-success",
          !tone && "text-ink",
        )}
      >
        {value}
      </p>
      {hint && (
        <p className="mt-0.5 truncate text-body-sm text-ink-muted">{hint}</p>
      )}
    </Card>
  );
}

/** Meal-only KPIs (F1–F5). Utility numbers never appear here. */
export function SummaryKpiStrip({ data }: { data: SummaryData }) {
  const { meal, viewer } = data;
  if (!meal) return null;
  const mine = meal.members.find((m) => m.id === viewer.memberId);
  const settled = !mine || isSettled(mine.balance);
  return (
    <section
      aria-label="Meal summary"
      className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
    >
      <Stat
        label="Total bazar"
        value={formatBDT(meal.totalBazar)}
        hint="spent on groceries"
      />
      <Stat
        label="Total meals"
        value={meal.totalMeals}
        hint={`incl. ${meal.totalGuestMeals} guest`}
      />
      <Stat
        label="Meal rate"
        value={formatBDT(meal.mealRate)}
        hint="per meal · excludes utility"
      />
      <Stat
        label="Your balance"
        value={mine ? formatBDT(mine.balance, { signed: true }) : "—"}
        tone={
          settled ? undefined : (mine?.balance ?? 0) > 0 ? "success" : "error"
        }
        hint={
          !mine
            ? "not in this month"
            : settled
              ? "all settled"
              : mine.balance > 0
                ? "you get back"
                : "you owe"
        }
        badge={
          mine && !settled ? (
            <Badge
              variant={mine.balance > 0 ? "status-active" : "status-rejected"}
              size="sm"
            >
              {mine.balance > 0 ? "Receiver" : "Giver"}
            </Badge>
          ) : undefined
        }
      />
    </section>
  );
}
