import apiClient from "@/lib/apiClient";
import type { ApiResponse, DashboardResponseData } from "@/lib/types";

/** `GET /dashboard?month=YYYY-MM` — API.md §49. Month defaults to current. */
export function getDashboard({ month }: { month?: string | null } = {}) {
  return apiClient<ApiResponse<DashboardResponseData>>("/dashboard", {
    method: "GET",
    query: month ? { month } : undefined,
  });
}
