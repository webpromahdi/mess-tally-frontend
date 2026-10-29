import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  bulkUpsertMeals,
  deleteMeal,
  getMeals,
  updateMyMeal,
  upsertMeal,
} from "@/api";
import { queryKeys } from "@/lib/queryKeys";

/**
 * `GET /meals?month=YYYY-MM` — dense day × member grid.
 * `month = null` omits the query param so the backend resolves the current month.
 */
export function useMeals(month: string | null) {
  return useQuery({
    queryKey: queryKeys.meals.detail(month),
    queryFn: () => getMeals({ month }),
    staleTime: 30 * 1000,
  });
}

/**
 * Any meal write changes the sheet, the dashboard KPIs and the member ledger,
 * so all three caches are invalidated together.
 */
function useMealScopeInvalidation() {
  const queryClient = useQueryClient();
  return () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: queryKeys.meals.all }),
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all }),
      queryClient.invalidateQueries({ queryKey: queryKeys.summary.all }),
    ]);
}

/** `PUT /meals` — manager upsert of one cell. */
export function useUpsertMeal() {
  const invalidate = useMealScopeInvalidation();
  return useMutation({
    mutationFn: upsertMeal,
    onSuccess: () => invalidate(),
  });
}

/** `POST /meals/bulk` — manager upsert of one daily sheet. */
export function useBulkMeals() {
  const invalidate = useMealScopeInvalidation();
  return useMutation({
    mutationFn: bulkUpsertMeals,
    onSuccess: () => invalidate(),
  });
}

/** `DELETE /meals/:id` — manager removal of a logged cell. */
export function useDeleteMeal() {
  const invalidate = useMealScopeInvalidation();
  return useMutation({
    mutationFn: deleteMeal,
    onSuccess: () => invalidate(),
  });
}

/**
 * `PATCH /meals/me` — PRO self-service edit of the caller's own meal.
 * Today only, before `mealCutoffTime`, and at least one count is required.
 */
export function useUpdateMyMeal() {
  const invalidate = useMealScopeInvalidation();
  return useMutation({
    mutationFn: updateMyMeal,
    onSuccess: () => invalidate(),
  });
}
