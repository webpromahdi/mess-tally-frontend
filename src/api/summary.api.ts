import apiClient from "@/lib/apiClient";
import { fetchFile } from "@/lib/download";
import type { ApiResponse, SummaryResponseData } from "@/lib/types";

/** `GET /summary?month=YYYY-MM` — API.md §46. Month defaults to current. */
export function getSummary({ month }: { month?: string | null } = {}) {
  return apiClient<ApiResponse<SummaryResponseData>>("/summary", {
    method: "GET",
    query: month ? { month } : undefined,
  });
}

/**
 * `GET /summary/export?format=json` — API.md §47.
 * Same payload as `/summary`, wrapped in the standard envelope.
 */
export function getSummaryExportJson({
  month,
}: {
  month?: string | null;
} = {}) {
  return apiClient<ApiResponse<SummaryResponseData>>("/summary/export", {
    method: "GET",
    query: { format: "json", ...(month ? { month } : {}) },
  });
}

/** `GET /summary/export?format=csv` — API.md §47. Returns the raw CSV file. */
export function downloadSummaryCsv({ month }: { month?: string | null } = {}) {
  return fetchFile("/summary/export", {
    query: { format: "csv", ...(month ? { month } : {}) },
    fallbackFilename: `mess-tally-summary-${month ?? "current"}.csv`,
  });
}

/**
 * `GET /summary/statement?month=YYYY-MM` — API.md §48.
 * PRO only, closed months only; returns the caller's PDF statement.
 */
export function downloadSummaryStatement({
  month,
}: {
  month?: string | null;
} = {}) {
  return fetchFile("/summary/statement", {
    query: month ? { month } : undefined,
    fallbackFilename: `mess-tally-statement-${month ?? "current"}.pdf`,
  });
}
