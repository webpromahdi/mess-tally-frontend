import { create } from "zustand";
import { devtools } from "zustand/middleware";

/**
 * UI-only pointer for the month shown across the dashboard shell.
 * `null` = let the backend resolve the current month (no `?month=` query).
 * Server data stays in TanStack Query.
 */
interface MonthUIState {
  selectedMonth: string | null;
  setSelectedMonth: (month: string | null) => void;
}

export const useMonthStore = create<MonthUIState>()(
  devtools(
    (set) => ({
      selectedMonth: null,
      setSelectedMonth: (month) =>
        set({ selectedMonth: month }, false, "month/setSelectedMonth"),
    }),
    {
      name: "MonthUIStore",
      enabled: process.env.NODE_ENV !== "production",
    },
  ),
);
