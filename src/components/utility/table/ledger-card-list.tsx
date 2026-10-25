"use client";

import { Avatar } from "@/components/ui/avatar";
import { formatDayLong } from "@/lib/dates";
import { formatBDT } from "@/lib/format";
import type { UtilityEntry, UtilityMember } from "@/lib/types/utility.types";
import { groupByDate, netOf } from "@/lib/utility";
import { cn } from "@/lib/utils";
import { AmountText, entryTitle, KindBadge } from "./ledger-table";

/** Mobile replacement for the table: date-grouped cards with sticky date headers. */
export function LedgerCardList({
  entries,
  members,
  canEdit,
  saving,
  failedId,
  onOpen,
}: {
  entries: UtilityEntry[];
  members: UtilityMember[];
  canEdit: boolean;
  saving: ReadonlySet<string>;
  failedId: string | null;
  onOpen: (entry: UtilityEntry) => void;
}) {
  const groups = groupByDate(entries);
  return (
    <div className="flex flex-col">
      {groups.map((g) => (
        <section key={g.date} aria-label={formatDayLong(g.date)}>
          <h3 className="sticky top-0 z-10 flex items-center justify-between bg-silver-200 px-4 py-2 text-caption font-semibold tracking-wide text-gray-600 uppercase">
            <span>{formatDayLong(g.date)}</span>
            <span className="tabular-nums">
              {formatBDT(netOf(g.entries), { signed: true })}
            </span>
          </h3>
          <ul>
            {g.entries.map((e) => {
              const title = entryTitle(e, members);
              const body = (
                <>
                  {e.kind === "DEPOSIT" ? (
                    <Avatar name={title} size="md" />
                  ) : (
                    <KindBadge kind="BILL" />
                  )}
                  <span className="min-w-0 flex-1 text-left">
                    <span className="block truncate text-body font-medium text-ink">
                      {title}
                      {e.kind === "DEPOSIT" && (
                        <span className="ml-2 align-middle">
                          <KindBadge kind="DEPOSIT" />
                        </span>
                      )}
                    </span>
                    <span className="block truncate text-body-sm text-ink-muted">
                      {e.note || "No note"}
                    </span>
                  </span>
                  <span className="text-body font-semibold">
                    <AmountText entry={e} />
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
                      aria-label={`Edit ${title}, ${formatBDT(e.amount)}`}
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
