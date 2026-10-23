import { ArrowRight, Eye, Scale, Users } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Us — MessTally",
  description:
    "A simpler way to manage shared living. MessTally is a shared living meal and expense management platform built for flatmates who want less confusion and a fairer, more transparent way to manage daily meals and household expenses.",
};

export default function AboutUsPage() {
  return (
    <div className="w-full bg-white dark:bg-background">
      {/* =========================================================================
          SECTION 1: HERO
          Left: Eyebrow, bold headline, short description, and "Our Story ↓" CTA
          Right: Flatmates sharing a meal photo with rounded corners
         ========================================================================= */}
      <section
        id="about-hero"
        aria-labelledby="about-hero-heading"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary dark:text-brand-accent">
              ABOUT US
            </p>

            <h1
              id="about-hero-heading"
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-foreground leading-[1.12]"
            >
              A simpler way
              <br />
              to manage
              <br />
              <span className="text-brand-accent">shared living.</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
              MessTally is a shared living meal and expense management platform
              built for flatmates who want less confusion and a fairer, more
              transparent way to manage daily meals and household expenses.
            </p>

            <div className="pt-2">
              <Button
                asChild
                variant="brand-accent"
                size="lg"
                id="hero-our-story-button"
                className="rounded-lg font-semibold px-6 py-2.5 text-sm sm:text-base shadow-xs hover:bg-marigold-600 transition-colors min-h-[44px]"
              >
                <a
                  href="#our-story"
                  className="inline-flex items-center gap-1.5"
                >
                  <span>Our Story</span>
                  <span aria-hidden="true" className="text-base font-bold">
                    ↓
                  </span>
                </a>
              </Button>
            </div>
          </div>

          {/* Right Column: Hero Image */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-sm border border-border/40 bg-muted">
              <Image
                src="https://i.ibb.co.com/hxp9pzZJ/Flatmates-sharing-a-meal.png"
                alt="Flatmates happily sharing a meal and managing their household on a laptop"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center select-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: OUR STORY
          Left: Eyebrow, headline, and concise origin narrative (no em dash)
          Right: Paper chart to digital dashboard graphic
         ========================================================================= */}
      <section
        id="our-story"
        aria-labelledby="our-story-heading"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20 scroll-mt-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Column: Story Content */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary dark:text-brand-accent">
              OUR STORY
            </p>

            <h2
              id="our-story-heading"
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-foreground leading-[1.18]"
            >
              From paper charts
              <br />
              to <span className="text-brand-accent">a better solution.</span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
              <p>
                We lived in a bachelor flat and faced the same problems as many
                others, tracking meals, splitting bazar expenses, and settling
                dues at the end of the month. Spreadsheets and paper charts
                worked for a while, but they were often confusing,
                time-consuming, and prone to mistakes.
              </p>
              <p>
                So we built MessTally, a simple, transparent, and easy-to-use
                platform to make shared living easier for everyone.
              </p>
            </div>
          </div>

          {/* Right Column: Story Graphic */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-sm border border-border/40 bg-muted">
              <Image
                src="https://i.ibb.co.com/b5C2rfFD/Paper-meal-chart-to-digital-dashboard.png"
                alt="From manual paper meal chart to MessTally digital dashboard"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center select-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: WHAT WE BELIEVE
          Full-width soft tinted container
          Headline: Simple principles for a fairer mess.
          Three compact cards: Transparency, Fairness, and Shared Responsibility
         ========================================================================= */}
      <section
        id="what-we-believe"
        aria-labelledby="believe-heading"
        className="w-full bg-[#F4F6F8] dark:bg-card/40 py-14 sm:py-18 lg:py-20 border-y border-border/40"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-2 mb-8 sm:mb-10">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary dark:text-brand-accent">
              WHAT WE BELIEVE
            </p>
            <h2
              id="believe-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground"
            >
              <span className="text-primary dark:text-white">Simple</span>{" "}
              principles for a fairer{" "}
              <span className="text-primary dark:text-brand-accent">mess.</span>
            </h2>
          </div>

          {/* 3 Compact Belief Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {/* Card 1: Transparency */}
            <div className="rounded-2xl border border-border/70 bg-white dark:bg-card p-6 shadow-xs hover:shadow-sm transition-shadow flex items-center gap-4">
              <div className="size-12 sm:size-13 rounded-full bg-[#F7EBF5] dark:bg-aubergine-900/60 text-primary dark:text-brand-accent flex items-center justify-center shrink-0">
                <Eye
                  className="size-6 text-primary dark:text-brand-accent"
                  aria-hidden="true"
                />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-bold text-foreground text-base sm:text-lg">
                  Transparency
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Everyone can see the records, calculations, and balances
                  clearly.
                </p>
              </div>
            </div>

            {/* Card 2: Fairness */}
            <div className="rounded-2xl border border-border/70 bg-white dark:bg-card p-6 shadow-xs hover:shadow-sm transition-shadow flex items-center gap-4">
              <div className="size-12 sm:size-13 rounded-full bg-[#FEF3CC] dark:bg-marigold-950/50 text-[#A07200] dark:text-brand-accent flex items-center justify-center shrink-0">
                <Scale
                  className="size-6 text-[#A07200] dark:text-brand-accent"
                  aria-hidden="true"
                />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-bold text-foreground text-base sm:text-lg">
                  Fairness
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Costs are shared based on actual meals and equal utility
                  sharing.
                </p>
              </div>
            </div>

            {/* Card 3: Shared Responsibility */}
            <div className="rounded-2xl border border-border/70 bg-white dark:bg-card p-6 shadow-xs hover:shadow-sm transition-shadow flex items-center gap-4">
              <div className="size-12 sm:size-13 rounded-full bg-[#F3E8FF] dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 flex items-center justify-center shrink-0">
                <Users
                  className="size-6 text-purple-700 dark:text-purple-300"
                  aria-hidden="true"
                />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-bold text-foreground text-base sm:text-lg">
                  Shared Responsibility
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Managing a mess is easier when everyone contributes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: CLOSING CTA
          Deep Aubergine container with subtle wave curves, headline, and action buttons
         ========================================================================= */}
      <section
        id="about-cta"
        aria-labelledby="cta-heading"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
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
              id="cta-heading"
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
                id="cta-get-started-button"
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
                id="cta-view-features-button"
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
