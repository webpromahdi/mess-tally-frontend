import { ArrowLeft, FileText } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Terms of Service & Legal — MessTally",
  description:
    "Terms of service, member responsibilities, and legal agreements for MessTally shared living expense platform.",
};

export default function TermsOfServicePage() {
  const lastUpdated = "October 2026";

  return (
    <div className="w-full bg-white dark:bg-background pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20">
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
            <FileText className="size-3.5" aria-hidden="true" />
            <span>Legal & Agreements</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Terms of Service
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Last updated: {lastUpdated} · Please read these terms carefully
            before using MessTally.
          </p>
        </div>

        {/* Content Body */}
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8 text-foreground/90 text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using MessTally (&quot;the Platform&quot;),
              whether via mobile browser, web application, or associated
              services, you agree to be bound by these Terms of Service. If you
              disagree with any part of these terms, you may not access the
              Platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              2. Shared Ledger Responsibility
            </h2>
            <p>
              MessTally acts as an automated calculating and bookkeeping ledger.
              While our automated settlement formulas minimize disputes by
              providing mathematical transparency, MessTally is not a bank,
              escrow service, or debt collector. Physical or digital
              peer-to-peer transfers (e.g. bKash, Nagad, cash) remain the sole
              responsibility of the respective flatmates.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              3. Fair Use & Account Integrity
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                You agree to provide accurate and truthful grocery expense
                entries and meal tallies.
              </li>
              <li>
                You are responsible for safeguarding your login credentials and
                room invite codes.
              </li>
              <li>
                Mess managers and owners must ensure authorized flatmates are
                properly approved.
              </li>
            </ul>
          </section>

          <section id="legal" className="space-y-3 scroll-mt-24">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              4. Legal Disclaimers & Limitation of Liability
            </h2>
            <p>
              MessTally is provided on an &quot;AS IS&quot; and &quot;AS
              AVAILABLE&quot; basis. We strive for 99.9% uptime and zero
              arithmetic inaccuracies, but we are not liable for informal room
              disputes, misrecorded grocery receipts, or third-party network
              failures.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              5. Questions and Contact
            </h2>
            <p>
              For legal inquiries, dispute consultations, or terms
              clarifications, please email{" "}
              <a
                href="mailto:legal@messtally.com"
                className="font-medium text-primary dark:text-brand-accent underline hover:opacity-80"
              >
                legal@messtally.com
              </a>{" "}
              or contact us via our{" "}
              <Link
                href="/contact"
                className="font-medium text-primary dark:text-brand-accent underline hover:opacity-80"
              >
                Support Channel
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
