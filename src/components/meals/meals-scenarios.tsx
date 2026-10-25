"use client";

import { Eye, Layers, X } from "lucide-react";
import { useState } from "react";
import { ErrorState } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { mealFixtures } from "@/fixtures/meal.fixtures";
import type { MealsGridData } from "@/lib/types/meal.types";
import { cn } from "@/lib/utils";
import { MealsSkeleton } from "./layout";
import { MealsView } from "./meals-view";

export type MealScenarioKey =
  | "manager"
  | "member"
  | "cellEditor"
  | "cellValidation"
  | "dailyEntry"
  | "backdated"
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
  data: MealsGridData;
  initialEditor?: { memberId: string; date: string };
  initialEditorValues?: Record<string, string>;
  initialDayDate?: string;
  gridError?: boolean;
  failedKey?: string | null;
  initialToast?: string | null;
}

const scenarioConfigs: Record<
  Exclude<MealScenarioKey, "loading" | "pageError">,
  ScenarioConfig
> = {
  manager: {
    label: "Manager View",
    badge: "Active",
    data: mealFixtures.manager,
  },
  member: {
    label: "Member View",
    badge: "Active",
    data: mealFixtures.member,
  },
  cellEditor: {
    label: "Cell Editor Popover",
    badge: "Editor",
    data: mealFixtures.manager,
    initialEditor: { memberId: "m_rahim", date: "2026-10-29" },
  },
  cellValidation: {
    label: "Cell Validation Error",
    badge: "Negative Val",
    data: mealFixtures.manager,
    initialEditor: { memberId: "m_rahim", date: "2026-10-29" },
    initialEditorValues: { lunch: "-1" },
  },
  dailyEntry: {
    label: "Daily Bulk Entry Modal",
    badge: "Modal",
    data: mealFixtures.manager,
    initialDayDate: "2026-10-31",
  },
  backdated: {
    label: "Backdated Edit Hint",
    badge: "History",
    data: mealFixtures.manager,
    initialEditor: { memberId: "m_rahim", date: "2026-10-12" },
  },
  closed: {
    label: "Closed Month (Manager)",
    badge: "Locked",
    data: mealFixtures.closed,
  },
  closedMember: {
    label: "Closed Month (Member)",
    badge: "Locked",
    data: mealFixtures.closedMember,
  },
  empty: {
    label: "Empty Month",
    badge: "0 Meals",
    data: mealFixtures.empty,
  },
  noMonthManager: {
    label: "No Month (Manager)",
    badge: "Prompt",
    data: mealFixtures.noMonthManager,
  },
  noMonthMember: {
    label: "No Month (Member)",
    badge: "Waiting",
    data: mealFixtures.noMonthMember,
  },
  inlineError: {
    label: "Inline Grid Error",
    badge: "Failed Grid",
    data: mealFixtures.manager,
    gridError: true,
  },
  saveFailed: {
    label: "Save Failed Toast",
    badge: "Error Toast",
    data: mealFixtures.manager,
    initialToast: "Couldn’t save. Try again.",
    failedKey: "m_rahim|2026-10-31",
  },
};

export function MealsScenarios() {
  const [active, setActive] = useState<MealScenarioKey>("manager");
  const [panelOpen, setPanelOpen] = useState(false);

  const isDev = process.env.NODE_ENV !== "production";

  return (
    <>
      {active === "loading" ? (
        <MealsSkeleton />
      ) : active === "pageError" ? (
        <Card className="p-6">
          <ErrorState
            variant="page"
            title="Failed to load meal spreadsheet"
            description="Could not reach the meal service. Please check your network."
          />
        </Card>
      ) : (
        <MealsView
          key={active}
          data={scenarioConfigs[active].data}
          initialEditor={scenarioConfigs[active].initialEditor}
          initialEditorValues={scenarioConfigs[active].initialEditorValues}
          initialDayDate={scenarioConfigs[active].initialDayDate}
          gridError={scenarioConfigs[active].gridError}
          failedKey={scenarioConfigs[active].failedKey}
          initialToast={scenarioConfigs[active].initialToast}
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
                  Meal Scenarios
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
                    "cellEditor",
                    "cellValidation",
                    "dailyEntry",
                    "backdated",
                    "closed",
                    "closedMember",
                    "empty",
                    "noMonthManager",
                    "noMonthMember",
                    "loading",
                    "inlineError",
                    "saveFailed",
                    "pageError",
                  ] as MealScenarioKey[]
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
