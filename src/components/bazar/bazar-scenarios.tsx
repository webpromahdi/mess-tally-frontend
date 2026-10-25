"use client";

import { Eye, Layers, X } from "lucide-react";
import { useState } from "react";
import { ErrorState } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { bazarFixtures } from "@/fixtures/bazar.fixtures";
import type {
  BazarData,
  BazarFilter,
  BazarSort,
} from "@/lib/types/bazar.types";
import { cn } from "@/lib/utils";
import { type BazarStateOptions, BazarView } from "./bazar-view";
import type { DialogTarget } from "./dialogs";
import { BazarSkeleton } from "./layout";

export type BazarScenarioKey =
  | "manager"
  | "member"
  | "addEntry"
  | "cellValidation"
  | "editEntry"
  | "deleteConfirm"
  | "filtered"
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
  data: BazarData;
  state?: BazarStateOptions;
  initialFilter?: BazarFilter;
  initialSort?: BazarSort;
  initialDialog?: DialogTarget;
  initialDeleteId?: string;
  listError?: boolean;
}

const EDIT_ID = "bz_2026-10-04_2";
const editEntry = bazarFixtures.manager.entries.find((e) => e.id === EDIT_ID);

const scenarioConfigs: Record<
  Exclude<BazarScenarioKey, "loading" | "pageError">,
  ScenarioConfig
> = {
  manager: {
    label: "Manager View",
    badge: "Active",
    data: bazarFixtures.manager,
  },
  member: {
    label: "Member View",
    badge: "Active",
    data: bazarFixtures.member,
  },
  addEntry: {
    label: "Add Entry Modal",
    badge: "Modal",
    data: bazarFixtures.manager,
    initialDialog: {},
  },
  cellValidation: {
    label: "Entry Validation Error",
    badge: "Validation",
    data: bazarFixtures.manager,
    initialDialog: {
      initialValues: { amount: "0", note: "Vegetables" },
      initialSubmitted: true,
    },
  },
  editEntry: {
    label: "Edit Entry Modal",
    badge: "Modal",
    data: bazarFixtures.manager,
    initialDialog: { entry: editEntry },
  },
  deleteConfirm: {
    label: "Delete Confirmation",
    badge: "Dialog",
    data: bazarFixtures.manager,
    initialDeleteId: EDIT_ID,
  },
  filtered: {
    label: "Filtered (Rahim Oct 5-31)",
    badge: "Filter",
    data: bazarFixtures.manager,
    initialFilter: {
      memberId: "m_rahim",
      from: "2026-10-05",
      to: "2026-10-31",
    },
  },
  closed: {
    label: "Closed Month (Manager)",
    badge: "Locked",
    data: bazarFixtures.closed,
  },
  closedMember: {
    label: "Closed Month (Member)",
    badge: "Locked",
    data: bazarFixtures.closedMember,
  },
  empty: {
    label: "Empty Month",
    badge: "0 Trips",
    data: bazarFixtures.empty,
  },
  noMonthManager: {
    label: "No Month (Manager)",
    badge: "Prompt",
    data: bazarFixtures.noMonthManager,
  },
  noMonthMember: {
    label: "No Month (Member)",
    badge: "Waiting",
    data: bazarFixtures.noMonthMember,
  },
  inlineError: {
    label: "Inline Entries Error",
    badge: "Error",
    data: bazarFixtures.manager,
    listError: true,
  },
  saveFailed: {
    label: "Save Failed Toast",
    badge: "Error Toast",
    data: bazarFixtures.manager,
    state: {
      failSaves: true,
      initialToast: "Couldn’t save. Try again.",
      initialFailedId: "bz_2026-10-30_15",
    },
  },
};

export function BazarScenarios() {
  const [active, setActive] = useState<BazarScenarioKey>("manager");
  const [panelOpen, setPanelOpen] = useState(false);

  const isDev = process.env.NODE_ENV !== "production";

  return (
    <>
      {active === "loading" ? (
        <BazarSkeleton />
      ) : active === "pageError" ? (
        <Card className="p-6">
          <ErrorState
            variant="page"
            title="Failed to load bazar registry"
            description="Could not reach the expenses service. Please check your network."
          />
        </Card>
      ) : (
        <BazarView
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
                  Bazar Scenarios
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
                    "addEntry",
                    "cellValidation",
                    "editEntry",
                    "deleteConfirm",
                    "filtered",
                    "closed",
                    "closedMember",
                    "empty",
                    "noMonthManager",
                    "noMonthMember",
                    "loading",
                    "inlineError",
                    "saveFailed",
                    "pageError",
                  ] as BazarScenarioKey[]
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
