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

const history: ShellMonth[] = [
  { label: "Oct 2026", status: "ACTIVE" },
  { label: "Sep 2026", status: "CLOSED" },
  { label: "Aug 2026", status: "CLOSED" },
];

/** `‹ Oct 2026 ›` with a month list (Design.md §10.6). Arrows hide below 640px so the topbar never overflows. */
export function MonthSelector({ month }: { month: ShellMonth | null }) {
  if (!month) {
    return (
      <span className="inline-flex h-10 items-center gap-2 rounded-xl border border-dashed border-line-strong px-3 text-body-sm font-medium text-ink-muted">
        <CalendarX className="size-4" />
        <span className="hidden xs:inline">No active month</span>
        <span className="xs:hidden">No month</span>
      </span>
    );
  }
  const index = history.findIndex((m) => m.label === month.label);
  return (
    <div className="flex items-center gap-0.5">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Previous month"
        disabled={index === history.length - 1}
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
            aria-label={`Month: ${month.label}, ${
              month.status === "ACTIVE" ? "active" : "closed"
            }. Change month`}
            className={cn(
              "inline-flex h-11 cursor-pointer items-center gap-2 rounded-xl border border-line bg-surface px-3 text-body-sm font-semibold text-ink shadow-card transition-colors hover:border-aubergine-200",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aubergine-500",
            )}
          >
            {month.status === "ACTIVE" ? (
              <StatusDot />
            ) : (
              <Lock className="size-3.5 text-ink-muted" />
            )}
            <span className="tabular-nums">{month.label}</span>
            <ChevronDown className="size-4 text-ink-muted" />
          </button>
        )}
      >
        {(close) => (
          <>
            <SimpleMenuLabel>Meal months</SimpleMenuLabel>
            {history.map((m) => (
              <SimpleMenuItem key={m.label} onClick={close}>
                {m.status === "ACTIVE" ? (
                  <StatusDot className="mx-1" />
                ) : (
                  <Lock />
                )}
                <span className="flex-1 tabular-nums">{m.label}</span>
                <span className="text-caption text-ink-subtle">
                  {m.status === "ACTIVE" ? "Active" : "Closed"}
                </span>
                {m.label === month.label && (
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
        disabled={index <= 0}
        className="hidden sm:inline-flex"
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
