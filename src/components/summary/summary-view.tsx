"use client";

import { CalendarPlus, CalendarX, ReceiptText } from "lucide-react";
import { useMemo, useState } from "react";
import { Banner, EmptyState, IconTile, Toast } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useMediaQuery } from "@/hooks";
import { formatBDT } from "@/lib/format";
import { hasNoMeals, sortMembers } from "@/lib/summary";
import type {
  SummaryData,
  SummarySort,
  SummarySortKey,
} from "@/lib/types/summary.types";
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
  initialSort?: SummarySort;
  formulaOpen?: boolean;
  /** Replace the utility fund card with an inline error. */
  fundError?: boolean;
}

const defaultSort: SummarySort = { key: "name", dir: "asc" };

export function SummaryView({
  data,
  initialSort,
  formulaOpen,
  fundError,
}: SummaryViewProps) {
  const { month, meal, viewer } = data;
  const desktop = useMediaQuery("(min-width: 768px)");
  const [sort, setSort] = useState<SummarySort>(initialSort ?? defaultSort);
  const [toast, setToast] = useState<string | null>(null);

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

  if (!month || !meal) {
    return (
      <div className="flex flex-col gap-5 sm:gap-6">
        <SummaryHeader data={data} />
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
              viewer.isManager && (
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

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <SummaryHeader
        data={data}
        onExport={() => setToast("Export coming soon")}
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

      <SettlementCard
        data={data}
        onCopy={() => setToast("Settlement copied")}
      />

      <FundSummaryCard data={data} error={fundError} />

      <FormulaExplainer meal={meal} defaultOpen={formulaOpen} />

      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </div>
  );
}
