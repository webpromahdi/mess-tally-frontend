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

/** `POST /months` — API.md §21. */
export interface CreateMonthRequest {
  /** `YYYY-MM`. */
  month: string;
}

export interface CreateMonthResponseData {
  month: MonthSummaryDto;
  /** `false` when the month was already open (idempotent). */
  created: boolean;
}

/** `PATCH /months/:id/close` and `/reopen` — API.md §22–23. */
export interface MonthResponseData {
  month: MonthSummaryDto;
}
