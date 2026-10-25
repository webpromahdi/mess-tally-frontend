import Link from "next/link";
import type { ReactNode } from "react";
import { BrandLogo, UserMenu } from "@/components/shared";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Mess Onboarding & Setup | MessTally",
  description:
    "Set up or join your shared living mess on MessTally. Automated meal rates, bazar expenses, and financial peace of mind for bachelor flatmates.",
};

interface OnboardingHeaderProps {
  className?: string;
}

function OnboardingHeader({ className }: OnboardingHeaderProps) {
  return (
    <header
      className={cn("w-full bg-transparent transition-colors", className)}
    >
      <div className="mx-auto flex h-18 sm:h-20 w-full max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Prominent MessTally Brand Logo */}
        <Link
          href="/onboarding"
          className="inline-flex items-center rounded-lg py-1 outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="MessTally Home"
        >
          <BrandLogo
            variant="auto"
            className="h-10 sm:h-11 md:h-11.5 w-auto transition-transform hover:scale-[1.01]"
            priority
          />
        </Link>

        {/* Right: Authenticated User Profile Menu */}
        <UserMenu />
      </div>
    </header>
  );
}

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-onboarding-background text-foreground transition-colors selection:bg-primary selection:text-white">
      {/* Soft Aubergine ambient aura matching reference visual design */}
      <div
        className="pointer-events-none fixed -top-20 -left-20 size-[520px] rounded-full bg-secondary/40 blur-3xl dark:bg-primary/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed top-1/4 -right-24 size-[580px] rounded-full bg-secondary/35 blur-3xl dark:bg-primary/8"
        aria-hidden="true"
      />

      {/* Top Navigation & User Context */}
      <OnboardingHeader />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 w-full mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 md:pt-8 pb-10 sm:pb-12 md:pb-14 flex flex-col justify-start">
        {children}
      </main>

      {/* Onboarding Footer — borderless, aligned flush with header and main canvas */}
      <footer className="w-full bg-transparent py-8 text-xs text-muted-foreground/85">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            © {new Date().getFullYear()} MessTally. Built for bachelor flatmates
            in Bangladesh.
          </p>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span>Need help with setup?</span>
            <span className="text-primary font-semibold">
              WhatsApp: +880 1700-000000
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
