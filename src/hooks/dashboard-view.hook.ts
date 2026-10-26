import { isUpgradeRequired } from "@/lib/apiError";
import {
  toDashboardData,
  toSettlementLines,
} from "@/lib/mappers/dashboard.mapper";
import type { DashboardBlock } from "@/lib/types";
import { useSummary } from "./summary.hook";
import { useWorkspace } from "./workspace.hook";

/**
 * Full dashboard view model: workspace identity + `/dashboard` + `/summary`.
 * `/summary` only powers the member charts and the closed-month settlement.
 */
export function useDashboardView(month: string | null) {
  const workspace = useWorkspace(month);
  const summaryQuery = useSummary(month);
  const summary = summaryQuery.data?.data ?? null;

  const data =
    workspace.user && workspace.myMesses && workspace.dashboard
      ? toDashboardData({
          user: workspace.user,
          myMesses: workspace.myMesses,
          subscription: workspace.subscription,
          members: workspace.members,
          months: workspace.months,
          dashboard: workspace.dashboard,
          summary,
        })
      : null;

  const errors: DashboardBlock[] = [];
  if (summaryQuery.isError) {
    errors.push("memberBalances", "bazarShare");
  }

  const settlement =
    data && data.month?.status === "CLOSED"
      ? toSettlementLines(summary, data.viewer.memberId)
      : [];

  const refetch = async () => {
    await Promise.all([workspace.refetch(), summaryQuery.refetch()]);
  };

  return {
    data,
    errors,
    settlement,
    workspace,
    summary,
    isLoading:
      workspace.isLoading ||
      (workspace.month !== null && summaryQuery.isPending),
    isError: workspace.isError,
    error: workspace.error,
    isUpgradeRequired:
      isUpgradeRequired(workspace.error) ||
      isUpgradeRequired(summaryQuery.error),
    refetch,
  };
}
