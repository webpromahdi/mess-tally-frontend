import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { closeMonth, createMonth, getMonths, reopenMonth } from "@/api";
import { queryKeys } from "@/lib/queryKeys";

/** `GET /months` — newest first; FREE messes only see the current month. */
export function useMonths() {
  return useQuery({
    queryKey: queryKeys.workspace.months,
    queryFn: getMonths,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Opening / closing a month changes the month list, the selected-month view,
 * and the `isLocked` flag on meals, so every month-scoped cache is dropped.
 */
function useMonthScopeInvalidation() {
  const queryClient = useQueryClient();
  return () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: queryKeys.workspace.months }),
      queryClient.invalidateQueries({ queryKey: queryKeys.meals.all }),
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all }),
      queryClient.invalidateQueries({ queryKey: queryKeys.summary.all }),
      queryClient.invalidateQueries({ queryKey: queryKeys.bazar.all }),
      queryClient.invalidateQueries({ queryKey: queryKeys.utilities.all }),
    ]);
}

/** `POST /months` — manager opens a month explicitly (idempotent when open). */
export function useCreateMonth() {
  const invalidate = useMonthScopeInvalidation();
  return useMutation({
    mutationFn: createMonth,
    onSuccess: () => invalidate(),
  });
}

/** `PATCH /months/:id/close` — manager (+ PRO for a past month). */
export function useCloseMonth() {
  const invalidate = useMonthScopeInvalidation();
  return useMutation({
    mutationFn: closeMonth,
    onSuccess: () => invalidate(),
  });
}

/** `PATCH /months/:id/reopen` — manager (+ PRO for a past month). */
export function useReopenMonth() {
  const invalidate = useMonthScopeInvalidation();
  return useMutation({
    mutationFn: reopenMonth,
    onSuccess: () => invalidate(),
  });
}
