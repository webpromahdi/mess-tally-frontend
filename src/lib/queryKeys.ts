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
    members: (status: string = "ACTIVE") =>
      ["workspace", "members", status] as const,
    months: ["workspace", "months"] as const,
  },
  dashboard: {
    all: ["dashboard"] as const,
    detail: (month: string | null) =>
      ["dashboard", month ?? "current"] as const,
  },
  summary: {
    all: ["summary"] as const,
    detail: (month: string | null) => ["summary", month ?? "current"] as const,
  },
};
