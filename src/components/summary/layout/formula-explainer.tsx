"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { formatBDT } from "@/lib/format";
import type { MealBlock } from "@/lib/types/dashboard.types";
import { cn } from "@/lib/utils";

/** Collapsible "how are these numbers calculated" for F2–F5. */
export function FormulaExplainer({
  meal,
  defaultOpen,
}: {
  meal: MealBlock;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <Card className="overflow-hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="formula-body"
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-14 w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50"
      >
        <span className="text-h4 text-ink">How is this calculated?</span>
        <ChevronDown
          aria-hidden
          className={cn(
            "size-4 text-ink-muted transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      {open && (
        <div
          id="formula-body"
          className="flex flex-col gap-2 border-t border-line px-4 py-4 text-body-sm text-ink-muted"
        >
          <p>
            <strong className="text-ink">Meal rate</strong> = total bazar ÷
            total meals ={" "}
            <span className="tabular-nums">
              {formatBDT(meal.totalBazar)} ÷ {meal.totalMeals}
            </span>{" "}
            ={" "}
            <strong className="text-ink tabular-nums">
              {formatBDT(meal.mealRate)}
            </strong>
            . With no meals the rate is ৳ 0.
          </p>
          <p>
            <strong className="text-ink">Meal cost</strong> = member meals ×
            meal rate (guest meals count as meals).
          </p>
          <p>
            <strong className="text-ink">Balance</strong> = bazar paid − meal
            cost. Positive means you get money back (Receiver), negative means
            you owe (Giver).
          </p>
          <p>
            Utility bills and deposits are tracked separately in the Utility
            Fund.
          </p>
        </div>
      )}
    </Card>
  );
}
