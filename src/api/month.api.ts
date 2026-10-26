import apiClient from "@/lib/apiClient";
import type { ApiResponse, MonthsResponseData } from "@/lib/types";

/** `GET /months` — API.md §20. Newest first; FREE messes only see the current month. */
export function getMonths() {
  return apiClient<ApiResponse<MonthsResponseData>>("/months", {
    method: "GET",
  });
}
