import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CreateMessForm } from "@/components/onboarding/create-mess-form";
import { Card } from "@/components/ui/card";

export default function CreateMessPage() {
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
          <span>CREATE NEW MESS</span>
          <span
            className="size-1 rounded-full bg-muted-foreground/60"
            aria-hidden="true"
          />
          <span>STEP 1 OF 1</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Create a new mess
        </h1>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Set up your shared living space and start managing your meals and
          expenses with your flatmates.
        </p>
      </div>

      {/* Main 2-Column Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Form Card (7 cols) */}
        <div className="lg:col-span-7">
          <Card className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs">
            <CreateMessForm />
          </Card>
        </div>

        {/* Right Column: "What happens next?" Panel (5 cols) */}
        <div className="lg:col-span-5">
          <Card className="rounded-2xl border border-border/80 bg-card p-6 sm:p-7 shadow-xs space-y-5">
            {/* House with Crown Illustration */}
            <div className="relative mx-auto h-32 w-48 sm:h-36 sm:w-56">
              <Image
                src="/illustrations/what-happens-house-crown.svg"
                alt="Mess manager privileges illustration"
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Title */}
            <div>
              <h2 className="text-base sm:text-lg font-bold text-foreground">
                What happens next?
              </h2>
            </div>

            {/* Numbered Steps */}
            <ol className="space-y-3.5 text-xs sm:text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary/70 text-primary font-bold text-xs mt-0.5">
                  1
                </span>
                <span className="leading-relaxed">
                  Your mess will be created and you'll be the Owner and Manager.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary/70 text-primary font-bold text-xs mt-0.5">
                  2
                </span>
                <span className="leading-relaxed">
                  A unique room code will be generated automatically.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary/70 text-primary font-bold text-xs mt-0.5">
                  3
                </span>
                <span className="leading-relaxed">
                  Invite your flatmates to join using the room code.
                </span>
              </li>
            </ol>
          </Card>
        </div>
      </div>
    </div>
  );
}
