import type {
  MessInfo,
  MessMemberDto,
  MemberRecord,
  MembersData,
  SummaryResponseData,
  Viewer,
} from "@/lib/types";

export function toMembersData({
  viewer,
  mess,
  plan,
  members,
  pending,
  summary,
}: {
  viewer: Viewer;
  mess: MessInfo;
  plan: "FREE" | "PRO" | null;
  members: MessMemberDto[];
  pending: MessMemberDto[];
  summary: SummaryResponseData | null;
}): MembersData {
  const balances = new Map(
    summary?.members.map((member) => [member.memberId, member.mealBalance]) ?? [],
  );
  const rows = [...members, ...pending.filter((pendingMember) => !members.some((m) => m.id === pendingMember.id))];
  const records: MemberRecord[] = rows.map((member) => ({
    id: member.id,
    name: member.name,
    role: member.role,
    isManager: member.isManager,
    status: member.status,
    joinedOn: member.joinedAt,
    leftOn: member.leftAt,
    requestedLabel: member.status === "PENDING" ? "Join request" : null,
    activeBalance: balances.get(member.id) ?? null,
  }));
  return {
    viewer,
    mess: {
      name: mess.name,
      plan,
      roomCode: mess.roomCode,
      managerFirstName: mess.managerFirstName,
      memberCap: plan === "PRO" ? Number.MAX_SAFE_INTEGER : 5,
    },
    members: records,
    pendingCount: viewer.isManager ? pending.length : null,
  };
}
