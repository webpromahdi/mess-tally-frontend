import type { FundBlock } from "./dashboard.types";
import type {
  MealsMember,
  MealsMess,
  MealsMonth,
  MealsViewer,
} from "./meal.types";

/** Shapes mirror the future `GET /api/utility?month=YYYY-MM` and `POST|PUT|DELETE /api/utility`. */
export type UtilityViewer = MealsViewer;
export type UtilityMess = MealsMess;
export type UtilityMonth = MealsMonth;
export type UtilityMember = MealsMember;

export type UtilityKind = "DEPOSIT" | "BILL";

export type UtilityCategory =
  | "Electricity"
  | "Gas"
  | "Internet"
  | "Water"
  | "Maid"
  | "Other";

export interface UtilityEntry {
  id: string;
  kind: UtilityKind;
  /** Depositor, deposits only. */
  memberId: string | null;
  /** Bill category, bills only. */
  category: UtilityCategory | null;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  amount: number;
  note: string;
  /** Upload is deferred (PRD), always null for now. */
  receiptUrl: string | null;
  isLocked: boolean;
}

/** Fund block (U1–U3) plus the ledger behind it. */
export interface UtilityData extends FundBlock {
  viewer: UtilityViewer;
  mess: UtilityMess;
  /** `null` = the mess has no active month. */
  month: UtilityMonth | null;
  today: string;
  members: UtilityMember[];
  entries: UtilityEntry[];
  pendingCount: number | null;
}

/** Body of `POST /api/utility` (id null) or `PUT /api/utility/:id`. */
export interface UtilityInput {
  id: string | null;
  kind: UtilityKind;
  memberId: string | null;
  category: UtilityCategory | null;
  date: string;
  amount: number;
  note: string;
}

export type UtilityField = "memberId" | "category" | "date" | "amount" | "note";

export interface UtilityValidationError {
  field: UtilityField;
  message: string;
}

export type UtilitySortKey = "date" | "amount";
export type UtilitySortDir = "asc" | "desc";

export interface UtilitySort {
  key: UtilitySortKey;
  dir: UtilitySortDir;
}

export interface UtilityFilter {
  kind: "all" | UtilityKind;
  /** "all" or a bill category. */
  category: "all" | UtilityCategory;
  /** ISO date or "" for open-ended. */
  from: string;
  to: string;
}
