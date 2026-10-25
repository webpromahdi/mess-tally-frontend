import { mealFixtures } from "@/fixtures/meal.fixtures";
import { recompute } from "@/lib/bazar";
import type { BazarData, BazarEntry } from "@/lib/types/bazar.types";
import type { MealsGridData } from "@/lib/types/meal.types";

/* Static fixtures shaped like `GET /api/bazar?month=`. Per-payer totals reconcile with Module 04. */

interface Seed {
  date: string;
  memberId: string;
  amount: number;
  note: string;
}

function toEntries(seeds: Seed[], locked: boolean): BazarEntry[] {
  return seeds.map((s, i) => ({
    id: `bz_${s.date}_${i}`,
    ...s,
    receiptUrl: null,
    isLocked: locked,
  }));
}

// Mahdi 6,280 · Rahim 3,500 · Karim 3,000 · Sumon 2,000 = ৳ 14,780
const october = toEntries(
  [
    {
      date: "2026-10-01",
      memberId: "m_sumon",
      amount: 600,
      note: "Milk, bread and eggs",
    },
    {
      date: "2026-10-02",
      memberId: "m_mahdi",
      amount: 1450,
      note: "Rice, lentils and cooking oil",
    },
    {
      date: "2026-10-04",
      memberId: "m_rahim",
      amount: 980,
      note: "Chicken and vegetables",
    },
    {
      date: "2026-10-06",
      memberId: "m_karim",
      amount: 1000,
      note: "Rui fish and spices",
    },
    {
      date: "2026-10-09",
      memberId: "m_mahdi",
      amount: 1230,
      note: "Weekly vegetables, onions",
    },
    {
      date: "2026-10-11",
      memberId: "m_rahim",
      amount: 1120,
      note: "Beef and potatoes",
    },
    {
      date: "2026-10-12",
      memberId: "m_sumon",
      amount: 700,
      note: "Eggs, milk and bananas",
    },
    {
      date: "2026-10-14",
      memberId: "m_karim",
      amount: 850,
      note: "Vegetables and lemons",
    },
    {
      date: "2026-10-16",
      memberId: "m_mahdi",
      amount: 1600,
      note: "Monthly staples (rice, atta)",
    },
    {
      date: "2026-10-19",
      memberId: "m_rahim",
      amount: 700,
      note: "Fish and green chillies",
    },
    {
      date: "2026-10-21",
      memberId: "m_karim",
      amount: 650,
      note: "Vegetables",
    },
    {
      date: "2026-10-24",
      memberId: "m_mahdi",
      amount: 1100,
      note: "Chicken, eggs and tomatoes",
    },
    {
      date: "2026-10-25",
      memberId: "m_sumon",
      amount: 700,
      note: "Bread, milk and tea",
    },
    {
      date: "2026-10-27",
      memberId: "m_rahim",
      amount: 700,
      note: "Hilsa for the weekend",
    },
    {
      date: "2026-10-29",
      memberId: "m_karim",
      amount: 500,
      note: "Vegetables and coriander",
    },
    {
      date: "2026-10-30",
      memberId: "m_mahdi",
      amount: 900,
      note: "Cooking oil and salt",
    },
  ],
  false,
);

// Mahdi 5,900 · Rahim 4,200 · Karim 2,600 · Sumon 1,700 = ৳ 14,400
const september = toEntries(
  [
    {
      date: "2026-09-03",
      memberId: "m_mahdi",
      amount: 1800,
      note: "Monthly staples",
    },
    {
      date: "2026-09-05",
      memberId: "m_rahim",
      amount: 1500,
      note: "Chicken and vegetables",
    },
    {
      date: "2026-09-08",
      memberId: "m_karim",
      amount: 1300,
      note: "Fish and spices",
    },
    {
      date: "2026-09-10",
      memberId: "m_mahdi",
      amount: 1500,
      note: "Beef and potatoes",
    },
    {
      date: "2026-09-12",
      memberId: "m_sumon",
      amount: 900,
      note: "Eggs and milk",
    },
    {
      date: "2026-09-14",
      memberId: "m_rahim",
      amount: 1400,
      note: "Weekly vegetables",
    },
    {
      date: "2026-09-18",
      memberId: "m_mahdi",
      amount: 1400,
      note: "Rice and lentils",
    },
    {
      date: "2026-09-20",
      memberId: "m_karim",
      amount: 1300,
      note: "Fish and vegetables",
    },
    {
      date: "2026-09-22",
      memberId: "m_rahim",
      amount: 1300,
      note: "Chicken and eggs",
    },
    {
      date: "2026-09-26",
      memberId: "m_mahdi",
      amount: 1200,
      note: "Vegetables and oil",
    },
    {
      date: "2026-09-28",
      memberId: "m_sumon",
      amount: 800,
      note: "Milk and bread",
    },
  ],
  true,
);

function scenario(source: MealsGridData, entries: BazarEntry[]): BazarData {
  return recompute({
    viewer: source.viewer,
    mess: source.mess,
    month: source.month,
    today: source.today,
    members: source.members,
    entries,
    totalBazar: 0,
    houseMeals: source.houseTotal,
    mealRate: 0,
    pendingCount: source.pendingCount,
  });
}

export const bazarFixtures = {
  manager: scenario(mealFixtures.manager, october),
  member: scenario(mealFixtures.member, october),
  closed: scenario(mealFixtures.closed, september),
  closedMember: scenario(mealFixtures.closedMember, september),
  empty: scenario(mealFixtures.empty, []),
  noMonthManager: scenario(mealFixtures.noMonthManager, []),
  noMonthMember: scenario(mealFixtures.noMonthMember, []),
} satisfies Record<string, BazarData>;
