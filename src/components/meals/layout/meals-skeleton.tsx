import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_STAT_KEYS = ["stat-1", "stat-2", "stat-3", "stat-4"];
const SKELETON_MEMBER_KEYS = ["row-1", "row-2", "row-3", "row-4"];

/** Mirrors the header, summary strip and matrix (Design.md §10.14). */
export function MealsSkeleton() {
  return (
    <section
      className="flex flex-col gap-5 sm:gap-6"
      aria-busy="true"
      aria-label="Loading meals"
    >
      <div className="flex items-end justify-between gap-3">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-44" />
          <Skeleton className="h-4 w-56" />
        </div>
        <Skeleton className="h-11 w-28 rounded-xl" />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {SKELETON_STAT_KEYS.map((key) => (
          <Card key={key} className="p-4">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="mt-3 h-8 w-20" />
            <Skeleton className="mt-2 h-3 w-28" />
          </Card>
        ))}
      </div>
      <Card className="overflow-hidden">
        <Skeleton className="h-14 rounded-none" />
        {SKELETON_MEMBER_KEYS.map((key) => (
          <div
            key={key}
            className="flex items-center gap-3 border-t border-line px-4 py-3"
          >
            <Skeleton className="size-7 rounded-full" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="ml-auto h-6 w-2/3 max-w-xl" />
          </div>
        ))}
        <Skeleton className="h-12 rounded-none" />
      </Card>
    </section>
  );
}
