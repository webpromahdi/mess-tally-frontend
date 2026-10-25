import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardLayout, edgeToEdge } from "./dashboard-layout";

function StatSkeleton() {
  return (
    <Card className="flex flex-col gap-6 p-4 sm:p-5">
      <div className="flex items-start justify-between">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="size-8 rounded-lg" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-3 w-20" />
      </div>
    </Card>
  );
}

const SKELETON_ROW_KEYS = [
  "sk-r1",
  "sk-r2",
  "sk-r3",
  "sk-r4",
  "sk-r5",
  "sk-r6",
];
const SKELETON_DONUT_KEYS = ["sk-d1", "sk-d2", "sk-d3", "sk-d4"];

function ListRows({ count = 4 }: { count?: number }) {
  const keys = SKELETON_ROW_KEYS.slice(0, count);
  return (
    <div className="flex flex-col divide-y divide-line">
      {keys.map((k) => (
        <div key={k} className="flex items-center gap-3 px-4 py-3">
          <Skeleton className="size-8 rounded-full" />
          <div className="flex flex-1 flex-col gap-1.5">
            <Skeleton className="h-3.5 w-28" />
            <Skeleton className="h-2.5 w-16" />
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      ))}
    </div>
  );
}

function BlockSkeleton({
  chart,
  className,
}: {
  chart?: "bars" | "donut";
  className?: string;
}) {
  return (
    <Card className={className}>
      <div className="flex flex-col gap-2 p-4 sm:p-6 sm:pb-4">
        <Skeleton className="h-4.5 w-44" />
        <Skeleton className="h-3 w-64 max-w-full" />
      </div>
      <div className="px-4 pb-4 sm:px-6 sm:pb-6">
        {chart === "bars" && (
          <>
            <div className="flex h-chart flex-col justify-around gap-3 pl-16">
              <Skeleton className="h-8 w-4/5" />
              <Skeleton className="h-8 w-2/5" />
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-8 w-3/5" />
            </div>
            <div className="mt-5 -mx-4 border-y border-line sm:mx-0 sm:rounded-xl sm:border">
              <ListRows />
            </div>
          </>
        )}
        {chart === "donut" && (
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <Skeleton className="size-52 shrink-0 rounded-full sm:size-56" />
            <div className="flex w-full flex-1 flex-col gap-4">
              {SKELETON_DONUT_KEYS.map((k) => (
                <div key={k} className="flex flex-col gap-2">
                  <Skeleton className="h-3.5 w-full" />
                  <Skeleton className="h-1.5 w-3/4" />
                </div>
              ))}
            </div>
          </div>
        )}
        {!chart && (
          <div className="flex flex-col gap-4">
            <Skeleton className="h-7 w-36" />
            <Skeleton className="h-2 w-full rounded-full" />
            <div className="grid grid-cols-2 gap-3">
              <Skeleton className="h-14 rounded-xl" />
              <Skeleton className="h-14 rounded-xl" />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

/** Mirrors the real grid exactly so nothing jumps when data arrives (Design.md §10.14). */
export function DashboardSkeleton() {
  return (
    <section aria-label="Loading dashboard" aria-busy="true">
      <span className="sr-only">Loading dashboard…</span>
      <DashboardLayout
        header={
          <div className="flex flex-col gap-2">
            <Skeleton className="h-7 w-56" />
            <Skeleton className="h-4 w-72 max-w-full" />
          </div>
        }
        kpiLabel="Meal accounting"
        mealRate={<StatSkeleton />}
        balance={<StatSkeleton />}
        totalBazar={<StatSkeleton />}
        totalMeals={<StatSkeleton />}
        fund={<BlockSkeleton />}
        memberChart={<BlockSkeleton chart="bars" className={edgeToEdge} />}
        bazarChart={<BlockSkeleton chart="donut" className={edgeToEdge} />}
        summary={
          <Card className="flex items-center gap-4 p-4 sm:p-5">
            <Skeleton className="size-10 rounded-xl" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-48 max-w-full" />
            </div>
          </Card>
        }
        messInfo={<BlockSkeleton />}
      />
    </section>
  );
}
