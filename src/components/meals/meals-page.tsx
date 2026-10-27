"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { EmptyState, ErrorState, IconTile } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  useBulkMeals,
  useDeleteMeal,
  useMeals,
  useUpsertMeal,
  useWorkspace,
} from "@/hooks";
import { isUpgradeRequired } from "@/lib/apiError";
import { todayIso } from "@/lib/dates";
import { toMealsGridData } from "@/lib/mappers/meals.mapper";
import type { UpsertMealInput } from "@/lib/types";
import { useMonthStore } from "@/store";
import { bulkMealsInputSchema, mealEntrySchema } from "@/validations";
import { MealsSkeleton } from "./layout";
import { MealsView } from "./meals-view";

function parseCell(input: UpsertMealInput) {
  const parsed = mealEntrySchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(
      parsed.error.errors[0]?.message ?? "Check the meal counts and try again.",
    );
  }
  return parsed.data;
}

function UpgradeState() {
  return (
    <Card className="p-4 sm:p-6">
      <EmptyState
        size="lg"
        icon={
          <IconTile tone="marigold" size="lg">
            <Sparkles />
          </IconTile>
        }
        title="This month's meal sheet is archived"
        description="Past-month archives are part of MessTally PRO. The current month stays free, and upgrading unlocks every closed month and PDF statement."
        actions={
          <Button variant="accent" asChild>
            <Link href="/dashboard/settings">
              <Sparkles />
              Upgrade to PRO
            </Link>
          </Button>
        }
      />
    </Card>
  );
}

export function MealsPage() {
  const selectedMonth = useMonthStore((s) => s.selectedMonth);
  const workspace = useWorkspace(selectedMonth);
  const mealsQuery = useMeals(selectedMonth);
  const upsertMeal = useUpsertMeal();
  const bulkMeals = useBulkMeals();
  const deleteMeal = useDeleteMeal();
  const today = todayIso();

  const data = useMemo(() => {
    if (
      !workspace.viewer ||
      !workspace.mess ||
      !workspace.dashboard ||
      !mealsQuery.data?.data
    ) {
      return null;
    }
    return toMealsGridData({
      viewer: workspace.viewer,
      mess: workspace.mess,
      dashboard: workspace.dashboard,
      members: workspace.members,
      meals: mealsQuery.data.data,
      today,
    });
  }, [
    workspace.viewer,
    workspace.mess,
    workspace.dashboard,
    workspace.members,
    mealsQuery.data,
    today,
  ]);

  const refetch = () =>
    Promise.all([workspace.refetch(), mealsQuery.refetch()]);

  const handleSaveCell = async (input: UpsertMealInput) => {
    await upsertMeal.mutateAsync(parseCell(input));
  };

  const handleClearCell = async (entryId: string | null) => {
    if (entryId) await deleteMeal.mutateAsync(entryId);
  };

  const handleSaveBulk = async (inputs: UpsertMealInput[]) => {
    const first = inputs[0];
    if (!first) return;
    const parsed = bulkMealsInputSchema.safeParse({
      date: first.date,
      entries: inputs.map(
        ({ memberId, breakfast, lunch, dinner, guestMeals }) => ({
          memberId,
          breakfast,
          lunch,
          dinner,
          guestMeals,
        }),
      ),
    });
    if (!parsed.success) {
      throw new Error(
        parsed.error.errors[0]?.message ??
          "Check the daily sheet and try again.",
      );
    }
    await bulkMeals.mutateAsync(parsed.data);
  };

  // A 402 from either query means the selected month is PRO-only.
  if (
    isUpgradeRequired(mealsQuery.error) ||
    isUpgradeRequired(workspace.queries.dashboard.error)
  ) {
    return <UpgradeState />;
  }

  if (workspace.isLoading || mealsQuery.isPending) return <MealsSkeleton />;

  if (!data) {
    return (
      <Card>
        <ErrorState
          title="Couldn't load the meal sheet"
          description="Check your connection and try again."
          onRetry={() => void refetch()}
        />
      </Card>
    );
  }

  return (
    <MealsView
      data={data}
      onSaveCell={handleSaveCell}
      onClearCell={handleClearCell}
      onSaveBulk={handleSaveBulk}
    />
  );
}
