"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";
import { EmptyState, ErrorState, IconTile } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useDashboardView } from "@/hooks";
import { useMonthStore } from "@/store";
import { DashboardView } from "./dashboard-view";
import { DashboardSkeleton } from "./layout";

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
        title="This month is archived"
        description="Past-month archives are part of MessTally PRO. The current month stays free, and upgrading unlocks every closed month and PDF statement."
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

export function DashboardPage() {
  const selectedMonth = useMonthStore((s) => s.selectedMonth);
  const view = useDashboardView(selectedMonth);

  if (view.isLoading) {
    return <DashboardSkeleton />;
  }

  if (view.isUpgradeRequired) {
    return <UpgradeState />;
  }

  if (view.isError || !view.data) {
    return (
      <Card className="p-4 sm:p-6">
        <ErrorState
          variant="page"
          title="Couldn't load the dashboard"
          description="We couldn't fetch this month's meals, bazar or utility fund. Check your connection and try again."
          onRetry={() => void view.refetch()}
        />
      </Card>
    );
  }

  return (
    <DashboardView
      data={view.data}
      errors={view.errors}
      settlement={view.settlement}
    />
  );
}
