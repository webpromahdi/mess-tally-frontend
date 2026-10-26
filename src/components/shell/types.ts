export type NavKey =
  | "dashboard"
  | "meals"
  | "bazar"
  | "utility"
  | "summary"
  | "members"
  | "settings";

export interface ShellUser {
  name: string;
  /** Explicit role subtitle, e.g. "Owner · Manager" or "Member" (Design.md §11.1). */
  roleLabel: string;
  isManager: boolean;
}

export interface ShellMess {
  name: string;
  /** `null` while the subscription read is loading or failed. */
  plan: "FREE" | "PRO" | null;
}

export interface ShellMonth {
  /** `YYYY-MM` — the API month key. */
  key: string;
  label: string;
  status: "ACTIVE" | "CLOSED";
}

export interface ShellProps {
  user: ShellUser;
  mess: ShellMess;
  /** `null` = the mess has no active month. */
  month: ShellMonth | null;
  /** Months available to the selector, newest first. */
  months?: ShellMonth[];
  /** Currently selected month key (or the current month when `null`). */
  selectedMonthKey?: string | null;
  onSelectMonth?: (key: string) => void;
  /** Manager-only pending approvals count. */
  pendingCount?: number | null;
  active?: NavKey;
  /** Page name for the desktop breadcrumb. */
  pageTitle?: string;
  initialDrawerOpen?: boolean;
  initialMoreOpen?: boolean;
}
