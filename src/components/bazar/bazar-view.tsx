"use client";

import { CalendarPlus, CalendarX, SearchX, ShoppingBasket } from "lucide-react";
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
import {
  filterEntries,
  isFiltered,
  noFilter,
  removeBazar,
  sortEntries,
  sumAmounts,
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
import {
  BazarDeleteConfirm,
  type BazarDialogTarget,
  BazarEntryDialog,
} from "./dialogs";
import { BazarFilters, BazarHeader, BazarSummaryStrip } from "./layout";
import { BAZAR_PAGE_SIZE, BazarCardList, BazarTable } from "./table";

export interface BazarViewProps {
  data: BazarData;
  /** PRO gates receipt upload/removal (API.md §33–34). */
  isPro: boolean;
  initialFilter?: BazarFilter;
  initialSort?: BazarSort;
  initialDialog?: BazarDialogTarget;
  initialDeleteId?: string;
  /** Replace the list card with an inline error (summary strip stays). */
  listError?: boolean;
  onSave: (input: BazarInput) => Promise<void>;
  onDelete: (entryId: string) => Promise<void>;
  /** Resolves with the new receipt URL, or `null` when none was returned. */
  onUploadReceipt: (entryId: string, file: File) => Promise<string | null>;
  onRemoveReceipt: (entryId: string) => Promise<void>;
  /** Manager action when the selected month has no row yet. */
  onCreateMonth?: () => Promise<void>;
}

const defaultSort: BazarSort = { key: "date", dir: "desc" };

export function BazarView({
  data,
  isPro,
  initialFilter,
  initialSort,
  initialDialog,
  initialDeleteId,
  listError,
  onSave,
  onDelete,
  onUploadReceipt,
  onRemoveReceipt,
  onCreateMonth,
}: BazarViewProps) {
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
    (input: BazarInput) =>
      runMutation(
        input.id ?? "new",
        () => onSave(input),
        input.id ? "Bazar entry updated" : "Bazar entry added",
      ),
    [onSave, runMutation],
  );

  const remove = useCallback(
    (id: string) => runMutation(id, () => onDelete(id), "Bazar entry deleted"),
    [onDelete, runMutation],
  );

  const openMonth = useCallback(() => {
    if (!onCreateMonth) return;
    void runMutation("month", onCreateMonth, "Month opened");
  }, [onCreateMonth, runMutation]);
  const { month } = data;
  const desktop = useMediaQuery("(min-width: 768px)");
  const [filter, setFilter] = useState<BazarFilter>(initialFilter ?? noFilter);
  const [sort, setSort] = useState<BazarSort>(initialSort ?? defaultSort);
  const [page, setPage] = useState(1);
  const [dialog, setDialog] = useState<BazarDialogTarget | null>(
    initialDialog ?? null,
  );
  const [deleting, setDeleting] = useState<BazarEntry | null>(
    () => data.entries.find((e) => e.id === initialDeleteId) ?? null,
  );
  const canEdit = !!month && !month.isLocked;

  const closeDialog = useCallback(() => setDialog(null), []);
  const closeDelete = useCallback(() => setDeleting(null), []);

  const matches = useMemo(
    () => sortEntries(filterEntries(data.entries, filter), sort, data.members),
    [data.entries, data.members, filter, sort],
  );
  const pages = Math.max(1, Math.ceil(matches.length / BAZAR_PAGE_SIZE));
  const safePage = Math.min(page, pages);
  const rows = matches.slice(
    (safePage - 1) * BAZAR_PAGE_SIZE,
    safePage * BAZAR_PAGE_SIZE,
  );

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
                ? "No month yet"
                : "Waiting for the manager to open this month."
            }
            description={
              manager
                ? "Open the month first, or log the first bazar trip and it opens automatically."
                : `Bazar entries appear here as soon as ${data.mess.managerFirstName} opens the month.`
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

  const openAdd = () => setDialog({});
  const nameOf = (id: string) =>
    data.members.find((m) => m.id === id)?.name ?? "Former member";
  const isEmpty = data.entries.length === 0;
  const filtered = isFiltered(filter);
  const shownTo = Math.min(
    matches.length,
    desktop ? safePage * BAZAR_PAGE_SIZE : matches.length,
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

  const dialogEntry = dialog?.entry;

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
        isPro={isPro}
        onSave={save}
        onDelete={(entry) => {
          setDialog(null);
          setDeleting(entry);
        }}
        onUploadReceipt={async (file) =>
          dialogEntry ? onUploadReceipt(dialogEntry.id, file) : null
        }
        onRemoveReceipt={async () => {
          if (dialogEntry) await onRemoveReceipt(dialogEntry.id);
        }}
        onClose={closeDialog}
      />

      <BazarDeleteConfirm
        entry={deleting}
        payerName={deleting ? nameOf(deleting.memberId) : ""}
        newRate={deleting ? removeBazar(data, deleting.id).mealRate : 0}
        onConfirm={() => deleting && void remove(deleting.id)}
        onClose={closeDelete}
      />

      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </div>
  );
}
