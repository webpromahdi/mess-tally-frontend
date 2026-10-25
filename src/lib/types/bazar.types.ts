import type {
  MealsMember,
  MealsMess,
  MealsMonth,
  MealsViewer,
} from "./meal.types";

export type BazarViewer = MealsViewer;
export type BazarMess = MealsMess;
export type BazarMonth = MealsMonth;
export type BazarMember = MealsMember;

export interface BazarEntry {
  id: string;
  memberId: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  /** Taka, two decimals at most. */
  amount: number;
  note: string;
  /** Upload is deferred (PRD), always null for now. */
  receiptUrl: string | null;
  isLocked: boolean;
}

export interface BazarData {
  viewer: BazarViewer;
  mess: BazarMess;
  /** `null` = the mess has no active month. */
  month: BazarMonth | null;
  today: string;
  members: BazarMember[];
  entries: BazarEntry[];
  /** Σ amount (feeds F3). */
  totalBazar: number;
  /** From Module 05, read-only here. */
  houseMeals: number;
  /** F3: totalBazar ÷ houseMeals, 0 when no meals. */
  mealRate: number;
  pendingCount: number | null;
}

/** Body of `POST /api/bazar` (id null) or `PUT /api/bazar/:id`. */
export interface BazarInput {
  id: string | null;
  memberId: string;
  date: string;
  amount: number;
  note: string;
}

export type BazarField = "memberId" | "date" | "amount" | "note";

export interface BazarValidationError {
  field: BazarField;
  message: string;
}

export type SortKey = "date" | "amount" | "payer";
export type SortDir = "asc" | "desc";

export interface BazarSort {
  key: SortKey;
  dir: SortDir;
}

export interface BazarFilter {
  /** "all" or a member id. */
  memberId: string;
  /** ISO date or "" for open-ended. */
  from: string;
  to: string;
}
