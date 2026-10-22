import { create } from "zustand";
import { devtools } from "zustand/middleware";

/**
 * Global application store using Zustand v5.
 *
 * Guidelines:
 * - Keep only truly global UI state here (theme, sidebar open state, etc.)
 * - Server state (data from APIs) belongs in TanStack Query, NOT here
 * - For large apps, split into slice files and compose them here
 * - devtools are disabled in production automatically
 *
 * Usage in Client Components:
 *   "use client";
 *   import { useAppStore } from "@/store/app.store";
 *   const { theme, setTheme } = useAppStore();
 */

interface AppState {
  // ---- State ----
  isSidebarOpen: boolean;

  // ---- Actions ----
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      // Initial state
      isSidebarOpen: true,

      // Actions
      setSidebarOpen: (open) =>
        set({ isSidebarOpen: open }, false, "app/setSidebarOpen"),

      toggleSidebar: () =>
        set(
          (state) => ({ isSidebarOpen: !state.isSidebarOpen }),
          false,
          "app/toggleSidebar",
        ),
    }),
    {
      name: "AppStore",
      // Devtools disabled in production for performance & security
      enabled: process.env.NODE_ENV !== "production",
    },
  ),
);
