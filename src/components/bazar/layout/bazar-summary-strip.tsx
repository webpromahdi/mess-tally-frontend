import type { ReactNode } from "react";
import { Card, Eyebrow } from "@/components/ui/card";
import { paidBy } from "@/lib/bazar";
import { formatBDT } from "@/lib/format";
import type { BazarData } from "@/lib/types/bazar.types";

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
    <Card className="p-4 gap-0">
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

/** Live roll-up. Editing any entry updates these and the meal rate (F3, AC 4.1.3). */
export function BazarSummaryStrip({ data }: { data: BazarData }) {
  const { entries, viewer, totalBazar, mealRate, houseMeals } = data;
  const mine = paidBy(entries, viewer.memberId);
  const share = totalBazar > 0 ? Math.round((mine / totalBazar) * 100) : 0;
  return (
    <section
      aria-label="Bazar summary"
      className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
    >
      <Stat
        label="Total bazar"
        value={formatBDT(totalBazar)}
        hint="this month"
      />
      <Stat
        label="You paid"
        value={formatBDT(mine)}
        hint={`${share}% of the house total`}
      />
      <Stat
        label="Trips"
        value={String(entries.length)}
        hint={entries.length === 1 ? "bazar entry" : "bazar entries"}
      />
      <Stat
        label="Meal rate"
        value={formatBDT(mealRate)}
        hint={`over ${houseMeals} meals`}
      />
    </section>
  );
}
