import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { UserMenu } from "@/components/user-menu";
import { cn } from "@/lib/utils";

export interface OnboardingHeaderProps {
  /** Optional additional class names for header element */
  className?: string;
}

export function OnboardingHeader({ className }: OnboardingHeaderProps) {
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
