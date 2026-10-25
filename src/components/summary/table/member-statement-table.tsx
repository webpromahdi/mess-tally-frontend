import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatBDT } from "@/lib/format";
import { isSettled, netBalance } from "@/lib/summary";
import type { MealBlock, MemberRow } from "@/lib/types/dashboard.types";
import type { SummarySort, SummarySortKey } from "@/lib/types/summary.types";
import { cn } from "@/lib/utils";

export function BalanceBadge({ balance }: { balance: number }) {
  if (isSettled(balance)) {
    return (
      <Badge variant="neutral" size="sm">
        Settled
      </Badge>
    );
  }
  return balance > 0 ? (
    <Badge variant="status-active" size="sm">
      Receiver
    </Badge>
  ) : (
    <Badge variant="status-rejected" size="sm">
      Giver
    </Badge>
  );
}

export function BalanceText({ balance }: { balance: number }) {
  return (
    <span
      className={cn(
        "tabular-nums font-semibold",
        isSettled(balance)
          ? "text-ink"
          : balance > 0
            ? "text-success"
            : "text-error",
      )}
    >
      {isSettled(balance) ? formatBDT(0) : formatBDT(balance, { signed: true })}
    </span>
  );
}

const headClass =
  "sticky top-0 z-10 h-11 border-b border-line bg-silver-200 px-4 text-left text-caption font-semibold tracking-wide text-gray-600 uppercase";

function SortHead({
  label,
  sortKey,
  sort,
  align,
  onSort,
}: {
  label: string;
  sortKey: SummarySortKey;
  sort: SummarySort;
  align?: "right";
  onSort: (key: SummarySortKey) => void;
}) {
  const active = sort.key === sortKey;
  const Icon = !active ? ArrowUpDown : sort.dir === "asc" ? ArrowUp : ArrowDown;
  return (
    <th
      scope="col"
      aria-sort={
        active ? (sort.dir === "asc" ? "ascending" : "descending") : "none"
      }
      className={cn(headClass, align === "right" && "text-right")}
    >
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className={cn(
          "inline-flex min-h-11 items-center gap-1 uppercase hover:text-ink focus-visible:outline-2 focus-visible:outline-aubergine-500",
          align === "right" && "flex-row-reverse",
        )}
      >
        {label}
        <Icon aria-hidden className={cn("size-3.5", !active && "opacity-50")} />
      </button>
    </th>
  );
}

/** Desktop per-member statement (F1–F5). Mobile uses MemberStatementCards. */
export function MemberStatementTable({
  meal,
  rows,
  viewerId,
  sort,
  onSort,
}: {
  meal: MealBlock;
  rows: MemberRow[];
  viewerId: string;
  sort: SummarySort;
  onSort: (key: SummarySortKey) => void;
}) {
  const net = netBalance(meal);
  const cell = "h-12 border-b border-line px-4";
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-160 border-separate border-spacing-0 text-body-sm">
        <caption className="sr-only">Per-member meal statement</caption>
        <thead>
          <tr>
            <SortHead
              label="Member"
              sortKey="name"
              sort={sort}
              onSort={onSort}
            />
            <SortHead
              label="Meals"
              sortKey="meals"
              sort={sort}
              align="right"
              onSort={onSort}
            />
            <th scope="col" className={cn(headClass, "text-right")}>
              Meal cost
            </th>
            <th scope="col" className={cn(headClass, "text-right")}>
              Bazar paid
            </th>
            <SortHead
              label="Balance"
              sortKey="balance"
              sort={sort}
              align="right"
              onSort={onSort}
            />
            <th scope="col" className={headClass}>
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((m) => {
            const mine = m.id === viewerId;
            return (
              <tr
                key={m.id}
                className={cn(
                  "transition-colors hover:bg-silver-100",
                  mine && "bg-marigold-50",
                )}
              >
                <th scope="row" className={cn(cell, "text-left font-medium")}>
                  <span className="flex items-center gap-2 whitespace-nowrap">
                    <Avatar name={m.name} size="xs" />
                    {m.name}
                    {mine && (
                      <Badge variant="brand" size="sm">
                        You
                      </Badge>
                    )}
                  </span>
                </th>
                <td className={cn(cell, "text-right tabular-nums")}>
                  {m.meals}
                  {m.guestMeals > 0 && (
                    <span className="ml-1 text-ink-muted">
                      (+{m.guestMeals} guest)
                    </span>
                  )}
                </td>
                <td className={cn(cell, "text-right tabular-nums")}>
                  {formatBDT(m.mealCost)}
                </td>
                <td className={cn(cell, "text-right tabular-nums")}>
                  {formatBDT(m.bazarPaid)}
                </td>
                <td className={cn(cell, "text-right")}>
                  <BalanceText balance={m.balance} />
                </td>
                <td className={cell}>
                  <BalanceBadge balance={m.balance} />
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="bg-silver-100 font-semibold text-ink">
            <th scope="row" className="h-12 bg-silver-100 px-4 text-left">
              House total
            </th>
            <td className="h-12 bg-silver-100 px-4 text-right tabular-nums">
              {meal.totalMeals}
            </td>
            <td className="h-12 bg-silver-100 px-4 text-right tabular-nums">
              {formatBDT(meal.members.reduce((s, m) => s + m.mealCost, 0))}
            </td>
            <td className="h-12 bg-silver-100 px-4 text-right tabular-nums">
              {formatBDT(meal.totalBazar)}
            </td>
            <td className="h-12 bg-silver-100 px-4 text-right tabular-nums">
              Net {formatBDT(isSettled(net) ? 0 : net)}
            </td>
            <td className="bg-silver-100" />
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
