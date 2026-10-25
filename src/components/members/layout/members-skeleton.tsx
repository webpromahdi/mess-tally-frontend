import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const requestSkeletons = ["req-0", "req-1"];
const rowSkeletons = ["row-0", "row-1", "row-2", "row-3", "row-4"];

export function MembersSkeleton() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading members"
      className="flex flex-col gap-5 sm:gap-6"
    >
      <div className="flex items-end justify-between gap-3">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-52" />
        </div>
        <Skeleton className="h-11 w-28 rounded-xl" />
      </div>
      <Card className="overflow-hidden">
        {requestSkeletons.map((id) => (
          <div key={id} className="flex items-center gap-3 px-4 py-4">
            <Skeleton className="size-10 rounded-full" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="ml-auto h-11 w-24 rounded-xl" />
          </div>
        ))}
      </Card>
      <Card className="overflow-hidden">
        <Skeleton className="h-14 rounded-none" />
        {rowSkeletons.map((id) => (
          <div
            key={id}
            className="flex items-center gap-3 border-t border-line px-4 py-3"
          >
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="ml-auto h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        ))}
      </Card>
    </section>
  );
}
