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
  plan: "FREE" | "PRO";
}

export interface ShellMonth {
  label: string;
  status: "ACTIVE" | "CLOSED";
}

export interface ShellProps {
  user: ShellUser;
  mess: ShellMess;
  /** `null` = the mess has no active month. */
  month: ShellMonth | null;
  /** Manager-only pending approvals count. */
  pendingCount?: number | null;
  active?: NavKey;
  /** Page name for the desktop breadcrumb. */
  pageTitle?: string;
  initialDrawerOpen?: boolean;
  initialMoreOpen?: boolean;
}
