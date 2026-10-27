import { monthLabel } from "@/lib/dates";
import type {
  DashboardResponseData,
  FundDepositsResponseData,
  MessInfo,
  MessMemberDto,
  UtilityBillCategory,
  UtilityBillsResponseData,
  UtilityCategory,
  UtilityData,
  UtilityEntry,
  UtilityFundResponseData,
  UtilityMember,
  UtilityMonth,
  Viewer,
} from "@/lib/types";

/**
 * Pure mapper between the utilities API contract (API.md §35–45) and the
 * `UtilityData` view model the designed components consume.
 *
 * The API keeps bills and fund deposits in two ledgers; the design shows one
 * merged ledger, so both are mapped into `UtilityEntry`.
 */

const CATEGORY_LABELS: Record<UtilityBillCategory, UtilityCategory> = {
  RENT: "Rent",
  ELECTRICITY: "Electricity",
  GAS: "Gas",
  WATER: "Water",
  WIFI: "Internet",
  COOK_SALARY: "Cook salary",
  GARBAGE_GUARD: "Garbage / guard",
  SUBSCRIPTION: "Subscription",
  OTHER: "Other",
};

const CATEGORY_VALUES = Object.fromEntries(
  Object.entries(CATEGORY_LABELS).map(([api, label]) => [label, api]),
) as Record<UtilityCategory, UtilityBillCategory>;

export function fromUtilityCategory(
  category: UtilityBillCategory,
): UtilityCategory {
  return CATEGORY_LABELS[category] ?? "Other";
}

export function toUtilityCategory(
  category: UtilityCategory | null,
): UtilityBillCategory {
  return category ? (CATEGORY_VALUES[category] ?? "OTHER") : "OTHER";
}

export interface UtilityMappingInput {
  viewer: Viewer;
  mess: MessInfo;
  /** `/dashboard` supplies the role-gated pending count. */
  dashboard: DashboardResponseData;
  /** `GET /mess/members?status=ACTIVE` — the depositor roster. */
  members: MessMemberDto[];
  bills: UtilityBillsResponseData;
  fund: UtilityFundResponseData;
  deposits: FundDepositsResponseData;
  /** Local `YYYY-MM-DD`; kept as an input so the mapping stays deterministic. */
  today: string;
}

export function toUtilityData({
  viewer,
  mess,
  dashboard,
  members,
  bills,
  fund,
  deposits,
  today,
}: UtilityMappingInput): UtilityData {
  const monthDto = fund.month;
  const month: UtilityMonth | null =
    monthDto.exists && monthDto.status
      ? {
          key: monthDto.name,
          label: monthLabel(monthDto.name),
          longLabel: monthLabel(monthDto.name, true),
          status: monthDto.status,
          startDate: monthDto.startDate,
          endDate: monthDto.endDate,
          isLocked: monthDto.status === "CLOSED",
        }
      : null;

  const entries: UtilityEntry[] = [
    ...bills.bills.map<UtilityEntry>((bill) => ({
      id: bill.id,
      kind: "BILL",
      memberId: null,
      category: fromUtilityCategory(bill.category),
      // Bills have no natural date; the form's date maps to `dueDate`, and
      // bills created elsewhere fall back to the creation day.
      date: bill.dueDate ?? bill.createdAt.slice(0, 10),
      amount: bill.amount,
      // The design's Note field maps to the required API `title` (both 120).
      note: bill.title,
      isPaid: bill.isPaid,
      receiptUrl: null,
      isLocked: fund.month.status === "CLOSED",
    })),
    ...deposits.deposits.map<UtilityEntry>((deposit) => ({
      id: deposit.id,
      kind: "DEPOSIT",
      memberId: deposit.memberId,
      category: null,
      date: deposit.date,
      amount: deposit.amount,
      note: deposit.note ?? "",
      isPaid: true,
      receiptUrl: null,
      isLocked: fund.month.status === "CLOSED",
    })),
  ];

  const roster: UtilityMember[] = members
    .filter((member) => member.status === "ACTIVE")
    .map((member) => ({
      id: member.id,
      name: member.name,
      role: member.role,
      status: "ACTIVE",
      totalMeals: 0,
    }));

  // Keep a name for depositors who have since left the mess.
  const known = new Set(roster.map((member) => member.id));
  for (const deposit of deposits.deposits) {
    if (known.has(deposit.memberId)) continue;
    known.add(deposit.memberId);
    roster.push({
      id: deposit.memberId,
      name: deposit.memberName,
      role: "MEMBER",
      status: deposit.memberStatus === "ACTIVE" ? "ACTIVE" : "LEFT",
      totalMeals: 0,
    });
  }

  return {
    viewer,
    mess: {
      name: mess.name,
      plan: mess.plan ?? "FREE",
      managerFirstName: mess.managerFirstName,
    },
    month,
    today,
    members: roster,
    entries,
    totalDeposits: fund.totalDeposits,
    totalPaidBills: fund.totalPaidBills,
    balance: fund.balance,
    needsReplenishment: fund.needsReplenishment,
    pendingCount: dashboard.pendingMemberCount,
  };
}
