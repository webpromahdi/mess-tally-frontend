import type { MonthStatus } from "./dashboard.types";

/** `GET /months` — API.md §20. Newest first. */
export interface MonthSummaryDto {
  id: string;
  /** `YYYY-MM`. */
  name: string;
  startDate: string;
  endDate: string;
  status: MonthStatus;
  managerId: string;
  closedAt: string | null;
  isCurrent: boolean;
}

export interface MonthsResponseData {
  months: MonthSummaryDto[];
  total: number;
}
