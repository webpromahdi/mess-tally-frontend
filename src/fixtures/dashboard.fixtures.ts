import type {
  DashboardData,
  FundBlock,
  MealBlock,
  MessInfo,
  MonthInfo,
  Viewer,
} from "@/lib/types/dashboard.types";

const mess: MessInfo = {
  id: "mess_mahdis_flat",
  name: "Mahdi's Flat",
  roomCode: "MX7K4Q",
  plan: "FREE",
  managerFirstName: "Mahdi",
  activeMembers: ["Mahdi Hasan", "Rahim Uddin", "Karim Ahmed", "Sumon Das"],
};

const managerViewer: Viewer = {
  memberId: "m_mahdi",
  name: "Mahdi Hasan",
  firstName: "Mahdi",
  role: "OWNER",
  isManager: true,
};

const memberViewer: Viewer = {
  memberId: "m_karim",
  name: "Karim Ahmed",
  firstName: "Karim",
  role: "MEMBER",
  isManager: false,
};

const octoberMonth: MonthInfo = {
  key: "2026-10",
  label: "Oct 2026",
  longLabel: "October 2026",
  status: "ACTIVE",
};

const septemberMonth: MonthInfo = {
  key: "2026-09",
  label: "Sep 2026",
  longLabel: "September 2026",
  status: "CLOSED",
  closedOn: "1 Oct 2026",
};

const octoberMealBlock: MealBlock = {
  totalMeals: 342,
  totalGuestMeals: 6,
  totalBazar: 14780,
  mealRate: 14780 / 342,
  members: [
    {
      id: "m_mahdi",
      name: "Mahdi Hasan",
      meals: 71,
      guestMeals: 2,
      bazarPaid: 6280,
      mealCost: 71 * (14780 / 342),
      balance: 6280 - 71 * (14780 / 342), // +3211.64
    },
    {
      id: "m_rahim",
      name: "Rahim Uddin",
      meals: 89,
      guestMeals: 3,
      bazarPaid: 3500,
      mealCost: 89 * (14780 / 342),
      balance: 3500 - 89 * (14780 / 342), // -346.26
    },
    {
      id: "m_karim",
      name: "Karim Ahmed",
      meals: 92,
      guestMeals: 0,
      bazarPaid: 3000,
      mealCost: 92 * (14780 / 342),
      balance: 3000 - 92 * (14780 / 342), // -975.91
    },
    {
      id: "m_sumon",
      name: "Sumon Das",
      meals: 90,
      guestMeals: 1,
      bazarPaid: 2000,
      mealCost: 90 * (14780 / 342),
      balance: 2000 - 90 * (14780 / 342), // -1889.47
    },
  ],
};

const septemberMealBlock: MealBlock = {
  totalMeals: 328,
  totalGuestMeals: 3,
  totalBazar: 14400,
  mealRate: 14400 / 328,
  members: [
    {
      id: "m_mahdi",
      name: "Mahdi Hasan",
      meals: 76,
      guestMeals: 1,
      bazarPaid: 5900,
      mealCost: 76 * (14400 / 328),
      balance: 5900 - 76 * (14400 / 328), // +2563.41
    },
    {
      id: "m_rahim",
      name: "Rahim Uddin",
      meals: 84,
      guestMeals: 2,
      bazarPaid: 4200,
      mealCost: 84 * (14400 / 328),
      balance: 4200 - 84 * (14400 / 328), // +512.20
    },
    {
      id: "m_karim",
      name: "Karim Ahmed",
      meals: 88,
      guestMeals: 0,
      bazarPaid: 2600,
      mealCost: 88 * (14400 / 328),
      balance: 2600 - 88 * (14400 / 328), // -1263.41
    },
    {
      id: "m_sumon",
      name: "Sumon Das",
      meals: 80,
      guestMeals: 0,
      bazarPaid: 1700,
      mealCost: 80 * (14400 / 328),
      balance: 1700 - 80 * (14400 / 328), // -1812.20
    },
  ],
};

const emptyMealBlock: MealBlock = {
  totalMeals: 0,
  totalGuestMeals: 0,
  totalBazar: 0,
  mealRate: 0,
  members: [
    {
      id: "m_mahdi",
      name: "Mahdi Hasan",
      meals: 0,
      guestMeals: 0,
      bazarPaid: 0,
      mealCost: 0,
      balance: 0,
    },
    {
      id: "m_rahim",
      name: "Rahim Uddin",
      meals: 0,
      guestMeals: 0,
      bazarPaid: 0,
      mealCost: 0,
      balance: 0,
    },
    {
      id: "m_karim",
      name: "Karim Ahmed",
      meals: 0,
      guestMeals: 0,
      bazarPaid: 0,
      mealCost: 0,
      balance: 0,
    },
    {
      id: "m_sumon",
      name: "Sumon Das",
      meals: 0,
      guestMeals: 0,
      bazarPaid: 0,
      mealCost: 0,
      balance: 0,
    },
  ],
};

const activeFund: FundBlock = {
  totalDeposits: 8000,
  totalPaidBills: 3450,
  balance: 4550,
  needsReplenishment: false,
};

const closedFund: FundBlock = {
  totalDeposits: 8000,
  totalPaidBills: 7350,
  balance: 650,
  needsReplenishment: false,
};

const replenishFund: FundBlock = {
  totalDeposits: 8000,
  totalPaidBills: 8620,
  balance: -620,
  needsReplenishment: true,
};

const emptyFund: FundBlock = {
  totalDeposits: 6000,
  totalPaidBills: 0,
  balance: 6000,
  needsReplenishment: false,
};

export const dashboardFixtures: Record<string, DashboardData> = {
  manager: {
    viewer: managerViewer,
    mess,
    month: octoberMonth,
    meal: octoberMealBlock,
    fund: activeFund,
    myBalance: octoberMealBlock.members[0].balance,
    pendingCount: 2,
  },
  member: {
    viewer: memberViewer,
    mess,
    month: octoberMonth,
    meal: octoberMealBlock,
    fund: activeFund,
    myBalance: octoberMealBlock.members[2].balance,
    pendingCount: null,
  },
  closed: {
    viewer: managerViewer,
    mess,
    month: septemberMonth,
    meal: septemberMealBlock,
    fund: closedFund,
    myBalance: septemberMealBlock.members[0].balance,
    pendingCount: 0,
  },
  replenish: {
    viewer: managerViewer,
    mess,
    month: octoberMonth,
    meal: octoberMealBlock,
    fund: replenishFund,
    myBalance: octoberMealBlock.members[0].balance,
    pendingCount: 0,
  },
  empty: {
    viewer: managerViewer,
    mess,
    month: octoberMonth,
    meal: emptyMealBlock,
    fund: emptyFund,
    myBalance: 0,
    pendingCount: 0,
  },
  noMonthManager: {
    viewer: managerViewer,
    mess,
    month: null,
    meal: null,
    fund: null,
    myBalance: null,
    pendingCount: 1,
  },
  noMonthMember: {
    viewer: memberViewer,
    mess,
    month: null,
    meal: null,
    fund: null,
    myBalance: null,
    pendingCount: null,
  },
};
