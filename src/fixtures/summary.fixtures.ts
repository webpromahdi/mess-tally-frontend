import { dashboardFixtures } from "@/fixtures/dashboard.fixtures";
import { utilityFixtures } from "@/fixtures/utility.fixtures";
import { buildMealBlock, settlementTransfers } from "@/lib/summary";
import type {
  MemberLedgerInput,
  MessInfo,
  MonthInfo,
  Viewer,
} from "@/lib/types/dashboard.types";
import type { SummaryData, SummaryDepositRow } from "@/lib/types/summary.types";
import { buildFundBlock, depositedBy } from "@/lib/utility";

/* Static fixtures shaped like `GET /api/v1/summary?month=`. Meal numbers reconcile with Dashboard, fund numbers with Utility. */

const mess: MessInfo = dashboardFixtures.manager.mess;
const manager: Viewer = dashboardFixtures.manager.viewer;
const member: Viewer = dashboardFixtures.member.viewer;
const october: MonthInfo = dashboardFixtures.manager.month as MonthInfo;
const september: MonthInfo = dashboardFixtures.closed.month as MonthInfo;

const octoberLedger: MemberLedgerInput[] = (
  dashboardFixtures.manager.meal?.members ?? []
).map((m) => ({
  id: m.id,
  name: m.name,
  meals: m.meals,
  guestMeals: m.guestMeals,
  bazarPaid: m.bazarPaid,
}));

const septemberLedger: MemberLedgerInput[] = (
  dashboardFixtures.closed.meal?.members ?? []
).map((m) => ({
  id: m.id,
  name: m.name,
  meals: m.meals,
  guestMeals: m.guestMeals,
  bazarPaid: m.bazarPaid,
}));

// Everyone paid exactly meals × ৳ 40 → rate ৳ 40, all balances 0.
const squareLedger: MemberLedgerInput[] = octoberLedger.map((m) => ({
  ...m,
  bazarPaid: m.meals * 40,
}));

const zeroLedger: MemberLedgerInput[] = octoberLedger.map((m) => ({
  ...m,
  meals: 0,
  guestMeals: 0,
  bazarPaid: 0,
}));

function deposits(source: typeof utilityFixtures.manager): SummaryDepositRow[] {
  return source.members
    .filter((m) => m.status === "ACTIVE")
    .map((m) => ({
      memberId: m.id,
      name: m.name,
      amount: depositedBy(source.entries, m.id),
    }));
}

function scenario(
  viewer: Viewer,
  month: MonthInfo | null,
  ledger: MemberLedgerInput[] | null,
  fundSource: typeof utilityFixtures.manager | null,
  pendingCount = 2,
): SummaryData {
  const meal = ledger ? buildMealBlock(ledger) : null;
  return {
    viewer,
    mess,
    month,
    meal,
    fund: fundSource
      ? buildFundBlock(fundSource.totalDeposits, fundSource.totalPaidBills)
      : null,
    depositsByMember: fundSource ? deposits(fundSource) : [],
    transfers: meal ? settlementTransfers(meal.members) : [],
    isFinal: month?.status === "CLOSED",
    pendingCount: viewer.isManager ? pendingCount : null,
  };
}

export const summaryFixtures = {
  manager: scenario(manager, october, octoberLedger, utilityFixtures.manager),
  member: scenario(member, october, octoberLedger, utilityFixtures.member),
  closed: scenario(
    manager,
    september,
    septemberLedger,
    utilityFixtures.closed,
    0,
  ),
  closedMember: scenario(
    member,
    september,
    septemberLedger,
    utilityFixtures.closedMember,
    0,
  ),
  zeroMeals: scenario(manager, october, zeroLedger, utilityFixtures.empty, 0),
  allSettled: scenario(
    manager,
    october,
    squareLedger,
    utilityFixtures.manager,
    0,
  ),
  replenish: scenario(
    manager,
    october,
    octoberLedger,
    utilityFixtures.replenish,
    0,
  ),
  noMonthManager: scenario(manager, null, null, null, 1),
  noMonthMember: scenario(member, null, null, null),
} satisfies Record<string, SummaryData>;
