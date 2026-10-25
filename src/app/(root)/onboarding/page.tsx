import { ArrowRight, KeyRound, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function OnboardingChoiceCards() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Option 1: Create a New Mess */}
      <Card className="flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-border/70 bg-card p-6 sm:p-7 md:p-8 shadow-xs hover:border-border hover:shadow-sm transition-all duration-200">
        <div>
          {/* Top visual row: icon badge on left, house illustration on right */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-[#F4ECF4] text-[#3A0F34] dark:bg-primary/20 dark:text-marigold-400 shrink-0 shadow-2xs">
              <Users className="size-5.5" aria-hidden="true" />
            </div>

            <div className="relative h-20 w-28 sm:h-24 sm:w-34 md:h-26 md:w-36 shrink-0">
              <Image
                src="/illustrations/create-mess-house.svg"
                alt="Create a new mess illustration"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

          {/* Heading and Description */}
          <div className="mt-5">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Create a New Mess
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Set up a new shared living space. You'll be the Manager and can
              configure basic rules, meal cutoff time and more.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-6 sm:pt-7">
          <Button
            asChild
            size="lg"
            className="w-full h-12 rounded-xl text-sm sm:text-base font-semibold shadow-xs bg-[#3A0F34] hover:bg-[#2A0926] text-white flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
          >
            <Link href="/onboarding/create">
              <span>Create New Mess</span>
              <ArrowRight className="size-4 ml-0.5" />
            </Link>
          </Button>
        </div>
      </Card>

      {/* Option 2: Join an Existing Mess */}
      <Card className="flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-border/70 bg-card p-6 sm:p-7 md:p-8 shadow-xs hover:border-border hover:shadow-sm transition-all duration-200">
        <div>
          {/* Top visual row: key badge on left, golden key illustration on right */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-[#FFF6E5] text-[#D49A00] dark:bg-marigold-500/20 dark:text-marigold-400 shrink-0 shadow-2xs">
              <KeyRound className="size-5.5" aria-hidden="true" />
            </div>

            <div className="relative h-20 w-28 sm:h-24 sm:w-34 md:h-26 md:w-36 shrink-0">
              <Image
                src="/illustrations/join-mess-key.svg"
                alt="Join mess key illustration"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

          {/* Heading and Description */}
          <div className="mt-5">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Join an Existing Mess
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Have a room code from your flatmate? Join their mess and start
              tracking meals and expenses.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-6 sm:pt-7">
          <Button
            asChild
            size="lg"
            className="w-full h-12 rounded-xl text-sm sm:text-base font-semibold shadow-xs bg-[#EAAA00] hover:bg-[#D49A00] text-[#3A0F34] flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
          >
            <Link href="/onboarding/join">
              <span>Join with Room Code</span>
              <ArrowRight className="size-4 ml-0.5" />
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}

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
