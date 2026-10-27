import type {
  BalanceStatus,
  FundBlock,
  MealBlock,
  MessInfo,
  MonthInfo,
  Viewer,
} from "./dashboard.types";
import type { MealsMonthDto } from "./meal.types";

/** Shapes mirror the future `GET /api/v1/summary?month=YYYY-MM`. */
export type SummaryViewer = Viewer;
export type SummaryMess = MessInfo;
export type SummaryMonth = MonthInfo;

export interface SummaryTransfer {
  fromId: string;
  toId: string;
  amount: number;
}

export interface SummaryDepositRow {
  memberId: string;
  name: string;
  amount: number;
}

export interface SummaryData {
  viewer: SummaryViewer;
  mess: SummaryMess;
  /** `null` = the mess has no active month. */
  month: SummaryMonth | null;
  meal: MealBlock | null;
  /** Utility Fund block (U1–U3). Never mixed into the meal numbers. */
  fund: FundBlock | null;
  depositsByMember: SummaryDepositRow[];
  transfers: SummaryTransfer[];
  /** CLOSED month: the settlement is final rather than suggested. */
  isFinal: boolean;
  pendingCount: number | null;
}

export type SummarySortKey = "name" | "meals" | "balance";
export type SummarySortDir = "asc" | "desc";

export interface SummarySort {
  key: SummarySortKey;
  dir: SummarySortDir;
}

// Backward-compatible type aliases
export type DepositRow = SummaryDepositRow;
export type Transfer = SummaryTransfer;

// ---------------------------------------------------------------------------
// Raw API contract — GET /api/v1/summary?month=YYYY-MM (API.md §46)
// ---------------------------------------------------------------------------

export interface SummaryMemberDto {
  memberId: string;
  name: string;
  avatarUrl: string | null;
  status: "ACTIVE" | "LEFT";
  totalMeals: number;
  mealCost: number;
  bazarPaid: number;
  mealBalance: number;
  balanceStatus: BalanceStatus;
}

export interface SummarySettlementDto {
  fromMemberId: string;
  toMemberId: string;
  amount: number;
}

export interface SummaryResponseData {
  month: MealsMonthDto;
  canSettle: boolean;
  totals: {
    totalMeals: number;
    totalBazar: number;
    mealRate: number;
    totalPositiveBalance: number;
  };
  members: SummaryMemberDto[];
  settlement: SummarySettlementDto[];
  isLocked: boolean;
}

/** `GET /summary/export?format=` — API.md §47. */
export type SummaryExportFormat = "csv" | "json";
