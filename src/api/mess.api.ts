import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  CreateMessRequest,
  CreateMessResponseData,
  JoinMessRequest,
  JoinMessResponseData,
  MembershipStatus,
  MessMembersResponseData,
  MyMessesResponseData,
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
