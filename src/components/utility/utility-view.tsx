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
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  recompute,
  removeEntry,
  sortEntries,
  upsertEntry,
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

export const UTILITY_SAVE_ERROR = "Couldn’t save. Try again.";
const LATENCY_MS = 450;

export interface UtilityStateOptions {
  /** Every save or delete fails and reverts. */
  failSaves?: boolean;
  initialToast?: string;
  initialFailedId?: string;
}

export interface UtilityViewProps {
  data: UtilityData;
  state?: UtilityStateOptions;
  initialFilter?: UtilityFilter;
  initialSort?: UtilitySort;
  initialDialog?: UtilityDialogTarget;
  initialDeleteId?: string;
  /** Replace the ledger card with an inline error (summary strip stays). */
  listError?: boolean;
}

const defaultSort: UtilitySort = { key: "date", dir: "desc" };

function restore(
  data: UtilityData,
  id: string,
  previous: UtilityEntry | undefined,
): UtilityData {
  const rest = data.entries.filter((e) => e.id !== id);
  return recompute({ ...data, entries: previous ? [...rest, previous] : rest });
}

export function UtilityView({
  data: initial,
  state,
  initialFilter,
  initialSort,
  initialDialog,
  initialDeleteId,
  listError,
}: UtilityViewProps) {
  const [data, setData] = useState(initial);
  const [saving, setSaving] = useState<ReadonlySet<string>>(new Set());
  const [failedId, setFailedId] = useState<string | null>(
    state?.initialFailedId ?? null,
  );
  const [toast, setToast] = useState<string | null>(
    state?.initialToast ?? null,
  );
  const dataRef = useRef(data);
  dataRef.current = data;
  const counter = useRef(1);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach((t) => {
        window.clearTimeout(t);
      });
    };
  }, []);

  const runMutation = useCallback(
    (id: string, apply: (d: UtilityData) => UtilityData) => {
      const previous = dataRef.current.entries.find((e) => e.id === id);
      setData(apply);
      setFailedId(null);
      setToast(null);
      setSaving((s) => new Set(s).add(id));
      const t = window.setTimeout(() => {
        setSaving((s) => {
          const next = new Set(s);
          next.delete(id);
          return next;
        });
        if (!state?.failSaves) return;
        setData((d) => restore(d, id, previous));
        setFailedId(id);
        setToast(UTILITY_SAVE_ERROR);
      }, LATENCY_MS);
      timers.current.push(t);
    },
    [state?.failSaves],
  );

  const save = useCallback(
    (input: UtilityInput) => {
      const id = input.id ?? `ut_new_${counter.current++}`;
      runMutation(id, (d) => upsertEntry(d, input, id));
    },
    [runMutation],
  );

  const remove = useCallback(
    (id: string) => runMutation(id, (d) => removeEntry(d, id)),
    [runMutation],
  );

  const dismissToast = useCallback(() => setToast(null), []);

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
    () => initial.entries.find((e) => e.id === initialDeleteId) ?? null,
  );
  const canEdit = !!month && !month.isLocked && data.viewer.isManager;

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
              manager && (
                <Button variant="accent">
                  <CalendarPlus />
                  Open a month
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
              <Button variant="primary" onClick={openDeposit}>
                <Plus />
                Record Deposit
              </Button>
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
              canEdit={canEdit}
              saving={saving}
              failedId={failedId}
              onSort={changeSort}
              onPage={setPage}
              onEdit={(entry) => setDialog({ entry })}
              onDelete={setDeleting}
            />
          ) : (
            <>
              <LedgerCardList
                entries={matches}
                members={data.members}
                canEdit={canEdit}
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

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <UtilityHeader data={data} onDeposit={openDeposit} onBill={openBill} />

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
        target={dialog}
        data={data}
        onSave={save}
        onDelete={(entry) => {
          setDialog(null);
          setDeleting(entry);
        }}
        onClose={closeDialog}
      />

      <UtilityDeleteConfirm
        entry={deleting}
        title={deleting ? entryTitle(deleting, data.members) : ""}
        newBalance={deleting ? removeEntry(data, deleting.id).balance : 0}
        onConfirm={() => deleting && remove(deleting.id)}
        onClose={closeDelete}
      />

      {toast && <Toast message={toast} onDismiss={dismissToast} />}
    </div>
  );
}
