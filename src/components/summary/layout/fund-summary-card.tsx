import { ErrorState, Progress } from "@/components/shared";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, Eyebrow } from "@/components/ui/card";
import { formatBDT } from "@/lib/format";
import { fundRemainingPercent } from "@/lib/summary";
import type { SummaryData } from "@/lib/types/summary.types";
import { cn } from "@/lib/utils";

function Figure({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "error";
}) {
  return (
    <div className="min-w-0">
      <Eyebrow>{label}</Eyebrow>
      <p
        className={cn(
          "mt-1 truncate text-h3 tabular-nums",
          tone === "error" ? "text-error" : "text-ink",
        )}
      >
        {value}
      </p>
    </div>
  );
}

/** Separate from the meal statement: the utility fund (U1–U3) never changes the meal rate. */
export function FundSummaryCard({
  data,
  error,
}: {
  data: SummaryData;
  error?: boolean;
}) {
  const { fund, depositsByMember } = data;
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex-wrap gap-2">
        <div>
          <CardTitle>Utility Fund</CardTitle>
          <p className="mt-0.5 text-body-sm text-ink-muted">
            Not part of the meal rate.
          </p>
        </div>
        {fund?.needsReplenishment && (
          <Badge variant="status-rejected" size="sm">
            Needs top-up
          </Badge>
        )}
      </CardHeader>
      {error || !fund ? (
        <ErrorState
          title="Couldn't load the utility fund"
          description="Your meal statement above is fine. Check your connection and try again."
        />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 border-t border-line p-4 sm:grid-cols-4">
            <Figure
              label="Balance"
              value={formatBDT(fund.balance)}
              tone={fund.needsReplenishment ? "error" : undefined}
            />
            <Figure label="Deposited" value={formatBDT(fund.totalDeposits)} />
            <Figure label="Bills paid" value={formatBDT(fund.totalPaidBills)} />
            <div className="min-w-0">
              <Eyebrow>Remaining</Eyebrow>
              <p className="mt-1 text-h3 text-ink tabular-nums">
                {Math.round(fundRemainingPercent(fund))}%
              </p>
              <Progress
                value={fundRemainingPercent(fund)}
                label="Fund remaining"
                className="mt-2"
              />
            </div>
          </div>
          {depositsByMember.length > 0 && (
            <ul className="grid gap-px border-t border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {depositsByMember.map((d) => (
                <li
                  key={d.memberId}
                  className="flex min-h-14 items-center gap-3 bg-surface px-4 py-2.5"
                >
                  <Avatar name={d.name} size="sm" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-body-sm font-medium text-ink">
                      {d.name}
                    </span>
                    <span className="block text-body-sm text-ink-muted tabular-nums">
                      {formatBDT(d.amount)} deposited
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </Card>
  );
}
