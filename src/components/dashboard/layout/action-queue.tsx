import { Lock } from "lucide-react";
import Link from "next/link";
import { Banner } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { formatBDT } from "@/lib/format";
import type { DashboardData } from "@/lib/types/dashboard.types";

/** Role-dependent banners above the grid (plan §1). Returns nothing when the queue is empty. */
export function ActionQueue({ data }: { data: DashboardData }) {
  const { viewer, month, fund, pendingCount, mess } = data;
  const closed = month?.status === "CLOSED";
  const items = [];

  if (closed && month) {
    items.push(
      <Banner
        key="closed"
        tone="neutral"
        icon={<Lock />}
        title={`${month.longLabel} is closed`}
        description={
          month.closedOn
            ? `Closed on ${month.closedOn}. Figures are final and read-only.`
            : "Figures are final and read-only."
        }
        action={
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/summary">View settlement</Link>
          </Button>
        }
      />,
    );
  }

  if (viewer.isManager && !closed && pendingCount) {
    items.push(
      <Banner
        key="pending"
        tone="brand"
        title={`${pendingCount} join ${
          pendingCount === 1 ? "request" : "requests"
        } waiting`}
        description={`Approve flatmates so they can log meals in ${mess.name}.`}
        action={
          <Button size="sm" asChild>
            <Link href="/dashboard/members">Review requests</Link>
          </Button>
        }
      />,
    );
  }

  if (fund?.needsReplenishment && !closed) {
    items.push(
      <Banner
        key="fund"
        tone="warning"
        live="assertive"
        title="Utility fund needs a top-up"
        description={
          viewer.isManager
            ? `Balance is ${formatBDT(fund.balance)}. Bills paid have used up every deposit.`
            : `Balance is ${formatBDT(fund.balance)}. ${mess.managerFirstName} will ask for the next utility deposit.`
        }
        action={
          viewer.isManager ? (
            <Button variant="accent" size="sm" asChild>
              <Link href="/dashboard/utilities">Record deposit</Link>
            </Button>
          ) : undefined
        }
      />,
    );
  }

  if (!items.length) return null;
  return (
    <section aria-label="Needs attention" className="flex flex-col gap-3">
      {items}
    </section>
  );
}
