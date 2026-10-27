import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  activateSubscription,
  getSubscription,
  getSubscriptionPaymentStatus,
  getSubscriptionPayments,
} from "@/api";
import { queryKeys } from "@/lib/queryKeys";

/** `GET /subscription` — plan badge and PRO gates. */
export function useSubscription() {
  return useQuery({
    queryKey: queryKeys.workspace.subscription,
    queryFn: getSubscription,
    staleTime: 5 * 60 * 1000,
  });
}

/** `POST /subscription/activate` — owner/manager only; returns the bKash URL. */
export function useActivateSubscription() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: activateSubscription,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.subscription.payments,
      }),
  });
}

/** `GET /subscription/payments` — payment history, newest first. */
export function useSubscriptionPayments() {
  return useQuery({
    queryKey: queryKeys.subscription.payments,
    queryFn: getSubscriptionPayments,
    staleTime: 60 * 1000,
  });
}

/**
 * `GET /subscription/payments/:id/status` — reconciles a bKash checkout.
 * Polls while the payment is still pending, then stops.
 */
export function useSubscriptionPaymentStatus(
  paymentId: string | null,
  enabled = true,
) {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: queryKeys.subscription.paymentStatus(paymentId ?? ""),
    queryFn: () => getSubscriptionPaymentStatus(paymentId as string),
    enabled: enabled && Boolean(paymentId),
    refetchInterval: (current) =>
      current.state.data?.data?.status === "PENDING" ? 3000 : false,
  });

  // A PAID payment upgrades the mess, so the plan badge and history refresh.
  const status = query.data?.data?.status;
  useEffect(() => {
    if (status !== "PAID") return;
    queryClient.invalidateQueries({
      queryKey: queryKeys.workspace.subscription,
    });
    queryClient.invalidateQueries({
      queryKey: queryKeys.subscription.payments,
    });
  }, [status, queryClient]);

  return query;
}
