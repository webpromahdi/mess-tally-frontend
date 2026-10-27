import { monthLabel } from "@/lib/dates";
import type {
  DashboardResponseData,
  MealEntry,
  MealsGridData,
  MealsMonth,
  MealsResponseData,
  MessInfo,
  MessMemberDto,
  Viewer,
} from "@/lib/types";

/**
 * Pure mapper between the meals API contract (API.md §24) and the
 * `MealsGridData` view model the designed components consume.
 */

export interface MealsMappingInput {
  viewer: Viewer;
  mess: MessInfo;
  /** `/dashboard` supplies the totals and role-gated pending count. */
  dashboard: DashboardResponseData;
  /** `GET /mess/members` supplies membership roles for the grid rows. */
  members: MessMemberDto[];
  meals: MealsResponseData;
  /** Local `YYYY-MM-DD`; kept as an input so the mapping stays deterministic. */
  today: string;
}

export function toMealsGridData({
  viewer,
  mess,
  dashboard,
  members,
  meals,
  today,
}: MealsMappingInput): MealsGridData {
  const roles = new Map(members.map((member) => [member.id, member.role]));

  const { month: monthDto } = meals;
  // A row-less month reports `exists: false` and `status: null`; treat both as
  // "no month" so the UI shows the open-a-month state instead of a fake one.
  const month: MealsMonth | null =
    monthDto.exists && monthDto.status !== null
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

  const entries: MealEntry[] = meals.members.flatMap((member) =>
    member.days.flatMap((day) =>
      day.entryId
        ? [
            {
              id: day.entryId,
              memberId: member.memberId,
              date: day.date,
              breakfast: day.breakfast,
              lunch: day.lunch,
              dinner: day.dinner,
              guestMeals: day.guestMeals,
              isLocked: day.isLocked,
            },
          ]
        : [],
    ),
  );

  return {
    viewer,
    mess: {
      name: mess.name,
      plan: mess.plan ?? "FREE",
      managerFirstName: mess.managerFirstName,
    },
    month,
    today,
    members: meals.members.map((member) => ({
      id: member.memberId,
      name: member.name,
      role: roles.get(member.memberId) ?? "MEMBER",
      status: member.status === "LEFT" ? "LEFT" : "ACTIVE",
      totalMeals: member.totals.total,
    })),
    entries,
    houseTotal: meals.houseTotals.total,
    totalBazar: dashboard.meal.totalBazar,
    mealRate: dashboard.meal.mealRate,
    pendingCount: dashboard.pendingMemberCount,
  };
}
