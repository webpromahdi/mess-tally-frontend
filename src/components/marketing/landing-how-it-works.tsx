import {
  ArrowDown,
  ArrowRight,
  ClipboardList,
  Home,
  PieChart,
} from "lucide-react";
import * as React from "react";

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
    numBg: "bg-[#F3EBF5] dark:bg-purple-950/80",
    numText: "text-[#7A3382] dark:text-purple-300",
    iconBoxBg: "bg-[#EFE8F6] dark:bg-purple-950/60",
    iconBoxColor: "text-[#4D1546] dark:text-purple-200",
  },
  {
    number: "2",
    title: "Track Meals & Expenses",
    description: "Log your daily meals, bazar expenses and utility bills.",
    icon: ClipboardList,
    numBg: "bg-[#FDECEF] dark:bg-rose-950/80",
    numText: "text-[#D43F75] dark:text-rose-300",
    iconBoxBg: "bg-[#FCEAEF] dark:bg-rose-950/60",
    iconBoxColor: "text-[#C9305D] dark:text-rose-200",
  },
  {
    number: "3",
    title: "View Balances & Settle",
    description: "See who owes what and settle at the end of the month.",
    icon: PieChart,
    numBg: "bg-[#FEF6DC] dark:bg-amber-950/80",
    numText: "text-[#C48400] dark:text-amber-300",
    iconBoxBg: "bg-[#FEF6DC] dark:bg-amber-950/60",
    iconBoxColor: "text-[#C47D00] dark:text-amber-200",
  },
];

export function LandingHowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="relative w-full max-w-full overflow-hidden bg-[#F8F5FB] dark:bg-[#1A0B1A] py-16 sm:py-20 lg:py-24 border-b border-black/[0.04] dark:border-white/[0.06] transition-colors"
    >
      {/* Decorative ambient background curves matching reference image */}
      <div
        className="pointer-events-none absolute inset-0 -z-0 overflow-hidden select-none"
        aria-hidden="true"
      >
        {/* Soft radial glow orbs */}
        <div className="absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-purple-200/25 dark:bg-purple-900/10 blur-3xl" />
        <div className="absolute top-1/3 -right-20 h-96 w-96 rounded-full bg-purple-200/30 dark:bg-purple-900/10 blur-3xl" />
        <div className="absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-amber-100/30 dark:bg-amber-950/10 blur-3xl" />

        {/* Subtle decorative wavy curves */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full text-purple-200/50 dark:text-purple-900/20"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
        >
          <path
            d="M-50 250 C 300 120, 600 380, 1050 200 C 1250 120, 1400 280, 1500 240"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="opacity-40"
          />
          <path
            d="M-50 480 C 400 350, 800 580, 1200 420 C 1350 360, 1450 450, 1500 430"
            stroke="currentColor"
            strokeWidth="1.5"
            className="opacity-30"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          {/* Eyebrow Pill Badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 sm:px-4 py-1.5 bg-white/80 dark:bg-aubergine-900/50 border border-[#E4D9EB] dark:border-aubergine-800/60 shadow-2xs mb-3.5 sm:mb-4">
            <span
              className="size-2 rounded-full bg-[#EAAA00] shrink-0"
              aria-hidden="true"
            />
            <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-[#3A0F34] dark:text-[#EAAA00]">
              HOW IT WORKS
            </span>
          </div>

          {/* Section Main Heading */}
          <h2
            id="how-it-works-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#3A0F34] dark:text-foreground tracking-tight leading-[1.2]"
          >
            Get started in <span className="text-[#EAAA00]">minutes</span>
          </h2>

          {/* Section Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-[#554756] dark:text-neutral-300 max-w-xl mx-auto mt-2.5 sm:mt-3 leading-relaxed">
            Three simple steps to organize your shared living.
          </p>
        </div>

        {/* 3 Step Workflow Container */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6 lg:gap-4 xl:gap-6 max-w-5xl mx-auto">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === STEPS.length - 1;

            return (
              <React.Fragment key={step.number}>
                {/* Step Card */}
                <div className="group relative w-full lg:flex-1 rounded-2xl sm:rounded-[26px] bg-white dark:bg-card p-6 sm:p-8 flex flex-col items-center text-center justify-start shadow-[0_4px_24px_rgba(58,15,52,0.03)] hover:shadow-[0_12px_36px_rgba(58,15,52,0.08)] border border-white/80 dark:border-white/5 transition-all duration-300 hover:-translate-y-1.5 min-h-[290px] sm:min-h-[310px]">
                  {/* Step Number Badge (Top-Left) */}
                  <div className="absolute top-5 left-5 sm:top-6 sm:left-6">
                    <span
                      className={`inline-flex size-7 sm:size-8 items-center justify-center rounded-full ${step.numBg} ${step.numText} font-bold text-xs sm:text-[13px] shadow-2xs`}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Centered Large Pastel Squircle Icon */}
                  <div
                    className={`size-16 sm:size-18 md:size-20 rounded-[20px] sm:rounded-[22px] flex items-center justify-center ${step.iconBoxBg} ${step.iconBoxColor} mt-2 sm:mt-3 mb-5 sm:mb-6 shadow-2xs transition-transform duration-300 group-hover:scale-105 shrink-0`}
                  >
                    <Icon
                      className="size-7 sm:size-8 md:size-9"
                      strokeWidth={2.2}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Step Title */}
                  <h3 className="text-base sm:text-lg md:text-[19px] font-bold text-[#1E1120] dark:text-foreground mb-2 sm:mb-2.5 tracking-tight">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-xs sm:text-[13.5px] text-[#554756] dark:text-neutral-400 leading-relaxed max-w-[240px]">
                    {step.description}
                  </p>
                </div>

                {/* Connecting Arrow between cards */}
                {!isLast && (
                  <React.Fragment>
                    {/* Desktop Horizontal Arrow */}
                    <div
                      className="hidden lg:flex items-center justify-center text-[#A872B2] dark:text-purple-400/80 shrink-0 px-1 xl:px-2 transition-transform duration-300 hover:translate-x-1"
                      aria-hidden="true"
                    >
                      <ArrowRight
                        className="size-6 xl:size-7"
                        strokeWidth={2}
                      />
                    </div>

                    {/* Mobile Vertical Arrow */}
                    <div
                      className="flex lg:hidden items-center justify-center text-[#A872B2] dark:text-purple-400/80 shrink-0 -my-1"
                      aria-hidden="true"
                    >
                      <ArrowDown className="size-5" strokeWidth={2} />
                    </div>
                  </React.Fragment>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
