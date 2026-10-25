import { ArrowRight, Scale } from "lucide-react";
import Link from "next/link";
import { balanceRole, IconTile, MoneyPill } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatBDT } from "@/lib/format";
import { cn } from "@/lib/utils";

export interface SettlementLine {
  /** "Pay Mahdi" / "From Karim" */
  label: string;
  amount: number;
}

/** Caller's own meal balance (F5). Sign + Receiver/Giver label, so colour is never the only signal. */
export function MyBalanceCard({
  balance,
  closed,
  settlement,
  className,
}: {
  balance: number;
  closed?: boolean;
  settlement?: SettlementLine[];
  className?: string;
}) {
  const role = balanceRole(balance);
  return (
    <Card className={cn("flex flex-col gap-4 p-4 sm:p-5", className)}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-label text-ink-muted">
          {closed ? "My final balance" : "My meal balance"}
        </p>
        <IconTile tone="marigold" size="sm">
          <Scale />
        </IconTile>
      </div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <MoneyPill value={balance} size="lg" />
        <p className="text-body-sm">
          <span
            className={cn(
              "font-semibold",
              role.tone === "positive" && "text-money-positive",
              role.tone === "negative" && "text-money-negative",
              role.tone === "neutral" && "text-ink-muted",
            )}
          >
            {role.label}
          </span>
          <span className="text-ink-subtle"> · {role.hint}</span>
        </p>
      </div>
      {settlement && settlement.length > 0 && (
        <ul className="flex flex-col gap-1 rounded-xl bg-canvas p-3 text-body-sm">
          {settlement.map((s) => (
            <li
              key={s.label}
              className="flex items-center justify-between gap-3"
            >
              <span className="truncate text-ink-muted">{s.label}</span>
              <span className="font-semibold whitespace-nowrap text-ink tabular-nums">
                {formatBDT(s.amount)}
              </span>
            </li>
          ))}
        </ul>
      )}
      <Button
        variant="link"
        size="sm"
        asChild
        className="mt-auto self-start px-0"
      >
        <Link href="/dashboard/summary">
          View settlement
          <ArrowRight />
        </Link>
      </Button>
    </Card>
  );
}
