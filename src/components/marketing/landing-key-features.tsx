import {
  ArrowRight,
  BarChart3,
  Receipt,
  ShoppingCart,
  Users,
  Utensils,
} from "lucide-react";
import type * as React from "react";

interface KeyFeature {
  icon: React.ElementType;
  title: string;
  description: string;
}

const KEY_FEATURES: KeyFeature[] = [
  {
    icon: Utensils,
    title: "Meal Tracking",
    description: "Record daily meals with accurate meal counts and meal rates.",
  },
  {
    icon: ShoppingCart,
    title: "Shared Bazar Expenses",
    description: "Track all shared bazar and household expenses with details.",
  },
  {
    icon: Receipt,
    title: "Utility Bills & Fund",
    description:
      "Add utility bills (electricity, gas, etc.) and manage a shared fund.",
  },
  {
    icon: Users,
    title: "Member Balances",
    description:
      "See real-time balances for each member with clear breakdowns.",
  },
  {
    icon: BarChart3,
    title: "Monthly Summaries",
    description: "View detailed monthly reports of meals and expenses.",
  },
  {
    icon: ArrowRight,
    title: "Easy Settlements",
    description:
      "Calculate and settle balances fairly at the end of the month.",
  },
];

export function LandingKeyFeatures() {
  return (
    <section
      id="features"
      aria-labelledby="key-features-heading"
      className="w-full max-w-full py-16 sm:py-20 lg:py-28 bg-[#FAF8FA] dark:bg-card/40 border-b border-black/[0.04] dark:border-white/[0.06]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Two-Column Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider bg-[#F3EBF5] text-[#3A0F34] dark:bg-purple-950/60 dark:text-purple-200 border border-[#E8D6EB] dark:border-purple-800/40 shadow-2xs">
              <span className="size-1.5 rounded-full bg-[#3A0F34] dark:bg-purple-300" />
              <span>Key Features</span>
            </div>
            <h2
              id="key-features-heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold tracking-tight text-foreground leading-tight"
            >
              Everything you need for a smoother mess life.
            </h2>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground max-w-xs md:text-right">
            A complete solution for shared meal and expense management.
          </p>
        </div>

        {/* 3x2 Grid of Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {KEY_FEATURES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative rounded-2xl border border-border/80 bg-white dark:bg-card p-6 sm:p-7 shadow-2xs hover:shadow-md hover:border-primary/20 dark:hover:border-brand-accent/20 transition-all duration-200"
              >
                {/* Amber/Marigold Icon Container */}
                <div className="size-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 flex items-center justify-center mb-5 shadow-2xs transition-transform group-hover:scale-105">
                  <Icon className="size-5 sm:size-6" aria-hidden="true" />
                </div>

                {/* Card Title */}
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 tracking-tight">
                  {item.title}
                </h3>

                {/* Card Description */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
