import {
  ArrowRight,
  BarChart3,
  ClipboardList,
  Home,
  PieChart,
  Receipt,
  ShoppingCart,
  Users,
  Utensils,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type * as React from "react";

import { LandingFaq } from "@/components/marketing";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "MessTally — Shared Meals, Clear Records, Together",
  description:
    "Manage your mess life together. Track meals, share bazar expenses, manage utility bills and settle balances fairly for bachelor flatmates in Bangladesh.",
  openGraph: {
    title: "MessTally — Shared Meals, Clear Records, Together",
    description:
      "Automate daily meal tracking, bazar accounts, and monthly settlements for flatmates.",
    url: "/",
    siteName: "MessTally",
    locale: "en_BD",
    type: "website",
  },
};

/* =========================================================================
   SECTION 1: HERO
   ========================================================================= */
function LandingHero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative w-full max-w-full overflow-hidden [contain:paint] bg-white dark:bg-background pt-8 sm:pt-12 md:pt-16 pb-14 sm:pb-20 lg:pb-24 border-b border-black/[0.04] dark:border-white/[0.05]"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
          {/* Left Column: Value Proposition, Headline, Actions & Trust Proof */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7 text-left">
            {/* Eyebrow Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs sm:text-xs font-bold tracking-wider uppercase bg-[#F3EBF5] text-[#3A0F34] dark:bg-purple-950/60 dark:text-purple-200 border border-[#E8D6EB] dark:border-purple-800/40 shadow-2xs">
              <span className="size-1.5 rounded-full bg-[#3A0F34] dark:bg-purple-300" />
              <span>Shared Meals. Clear Records. Together.</span>
            </div>

            {/* Main Headline */}
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-[54px] xl:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12]"
            >
              Manage your mess life{" "}
              <span className="text-[#3A0F34] dark:text-[#EAAA00]">
                together.
              </span>
            </h1>

            {/* Concise Product Description */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
              Track meals, share expenses, manage utility bills and settle
              balances — all in one place. Built for students and young
              professionals living together in Bangladesh.
            </p>

            {/* CTA Button Group */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <Button
                asChild
                size="lg"
                className="rounded-full px-6 sm:px-7 py-3 sm:py-3.5 h-auto text-sm sm:text-base font-semibold bg-[#3A0F34] hover:bg-[#2D0B29] text-white dark:bg-[#EAAA00] dark:text-[#3A0F34] dark:hover:bg-[#d89c00] shadow-md hover:shadow-lg transition-all group"
              >
                <Link href="/register" id="hero-cta-get-started">
                  <span>Get Started</span>
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-6 sm:px-7 py-3 sm:py-3.5 h-auto text-sm sm:text-base font-semibold bg-white dark:bg-card hover:bg-neutral-50 dark:hover:bg-neutral-800 text-foreground border-border/80 shadow-2xs transition-all"
              >
                <Link href="/features" id="hero-cta-learn-more">
                  Learn More
                </Link>
              </Button>
            </div>

            {/* Real Social Trust & Audience Indicator */}
            <div className="flex items-center gap-3 pt-2">
              <div aria-hidden="true" className="flex items-center -space-x-2">
                {/* Avatar 1: Tanvir */}
                <span className="inline-flex size-8 sm:size-9 items-center justify-center rounded-full ring-2 ring-white dark:ring-background bg-gradient-to-tr from-amber-500 to-orange-400 text-white font-bold text-xs shadow-xs">
                  TB
                </span>
                {/* Avatar 2: Rafi */}
                <span className="inline-flex size-8 sm:size-9 items-center justify-center rounded-full ring-2 ring-white dark:ring-background bg-gradient-to-tr from-purple-600 to-pink-500 text-white font-bold text-xs shadow-xs">
                  RM
                </span>
                {/* Avatar 3: Sakib */}
                <span className="inline-flex size-8 sm:size-9 items-center justify-center rounded-full ring-2 ring-white dark:ring-background bg-gradient-to-tr from-emerald-500 to-teal-400 text-white font-bold text-xs shadow-xs">
                  SK
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                Built for students and flatmates
              </p>
            </div>
          </div>

          {/* Right Column: Hero Dashboard Preview Visual */}
          <div className="lg:col-span-6 w-full">
            <div className="relative mx-auto w-full max-w-xl lg:max-w-none rounded-2xl sm:rounded-3xl border border-black/[0.08] dark:border-white/[0.08] shadow-[0_20px_50px_rgba(58,15,52,0.12)] dark:shadow-none overflow-hidden bg-white dark:bg-card transition-transform duration-300 hover:scale-[1.01]">
              <Image
                src="https://i.ibb.co.com/Hp9CYgFB/Mess-Tally-Expense-Dashboard-1.png"
                alt="MessTally Finance Dashboard preview showing meals, monthly expenses, utility fund and individual member balances"
                width={1448}
                height={1086}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="w-full h-auto object-cover select-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   SECTION 2: CORE FEATURE HIGHLIGHTS
   ========================================================================= */
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
    iconBg: "bg-purple-100 dark:bg-purple-950/60",
    iconColor: "text-[#3A0F34] dark:text-purple-300",
  },
  {
    icon: ShoppingCart,
    title: "Bazar Expenses",
    description: "Record shared bazar and household expenses.",
    iconBg: "bg-amber-100 dark:bg-amber-950/60",
    iconColor: "text-amber-700 dark:text-amber-300",
  },
  {
    icon: Users,
    title: "Member Balances",
    description: "See who owes what, clearly and fairly.",
    iconBg: "bg-rose-100 dark:bg-rose-950/60",
    iconColor: "text-rose-700 dark:text-rose-300",
  },
  {
    icon: Receipt,
    title: "Utility Bills & Fund",
    description: "Manage monthly utility bills and a shared fund.",
    iconBg: "bg-yellow-100 dark:bg-yellow-950/60",
    iconColor: "text-yellow-800 dark:text-yellow-300",
  },
  {
    icon: BarChart3,
    title: "Monthly Settlements",
    description: "Settle up at the end of each month.",
    iconBg: "bg-orange-100 dark:bg-orange-950/60",
    iconColor: "text-orange-700 dark:text-orange-300",
  },
];

