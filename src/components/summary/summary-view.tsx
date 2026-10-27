"use client";

import { CalendarPlus, CalendarX, ReceiptText } from "lucide-react";
import { useMemo, useState } from "react";
import { Banner, EmptyState, IconTile, Toast } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useMediaQuery } from "@/hooks";
import { getApiMessage } from "@/lib/apiError";
import { formatBDT } from "@/lib/format";
import { hasNoMeals, sortMembers } from "@/lib/summary";
import type {
  SummaryData,
  SummarySort,
  SummarySortKey,
} from "@/lib/types/summary.types";
import { SummaryCloseMonthConfirm } from "./dialogs";
import {
  FormulaExplainer,
  FundSummaryCard,
  SummaryHeader,
  SummaryKpiStrip,
} from "./layout";
import { SettlementCard } from "./settlement";
import { MemberStatementCards, MemberStatementTable } from "./table";

export interface SummaryViewProps {
  data: SummaryData;
  isPro: boolean;
  initialSort?: SummarySort;
  formulaOpen?: boolean;
  /** Replace the utility fund card with an inline error. */
  fundError?: boolean;
  onExportCsv: () => Promise<void>;
  onExportStatement: () => Promise<void>;
  /** Manager actions for a month with no row yet. */
  onCreateMonth?: () => Promise<void>;
  /** Manager actions on the selected month. */
  onCloseMonth?: () => Promise<void>;
  onReopenMonth?: () => Promise<void>;
}

const defaultSort: SummarySort = { key: "name", dir: "asc" };

