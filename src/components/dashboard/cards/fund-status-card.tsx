import {
  ArrowDownToLine,
  ArrowUpFromLine,
  TriangleAlert,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { fundTone, IconTile, Progress } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatBDT, formatPercent } from "@/lib/format";
import type { FundBlock } from "@/lib/types/dashboard.types";
import { cn } from "@/lib/utils";

function fundRemainingPercent(fund: FundBlock) {
  if (fund.totalDeposits <= 0) return 0;
  return Math.max(0, Math.min(100, (fund.balance / fund.totalDeposits) * 100));
}

/**
 * Utility Fund wallet (Design.md §10.8, PRD U1–U3).
 * Lives in its own labelled block so utility money never mixes with meal accounting.
 */
export function FundStatusCard({
  fund,
  canManage,
  className,
}: {
  fund: FundBlock;
  canManage?: boolean;
  className?: string;
}) {
  const percent = fundRemainingPercent(fund);
  const tone = fund.needsReplenishment ? "error" : fundTone(percent);
  return (
    <Card className={cn("flex flex-col overflow-hidden", className)}>
      <div className="flex items-center gap-3 border-b border-line bg-silver-100 px-4 py-3 sm:px-5">
        <IconTile tone="info" size="sm">
          <Zap />
        </IconTile>
        <div className="min-w-0">
          <p className="text-h4 text-ink">Utility Fund</p>
          <p className="truncate text-caption text-ink-subtle">
            Separate from meal accounting
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
        <div>
          <p className="text-label text-ink-muted">Fund balance</p>
          <p
            className={cn(
              "mt-1 text-amount-lg whitespace-nowrap tabular-nums",
              fund.balance <= 0 ? "text-money-negative" : "text-ink",
            )}
          >
            {formatBDT(fund.balance)}
          </p>
        </div>
        <div>
          <Progress
            value={percent}
            tone={tone}
            label="Utility fund remaining"
          />
          <p className="mt-1.5 text-caption text-ink-subtle tabular-nums">
            {fund.needsReplenishment
              ? "Nothing left to pay bills from"
              : `${formatPercent(percent)} of deposits left`}
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-3">
          <div className="min-w-0 rounded-xl bg-canvas p-3">
            <dt className="text-caption text-ink-subtle">Collected</dt>
            <dd className="mt-0.5 text-amount-sm font-semibold whitespace-nowrap text-ink tabular-nums">
              {formatBDT(fund.totalDeposits)}
            </dd>
          </div>
          <div className="min-w-0 rounded-xl bg-canvas p-3">
            <dt className="text-caption text-ink-subtle">Bills paid</dt>
            <dd className="mt-0.5 text-amount-sm font-semibold whitespace-nowrap text-ink tabular-nums">
              {formatBDT(fund.totalPaidBills)}
            </dd>
          </div>
        </dl>
        {fund.needsReplenishment && (
          <p className="flex items-start gap-2 rounded-xl bg-warning-surface p-3 text-body-sm text-warning">
            <TriangleAlert className="mt-0.5 size-4 shrink-0" />
            Fund is at {formatBDT(fund.balance)}. Collect a fresh deposit from
            active members.
          </p>
        )}
        {canManage && (
          <div className="mt-auto flex flex-wrap gap-2">
            <Button
              variant={fund.needsReplenishment ? "accent" : "primary"}
              size="sm"
              asChild
              className="flex-1"
            >
              <Link href="/dashboard/utilities">
                <ArrowDownToLine />
                Deposit
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild className="flex-1">
              <Link href="/dashboard/utilities">
                <ArrowUpFromLine />
                Bill Pay
              </Link>
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
