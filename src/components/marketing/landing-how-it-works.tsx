import { ArrowRight, ClipboardList, Home, PieChart } from "lucide-react";

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

export function LandingHowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="w-full max-w-full py-16 sm:py-20 lg:py-28 bg-white dark:bg-card/40 border-b border-black/[0.04] dark:border-white/[0.06]"
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
