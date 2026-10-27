import { monthLabel } from "@/lib/dates";
import type {
  BazarData,
  BazarEntry,
  BazarListResponseData,
  BazarMember,
  BazarMonth,
  DashboardResponseData,
  MessInfo,
  MessMemberDto,
  Viewer,
} from "@/lib/types";

/**
 * Pure mapper between the bazar API contract (API.md §29) and the `BazarData`
 * view model the designed components consume.
 */

export interface BazarMappingInput {
  viewer: Viewer;
  mess: MessInfo;
  /** `/dashboard` supplies the meal total, meal rate and pending count. */
  dashboard: DashboardResponseData;
  /** `GET /mess/members?status=ACTIVE` — the selectable shoppers. */
  members: MessMemberDto[];
  bazar: BazarListResponseData;
  /** Local `YYYY-MM-DD`; kept as an input so the mapping stays deterministic. */
  today: string;
}

export function toBazarData({
  viewer,
  mess,
  dashboard,
  members,
  bazar,
  today,
}: BazarMappingInput): BazarData {
  const { month: monthDto } = bazar;

  // A row-less month reports `exists: false` with a null id/status; treat it as
  // "no month" so the UI offers "Open a month" instead of a fake ACTIVE month.
  const month: BazarMonth | null =
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

  const entries: BazarEntry[] = bazar.entries.map((entry) => ({
    id: entry.id,
    memberId: entry.shopperId,
    date: entry.bazarDate,
    amount: entry.amount,
    // The designed form has one free-text field; the API splits it into
    // `title` (<= 120 chars) and `items`. The title is the short label shown
    // in the Note column, so it is the closest match.
    note: entry.title || entry.items || "",
    receiptUrl: entry.receiptUrl,
    isLocked: monthDto.status === "CLOSED",
  }));

  // Active roster, plus anyone who shopped this month so a member who has
  // since left still resolves to a name instead of "Former member".
  const roster: BazarMember[] = members
    .filter((member) => member.status === "ACTIVE")
    .map((member) => ({
      id: member.id,
      name: member.name,
      role: member.role,
      status: "ACTIVE",
      totalMeals: 0,
    }));

  const known = new Set(roster.map((member) => member.id));
  for (const entry of bazar.entries) {
    if (known.has(entry.shopperId)) continue;
    known.add(entry.shopperId);
    roster.push({
      id: entry.shopperId,
      name: entry.shopperName,
      role: "MEMBER",
      status: "LEFT",
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
    totalBazar: bazar.totals.houseTotal,
    houseMeals: dashboard.meal.totalMeals,
    mealRate: dashboard.meal.mealRate,
    pendingCount: dashboard.pendingMemberCount,
  };
}
