import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  CreateMessRequest,
  CreateMessResponseData,
  JoinMessRequest,
  JoinMessResponseData,
  LeaveMessResponseData,
  MembershipStatus,
  MessMemberDto,
  MessMembersResponseData,
  MyMessesResponseData,
  PendingMembersResponseData,
  RemoveMemberResponseData,
} from "@/lib/types";

/** `POST /mess` — API.md §9. The caller becomes OWNER + manager. */
export function createMess(payload: CreateMessRequest) {
  return apiClient<ApiResponse<CreateMessResponseData>>("/mess", {
    method: "POST",
    body: payload,
  });
}

/** `POST /mess/join` — API.md §11. Returns PENDING or ACTIVE membership. */
export function joinMess(payload: JoinMessRequest) {
  return apiClient<ApiResponse<JoinMessResponseData>>("/mess/join", {
    method: "POST",
    body: payload,
  });
}

/** `GET /mess/my` — API.md §10. Returns every non-rejected membership. */
export function getMyMesses() {
  return apiClient<ApiResponse<MyMessesResponseData>>("/mess/my", {
    method: "GET",
  });
}

/** `GET /mess/members?status=` — API.md §12. */
export function getMessMembers(status?: MembershipStatus) {
  return apiClient<ApiResponse<MessMembersResponseData>>("/mess/members", {
    method: "GET",
    query: status ? { status } : undefined,
  });
}

/** `GET /mess/members/pending` — API.md §13. Manager-only, oldest first. */
export function getPendingMembers() {
  return apiClient<ApiResponse<PendingMembersResponseData>>(
    "/mess/members/pending",
    { method: "GET" },
  );
}

/** `PATCH /mess/members/:id/approve` — API.md §14. */
export function approveMember(memberId: string) {
  return apiClient<ApiResponse<MessMemberDto>>(
    `/mess/members/${encodeURIComponent(memberId)}/approve`,
    { method: "PATCH" },
  );
}

/** `PATCH /mess/members/:id/reject` — API.md §15. */
export function rejectMember(memberId: string) {
  return apiClient<ApiResponse<MessMemberDto>>(
    `/mess/members/${encodeURIComponent(memberId)}/reject`,
    { method: "PATCH" },
  );
}

/** `PATCH /mess/members/:id/manager` — API.md §16. Moves the manager flag. */
export function transferManager(memberId: string) {
  return apiClient<ApiResponse<MessMemberDto>>(
    `/mess/members/${encodeURIComponent(memberId)}/manager`,
    { method: "PATCH" },
  );
}

/** `PATCH /mess/members/:id/owner` — API.md §17. Transfers ownership. */
export function transferOwner(memberId: string) {
  return apiClient<ApiResponse<MessMemberDto>>(
    `/mess/members/${encodeURIComponent(memberId)}/owner`,
    { method: "PATCH" },
  );
}

/** `DELETE /mess/members/:id` — API.md §18. Only unreferenced members. */
export function removeMember(memberId: string) {
  return apiClient<ApiResponse<RemoveMemberResponseData>>(
    `/mess/members/${encodeURIComponent(memberId)}`,
    { method: "DELETE" },
  );
}

/** `POST /mess/leave` — API.md §19. */
export function leaveMess() {
  return apiClient<ApiResponse<LeaveMessResponseData>>("/mess/leave", {
    method: "POST",
    body: { confirm: true },
  });
}
