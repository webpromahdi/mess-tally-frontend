import {
  BarChart3,
  Receipt,
  ShoppingCart,
  Users,
  Utensils,
} from "lucide-react";
import type * as React from "react";

interface FeatureHighlight {
  icon: React.ElementType;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
}

const HIGHLIGHTS: FeatureHighlight[] = [
  {
    icon: Utensils,
    title: "Meal Tracking",
    description: "Easily track daily meals for everyone.",
    iconBg: "bg-purple-100 dark:bg-purple-950/60",
    iconColor: "text-[#3A0F34] dark:text-purple-300",
  },
  {
    icon: ShoppingCart,
    title: "Bazar Expenses",
    description: "Record shared bazar and household expenses.",
    iconBg: "bg-amber-100 dark:bg-amber-950/60",
    iconColor: "text-amber-700 dark:text-amber-300",
  },
  {
    icon: Users,
    title: "Member Balances",
    description: "See who owes what, clearly and fairly.",
    iconBg: "bg-rose-100 dark:bg-rose-950/60",
    iconColor: "text-rose-700 dark:text-rose-300",
  },
  {
    icon: Receipt,
    title: "Utility Bills & Fund",
    description: "Manage monthly utility bills and a shared fund.",
    iconBg: "bg-yellow-100 dark:bg-yellow-950/60",
    iconColor: "text-yellow-800 dark:text-yellow-300",
  },
  {
    icon: BarChart3,
    title: "Monthly Settlements",
    description: "Settle up at the end of each month.",
    iconBg: "bg-orange-100 dark:bg-orange-950/60",
    iconColor: "text-orange-700 dark:text-orange-300",
  },
];

export function LandingFeatureStrip() {
  return (
    <section
      id="core-features"
      aria-label="Core Feature Highlights"
      className="w-full max-w-full bg-white dark:bg-background py-10 sm:py-14 border-b border-black/[0.04] dark:border-white/[0.06]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 items-start">
          {HIGHLIGHTS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex flex-col items-center text-center p-3 rounded-2xl transition-all duration-200 hover:bg-black/[0.02] dark:hover:bg-white/[0.03]"
              >
                {/* Icon Container with restrained brand-harmonious background */}
                <div
                  className={`size-12 sm:size-13 rounded-2xl flex items-center justify-center ${item.iconBg} ${item.iconColor} mb-3.5 shadow-2xs`}
                >
                  <Icon className="size-5 sm:size-6" aria-hidden="true" />
                </div>

                {/* Feature Title */}
                <h3 className="text-sm sm:text-base font-bold text-foreground mb-1 tracking-tight">
                  {item.title}
                </h3>

                {/* Feature Description */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-snug max-w-[200px]">
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
