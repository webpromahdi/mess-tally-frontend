import { ArrowRight, ChartPie } from "lucide-react";
import Link from "next/link";
import { IconTile } from "@/components/shared";
import { cn } from "@/lib/utils";

/** Entry point to `/summary` (full per-member table and settlement). */
export function SummaryLinkCard({
  monthLabel,
  className,
}: {
  monthLabel: string;
  className?: string;
}) {
  return (
    <Link
      href="/dashboard/summary"
      className={cn(
        "group flex min-w-0 items-center gap-4 rounded-2xl border border-line bg-surface p-4 shadow-card transition-colors hover:border-aubergine-200 sm:p-5",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aubergine-500",
        className,
      )}
    >
      <IconTile tone="marigold">
        <ChartPie />
      </IconTile>
      <span className="min-w-0 flex-1">
        <span className="block text-h4 text-ink">View full summary</span>
        <span className="block text-body-sm text-ink-muted">
          Meal cost, balances and who pays whom for {monthLabel}
        </span>
      </span>
      <ArrowRight className="size-5 shrink-0 text-ink-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-aubergine-800" />
    </Link>
  );
}
