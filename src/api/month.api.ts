import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  CreateMonthRequest,
  CreateMonthResponseData,
  MonthResponseData,
  MonthsResponseData,
} from "@/lib/types";

/** `GET /months` — API.md §20. Newest first; FREE messes only see the current month. */
export function getMonths() {
  return apiClient<ApiResponse<MonthsResponseData>>("/months", {
    method: "GET",
  });
}

/** `POST /months` — API.md §21. Idempotent when the month is already open. */
export function createMonth(payload: CreateMonthRequest) {
  return apiClient<ApiResponse<CreateMonthResponseData>>("/months", {
    method: "POST",
    body: payload,
  });
}

/** `PATCH /months/:id/close` — API.md §22. Manager (+ PRO for a past month). */
export function closeMonth(monthId: string) {
  return apiClient<ApiResponse<MonthResponseData>>(
    `/months/${encodeURIComponent(monthId)}/close`,
    { method: "PATCH" },
  );
}

/** `PATCH /months/:id/reopen` — API.md §23. Manager (+ PRO for a past month). */
export function reopenMonth(monthId: string) {
  return apiClient<ApiResponse<MonthResponseData>>(
    `/months/${encodeURIComponent(monthId)}/reopen`,
    { method: "PATCH" },
  );
}
