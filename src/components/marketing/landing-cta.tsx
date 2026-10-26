import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LandingCta() {
  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="w-full max-w-full overflow-hidden [contain:paint] py-12 sm:py-16 lg:py-20 bg-[#FAF8F5] dark:bg-background border-b border-black/[0.04] dark:border-white/[0.06] transition-colors"
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
