"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatBDT } from "@/lib/format";
import type { MemberRow } from "@/lib/types/dashboard.types";
import { cn } from "@/lib/utils";
import { BalanceBadge, BalanceText } from "./member-statement-table";

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-caption text-ink-muted">{label}</dt>
      <dd className="truncate text-body-sm font-medium text-ink tabular-nums">
        {value}
      </dd>
    </div>
  );
}

/** Mobile replacement for the table: one expandable card per member. */
export function MemberStatementCards({
  rows,
  viewerId,
}: {
  rows: MemberRow[];
  viewerId: string;
}) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <ul>
      {rows.map((m) => {
        const expanded = open === m.id;
        const mine = m.id === viewerId;
        return (
          <li
            key={m.id}
            className={cn("border-b border-line", mine && "bg-marigold-50")}
          >
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? null : m.id)}
              className="flex min-h-16 w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/30"
            >
              <Avatar name={m.name} size="md" />
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2 text-body font-medium text-ink">
                  <span className="truncate">{m.name}</span>
                  {mine && (
                    <Badge variant="brand" size="sm">
                      You
                    </Badge>
                  )}
                </span>
                <span className="mt-0.5 block">
                  <BalanceBadge balance={m.balance} />
                </span>
              </span>
              <span className="text-body">
                <BalanceText balance={m.balance} />
              </span>
              <ChevronDown
                aria-hidden
                className={cn(
                  "size-4 shrink-0 text-ink-muted transition-transform",
                  expanded && "rotate-180",
                )}
              />
            </button>
            {expanded && (
              <dl className="grid grid-cols-3 gap-3 px-4 pb-4">
                <Mini
                  label="Meals"
                  value={
                    (m.guestMeals ?? 0) > 0
                      ? `${m.meals} (+${m.guestMeals} guest)`
                      : String(m.meals)
                  }
                />
                <Mini label="Meal cost" value={formatBDT(m.mealCost)} />
                <Mini label="Bazar paid" value={formatBDT(m.bazarPaid)} />
              </dl>
            )}
          </li>
        );
      })}
    </ul>
  );
}
