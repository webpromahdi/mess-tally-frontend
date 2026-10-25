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
import { Button } from "@/components/ui/button";
import { describeDay } from "@/lib/dates";
import { formatBDT } from "@/lib/format";
import type {
  BazarEntry,
  BazarMember,
  BazarSort,
  SortKey,
} from "@/lib/types/bazar.types";
import { cn } from "@/lib/utils";

export const BAZAR_PAGE_SIZE = 8;

interface BazarTableProps {
  rows: BazarEntry[];
  /** Entries matching the filter (all pages). */
  matchCount: number;
  matchTotal: number;
  members: BazarMember[];
  sort: BazarSort;
  page: number;
  canEdit: boolean;
  saving: ReadonlySet<string>;
  failedId: string | null;
  onSort: (key: SortKey) => void;
  onPage: (page: number) => void;
  onEdit: (entry: BazarEntry) => void;
  onDelete: (entry: BazarEntry) => void;
}

function SortHead({
  label,
  sortKey,
  sort,
  align,
  onSort,
}: {
  label: string;
  sortKey: SortKey;
  sort: BazarSort;
  align?: "right";
  onSort: (key: SortKey) => void;
}) {
  const active = sort.key === sortKey;
  const Icon = !active ? ArrowUpDown : sort.dir === "asc" ? ArrowUp : ArrowDown;
  return (
    <th
      scope="col"
      aria-sort={
        active ? (sort.dir === "asc" ? "ascending" : "descending") : "none"
      }
      className={cn(
        "sticky top-0 z-10 h-11 border-b border-line bg-silver-200 px-4 text-left text-caption font-semibold tracking-wide text-gray-600 uppercase",
        align === "right" && "text-right",
      )}
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

const plainHead =
  "sticky top-0 z-10 h-11 border-b border-line bg-silver-200 px-4 text-left text-caption font-semibold tracking-wide text-gray-600 uppercase";

/** Desktop table (Design.md §10.18). Mobile uses BazarCardList. */
export function BazarTable({
  rows,
  matchCount,
  matchTotal,
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
}: BazarTableProps) {
  const pages = Math.max(1, Math.ceil(matchCount / BAZAR_PAGE_SIZE));
  const from = matchCount === 0 ? 0 : (page - 1) * BAZAR_PAGE_SIZE + 1;
  const to = Math.min(matchCount, page * BAZAR_PAGE_SIZE);
  const nameOf = (id: string) =>
    members.find((m) => m.id === id)?.name ?? "Former member";

  return (
    <div>
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-160 border-separate border-spacing-0 text-body-sm">
          <caption className="sr-only">Bazar entries</caption>
          <thead>
            <tr>
              <SortHead
                label="Date"
                sortKey="date"
                sort={sort}
                onSort={onSort}
              />
              <SortHead
                label="Paid by"
                sortKey="payer"
                sort={sort}
                onSort={onSort}
              />
              <th scope="col" className={plainHead}>
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
                <th scope="col" className={cn(plainHead, "w-28 text-right")}>
                  <span className="sr-only">Actions</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((e) => {
              const day = describeDay(e.date);
              const name = nameOf(e.memberId);
              const isSaving = saving.has(e.id);
              return (
                <tr
                  key={e.id}
                  className={cn(
                    "group transition-colors hover:bg-silver-100",
                    isSaving && "opacity-60",
                    failedId === e.id && "bg-error-surface",
                  )}
                >
                  <td className="h-12 border-b border-line px-4 whitespace-nowrap text-ink">
                    {day.day} {day.monthShort}
                    <span className="ml-1.5 text-ink-muted">{day.weekday}</span>
                  </td>
                  <td className="h-12 border-b border-line px-4">
                    <span className="flex items-center gap-2 whitespace-nowrap">
                      <Avatar name={name} size="xs" />
                      {name}
                    </span>
                  </td>
                  <td className="h-12 max-w-0 border-b border-line px-4 text-ink-muted">
                    <span className="block truncate" title={e.note}>
                      {e.note || "—"}
                    </span>
                  </td>
                  <td className="h-12 border-b border-line px-4 text-right font-medium text-ink tabular-nums">
                    {formatBDT(e.amount)}
                  </td>
                  {canEdit && (
                    <td className="h-12 border-b border-line px-2 text-right whitespace-nowrap">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Edit ${name}'s bazar on ${day.day} ${day.monthShort}`}
                        onClick={() => onEdit(e)}
                      >
                        <Pencil />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Delete ${name}'s bazar on ${day.day} ${day.monthShort}`}
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
                colSpan={3}
                className="h-12 bg-silver-100 px-4 text-left text-body-sm font-semibold text-ink"
              >
                {matchCount === 1
                  ? "Total (1 entry)"
                  : `Total (${matchCount} entries)`}
              </th>
              <td className="h-12 bg-silver-100 px-4 text-right font-semibold text-ink tabular-nums">
                {formatBDT(matchTotal)}
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
