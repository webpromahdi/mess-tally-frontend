"use client";

import { Avatar } from "@/components/ui/avatar";
import { groupByDate } from "@/lib/bazar";
import { formatDayLong } from "@/lib/dates";
import { formatBDT } from "@/lib/format";
import type { BazarEntry, BazarMember } from "@/lib/types/bazar.types";
import { cn } from "@/lib/utils";

/** Mobile replacement for the table: date-grouped cards with sticky date headers. */
export function BazarCardList({
  entries,
  members,
  canEdit,
  saving,
  failedId,
  onOpen,
}: {
  entries: BazarEntry[];
  members: BazarMember[];
  canEdit: boolean;
  saving: ReadonlySet<string>;
  failedId: string | null;
  onOpen: (entry: BazarEntry) => void;
}) {
  const groups = groupByDate(entries);
  const nameOf = (id: string) =>
    members.find((m) => m.id === id)?.name ?? "Former member";
  return (
    <div className="flex flex-col">
      {groups.map((g) => (
        <section key={g.date} aria-label={formatDayLong(g.date)}>
          <h3 className="sticky top-0 z-10 flex items-center justify-between bg-silver-200 px-4 py-2 text-caption font-semibold tracking-wide text-gray-600 uppercase">
            <span>{formatDayLong(g.date)}</span>
            <span className="tabular-nums">{formatBDT(g.total)}</span>
          </h3>
          <ul>
            {g.entries.map((e) => {
              const name = nameOf(e.memberId);
              const body = (
                <>
                  <Avatar name={name} size="md" />
                  <span className="min-w-0 flex-1 text-left">
                    <span className="block truncate text-body font-medium text-ink">
                      {name}
                    </span>
                    <span className="block truncate text-body-sm text-ink-muted">
                      {e.note || "No note"}
                    </span>
                  </span>
                  <span className="text-body font-semibold text-ink tabular-nums">
                    {formatBDT(e.amount)}
                  </span>
                </>
              );
              const cls = cn(
                "flex min-h-16 w-full items-center gap-3 border-b border-line px-4 py-3",
                saving.has(e.id) && "opacity-60",
                failedId === e.id && "bg-error-surface",
              );
              return (
                <li key={e.id}>
                  {canEdit ? (
                    <button
                      type="button"
                      onClick={() => onOpen(e)}
                      aria-label={`Edit ${name}, ${formatBDT(e.amount)}`}
                      className={cn(cls, "active:bg-silver-100")}
                    >
                      {body}
                    </button>
                  ) : (
                    <div className={cls}>{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
