import type { Metadata } from "next";
import { MealsScenarios } from "@/components/meals/meals-scenarios";

export const metadata: Metadata = {
  title: "Daily Meals Matrix | MessTally",
  description:
    "Track and log daily meal attendance for your flatmates across the active month.",
};

export default function MealsPage() {
  return <MealsScenarios />;
}
