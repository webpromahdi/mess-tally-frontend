import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LandingCta() {
  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="w-full max-w-full overflow-hidden [contain:paint] py-16 sm:py-20 lg:py-24 bg-white dark:bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Deep Aubergine Card Container with Marigold Accents */}
        <div className="relative overflow-hidden [contain:paint] rounded-3xl sm:rounded-[36px] bg-gradient-to-br from-[#3A0F34] via-[#2E0B29] to-[#1D051A] px-6 sm:px-12 lg:px-16 py-14 sm:py-18 lg:py-20 text-center shadow-2xl border border-white/[0.08]">
          {/* Subtle background glow */}
          <div
            className="pointer-events-none absolute -top-20 inset-x-0 mx-auto w-full max-w-sm h-64 bg-purple-500/10 rounded-full blur-3xl overflow-hidden"
            aria-hidden="true"
          />

          {/* Marigold Decorative Sunburst in Bottom Right (matching reference image) */}
          <div
            className="pointer-events-none absolute bottom-0 right-0 w-32 h-32 sm:w-44 sm:h-44 text-[#EAAA00] opacity-80 select-none overflow-hidden"
            aria-hidden="true"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="w-full h-full"
            >
              <line x1="30" y1="90" x2="10" y2="95" />
              <line x1="40" y1="80" x2="25" y2="95" />
              <line x1="55" y1="70" x2="45" y2="92" />
              <line x1="72" y1="62" x2="70" y2="90" />
              <line x1="88" y1="60" x2="92" y2="85" />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-white/10 text-white/90 border border-white/20 shadow-2xs backdrop-blur-xs">
              <span className="size-1.5 rounded-full bg-[#EAAA00]" />
              <span>Ready to get started?</span>
            </div>

            {/* Main Heading */}
            <h2
              id="cta-heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight"
            >
              Simplify your mess life today.
            </h2>

            {/* Body Description */}
            <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto">
              Join thousands of students and young professionals in Bangladesh
              and manage your shared living the easier way.
            </p>

            {/* Primary Action Button */}
            <div className="pt-3">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 py-3.5 sm:py-4 h-auto text-base font-bold bg-white text-[#3A0F34] hover:bg-neutral-100 shadow-xl active:scale-[0.98] transition-all group"
              >
                <Link href="/register" id="final-cta-get-started">
                  <span>Get Started</span>
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
