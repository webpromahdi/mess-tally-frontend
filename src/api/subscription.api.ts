import apiClient from "@/lib/apiClient";
import type {
  ActivateSubscriptionRequest,
  ActivateSubscriptionResponseData,
  ApiResponse,
  SubscriptionPaymentDetailDto,
  SubscriptionPaymentDto,
  SubscriptionResponseData,
} from "@/lib/types";

/** `GET /subscription` — API.md §53. Plan, limits, feature flags and options. */
export function getSubscription() {
  return apiClient<ApiResponse<SubscriptionResponseData>>("/subscription", {
    method: "GET",
  });
}

/** `POST /subscription/activate` — API.md §54. Creates a bKash checkout. */
export function activateSubscription(payload: ActivateSubscriptionRequest) {
  return apiClient<ApiResponse<ActivateSubscriptionResponseData>>(
    "/subscription/activate",
    { method: "POST", body: payload },
  );
}

/** `GET /subscription/payments` — API.md §55. Newest first. */
export function getSubscriptionPayments() {
  return apiClient<ApiResponse<SubscriptionPaymentDto[]>>(
    "/subscription/payments",
    { method: "GET" },
  );
}

/**
 * `GET /subscription/payments/:id/status` — API.md §56.
 * Reconciles a pending bKash payment (idempotent).
 */
export function getSubscriptionPaymentStatus(paymentId: string) {
  return apiClient<ApiResponse<SubscriptionPaymentDetailDto>>(
    `/subscription/payments/${encodeURIComponent(paymentId)}/status`,
    { method: "GET" },
  );
}
