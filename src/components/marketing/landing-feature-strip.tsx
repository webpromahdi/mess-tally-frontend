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
    iconBg: "bg-[#EFE8F6] dark:bg-purple-950/60",
    iconColor: "text-[#7A3382] dark:text-purple-300",
  },
  {
    icon: ShoppingCart,
    title: "Bazar Expenses",
    description: "Record shared bazar and household expenses.",
    iconBg: "bg-[#FEF6DC] dark:bg-amber-950/60",
    iconColor: "text-[#D48900] dark:text-amber-300",
  },
  {
    icon: Users,
    title: "Member Balances",
    description: "See who owes what, clearly and fairly.",
    iconBg: "bg-[#FCEAEF] dark:bg-rose-950/60",
    iconColor: "text-[#C93B6B] dark:text-rose-300",
  },
  {
    icon: Receipt,
    title: "Utility Bills & Fund",
    description: "Manage monthly utility bills and a shared fund.",
    iconBg: "bg-[#FEF9D9] dark:bg-yellow-950/60",
    iconColor: "text-[#B88700] dark:text-yellow-300",
  },
  {
    icon: BarChart3,
    title: "Monthly Settlements",
    description: "Settle up at the end of each month.",
    iconBg: "bg-[#FFEBDC] dark:bg-orange-950/60",
    iconColor: "text-[#D95F2B] dark:text-orange-300",
  },
];

export function LandingFeatureStrip() {
  return (
    <section
      id="core-features"
      aria-labelledby="core-features-heading"
      className="w-full max-w-full bg-[#F3EFF8] dark:bg-[#1A0B1A] py-14 sm:py-18 lg:py-22 border-b border-black/[0.04] dark:border-white/[0.06] transition-colors"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12 lg:mb-14">
          {/* Eyebrow Pill Badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 sm:px-4 py-1.5 bg-white/70 dark:bg-aubergine-900/50 border border-[#E4D9EB] dark:border-aubergine-800/60 shadow-2xs mb-3.5 sm:mb-4">
            <span
              className="size-2 rounded-full bg-[#EAAA00] shrink-0"
              aria-hidden="true"
            />
            <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-[#3A0F34] dark:text-[#EAAA00]">
              EVERYTHING YOU NEED
            </span>
          </div>

          {/* Section Main Heading */}
          <h2
            id="core-features-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#3A0F34] dark:text-foreground tracking-tight leading-[1.2]"
          >
            All-in-one for <span className="text-[#EAAA00]">shared living</span>
          </h2>

          {/* Section Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-[#554756] dark:text-neutral-300 max-w-2xl mx-auto mt-2.5 sm:mt-3 leading-relaxed">
            Keep meals, expenses, and monthly settlements organized without the
            confusion.
          </p>
        </div>

        {/* Five Equal White Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4.5 sm:gap-5 lg:gap-4 xl:gap-5">
          {HIGHLIGHTS.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === HIGHLIGHTS.length - 1;
            return (
              <div
                key={item.title}
                className={`bg-white dark:bg-card rounded-2xl sm:rounded-[22px] p-6 sm:p-7 lg:p-6 xl:p-7 flex flex-col items-center text-center justify-start h-full shadow-[0_4px_20px_rgba(58,15,52,0.03)] hover:shadow-[0_10px_32px_rgba(58,15,52,0.07)] border border-white/80 dark:border-white/5 transition-all duration-300 hover:-translate-y-1 ${
                  isLast
                    ? "sm:col-span-2 lg:col-span-1 sm:max-w-[calc(50%-0.625rem)] sm:mx-auto lg:max-w-none"
                    : ""
                }`}
              >
                {/* Pastel Icon Square */}
                <div
                  className={`size-14 sm:size-15 md:size-16 rounded-2xl flex items-center justify-center ${item.iconBg} ${item.iconColor} mb-4 sm:mb-4.5 shadow-2xs shrink-0`}
                >
                  <Icon
                    className="size-6 sm:size-6.5"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </div>

                {/* Feature Title */}
                <h3 className="text-base sm:text-[17px] font-bold text-[#1E1120] dark:text-foreground mb-1.5 tracking-tight">
                  {item.title}
                </h3>

                {/* Feature Description */}
                <p className="text-xs sm:text-[13.5px] text-[#6B7280] dark:text-neutral-400 leading-relaxed max-w-[210px]">
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
