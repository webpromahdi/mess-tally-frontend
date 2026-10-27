"use client";

import {
  CalendarPlus,
  CalendarX,
  Plus,
  Receipt,
  SearchX,
  Wallet,
} from "lucide-react";
import type React from "react";
import { useCallback, useMemo, useState } from "react";
import {
  Banner,
  EmptyState,
  ErrorState,
  IconTile,
  Toast,
} from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useMediaQuery } from "@/hooks";
import { getApiMessage } from "@/lib/apiError";
import { formatBDT } from "@/lib/format";
import type {
  UtilityData,
  UtilityEntry,
  UtilityFilter,
  UtilityInput,
  UtilitySort,
  UtilitySortKey,
} from "@/lib/types/utility.types";
import {
  filterEntries,
  isFiltered,
  netOf,
  noFilter,
  removeEntry,
  sortEntries,
} from "@/lib/utility";
import {
  UtilityDeleteConfirm,
  type UtilityDialogTarget,
  UtilityEntryDialog,
} from "./dialogs";
import {
  MemberDeposits,
  UtilityFilters,
  UtilityHeader,
  UtilitySummaryStrip,
} from "./layout";
import {
  entryTitle,
  LEDGER_PAGE_SIZE,
  LedgerCardList,
  LedgerTable,
} from "./table";

export interface UtilityViewProps {
  data: UtilityData;
  initialFilter?: UtilityFilter;
  initialSort?: UtilitySort;
  initialDialog?: UtilityDialogTarget;
  initialDeleteId?: string;
  /** Replace the ledger card with an inline error (summary strip stays). */
  listError?: boolean;
  /** Rejects on failure; the view shows the API message in a toast. */
  onSave: (input: UtilityInput) => Promise<void>;
  onDelete: (entry: UtilityEntry) => Promise<void>;
  /** Bills only; deposits are always paid (API.md §38). */
  onTogglePaid: (entry: UtilityEntry) => Promise<void>;
  /** Manager action when the selected month has no row yet. */
  onCreateMonth?: () => Promise<void>;
}

const defaultSort: UtilitySort = { key: "date", dir: "desc" };

