"use client";

import { Eye, Layers, X } from "lucide-react";
import { useState } from "react";
import { ErrorState } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { summaryFixtures } from "@/fixtures/summary.fixtures";
import type { SummaryData, SummarySort } from "@/lib/types/summary.types";
import { cn } from "@/lib/utils";
import { SummarySkeleton } from "./layout";
import { SummaryView } from "./summary-view";

export type SummaryScenarioKey =
  | "manager"
  | "member"
  | "settlement"
  | "sorted"
  | "formulaOpen"
  | "closed"
  | "closedMember"
  | "zeroMeals"
  | "allSettled"
  | "replenish"
  | "noMonthManager"
  | "noMonthMember"
  | "loading"
  | "inlineError"
  | "pageError";

interface ScenarioConfig {
  label: string;
  badge?: string;
  data: SummaryData;
  initialSort?: SummarySort;
  formulaOpen?: boolean;
  fundError?: boolean;
}

const scenarioConfigs: Record<
  Exclude<SummaryScenarioKey, "loading" | "pageError">,
  ScenarioConfig
> = {
  manager: {
    label: "Manager View",
    badge: "Active",
    data: summaryFixtures.manager,
  },
  member: {
    label: "Member View",
    badge: "Highlighted",
    data: summaryFixtures.member,
  },
  settlement: {
    label: "Settlement Grid",
    badge: "Who Pays Whom",
    data: summaryFixtures.manager,
  },
  sorted: {
    label: "Sorted by Balance",
    badge: "Ascending",
    data: summaryFixtures.manager,
    initialSort: { key: "balance", dir: "asc" },
  },
  formulaOpen: {
    label: "Formula Explainer",
    badge: "Expanded",
    data: summaryFixtures.manager,
    formulaOpen: true,
  },
  closed: {
    label: "Closed Month (Manager)",
    badge: "Final",
    data: summaryFixtures.closed,
  },
  closedMember: {
    label: "Closed Month (Member)",
    badge: "Final",
    data: summaryFixtures.closedMember,
  },
  zeroMeals: {
    label: "Zero Meals State",
    badge: "Empty",
    data: summaryFixtures.zeroMeals,
  },
  allSettled: {
    label: "All Settled State",
    badge: "Square",
    data: summaryFixtures.allSettled,
  },
  replenish: {
    label: "Fund Replenish Warning",
    badge: "Needs Top-Up",
    data: summaryFixtures.replenish,
  },
  noMonthManager: {
    label: "No Month (Manager)",
    badge: "CTA",
    data: summaryFixtures.noMonthManager,
  },
  noMonthMember: {
    label: "No Month (Member)",
    badge: "Waiting",
    data: summaryFixtures.noMonthMember,
  },
  inlineError: {
    label: "Inline Fund Error",
    badge: "Partial Error",
    data: summaryFixtures.manager,
    fundError: true,
  },
};

export function SummaryScenarios() {
  const [active, setActive] = useState<SummaryScenarioKey>("manager");
  const [panelOpen, setPanelOpen] = useState(false);

  const isDev = process.env.NODE_ENV !== "production";

  return (
    <>
      {active === "loading" ? (
        <SummarySkeleton />
      ) : active === "pageError" ? (
        <Card className="p-6">
          <ErrorState
            variant="page"
            title="Failed to load monthly summary"
            description="Could not connect to the summary service. Please check your connection."
          />
        </Card>
      ) : (
        <SummaryView
          key={active}
          data={scenarioConfigs[active].data}
          initialSort={scenarioConfigs[active].initialSort}
          formulaOpen={scenarioConfigs[active].formulaOpen}
          fundError={scenarioConfigs[active].fundError}
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
                  Summary Scenarios
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
                    "settlement",
                    "sorted",
                    "formulaOpen",
                    "closed",
                    "closedMember",
                    "zeroMeals",
                    "allSettled",
                    "replenish",
                    "noMonthManager",
                    "noMonthMember",
                    "loading",
                    "inlineError",
                    "pageError",
                  ] as SummaryScenarioKey[]
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
