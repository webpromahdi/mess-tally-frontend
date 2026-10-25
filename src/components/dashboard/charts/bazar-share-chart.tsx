"use client";

import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useReducedMotion } from "@/hooks/useReducedMotion.hook";
import { formatBDT, formatPercent } from "@/lib/format";
import type { MemberRow } from "@/lib/types/dashboard.types";
import { chartColors } from "./chart-colors";

/** Bazar Paid by member (AC 6.1.2): donut + legend list that doubles as the text alternative. */
export function BazarShareChart({
  members,
  totalBazar,
  className,
}: {
  members: MemberRow[];
  totalBazar: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const rows = [...members]
    .sort((a, b) => b.bazarPaid - a.bazarPaid)
    .map((m, i) => ({
      ...m,
      color: chartColors.series[i % chartColors.series.length],
      share: totalBazar > 0 ? (m.bazarPaid / totalBazar) * 100 : 0,
    }));
  const top = rows[0];

  return (
    <Card className={className}>
      <CardHeader>
        <div className="min-w-0">
          <CardTitle>Bazar paid by member</CardTitle>
          <CardDescription>
            Who bought groceries for the mess this month.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8">
        <div aria-hidden className="relative size-52 shrink-0 sm:size-56">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={rows}
                  dataKey="bazarPaid"
                  nameKey="name"
                  innerRadius="68%"
                  outerRadius="100%"
                  paddingAngle={2}
                  cornerRadius={6}
                  stroke="none"
                  isAnimationActive={!reduced}
                >
                  {rows.map((r) => (
                    <Cell key={r.id} fill={r.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v) => formatBDT(Number(v))}
                  contentStyle={{
                    borderRadius: 12,
                    borderColor: chartColors.grid,
                    fontSize: 13,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="size-full animate-pulse rounded-full bg-gray-100" />
          )}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-caption text-ink-subtle">Total Bazar</span>
            <span className="text-amount whitespace-nowrap text-ink tabular-nums">
              {formatBDT(totalBazar)}
            </span>
          </div>
        </div>

        <div className="w-full min-w-0 flex-1">
          <p className="sr-only">
            {top
              ? `${top.name} paid the most, ${formatBDT(top.bazarPaid)} or ${formatPercent(top.share)} of ${formatBDT(totalBazar)}.`
              : ""}
          </p>
          <ul aria-label="Bazar paid by member" className="flex flex-col gap-3">
            {rows.map((r) => (
              <li key={r.id} className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2.5">
                  <span
                    aria-hidden
                    className="size-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: r.color }}
                  />
                  <span className="min-w-0 flex-1 truncate text-body font-medium text-ink">
                    {r.name}
                  </span>
                  <span className="text-body-sm whitespace-nowrap text-ink-subtle tabular-nums">
                    {formatPercent(r.share)}
                  </span>
                  <span className="w-24 text-right text-amount-sm font-semibold whitespace-nowrap text-ink tabular-nums">
                    {formatBDT(r.bazarPaid)}
                  </span>
                </div>
                <div
                  aria-hidden
                  className="ml-5 h-1.5 overflow-hidden rounded-full bg-gray-100"
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${r.share}%`, backgroundColor: r.color }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
