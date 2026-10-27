import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  BulkMealsInput,
  MealEntryDto,
  MealsResponseData,
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
  return apiClient<ApiResponse<{ entry: MealEntryDto }>>("/meals", {
    method: "PUT",
    body: payload,
  });
}

/** `POST /meals/bulk` — manager upsert of one daily sheet. */
export function bulkUpsertMeals(payload: BulkMealsInput) {
  return apiClient<ApiResponse<{ entries: MealEntryDto[] }>>("/meals/bulk", {
    method: "POST",
    body: payload,
  });
}

/** `DELETE /meals/:id` — manager delete of one logged cell. */
export function deleteMeal(entryId: string) {
  return apiClient<ApiResponse<{ id: string; deleted: boolean }>>(
    `/meals/${entryId}`,
    { method: "DELETE" },
  );
}