export function SummaryView({
  data,
  isPro,
  initialSort,
  formulaOpen,
  fundError,
  onExportCsv,
  onExportStatement,
  onCreateMonth,
  onCloseMonth,
  onReopenMonth,
}: SummaryViewProps) {
  const { month, meal, viewer } = data;
  const desktop = useMediaQuery("(min-width: 768px)");
  const [sort, setSort] = useState<SummarySort>(initialSort ?? defaultSort);
  const [toast, setToast] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);
  const [statementExporting, setStatementExporting] = useState(false);
  const [openingMonth, setOpeningMonth] = useState(false);
  const [monthBusy, setMonthBusy] = useState(false);
  const [closeOpen, setCloseOpen] = useState(false);

  const rows = useMemo(
    () => (meal ? sortMembers(meal.members, sort) : []),
    [meal, sort],
  );

  const changeSort = (key: SummarySortKey) =>
    setSort((cur) =>
      cur.key === key
        ? { key, dir: cur.dir === "asc" ? "desc" : "asc" }
        : { key, dir: key === "name" ? "asc" : "desc" },
    );

  const run = async (
    action: () => Promise<void>,
    success: string,
    fallback: string,
  ): Promise<boolean> => {
    try {
      await action();
      setToast(success);
      return true;
    } catch (error) {
      setToast(getApiMessage(error, fallback));
      return false;
    }
  };

  const exportCsv = async () => {
    setExporting(true);
    try {
      await run(onExportCsv, "CSV downloaded", "Couldn't export the CSV.");
    } finally {
      setExporting(false);
    }
  };

  const exportStatement = async () => {
    setStatementExporting(true);
    try {
      await run(
        onExportStatement,
        "Statement downloaded",
        "Couldn't download the statement.",
      );
    } finally {
      setStatementExporting(false);
    }
  };

  const openMonth = async () => {
    if (!onCreateMonth) return;
    setOpeningMonth(true);
    try {
      await run(onCreateMonth, "Month opened", "Couldn't open the month.");
    } finally {
      setOpeningMonth(false);
    }
  };

  const reopenMonth = async () => {
    if (!onReopenMonth) return;
    setMonthBusy(true);
    try {
      await run(onReopenMonth, "Month reopened", "Couldn't reopen the month.");
    } finally {
      setMonthBusy(false);
    }
  };

  const confirmClose = async () => {
    if (!onCloseMonth) return;
    setMonthBusy(true);
    try {
      if (
        await run(onCloseMonth, "Month closed", "Couldn't close the month.")
      ) {
        setCloseOpen(false);
      }
    } finally {
      setMonthBusy(false);
    }
  };

  const copySettlement = async () => {
    const nameOf = (id: string) =>
      meal?.members.find((m) => m.id === id)?.name ?? "Former member";
    const text = data.transfers
      .map(
        (t) =>
          `${nameOf(t.fromId)} pays ${nameOf(t.toId)} ${formatBDT(t.amount)}`,
      )
      .join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setToast("Settlement copied");
    } catch {
      setToast("Couldn't copy the settlement. Try again.");
    }
  };

  if (!month || !meal) {
    return (
      <div className="flex flex-col gap-5 sm:gap-6">
        <SummaryHeader data={data} isPro={isPro} />
        <Card>
          <EmptyState
            size="lg"
            icon={
              <IconTile
                tone={viewer.isManager ? "marigold" : "neutral"}
                size="lg"
              >
                {viewer.isManager ? <CalendarPlus /> : <CalendarX />}
              </IconTile>
            }
            title={
              viewer.isManager
                ? "No active month"
                : "Waiting for the manager to open this month."
            }
            description={
              viewer.isManager
                ? "Open a month and the summary builds itself from meals and bazar."
                : `The summary appears here as soon as ${data.mess.managerFirstName} opens the month.`
            }
            actions={
              viewer.isManager &&
              onCreateMonth && (
                <Button
                  variant="accent"
                  disabled={openingMonth}
                  onClick={() => void openMonth()}
                >
                  <CalendarPlus />
                  {openingMonth ? "Opening…" : "Open this month"}
                </Button>
              )
            }
          />
        </Card>

        {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <SummaryHeader
        data={data}
        isPro={isPro}
        exporting={exporting}
        statementExporting={statementExporting}
        monthBusy={monthBusy}
        onExportCsv={() => void exportCsv()}
        onExportStatement={() => void exportStatement()}
        onToggleMonth={
          viewer.isManager
            ? month.status === "ACTIVE"
              ? () => setCloseOpen(true)
              : () => void reopenMonth()
            : undefined
        }
      />

      {data.isFinal && (
        <Banner
          tone="neutral"
          title={`${month.longLabel} is closed`}
          description="This is the final settlement. Numbers can no longer change."
        />
      )}
      {!data.isFinal && data.fund?.needsReplenishment && (
        <Banner
          tone="warning"
          title="Utility fund needs a top-up"
          description={`The fund balance is ${formatBDT(data.fund.balance)}. Meal balances below are not affected.`}
        />
      )}

      <SummaryKpiStrip data={data} />

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Meal statement</CardTitle>
        </CardHeader>
        {hasNoMeals(meal) ? (
          <EmptyState
            icon={
              <IconTile tone="neutral" size="lg">
                <ReceiptText />
              </IconTile>
            }
            title="No meals logged yet"
            description="The meal rate is ৳ 0.00 until meals and bazar are recorded."
          />
        ) : (
          <div className="border-t border-line">
            {desktop ? (
              <MemberStatementTable
                meal={meal}
                rows={rows}
                viewerId={viewer.memberId}
                sort={sort}
                onSort={changeSort}
              />
            ) : (
              <MemberStatementCards rows={rows} viewerId={viewer.memberId} />
            )}
          </div>
        )}
      </Card>

      <SettlementCard data={data} onCopy={() => void copySettlement()} />

      <FundSummaryCard data={data} error={fundError} />

      <FormulaExplainer meal={meal} defaultOpen={formulaOpen} />

      <SummaryCloseMonthConfirm
        open={closeOpen}
        monthLabel={month.longLabel}
        busy={monthBusy}
        onConfirm={() => void confirmClose()}
        onClose={() => setCloseOpen(false)}
      />

      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </div>
  );
}
