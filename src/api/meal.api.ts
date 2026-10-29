import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  BulkMealsInput,
  BulkMealsResponseData,
  DeleteMealResponseData,
  MealEntryResponseData,
  MealsResponseData,
  SelfMealInput,
  UpsertMealInput,
} from "@/lib/types";

/**
 * Meal sheet API functions (API.md §24–28).
 * Plain async functions only — TanStack Query hooks live in `src/hooks/meal.hook.ts`.
 */

/** `GET /meals?month=YYYY-MM` — dense day × member grid. */
export function getMeals({ month }: { month?: string | null } = {}) {
  return apiClient<ApiResponse<MealsResponseData>>("/meals", {
    method: "GET",
    query: month ? { month } : undefined,
  });
}

/** `PUT /meals` — manager upsert of one member-day cell. */
export function upsertMeal(payload: UpsertMealInput) {
  return apiClient<ApiResponse<MealEntryResponseData>>("/meals", {
    method: "PUT",
    body: payload,
  });
}

/** `PATCH /meals/me` — PRO self-service edit of today's meal. */
export function updateMyMeal(payload: SelfMealInput) {
  return apiClient<ApiResponse<MealEntryResponseData>>("/meals/me", {
    method: "PATCH",
    body: payload,
  });
}

/** `POST /meals/bulk` — manager upsert of one daily sheet. */
export function bulkUpsertMeals(payload: BulkMealsInput) {
  return apiClient<ApiResponse<BulkMealsResponseData>>("/meals/bulk", {
    method: "POST",
    body: payload,
  });
}

/** `DELETE /meals/:id` — manager delete of one logged cell. */
export function deleteMeal(entryId: string) {
  return apiClient<ApiResponse<DeleteMealResponseData>>(
    `/meals/${encodeURIComponent(entryId)}`,
    { method: "DELETE" },
  );
}
