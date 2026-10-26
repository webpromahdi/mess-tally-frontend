import { useQuery } from "@tanstack/react-query";
import { getSummary } from "@/api";
import { queryKeys } from "@/lib/queryKeys";

/**
 * `GET /summary?month=YYYY-MM` — member ledger + greedy settlement.
 * Used by the dashboard charts here and by Module 08 later.
 */
export function useSummary(month: string | null, enabled = true) {
  return useQuery({
    queryKey: queryKeys.summary.detail(month),
    queryFn: () => getSummary({ month }),
    enabled,
    staleTime: 30 * 1000,
    refetchOnWindowFocus: true,
  });
}