export function UtilityView({
  data,
  initialFilter,
  initialSort,
  initialDialog,
  initialDeleteId,
  listError,
  onSave,
  onDelete,
  onTogglePaid,
  onCreateMonth,
}: UtilityViewProps) {
  const [saving, setSaving] = useState<ReadonlySet<string>>(new Set());
  const [failedId, setFailedId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  /** Runs one write, keeping the row marked while the request is in flight. */
  const runMutation = useCallback(
    async (
      key: string,
      action: () => Promise<void>,
      success?: string,
    ): Promise<boolean> => {
      setSaving((prev) => new Set(prev).add(key));
      setFailedId(null);
      try {
        await action();
        if (success) setToast(success);
        return true;
      } catch (error) {
        setFailedId(key);
        setToast(getApiMessage(error, "Couldn't save. Try again."));
        return false;
      } finally {
        setSaving((prev) => {
          const next = new Set(prev);
          next.delete(key);
          return next;
        });
      }
    },
    [],
  );

  const save = useCallback(
    (input: UtilityInput) =>
      runMutation(
        input.id ?? "new",
        () => onSave(input),
        input.kind === "DEPOSIT"
          ? input.id
            ? "Deposit updated"
            : "Deposit recorded"
          : input.id
            ? "Bill updated"
            : "Bill added",
      ),
    [onSave, runMutation],
  );

  const remove = useCallback(
    (entry: UtilityEntry) =>
      runMutation(
        entry.id,
        () => onDelete(entry),
        entry.kind === "DEPOSIT" ? "Deposit deleted" : "Bill deleted",
      ),
    [onDelete, runMutation],
  );

  const togglePaid = useCallback(
    (entry: UtilityEntry) =>
      runMutation(
        entry.id,
        () => onTogglePaid(entry),
        entry.isPaid ? "Bill marked unpaid" : "Bill marked paid",
      ),
    [onTogglePaid, runMutation],
  );

  const openMonth = useCallback(() => {
    if (!onCreateMonth) return;
    void runMutation("month", onCreateMonth, "Month opened");
  }, [onCreateMonth, runMutation]);

  const { month } = data;
  const desktop = useMediaQuery("(min-width: 768px)");
  const [filter, setFilter] = useState<UtilityFilter>(
    initialFilter ?? noFilter,
  );
  const [sort, setSort] = useState<UtilitySort>(initialSort ?? defaultSort);
  const [page, setPage] = useState(1);
  const [dialog, setDialog] = useState<UtilityDialogTarget | null>(
    initialDialog ?? null,
  );
  const [deleting, setDeleting] = useState<UtilityEntry | null>(
    () => data.entries.find((e) => e.id === initialDeleteId) ?? null,
  );

  // Any active member may write bills; every deposit write is manager-only.
  const canEdit = !!month && !month.isLocked;
  const canEditEntry = useCallback(
    (entry: UtilityEntry) =>
      canEdit && (entry.kind === "BILL" || data.viewer.isManager),
    [canEdit, data.viewer.isManager],
  );

  const closeDialog = useCallback(() => setDialog(null), []);
  const closeDelete = useCallback(() => setDeleting(null), []);

  const matches = useMemo(
    () => sortEntries(filterEntries(data.entries, filter), sort),
    [data.entries, filter, sort],
  );
  const pages = Math.max(1, Math.ceil(matches.length / LEDGER_PAGE_SIZE));
  const safePage = Math.min(page, pages);
  const rows = matches.slice(
    (safePage - 1) * LEDGER_PAGE_SIZE,
    safePage * LEDGER_PAGE_SIZE,
  );

  const changeFilter = (next: UtilityFilter) => {
    setFilter(next);
    setPage(1);
  };
  const changeSort = (key: UtilitySortKey) => {
    setSort((cur) =>
      cur.key === key
        ? { key, dir: cur.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "desc" },
    );
    setPage(1);
  };

  if (!month) {
    const manager = data.viewer.isManager;
    return (
      <div className="flex flex-col gap-5 sm:gap-6">
        <UtilityHeader data={data} />
        <Card className="gap-0">
          <EmptyState
            size="lg"
            icon={
              <IconTile tone={manager ? "marigold" : "neutral"} size="lg">
                {manager ? <CalendarPlus /> : <CalendarX />}
              </IconTile>
            }
            title={
              manager
                ? "No active month"
                : "Waiting for the manager to open this month."
            }
            description={
              manager
                ? "Open a month to record deposits and utility bills."
                : `The utility fund appears here as soon as ${data.mess.managerFirstName} opens the month.`
            }
            actions={
              manager &&
              onCreateMonth && (
                <Button
                  variant="accent"
                  disabled={saving.has("month")}
                  onClick={openMonth}
                >
                  <CalendarPlus />
                  {saving.has("month") ? "Opening…" : "Open this month"}
                </Button>
              )
            }
          />
        </Card>
      </div>
    );
  }

  const openDeposit = () => setDialog({ initialValues: { kind: "DEPOSIT" } });
  const openBill = () => setDialog({ initialValues: { kind: "BILL" } });
  const isEmpty = data.entries.length === 0;
  const filtered = isFiltered(filter);
  const shownTo = desktop
    ? Math.min(matches.length, safePage * LEDGER_PAGE_SIZE)
    : matches.length;

  let listContent: React.ReactNode;
  if (listError) {
    listContent = (
      <ErrorState
        title="Couldn't load the ledger"
        description="Your fund totals above are fine. Check your connection and try again."
      />
    );
  } else if (isEmpty) {
    listContent = (
      <EmptyState
        size="lg"
        icon={
          <IconTile tone="marigold" size="lg">
            <Wallet />
          </IconTile>
        }
        title="No utility activity yet"
        description={
          canEdit
            ? "Record the first deposit or bill and the fund balance will start to move."
            : "Nothing was recorded in this month."
        }
        actions={
          canEdit && (
            <div className="flex flex-wrap gap-2">
              {data.viewer.isManager && (
                <Button variant="primary" onClick={openDeposit}>
                  <Plus />
                  Record Deposit
                </Button>
              )}
              <Button variant="accent" onClick={openBill}>
                <Receipt />
                Add Bill
              </Button>
            </div>
          )
        }
      />
    );
  } else {
    listContent = (
      <>
        <UtilityFilters
          filter={filter}
          start={month.startDate}
          end={month.endDate}
          onChange={changeFilter}
        />
        <div className="border-t border-line">
          {matches.length === 0 ? (
            <EmptyState
              icon={
                <IconTile tone="neutral" size="lg">
                  <SearchX />
                </IconTile>
              }
              title="No entries match these filters"
              description="Try another category or widen the date range."
              actions={
                <Button
                  variant="outline"
                  onClick={() => changeFilter(noFilter)}
                >
                  Clear filters
                </Button>
              }
            />
          ) : desktop ? (
            <LedgerTable
              rows={rows}
              matchCount={matches.length}
              matchNet={netOf(matches)}
              members={data.members}
              sort={sort}
              page={safePage}
              canEdit={canEditEntry}
              saving={saving}
              failedId={failedId}
              onSort={changeSort}
              onPage={setPage}
              onEdit={(entry) => setDialog({ entry })}
              onDelete={setDeleting}
              onTogglePaid={(entry) => void togglePaid(entry)}
            />
          ) : (
            <>
              <LedgerCardList
                entries={matches}
                members={data.members}
                canEdit={canEditEntry}
                saving={saving}
                failedId={failedId}
                onOpen={(entry) => setDialog({ entry })}
              />
              <p
                className="px-4 py-3 text-body-sm text-ink-muted"
                aria-live="polite"
              >
                Showing 1 to {shownTo} of {matches.length}{" "}
                {matches.length === 1 ? "entry" : "entries"}
                {filtered
                  ? ` · net ${formatBDT(netOf(matches), { signed: true })}`
                  : ""}
              </p>
            </>
          )}
        </div>
      </>
    );
  }

  const dialogEntry = dialog?.entry
    ? (data.entries.find((e) => e.id === dialog.entry?.id) ?? dialog.entry)
    : undefined;

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <UtilityHeader
        data={data}
        onDeposit={data.viewer.isManager ? openDeposit : undefined}
        onBill={openBill}
      />

      {month.isLocked && (
        <Banner
          tone="neutral"
          title={`${month.longLabel} is closed`}
          description={`The utility ledger is locked. Closing balance ${formatBDT(data.balance)}.`}
        />
      )}
      {!month.isLocked && data.needsReplenishment && (
        <Banner
          tone="warning"
          title="Utility fund needs a top-up"
          description={`The fund balance is ${formatBDT(data.balance)}. Ask members to deposit before the next bill.`}
        />
      )}

      <UtilitySummaryStrip data={data} />

      <MemberDeposits data={data} />

      <Card className="overflow-hidden gap-0">{listContent}</Card>

      <UtilityEntryDialog
        target={dialog ? { ...dialog, entry: dialogEntry } : null}
        data={data}
        onSave={save}
        onDelete={(entry) => {
          setDialog(null);
          setDeleting(entry);
        }}
        onTogglePaid={
          dialogEntry?.kind === "BILL" && canEditEntry(dialogEntry)
            ? () => togglePaid(dialogEntry)
            : undefined
        }
        onClose={closeDialog}
      />

      <UtilityDeleteConfirm
        entry={deleting}
        title={deleting ? entryTitle(deleting, data.members) : ""}
        newBalance={deleting ? removeEntry(data, deleting.id).balance : 0}
        onConfirm={() => deleting && void remove(deleting)}
        onClose={closeDelete}
      />

      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </div>
  );
}
