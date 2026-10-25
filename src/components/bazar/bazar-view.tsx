"use client";

import { CalendarPlus, CalendarX, SearchX, ShoppingBasket } from "lucide-react";
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
import {
  filterEntries,
  isFiltered,
  noFilter,
  recompute,
  removeBazar,
  sortEntries,
  sumAmounts,
  upsertBazar,
} from "@/lib/bazar";
import { formatBDT } from "@/lib/format";
import type {
  BazarData,
  BazarEntry,
  BazarFilter,
  BazarInput,
  BazarSort,
  SortKey,
} from "@/lib/types/bazar.types";
import { BazarEntryDialog, DeleteConfirm, type DialogTarget } from "./dialogs";
import { BazarFilters, BazarHeader, BazarSummaryStrip } from "./layout";
import { BazarCardList, BazarTable, PAGE_SIZE } from "./table";

export const SAVE_ERROR = "Couldn’t save. Try again.";
const LATENCY_MS = 450;

export interface BazarStateOptions {
  /** Every save or delete fails and reverts. */
  failSaves?: boolean;
  initialToast?: string;
  initialFailedId?: string;
}

export interface BazarViewProps {
  data: BazarData;
  state?: BazarStateOptions;
  initialFilter?: BazarFilter;
  initialSort?: BazarSort;
  initialDialog?: DialogTarget;
  initialDeleteId?: string;
  /** Replace the list card with an inline error (summary strip stays). */
  listError?: boolean;
}

const defaultSort: BazarSort = { key: "date", dir: "desc" };

function restore(
  data: BazarData,
  id: string,
  previous: BazarEntry | undefined,
): BazarData {
  const rest = data.entries.filter((e) => e.id !== id);
  return recompute({ ...data, entries: previous ? [...rest, previous] : rest });
}

export function BazarView({
  data: initial,
  state,
  initialFilter,
  initialSort,
  initialDialog,
  initialDeleteId,
  listError,
}: BazarViewProps) {
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
    (id: string, apply: (d: BazarData) => BazarData) => {
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
        setToast(SAVE_ERROR);
      }, LATENCY_MS);
      timers.current.push(t);
    },
    [state?.failSaves],
  );

  const save = useCallback(
    (input: BazarInput) => {
      const id = input.id ?? `bz_new_${counter.current++}`;
      runMutation(id, (d) => upsertBazar(d, input, id));
    },
    [runMutation],
  );

  const remove = useCallback(
    (id: string) => runMutation(id, (d) => removeBazar(d, id)),
    [runMutation],
  );

  const dismissToast = useCallback(() => setToast(null), []);

  const { month } = data;
  const desktop = useMediaQuery("(min-width: 768px)");
  const [filter, setFilter] = useState<BazarFilter>(initialFilter ?? noFilter);
  const [sort, setSort] = useState<BazarSort>(initialSort ?? defaultSort);
  const [page, setPage] = useState(1);
  const [dialog, setDialog] = useState<DialogTarget | null>(
    initialDialog ?? null,
  );
  const [deleting, setDeleting] = useState<BazarEntry | null>(
    () => initial.entries.find((e) => e.id === initialDeleteId) ?? null,
  );
  const canEdit = !!month && !month.isLocked;

  const closeDialog = useCallback(() => setDialog(null), []);
  const closeDelete = useCallback(() => setDeleting(null), []);

  const matches = useMemo(
    () => sortEntries(filterEntries(data.entries, filter), sort, data.members),
    [data.entries, data.members, filter, sort],
  );
  const pages = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
  const safePage = Math.min(page, pages);
  const rows = matches.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const changeFilter = (next: BazarFilter) => {
    setFilter(next);
    setPage(1);
  };
  const changeSort = (key: SortKey) => {
    setSort((cur) =>
      cur.key === key
        ? { key, dir: cur.dir === "asc" ? "desc" : "asc" }
        : { key, dir: key === "payer" ? "asc" : "desc" },
    );
    setPage(1);
  };

  if (!month) {
    const manager = data.viewer.isManager;
    return (
      <div className="flex flex-col gap-5 sm:gap-6">
        <BazarHeader data={data} />
        <Card>
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
                ? "Open a month to start logging bazar for your flatmates."
                : `Bazar entries appear here as soon as ${data.mess.managerFirstName} opens the month.`
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

  const openAdd = () => setDialog({});
  const nameOf = (id: string) =>
    data.members.find((m) => m.id === id)?.name ?? "Former member";
  const isEmpty = data.entries.length === 0;
  const filtered = isFiltered(filter);
  const shownTo = Math.min(
    matches.length,
    desktop ? safePage * PAGE_SIZE : matches.length,
  );

  let listContent: React.ReactNode;
  if (listError) {
    listContent = (
      <ErrorState
        title="Couldn't load bazar entries"
        description="Your totals above are fine. Check your connection and try again."
      />
    );
  } else if (isEmpty) {
    listContent = (
      <EmptyState
        size="lg"
        icon={
          <IconTile tone="marigold" size="lg">
            <ShoppingBasket />
          </IconTile>
        }
        title="No bazar entries yet"
        description={
          canEdit
            ? "Log the first grocery trip and the meal rate will start to move."
            : "Nothing was logged in this month."
        }
        actions={
          canEdit && (
            <Button variant="accent" onClick={openAdd}>
              <CalendarPlus />
              Add Bazar Trip
            </Button>
          )
        }
      />
    );
  } else {
    listContent = (
      <>
        <BazarFilters
          filter={filter}
          members={data.members}
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
              description="Try another shopper or widen the date range."
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
            <BazarTable
              rows={rows}
              matchCount={matches.length}
              matchTotal={sumAmounts(matches)}
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
              <BazarCardList
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
                {filtered ? ` · ${formatBDT(sumAmounts(matches))}` : ""}
              </p>
            </>
          )}
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <BazarHeader data={data} onAdd={openAdd} />

      {month.isLocked && (
        <Banner
          tone="neutral"
          title={`${month.longLabel} is closed`}
          description={`Bazar is locked. Final meal rate ${formatBDT(data.mealRate)}.`}
        />
      )}

      <BazarSummaryStrip data={data} />

      <Card className="overflow-hidden gap-0">{listContent}</Card>

      <BazarEntryDialog
        target={dialog}
        data={data}
        onSave={save}
        onDelete={(entry) => {
          setDialog(null);
          setDeleting(entry);
        }}
        onClose={closeDialog}
      />

      <DeleteConfirm
        entry={deleting}
        payerName={deleting ? nameOf(deleting.memberId) : ""}
        newRate={deleting ? removeBazar(data, deleting.id).mealRate : 0}
        onConfirm={() => deleting && remove(deleting.id)}
        onClose={closeDelete}
      />

      {toast && <Toast message={toast} onDismiss={dismissToast} />}
    </div>
  );
}
