import { isSettled } from "@/lib/summary";
import type { Viewer } from "@/lib/types/dashboard.types";
import type {
  MemberRecord,
  MemberSortKey,
  MembersData,
  MembersFilter,
  MembersSort,
} from "@/lib/types/member.types";

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export function activeMembers(data: MembersData): MemberRecord[] {
  return data.members.filter((m) => m.status === "ACTIVE");
}

export function pendingMembers(data: MembersData): MemberRecord[] {
  return data.members.filter((m) => m.status === "PENDING");
}

export function atCap(data: MembersData): boolean {
  return activeMembers(data).length >= data.mess.memberCap;
}

export function recompute(data: MembersData): MembersData {
  return {
    ...data,
    pendingCount: data.viewer.isManager ? pendingMembers(data).length : null,
  };
}

function patch(
  data: MembersData,
  id: string,
  fn: (m: MemberRecord) => MemberRecord,
): MembersData {
  return recompute({
    ...data,
    members: data.members.map((m) => (m.id === id ? fn(m) : m)),
  });
}

export function approveMember(data: MembersData, id: string): MembersData {
  return patch(data, id, (m) => ({
    ...m,
    status: "ACTIVE",
    joinedOn: todayIso(),
    requestedLabel: null,
    activeBalance: 0,
  }));
}

export function rejectMember(data: MembersData, id: string): MembersData {
  return patch(data, id, (m) => ({
    ...m,
    status: "REJECTED",
    requestedLabel: null,
  }));
}

export function setManager(
  data: MembersData,
  id: string,
  isManager: boolean,
): MembersData {
  return patch(data, id, (m) => ({ ...m, isManager }));
}

export function removeMember(data: MembersData, id: string): MembersData {
  return patch(data, id, (m) => ({ ...m, status: "LEFT", leftOn: todayIso() }));
}

export function hasOpenBalance(m: MemberRecord): boolean {
  return m.activeBalance !== null && !isSettled(m.activeBalance);
}

export interface RowPermissions {
  canChangeRole: boolean;
  canRemove: boolean;
  canTransfer: boolean;
  hint: string | null;
}

/** Managers and the owner get a row menu; the owner alone can hand over ownership. */
export function hasRowActions(viewer: Viewer, m: MemberRecord): boolean {
  return (viewer.isManager || viewer.role === "OWNER") && m.status === "ACTIVE";
}

export function rowPermissions(
  viewer: Viewer,
  m: MemberRecord,
): RowPermissions {
  const canTransfer =
    viewer.role === "OWNER" &&
    m.status === "ACTIVE" &&
    m.id !== viewer.memberId;
  if (!viewer.isManager || m.status !== "ACTIVE") {
    return { canChangeRole: false, canRemove: false, canTransfer, hint: null };
  }
  if (m.role === "OWNER") {
    return {
      canChangeRole: false,
      canRemove: false,
      canTransfer,
      hint: "The owner can’t be demoted or removed. The owner can make another member owner first.",
    };
  }
  if (m.isManager) {
    return {
      canChangeRole: false,
      canRemove: true,
      canTransfer,
      hint: "Transfer the manager position to another member before changing this role.",
    };
  }
  return { canChangeRole: true, canRemove: true, canTransfer, hint: null };
}

export function formatDate(iso: string): string {
  // The API sends full timestamps; local fixtures send bare `YYYY-MM-DD`.
  const date = new Date(iso.length === 10 ? `${iso}T00:00:00` : iso);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function pluralMembers(n: number): string {
  return `${n} ${n === 1 ? "member" : "members"}`;
}

export const defaultFilter: MembersFilter = { query: "", status: "ACTIVE" };
export const defaultSort: MembersSort = { key: "name", dir: "asc" };

export function isFiltered(filter: MembersFilter): boolean {
  return filter.query.trim() !== "" || filter.status !== defaultFilter.status;
}

/** Roster rows: pending requests live in their own card. */
export function filterMembers(
  members: MemberRecord[],
  filter: MembersFilter,
  canSeeRejected: boolean,
): MemberRecord[] {
  const q = filter.query.trim().toLowerCase();
  return members.filter((m) => {
    if (m.status === "PENDING") return false;
    if (m.status === "REJECTED" && !canSeeRejected) return false;
    if (filter.status !== "all" && m.status !== filter.status) return false;
    return q === "" || m.name.toLowerCase().includes(q);
  });
}

export function sortMembers(
  members: MemberRecord[],
  sort: MembersSort,
): MemberRecord[] {
  const dir = sort.dir === "asc" ? 1 : -1;
  return [...members].sort((a, b) => {
    let diff: number;
    if (sort.key === "name") diff = a.name.localeCompare(b.name);
    else diff = (a.joinedOn ?? "").localeCompare(b.joinedOn ?? "");
    if (diff === 0) diff = a.name.localeCompare(b.name);
    return diff * dir;
  });
}

export function nextSort(cur: MembersSort, key: MemberSortKey): MembersSort {
  return cur.key === key
    ? { key, dir: cur.dir === "asc" ? "desc" : "asc" }
    : { key, dir: "asc" };
}
