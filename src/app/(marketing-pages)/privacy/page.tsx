import { ArrowLeft, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Privacy Policy — MessTally",
  description:
    "Learn how MessTally collects, protects, and handles meal and expense data for bachelor flatmates.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "October 2026";

  return (
    <div className="w-full bg-white dark:bg-background py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Navigation Breadcrumb */}
        <div>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground gap-1.5 -ml-2 min-h-[44px] sm:min-h-[36px]"
          >
            <Link href="/">
              <ArrowLeft className="size-4" aria-hidden="true" />
              <span>Back to Home</span>
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="space-y-4 border-b border-border/70 pb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-accent/15 px-3 py-1 text-xs font-semibold text-aubergine-900 dark:text-brand-accent">
            <ShieldCheck className="size-3.5" aria-hidden="true" />
            <span>Privacy & Transparency</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Last updated: {lastUpdated} · Effective immediately for all
            MessTally users.
          </p>
        </div>

        {/* Content Body */}
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8 text-foreground/90 text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              1. Our Core Principle: Room-Level Privacy
            </h2>
            <p>
              MessTally is designed specifically for shared living in bachelor
              flats, hostels, and student dormitories. All meal counts, grocery
              purchases, and utility contributions are strictly visible only to
              authenticated members who share that specific mess group.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              2. Data We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Account Information:</strong> Name, email address, phone
                number (optional), and encrypted password credentials.
              </li>
              <li>
                <strong>Mess Activity Data:</strong> Daily meal tallies, grocery
                expenses, bill uploads, deposit records, and settlement
                summaries.
              </li>
              <li>
                <strong>Technical Information:</strong> IP address, browser
                type, device identifiers, and session timestamps used solely for
                security and debugging.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              3. How We Use Your Data
            </h2>
            <p>
              We do not sell, rent, or monetize your financial or grocery
              records to third-party advertising brokers. Your data is used
              exclusively to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Calculate accurate daily meal rates and transparent
                who-pays-whom settlements.
              </li>
              <li>
                Notify roommates of new grocery trips and monthly utility bill
                statements.
              </li>
              <li>
                Power TallyBot AI queries scoped strictly to your current
                month&apos;s records.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              4. Contact Our Data Protection Team
            </h2>
            <p>
              If you have any questions about this Privacy Policy or wish to
              request data deletion upon vacating your flat, reach out to us at{" "}
              <a
                href="mailto:privacy@messtally.com"
                className="font-medium text-primary dark:text-brand-accent underline hover:opacity-80"
              >
                privacy@messtally.com
              </a>{" "}
              or via our{" "}
              <Link
                href="/contact"
                className="font-medium text-primary dark:text-brand-accent underline hover:opacity-80"
              >
                Contact Page
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
