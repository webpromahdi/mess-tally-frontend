import type { Metadata } from "next";
import {
  PricingComparisonTable,
  PricingFaq,
  PricingSection,
} from "@/components/marketing";

export const metadata: Metadata = {
  title: "Pricing & Plans — MessTally",
  description:
    "Transparent and affordable plans for every bachelor flat in Bangladesh. Start free with up to 5 members or upgrade to PRO for ৳ 100/month with instant bKash checkout.",
};

export default function PricingPage() {
  return (
    <div className="w-full max-w-full overflow-x-hidden bg-white dark:bg-background pb-16">
      {/* =========================================================================
          SECTION 1: HERO & HEADING (Inspired by Reference Images 1 & 2)
          Centered display headline, dual-tone typography, and ambient glow
         ========================================================================= */}
      <section
        id="pricing-hero"
        aria-labelledby="pricing-hero-heading"
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-8 text-center overflow-hidden"
      >
        {/* Soft background ambient gradient (WOW Agency aesthetic) */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 sm:size-[32rem] rounded-full bg-brand-accent/10 dark:bg-brand-accent/5 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1
            id="pricing-hero-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15] text-balance max-w-4xl mx-auto px-2"
          >
            We&apos;ve got a plan
            <br />
            that&apos;s{" "}
            <span className="text-brand-accent inline-block">
              perfect for your mess.
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto text-balance">
            Select from simple, flat-rate plans designed for bachelor flatmates
            in Bangladesh. No hidden fees, no per-person surcharges.
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: BILLING FREQUENCY TOGGLE & 3 PRICING TIERS
          Free, Mess PRO (Featured dark card), and Hostel/Hall Custom
         ========================================================================= */}
      <section
        id="pricing-cards-section"
        aria-label="Pricing Plans"
        className="mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-8 overflow-hidden"
      >
        <PricingSection />
      </section>

      {/* =========================================================================
          SECTION 3: DETAILED FEATURE COMPARISON TABLE
          Complete breakdown across 5 categories wrapped in responsive container
         ========================================================================= */}
      <section
        id="pricing-comparison"
        aria-label="Feature Comparison Matrix"
        className="mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20 border-t border-border/60 overflow-hidden"
      >
        <PricingComparisonTable />
      </section>

      {/* =========================================================================
          SECTION 4: FREQUENTLY ASKED QUESTIONS (FAQ)
          High-utility answers covering bKash, member caps, and month closing
         ========================================================================= */}
      <section
        id="pricing-faq"
        aria-label="Frequently Asked Questions"
        className="mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-border/60 overflow-hidden"
      >
        <PricingFaq />
      </section>
    </div>
  );
}
