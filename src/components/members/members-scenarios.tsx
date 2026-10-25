"use client";

import { Eye, Layers, X } from "lucide-react";
import { useState } from "react";
import { ErrorState } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { memberFixtures } from "@/fixtures/member.fixtures";
import type {
  MemberDialogTarget,
  MembersData,
  MembersFilter,
} from "@/lib/types/member.types";
import { cn } from "@/lib/utils";
import { MembersSkeleton } from "./layout";
import { MembersView } from "./members-view";
import type { UseMembersStateOptions } from "./use-members-state";

export type MembersScenarioKey =
  | "manager"
  | "member"
  | "searchFiltered"
  | "requests"
  | "approveConfirm"
  | "rejectConfirm"
  | "noRequests"
  | "roleChange"
  | "removeConfirm"
  | "removeBlocked"
  | "ownerProtected"
  | "invite"
  | "regenerateConfirm"
  | "planCap"
  | "loading"
  | "inlineError"
  | "pageError"
  | "saveFailed"
  | "mobileRoster"
  | "mobileLeave";

interface ScenarioConfig {
  label: string;
  badge?: string;
  data: MembersData;
  state?: UseMembersStateOptions;
  initialFilter?: MembersFilter;
  initialDialog?: MemberDialogTarget;
  requestsError?: boolean;
}

const scenarioConfigs: Record<
  Exclude<MembersScenarioKey, "loading" | "pageError">,
  ScenarioConfig
> = {
  manager: {
    label: "Manager View",
    badge: "Active",
    data: memberFixtures.manager,
  },
  member: {
    label: "Member View",
    badge: "Read-only",
    data: memberFixtures.member,
  },
  searchFiltered: {
    label: "Search & Filtered",
    badge: 'query: "ra"',
    data: memberFixtures.manager,
    initialFilter: { query: "ra", status: "all" },
  },
  requests: {
    label: "Join Requests Card",
    badge: "Pending",
    data: memberFixtures.manager,
  },
  approveConfirm: {
    label: "Approve Dialog",
    badge: "Tanvir",
    data: memberFixtures.manager,
    initialDialog: { kind: "approve", memberId: "m_tanvir" },
  },
  rejectConfirm: {
    label: "Reject Dialog",
    badge: "Nusrat",
    data: memberFixtures.manager,
    initialDialog: { kind: "reject", memberId: "m_nusrat" },
  },
  noRequests: {
    label: "No Requests State",
    badge: "Empty",
    data: memberFixtures.noRequests,
  },
  roleChange: {
    label: "Role Change Dialog",
    badge: "Modal",
    data: memberFixtures.manager,
    initialDialog: { kind: "role", memberId: "m_rahim" },
  },
  removeConfirm: {
    label: "Remove Member Dialog",
    badge: "Settled Sumon",
    data: memberFixtures.removable,
    initialDialog: { kind: "remove", memberId: "m_sumon" },
  },
  removeBlocked: {
    label: "Remove Blocked Notice",
    badge: "Open Balance",
    data: memberFixtures.manager,
    initialDialog: { kind: "remove", memberId: "m_rahim" },
  },
  ownerProtected: {
    label: "Owner Protected Notice",
    badge: "Protected",
    data: memberFixtures.manager,
    initialDialog: { kind: "actions", memberId: "m_mahdi" },
  },
  invite: {
    label: "Invite Drawer",
    badge: "Room Code",
    data: memberFixtures.manager,
    initialDialog: { kind: "invite" },
  },
  regenerateConfirm: {
    label: "Regenerate Code Dialog",
    badge: "Confirm",
    data: memberFixtures.manager,
    initialDialog: { kind: "regenerate" },
  },
  planCap: {
    label: "Plan Cap Reached",
    badge: "Banner",
    data: memberFixtures.atCap,
  },
  inlineError: {
    label: "Inline Requests Error",
    badge: "Error Card",
    data: memberFixtures.manager,
    requestsError: true,
  },
  saveFailed: {
    label: "Save Failed Toast",
    badge: "Error Toast",
    data: memberFixtures.manager,
    state: {
      failSaves: true,
      initialToast: "Couldn’t save. Try again.",
      initialFailedId: "m_rahim",
    },
  },
  mobileRoster: {
    label: "Mobile Actions Sheet",
    badge: "Rahim",
    data: memberFixtures.manager,
    initialDialog: { kind: "actions", memberId: "m_rahim" },
  },
  mobileLeave: {
    label: "Leave Mess Dialog",
    badge: "Confirm",
    data: memberFixtures.member,
    initialDialog: { kind: "leave", memberId: "m_karim" },
  },
};

