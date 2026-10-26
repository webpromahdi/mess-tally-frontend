import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JoinMessForm } from "@/components/onboarding/join-mess-form";
import { Card } from "@/components/ui/card";

export default function JoinMessPage() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 animate-in fade-in-50 duration-300">
      {/* Back Navigation */}
      <div>
        <Link
          href="/onboarding"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to previous</span>
        </Link>
      </div>

      {/* Eyebrow & Page Header */}
      <div className="space-y-1.5 text-left">
        <div className="flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-muted-foreground uppercase">
          <span>JOIN EXISTING MESS</span>
          <span
            className="size-1 rounded-full bg-muted-foreground/60"
            aria-hidden="true"
          />
          <span>STEP 1 OF 1</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Join an existing mess
        </h1>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Enter the room code provided by your flatmate to find and join the
          mess.
        </p>
      </div>

      {/* Main 2-Column Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Form Card (7 cols) */}
        <div className="lg:col-span-7">
          <Card className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs">
            <JoinMessForm />
          </Card>
        </div>

        {/* Right Column: "Need a room code?" Panel (5 cols) */}
        <div className="lg:col-span-5">
          <Card className="rounded-2xl border border-border/80 bg-card p-6 sm:p-7 shadow-xs space-y-5">
            {/* Team Avatars with Golden '+' Badge Illustration */}
            <div className="relative mx-auto h-28 w-44 sm:h-32 sm:w-48">
              <Image
                src="/illustrations/need-room-code-team.svg"
                alt="Room code invitation team illustration"
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Need a room code header and copy */}
            <div className="space-y-1">
              <h2 className="text-base sm:text-lg font-bold text-foreground">
                Need a room code?
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Ask your mess manager or any existing member to share the room
                code with you.
              </p>
            </div>

            <div className="h-px w-full bg-border/60" aria-hidden="true" />

            {/* After your request section */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                After your request to join
              </h3>

              <ol className="space-y-3 text-xs sm:text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary/70 text-primary font-bold text-xs mt-0.5">
                    1
                  </span>
                  <span className="leading-relaxed">
                    Your request will be sent to the manager.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary/70 text-primary font-bold text-xs mt-0.5">
                    2
                  </span>
                  <span className="leading-relaxed">
                    Refresh the pending screen to check the latest status.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary/70 text-primary font-bold text-xs mt-0.5">
                    3
                  </span>
                  <span className="leading-relaxed">
                    Then you can start tracking meals and expenses.
                  </span>
                </li>
              </ol>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
