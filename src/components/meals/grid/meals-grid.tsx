"use client";

import {
  type KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { daysBetween, isFuture } from "@/lib/dates";
import { formatMeals } from "@/lib/format";
import { cellTotal, dayTotal, entryKey, indexEntries } from "@/lib/meals";
import type { MealsGridData } from "@/lib/types/meal.types";
import { cn } from "@/lib/utils";

interface MealsGridProps {
  data: MealsGridData;
  canEdit: boolean;
  activeKey: string | null;
  saving: ReadonlySet<string>;
  failedKey: string | null;
  onCellSelect: (memberId: string, date: string, el: HTMLElement) => void;
}

const stickyLeft = "sticky left-0 z-10 border-r border-line";
const stickyRight = "sticky right-0 z-10 border-l border-line";

/** Spreadsheet matrix: members as rows, dates as columns (Design.md §2.2, §10.18). */
export function MealsGrid({
  data,
  canEdit,
  activeKey,
  saving,
  failedKey,
  onCellSelect,
}: MealsGridProps) {
  const { month, members, entries, today, viewer } = data;
  const days = useMemo(
    () => (month ? daysBetween(month.startDate, month.endDate) : []),
    [month],
  );
  const lookup = useMemo(() => indexEntries(entries), [entries]);
  const todayIndex = days.findIndex((d) => d.iso === today);
  const startCol = todayIndex >= 0 ? todayIndex : 0;
  const viewerRow = Math.max(
    0,
    members.findIndex((m) => m.id === viewer.memberId),
  );
  const [focus, setFocus] = useState({ r: viewerRow, c: startCol });
  const scroller = useRef<HTMLDivElement>(null);
  const table = useRef<HTMLTableElement>(null);

  useEffect(() => {
    if (todayIndex < 0) return;
    const box = scroller.current;
    const col = table.current?.querySelector<HTMLElement>("[data-today-col]");
    if (!box || !col) return;
    box.scrollLeft = Math.max(0, col.offsetLeft - box.clientWidth / 2);
  }, [todayIndex]);

  function onKeyDown(e: KeyboardEvent<HTMLElement>, r: number, c: number) {
    let nr = r;
    let nc = c;
    if (e.key === "ArrowRight") nc = Math.min(days.length - 1, c + 1);
    else if (e.key === "ArrowLeft") nc = Math.max(0, c - 1);
    else if (e.key === "ArrowDown") nr = Math.min(members.length - 1, r + 1);
    else if (e.key === "ArrowUp") nr = Math.max(0, r - 1);
    else if (e.key === "Home") nc = 0;
    else if (e.key === "End") nc = days.length - 1;
    else return;
    e.preventDefault();
    const next = table.current?.querySelector<HTMLElement>(
      `[data-r="${nr}"][data-c="${nc}"]`,
    );
    next?.focus();
    next?.scrollIntoView({ block: "nearest", inline: "center" });
  }

  return (
    <div ref={scroller} className="w-full overflow-x-auto">
      <table
        ref={table}
        className="w-max min-w-full border-separate border-spacing-0 text-body-sm"
      >
        <caption className="sr-only">
          Meals per flatmate per day for {month?.longLabel}. Use arrow keys to
          move between days.
        </caption>
        <thead>
          <tr>
            <th
              scope="col"
              className={cn(
                stickyLeft,
                "z-20 h-14 min-w-44 border-b bg-gray-100 px-4 text-left text-label font-semibold tracking-wider text-gray-600 uppercase",
              )}
            >
              Flatmate
            </th>
            {days.map((d, c) => {
              const isToday = c === todayIndex;
              const future = isFuture(d.iso, today);
              return (
                <th
                  key={d.iso}
                  scope="col"
                  data-today-col={isToday || undefined}
                  className={cn(
                    "h-14 w-11 min-w-11 border-b border-line bg-gray-100 px-0 text-center",
                    future && "opacity-60",
                  )}
                >
                  <span className="block text-caption font-semibold tracking-wide text-gray-600 uppercase">
                    {d.weekday.slice(0, 2)}
                  </span>
                  <span
                    className={cn(
                      "mx-auto mt-0.5 flex size-6 items-center justify-center rounded-full text-label font-semibold tabular-nums",
                      isToday ? "bg-aubergine-800 text-white" : "text-ink",
                    )}
                  >
                    {d.day}
                    {isToday && <span className="sr-only"> (today)</span>}
                  </span>
                </th>
              );
            })}
            <th
              scope="col"
              className={cn(
                stickyRight,
                "z-20 h-14 w-20 min-w-20 border-b bg-gray-100 px-4 text-right text-label font-semibold tracking-wider text-gray-600 uppercase",
              )}
            >
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {members.map((m, r) => {
            const isViewer = m.id === viewer.memberId;
            const rowBg = isViewer ? "bg-aubergine-50" : "bg-surface";
            return (
              <tr key={m.id}>
                <th
                  scope="row"
                  className={cn(
                    stickyLeft,
                    "h-12 min-w-44 border-b px-4 text-left font-medium",
                    rowBg,
                    m.status === "LEFT" && "opacity-70",
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <Avatar name={m.name} size="sm" />
                    <span className="truncate text-ink">{m.name}</span>
                    {isViewer && (
                      <Badge variant="brand" size="sm">
                        You
                      </Badge>
                    )}
                    {m.status === "LEFT" && (
                      <Badge variant="neutral" size="sm">
                        Left
                      </Badge>
                    )}
                  </span>
                </th>
                {days.map((d, c) => {
                  const entry = lookup.get(entryKey(m.id, d.iso));
                  const total = entry ? cellTotal(entry) : 0;
                  const key = entryKey(m.id, d.iso);
                  const future = isFuture(d.iso, today);
                  const isToday = c === todayIndex;
                  const editable = canEdit && !future;
                  const isActive = activeKey === key;
                  const isFailed = failedKey === key;
                  const label = `${m.name}, ${d.weekdayLong} ${d.day} ${d.monthShort}: ${total === 0 ? "no meals" : `${formatMeals(total)} ${total === 1 ? "meal" : "meals"}`}${entry && entry.guestMeals > 0 ? `, including ${formatMeals(entry.guestMeals)} guest` : ""}`;
                  const bg = isFailed
                    ? "bg-error-surface"
                    : isToday
                      ? isViewer
                        ? "bg-marigold-100"
                        : "bg-marigold-50"
                      : isViewer
                        ? "bg-aubergine-50"
                        : d.isFriday
                          ? "bg-canvas"
                          : "bg-surface";
                  const body = (
                    <>
                      <span
                        className={cn(
                          total === 0 ? "text-gray-500" : "text-ink",
                          "font-semibold tabular-nums",
                        )}
                      >
                        {total === 0 ? "–" : formatMeals(total)}
                      </span>
                      {entry && entry.guestMeals > 0 && (
                        <span
                          aria-hidden
                          className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-marigold-500"
                        />
                      )}
                    </>
                  );
                  return (
                    <td
                      key={d.iso}
                      className={cn(
                        "h-12 w-11 min-w-11 border-b border-line p-0",
                        bg,
                        future && "opacity-50",
                        saving.has(key) && "opacity-60",
                      )}
                    >
                      {editable ? (
                        <button
                          type="button"
                          aria-label={label}
                          aria-haspopup="dialog"
                          data-cell={key}
                          data-r={r}
                          data-c={c}
                          tabIndex={focus.r === r && focus.c === c ? 0 : -1}
                          onFocus={() => setFocus({ r, c })}
                          onKeyDown={(e) => onKeyDown(e, r, c)}
                          onClick={(e) =>
                            onCellSelect(m.id, d.iso, e.currentTarget)
                          }
                          className={cn(
                            "relative flex h-12 w-full cursor-pointer items-center justify-center transition-colors hover:bg-aubergine-100 focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-aubergine-500",
                            isActive &&
                              "bg-aubergine-100 ring-2 ring-aubergine-600 ring-inset",
                            isFailed && "ring-2 ring-error ring-inset",
                          )}
                        >
                          {body}
                        </button>
                      ) : (
                        <span
                          role="img"
                          aria-label={label}
                          data-r={r}
                          data-c={c}
                          className="relative flex h-12 w-full items-center justify-center"
                        >
                          {body}
                        </span>
                      )}
                    </td>
                  );
                })}
                <td
                  className={cn(
                    stickyRight,
                    "h-12 w-20 min-w-20 border-b px-4 text-right font-semibold text-ink tabular-nums",
                    rowBg,
                  )}
                >
                  {formatMeals(m.totalMeals)}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th
              scope="row"
              className={cn(
                stickyLeft,
                "h-12 min-w-44 bg-gray-100 px-4 text-left text-label font-semibold tracking-wider text-gray-600 uppercase",
              )}
            >
              House total
            </th>
            {days.map((d) => {
              const t = dayTotal(entries, d.iso);
              return (
                <td
                  key={d.iso}
                  className={cn(
                    "h-12 w-11 min-w-11 bg-gray-100 text-center font-semibold tabular-nums",
                    t === 0 ? "text-gray-500" : "text-ink",
                    isFuture(d.iso, today) && "opacity-60",
                  )}
                >
                  {t === 0 ? "–" : formatMeals(t)}
                </td>
              );
            })}
            <td
              className={cn(
                stickyRight,
                "h-12 w-20 min-w-20 bg-aubergine-800 px-4 text-right font-semibold text-white tabular-nums",
              )}
            >
              {formatMeals(data.houseTotal)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
