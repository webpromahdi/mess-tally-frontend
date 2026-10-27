import type { Metadata } from "next";
import { MealsPage } from "@/components/meals";

export const metadata: Metadata = {
  title: "Daily Meals Matrix | MessTally",
  description:
    "Track and log daily meal attendance for your flatmates across the active month.",
};

export default function Page() {
  return <MealsPage />;
}
