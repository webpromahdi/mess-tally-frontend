import apiClient from "@/lib/apiClient";
import type { ApiResponse, SummaryResponseData } from "@/lib/types";

/** `GET /summary?month=YYYY-MM` — API.md §46. Month defaults to current. */
export function getSummary({ month }: { month?: string | null } = {}) {
  return apiClient<ApiResponse<SummaryResponseData>>("/summary", {
    method: "GET",
    query: month ? { month } : undefined,
  });
}
