import type * as React from "react";

/**
 * Centered Layout for /forgot-password and /reset-password:
 * - Centered single-column layout across all viewports (mobile, tablet, desktop)
 * - Soft ice-silver background canvas
 * - No right-side image or split layout
 * - Mobile-first padding and keyboard safety
 */
export default function AuthCenteredLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-silver-200 dark:bg-background flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-x-hidden">
      <main className="w-full max-w-105 my-auto flex flex-col items-center justify-center">
        {children}
      </main>
    </div>
  );
}
