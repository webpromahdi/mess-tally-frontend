"use client";

import { ArrowRight, Check, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { BillingCycle } from "./pricing-billing-toggle";

interface PricingCardsProps {
  billingCycle: BillingCycle;
}

export function PricingCards({ billingCycle }: PricingCardsProps) {
  // Pro price calculation based on billingCycle from backend API.md § 18
  const proPricingDetails = {
    MONTHLY: {
      price: "৳ 100",
      period: "/ month",
      billingNote: "Billed monthly for the entire mess",
      savings: null,
    },
    HALF_YEARLY: {
      price: "৳ 500",
      period: "/ 6 months",
      billingNote: "৳ 83 / month · Billed ৳ 500 every 6 months",
      savings: "Save ৳ 100 compared to monthly",
    },
    YEARLY: {
      price: "৳ 1,000",
      period: "/ year",
      billingNote: "৳ 83 / month · Billed ৳ 1,000 annually",
      savings: "2 Months Free (Save ৳ 200)",
    },
  }[billingCycle];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-6 sm:pt-10">
      {/* =========================================================================
          TIER 1: STARTER (FREE)
          Clean, accessible card for small bachelor flats up to 5 members
         ========================================================================= */}
      <div
        id="pricing-card-starter"
        className="flex flex-col justify-between rounded-3xl border border-border/80 bg-white dark:bg-card p-6 sm:p-8 shadow-xs hover:shadow-md transition-all duration-200"
      >
        <div>
          {/* Header pill & title */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <span className="inline-flex items-center rounded-full bg-accent/70 px-3 py-1 text-xs font-semibold text-foreground shrink-0">
              Starter Plan
            </span>
            <span className="text-xs text-muted-foreground font-medium shrink-0">
              Free forever
            </span>
          </div>

          <h3 className="text-2xl font-bold text-foreground">Free</h3>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed min-h-[40px]">
            Essential meal tallying and expense math for small bachelor flats
            and roommates.
          </p>

          {/* Price display */}
          <div className="mt-6 flex items-baseline gap-1">
            <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              ৳ 0
            </span>
            <span className="text-sm text-muted-foreground font-medium">
              / forever
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground font-medium">
            Up to 5 active members · No card required
          </p>

          {/* Action Button */}
          <div className="mt-6">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full min-h-[48px] text-base font-semibold border-border hover:bg-accent hover:text-accent-foreground"
            >
              <Link href="/register">Get Started Free</Link>
            </Button>
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-border/70" />

          {/* Feature list */}
          <p className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">
            Everything included:
          </p>
          <ul className="space-y-3 text-xs sm:text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <div className="size-5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="size-3.5" aria-hidden="true" />
              </div>
              <span className="leading-tight">
                Up to{" "}
                <strong className="text-foreground">5 active members</strong>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="size-5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="size-3.5" aria-hidden="true" />
              </div>
              <span className="leading-tight">
                Daily meal matrix &amp; automated meal rate math
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="size-5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="size-3.5" aria-hidden="true" />
              </div>
              <span className="leading-tight">
                Bazar &amp; grocery expense tracking
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="size-5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="size-3.5" aria-hidden="true" />
              </div>
              <span className="leading-tight">
                Separate utility bills &amp; deposit fund
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="size-5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="size-3.5" aria-hidden="true" />
              </div>
              <span className="leading-tight">
                Active month ledger &amp; who-pays-whom settlement
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="size-5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="size-3.5" aria-hidden="true" />
              </div>
              <span className="leading-tight">
                Join code invitation &amp; manager delegation
              </span>
            </li>
          </ul>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground/80">
          Perfect to get started today
        </p>
      </div>

      {/* =========================================================================
          TIER 2: MESS PRO (FEATURED & MOST POPULAR)
          Deep Aubergine background with Marigold CTA matching Reference Image 1 & Design.md
         ========================================================================= */}
      <div
        id="pricing-card-pro"
        className="relative flex flex-col justify-between rounded-3xl bg-[#3A0F34] text-white p-6 sm:p-8 shadow-xl ring-2 ring-brand-accent lg:-translate-y-2 lg:shadow-2xl overflow-hidden [contain:paint]"
      >
        {/* Subtle decorative glowing mesh */}
        <div
          className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 size-48 rounded-full bg-brand-accent/15 blur-2xl pointer-events-none"
          aria-hidden="true"
        />

        <div>
          {/* Top badge row */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-accent px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-accent-foreground shadow-xs shrink-0">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Most Popular
            </span>
            <span className="text-xs text-brand-accent font-semibold shrink-0">
              Flat-rate for whole mess
            </span>
          </div>

          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            Mess PRO
            <Zap className="size-5 text-brand-accent fill-brand-accent" />
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-silver-300 leading-relaxed min-h-[40px]">
            Unlimited members, receipt scans, member self-service, and past
            month archives for a seamless bachelor life.
          </p>

          {/* Dynamic Price display */}
          <div className="mt-6 flex items-baseline gap-1.5">
            <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              {proPricingDetails.price}
            </span>
            <span className="text-sm text-silver-300 font-medium">
              {proPricingDetails.period}
            </span>
          </div>
          <p className="mt-1 text-xs text-silver-300 font-medium">
            {proPricingDetails.billingNote}
          </p>
          {proPricingDetails.savings && (
            <p className="mt-1 text-xs text-brand-accent font-bold">
              ✓ {proPricingDetails.savings}
            </p>
          )}

          {/* Primary Action Button */}
          <div className="mt-6 space-y-2">
            <Button
              asChild
              variant="brand-accent"
              size="lg"
              className="w-full min-h-[48px] text-base font-bold shadow-md hover:bg-marigold-600 transition-all flex items-center justify-center gap-2"
            >
              <Link href="/register">
                <span>Get Started with PRO</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <p className="text-center text-[11px] text-silver-400">
              Instant activation via <strong>bKash</strong> · Manager checkout
            </p>
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-[#501A4A]" />

          {/* Feature list */}
          <p className="text-xs font-bold uppercase tracking-wider text-brand-accent mb-4">
            Everything in Free, plus:
          </p>
          <ul className="space-y-3 text-xs sm:text-sm text-silver-200">
            <li className="flex items-start gap-3">
              <div className="size-5 rounded-full bg-brand-accent/25 text-brand-accent flex items-center justify-center shrink-0 mt-0.5">
                <Check className="size-3.5 stroke-[2.5]" aria-hidden="true" />
              </div>
              <span className="leading-tight">
                <strong className="text-white">Unlimited active members</strong>{" "}
                (no 5-member limit)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="size-5 rounded-full bg-brand-accent/25 text-brand-accent flex items-center justify-center shrink-0 mt-0.5">
                <Check className="size-3.5 stroke-[2.5]" aria-hidden="true" />
              </div>
              <span className="leading-tight">
                <strong className="text-white">
                  Self-service meal logging
                </strong>{" "}
                for every member from phone
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="size-5 rounded-full bg-brand-accent/25 text-brand-accent flex items-center justify-center shrink-0 mt-0.5">
                <Check className="size-3.5 stroke-[2.5]" aria-hidden="true" />
              </div>
              <span className="leading-tight">
                <strong className="text-white">
                  Bazar receipt image uploads
                </strong>{" "}
                &amp; visual audit trail
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="size-5 rounded-full bg-brand-accent/25 text-brand-accent flex items-center justify-center shrink-0 mt-0.5">
                <Check className="size-3.5 stroke-[2.5]" aria-hidden="true" />
              </div>
              <span className="leading-tight">
                <strong className="text-white">Past-month archives</strong>{" "}
                &amp; lifetime meal records
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="size-5 rounded-full bg-brand-accent/25 text-brand-accent flex items-center justify-center shrink-0 mt-0.5">
                <Check className="size-3.5 stroke-[2.5]" aria-hidden="true" />
              </div>
              <span className="leading-tight">
                <strong className="text-white">
                  Downloadable PDF statements
                </strong>{" "}
                &amp; WhatsApp share cards
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="size-5 rounded-full bg-brand-accent/25 text-brand-accent flex items-center justify-center shrink-0 mt-0.5">
                <Check className="size-3.5 stroke-[2.5]" aria-hidden="true" />
              </div>
              <span className="leading-tight">
                Priority direct support via WhatsApp &amp; email
              </span>
            </li>
          </ul>
        </div>

        <p className="mt-8 text-center text-xs text-silver-300">
          Only ৳ 83 / month on yearly plan
        </p>
      </div>

      {/* =========================================================================
          TIER 3: HOSTEL & HALL (CUSTOM)
          Inspired by Reference Image 2 for large hostel floors and university dorms
         ========================================================================= */}
      <div
        id="pricing-card-hostel"
        className="flex flex-col justify-between rounded-3xl border border-border/80 bg-white dark:bg-card p-6 sm:p-8 shadow-xs hover:shadow-md transition-all duration-200 md:col-span-2 xl:col-span-1"
      >
        <div>
          {/* Header pill & title */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <span className="inline-flex items-center rounded-full bg-accent/70 px-3 py-1 text-xs font-semibold text-foreground shrink-0">
              Hostel / Hall
            </span>
            <span className="text-xs text-muted-foreground font-medium shrink-0">
              30+ Flatmates
            </span>
          </div>

          <h3 className="text-2xl font-bold text-foreground">Custom</h3>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed min-h-[40px]">
            Tailored setup for large university halls, hostel floors, and
            corporate bachelor accommodations.
          </p>

          {/* Price display */}
          <div className="mt-6 flex items-baseline gap-1">
            <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              Let&apos;s Talk
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground font-medium">
            Custom volume discount · Dedicated onboarding
          </p>

          {/* Action Button */}
          <div className="mt-6">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full min-h-[48px] text-base font-semibold border-border hover:bg-accent hover:text-accent-foreground"
            >
              <Link href="/contact">Talk to Us</Link>
            </Button>
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-border/70" />

          {/* Feature list */}
          <p className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">
            Enterprise capabilities:
          </p>
          <ul className="space-y-3 text-xs sm:text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <div className="size-5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="size-3.5" aria-hidden="true" />
              </div>
              <span className="leading-tight">
                <strong className="text-foreground">
                  30 to 200+ flatmates
                </strong>{" "}
                per hall or hostel
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="size-5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="size-3.5" aria-hidden="true" />
              </div>
              <span className="leading-tight">
                Multi-manager &amp; floor supervisor delegations
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="size-5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="size-3.5" aria-hidden="true" />
              </div>
              <span className="leading-tight">
                Bulk CSV import for member lists &amp; room numbers
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="size-5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="size-3.5" aria-hidden="true" />
              </div>
              <span className="leading-tight">
                Custom utility split formulas by room or wing
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="size-5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="size-3.5" aria-hidden="true" />
              </div>
              <span className="leading-tight">
                Dedicated mess onboarding &amp; setup assistance
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="size-5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="size-3.5" aria-hidden="true" />
              </div>
              <span className="leading-tight">
                24/7 dedicated support &amp; custom invoice billing
              </span>
            </li>
          </ul>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground/80">
          Built for large institutional messes
        </p>
      </div>
    </div>
  );
}
