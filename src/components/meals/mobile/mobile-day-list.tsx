"use client";

import { ChevronDown, Pencil } from "lucide-react";
import { useMemo, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { daysBetween } from "@/lib/dates";
import { formatMeals } from "@/lib/format";
import { cellTotal, dayTotal, entryKey, indexEntries } from "@/lib/meals";
import type { MealsGridData } from "@/lib/types/meal.types";
import { cn } from "@/lib/utils";

interface MobileDayListProps {
  data: MealsGridData;
  canEdit: boolean;
  initialOpenDate?: string;
  saving: ReadonlySet<string>;
  failedKey: string | null;
  onEditCell: (memberId: string, date: string) => void;
  onEditDay: (date: string) => void;
}

/** < 768px replacement for the matrix: one accordion card per day, newest first (responsive.md §8). */
export function MobileDayList({
  data,
  canEdit,
  initialOpenDate,
  saving,
  failedKey,
  onEditCell,
  onEditDay,
}: MobileDayListProps) {
  const { month, members, entries, today, viewer } = data;
  const days = useMemo(
    () =>
      month
        ? daysBetween(month.startDate, month.endDate)
            .filter((d) => d.iso <= today)
            .reverse()
        : [],
    [month, today],
  );
  const lookup = useMemo(() => indexEntries(entries), [entries]);
  const [openDate, setOpenDate] = useState<string | null>(
    initialOpenDate ?? days[0]?.iso ?? null,
  );

  return (
    <ul className="flex flex-col gap-3">
      {days.map((d) => {
        const expanded = openDate === d.iso;
        const total = dayTotal(entries, d.iso);
        const panelId = `day-${d.iso}`;
        return (
          <li key={d.iso}>
            <Card className={cn(expanded && "border-aubergine-200")}>
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpenDate(expanded ? null : d.iso)}
                className="flex min-h-14 w-full cursor-pointer items-center gap-3 rounded-2xl px-4 py-2 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-aubergine-500"
              >
                <span
                  className={cn(
                    "flex size-11 shrink-0 flex-col items-center justify-center rounded-xl text-center",
                    d.iso === today
                      ? "bg-aubergine-800 text-white"
                      : d.isFriday
                        ? "bg-marigold-100 text-marigold-900"
                        : "bg-gray-100 text-ink",
                  )}
                >
                  <span className="text-caption leading-none font-semibold uppercase">
                    {d.weekday.slice(0, 3)}
                  </span>
                  <span className="text-h4 leading-tight tabular-nums">
                    {d.day}
                  </span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-body font-semibold text-ink">
                    {d.day} {d.monthShort}
                    {d.iso === today && (
                      <Badge variant="brand" size="sm" className="ml-2">
                        Today
                      </Badge>
                    )}
                  </span>
                  <span className="block text-body-sm text-ink-muted">
                    {total === 0
                      ? "No meals logged"
                      : `${formatMeals(total)} house meals`}
                  </span>
                </span>
                <ChevronDown
                  aria-hidden
                  className={cn(
                    "size-5 shrink-0 text-ink-muted transition-transform",
                    expanded && "rotate-180",
                  )}
                />
              </button>
              {expanded && (
                <div id={panelId} className="border-t border-line">
                  <ul>
                    {members.map((m) => {
                      const key = entryKey(m.id, d.iso);
                      const e = lookup.get(key);
                      const t = e ? cellTotal(e) : 0;
                      const failed = failedKey === key;
                      const row = (
                        <>
                          <Avatar name={m.name} size="sm" />
                          <span className="min-w-0 flex-1">
                            <span className="flex items-center gap-2 text-body font-medium text-ink">
                              <span className="truncate">{m.name}</span>
                              {m.id === viewer.memberId && (
                                <Badge variant="brand" size="sm">
                                  You
                                </Badge>
                              )}
                            </span>
                            <span className="block text-caption text-ink-muted tabular-nums">
                              {e
                                ? `B ${formatMeals(e.breakfast)} · L ${formatMeals(e.lunch)} · D ${formatMeals(e.dinner)}${e.guestMeals > 0 ? ` · Guest ${formatMeals(e.guestMeals)}` : ""}`
                                : "Nothing logged"}
                            </span>
                          </span>
                          <span
                            className={cn(
                              "text-h4 tabular-nums",
                              t === 0 ? "text-gray-500" : "text-ink",
                              saving.has(key) && "opacity-60",
                            )}
                          >
                            {t === 0 ? "–" : formatMeals(t)}
                          </span>
                        </>
                      );
                      const base = cn(
                        "flex min-h-14 w-full items-center gap-3 px-4 py-2 text-left",
                        failed && "bg-error-surface",
                      );
                      return (
                        <li
                          key={m.id}
                          className="border-b border-line last:border-b-0"
                        >
                          {canEdit ? (
                            <button
                              type="button"
                              aria-label={`Edit ${m.name}, ${d.day} ${d.monthShort}`}
                              onClick={() => onEditCell(m.id, d.iso)}
                              className={cn(
                                base,
                                "cursor-pointer active:bg-aubergine-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-aubergine-500",
                              )}
                            >
                              {row}
                            </button>
                          ) : (
                            <div className={base}>{row}</div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                  {canEdit && (
                    <div className="p-3">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => onEditDay(d.iso)}
                      >
                        <Pencil />
                        Log whole day
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </li>
        );
      })}
    </ul>
  );
}
