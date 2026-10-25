import { ArrowRight, KeyRound, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function OnboardingChoiceCards() {
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
