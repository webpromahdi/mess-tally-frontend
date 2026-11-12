"use client";

import { ReceiptText, Undo2, Wallet, WalletCards } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { StatCard } from "@/components/dashboard/cards";
import { chartColors } from "@/components/dashboard/charts/chart-colors";
import { EmptyState, ErrorState, Field } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAdminRevenue } from "@/hooks";
import { useReducedMotion } from "@/hooks/useReducedMotion.hook";
import { formatDate, monthLabel } from "@/lib/dates";
import { formatBDT } from "@/lib/format";
import { cn } from "@/lib/utils";
import {
  PageTitle,
  Pagination,
  SUBSCRIPTION_LABELS,
  tdClass,
  thClass,
} from "./admin-ui";

const compact = (v: number) =>
  v >= 1000 ? `${Math.round(v / 100) / 10}k` : String(v);

export function AdminRevenue() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [page, setPage] = useState(1);
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => setMounted(true), []);

  const invalidRange = Boolean(from && to && from > to);
  const revenue = useAdminRevenue({
    from: invalidRange ? undefined : from || undefined,
    to: invalidRange ? undefined : to || undefined,
    page,
  });
  const data = revenue.data?.data;

  return (
    <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <PageTitle
          title="Revenue"
          description="bKash subscription payments. Admin-granted PRO isn't revenue."
        />
        <div className="flex flex-wrap items-end gap-3">
          <Field
            label="From"
            error={invalidRange ? "Must be before “To”." : undefined}
          >
            <Input
              type="date"
              value={from}
              onChange={(e) => {
                setFrom(e.target.value);
                setPage(1);
              }}
            />
          </Field>
          <Field label="To">
            <Input
              type="date"
              value={to}
              onChange={(e) => {
                setTo(e.target.value);
                setPage(1);
              }}
            />
          </Field>
          {(from || to) && (
            <Button
              variant="ghost"
              onClick={() => {
                setFrom("");
                setTo("");
                setPage(1);
              }}
            >
              Last 12 months
            </Button>
          )}
        </div>
      </div>

      {revenue.isPending ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-hidden>
          {Array.from({ length: 4 }, (_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton
            <div key={i} className="h-32 animate-pulse rounded-xl bg-surface" />
          ))}
        </div>
      ) : !data ? (
        <Card>
          <ErrorState onRetry={() => void revenue.refetch()} />
        </Card>
      ) : (
        <div
          className={cn(
            "flex flex-col gap-4 sm:gap-5 lg:gap-6",
            revenue.isPlaceholderData && "opacity-60",
          )}
        >
          <section
            aria-label="Totals"
            className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6 xl:grid-cols-4"
          >
            <StatCard
              label="Net revenue"
              value={formatBDT(data.totals.net)}
              icon={<Wallet />}
              tone="marigold"
              hint="Gross minus refunds"
            />
            <StatCard
              label="Gross collected"
              value={formatBDT(data.totals.gross)}
              icon={<WalletCards />}
            />
            <StatCard
              label="Refunds"
              value={formatBDT(data.totals.refunds)}
              icon={<Undo2 />}
            />
            <StatCard
              label="Payments"
              value={String(data.totals.payments)}
              icon={<ReceiptText />}
              hint={`${formatDate(data.range.from)} – ${formatDate(data.range.to)}`}
            />
          </section>

          <div className="grid gap-4 sm:gap-5 lg:grid-cols-12 lg:gap-6">
            <Card className="lg:col-span-8">
              <CardHeader>
                <CardTitle>Net revenue by month</CardTitle>
                <CardDescription>By payment date, in BDT.</CardDescription>
              </CardHeader>
              <CardContent>
                <div aria-hidden className="h-chart min-w-0">
                  {mounted && (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={data.monthly}
                        margin={{ top: 4, right: 4, bottom: 4, left: 0 }}
                      >
                        <CartesianGrid
                          vertical={false}
                          stroke={chartColors.grid}
                        />
                        <XAxis
                          dataKey="month"
                          tickFormatter={(m: string) => monthLabel(m)}
                          tick={{ fill: chartColors.axis, fontSize: 11 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          width={44}
                          tickFormatter={compact}
                          tick={{ fill: chartColors.axis, fontSize: 11 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip
                          cursor={{ fill: chartColors.grid, fillOpacity: 0.5 }}
                          labelFormatter={(m) => monthLabel(String(m), true)}
                          formatter={(v) => [
                            formatBDT(Number(v)),
                            "Net revenue",
                          ]}
                          contentStyle={{
                            borderRadius: 12,
                            borderColor: chartColors.grid,
                            fontSize: 13,
                          }}
                        />
                        <Bar
                          dataKey="amount"
                          fill={chartColors.series[0]}
                          radius={[6, 6, 0, 0]}
                          isAnimationActive={!reduced}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
                <table className="sr-only">
                  <caption>Net revenue by month</caption>
                  <tbody>
                    {data.monthly.map((m) => (
                      <tr key={m.month}>
                        <th scope="row">{monthLabel(m.month, true)}</th>
                        <td>{formatBDT(m.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>By subscription type</CardTitle>
                <CardDescription>
                  Net revenue and number of payments.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {data.byType.length === 0 ? (
                  <p className="text-body-sm text-ink-muted">
                    No payments in this range.
                  </p>
                ) : (
                  <ul className="flex flex-col gap-3">
                    {data.byType.map((t) => {
                      const share =
                        data.totals.net > 0
                          ? (t.amount / data.totals.net) * 100
                          : 0;
                      return (
                        <li key={t.type}>
                          <div className="flex items-baseline justify-between gap-3 text-body-sm">
                            <span className="font-medium text-ink">
                              {SUBSCRIPTION_LABELS[t.type]}
                            </span>
                            <span className="font-semibold text-ink tabular-nums">
                              {formatBDT(t.amount)}
                            </span>
                          </div>
                          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-aubergine-800"
                              style={{ width: `${share}%` }}
                            />
                          </div>
                          <p className="mt-1 text-caption text-ink-muted">
                            {t.count} {t.count === 1 ? "payment" : "payments"} ·{" "}
                            {Math.round(share)}%
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="gap-0 overflow-hidden py-0">
            <div className="border-b border-line p-4">
              <h2 className="text-h4 text-ink">Payments</h2>
              <p className="text-body-sm text-ink-muted">Newest first.</p>
            </div>
            {data.payments.length === 0 ? (
              <EmptyState
                icon={<ReceiptText />}
                title="No payments in this range"
                description="Pick a wider date range."
              />
            ) : (
              <>
                <div className="w-full overflow-x-auto">
                  <table className="w-full min-w-200 border-separate border-spacing-0 text-body-sm">
                    <caption className="sr-only">Payments</caption>
                    <thead>
                      <tr>
                        <th scope="col" className={thClass}>
                          Paid
                        </th>
                        <th scope="col" className={thClass}>
                          Mess
                        </th>
                        <th scope="col" className={thClass}>
                          Paid by
                        </th>
                        <th scope="col" className={thClass}>
                          Type
                        </th>
                        <th scope="col" className={thClass}>
                          bKash Trx
                        </th>
                        <th scope="col" className={cn(thClass, "text-right")}>
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.payments.map((p) => (
                        <tr key={p.id} className="hover:bg-silver-100">
                          <td
                            className={cn(
                              tdClass,
                              "whitespace-nowrap text-ink",
                            )}
                          >
                            {formatDate(p.paidAt)}
                          </td>
                          <td className={cn(tdClass, "text-ink")}>
                            {p.mess.name}
                          </td>
                          <td className={tdClass}>
                            <p className="text-ink">{p.paidBy.name}</p>
                            <p className="text-caption text-ink-muted">
                              {p.paidBy.email}
                            </p>
                          </td>
                          <td className={tdClass}>
                            <span className="text-ink">
                              {SUBSCRIPTION_LABELS[p.type]}
                            </span>
                            {p.status === "REFUNDED" && (
                              <Badge
                                variant="status-rejected"
                                size="sm"
                                className="ml-2"
                              >
                                Refunded
                              </Badge>
                            )}
                          </td>
                          <td
                            className={cn(
                              tdClass,
                              "font-mono text-caption text-ink-muted",
                            )}
                          >
                            {p.bkashTrxId ?? "—"}
                          </td>
                          <td
                            className={cn(
                              tdClass,
                              "text-right font-medium whitespace-nowrap text-ink tabular-nums",
                            )}
                          >
                            {formatBDT(p.amount)}
                            {p.refundAmount ? (
                              <p className="text-caption text-error">
                                −{formatBDT(p.refundAmount)}
                              </p>
                            ) : null}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {revenue.data?.meta && (
                  <Pagination
                    meta={revenue.data.meta}
                    noun={["payment", "payments"]}
                    onPage={setPage}
                  />
                )}
              </>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
