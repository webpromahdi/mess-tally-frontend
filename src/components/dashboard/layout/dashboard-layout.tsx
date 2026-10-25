import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * 12-column asymmetric grid (responsive.md §8) with mobile priority order:
 * banners → My Balance → Meal Rate → other KPIs → Fund → charts → summary → mess info.
 * Lower-grid items get explicit desktop placement, so DOM order can follow the mobile priority.
 * Charts go edge-to-edge below 640px via `edgeToEdge`.
 */
export const edgeToEdge =
  "-mx-4 rounded-none border-x-0 sm:mx-0 sm:rounded-2xl sm:border-x";

export function DashboardLayout({
  header,
  banners,
  kpiLabel,
  balance,
  mealRate,
  totalBazar,
  totalMeals,
  fund,
  memberChart,
  bazarChart,
  summary,
  messInfo,
}: {
  header: ReactNode;
  banners?: ReactNode;
  kpiLabel: string;
  balance: ReactNode;
  mealRate: ReactNode;
  totalBazar: ReactNode;
  totalMeals: ReactNode;
  fund: ReactNode;
  memberChart: ReactNode;
  bazarChart?: ReactNode;
  summary: ReactNode;
  messInfo: ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-5 sm:gap-6">
      {header}
      {banners}

      <section aria-labelledby="kpi-heading" className="min-w-0">
        <Eyebrow id="kpi-heading" className="mb-3">
          {kpiLabel}
        </Eyebrow>
        <div className="grid grid-cols-1 gap-3 xs:grid-cols-2 sm:gap-4 xl:grid-cols-4 2xl:grid-cols-5">
          <div className="order-2 col-span-full flex min-w-0 flex-col *:flex-1 sm:col-span-1 xl:order-1 2xl:col-span-2">
            {mealRate}
          </div>
          <div className="order-1 col-span-full flex min-w-0 flex-col *:flex-1 sm:col-span-1 xl:order-2">
            {balance}
          </div>
          <div className="order-3 flex min-w-0 flex-col *:flex-1">
            {totalBazar}
          </div>
          <div className="order-4 flex min-w-0 flex-col *:flex-1">
            {totalMeals}
          </div>
        </div>
      </section>

      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-12">
        <div className="flex min-w-0 flex-col *:flex-1 sm:col-span-2 lg:col-span-5 lg:col-start-8 lg:row-start-1 xl:col-span-4 xl:col-start-9">
          {fund}
        </div>
        <div
          className={cn(
            "flex min-w-0 flex-col *:flex-1 sm:col-span-2 lg:col-span-7 lg:col-start-1 lg:row-start-1 xl:col-span-8",
            bazarChart ? "lg:row-span-2" : "lg:row-span-3",
          )}
        >
          {memberChart}
        </div>
        {bazarChart && (
          <div className="flex min-w-0 flex-col *:flex-1 sm:col-span-2 lg:col-span-7 lg:col-start-1 lg:row-start-3 xl:col-span-8">
            {bazarChart}
          </div>
        )}
        <div className="min-w-0 lg:col-span-5 lg:col-start-8 lg:row-start-2 xl:col-span-4 xl:col-start-9">
          {summary}
        </div>
        <div className="flex min-w-0 flex-col *:flex-1 lg:col-span-5 lg:col-start-8 lg:row-start-3 xl:col-span-4 xl:col-start-9">
          {messInfo}
        </div>
      </div>
    </div>
  );
}
