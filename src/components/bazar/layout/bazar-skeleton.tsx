import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const statSkeletons = ["stat-0", "stat-1", "stat-2", "stat-3"];
const rowSkeletons = ["row-0", "row-1", "row-2", "row-3", "row-4"];

/** Mirrors the header, summary strip and table. */
export function BazarSkeleton() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading bazar"
      className="flex flex-col gap-5 sm:gap-6"
    >
      <div className="flex items-end justify-between gap-3">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-56" />
        </div>
        <Skeleton className="h-11 w-36 rounded-xl" />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {statSkeletons.map((id) => (
          <Card key={id} className="p-4 gap-0">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="mt-3 h-8 w-24" />
            <Skeleton className="mt-2 h-3 w-28" />
          </Card>
        ))}
      </div>
      <Card className="overflow-hidden gap-0">
        <Skeleton className="h-14 rounded-none" />
        {rowSkeletons.map((id) => (
          <div
            key={id}
            className="flex items-center gap-3 border-t border-line px-4 py-3"
          >
            <Skeleton className="h-4 w-20" />
            <Skeleton className="size-6 rounded-full" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="ml-auto h-4 w-20" />
          </div>
        ))}
      </Card>
    </section>
  );
}
