"use client";

import { Eye, Layers, X } from "lucide-react";
import { useState } from "react";
import { ErrorState } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { dashboardFixtures } from "@/fixtures/dashboard.fixtures";
import type { DashboardData } from "@/lib/types/dashboard.types";
import { cn } from "@/lib/utils";
import { DashboardView } from "./dashboard-view";
import { DashboardSkeleton } from "./layout";

export type ScenarioKey =
  | "manager"
  | "member"
  | "closed"
  | "replenish"
  | "empty"
  | "noMonthManager"
  | "noMonthMember"
  | "skeleton"
  | "inlineError"
  | "pageError";

const scenarioLabels: Record<ScenarioKey, string> = {
  manager: "Manager (Active)",
  member: "Member (Giver)",
  closed: "Closed Month",
  replenish: "Replenish Fund",
  empty: "Empty Month",
  noMonthManager: "No Month (Mgr)",
  noMonthMember: "No Month (Mbr)",
  skeleton: "Loading Skeleton",
  inlineError: "Inline Error",
  pageError: "Page Error",
};

interface DashboardScenariosProps {
  initialScenario?: ScenarioKey;
  onScenarioChange?: (data: DashboardData) => void;
}

export function DashboardScenarios({
  initialScenario = "manager",
  onScenarioChange,
}: DashboardScenariosProps) {
  const [currentScenario, setCurrentScenario] =
    useState<ScenarioKey>(initialScenario);
  const [toolbarOpen, setToolbarOpen] = useState(false);

  const selectScenario = (key: ScenarioKey) => {
    setCurrentScenario(key);
    if (key in dashboardFixtures && onScenarioChange) {
      onScenarioChange(dashboardFixtures[key]);
    }
  };

  // Render the corresponding scenario screen
  const renderScreen = () => {
    switch (currentScenario) {
      case "skeleton":
        return <DashboardSkeleton />;
      case "pageError":
        return (
          <Card className="p-4 sm:p-6">
            <ErrorState variant="page" />
          </Card>
        );
      case "inlineError":
        return (
          <DashboardView
            data={dashboardFixtures.manager}
            errors={["memberBalances", "fund"]}
          />
        );
      case "empty":
        return <DashboardView data={dashboardFixtures.empty} formulaOpen />;
      default:
        return (
          <DashboardView
            data={
              dashboardFixtures[currentScenario] || dashboardFixtures.manager
            }
          />
        );
    }
  };

  // Only render the preview toolbar in development mode
  const isDev = process.env.NODE_ENV !== "production";

  return (
    <div className="relative min-w-0">
      {renderScreen()}

      {isDev && (
        <aside
          aria-label="Development Scenario Switcher"
          className="fixed right-4 bottom-20 z-50 flex flex-col items-end gap-2 lg:bottom-6"
        >
          {toolbarOpen ? (
            <div className="flex max-h-[80vh] w-72 flex-col gap-2 rounded-2xl border border-line bg-surface/95 p-3.5 shadow-pop backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-line pb-2">
                <span className="flex items-center gap-1.5 text-caption font-bold tracking-wider text-aubergine-800 uppercase">
                  <Layers className="size-4" />
                  Dev Scenarios
                </span>
                <button
                  type="button"
                  onClick={() => setToolbarOpen(false)}
                  aria-label="Close scenario toolbar"
                  className="rounded-lg p-1 text-ink-muted hover:bg-gray-100 hover:text-ink"
                >
                  <X className="size-4" />
                </button>
              </div>
              <div className="flex flex-col gap-1 overflow-y-auto pr-1">
                {(Object.keys(scenarioLabels) as ScenarioKey[]).map((key) => {
                  const isActive = currentScenario === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => selectScenario(key)}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-2.5 py-1.5 text-left text-body-sm font-medium transition-colors",
                        isActive
                          ? "bg-aubergine-800 text-white font-semibold"
                          : "text-ink-muted hover:bg-aubergine-50 hover:text-ink",
                      )}
                    >
                      <span>{scenarioLabels[key]}</span>
                      {isActive && (
                        <span className="size-1.5 rounded-full bg-marigold-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setToolbarOpen(true)}
              aria-label="Open Scenario Preview Toolbar"
              className="rounded-full shadow-pop border border-white/20 bg-aubergine-800 text-white hover:bg-aubergine-900"
            >
              <Eye className="size-4 text-marigold-400" />
              <span className="text-caption font-bold tracking-wider uppercase">
                {scenarioLabels[currentScenario]}
              </span>
            </Button>
          )}
        </aside>
      )}
    </div>
  );
}
