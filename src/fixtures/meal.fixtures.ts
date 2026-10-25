import { toIso } from "@/lib/dates";
import type {
  MealEntry,
  MealsGridData,
  MealsMember,
  MealsMess,
  MealsMonth,
  MealsViewer,
} from "@/lib/types/meal.types";

const mess: MealsMess = {
  name: "Mahdi's Flat",
  plan: "FREE",
  managerFirstName: "Mahdi",
};

const manager: MealsViewer = {
  memberId: "m_mahdi",
  name: "Mahdi Hasan",
  firstName: "Mahdi",
  role: "OWNER",
  isManager: true,
};

const member: MealsViewer = {
  memberId: "m_karim",
  name: "Karim Ahmed",
  firstName: "Karim",
  role: "MEMBER",
  isManager: false,
};

const roster: MealsMember[] = [
  {
    id: "m_mahdi",
    name: "Mahdi Hasan",
    role: "OWNER",
    status: "ACTIVE",
    totalMeals: 0,
  },
  {
    id: "m_rahim",
    name: "Rahim Uddin",
    role: "MEMBER",
    status: "ACTIVE",
    totalMeals: 0,
  },
  {
    id: "m_karim",
    name: "Karim Ahmed",
    role: "MEMBER",
    status: "ACTIVE",
    totalMeals: 0,
  },
  {
    id: "m_sumon",
    name: "Sumon Das",
    role: "MEMBER",
    status: "ACTIVE",
    totalMeals: 0,
  },
];

const october: MealsMonth = {
  key: "2026-10",
  label: "Oct 2026",
  longLabel: "October 2026",
  status: "ACTIVE",
  startDate: "2026-10-01",
  endDate: "2026-10-31",
  isLocked: false,
};

const september: MealsMonth = {
  key: "2026-09",
  label: "Sep 2026",
  longLabel: "September 2026",
  status: "CLOSED",
  startDate: "2026-09-01",
  endDate: "2026-09-30",
  isLocked: true,
};

const november: MealsMonth = {
  key: "2026-11",
  label: "Nov 2026",
  longLabel: "November 2026",
  status: "ACTIVE",
  startDate: "2026-11-01",
  endDate: "2026-11-30",
  isLocked: false,
};

interface GuestDay {
  day: number;
  count: number;
}

interface MemberPlan {
  memberId: string;
  regular: number;
  guests: GuestDay[];
  step: number;
  start: number;
}

function cellTotal(
  e: Pick<MealEntry, "breakfast" | "lunch" | "dinner" | "guestMeals">,
) {
  return e.breakfast + e.lunch + e.dinner + e.guestMeals;
}

function buildEntries(
  year: number,
  month: number,
  days: number,
  plans: MemberPlan[],
  locked: boolean,
): MealEntry[] {
  const slots = days * 3;
  const entries: MealEntry[] = [];
  for (const plan of plans) {
    const skipped = new Set<number>();
    for (let k = 0; k < slots - plan.regular; k++) {
      skipped.add((plan.start + k * plan.step) % slots);
    }
    for (let d = 0; d < days; d++) {
      const has = (s: number) => (skipped.has(d * 3 + s) ? 0 : 1);
      const guestMeals = plan.guests.find((g) => g.day === d + 1)?.count ?? 0;
      const breakfast = has(0);
      const lunch = has(1);
      const dinner = has(2);
      if (breakfast + lunch + dinner + guestMeals === 0) continue;
      const date = toIso(year, month, d + 1);
      entries.push({
        id: `me_${plan.memberId}_${date}`,
        memberId: plan.memberId,
        date,
        breakfast,
        lunch,
        dinner,
        guestMeals,
        isLocked: locked,
      });
    }
  }
  return entries;
}

const octoberEntries = buildEntries(
  2026,
  10,
  31,
  [
    {
      memberId: "m_mahdi",
      regular: 69,
      guests: [
        { day: 9, count: 1 },
        { day: 23, count: 1 },
      ],
      step: 7,
      start: 5,
    },
    {
      memberId: "m_rahim",
      regular: 86,
      guests: [
        { day: 7, count: 1 },
        { day: 14, count: 1 },
        { day: 22, count: 1 },
      ],
      step: 10,
      start: 17,
    },
    { memberId: "m_karim", regular: 92, guests: [], step: 11, start: 40 },
    {
      memberId: "m_sumon",
      regular: 89,
      guests: [{ day: 16, count: 1 }],
      step: 13,
      start: 29,
    },
  ],
  false,
);

const septemberEntries = buildEntries(
  2026,
  9,
  30,
  [
    {
      memberId: "m_mahdi",
      regular: 75,
      guests: [{ day: 12, count: 1 }],
      step: 7,
      start: 11,
    },
    {
      memberId: "m_rahim",
      regular: 82,
      guests: [
        { day: 5, count: 1 },
        { day: 19, count: 1 },
      ],
      step: 11,
      start: 3,
    },
    { memberId: "m_karim", regular: 88, guests: [], step: 7, start: 50 },
    { memberId: "m_sumon", regular: 80, guests: [], step: 13, start: 21 },
  ],
  true,
);

function recompute(data: MealsGridData): MealsGridData {
  const byMember = new Map<string, number>();
  for (const e of data.entries) {
    byMember.set(e.memberId, (byMember.get(e.memberId) ?? 0) + cellTotal(e));
  }
  const members = data.members.map((m) => ({
    ...m,
    totalMeals: byMember.get(m.id) ?? 0,
  }));
  const houseTotal = members.reduce((sum, m) => sum + m.totalMeals, 0);
  return {
    ...data,
    members,
    houseTotal,
    mealRate: houseTotal > 0 ? data.totalBazar / houseTotal : 0,
  };
}

function scenario(
  viewer: MealsViewer,
  month: MealsMonth | null,
  entries: MealEntry[],
  totalBazar: number,
  today: string,
  pendingCount = 2,
): MealsGridData {
  return recompute({
    viewer,
    mess,
    month,
    today,
    members: roster,
    entries,
    houseTotal: 0,
    totalBazar,
    mealRate: 0,
    pendingCount: viewer.isManager ? pendingCount : null,
  });
}

export const mealFixtures = {
  manager: scenario(manager, october, octoberEntries, 14780, "2026-10-31"),
  member: scenario(member, october, octoberEntries, 14780, "2026-10-31"),
  closed: scenario(
    manager,
    september,
    septemberEntries,
    14400,
    "2026-10-31",
    0,
  ),
  closedMember: scenario(
    member,
    september,
    septemberEntries,
    14400,
    "2026-10-31",
  ),
  empty: scenario(manager, november, [], 0, "2026-11-03", 0),
  emptyMember: scenario(member, november, [], 0, "2026-11-03"),
  noMonthManager: scenario(manager, null, [], 0, "2026-11-03", 1),
  noMonthMember: scenario(member, null, [], 0, "2026-11-03"),
} satisfies Record<string, MealsGridData>;
