"use client";

import {
  CalendarX,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Lock,
} from "lucide-react";
import {
  SimpleDropdown,
  SimpleMenuItem,
  SimpleMenuLabel,
} from "@/components/shared";
import { StatusDot } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ShellMonth } from "./types";

/**
 * `‹ Oct 2026 ›` with an API-driven month list (Design.md §10.6).
 * Arrows hide below 640px so the topbar never overflows.
 * Months are newest-first, so `index + 1` is older and `index - 1` is newer.
 */
export function MonthSelector({
  month,
  months = [],
  selectedKey,
  onSelectMonth,
}: {
  month: ShellMonth | null;
  months?: ShellMonth[];
  selectedKey?: string | null;
  onSelectMonth?: (key: string) => void;
}) {
  const list = months.length ? months : month ? [month] : [];
  const activeKey = selectedKey ?? month?.key ?? null;
  const selected =
    list.find((m) => m.key === activeKey) ?? month ?? list[0] ?? null;

  if (!selected) {
    return (
      <span className="inline-flex h-10 items-center gap-2 rounded-xl border border-dashed border-line-strong px-3 text-body-sm font-medium text-ink-muted">
        <CalendarX className="size-4" />
        <span className="hidden xs:inline">No active month</span>
        <span className="xs:hidden">No month</span>
      </span>
    );
  }

  const index = list.findIndex((m) => m.key === selected.key);
  const older = index >= 0 ? list[index + 1] : undefined;
  const newer = index > 0 ? list[index - 1] : undefined;

  return (
    <div className="flex items-center gap-0.5">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Previous month"
        disabled={!older}
        onClick={() => older && onSelectMonth?.(older.key)}
        className="hidden sm:inline-flex"
      >
        <ChevronLeft />
      </Button>
      <SimpleDropdown
        align="end"
        trigger={(p) => (
          <button
            {...p}
            type="button"
            aria-label={`Month: ${selected.label}, ${
              selected.status === "ACTIVE" ? "active" : "closed"
            }. Change month`}
            className={cn(
              "inline-flex h-11 cursor-pointer items-center gap-2 rounded-xl border border-line bg-surface px-3 text-body-sm font-semibold text-ink shadow-card transition-colors hover:border-aubergine-200",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aubergine-500",
            )}
          >
            {selected.status === "ACTIVE" ? (
              <StatusDot />
            ) : (
              <Lock className="size-3.5 text-ink-muted" />
            )}
            <span className="tabular-nums">{selected.label}</span>
            <ChevronDown className="size-4 text-ink-muted" />
          </button>
        )}
      >
        {(close) => (
          <>
            <SimpleMenuLabel>Meal months</SimpleMenuLabel>
            {list.map((m) => (
              <SimpleMenuItem
                key={m.key}
                onClick={() => {
                  onSelectMonth?.(m.key);
                  close();
                }}
              >
                {m.status === "ACTIVE" ? (
                  <StatusDot className="mx-1" />
                ) : (
                  <Lock />
                )}
                <span className="flex-1 tabular-nums">{m.label}</span>
                <span className="text-caption text-ink-subtle">
                  {m.status === "ACTIVE" ? "Active" : "Closed"}
                </span>
                {m.key === selected.key && (
                  <Check className="text-aubergine-800!" />
                )}
              </SimpleMenuItem>
            ))}
          </>
        )}
      </SimpleDropdown>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Next month"
        disabled={!newer}
        onClick={() => newer && onSelectMonth?.(newer.key)}
        className="hidden sm:inline-flex"
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
