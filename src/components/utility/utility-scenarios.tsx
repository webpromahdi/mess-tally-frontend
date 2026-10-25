"use client";

import { Eye, Layers, X } from "lucide-react";
import { useState } from "react";
import { ErrorState } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { utilityFixtures } from "@/fixtures/utility.fixtures";
import type {
  UtilityData,
  UtilityFilter,
  UtilitySort,
} from "@/lib/types/utility.types";
import { cn } from "@/lib/utils";
import type { UtilityDialogTarget } from "./dialogs";
import { UtilitySkeleton } from "./layout";
import { type UtilityStateOptions, UtilityView } from "./utility-view";

export type UtilityScenarioKey =
  | "manager"
  | "member"
  | "addDeposit"
  | "addBill"
  | "entryValidation"
  | "editEntry"
  | "deleteConfirm"
  | "filtered"
  | "replenish"
  | "closed"
  | "closedMember"
  | "empty"
  | "noMonthManager"
  | "noMonthMember"
  | "loading"
  | "inlineError"
  | "saveFailed"
  | "pageError";

interface ScenarioConfig {
  label: string;
  badge?: string;
  data: UtilityData;
  state?: UtilityStateOptions;
  initialFilter?: UtilityFilter;
  initialSort?: UtilitySort;
  initialDialog?: UtilityDialogTarget;
  initialDeleteId?: string;
  listError?: boolean;
}

const EDIT_ID = "ut_2026-10-06_4";
const editEntry = utilityFixtures.manager.entries.find((e) => e.id === EDIT_ID);

const scenarioConfigs: Record<
  Exclude<UtilityScenarioKey, "loading" | "pageError">,
  ScenarioConfig
> = {
  manager: {
    label: "Manager View",
    badge: "Active",
    data: utilityFixtures.manager,
  },
  member: {
    label: "Member View",
    badge: "Active",
    data: utilityFixtures.member,
  },
  addDeposit: {
    label: "Record Deposit Modal",
    badge: "Modal",
    data: utilityFixtures.manager,
    initialDialog: { initialValues: { kind: "DEPOSIT" } },
  },
  addBill: {
    label: "Add Bill Modal (Water)",
    badge: "Modal",
    data: utilityFixtures.manager,
    initialDialog: { initialValues: { kind: "BILL", category: "Water" } },
  },
  entryValidation: {
    label: "Entry Validation Error",
    badge: "Validation",
    data: utilityFixtures.manager,
    initialDialog: {
      initialValues: { kind: "BILL", amount: "0", note: "WASA bill" },
      initialSubmitted: true,
    },
  },
  editEntry: {
    label: "Edit Bill Modal",
    badge: "Modal",
    data: utilityFixtures.manager,
    initialDialog: { entry: editEntry },
  },
  deleteConfirm: {
    label: "Delete Confirmation",
    badge: "Dialog",
    data: utilityFixtures.manager,
    initialDeleteId: EDIT_ID,
  },
  filtered: {
    label: "Filtered Bills (Oct 7-31)",
    badge: "Filter",
    data: utilityFixtures.manager,
    initialFilter: {
      kind: "BILL",
      category: "all",
      from: "2026-10-07",
      to: "2026-10-31",
    },
  },
  replenish: {
    label: "Needs Top-Up (Overdrawn)",
    badge: "Warning",
    data: utilityFixtures.replenish,
  },
  closed: {
    label: "Closed Month (Manager)",
    badge: "Locked",
    data: utilityFixtures.closed,
  },
  closedMember: {
    label: "Closed Month (Member)",
    badge: "Locked",
    data: utilityFixtures.closedMember,
  },
  empty: {
    label: "Empty Month",
    badge: "0 Activity",
    data: utilityFixtures.empty,
  },
  noMonthManager: {
    label: "No Month (Manager)",
    badge: "Prompt",
    data: utilityFixtures.noMonthManager,
  },
  noMonthMember: {
    label: "No Month (Member)",
    badge: "Waiting",
    data: utilityFixtures.noMonthMember,
  },
  inlineError: {
    label: "Inline Ledger Error",
    badge: "Error",
    data: utilityFixtures.manager,
    listError: true,
  },
  saveFailed: {
    label: "Save Failed Toast",
    badge: "Error Toast",
    data: utilityFixtures.manager,
    state: {
      failSaves: true,
      initialToast: "Couldn’t save. Try again.",
      initialFailedId: "ut_2026-10-15_7",
    },
  },
};

export function UtilityScenarios() {
  const [active, setActive] = useState<UtilityScenarioKey>("manager");
  const [panelOpen, setPanelOpen] = useState(false);

  const isDev = process.env.NODE_ENV !== "production";

  return (
    <>
      {active === "loading" ? (
        <UtilitySkeleton />
      ) : active === "pageError" ? (
        <Card className="p-6">
          <ErrorState
            variant="page"
            title="Failed to load utility fund ledger"
            description="Could not reach the utility service. Please check your network."
          />
        </Card>
      ) : (
        <UtilityView
          key={active}
          data={scenarioConfigs[active].data}
          state={scenarioConfigs[active].state}
          initialFilter={scenarioConfigs[active].initialFilter}
          initialSort={scenarioConfigs[active].initialSort}
          initialDialog={scenarioConfigs[active].initialDialog}
          initialDeleteId={scenarioConfigs[active].initialDeleteId}
          listError={scenarioConfigs[active].listError}
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
                  Utility Scenarios
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
                    "addDeposit",
                    "addBill",
                    "entryValidation",
                    "editEntry",
                    "deleteConfirm",
                    "filtered",
                    "replenish",
                    "closed",
                    "closedMember",
                    "empty",
                    "noMonthManager",
                    "noMonthMember",
                    "loading",
                    "inlineError",
                    "saveFailed",
                    "pageError",
                  ] as UtilityScenarioKey[]
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
                        "flex items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-body-sm font-medium transition-colors",
                        isCurrent
                          ? "bg-aubergine-800 text-white font-semibold"
                          : "text-ink hover:bg-gray-100",
                      )}
                    >
                      <span className="truncate">{label}</span>
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
              className="gap-2 rounded-full border-line-strong bg-surface/90 shadow-card backdrop-blur-xs"
            >
              <Eye className="size-4 text-marigold-500" />
              <span>Scenarios: {active}</span>
            </Button>
          )}
        </aside>
      )}
    </>
  );
}
