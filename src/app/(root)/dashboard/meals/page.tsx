import { Utensils } from "lucide-react";
import type { Metadata } from "next";
import { NotConnectedState } from "@/components/shared";

export const metadata: Metadata = {
  title: "Daily Meals Matrix | MessTally",
  description:
    "Track and log daily meal attendance for your flatmates across the active month.",
};

export default function MealsPage() {
  return (
    <NotConnectedState
      title="Daily Meals"
      description="The meal matrix design is ready, but it isn't connected to your mess data yet. Live meal counts will appear here once this module is wired."
      icon={<Utensils />}
    />
  );
}
