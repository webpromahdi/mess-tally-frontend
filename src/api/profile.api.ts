import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  ProfileDto,
  UpdateProfileRequest,
} from "@/lib/types";

/**
 * `PATCH /profile/update` — API.md §51.
 * Partial update; at least one field is required.
 */
export function updateProfile(payload: UpdateProfileRequest) {
  return apiClient<ApiResponse<ProfileDto>>("/profile/update", {
    method: "PATCH",
    body: payload,
  });
}

/**
 * `PATCH /profile/image` — API.md §50.
 * JPEG/PNG/WebP ≤ 5 MB; ofetch sets the multipart boundary automatically.
 */
export function uploadProfileImage(profileImage: File | Blob) {
  const body = new FormData();
  body.append("profileImage", profileImage);
  return apiClient<ApiResponse<ProfileDto>>("/profile/image", {
    method: "PATCH",
    body,
  });
}
