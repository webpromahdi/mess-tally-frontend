import type * as React from "react";
import { MarketingFooter, MarketingHeader } from "@/components/marketing";

export default function MarketingPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col w-full max-w-full overflow-x-hidden bg-background text-foreground antialiased selection:bg-brand-accent/30 selection:text-brand-accent-foreground">
      {/* Accessible skip link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-md focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Skip to main content
      </a>

      {/* Shared Responsive Marketing Navigation Bar (Floats seamlessly over page content) */}
      <MarketingHeader />

      {/* Main Content Landmark with Zero-Tolerance Horizontal Overflow Containment */}
      <main
        id="main-content"
        className="flex-1 w-full min-w-0 max-w-full overflow-x-hidden"
      >
        {children}
      </main>

      {/* Shared Responsive Marketing Footer */}
      <MarketingFooter />
    </div>
  );
}
