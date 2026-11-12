import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/lib/types";
import type {
  AdminListResponse,
  AdminMess,
  AdminMessQuery,
  AdminOverview,
  AdminPageMeta,
  AdminRevenue,
  AdminRevenueQuery,
  AdminUser,
  AdminUserQuery,
} from "@/lib/types/admin.types";

/** Drop empty filters so ofetch doesn't send `?role=&search=`. */
function compact(values: Record<string, string | number | undefined>) {
  const query: Record<string, string> = {};
  for (const [key, value] of Object.entries(values)) {
    if (value !== undefined && value !== "") query[key] = String(value);
  }
  return Object.keys(query).length ? query : undefined;
}

/** `GET /admin/overview` — platform totals. */
export function getAdminOverview() {
  return apiClient<ApiResponse<AdminOverview>>("/admin/overview", {
    method: "GET",
  });
}

/** `GET /admin/users` — search by name/email and by mess name. */
export function getAdminUsers(filters: AdminUserQuery = {}) {
  return apiClient<AdminListResponse<AdminUser>>("/admin/users", {
    method: "GET",
    query: compact({ ...filters }),
  });
}

/** `PATCH /admin/users/:id/status` — suspend or reactivate. */
export function updateAdminUserStatus(payload: {
  id: string;
  status: "ACTIVE" | "SUSPENDED";
}) {
  return apiClient<ApiResponse<AdminUser>>(
    `/admin/users/${encodeURIComponent(payload.id)}/status`,
    { method: "PATCH", body: { status: payload.status } },
  );
}

/** `PATCH /admin/users/:id/role` — SUPERADMIN only. */
export function updateAdminUserRole(payload: {
  id: string;
  role: "USER" | "ADMIN";
}) {
  return apiClient<ApiResponse<AdminUser>>(
    `/admin/users/${encodeURIComponent(payload.id)}/role`,
    { method: "PATCH", body: { role: payload.role } },
  );
}

/** `GET /admin/messes` — search and filter by effective plan / subscription type. */
export function getAdminMesses(filters: AdminMessQuery = {}) {
  return apiClient<AdminListResponse<AdminMess>>("/admin/messes", {
    method: "GET",
    query: compact({ ...filters }),
  });
}

/** `PATCH /admin/messes/:id/plan` — grant or extend PRO by `days`. */
export function grantAdminPro(payload: { id: string; days: number }) {
  return apiClient<ApiResponse<AdminMess>>(
    `/admin/messes/${encodeURIComponent(payload.id)}/plan`,
    { method: "PATCH", body: { days: payload.days } },
  );
}

/** `GET /admin/revenue` — totals, monthly series and paginated payments. */
export function getAdminRevenue(filters: AdminRevenueQuery = {}) {
  return apiClient<ApiResponse<AdminRevenue> & { meta: AdminPageMeta }>(
    "/admin/revenue",
    { method: "GET", query: compact({ ...filters }) },
  );
}
