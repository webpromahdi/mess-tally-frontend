import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  CreateFundDepositRequest,
  CreateUtilityBillRequest,
  DeleteFundDepositResponseData,
  DeleteUtilityResponseData,
  FundDepositResponseData,
  FundDepositsResponseData,
  ReplenishmentEstimateResponseData,
  SetUtilityBillPaidRequest,
  UpdateFundDepositRequest,
  UpdateUtilityBillRequest,
  UtilityBillResponseData,
  UtilityBillsResponseData,
  UtilityFundResponseData,
} from "@/lib/types";

const monthQuery = (month?: string | null) => (month ? { month } : undefined);

// ---------------------------------------------------------------------------
// Utility bills — API.md §35–39
// ---------------------------------------------------------------------------

/** `GET /utilities?month=YYYY-MM` — bills, totals and per-person share. */
export function getUtilityBills({ month }: { month?: string | null } = {}) {
  return apiClient<ApiResponse<UtilityBillsResponseData>>("/utilities", {
    method: "GET",
    query: monthQuery(month),
  });
}

/** `POST /utilities` — API.md §36. */
export function createUtilityBill(payload: CreateUtilityBillRequest) {
  return apiClient<ApiResponse<UtilityBillResponseData>>("/utilities", {
    method: "POST",
    body: payload,
  });
}

/** `PATCH /utilities/:id` — API.md §37. */
export function updateUtilityBill(
  id: string,
  payload: UpdateUtilityBillRequest,
) {
  return apiClient<ApiResponse<UtilityBillResponseData>>(
    `/utilities/${encodeURIComponent(id)}`,
    { method: "PATCH", body: payload },
  );
}

/** `PATCH /utilities/:id/paid` — API.md §38. */
export function setUtilityBillPaid(
  id: string,
  payload: SetUtilityBillPaidRequest,
) {
  return apiClient<ApiResponse<UtilityBillResponseData>>(
    `/utilities/${encodeURIComponent(id)}/paid`,
    { method: "PATCH", body: payload },
  );
}

/** `DELETE /utilities/:id` — API.md §39. */
export function deleteUtilityBill(id: string) {
  return apiClient<ApiResponse<DeleteUtilityResponseData>>(
    `/utilities/${encodeURIComponent(id)}`,
    { method: "DELETE" },
  );
}

// ---------------------------------------------------------------------------
// Utility fund — API.md §40–41
// ---------------------------------------------------------------------------

/** `GET /utilities/fund?month=YYYY-MM` — deposits minus paid bills. */
export function getUtilityFund({ month }: { month?: string | null } = {}) {
  return apiClient<ApiResponse<UtilityFundResponseData>>("/utilities/fund", {
    method: "GET",
    query: monthQuery(month),
  });
}

/** `GET /utilities/replenishment-estimate?perMember=` — manager only. */
export function getReplenishmentEstimate({ perMember }: { perMember: number }) {
  return apiClient<ApiResponse<ReplenishmentEstimateResponseData>>(
    "/utilities/replenishment-estimate",
    { method: "GET", query: { perMember } },
  );
}

// ---------------------------------------------------------------------------
// Fund deposits — API.md §42–45
// ---------------------------------------------------------------------------

/** `GET /utilities/fund-deposits?month=YYYY-MM` — ledger + totals. */
export function getFundDeposits({ month }: { month?: string | null } = {}) {
  return apiClient<ApiResponse<FundDepositsResponseData>>(
    "/utilities/fund-deposits",
    { method: "GET", query: monthQuery(month) },
  );
}

/** `POST /utilities/fund-deposits` — manager only. */
export function createFundDeposit(payload: CreateFundDepositRequest) {
  return apiClient<ApiResponse<FundDepositResponseData>>(
    "/utilities/fund-deposits",
    { method: "POST", body: payload },
  );
}

/** `PATCH /utilities/fund-deposits/:id` — manager only. */
export function updateFundDeposit(
  id: string,
  payload: UpdateFundDepositRequest,
) {
  return apiClient<ApiResponse<FundDepositResponseData>>(
    `/utilities/fund-deposits/${encodeURIComponent(id)}`,
    { method: "PATCH", body: payload },
  );
}

/** `DELETE /utilities/fund-deposits/:id` — manager only. */
export function deleteFundDeposit(id: string) {
  return apiClient<ApiResponse<DeleteFundDepositResponseData>>(
    `/utilities/fund-deposits/${encodeURIComponent(id)}`,
    { method: "DELETE" },
  );
}
