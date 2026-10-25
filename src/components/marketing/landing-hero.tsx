import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LandingHero() {
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
