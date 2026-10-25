"use client";

import { Calculator, ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { Card } from "@/components/ui/card";
import { formatBDT, formatMeals } from "@/lib/format";
import type { MealBlock, MonthInfo } from "@/lib/types/dashboard.types";
import { cn } from "@/lib/utils";

/**
 * Meal Rate hero with the inline expandable formula (Design.md §10.8).
 * F3: rate = Total Bazar ÷ Total Meals, and ৳ 0.00 when there are no meals yet.
 */
export function MealRateCard({
  meal,
  month,
  defaultOpen = false,
  className,
}: {
  meal: MealBlock;
  month: MonthInfo;
  defaultOpen?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const formulaId = `meal-rate-formula-${id}`;
  const noMeals = meal.totalMeals === 0;

  return (
    <Card
      className={cn(
        "relative overflow-hidden border-aubergine-900 bg-aubergine-800 text-white",
        className,
      )}
    >
      {/* Rising tally-bar motif from the logo, purely decorative */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-2 bottom-0 flex items-end gap-1.5 opacity-15"
      >
        <span className="h-8 w-3 rounded-t-md bg-marigold-400" />
        <span className="h-14 w-3 rounded-t-md bg-marigold-400" />
        <span className="h-20 w-3 rounded-t-md bg-marigold-400" />
        <span className="h-28 w-3 rounded-t-md bg-marigold-400" />
      </div>

      <div className="relative p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="text-label text-white/70">Meal Rate · {month.label}</p>
          <span
            aria-hidden
            className="inline-flex size-8 items-center justify-center rounded-lg bg-white/10 text-marigold-400 [&_svg]:size-4"
          >
            <Calculator />
          </span>
        </div>
        <p className="mt-3 flex flex-wrap items-baseline gap-x-2">
          <span className="text-amount-lg text-white tabular-nums sm:text-display">
            {formatBDT(meal.mealRate)}
          </span>
          <span className="text-body font-medium text-white/70">/ meal</span>
        </p>
        <p className="mt-1 text-body-sm text-white/70">
          {noMeals
            ? "No meals logged yet, so the rate is ৳ 0.00."
            : "What every meal costs this month."}
        </p>

        <button
          type="button"
          aria-expanded={open}
          aria-controls={formulaId}
          onClick={() => setOpen((o) => !o)}
          className={cn(
            "mt-4 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl bg-white/10 px-3.5 text-body-sm font-semibold text-white transition-colors hover:bg-white/15",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marigold-400",
          )}
        >
          {open ? "Hide calculation" : "How is this calculated?"}
          <ChevronDown
            className={cn(
              "size-4 transition-transform duration-200",
              open && "rotate-180",
            )}
          />
        </button>

        <div
          id={formulaId}
          className={cn("grid-rows-collapse", open && "grid-rows-expand")}
          inert={!open}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="mt-4 rounded-xl border border-white/10 bg-aubergine-950/40 p-3.5 sm:p-4">
              <p className="text-caption font-semibold tracking-widest text-marigold-400 uppercase">
                Formula · {month.longLabel}
              </p>
              <p className="mt-2 text-body font-semibold text-white">
                Meal Rate = Total Bazar ÷ Total Meals
              </p>
              <p className="mt-1 text-amount-sm text-white/85 tabular-nums">
                {formatBDT(meal.mealRate)} = {formatBDT(meal.totalBazar)} ÷{" "}
                {formatMeals(meal.totalMeals)} meals
              </p>
              <ul className="mt-3 flex flex-col gap-1.5 text-body-sm text-white/75">
                <li className="flex gap-2">
                  <span
                    aria-hidden
                    className="mt-2 size-1 shrink-0 rounded-full bg-marigold-400"
                  />
                  Counts confirmed mess bazar records and every meal, guest
                  meals included.
                </li>
                <li className="flex gap-2">
                  <span
                    aria-hidden
                    className="mt-2 size-1 shrink-0 rounded-full bg-marigold-400"
                  />
                  Excludes personal purchases and utility bills.
                </li>
                <li className="flex gap-2">
                  <span
                    aria-hidden
                    className="mt-2 size-1 shrink-0 rounded-full bg-marigold-400"
                  />
                  With 0 meals the rate is ৳ 0.00, never a division error.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
