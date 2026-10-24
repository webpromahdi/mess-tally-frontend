import {
  ArrowRight,
  BarChart3,
  Receipt,
  Shield,
  ShoppingCart,
  Users,
  Utensils,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Features — MessTally",
  description:
    "Everything you need for a well-managed mess. MessTally brings all the essential tools together so you can track meals, manage expenses, handle utility bills, and settle dues — all in one place.",
};

const featureList = [
  {
    title: "Daily Meal Tracking",
    description:
      "Easily record who ate which meals. Keep an accurate daily tally for every member.",
    icon: Utensils,
    iconBg:
      "bg-[#F7EBF5] dark:bg-aubergine-900/60 text-[#8C3A7E] dark:text-brand-accent",
  },
  {
    title: "Bazar & Grocery Expenses",
    description:
      "Log all grocery and kitchen expenses with details and dates. See how the meal rate is calculated.",
    icon: ShoppingCart,
    iconBg:
      "bg-[#FEF3CC] dark:bg-marigold-950/50 text-[#C48B00] dark:text-brand-accent",
  },
  {
    title: "Utility Fund Tracking",
    description:
      "Record utility bills and track member deposits. Utilities are managed separately from meal rate and meal balances.",
    icon: Receipt,
    iconBg:
      "bg-[#D1FAE5] dark:bg-emerald-950/50 text-[#065F46] dark:text-emerald-400",
  },
  {
    title: "Monthly Settlement",
    description:
      "Get each member's meal balance and a simple who-pays-whom list with minimum transactions.",
    icon: Users,
    iconBg:
      "bg-[#FCE7F3] dark:bg-pink-950/50 text-[#BE185D] dark:text-pink-400",
  },
  {
    title: "Clear Dashboard",
    description:
      "View key insights like total meals, bazar expenses, utility fund balance, and recent activity — all at a glance.",
    icon: BarChart3,
    iconBg:
      "bg-[#DBEAFE] dark:bg-blue-950/50 text-[#1D4ED8] dark:text-blue-400",
  },
  {
    title: "Role-based Access",
    description:
      "Managers can approve members, open/close months, and manage records, while members can view their own data.",
    icon: Shield,
    iconBg:
      "bg-[#F3E8FF] dark:bg-purple-950/50 text-[#7E22CE] dark:text-purple-300",
  },
];

export default function FeaturesPage() {
  return (
    <div className="w-full bg-white dark:bg-background">
      {/* =========================================================================
          SECTION 1: HERO & HEADING
          Centered headline, dual-tone typography, and concise subtitle
         ========================================================================= */}
      <section
        id="features-hero"
        aria-labelledby="features-hero-heading"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-8 text-center"
      >
        <h1
          id="features-hero-heading"
          className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-foreground leading-[1.12] text-balance"
        >
          Everything you need
          <br />
          for a <span className="text-brand-accent">well-managed mess.</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto text-balance">
          MessTally brings all the essential tools together so you can track
          meals, manage expenses, handle utility bills, and settle dues — all in
          one place.
        </p>
      </section>

      {/* =========================================================================
          SECTION 2: FEATURES GRID
          6 compact cards in 3 columns on desktop matching the reference image
         ========================================================================= */}
      <section
        id="features-grid"
        aria-label="Core MessTally Features"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureList.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-border/80 bg-white dark:bg-card p-6 sm:p-7 shadow-xs hover:shadow-sm transition-shadow flex flex-col justify-start"
              >
                {/* Circular Icon Container */}
                <div
                  className={`size-12 sm:size-13 rounded-full flex items-center justify-center shrink-0 mb-5 ${feature.iconBg}`}
                >
                  <Icon className="size-6" aria-hidden="true" />
                </div>

                {/* Title */}
                <h2 className="text-lg font-bold text-foreground mb-2">
                  {feature.title}
                </h2>

                {/* Description */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: CLOSING CTA (Features specific)
          Deep Aubergine container with subtle wave curves, headline, and action buttons
         ========================================================================= */}
      <section
        id="features-cta"
        aria-labelledby="features-cta-heading"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 mb-8"
      >
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#3A0F34] text-white px-6 py-12 sm:px-12 sm:py-16 text-center shadow-lg">
          {/* Subtle curved background overlay matching the reference */}
          <div
            className="pointer-events-none absolute inset-0 -z-0 overflow-hidden"
            aria-hidden="true"
          >
            <div className="absolute -left-20 -bottom-28 h-80 w-80 rounded-full bg-[#501A4A]/60 blur-xl" />
            <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full bg-[#501A4A]/60 blur-xl" />
            <div className="absolute right-10 bottom-0 h-64 w-96 rounded-full bg-linear-to-tl from-[#EAAA00]/10 to-transparent blur-2xl" />
          </div>

          <div className="relative z-10 space-y-3 max-w-2xl mx-auto">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white/80">
              READY TO GET STARTED?
            </p>

            <h2
              id="features-cta-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white text-balance"
            >
              Make your mess{" "}
              <span className="text-brand-accent">easier to manage.</span>
            </h2>

            <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto">
              Join MessTally today and experience a simpler, fairer way to
              handle shared living expenses.
            </p>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button
                asChild
                variant="brand-accent"
                size="lg"
                id="features-get-started-button"
                className="w-full sm:w-auto rounded-lg font-semibold px-6 py-2.5 text-sm sm:text-base shadow-xs hover:bg-marigold-600 transition-colors min-h-[44px]"
              >
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2"
                >
                  <span>Get Started</span>
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                id="features-view-pricing-button"
                className="w-full sm:w-auto rounded-lg font-medium px-6 py-2.5 text-sm sm:text-base border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white transition-colors min-h-[44px]"
              >
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
