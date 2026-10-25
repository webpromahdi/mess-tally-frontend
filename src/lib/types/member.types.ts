import type { MessInfo, Viewer } from "./dashboard.types";

export type MemberStatus = "ACTIVE" | "PENDING" | "REJECTED" | "LEFT";
export type MemberRole = Viewer["role"];

export interface MemberRecord {
  id: string;
  name: string;
  role: MemberRole;
  isManager: boolean;
  status: MemberStatus;
  joinedOn: string | null;
  leftOn: string | null;
  requestedLabel: string | null;
  /** Meal balance in the active month; null when there is none. */
  activeBalance: number | null;
}

export interface MembersMess {
  name: string;
  plan: MessInfo["plan"];
  roomCode: string;
  managerFirstName: string;
  memberCap: number;
}

/** Mirrors `GET /api/v1/members`. */
export interface MembersData {
  viewer: Viewer;
  mess: MembersMess;
  members: MemberRecord[];
  pendingCount: number | null;
}

export type MemberStatusFilter = "ACTIVE" | "LEFT" | "REJECTED" | "all";
export type StatusFilter = MemberStatusFilter;

export interface MembersFilter {
  query: string;
  status: MemberStatusFilter;
}

export type MemberSortKey = "name" | "joined";
export type MemberSortDir = "asc" | "desc";

export interface MembersSort {
  key: MemberSortKey;
  dir: MemberSortDir;
}

export type MemberDialogKind =
  | "approve"
  | "reject"
  | "remove"
  | "role"
  | "leave"
  | "regenerate"
  | "invite"
  | "actions";

export interface MemberDialogTarget {
  kind: MemberDialogKind;
  memberId?: string;
}

// Aliases
export type DialogKind = MemberDialogKind;
export type DialogTarget = MemberDialogTarget;
