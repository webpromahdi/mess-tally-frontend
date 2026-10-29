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
const NEXT_CODE = "H8Q2LD";

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

export function regenerateCode(data: MembersData): MembersData {
  return { ...data, mess: { ...data.mess, roomCode: NEXT_CODE } };
}

export function hasOpenBalance(m: MemberRecord): boolean {
  return m.activeBalance !== null && !isSettled(m.activeBalance);
}

export interface RowPermissions {
  canChangeRole: boolean;
  canRemove: boolean;
  hint: string | null;
}

export function rowPermissions(
  viewer: Viewer,
  m: MemberRecord,
): RowPermissions {
  if (!viewer.isManager || m.status !== "ACTIVE") {
    return { canChangeRole: false, canRemove: false, hint: null };
  }
  if (m.role === "OWNER") {
    return {
      canChangeRole: false,
      canRemove: false,
      hint: "The owner can’t be demoted or removed. Transfer ownership first.",
    };
  }
  if (m.isManager) {
    return {
      canChangeRole: false,
      canRemove: true,
      hint: "Transfer the manager position to another member before changing this role.",
    };
  }
  return { canChangeRole: true, canRemove: true, hint: null };
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
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
