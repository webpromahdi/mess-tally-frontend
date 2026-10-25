import { dashboardFixtures } from "@/fixtures/dashboard.fixtures";
import { summaryFixtures } from "@/fixtures/summary.fixtures";
import { recompute } from "@/lib/members";
import type { Viewer } from "@/lib/types/dashboard.types";
import type {
  MemberRecord,
  MembersData,
  MembersMess,
} from "@/lib/types/member.types";

/* Static fixtures shaped like `GET /api/v1/members`. Balances come from the Summary fixtures. */

const manager: Viewer = dashboardFixtures.manager.viewer;
const member: Viewer = dashboardFixtures.member.viewer;

const balances = new Map<string, number>(
  (summaryFixtures.manager.meal?.members ?? []).map((m) => [m.id, m.balance]),
);

const mess: MembersMess = {
  name: dashboardFixtures.manager.mess.name,
  plan: dashboardFixtures.manager.mess.plan,
  roomCode: dashboardFixtures.manager.mess.roomCode,
  managerFirstName: dashboardFixtures.manager.mess.managerFirstName,
  memberCap: 10,
};

function active(
  id: string,
  name: string,
  joinedOn: string,
  isOwner = false,
): MemberRecord {
  return {
    id,
    name,
    role: isOwner ? "OWNER" : "MEMBER",
    isManager: isOwner,
    status: "ACTIVE",
    joinedOn,
    leftOn: null,
    requestedLabel: null,
    activeBalance: balances.get(id) ?? 0,
  };
}

function other(
  id: string,
  name: string,
  status: MemberRecord["status"],
  extra: Partial<MemberRecord>,
): MemberRecord {
  return {
    id,
    name,
    role: "MEMBER",
    isManager: false,
    status,
    joinedOn: null,
    leftOn: null,
    requestedLabel: null,
    activeBalance: null,
    ...extra,
  };
}

const roster: MemberRecord[] = [
  active("m_mahdi", "Mahdi Hasan", "2026-01-12", true),
  active("m_rahim", "Rahim Uddin", "2026-01-12"),
  active("m_karim", "Karim Ahmed", "2026-02-03"),
  active("m_sumon", "Sumon Das", "2026-03-18"),
  other("m_tanvir", "Tanvir Alam", "PENDING", {
    requestedLabel: "2 hours ago",
  }),
  other("m_nusrat", "Nusrat Jahan", "PENDING", { requestedLabel: "Yesterday" }),
  other("m_faisal", "Faisal Karim", "REJECTED", {}),
  other("m_imran", "Imran Hossain", "LEFT", {
    joinedOn: "2026-02-20",
    leftOn: "2026-09-30",
  }),
];

function scenario(
  viewer: Viewer,
  members: MemberRecord[] = roster,
  memberCap = mess.memberCap,
): MembersData {
  return recompute({
    viewer,
    mess: { ...mess, memberCap },
    members,
    pendingCount: null,
  });
}

const noRequests = roster.filter((m) => m.status !== "PENDING");
// Sumon has paid exactly his share, so he can be removed.
const settledSumon = roster.map((m) =>
  m.id === "m_sumon" ? { ...m, activeBalance: 0 } : m,
);

export const memberFixtures = {
  manager: scenario(manager),
  member: scenario(member),
  noRequests: scenario(manager, noRequests),
  removable: scenario(manager, settledSumon),
  atCap: scenario(manager, roster, 4),
} satisfies Record<string, MembersData>;
