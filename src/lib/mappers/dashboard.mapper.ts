import { formatDate, monthLabel } from "@/lib/dates";
import type {
  AuthMeResponseData,
  DashboardData,
  DashboardResponseData,
  MealBlock,
  MessInfo,
  MessMemberDto,
  MessMembershipDto,
  MonthInfo,
  MonthsResponseData,
  MyMessesResponseData,
  SubscriptionResponseData,
  SummaryResponseData,
  Viewer,
} from "@/lib/types";

/**
 * Pure mappers between API DTOs and the dashboard view model.
 * Keeping this out of hooks/components makes the contract gaps explicit.
 */

export function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || name;
}

/** Explicit role subtitle for the shell and dashboard header. */
export function viewerRoleLabel(viewer: Pick<Viewer, "role" | "isManager">) {
  if (viewer.role === "OWNER") {
    return viewer.isManager ? "Owner · Manager" : "Owner";
  }
  return viewer.isManager ? "Member · Manager" : "Member";
}

export function getActiveMembership(
  myMesses: MyMessesResponseData | undefined | null,
): MessMembershipDto | null {
  if (!myMesses) return null;
  return (
    myMesses.messes.find((m) => m.isActive && m.status === "ACTIVE") ??
    myMesses.messes.find(
      (m) => m.mess.id === myMesses.activeMessId && m.status === "ACTIVE",
    ) ??
    null
  );
}

export function toViewer(
  user: AuthMeResponseData,
  membership: MessMembershipDto,
): Viewer {
  return {
    memberId: membership.membershipId,
    name: user.name,
    firstName: firstName(user.name),
    role: membership.role,
    isManager: membership.isManager,
  };
}

export function toMess(
  membership: MessMembershipDto,
  subscription: SubscriptionResponseData | null,
  members: MessMemberDto[],
  viewerName: string,
): MessInfo {
  const active = members.filter((m) => m.status === "ACTIVE");
  const manager = members.find((m) => m.isManager);
  return {
    id: membership.mess.id,
    name: membership.mess.name,
    roomCode: membership.mess.roomCode,
    plan: subscription?.plan ?? null,
    managerFirstName: manager ? firstName(manager.name) : firstName(viewerName),
    activeMembers: active.length ? active.map((m) => m.name) : [viewerName],
  };
}

export function toMonthInfo(
  month: {
    name: string;
    startDate: string;
    endDate: string;
    status: MonthInfo["status"] | null;
    exists: boolean;
  },
  meta?: MonthsResponseData["months"][number],
): MonthInfo | null {
  // Reads never create a row; `exists: false` also means `status` is null.
  if (!month.exists || !month.status) return null;
  return {
    key: month.name,
    label: monthLabel(month.name),
    longLabel: monthLabel(month.name, true),
    status: month.status,
    closedOn: meta?.closedAt ? formatDate(meta.closedAt) : undefined,
  };
}

/**
 * Member rows come from `GET /summary` because `/dashboard` only returns the
 * caller's own ledger. Guest meals are not exposed by the API yet, so they are
 * omitted instead of being guessed.
 */
export function toMealBlock(summary: SummaryResponseData): MealBlock {
  return {
    totalMeals: summary.totals.totalMeals,
    totalBazar: summary.totals.totalBazar,
    mealRate: summary.totals.mealRate,
    members: summary.members.map((m) => ({
      id: m.memberId,
      name: m.name,
      meals: m.totalMeals,
      bazarPaid: m.bazarPaid,
      mealCost: m.mealCost,
      balance: m.mealBalance,
    })),
  };
}

export interface DashboardMappingInput {
  user: AuthMeResponseData;
  myMesses: MyMessesResponseData;
  subscription: SubscriptionResponseData | null;
  members: MessMemberDto[];
  months: MonthsResponseData["months"];
  dashboard: DashboardResponseData;
  summary: SummaryResponseData | null;
}

/** Returns `null` when the caller has no ACTIVE membership (shell redirects). */
export function toDashboardData({
  user,
  myMesses,
  subscription,
  members,
  months,
  dashboard,
  summary,
}: DashboardMappingInput): DashboardData | null {
  const membership = getActiveMembership(myMesses);
  if (!membership) return null;

  const viewer = toViewer(user, membership);
  const month = toMonthInfo(
    dashboard.month,
    months.find((m) => m.name === dashboard.month.name),
  );

  return {
    viewer,
    mess: toMess(membership, subscription, members, viewer.name),
    month,
    meal: month
      ? summary
        ? toMealBlock(summary)
        : {
            totalMeals: dashboard.meal.totalMeals,
            totalBazar: dashboard.meal.totalBazar,
            mealRate: dashboard.meal.mealRate,
            members: [],
          }
      : null,
    fund: month ? dashboard.utility : null,
    myBalance: month ? dashboard.meal.me.mealBalance : null,
    pendingCount: dashboard.pendingMemberCount,
  };
}

export interface SettlementLineView {
  /** "Pay Mahdi" / "From Karim" */
  label: string;
  amount: number;
}

/** Filter the greedy settlement down to the transfers that involve the viewer. */
export function toSettlementLines(
  summary: SummaryResponseData | null,
  viewerId: string,
): SettlementLineView[] {
  if (!summary) return [];
  const names = new Map(summary.members.map((m) => [m.memberId, m.name]));
  return summary.settlement.flatMap((transfer) => {
    if (transfer.fromMemberId === viewerId) {
      return [
        {
          label: `Pay ${names.get(transfer.toMemberId) ?? "member"}`,
          amount: transfer.amount,
        },
      ];
    }
    if (transfer.toMemberId === viewerId) {
      return [
        {
          label: `From ${names.get(transfer.fromMemberId) ?? "member"}`,
          amount: transfer.amount,
        },
      ];
    }
    return [];
  });
}
