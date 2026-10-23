import {
  ArrowRight,
  Github,
  Lightbulb,
  Linkedin,
  Mail,
  MessageSquare,
  Twitter,
  Youtube,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/marketing";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact Us — MessTally",
  description:
    "We’re here to help. Have a question, suggestion, or feedback? Get in touch with the MessTally team.",
};

export default function ContactPage() {
  return (
    <div className="w-full bg-white dark:bg-background">
      {/* =========================================================================
          SECTION 1: HERO & HEADING
          Centered headline, dual-tone typography, and concise subtitle
         ========================================================================= */}
      <section
        id="contact-hero"
        aria-labelledby="contact-hero-heading"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-8 text-center"
      >
        <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary dark:text-brand-accent mb-3">
          CONTACT US
        </p>

        <h1
          id="contact-hero-heading"
          className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-foreground leading-[1.12] text-balance"
        >
          We’re here <span className="text-brand-accent">to help.</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto text-balance">
          Have a question, suggestion, or feedback? We’d love to hear from you.
          <br className="hidden sm:inline" /> Our team will get back to you as
          soon as possible.
        </p>
      </section>

      {/* =========================================================================
          SECTION 2: TWO-COLUMN INTERACTIVE CONTACT & SUPPORT PANELS
          Left: Send us a message (Form Card)
          Right: Other ways to reach us (Support Channels Card)
         ========================================================================= */}
      <section
        id="contact-content"
        aria-label="Contact and Support Information"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Card (spans 7 cols on desktop) */}
          <div className="lg:col-span-7 rounded-2xl border border-border/80 bg-white dark:bg-card p-6 sm:p-8 shadow-xs">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-foreground">
                Send us a message
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Fill out the form and we&apos;ll get back to you soon.
              </p>
            </div>

            <ContactForm />
          </div>

          {/* Right Column: Other Ways to Reach Us (spans 5 cols on desktop) */}
          <div className="lg:col-span-5 rounded-2xl border border-border/80 bg-white dark:bg-card p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-foreground">
                Other ways to reach us
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                You can also contact us through the following channels.
              </p>
            </div>

            {/* Channels List */}
            <div className="space-y-4 pt-2">
              {/* Channel 1: Email */}
              <div className="flex items-start gap-3.5">
                <div className="size-10 rounded-xl bg-[#FEE2E2] dark:bg-red-950/50 text-[#B91C1C] dark:text-red-400 flex items-center justify-center shrink-0">
                  <Mail className="size-5" aria-hidden="true" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Email
                  </h3>
                  <a
                    href="mailto:support@messtally.com"
                    className="text-sm font-semibold text-foreground hover:text-primary dark:hover:text-brand-accent transition-colors block"
                  >
                    support@messtally.com
                  </a>
                  <p className="text-xs text-muted-foreground">
                    We usually reply within 24 hours.
                  </p>
                </div>
              </div>

              {/* Channel 2: Help Center */}
              <div className="flex items-start gap-3.5">
                <div className="size-10 rounded-xl bg-[#FEF3CC] dark:bg-amber-950/50 text-[#C48B00] dark:text-amber-400 flex items-center justify-center shrink-0">
                  <MessageSquare className="size-5" aria-hidden="true" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Help Center
                  </h3>
                  <p className="text-sm font-semibold text-foreground">
                    Browse our help articles
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Find answers to common questions.
                  </p>
                </div>
              </div>

              {/* Channel 3: Product Feedback */}
              <div className="flex items-start gap-3.5">
                <div className="size-10 rounded-xl bg-[#FEF9C3] dark:bg-yellow-950/50 text-[#CA8A04] dark:text-yellow-400 flex items-center justify-center shrink-0">
                  <Lightbulb className="size-5" aria-hidden="true" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Product Feedback
                  </h3>
                  <p className="text-sm font-semibold text-foreground">
                    Have an idea? We&apos;d love to hear it.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Your feedback helps us improve.
                  </p>
                </div>
              </div>
            </div>

            {/* Follow Us Section */}
            <div className="pt-4 border-t border-border/70 space-y-2">
              <p className="text-xs font-semibold text-foreground">Follow us</p>
              <p className="text-xs text-muted-foreground">
                Stay updated with the latest news and updates.
              </p>

              <div className="flex items-center gap-2.5 pt-2">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="MessTally on GitHub"
                  className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
                >
                  <Github className="size-4" aria-hidden="true" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="MessTally on LinkedIn"
                  className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
                >
                  <Linkedin className="size-4" aria-hidden="true" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="MessTally on Twitter"
                  className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
                >
                  <Twitter className="size-4" aria-hidden="true" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="MessTally on YouTube"
                  className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
                >
                  <Youtube className="size-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: CLOSING CTA (Consistent with About & Features)
         ========================================================================= */}
      <section
        id="contact-cta"
        aria-labelledby="contact-cta-heading"
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
              JOIN OUR JOURNEY
            </p>

            <h2
              id="contact-cta-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white text-balance"
            >
              Be part of a{" "}
              <span className="text-brand-accent">simpler, fairer</span> shared
              living experience.
            </h2>

            <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto">
              Start using MessTally today and make your mess life easier.
            </p>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button
                asChild
                variant="brand-accent"
                size="lg"
                id="contact-get-started-button"
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
                id="contact-view-features-button"
                className="w-full sm:w-auto rounded-lg font-medium px-6 py-2.5 text-sm sm:text-base border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white transition-colors min-h-[44px]"
              >
                <Link href="/features">View Features</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
