"use client";

import type { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import QueryProvider from "./query.provider";

/**
 * Providers composition root.
 * Add new providers here by wrapping them in the correct order.
 * Order matters: outermost provider is the first to mount.
 *
 * Example:
 *   export default function Providers({ children }: { children: ReactNode }) {
 *     return (
 *       <ThemeProvider>
 *         <QueryProvider>{children}</QueryProvider>
 *       </ThemeProvider>
 *     );
 *   }
 */
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </QueryProvider>
  );
}
