"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { EmptyState, ErrorState, IconTile } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  useCloseMonth,
  useCreateMonth,
  useDownloadSummaryCsv,
  useDownloadSummaryStatement,
  useFundDeposits,
  useReopenMonth,
  useSummary,
  useWorkspace,
} from "@/hooks";
import { isUpgradeRequired } from "@/lib/apiError";
import { toSummaryData } from "@/lib/mappers/summary.mapper";
import { useMonthStore } from "@/store";
import { SummarySkeleton } from "./layout";
import { SummaryView } from "./summary-view";

function UpgradeState() {
  return (
    <Card className="p-4 sm:p-6">
      <EmptyState
        size="lg"
        icon={
          <IconTile tone="marigold" size="lg">
            <Sparkles />
          </IconTile>
        }
        title="This month's summary is archived"
        description="Past-month archives are part of MessTally PRO. The current month stays free, and upgrading unlocks closed-month statements, meals, bazar and utilities."
        actions={
          <Button variant="accent" asChild>
            <Link href="/dashboard/settings">
              <Sparkles />
              Upgrade to PRO
            </Link>
          </Button>
        }
      />
    </Card>
  );
}

export function SummaryPage() {
  const selectedMonth = useMonthStore((s) => s.selectedMonth);
  const workspace = useWorkspace(selectedMonth);
  const summaryQuery = useSummary(selectedMonth);
  const depositsQuery = useFundDeposits(selectedMonth);
  const createMonth = useCreateMonth();
  const closeMonth = useCloseMonth();
  const reopenMonth = useReopenMonth();
  const downloadCsv = useDownloadSummaryCsv();
  const downloadStatement = useDownloadSummaryStatement();

  const data = useMemo(() => {
    if (
      !workspace.viewer ||
      !workspace.mess ||
      !workspace.dashboard ||
      !summaryQuery.data?.data
    ) {
      return null;
    }
    return toSummaryData({
      viewer: workspace.viewer,
      mess: workspace.mess,
      dashboard: workspace.dashboard,
      summary: summaryQuery.data.data,
      deposits: depositsQuery.data?.data ?? null,
      months: workspace.months,
    });
  }, [
    workspace.viewer,
    workspace.mess,
    workspace.dashboard,
    workspace.months,
    summaryQuery.data,
    depositsQuery.data,
  ]);

  const refetch = () =>
    Promise.all([
      workspace.refetch(),
      summaryQuery.refetch(),
      depositsQuery.refetch(),
    ]);

  const handleExportCsv = async () => {
    await downloadCsv.mutateAsync({ month: selectedMonth });
  };

  const handleExportStatement = async () => {
    await downloadStatement.mutateAsync({ month: selectedMonth });
  };

  const handleCreateMonth = async () => {
    const name = summaryQuery.data?.data.month.name;
    if (!name) throw new Error("Couldn't work out which month to open.");
    await createMonth.mutateAsync({ month: name });
  };

  const handleCloseMonth = async () => {
    const id = summaryQuery.data?.data.month.id;
    if (!id) throw new Error("Open the month before closing it.");
    await closeMonth.mutateAsync(id);
  };

  const handleReopenMonth = async () => {
    const id = summaryQuery.data?.data.month.id;
    if (!id) throw new Error("This month has no row to reopen.");
    await reopenMonth.mutateAsync(id);
  };

  if (
    isUpgradeRequired(summaryQuery.error) ||
    isUpgradeRequired(depositsQuery.error) ||
    isUpgradeRequired(workspace.queries.dashboard.error)
  ) {
    return <UpgradeState />;
  }

  if (workspace.isLoading || summaryQuery.isPending) {
    return <SummarySkeleton />;
  }

  if (!data) {
    return (
      <Card>
        <ErrorState
          title="Couldn't load the monthly summary"
          description="Check your connection and try again."
          onRetry={() => void refetch()}
        />
      </Card>
    );
  }

  const manager = data.viewer.isManager;

  return (
    <SummaryView
      data={data}
      isPro={workspace.subscription?.isPro ?? false}
      onExportCsv={handleExportCsv}
      onExportStatement={handleExportStatement}
      onCreateMonth={manager ? handleCreateMonth : undefined}
      onCloseMonth={manager ? handleCloseMonth : undefined}
      onReopenMonth={manager ? handleReopenMonth : undefined}
    />
  );
}
