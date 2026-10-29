import type {
  DashboardResponseData,
  FundDepositsResponseData,
  MessInfo,
  MonthsResponseData,
  SummaryData,
  SummaryResponseData,
  Viewer,
} from "@/lib/types";
import { toMealBlock, toMonthInfo } from "./dashboard.mapper";

/**
 * Pure mapper between the summary API contract (API.md §46) and the
 * `SummaryData` view model the designed components consume.
 *
 * Settlement comes straight from the backend (already balanced to paise);
 * utility numbers stay in their own fund block and never touch the meal rate.
 */

export interface SummaryMappingInput {
  viewer: Viewer;
  mess: MessInfo;
  /** `/dashboard` supplies the fund block and the role-gated pending count. */
  dashboard: DashboardResponseData;
  summary: SummaryResponseData;
  /** `GET /utilities/fund-deposits` — the per-member deposit breakdown. */
  deposits: FundDepositsResponseData | null;
  months: MonthsResponseData["months"];
}

export function toSummaryData({
  viewer,
  mess,
  dashboard,
  summary,
  deposits,
  months,
}: SummaryMappingInput): SummaryData {
  const month = toMonthInfo(
    summary.month,
    months.find((m) => m.name === summary.month.name),
  );

  return {
    viewer,
    mess,
    month,
    meal: month ? toMealBlock(summary) : null,
    // A row-less month has no fund either; reads never create one.
    fund: month ? dashboard.utility : null,
    depositsByMember:
      deposits?.byMember.map((row) => ({
        memberId: row.memberId,
        name: row.name,
        amount: row.amount,
      })) ?? [],
    transfers: summary.settlement.map((transfer) => ({
      fromId: transfer.fromMemberId,
      toId: transfer.toMemberId,
      amount: transfer.amount,
    })),
    isFinal: summary.isLocked || month?.status === "CLOSED",
    pendingCount: dashboard.pendingMemberCount,
  };
}
