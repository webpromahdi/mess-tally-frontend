import { Skeleton } from "@/components/ui/skeleton";

const NAV_KEYS = ["n1", "n2", "n3", "n4", "n5", "n6"];

/** App-shell placeholder shown while the workspace identity loads. */
export function ShellSkeleton() {
  return (
    <output
      className="block min-h-dvh bg-canvas"
      aria-busy="true"
      aria-label="Loading workspace"
    >
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col gap-6 bg-aubergine-800 p-4 lg:flex">
        <Skeleton className="h-10 w-36 bg-white/10" />
        <Skeleton className="h-12 w-full bg-white/10" />
        <div className="flex flex-col gap-2">
          {NAV_KEYS.map((key) => (
            <Skeleton key={key} className="h-10 w-full bg-white/10" />
          ))}
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-canvas/85 px-4 backdrop-blur-md sm:px-6 lg:px-8">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="ml-auto h-10 w-28" />
        </header>
        <main className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8 lg:pt-8">
          <Skeleton className="h-8 w-56" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {["c1", "c2", "c3", "c4"].map((key) => (
              <Skeleton key={key} className="h-28 w-full" />
            ))}
          </div>
          <Skeleton className="mt-6 h-72 w-full" />
        </main>
      </div>
    </output>
  );
}
