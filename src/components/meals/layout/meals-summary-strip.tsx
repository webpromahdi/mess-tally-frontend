import type { ReactNode } from "react";
import { Card, Eyebrow } from "@/components/ui/card";
import { daysBetween } from "@/lib/dates";
import { formatBDT, formatMeals } from "@/lib/format";
import type { MealsGridData } from "@/lib/types/meal.types";

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
}) {
  return (
    <Card className="p-4">
      <Eyebrow>{label}</Eyebrow>
      <p
        aria-live="polite"
        className="mt-1.5 truncate text-h2 text-ink tabular-nums sm:text-h1"
      >
        {value}
      </p>
      {hint && (
        <p className="mt-0.5 truncate text-body-sm text-ink-muted">{hint}</p>
      )}
    </Card>
  );
}

/** Read-only roll-up above the grid. Meal rate is live (F3, AC 3.1.4). */
export function MealsSummaryStrip({ data }: { data: MealsGridData }) {
  const { month, members, viewer, houseTotal, mealRate, today } = data;
  const mine = members.find((m) => m.id === viewer.memberId)?.totalMeals ?? 0;
  const elapsed = month
    ? Math.max(
        1,
        daysBetween(month.startDate, month.endDate).filter(
          (d) => d.iso <= today,
        ).length,
      )
    : 1;
  return (
    <section
      aria-label="Month summary"
      className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
    >
      <Stat label="Total house meals" value={formatMeals(houseTotal)} />
      <Stat
        label="Your meals"
        value={formatMeals(mine)}
        hint={`Meal cost ${formatBDT(mine * mealRate)}`}
      />
      <Stat
        label="Avg per day"
        value={formatMeals(Math.round((houseTotal / elapsed) * 10) / 10)}
        hint={`over ${elapsed} ${elapsed === 1 ? "day" : "days"}`}
      />
      <Stat label="Meal rate" value={formatBDT(mealRate)} hint="per meal" />
    </section>
  );
}
