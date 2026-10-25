import { Users } from "lucide-react";
import { OnboardingChoiceCards } from "@/components/onboarding";
import { Badge } from "@/components/ui/badge";

export default function OnboardingPage() {
  return (
    <div className="w-full space-y-7 sm:space-y-8 animate-in fade-in-50 duration-300">
      {/* Eyebrow & Hero Title */}
      <div className="space-y-2 text-left">
        <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
          GET STARTED • STEP 1 OF 1
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-[40px] font-extrabold tracking-tight text-foreground leading-[1.12]">
          Let's set up your mess.
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
          Choose how you'd like to get started with MessTally to manage your
          meals, expenses and flatmates.
        </p>
      </div>

      {/* Two Primary Action Cards */}
      <OnboardingChoiceCards />

      {/* Free Plan Information Banner (Matched to Left Reference) */}
      <section
        aria-label="Free plan notice"
        className="rounded-2xl border border-[#FCE6B7] bg-[#FFF9EC] dark:border-marigold-500/25 dark:bg-amber-950/20 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors"
      >
        <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
          <div className="flex size-11 sm:size-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-[#EAAA00] text-[#3A0F34] shadow-xs">
            <Users className="size-5 sm:size-5.5" aria-hidden="true" />
          </div>

          <div className="space-y-0.5">
            <h2 className="text-sm sm:text-base font-bold text-foreground">
              Free Plan: Up to 5 Active Members
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
              Start with our Free plan. Includes full meal tracking, bazar logs,
              utility bills and member balances for up to 5 active members.
            </p>
          </div>
        </div>

        <div className="shrink-0 self-start sm:self-center">
          <Badge
            variant="outline"
            className="border-[#F7DB99] bg-[#FDF0D5] text-[#8C6200] dark:border-marigold-500/30 dark:bg-marigold-500/20 dark:text-marigold-300 font-semibold text-xs px-3.5 py-1.5 rounded-full whitespace-nowrap shadow-2xs"
          >
            Zero Subscription Fee
          </Badge>
        </div>
      </section>
    </div>
  );
}
