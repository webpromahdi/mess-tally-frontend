import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LandingProductPreview() {
  return (
    <section
      id="product-preview"
      aria-labelledby="product-preview-heading"
      className="w-full max-w-full py-16 sm:py-20 lg:py-28 bg-white dark:bg-card/40 border-b border-black/[0.04] dark:border-white/[0.06]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* =========================================================================
              Left Column: Descriptive Value Proposition & Direct Action
             ========================================================================= */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6 text-left">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider bg-[#F3EBF5] text-[#3A0F34] dark:bg-purple-950/60 dark:text-purple-200 border border-[#E8D6EB] dark:border-purple-800/40 shadow-2xs">
              <span className="size-1.5 rounded-full bg-[#3A0F34] dark:bg-purple-300" />
              <span>Product Preview</span>
            </div>

            {/* Heading */}
            <h2
              id="product-preview-heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold tracking-tight text-foreground leading-[1.18]"
            >
              A clear view of your mess at a glance.
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Get a complete overview of meals, expenses, utility bills, member
              balances and monthly settlements — all in one dashboard.
            </p>

            {/* Primary Action Button */}
            <div className="pt-2">
              <Button
                asChild
                size="lg"
                className="rounded-full px-6 sm:px-7 py-3 sm:py-3.5 h-auto text-sm sm:text-base font-semibold bg-[#3A0F34] hover:bg-[#2D0B29] text-white dark:bg-[#EAAA00] dark:text-[#3A0F34] dark:hover:bg-[#d89c00] shadow-md hover:shadow-lg transition-all group"
              >
                <Link href="/register" id="preview-cta-get-started">
                  <span>Get Started</span>
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
            </div>
          </div>

          {/* =========================================================================
              Right Column: Product Overview Dashboard Visual
             ========================================================================= */}
          <div className="lg:col-span-7 w-full">
            <div className="relative mx-auto w-full max-w-2xl lg:max-w-none rounded-2xl sm:rounded-3xl border border-black/[0.08] dark:border-white/[0.08] shadow-[0_20px_50px_rgba(58,15,52,0.1)] dark:shadow-none overflow-hidden bg-white dark:bg-card transition-transform duration-300 hover:scale-[1.01]">
              <Image
                src="https://i.ibb.co.com/7tqpQDjD/Mess-Tally-Dashboard-Overview-1.png"
                alt="MessTally Dashboard Overview showing monthly summary, daily meals graph, categorized expenses and member balance breakdown"
                width={1448}
                height={1086}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 750px"
                className="w-full h-auto object-cover select-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
