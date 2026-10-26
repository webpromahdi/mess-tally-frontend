import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "@/api";
import { queryKeys } from "@/lib/queryKeys";

/**
 * `GET /dashboard?month=YYYY-MM` — meal KPIs, the caller's own ledger,
 * the utility fund and the manager pending count.
 *
 * `month = null` omits the query param so the backend resolves the current
 * month; this keeps the shell and page on the same cache entry.
 */
export function useDashboardData(month: string | null) {
  return useQuery({
    queryKey: queryKeys.dashboard.detail(month),
    queryFn: () => getDashboard({ month }),
    staleTime: 30 * 1000,
    refetchOnWindowFocus: true,
  });
}
