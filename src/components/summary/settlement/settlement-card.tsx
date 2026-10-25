import { ArrowRight, Copy, PartyPopper } from "lucide-react";
import { EmptyState, IconTile } from "@/components/shared";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { formatBDT } from "@/lib/format";
import type { SummaryData } from "@/lib/types/summary.types";
import { cn } from "@/lib/utils";

/** Who pays whom to bring every meal balance to zero. */
export function SettlementCard({
  data,
  onCopy,
}: {
  data: SummaryData;
  onCopy?: () => void;
}) {
  const { transfers, meal, isFinal, viewer } = data;
  const nameOf = (id: string) =>
    meal?.members.find((m) => m.id === id)?.name ?? "Former member";
  const noMeals = !!meal && meal.totalMeals === 0 && meal.totalBazar === 0;

  return (
    <Card id="settlement" className="scroll-mt-20 overflow-hidden">
      <CardHeader className="flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <CardTitle>Settlement</CardTitle>
          <Badge variant={isFinal ? "month-closed" : "info"} size="sm">
            {isFinal ? "Final" : "Suggested"}
          </Badge>
        </div>
        {transfers.length > 0 && (
          <Button variant="ghost" size="sm" onClick={onCopy}>
            <Copy className="size-4" />
            Copy
          </Button>
        )}
      </CardHeader>
      {transfers.length === 0 ? (
        <EmptyState
          icon={
            <IconTile tone="neutral" size="lg">
              <PartyPopper className="size-6" />
            </IconTile>
          }
          title={noMeals ? "No meals logged yet" : "Everyone is square"}
          description={
            noMeals
              ? "Transfers appear once meals and bazar are recorded."
              : "No one owes anyone this month."
          }
        />
      ) : (
        <>
          <p className="border-t border-line px-4 py-3 text-body-sm text-ink-muted">
            {transfers.length}{" "}
            {transfers.length === 1 ? "transfer" : "transfers"} to settle the
            meal balances. Utility fund is not included.
          </p>
          <ul>
            {transfers.map((t) => {
              const involvesMe =
                t.fromId === viewer.memberId || t.toId === viewer.memberId;
              return (
                <li
                  key={`${t.fromId}-${t.toId}`}
                  className={cn(
                    "flex min-h-16 flex-wrap items-center gap-3 border-t border-line px-4 py-3",
                    involvesMe && "bg-marigold-50",
                  )}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <Avatar name={nameOf(t.fromId)} size="sm" />
                    <span className="truncate text-body-sm font-medium text-ink">
                      {nameOf(t.fromId)}
                    </span>
                  </span>
                  <ArrowRight
                    aria-label="pays"
                    className="size-4 shrink-0 text-ink-muted"
                  />
                  <span className="flex min-w-0 items-center gap-2">
                    <Avatar name={nameOf(t.toId)} size="sm" />
                    <span className="truncate text-body-sm font-medium text-ink">
                      {nameOf(t.toId)}
                    </span>
                  </span>
                  <span className="ml-auto text-body font-semibold text-ink tabular-nums">
                    {formatBDT(t.amount)}
                  </span>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </Card>
  );
}
