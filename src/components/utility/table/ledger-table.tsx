"use client";

import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { describeDay } from "@/lib/dates";
import { formatBDT } from "@/lib/format";
import type {
  UtilityEntry,
  UtilityMember,
  UtilitySort,
  UtilitySortKey,
} from "@/lib/types/utility.types";
import { cn } from "@/lib/utils";

export const LEDGER_PAGE_SIZE = 8;

export function entryTitle(
  entry: UtilityEntry,
  members: UtilityMember[],
): string {
  if (entry.kind === "BILL") return entry.category ?? "Bill";
  return members.find((m) => m.id === entry.memberId)?.name ?? "Former member";
}

export function KindBadge({ kind }: { kind: UtilityEntry["kind"] }) {
  return kind === "DEPOSIT" ? (
    <Badge variant="status-active" size="sm">
      Deposit
    </Badge>
  ) : (
    <Badge variant="info" size="sm">
      Bill
    </Badge>
  );
}

/** Signed amount: deposits +, bills − (U2). */
export function AmountText({ entry }: { entry: UtilityEntry }) {
  return (
    <span
      className={cn(
        "tabular-nums",
        entry.kind === "DEPOSIT" ? "text-success" : "text-ink",
      )}
    >
      {formatBDT(entry.kind === "DEPOSIT" ? entry.amount : -entry.amount, {
        signed: true,
      })}
    </span>
  );
}

interface LedgerTableProps {
  rows: UtilityEntry[];
  /** Entries matching the filter (all pages). */
  matchCount: number;
  matchNet: number;
  members: UtilityMember[];
  sort: UtilitySort;
  page: number;
  canEdit: boolean;
  saving: ReadonlySet<string>;
  failedId: string | null;
  onSort: (key: UtilitySortKey) => void;
  onPage: (page: number) => void;
  onEdit: (entry: UtilityEntry) => void;
  onDelete: (entry: UtilityEntry) => void;
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
  sortKey: UtilitySortKey;
  sort: UtilitySort;
  align?: "right";
  onSort: (key: UtilitySortKey) => void;
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

/** Desktop ledger table (Design.md §10.18). Mobile uses LedgerCardList. */
export function LedgerTable({
  rows,
  matchCount,
  matchNet,
  members,
  sort,
  page,
  canEdit,
  saving,
  failedId,
  onSort,
  onPage,
  onEdit,
  onDelete,
}: LedgerTableProps) {
  const pages = Math.max(1, Math.ceil(matchCount / LEDGER_PAGE_SIZE));
  const from = matchCount === 0 ? 0 : (page - 1) * LEDGER_PAGE_SIZE + 1;
  const to = Math.min(matchCount, page * LEDGER_PAGE_SIZE);

  return (
    <div>
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-160 border-separate border-spacing-0 text-body-sm">
          <caption className="sr-only">Utility fund ledger</caption>
          <thead>
            <tr>
              <SortHead
                label="Date"
                sortKey="date"
                sort={sort}
                onSort={onSort}
              />
              <th scope="col" className={headClass}>
                Type
              </th>
              <th scope="col" className={headClass}>
                From / for
              </th>
              <th scope="col" className={headClass}>
                Note
              </th>
              <SortHead
                label="Amount"
                sortKey="amount"
                sort={sort}
                align="right"
                onSort={onSort}
              />
              {canEdit && (
                <th scope="col" className={cn(headClass, "w-28 text-right")}>
                  <span className="sr-only">Actions</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((e) => {
              const day = describeDay(e.date);
              const title = entryTitle(e, members);
              return (
                <tr
                  key={e.id}
                  className={cn(
                    "transition-colors hover:bg-silver-100",
                    saving.has(e.id) && "opacity-60",
                    failedId === e.id && "bg-error-surface",
                  )}
                >
                  <td className="h-12 border-b border-line px-4 whitespace-nowrap text-ink">
                    {day.day} {day.monthShort}
                    <span className="ml-1.5 text-ink-muted">{day.weekday}</span>
                  </td>
                  <td className="h-12 border-b border-line px-4">
                    <KindBadge kind={e.kind} />
                  </td>
                  <td className="h-12 border-b border-line px-4">
                    <span className="flex items-center gap-2 whitespace-nowrap">
                      {e.kind === "DEPOSIT" && (
                        <Avatar name={title} size="xs" />
                      )}
                      {title}
                    </span>
                  </td>
                  <td className="h-12 max-w-0 border-b border-line px-4 text-ink-muted">
                    <span className="block truncate" title={e.note}>
                      {e.note || "—"}
                    </span>
                  </td>
                  <td className="h-12 border-b border-line px-4 text-right font-medium">
                    <AmountText entry={e} />
                  </td>
                  {canEdit && (
                    <td className="h-12 border-b border-line px-2 text-right whitespace-nowrap">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Edit ${e.kind === "DEPOSIT" ? "deposit" : "bill"} ${title}, ${day.day} ${day.monthShort}`}
                        onClick={() => onEdit(e)}
                      >
                        <Pencil />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Delete ${e.kind === "DEPOSIT" ? "deposit" : "bill"} ${title}, ${day.day} ${day.monthShort}`}
                        onClick={() => onDelete(e)}
                        className="text-error"
                      >
                        <Trash2 />
                      </Button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th
                scope="row"
                colSpan={4}
                className="h-12 bg-silver-100 px-4 text-left text-body-sm font-semibold text-ink"
              >
                Net effect on fund ({matchCount}{" "}
                {matchCount === 1 ? "entry" : "entries"})
              </th>
              <td className="h-12 bg-silver-100 px-4 text-right font-semibold text-ink tabular-nums">
                {formatBDT(matchNet, { signed: true })}
              </td>
              {canEdit && <td className="bg-silver-100" />}
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 text-body-sm text-ink-muted">
        <p aria-live="polite">
          Showing {from} to {to} of {matchCount}{" "}
          {matchCount === 1 ? "entry" : "entries"}
        </p>
        {pages > 1 && (
          <nav aria-label="Pagination" className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Previous page"
              disabled={page <= 1}
              onClick={() => onPage(page - 1)}
            >
              <ChevronLeft />
            </Button>
            <span className="px-2 tabular-nums">
              {page} / {pages}
            </span>
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Next page"
              disabled={page >= pages}
              onClick={() => onPage(page + 1)}
            >
              <ChevronRight />
            </Button>
          </nav>
        )}
      </div>
    </div>
  );
}