export function MembersScenarios() {
  const [active, setActive] = useState<MembersScenarioKey>("manager");
  const [panelOpen, setPanelOpen] = useState(false);

  const isDev = process.env.NODE_ENV !== "production";

  return (
    <>
      {active === "loading" ? (
        <MembersSkeleton />
      ) : active === "pageError" ? (
        <Card className="p-6">
          <ErrorState
            variant="page"
            title="Failed to load members roster"
            description="Could not connect to the members service. Please check your connection."
          />
        </Card>
      ) : (
        <MembersView
          key={active}
          data={scenarioConfigs[active].data}
          state={scenarioConfigs[active].state}
          initialFilter={scenarioConfigs[active].initialFilter}
          initialDialog={scenarioConfigs[active].initialDialog}
          requestsError={scenarioConfigs[active].requestsError}
        />
      )}

      {isDev && (
        <aside
          aria-label="Development scenario switcher"
          className="fixed right-4 bottom-20 z-50 flex flex-col items-end sm:bottom-4"
        >
          {panelOpen ? (
            <div className="flex max-h-[80vh] w-72 flex-col gap-2 rounded-2xl border border-line bg-surface/95 p-3 shadow-pop backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-line pb-2">
                <span className="flex items-center gap-1.5 text-caption font-bold tracking-wider text-ink uppercase">
                  <Layers className="size-3.5 text-marigold-500" />
                  Members Scenarios
                </span>
                <button
                  type="button"
                  aria-label="Close scenario toolbar"
                  onClick={() => setPanelOpen(false)}
                  className="rounded-lg p-1 text-ink-muted hover:bg-gray-100"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="flex flex-col gap-1 overflow-y-auto pr-1">
                {(
                  [
                    "manager",
                    "member",
                    "searchFiltered",
                    "requests",
                    "approveConfirm",
                    "rejectConfirm",
                    "noRequests",
                    "roleChange",
                    "removeConfirm",
                    "removeBlocked",
                    "ownerProtected",
                    "invite",
                    "regenerateConfirm",
                    "planCap",
                    "loading",
                    "inlineError",
                    "saveFailed",
                    "mobileRoster",
                    "mobileLeave",
                    "pageError",
                  ] as MembersScenarioKey[]
                ).map((key) => {
                  const isCurrent = active === key;
                  const label =
                    key === "loading"
                      ? "Loading Skeleton"
                      : key === "pageError"
                        ? "Full Page Error"
                        : scenarioConfigs[key].label;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setActive(key);
                        setPanelOpen(false);
                      }}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-body-sm transition-colors",
                        isCurrent
                          ? "bg-aubergine-50 font-semibold text-aubergine-900"
                          : "text-ink hover:bg-gray-100",
                      )}
                    >
                      <span>{label}</span>
                      {key !== "loading" && key !== "pageError" && (
                        <span className="text-caption text-ink-muted">
                          {scenarioConfigs[key].badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPanelOpen(true)}
              className="gap-2 rounded-full border-line bg-surface/90 shadow-md backdrop-blur-md hover:bg-surface"
            >
              <Eye className="size-4 text-marigold-600" />
              <span className="text-caption font-medium">
                {active === "loading"
                  ? "Loading Skeleton"
                  : active === "pageError"
                    ? "Full Page Error"
                    : scenarioConfigs[active].label}
              </span>
            </Button>
          )}
        </aside>
      )}
    </>
  );
}
