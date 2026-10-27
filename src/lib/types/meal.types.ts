import type { MonthStatus, Plan, Role } from "./dashboard.types";
import type { MemberStatus } from "./member.types";

export interface MealsViewer {
  memberId: string;
  name: string;
  firstName: string;
  role: Role;
  isManager: boolean;
}

export interface MealsMess {
  name: string;
  plan: Plan;
  managerFirstName: string;
}

export interface MealsMember {
  id: string;
  name: string;
  role: Role;
  status: "ACTIVE" | "LEFT";
  /** Σ (breakfast + lunch + dinner + guestMeals) for the month (F1). */
  totalMeals: number;
}

export interface MealsMonth {
  key: string;
  /** e.g. "Oct 2026" */
  label: string;
  /** e.g. "October 2026" */
  longLabel: string;
  status: MonthStatus;
  /** ISO dates, inclusive. */
  startDate: string;
  endDate: string;
  isLocked: boolean;
}

export interface MealEntry {
  id: string;
  memberId: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  breakfast: number;
  lunch: number;
  dinner: number;
  guestMeals: number;
  isLocked: boolean;
}

export interface MealsGridData {
  viewer: MealsViewer;
  mess: MealsMess;
  /** `null` = the mess has no active month. */
  month: MealsMonth | null;
  /** Fixed "today" so every screen is deterministic. */
  today: string;
  members: MealsMember[];
  /** Only days with a logged entry; missing = nothing logged yet. */
  entries: MealEntry[];
  houseTotal: number;
  totalBazar: number;
  /** F3: totalBazar ÷ houseTotal, 0 when no meals. */
  mealRate: number;
  pendingCount: number | null;
}

/** Body of `PUT /api/meals` (upserts one cell). */
export interface UpsertMealInput {
  memberId: string;
  date: string;
  breakfast: number;
  lunch: number;
  dinner: number;
  guestMeals: number;
}

export interface MealValidationError {
  field: keyof UpsertMealInput | "form";
  message: string;
}

export interface MealWarning {
  message: string;
}

export interface MealValidationResult {
  errors: MealValidationError[];
  warnings: MealWarning[];
}

// ---------------------------------------------------------------------------
// Raw API contract — GET/PUT/PATCH/POST/DELETE /api/v1/meals (API.md §24–28)
// ---------------------------------------------------------------------------

export interface MealTotalsDto {
  breakfast: number;
  lunch: number;
  dinner: number;
  guestMeals: number;
  total: number;
}

export interface MealsMonthDto {
  /** `null` when no month row exists yet (reads never create one). */
  id: string | null;
  /** `YYYY-MM`. */
  name: string;
  startDate: string;
  endDate: string;
  /** `null` when `exists` is false — no month row, so no status. */
  status: MonthStatus | null;
  exists: boolean;
}

export interface MealsGridDayDto {
  date: string;
  /** `null` = nothing logged; the dense grid still returns the day. */
  entryId: string | null;
  breakfast: number;
  lunch: number;
  dinner: number;
  guestMeals: number;
  total: number;
  isLocked: boolean;
}

export interface MealsGridMemberDto {
  memberId: string;
  name: string;
  avatarUrl: string | null;
  /** Members with entries stay in the grid even after they leave. */
  status: MemberStatus;
  days: MealsGridDayDto[];
  totals: MealTotalsDto;
}

export interface MealsResponseData {
  month: MealsMonthDto;
  days: string[];
  members: MealsGridMemberDto[];
  houseTotals: MealTotalsDto;
}

export interface MealEntryDto {
  id: string;
  messMonthId: string;
  memberId: string;
  date: string;
  breakfast: number;
  lunch: number;
  dinner: number;
  guestMeals: number;
  total: number;
  isLocked: boolean;
  updatedById: string;
  updatedAt: string;
}

/** `POST /meals/bulk` — one daily sheet; `date` is lifted out of the cells. */
export interface BulkMealsInput {
  date: string;
  entries: Array<Omit<UpsertMealInput, "date">>;
}
