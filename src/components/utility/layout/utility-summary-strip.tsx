import type { ReactNode } from "react";
import { Progress } from "@/components/shared";
import { Card, Eyebrow } from "@/components/ui/card";
import { formatBDT } from "@/lib/format";
import type { UtilityData } from "@/lib/types/utility.types";
import { fundRemainingPercent } from "@/lib/utility";
import { cn } from "@/lib/utils";

function Stat({
  label,
  value,
  hint,
  tone,
  children,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  tone?: "error";
  children?: ReactNode;
}) {
  return (
    <Card className="p-4 gap-0">
      <Eyebrow>{label}</Eyebrow>
      <p
        aria-live="polite"
        className={cn(
          "mt-1.5 truncate text-h2 tabular-nums sm:text-h1",
          tone === "error" ? "text-error" : "text-ink",
        )}
      >
        {value}
      </p>
      {hint && (
        <p className="mt-0.5 truncate text-body-sm text-ink-muted">{hint}</p>
      )}
      {children}
    </Card>
  );
}

/** Live fund roll-up (U1–U3). Every edit updates it instantly. */
export function UtilitySummaryStrip({ data }: { data: UtilityData }) {
  const percent = fundRemainingPercent(data);
  return (
    <section
      aria-label="Utility fund summary"
      className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
    >
      <Stat
        label="Fund balance"
        value={formatBDT(data.balance)}
        hint={data.needsReplenishment ? "Needs a top-up" : "available now"}
        tone={data.needsReplenishment ? "error" : undefined}
      />
      <Stat
        label="Total deposited"
        value={formatBDT(data.totalDeposits)}
        hint="collected this month"
      />
      <Stat
        label="Bills paid"
        value={formatBDT(data.totalPaidBills)}
        hint="from the fund"
      />
      <Stat
        label="Fund remaining"
        value={`${Math.round(percent)}%`}
        hint="of what was collected"
      >
        <Progress value={percent} label="Fund remaining" className="mt-2" />
      </Stat>
    </section>
  );
}
