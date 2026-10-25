import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LandingStory() {
  return (
    <section
      id="our-story"
      aria-labelledby="our-story-heading"
      className="w-full max-w-full py-16 sm:py-20 lg:py-28 bg-[#FAF8FA] dark:bg-background/80 border-b border-black/[0.04] dark:border-white/[0.06]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* =========================================================================
              Left Column: Real Photographic Story Asset
              (Handwritten Mess Chart & Bazar List Notebook transitioning to MessTally laptop)
             ========================================================================= */}
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

          {/* =========================================================================
              Right Column: Story Narrative & About CTA
             ========================================================================= */}
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