function LandingFeatureStrip() {
  return (
    <section
      id="core-features"
      aria-label="Core Feature Highlights"
      className="w-full max-w-full bg-white dark:bg-background py-10 sm:py-14 border-b border-black/[0.04] dark:border-white/[0.06]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 items-start">
          {HIGHLIGHTS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex flex-col items-center text-center p-3 rounded-2xl transition-all duration-200 hover:bg-black/[0.02] dark:hover:bg-white/[0.03]"
              >
                {/* Icon Container with restrained brand-harmonious background */}
                <div
                  className={`size-12 sm:size-13 rounded-2xl flex items-center justify-center ${item.iconBg} ${item.iconColor} mb-3.5 shadow-2xs`}
                >
                  <Icon className="size-5 sm:size-6" aria-hidden="true" />
                </div>

                {/* Feature Title */}
                <h3 className="text-sm sm:text-base font-bold text-foreground mb-1 tracking-tight">
                  {item.title}
                </h3>

                {/* Feature Description */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-snug max-w-[200px]">
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

/* =========================================================================
   SECTION 3: OUR STORY
   ========================================================================= */
function LandingStory() {
  return (
    <section
      id="our-story"
      aria-labelledby="our-story-heading"
      className="w-full max-w-full py-16 sm:py-20 lg:py-28 bg-[#FAF8FA] dark:bg-card/40 border-b border-black/[0.04] dark:border-white/[0.06]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Real Photographic Story Asset */}
          <div className="lg:col-span-6 w-full order-2 lg:order-1">
            <div className="relative mx-auto w-full max-w-xl lg:max-w-none rounded-2xl sm:rounded-3xl border border-black/[0.08] dark:border-white/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.08)] overflow-hidden bg-white dark:bg-card">
              <Image
                src="https://i.ibb.co.com/xtTbbjkL/From-Handwritten-Records-to-Digital-Dashboard-1.png"
                alt="From handwritten meal charts and paper bazar lists to the digital MessTally dashboard on a laptop"
                width={1448}
                height={1086}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="w-full h-auto object-cover select-none"
              />
            </div>
          </div>

          {/* Right Column: Story Narrative & About CTA */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-left order-1 lg:order-2">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider bg-[#F3EBF5] text-[#3A0F34] dark:bg-purple-950/60 dark:text-purple-200 border border-[#E8D6EB] dark:border-purple-800/40 shadow-2xs">
              <span className="size-1.5 rounded-full bg-[#3A0F34] dark:bg-purple-300" />
              <span>Our Story</span>
            </div>

            {/* Heading */}
            <h2
              id="our-story-heading"
              className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-foreground leading-[1.18]"
            >
              From handwritten charts to a simpler way of living together.
            </h2>

            {/* Narrative Body */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              We&apos;ve all been there — messy spreadsheets, forgotten
              expenses, and endless confusion about who ate what. MessTally was
              built to solve these everyday problems and make shared living
              simple, transparent, and stress-free.
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-6 sm:px-7 py-3 sm:py-3.5 h-auto text-sm sm:text-base font-semibold bg-white dark:bg-card hover:bg-neutral-50 dark:hover:bg-neutral-800 text-foreground border-border/80 shadow-2xs transition-all group"
              >
                <Link href="/about" id="story-cta-learn-more">
                  <span>Learn More About Us</span>
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   SECTION 4: HOW IT WORKS
   ========================================================================= */
interface StepItem {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
  numBg: string;
  numText: string;
  iconBoxBg: string;
  iconBoxColor: string;
}

const STEPS: StepItem[] = [
  {
    number: "1",
    title: "Create or Join a Mess",
    description:
      "Create a new mess or join with a room code from your flatmate.",
    icon: Home,
    numBg: "bg-purple-100 dark:bg-purple-950/80",
    numText: "text-[#3A0F34] dark:text-purple-300",
    iconBoxBg: "bg-purple-50 dark:bg-purple-950/40",
    iconBoxColor: "text-[#3A0F34] dark:text-purple-300",
  },
  {
    number: "2",
    title: "Track Meals & Expenses",
    description: "Log your daily meals, bazar expenses and utility bills.",
    icon: ClipboardList,
    numBg: "bg-rose-100 dark:bg-rose-950/80",
    numText: "text-rose-700 dark:text-rose-300",
    iconBoxBg: "bg-rose-50 dark:bg-rose-950/40",
    iconBoxColor: "text-rose-700 dark:text-rose-300",
  },
  {
    number: "3",
    title: "View Balances & Settle",
    description: "See who owes what and settle at the end of the month.",
    icon: PieChart,
    numBg: "bg-amber-100 dark:bg-amber-950/80",
    numText: "text-amber-800 dark:text-amber-300",
    iconBoxBg: "bg-amber-50 dark:bg-amber-950/40",
    iconBoxColor: "text-amber-800 dark:text-amber-300",
  },
];

function LandingHowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="w-full max-w-full py-16 sm:py-20 lg:py-28 bg-white dark:bg-background border-b border-black/[0.04] dark:border-white/[0.06]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider bg-[#F3EBF5] text-[#3A0F34] dark:bg-purple-950/60 dark:text-purple-200 border border-[#E8D6EB] dark:border-purple-800/40 shadow-2xs mb-4">
            <span className="size-1.5 rounded-full bg-[#3A0F34] dark:bg-purple-300" />
            <span>How It Works</span>
          </div>
          <h2
            id="how-it-works-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground"
          >
            Get started in minutes
          </h2>
        </div>

        {/* 3 Step Workflow Container */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 lg:gap-8">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === STEPS.length - 1;

            return (
              <div
                key={step.number}
                className="flex-1 flex flex-col md:flex-row items-center gap-6"
              >
                {/* Step Card */}
                <div className="w-full flex-1 flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl border border-border/80 bg-white dark:bg-card shadow-2xs hover:shadow-md transition-all duration-200">
                  {/* Top row: step number pill */}
                  <div className="w-full flex justify-start mb-2">
                    <span
                      className={`inline-flex size-7 items-center justify-center rounded-full ${step.numBg} ${step.numText} font-bold text-xs shadow-2xs`}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Centered Large Icon Box */}
                  <div
                    className={`size-14 sm:size-16 rounded-2xl flex items-center justify-center ${step.iconBoxBg} ${step.iconBoxColor} mb-5 shadow-2xs`}
                  >
                    <Icon className="size-7 sm:size-8" aria-hidden="true" />
                  </div>

                  {/* Step Title */}
                  <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 tracking-tight">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-[260px]">
                    {step.description}
                  </p>
                </div>

                {/* Connecting Arrow between cards on desktop */}
                {!isLast && (
                  <div
                    className="hidden md:flex items-center justify-center text-purple-300 dark:text-purple-700 shrink-0 px-1"
                    aria-hidden="true"
                  >
                    <ArrowRight className="size-6" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   SECTION 5: KEY FEATURES
   ========================================================================= */
interface KeyFeature {
  icon: React.ElementType;
  title: string;
  description: string;
}

const KEY_FEATURES: KeyFeature[] = [
  {
    icon: Utensils,
    title: "Meal Tracking",
    description: "Record daily meals with accurate meal counts and meal rates.",
  },
  {
    icon: ShoppingCart,
    title: "Shared Bazar Expenses",
    description: "Track all shared bazar and household expenses with details.",
  },
  {
    icon: Receipt,
    title: "Utility Bills & Fund",
    description:
      "Add utility bills (electricity, gas, etc.) and manage a shared fund.",
  },
  {
    icon: Users,
    title: "Member Balances",
    description:
      "See real-time balances for each member with clear breakdowns.",
  },
  {
    icon: BarChart3,
    title: "Monthly Summaries",
    description: "View detailed monthly reports of meals and expenses.",
  },
  {
    icon: ArrowRight,
    title: "Easy Settlements",
    description:
      "Calculate and settle balances fairly at the end of the month.",
  },
];

function LandingKeyFeatures() {
  return (
    <section
      id="features"
      aria-labelledby="key-features-heading"
      className="w-full max-w-full py-16 sm:py-20 lg:py-28 bg-[#FAF8FA] dark:bg-card/40 border-b border-black/[0.04] dark:border-white/[0.06]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Two-Column Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider bg-[#F3EBF5] text-[#3A0F34] dark:bg-purple-950/60 dark:text-purple-200 border border-[#E8D6EB] dark:border-purple-800/40 shadow-2xs">
              <span className="size-1.5 rounded-full bg-[#3A0F34] dark:bg-purple-300" />
              <span>Key Features</span>
            </div>
            <h2
              id="key-features-heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold tracking-tight text-foreground leading-tight"
            >
              Everything you need for a smoother mess life.
            </h2>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground max-w-xs md:text-right">
            A complete solution for shared meal and expense management.
          </p>
        </div>

        {/* 3x2 Grid of Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {KEY_FEATURES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative rounded-2xl border border-border/80 bg-white dark:bg-card p-6 sm:p-7 shadow-2xs hover:shadow-md hover:border-primary/20 dark:hover:border-brand-accent/20 transition-all duration-200"
              >
                {/* Amber/Marigold Icon Container */}
                <div className="size-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 flex items-center justify-center mb-5 shadow-2xs transition-transform group-hover:scale-105">
                  <Icon className="size-5 sm:size-6" aria-hidden="true" />
                </div>

                {/* Card Title */}
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 tracking-tight">
                  {item.title}
                </h3>

                {/* Card Description */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
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

/* =========================================================================
   SECTION 7: FINAL CTA BANNER
   ========================================================================= */
function LandingCta() {
  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="w-full max-w-full overflow-hidden [contain:paint] py-12 sm:py-16 lg:py-20 bg-white dark:bg-background"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Main Banner Card (proportions & gradient matched to reference) */}
        <div className="relative overflow-hidden [contain:paint] rounded-[24px] sm:rounded-[32px] md:rounded-[36px] bg-gradient-to-b from-[#420E37] via-[#2F0727] to-[#20041B] px-5 sm:px-10 lg:px-16 py-10 sm:py-12 md:py-13 lg:py-14 text-center shadow-[0_20px_50px_-12px_rgba(34,6,32,0.4)] border border-white/10">
          {/* Left Abstract Graphic Anchor */}
          <svg
            aria-hidden="true"
            viewBox="0 0 380 280"
            fill="none"
            preserveAspectRatio="none"
            className="pointer-events-none absolute left-0 top-0 h-full w-[140px] sm:w-[230px] md:w-[310px] lg:w-[380px] select-none opacity-45 sm:opacity-85 lg:opacity-100"
          >
            <defs>
              <radialGradient
                id="cta-left-glow"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(50, 80) rotate(25) scale(200)"
              >
                <stop offset="0%" stopColor="#681650" stopOpacity="0.85" />
                <stop offset="55%" stopColor="#3C0930" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#22041B" stopOpacity="0" />
              </radialGradient>

              <radialGradient
                id="cta-left-disc"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(-20, 320) scale(270)"
              >
                <stop offset="0%" stopColor="#58143E" stopOpacity="0.95" />
                <stop offset="65%" stopColor="#3C0930" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#22041B" stopOpacity="0.3" />
              </radialGradient>
            </defs>

            {/* Left Layered Abstract Orbs */}
            <circle cx="50" cy="80" r="190" fill="url(#cta-left-glow)" />
            <circle cx="-20" cy="320" r="260" fill="url(#cta-left-disc)" />

            {/* Left Golden Arc Stroke */}
            <path
              d="M 0 98 C 85 98, 175 165, 215 280"
              stroke="#EAAA00"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Left Dot Matrix */}
            <g fill="white" fillOpacity="0.22">
              <circle cx="24" cy="52" r="2.2" />
              <circle cx="40" cy="52" r="2.2" />
              <circle cx="56" cy="52" r="2.2" />
              <circle cx="72" cy="52" r="2.2" />

              <circle cx="24" cy="70" r="2.2" />
              <circle cx="40" cy="70" r="2.2" />
              <circle cx="56" cy="70" r="2.2" />
              <circle cx="72" cy="70" r="2.2" />

              <circle cx="24" cy="88" r="2.2" />
              <circle cx="40" cy="88" r="2.2" />
              <circle cx="56" cy="88" r="2.2" />
              <circle cx="72" cy="88" r="2.2" />
            </g>
          </svg>

          {/* Right Abstract Graphic Anchor */}
          <svg
            aria-hidden="true"
            viewBox="0 0 380 280"
            fill="none"
            preserveAspectRatio="none"
            className="pointer-events-none absolute right-0 top-0 h-full w-[140px] sm:w-[230px] md:w-[310px] lg:w-[380px] select-none opacity-45 sm:opacity-85 lg:opacity-100"
          >
            <defs>
              <radialGradient
                id="cta-right-orb"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(155, 0) rotate(45) scale(200)"
              >
                <stop offset="0%" stopColor="#7E1B67" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#4A0C3C" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#22041B" stopOpacity="0" />
              </radialGradient>

              <radialGradient
                id="cta-right-disc"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(380, 240) scale(220)"
              >
                <stop offset="0%" stopColor="#561836" stopOpacity="0.95" />
                <stop offset="65%" stopColor="#37072D" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#22041B" stopOpacity="0.3" />
              </radialGradient>
            </defs>

            {/* Right Layered Abstract Circles */}
            <circle cx="155" cy="0" r="190" fill="url(#cta-right-orb)" />
            <circle cx="380" cy="240" r="180" fill="url(#cta-right-disc)" />

            {/* Right Golden Arc Stroke */}
            <path
              d="M 285 280 C 285 200, 325 138, 380 138"
              stroke="#EAAA00"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Right Yellow Spark Accent Bars */}
            <g stroke="#EAAA00" strokeWidth="5.5" strokeLinecap="round">
              <line x1="338" y1="96" x2="352" y2="120" />
              <line x1="321" y1="127" x2="338" y2="132" />
            </g>

            {/* Right Dot Matrix */}
            <g fill="white" fillOpacity="0.22">
              <circle cx="225" cy="227" r="2.2" />
              <circle cx="241" cy="227" r="2.2" />
              <circle cx="257" cy="227" r="2.2" />
              <circle cx="273" cy="227" r="2.2" />

              <circle cx="225" cy="245" r="2.2" />
              <circle cx="241" cy="245" r="2.2" />
              <circle cx="257" cy="245" r="2.2" />
              <circle cx="273" cy="245" r="2.2" />

              <circle cx="225" cy="263" r="2.2" />
              <circle cx="241" cy="263" r="2.2" />
              <circle cx="257" cy="263" r="2.2" />
              <circle cx="273" cy="263" r="2.2" />
            </g>
          </svg>

          {/* Center Foreground Content */}
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            {/* Pill Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-white/[0.08] text-white/90 border border-white/15 shadow-2xs backdrop-blur-xs">
              <span className="size-2 rounded-full bg-[#EAAA00]" />
              <span>Ready to get started?</span>
            </div>

            {/* Main Headline */}
            <h2
              id="cta-heading"
              className="mt-3.5 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight leading-[1.18]"
            >
              Simplify your mess life today.
            </h2>

            {/* Body Description */}
            <p className="mt-2.5 sm:mt-3 text-white/80 text-sm sm:text-[15px] md:text-base leading-relaxed max-w-[560px] mx-auto font-normal">
              Join thousands of students and young professionals in Bangladesh{" "}
              <br className="hidden sm:inline" />
              and manage your shared living the easier way.
            </p>

            {/* Primary Action Button */}
            <div className="mt-5 sm:mt-6">
              <Button
                asChild
                size="lg"
                className="rounded-full px-6 sm:px-7 py-2.5 h-10 text-sm sm:text-[15px] font-bold bg-white text-[#260523] hover:bg-neutral-100 shadow-md active:scale-[0.98] transition-all group"
              >
                <Link href="/register" id="final-cta-get-started">
                  <span>Get Started</span>
                  <ArrowRight
                    className="size-4 text-[#260523] transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   MAIN HOME PAGE
   ========================================================================= */
export default function HomePage() {
  return (
    <div className="flex flex-col w-full max-w-full overflow-x-hidden">
      {/* Section 1: Hero */}
      <LandingHero />

      {/* Section 2: Core Feature Highlights */}
      <LandingFeatureStrip />

      {/* Section 3: Our Story */}
      <LandingStory />

      {/* Section 4: How It Works */}
      <LandingHowItWorks />

      {/* Section 5: Key Features */}
      <LandingKeyFeatures />

      {/* Section 6: FAQ (Client Component) */}
      <LandingFaq />

      {/* Section 7: Final CTA */}
      <LandingCta />
    </div>
  );
}
