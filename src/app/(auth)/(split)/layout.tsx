import { ShoppingCart, Users, Utensils } from "lucide-react";
import Image from "next/image";
import type * as React from "react";

/**
 * Split Layout for /login and /register:
 * - 50/50 responsive split on desktop (lg >= 1024px)
 * - Left column: Form card (centered, max-w-105) on soft ice-silver background
 * - Right column: Full-height edge-to-edge lifestyle image with dark plum gradient overlay,
 *   golden overline, two-tone headline, and 3 feature badges.
 * - Mobile/tablet (< 1024px): Right visual is hidden; clean single-column form with logo.
 */
export default function AuthSplitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-background flex flex-col lg:grid lg:grid-cols-2 relative overflow-x-hidden">
      {/* Primary Landmark: Form Column */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 w-full min-h-screen lg:min-h-0 bg-silver-200 dark:bg-background">
        <div className="w-full max-w-105 py-6 sm:py-8 my-auto">{children}</div>
      </main>

      {/* Complementary Landmark: Right-Side Lifestyle Image Column (Desktop Only >= 1024px) */}
      <aside
        className="hidden lg:relative lg:flex flex-col justify-end overflow-hidden h-full min-h-screen w-full bg-aubergine-950 border-l border-white/5 shadow-2xl"
        aria-label="Product Visual & Shared Living Benefits"
      >
        {/* Full-height edge-to-edge lifestyle image */}
        <div className="absolute inset-0 size-full overflow-hidden">
          <Image
            src="https://i.ibb.co.com/k2vGZkv1/Friends-Sharing-a-Cozy-Homemade-Meal-1.png"
            alt="Friends sharing a cozy homemade meal"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-center select-none pointer-events-none"
          />
          {/* Subtle translucent dark plum gradient overlay covering only the bottom text area */}
          <div
            className="absolute inset-0 bg-linear-to-t from-aubergine-950/95 from-0% via-aubergine-950/75 via-40% to-transparent to-70% pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {/* Content Section cleanly positioned over the gradient area without hiding the photo */}
        <div className="relative z-10 p-8 lg:p-10 xl:p-12 2xl:p-14 max-w-xl space-y-6 text-white pb-10 lg:pb-12">
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-[0.2em] text-marigold-500 uppercase">
              Made for shared living
            </p>
            <h2 className="text-3xl xl:text-4xl 2xl:text-[2.75rem] font-bold tracking-tight text-white leading-[1.15]">
              Less expense stress.
              <span className="block text-marigold-500">
                More peace of mind.
              </span>
            </h2>
            <p className="text-white/80 text-sm xl:text-base leading-relaxed text-balance pt-1">
              Track meals, manage shared expenses, and settle up with your
              flatmates, all in one place.
            </p>
          </div>

          {/* 3 Feature Badges in horizontal row with vertical divider lines */}
          <div className="pt-6 border-t border-white/15 flex items-center justify-between gap-2 sm:gap-4 xl:gap-6">
            {/* Item 1: Track Meals */}
            <div className="flex items-center gap-2.5 xl:gap-3 shrink-0">
              <div className="flex size-10 xl:size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white border border-white/15 backdrop-blur-md shadow-xs">
                <Utensils className="size-4 xl:size-5" aria-hidden="true" />
              </div>
              <div className="flex flex-col whitespace-nowrap">
                <span className="text-[11px] xl:text-xs text-white/70 font-normal leading-tight">
                  Track
                </span>
                <span className="text-xs xl:text-sm font-semibold text-white leading-tight">
                  Meals
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-white/15 shrink-0" aria-hidden="true" />

            {/* Item 2: Manage Bazar Expenses */}
            <div className="flex items-center gap-2.5 xl:gap-3 shrink-0">
              <div className="flex size-10 xl:size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white border border-white/15 backdrop-blur-md shadow-xs">
                <ShoppingCart className="size-4 xl:size-5" aria-hidden="true" />
              </div>
              <div className="flex flex-col whitespace-nowrap">
                <span className="text-[11px] xl:text-xs text-white/70 font-normal leading-tight">
                  Manage
                </span>
                <span className="text-xs xl:text-sm font-semibold text-white leading-tight">
                  Bazar Expenses
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-white/15 shrink-0" aria-hidden="true" />

            {/* Item 3: Settle Monthly Dues */}
            <div className="flex items-center gap-2.5 xl:gap-3 shrink-0">
              <div className="flex size-10 xl:size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white border border-white/15 backdrop-blur-md shadow-xs">
                <Users className="size-4 xl:size-5" aria-hidden="true" />
              </div>
              <div className="flex flex-col whitespace-nowrap">
                <span className="text-[11px] xl:text-xs text-white/70 font-normal leading-tight">
                  Settle
                </span>
                <span className="text-xs xl:text-sm font-semibold text-white leading-tight">
                  Monthly Dues
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
