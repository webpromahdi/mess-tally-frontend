import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBazar,
  deleteBazar,
  deleteBazarReceipt,
  getBazar,
  updateBazar,
  uploadBazarReceipt,
} from "@/api";
import { queryKeys } from "@/lib/queryKeys";
import type { BazarListQuery, UpdateBazarRequest } from "@/lib/types";

/**
 * `GET /bazar` — chronological entries plus house and per-shopper totals.
 * `month = null` omits the param so the backend resolves the current month.
 */
export function useBazar(filters: BazarListQuery = {}, enabled = true) {
  return useQuery({
    queryKey: queryKeys.bazar.list(filters),
    queryFn: () => getBazar(filters),
    enabled,
    staleTime: 30 * 1000,
  });
}

/**
 * Bazar spend feeds the dashboard KPIs and the member ledger (meal rate),
 * so all three caches are dropped after every write.
 */
function useBazarScopeInvalidation() {
  const queryClient = useQueryClient();
  return () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: queryKeys.bazar.all }),
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all }),
      queryClient.invalidateQueries({ queryKey: queryKeys.summary.all }),
    ]);
}

/** `POST /bazar` — any active member can log an entry. */
export function useCreateBazar() {
  const invalidate = useBazarScopeInvalidation();
  return useMutation({
    mutationFn: createBazar,
    onSuccess: () => invalidate(),
  });
}

/** `PATCH /bazar/:id` — at least one field is required. */
export function useUpdateBazar() {
  const invalidate = useBazarScopeInvalidation();
  return useMutation({
    mutationFn: ({ id, ...payload }: { id: string } & UpdateBazarRequest) =>
      updateBazar(id, payload),
    onSuccess: () => invalidate(),
  });
}

/** `DELETE /bazar/:id` — blocked once the month is closed. */
export function useDeleteBazar() {
  const invalidate = useBazarScopeInvalidation();
  return useMutation({
    mutationFn: deleteBazar,
    onSuccess: () => invalidate(),
  });
}

/** `POST /bazar/:id/receipt` — PRO only; JPEG/PNG/WebP ≤ 5 MB. */
export function useUploadBazarReceipt() {
  const invalidate = useBazarScopeInvalidation();
  return useMutation({
    mutationFn: ({ id, receipt }: { id: string; receipt: File | Blob }) =>
      uploadBazarReceipt(id, receipt),
    onSuccess: () => invalidate(),
  });
}

/** `DELETE /bazar/:id/receipt` — PRO only. */
export function useDeleteBazarReceipt() {
  const invalidate = useBazarScopeInvalidation();
  return useMutation({
    mutationFn: deleteBazarReceipt,
    onSuccess: () => invalidate(),
  });
}
