/**
 * Dashboard view model plus the raw `GET /api/v1/dashboard?month=` contract.
 * UI components consume `DashboardData`; API functions return `DashboardResponseData`.
 */
export type Role = "OWNER" | "MEMBER";
export type MonthStatus = "ACTIVE" | "CLOSED";
export type Plan = "FREE" | "PRO";
export type BalanceStatus = "RECEIVER" | "GIVER" | "SETTLED";

export interface Viewer {
  memberId: string;
  name: string;
  firstName: string;
  role: Role;
  isManager: boolean;
}

export interface MessInfo {
  id: string;
  name: string;
  roomCode: string;
  /** `null` while `GET /subscription` is still loading or failed. */
  plan: Plan | null;
  managerFirstName: string;
  /** ACTIVE members only; PENDING/REJECTED are excluded (PRD 1.5). */
  activeMembers: string[];
}

export interface MonthInfo {
  key: string;
  /** e.g. "Oct 2026" */
  label: string;
  /** e.g. "October 2026" */
  longLabel: string;
  status: MonthStatus;
  closedOn?: string;
}

export interface MemberLedgerInput {
  id: string;
  name: string;
  /** Total meals including guest meals (F1). */
  meals: number;
  /** Subset of `meals` that were guest meals. Not exposed by `GET /summary` yet. */
  guestMeals?: number;
  bazarPaid: number;
}

export interface MemberRow extends MemberLedgerInput {
  /** F5: bazarPaid − mealCost. Positive = Receiver, negative = Giver. */
  mealCost: number;
  balance: number;
}

/** Summary meal block (F1–F5). Never contains utility numbers. */
export interface MealBlock {
  totalMeals: number;
  /** Not exposed by `GET /summary`/`GET /dashboard` yet; omit rather than guess. */
  totalGuestMeals?: number;
  totalBazar: number;
  mealRate: number;
  members: MemberRow[];
}

/** Utility Fund block (U1–U3). Kept separate from meal accounting. */
export interface FundBlock {
  totalDeposits: number;
  totalPaidBills: number;
  balance: number;
  needsReplenishment: boolean;
}

export interface DashboardData {
  viewer: Viewer;
  mess: MessInfo;
  /** `null` = the mess has no active month. */
  month: MonthInfo | null;
  meal: MealBlock | null;
  fund: FundBlock | null;
  /** Caller's own meal balance (F5). */
  myBalance: number | null;
  /** Manager-only; `null` for members. */
  pendingCount: number | null;
}

/** Blocks that can fail independently (inline error state). */
export type DashboardBlock = "kpis" | "fund" | "memberBalances" | "bazarShare";

// ---------------------------------------------------------------------------
// Raw API contract — GET /api/v1/dashboard?month=YYYY-MM (API.md §49)
// ---------------------------------------------------------------------------

export interface DashboardMonthDto {
  id: string;
  /** `YYYY-MM`, e.g. "2026-10". */
  name: string;
  startDate: string;
  endDate: string;
  status: MonthStatus;
  /** `false` when no month row exists yet. Reads never create one. */
  exists: boolean;
}

export interface DashboardMealMeDto {
  memberId: string;
  totalMeals: number;
  mealCost: number;
  bazarPaid: number;
  mealBalance: number;
  balanceStatus: BalanceStatus;
}

export interface DashboardResponseData {
  month: DashboardMonthDto;
  meal: {
    totalMeals: number;
    totalBazar: number;
    mealRate: number;
    me: DashboardMealMeDto;
  };
  utility: FundBlock;
  /** Number for managers, `null` for other members. */
  pendingMemberCount: number | null;
}
