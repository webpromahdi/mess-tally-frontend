"use client";

import { CheckCircle2, ShieldCheck, Smartphone, Users } from "lucide-react";
import * as React from "react";
import {
  type BillingCycle,
  PricingBillingToggle,
} from "./pricing-billing-toggle";
import { PricingCards } from "./pricing-cards";

export function PricingSection() {
  const [billingCycle, setBillingCycle] =
    React.useState<BillingCycle>("YEARLY");

  return (
    <div className="w-full">
      {/* Billing Switcher Toggle */}
      <div className="flex flex-col items-center justify-center gap-3">
        <PricingBillingToggle
          billingCycle={billingCycle}
          onChange={setBillingCycle}
        />
        <p className="text-xs text-muted-foreground font-medium">
          Choose monthly flexibility or save with annual billing.
        </p>
      </div>

      {/* 3 Pricing Cards */}
      <PricingCards billingCycle={billingCycle} />

      {/* Trust & Guarantee Strip */}
      <div className="mt-12 sm:mt-16 rounded-2xl border border-border/80 bg-accent/30 p-6 sm:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="size-10 rounded-xl bg-primary/10 dark:bg-brand-accent/15 text-primary dark:text-brand-accent flex items-center justify-center shrink-0">
              <Smartphone className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">
                bKash Integrated
              </p>
              <p className="text-xs text-muted-foreground">
                Instant automated manager checkout
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="size-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0">
              <Users className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">One Flat Fee</p>
              <p className="text-xs text-muted-foreground">
                All flatmates covered by one plan
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="size-10 rounded-xl bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 flex items-center justify-center shrink-0">
              <ShieldCheck className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">
                Safe &amp; Private
              </p>
              <p className="text-xs text-muted-foreground">
                Encrypted records &amp; no data selling
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="size-10 rounded-xl bg-brand-accent/20 text-brand-accent-foreground flex items-center justify-center shrink-0">
              <CheckCircle2
                className="size-5 text-brand-accent"
                aria-hidden="true"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">No Lock-In</p>
              <p className="text-xs text-muted-foreground">
                Upgrade, downgrade, or cancel anytime
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
