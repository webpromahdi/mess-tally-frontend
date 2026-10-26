import {
  getActiveMembership,
  toMess,
  toMonthInfo,
  toViewer,
} from "@/lib/mappers/dashboard.mapper";
import { useGetMe } from "./auth.hook";
import { useDashboardData } from "./dashboard.hook";
import { useMessMembers, useMyMesses } from "./mess.hook";
import { useMonths } from "./month.hook";
import { useSubscription } from "./subscription.hook";

/**
 * Shared read model for the dashboard shell and pages.
 *
 * Everything is fetched in parallel. The shell and the page call this hook
 * with the same month, so TanStack Query dedupes the requests.
 */
export function useWorkspace(month: string | null) {
  const userQuery = useGetMe();
  const myMessesQuery = useMyMesses();
  const subscriptionQuery = useSubscription();
  const membersQuery = useMessMembers("ACTIVE");
  const monthsQuery = useMonths();
  const dashboardQuery = useDashboardData(month);

  const user = userQuery.data?.data ?? null;
  const myMesses = myMessesQuery.data?.data ?? null;
  const subscription = subscriptionQuery.data?.data ?? null;
  const members = membersQuery.data?.data.members ?? [];
  const months = monthsQuery.data?.data.months ?? [];
  const dashboard = dashboardQuery.data?.data ?? null;

  const membership = getActiveMembership(myMesses);
  const viewer = user && membership ? toViewer(user, membership) : null;
  const mess =
    user && membership
      ? toMess(membership, subscription, members, user.name)
      : null;
  const monthInfo = dashboard
    ? toMonthInfo(
        dashboard.month,
        months.find((m) => m.name === dashboard.month.name),
      )
    : null;

  const fatalError =
    userQuery.error ?? myMessesQuery.error ?? dashboardQuery.error;

  const refetch = () =>
    Promise.all([
      userQuery.refetch(),
      myMessesQuery.refetch(),
      subscriptionQuery.refetch(),
      membersQuery.refetch(),
      monthsQuery.refetch(),
      dashboardQuery.refetch(),
    ]);

  return {
    user,
    myMesses,
    subscription,
    members,
    membership,
    viewer,
    mess,
    months,
    month: monthInfo,
    dashboard,
    pendingCount: dashboard?.pendingMemberCount ?? null,
    identityLoading: userQuery.isPending || myMessesQuery.isPending,
    identityError: userQuery.error ?? myMessesQuery.error,
    isLoading:
      userQuery.isPending ||
      myMessesQuery.isPending ||
      dashboardQuery.isPending,
    isError: Boolean(fatalError),
    error: fatalError,
    refetch,
    queries: {
      user: userQuery,
      myMesses: myMessesQuery,
      subscription: subscriptionQuery,
      members: membersQuery,
      months: monthsQuery,
      dashboard: dashboardQuery,
    },
  };
}
