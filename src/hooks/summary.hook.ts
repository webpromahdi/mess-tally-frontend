import { useMutation, useQuery } from "@tanstack/react-query";
import {
  downloadSummaryCsv,
  downloadSummaryStatement,
  getSummary,
} from "@/api";
import { saveFile } from "@/lib/download";
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

/** `GET /summary/export?format=csv` — downloads the monthly CSV. */
export function useDownloadSummaryCsv() {
  return useMutation({
    mutationFn: ({ month }: { month?: string | null } = {}) =>
      downloadSummaryCsv({ month }),
    onSuccess: saveFile,
  });
}

/**
 * `GET /summary/statement` — PRO-only PDF statement for the caller.
 * Only closed months are accepted by the backend.
 */
export function useDownloadSummaryStatement() {
  return useMutation({
    mutationFn: ({ month }: { month?: string | null } = {}) =>
      downloadSummaryStatement({ month }),
    onSuccess: saveFile,
  });
}
