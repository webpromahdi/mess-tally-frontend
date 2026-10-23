import type * as React from "react";

/**
 * Common root boundary for (auth) route group.
 * Sub-layouts manage specific layouts:
 * - (split): 50/50 split layout for /login and /register
 * - (centered): Centered layout for /forgot-password and /reset-password
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
