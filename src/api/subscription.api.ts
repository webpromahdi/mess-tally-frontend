import apiClient from "@/lib/apiClient";
import type { ApiResponse, SubscriptionResponseData } from "@/lib/types";

/** `GET /subscription` — API.md §53. Plan, limits, feature flags and options. */
export function getSubscription() {
  return apiClient<ApiResponse<SubscriptionResponseData>>("/subscription", {
    method: "GET",
  });
}
