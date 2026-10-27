import type { FundBlock } from "./dashboard.types";
import type {
  MealsMember,
  MealsMess,
  MealsMonth,
  MealsMonthDto,
  MealsViewer,
} from "./meal.types";
import type { MemberStatus } from "./member.types";

/** Shapes mirror the future `GET /api/utility?month=YYYY-MM` and `POST|PUT|DELETE /api/utility`. */
export type UtilityViewer = MealsViewer;
export type UtilityMess = MealsMess;
export type UtilityMonth = MealsMonth;
export type UtilityMember = MealsMember;

export type UtilityKind = "DEPOSIT" | "BILL";

export type UtilityCategory =
  | "Rent"
  | "Electricity"
  | "Gas"
  | "Water"
  | "Internet"
  | "Cook salary"
  | "Garbage / guard"
  | "Subscription"
  | "Other";

export interface UtilityEntry {
  id: string;
  kind: UtilityKind;
  /** Depositor, deposits only. */
  memberId: string | null;
  /** Bill category, bills only. */
  category: UtilityCategory | null;
  /** ISO date, YYYY-MM-DD. Bills use `dueDate` (falling back to `createdAt`). */
  date: string;
  amount: number;
  note: string;
  /** Deposits always count as paid; bills carry the API `isPaid` flag. */
  isPaid: boolean;
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

// ---------------------------------------------------------------------------
// Raw API contract — /api/v1/utilities (API.md §35–45)
// ---------------------------------------------------------------------------

export type UtilityBillCategory =
  | "RENT"
  | "ELECTRICITY"
  | "GAS"
  | "WATER"
  | "WIFI"
  | "COOK_SALARY"
  | "GARBAGE_GUARD"
  | "SUBSCRIPTION"
  | "OTHER";

/** `CUSTOM_WEIGHT` is rejected by the backend today. */
export type UtilitySplitType = "EQUAL";

export interface UtilityBillDto {
  id: string;
  messMonthId: string;
  category: UtilityBillCategory;
  title: string;
  amount: number;
  splitType: UtilitySplitType;
  dueDate: string | null;
  isPaid: boolean;
  paidAt: string | null;
  paidById: string | null;
  paidByName: string | null;
  notes: string | null;
  addedById: string;
  addedByName: string;
  createdAt: string;
  updatedAt: string;
}

export interface UtilityBillsResponseData {
  month: MealsMonthDto;
  bills: UtilityBillDto[];
  totals: {
    total: number;
    paid: number;
    unpaid: number;
    activeMemberCount: number;
    perPersonShare: number;
  };
}

export interface CreateUtilityBillRequest {
  /** `YYYY-MM`; required because bills have no natural date. */
  month: string;
  category?: UtilityBillCategory;
  title: string;
  amount: number;
  splitType?: UtilitySplitType;
  dueDate?: string | null;
  notes?: string | null;
}

/** `PATCH /utilities/:id` — at least one field is required. */
export interface UpdateUtilityBillRequest {
  category?: UtilityBillCategory;
  title?: string;
  amount?: number;
  splitType?: UtilitySplitType;
  dueDate?: string | null;
  notes?: string | null;
}

export interface UtilityBillResponseData {
  bill: UtilityBillDto;
}

export interface SetUtilityBillPaidRequest {
  isPaid: boolean;
}

export interface DeleteUtilityResponseData {
  id: string;
  deleted: boolean;
}

export interface UtilityFundResponseData {
  month: MealsMonthDto;
  totalDeposits: number;
  totalPaidBills: number;
  balance: number;
  needsReplenishment: boolean;
}

export interface ReplenishmentEstimateResponseData {
  perMember: number;
  activeMemberCount: number;
  totalExpected: number;
}

export interface FundDepositDto {
  id: string;
  memberId: string;
  memberName: string;
  memberStatus: MemberStatus;
  amount: number;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  note: string | null;
  receivedById: string;
  receivedByName: string;
  createdAt: string;
  updatedAt: string;
}

export interface FundDepositsResponseData {
  month: MealsMonthDto;
  deposits: FundDepositDto[];
  total: number;
  byMember: Array<{
    memberId: string;
    name: string;
    status: MemberStatus;
    count: number;
    amount: number;
  }>;
}

export interface CreateFundDepositRequest {
  memberId: string;
  amount: number;
  /** Defaults to today's UTC date on the backend. */
  date?: string;
  note?: string | null;
}

/** `PATCH /utilities/fund-deposits/:id` — at least one field is required. */
export interface UpdateFundDepositRequest {
  memberId?: string;
  amount?: number;
  date?: string;
  note?: string | null;
}

export interface FundDepositResponseData {
  deposit: FundDepositDto;
}

export interface DeleteFundDepositResponseData {
  id: string;
  deleted: boolean;
}
