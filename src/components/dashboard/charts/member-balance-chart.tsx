"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { balanceRole, MoneyPill } from "@/components/shared";
import { Avatar } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useReducedMotion } from "@/hooks/useReducedMotion.hook";
import { formatBDT, formatMeals } from "@/lib/format";
import type { MemberRow } from "@/lib/types/dashboard.types";
import { cn } from "@/lib/utils";
import { chartColors } from "./chart-colors";

const compact = (v: number) => {
  const abs = Math.abs(v);
  const body =
    abs >= 1000
      ? `${(abs / 1000).toFixed(abs % 1000 === 0 ? 0 : 1)}k`
      : `${abs}`;
  return `${v < 0 ? "\u2212" : v > 0 ? "+" : ""}৳${body}`;
};

/** Diverging bars of F5 balances with a list fallback that carries the same data as text. */
export function MemberBalanceChart({
  members,
  viewerId,
  className,
}: {
  members: MemberRow[];
  viewerId: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const rows = [...members].sort((a, b) => b.balance - a.balance);
  const data = rows.map((m) => ({
    name: m.name.split(" ")[0],
    balance: Math.round(m.balance * 100) / 100,
  }));
  const receivers = rows.filter(
    (m) => balanceRole(m.balance).tone === "positive",
  ).length;
  const summary = `${receivers} of ${rows.length} members get money back. ${rows
    .map((m) => `${m.name} ${formatBDT(m.balance, { signed: true })}`)
    .join(", ")}.`;

  return (
    <Card className={className}>
      <CardHeader>
        <div className="min-w-0">
          <CardTitle>Member meal balances</CardTitle>
          <CardDescription>
            Bazar paid minus meal cost. Above zero gets money back.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-5 px-0 sm:px-6">
        <p className="sr-only">{summary}</p>
        <div aria-hidden className="h-chart min-w-0 pr-4 pl-1 sm:px-0">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 4, right: 12, bottom: 4, left: 0 }}
                barCategoryGap="28%"
              >
                <CartesianGrid horizontal={false} stroke={chartColors.grid} />
                <XAxis
                  type="number"
                  tickFormatter={compact}
                  tick={{ fill: chartColors.axis, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={64}
                  tick={{ fill: chartColors.axis, fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <ReferenceLine
                  x={0}
                  stroke={chartColors.axis}
                  strokeOpacity={0.4}
                />
                <Tooltip
                  cursor={{ fill: chartColors.grid, fillOpacity: 0.5 }}
                  formatter={(v) => [
                    formatBDT(Number(v), { signed: true }),
                    "Balance",
                  ]}
                  contentStyle={{
                    borderRadius: 12,
                    borderColor: chartColors.grid,
                    fontSize: 13,
                  }}
                />
                <Bar dataKey="balance" radius={6} isAnimationActive={!reduced}>
                  {data.map((d) => (
                    <Cell
                      key={d.name}
                      fill={
                        d.balance >= 0
                          ? chartColors.positive
                          : chartColors.negative
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="size-full animate-pulse rounded-xl bg-gray-100" />
          )}
        </div>

        <ul
          aria-label="Balances by member"
          className="divide-y divide-line border-y border-line sm:rounded-xl sm:border"
        >
          {rows.map((m) => {
            const role = balanceRole(m.balance);
            return (
              <li
                key={m.id}
                className={cn(
                  "flex items-center gap-3 px-4 py-3",
                  m.id === viewerId && "bg-aubergine-50",
                )}
              >
                <Avatar name={m.name} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-body font-semibold text-ink">
                    {m.name}
                    {m.id === viewerId && (
                      <span className="font-normal text-ink-subtle">
                        {" "}
                        (you)
                      </span>
                    )}
                  </p>
                  <p className="truncate text-caption text-ink-subtle tabular-nums">
                    {formatMeals(m.meals)} meals · {role.label}
                  </p>
                </div>
                <MoneyPill value={m.balance} />
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
