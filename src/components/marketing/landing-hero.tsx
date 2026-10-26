import { ArrowRight, Play, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LandingHero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative w-full max-w-full overflow-hidden [contain:paint] bg-[#FAF8F5] dark:bg-background border-b border-black/[0.04] dark:border-white/[0.05] min-h-[580px] lg:min-h-[620px] xl:min-h-[680px] flex items-center"
    >
      {/* Subtle warm ambient glow behind right daylight scene */}
      <div
        className="pointer-events-none absolute -top-16 right-0 -z-10 h-[500px] w-[500px] sm:w-[680px] sm:h-[680px] rounded-full bg-gradient-to-bl from-amber-100/30 via-orange-50/15 to-transparent blur-3xl"
        aria-hidden="true"
      />

      {/* Full-bleed ambient visual blend for desktop (matches reference design) */}
      <div
        className="hidden lg:flex absolute right-0 bottom-0 top-0 w-[55%] xl:w-[58%] 2xl:w-[62%] items-end justify-end pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Seamless left-to-right gradient mask dissolving image into warm off-white canvas */}
        <div className="relative w-full h-full flex items-end justify-end [mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.12)_14%,rgba(0,0,0,0.65)_30%,black_48%,black_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.12)_14%,rgba(0,0,0,0.65)_30%,black_48%,black_100%)]">
          <Image
            src="/images/hero-messtally-dashboard.png"
            alt="MessTally shared living dashboard on laptop and mobile showing meal counts, expenses, and member balances"
            width={1774}
            height={887}
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="w-full h-auto max-h-full object-contain object-bottom-right"
          />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-14 lg:pb-16">
        <div className="w-full lg:w-[52%] xl:w-[48%] flex flex-col items-start text-left space-y-6 sm:space-y-7">
          {/* Eyebrow Pill Badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 bg-[#FAF4F8] dark:bg-aubergine-900/60 border border-[#E6D8E4] dark:border-aubergine-800/50 shadow-2xs">
            <span
              className="size-2 rounded-full bg-[#EAAA00] shrink-0"
              aria-hidden="true"
            />
            <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-[#3A0F34] dark:text-[#EAAA00]">
              Shared meals. Clear records. Together.
            </span>
          </div>

          {/* Main Headline */}
          <h1
            id="hero-heading"
            className="text-[32px] sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[60px] font-extrabold tracking-tight text-[#3A0F34] dark:text-foreground leading-[1.15] sm:leading-[1.12]"
          >
            Manage your
            <span className="block mt-1 sm:mt-1.5 whitespace-normal lg:whitespace-nowrap">
              mess life{" "}
              <span className="relative inline-block text-[#EAAA00]">
                together.
                {/* Warm golden hand-drawn curve underline matching reference design */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 240 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute -bottom-2 sm:-bottom-2.5 left-0 w-full h-3 sm:h-3.5 text-[#EAAA00] select-none pointer-events-none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 13C45 4.5 135 4 237 11.5"
                    stroke="currentColor"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </span>
          </h1>

          {/* Subtitle Description */}
          <p className="text-base sm:text-lg text-[#4B5563] dark:text-muted-foreground leading-relaxed max-w-[480px]">
            MessTally helps you track meals, bazar, bills and settlements in one
            place, so everyone in your mess stays on the same page.
          </p>

          {/* CTA Button Group */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-1 w-full sm:w-auto">
            {/* Primary CTA: Get Started */}
            <Button
              asChild
              size="lg"
              id="hero-cta-get-started"
              className="h-auto min-h-[48px] sm:min-h-[52px] rounded-xl px-7 sm:px-8 py-3.5 text-base font-bold bg-[#EAAA00] hover:bg-[#D99600] active:scale-[0.98] text-[#3A0F34] shadow-md shadow-amber-500/15 hover:shadow-lg hover:shadow-amber-500/25 transition-all group justify-center border-0"
            >
              <Link href="/register" className="inline-flex items-center gap-2">
                <span>Get Started</span>
                <ArrowRight
                  className="size-4.5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </Button>

            {/* Secondary CTA: See How It Works */}
            <Button
              asChild
              variant="outline"
              size="lg"
              id="hero-cta-how-it-works"
              className="h-auto min-h-[48px] sm:min-h-[52px] rounded-xl px-6 sm:px-7 py-3.5 text-base font-semibold bg-white dark:bg-card hover:bg-neutral-50/90 dark:hover:bg-neutral-800 active:scale-[0.98] text-[#3A0F34] dark:text-foreground border border-neutral-200/90 dark:border-neutral-700/80 shadow-xs hover:shadow-md transition-all justify-center group"
            >
              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-2.5"
              >
                <span
                  className="flex size-7 items-center justify-center rounded-full bg-[#3A0F34] text-white shrink-0 shadow-2xs group-hover:scale-105 transition-transform"
                  aria-hidden="true"
                >
                  <Play className="size-3 fill-white text-white ml-0.5" />
                </span>
                <span>See How It Works</span>
              </Link>
            </Button>
          </div>

          {/* Micro-Trust Assurance */}
          <div className="flex items-center gap-2 pt-1 text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400">
            <Shield
              className="size-4 shrink-0 text-neutral-400 dark:text-neutral-500"
              aria-hidden="true"
            />
            <span>Free to start. No credit card needed.</span>
          </div>
        </div>

        {/* Mobile / Tablet visual display (graceful stacking below 1024px) */}
        <div className="lg:hidden w-full pt-8 pb-2">
          <div className="relative w-full max-w-xl mx-auto [mask-image:linear-gradient(to_bottom,black_82%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_82%,transparent_100%)]">
            <Image
              src="/images/hero-messtally-dashboard.png"
              alt="MessTally shared living dashboard on laptop and mobile showing meal counts, expenses, and member balances"
              width={1774}
              height={887}
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 600px"
              className="w-full h-auto object-contain select-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
