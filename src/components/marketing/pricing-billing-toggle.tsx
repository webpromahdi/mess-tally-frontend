"use client";

import { cn } from "@/lib/utils";

export type BillingCycle = "MONTHLY" | "HALF_YEARLY" | "YEARLY";

interface PricingBillingToggleProps {
  billingCycle: BillingCycle;
  onChange: (cycle: BillingCycle) => void;
  className?: string;
}

export function PricingBillingToggle({
  billingCycle,
  onChange,
  className,
}: PricingBillingToggleProps) {
  const options: {
    key: BillingCycle;
    label: string;
    badge?: string;
    subtext?: string;
  }[] = [
    {
      key: "MONTHLY",
      label: "Monthly",
      subtext: "Standard",
    },
    {
      key: "HALF_YEARLY",
      label: "6 Months",
      badge: "Save 17%",
    },
    {
      key: "YEARLY",
      label: "1 Year",
      badge: "2 Mo Free",
    },
  ];

  return (
    <div
      className={cn(
        "grid grid-cols-3 w-full max-w-sm sm:max-w-md items-center gap-1 sm:gap-2 rounded-2xl border border-border/80 bg-muted/40 p-1.5 shadow-2xs backdrop-blur-xs",
        className,
      )}
      role="tablist"
      aria-label="Billing frequency selection"
    >
      {options.map((option) => {
        const isSelected = billingCycle === option.key;
        return (
          <button
            key={option.key}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onChange(option.key)}
            className={cn(
              "relative flex flex-col items-center justify-center min-h-[48px] rounded-xl px-2 py-1.5 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring select-none text-center",
              isSelected
                ? "bg-primary text-primary-foreground shadow-sm dark:bg-card dark:text-foreground dark:border dark:border-border"
                : "text-muted-foreground hover:text-foreground hover:bg-background/60",
            )}
          >
            {/* Primary Frequency Label */}
            <span className="text-xs sm:text-sm font-bold tracking-tight leading-tight">
              {option.label}
            </span>

            {/* Structured Badge or Subtitle (stacked to guarantee zero horizontal collision) */}
            {option.badge ? (
              <span
                className={cn(
                  "mt-1 inline-flex items-center rounded-full px-1.5 sm:px-2 py-0.5 text-[10px] font-semibold leading-none transition-colors",
                  isSelected
                    ? "bg-brand-accent text-brand-accent-foreground font-bold shadow-2xs"
                    : "bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-medium",
                )}
              >
                {option.badge}
              </span>
            ) : (
              <span
                className={cn(
                  "mt-1 text-[10px] font-medium leading-none transition-colors",
                  isSelected
                    ? "text-primary-foreground/85 dark:text-foreground/85"
                    : "text-muted-foreground",
                )}
              >
                {option.subtext}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
