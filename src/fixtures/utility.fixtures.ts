import { mealFixtures } from "@/fixtures/meal.fixtures";
import type { MealsGridData } from "@/lib/types/meal.types";
import type {
  UtilityCategory,
  UtilityData,
  UtilityEntry,
  UtilityKind,
} from "@/lib/types/utility.types";
import { recompute } from "@/lib/utility";

/* Static fixtures shaped like `GET /api/utility?month=`. Totals reconcile with the Dashboard fund card. */

interface Seed {
  kind: UtilityKind;
  date: string;
  memberId?: string;
  category?: UtilityCategory;
  amount: number;
  note: string;
}

function toEntries(seeds: Seed[], locked: boolean): UtilityEntry[] {
  return seeds.map((s, i) => ({
    id: `ut_${s.date}_${i}`,
    kind: s.kind,
    memberId: s.memberId ?? null,
    category: s.category ?? null,
    date: s.date,
    amount: s.amount,
    note: s.note,
    receiptUrl: null,
    isLocked: locked,
  }));
}

function deposits(month: string): Seed[] {
  return [
    {
      kind: "DEPOSIT",
      date: `${month}-02`,
      memberId: "m_mahdi",
      amount: 2000,
      note: "Monthly fund",
    },
    {
      kind: "DEPOSIT",
      date: `${month}-03`,
      memberId: "m_rahim",
      amount: 2000,
      note: "Monthly fund",
    },
    {
      kind: "DEPOSIT",
      date: `${month}-03`,
      memberId: "m_karim",
      amount: 2000,
      note: "Monthly fund",
    },
    {
      kind: "DEPOSIT",
      date: `${month}-04`,
      memberId: "m_sumon",
      amount: 2000,
      note: "Monthly fund",
    },
  ];
}

// Deposits 8,000 · Bills 3,450 · Balance 4,550
const october = toEntries(
  [
    ...deposits("2026-10"),
    {
      kind: "BILL",
      date: "2026-10-06",
      category: "Electricity",
      amount: 1650,
      note: "DESCO bill, September",
    },
    {
      kind: "BILL",
      date: "2026-10-08",
      category: "Internet",
      amount: 800,
      note: "Broadband, monthly",
    },
    {
      kind: "BILL",
      date: "2026-10-12",
      category: "Gas",
      amount: 700,
      note: "Cylinder refill",
    },
    {
      kind: "BILL",
      date: "2026-10-15",
      category: "Maid",
      amount: 300,
      note: "Extra cleaning",
    },
  ],
  false,
);

// Deposits 8,000 · Bills 8,620 · Balance −620
const overdrawn = toEntries(
  [
    ...deposits("2026-10"),
    {
      kind: "BILL",
      date: "2026-10-06",
      category: "Electricity",
      amount: 3200,
      note: "DESCO bill, September",
    },
    {
      kind: "BILL",
      date: "2026-10-08",
      category: "Internet",
      amount: 800,
      note: "Broadband, monthly",
    },
    {
      kind: "BILL",
      date: "2026-10-12",
      category: "Gas",
      amount: 1700,
      note: "Two cylinders",
    },
    {
      kind: "BILL",
      date: "2026-10-15",
      category: "Maid",
      amount: 2400,
      note: "Monthly salary",
    },
    {
      kind: "BILL",
      date: "2026-10-20",
      category: "Water",
      amount: 520,
      note: "WASA bill",
    },
  ],
  false,
);

// Deposits 8,000 · Bills 7,350 · Balance 650
const september = toEntries(
  [
    ...deposits("2026-09"),
    {
      kind: "BILL",
      date: "2026-09-06",
      category: "Electricity",
      amount: 2800,
      note: "DESCO bill, August",
    },
    {
      kind: "BILL",
      date: "2026-09-08",
      category: "Internet",
      amount: 800,
      note: "Broadband, monthly",
    },
    {
      kind: "BILL",
      date: "2026-09-12",
      category: "Gas",
      amount: 1450,
      note: "Cylinder refill",
    },
    {
      kind: "BILL",
      date: "2026-09-15",
      category: "Maid",
      amount: 1800,
      note: "Monthly salary",
    },
    {
      kind: "BILL",
      date: "2026-09-21",
      category: "Water",
      amount: 500,
      note: "WASA bill",
    },
  ],
  true,
);

function scenario(source: MealsGridData, entries: UtilityEntry[]): UtilityData {
  return recompute({
    viewer: source.viewer,
    mess: source.mess,
    month: source.month,
    today: source.today,
    members: source.members,
    entries,
    pendingCount: source.pendingCount,
    totalDeposits: 0,
    totalPaidBills: 0,
    balance: 0,
    needsReplenishment: false,
  });
}

export const utilityFixtures = {
  manager: scenario(mealFixtures.manager, october),
  member: scenario(mealFixtures.member, october),
  replenish: scenario(mealFixtures.manager, overdrawn),
  closed: scenario(mealFixtures.closed, september),
  closedMember: scenario(mealFixtures.closedMember, september),
  empty: scenario(mealFixtures.empty, []),
  noMonthManager: scenario(mealFixtures.noMonthManager, []),
  noMonthMember: scenario(mealFixtures.noMonthMember, []),
} satisfies Record<string, UtilityData>;
