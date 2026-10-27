import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createFundDeposit,
  createUtilityBill,
  deleteFundDeposit,
  deleteUtilityBill,
  getFundDeposits,
  getReplenishmentEstimate,
  getUtilityBills,
  getUtilityFund,
  setUtilityBillPaid,
  updateFundDeposit,
  updateUtilityBill,
} from "@/api";
import { queryKeys } from "@/lib/queryKeys";
import type {
  SetUtilityBillPaidRequest,
  UpdateFundDepositRequest,
  UpdateUtilityBillRequest,
} from "@/lib/types";

// ---------------------------------------------------------------------------
// Queries — API.md §35, §40–42
// ---------------------------------------------------------------------------

/** `GET /utilities?month=` — bills, totals and the per-person share. */
export function useUtilityBills(month: string | null, enabled = true) {
  return useQuery({
    queryKey: queryKeys.utilities.bills(month),
    queryFn: () => getUtilityBills({ month }),
    enabled,
    staleTime: 30 * 1000,
  });
}

/** `GET /utilities/fund?month=` — deposits minus paid bills. */
export function useUtilityFund(month: string | null, enabled = true) {
  return useQuery({
    queryKey: queryKeys.utilities.fund(month),
    queryFn: () => getUtilityFund({ month }),
    enabled,
    staleTime: 30 * 1000,
  });
}

/** `GET /utilities/fund-deposits?month=` — deposit ledger plus per-member totals. */
export function useFundDeposits(month: string | null, enabled = true) {
  return useQuery({
    queryKey: queryKeys.utilities.deposits(month),
    queryFn: () => getFundDeposits({ month }),
    enabled,
    staleTime: 30 * 1000,
  });
}

/**
 * `GET /utilities/replenishment-estimate?perMember=` — manager-only preview.
 * Disabled until the manager has entered a per-member amount.
 */
export function useReplenishmentEstimate(perMember: number | null) {
  return useQuery({
    queryKey: queryKeys.utilities.replenishment(perMember ?? 0),
    queryFn: () => getReplenishmentEstimate({ perMember: perMember ?? 0 }),
    enabled: perMember !== null && perMember > 0,
    staleTime: 60 * 1000,
  });
}

// ---------------------------------------------------------------------------
// Mutations — API.md §36–39, §43–45
// ---------------------------------------------------------------------------

/**
 * Bills and deposits move the Utility Fund block on the dashboard and the
 * settlement in the summary, so both are invalidated with the utility caches.
 */
function useUtilityScopeInvalidation() {
  const queryClient = useQueryClient();
  return () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: queryKeys.utilities.all }),
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all }),
      queryClient.invalidateQueries({ queryKey: queryKeys.summary.all }),
    ]);
}

/** `POST /utilities` — any active member can add a bill. */
export function useCreateUtilityBill() {
  const invalidate = useUtilityScopeInvalidation();
  return useMutation({
    mutationFn: createUtilityBill,
    onSuccess: () => invalidate(),
  });
}

/** `PATCH /utilities/:id` — at least one field is required. */
export function useUpdateUtilityBill() {
  const invalidate = useUtilityScopeInvalidation();
  return useMutation({
    mutationFn: ({
      id,
      ...payload
    }: { id: string } & UpdateUtilityBillRequest) =>
      updateUtilityBill(id, payload),
    onSuccess: () => invalidate(),
  });
}

/** `PATCH /utilities/:id/paid` — toggles the paid flag. */
export function useSetUtilityBillPaid() {
  const invalidate = useUtilityScopeInvalidation();
  return useMutation({
    mutationFn: ({
      id,
      ...payload
    }: { id: string } & SetUtilityBillPaidRequest) =>
      setUtilityBillPaid(id, payload),
    onSuccess: () => invalidate(),
  });
}

/** `DELETE /utilities/:id` — blocked once the month is closed. */
export function useDeleteUtilityBill() {
  const invalidate = useUtilityScopeInvalidation();
  return useMutation({
    mutationFn: deleteUtilityBill,
    onSuccess: () => invalidate(),
  });
}

/** `POST /utilities/fund-deposits` — manager only. */
export function useCreateFundDeposit() {
  const invalidate = useUtilityScopeInvalidation();
  return useMutation({
    mutationFn: createFundDeposit,
    onSuccess: () => invalidate(),
  });
}

/** `PATCH /utilities/fund-deposits/:id` — manager only. */
export function useUpdateFundDeposit() {
  const invalidate = useUtilityScopeInvalidation();
  return useMutation({
    mutationFn: ({
      id,
      ...payload
    }: { id: string } & UpdateFundDepositRequest) =>
      updateFundDeposit(id, payload),
    onSuccess: () => invalidate(),
  });
}

/** `DELETE /utilities/fund-deposits/:id` — manager only. */
export function useDeleteFundDeposit() {
  const invalidate = useUtilityScopeInvalidation();
  return useMutation({
    mutationFn: deleteFundDeposit,
    onSuccess: () => invalidate(),
  });
}
