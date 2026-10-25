import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

/**
 * Client UI state for authentication & active mess selection.
 * Grounded in AGENTS.md:
 * - Server data (User profile) lives in TanStack Query (useGetMe).
 * - Only global UI pointers (selected activeMessId, auth modal state) live here.
 */
interface AuthUIState {
  activeMessId: string | null;
  activeMessName: string | null;
  setActiveMess: (id: string | null, name?: string | null) => void;
  clearActiveMess: () => void;
}

export const useAuthStore = create<AuthUIState>()(
  devtools(
    persist(
      (set) => ({
        activeMessId: null,
        activeMessName: null,
        setActiveMess: (id, name = null) =>
          set(
            { activeMessId: id, activeMessName: name },
            false,
            "auth/setActiveMess",
          ),
        clearActiveMess: () =>
          set(
            { activeMessId: null, activeMessName: null },
            false,
            "auth/clearActiveMess",
          ),
      }),
      {
        name: "messtally-auth-ui",
      },
    ),
    {
      name: "AuthUIStore",
      enabled: process.env.NODE_ENV !== "production",
    },
  ),
);
