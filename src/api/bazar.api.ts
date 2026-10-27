import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  BazarEntryResponseData,
  BazarListQuery,
  BazarListResponseData,
  CreateBazarRequest,
  DeleteBazarResponseData,
  UpdateBazarRequest,
} from "@/lib/types";

/** Build a query object without empty values (ofetch serialises it). */
function bazarQuery({ month, shopperId, from, to }: BazarListQuery) {
  const query: Record<string, string> = {};
  if (month) query.month = month;
  if (shopperId) query.shopperId = shopperId;
  if (from) query.from = from;
  if (to) query.to = to;
  return Object.keys(query).length ? query : undefined;
}

/** `GET /bazar` — API.md §29. Chronological entries + shopper totals. */
export function getBazar(filters: BazarListQuery = {}) {
  return apiClient<ApiResponse<BazarListResponseData>>("/bazar", {
    method: "GET",
    query: bazarQuery(filters),
  });
}

/** `POST /bazar` — API.md §30. */
export function createBazar(payload: CreateBazarRequest) {
  return apiClient<ApiResponse<BazarEntryResponseData>>("/bazar", {
    method: "POST",
    body: payload,
  });
}

/** `PATCH /bazar/:id` — API.md §31. */
export function updateBazar(id: string, payload: UpdateBazarRequest) {
  return apiClient<ApiResponse<BazarEntryResponseData>>(
    `/bazar/${encodeURIComponent(id)}`,
    { method: "PATCH", body: payload },
  );
}

/** `DELETE /bazar/:id` — API.md §32. */
export function deleteBazar(id: string) {
  return apiClient<ApiResponse<DeleteBazarResponseData>>(
    `/bazar/${encodeURIComponent(id)}`,
    { method: "DELETE" },
  );
}

/**
 * `POST /bazar/:id/receipt` — API.md §33. PRO only; JPEG/PNG/WebP ≤ 5 MB.
 * ofetch sets the multipart boundary automatically for `FormData`.
 */
export function uploadBazarReceipt(id: string, receipt: File | Blob) {
  const body = new FormData();
  body.append("receipt", receipt);
  return apiClient<ApiResponse<BazarEntryResponseData>>(
    `/bazar/${encodeURIComponent(id)}/receipt`,
    { method: "POST", body },
  );
}

/** `DELETE /bazar/:id/receipt` — API.md §34. PRO only. */
export function deleteBazarReceipt(id: string) {
  return apiClient<ApiResponse<BazarEntryResponseData>>(
    `/bazar/${encodeURIComponent(id)}/receipt`,
    { method: "DELETE" },
  );
}
