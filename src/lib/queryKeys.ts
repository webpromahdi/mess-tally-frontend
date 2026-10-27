/**
 * Central TanStack Query key factory.
 * Keeping keys here prevents the shell and pages from silently diverging.
 *
 * Invalidate by prefix (e.g. `["dashboard"]`) after any mutation that changes
 * meals, bazar, utilities, members or the active month.
 */
export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  workspace: {
    myMesses: ["workspace", "mess", "my"] as const,
    subscription: ["workspace", "subscription"] as const,
    /** Prefix for every membership status list. */
    membersAll: ["workspace", "members"] as const,
    members: (status: string = "ACTIVE") =>
      ["workspace", "members", status] as const,
    pendingMembers: ["workspace", "members", "pending"] as const,
    months: ["workspace", "months"] as const,
  },
  dashboard: {
    all: ["dashboard"] as const,
    detail: (month: string | null) =>
      ["dashboard", month ?? "current"] as const,
  },
  meals: {
    all: ["meals"] as const,
    detail: (month: string | null) => ["meals", month ?? "current"] as const,
  },
  bazar: {
    all: ["bazar"] as const,
    list: (filters: {
      month?: string | null;
      shopperId?: string;
      from?: string;
      to?: string;
    }) =>
      [
        "bazar",
        filters.month ?? "current",
        filters.shopperId ?? "all",
        filters.from ?? "",
        filters.to ?? "",
      ] as const,
  },
  utilities: {
    all: ["utilities"] as const,
    bills: (month: string | null) =>
      ["utilities", "bills", month ?? "current"] as const,
    fund: (month: string | null) =>
      ["utilities", "fund", month ?? "current"] as const,
    deposits: (month: string | null) =>
      ["utilities", "deposits", month ?? "current"] as const,
    replenishment: (perMember: number) =>
      ["utilities", "replenishment", perMember] as const,
  },
  summary: {
    all: ["summary"] as const,
    detail: (month: string | null) => ["summary", month ?? "current"] as const,
  },
  subscription: {
    payments: ["subscription", "payments"] as const,
    paymentStatus: (paymentId: string) =>
      ["subscription", "payments", paymentId, "status"] as const,
  },
};
