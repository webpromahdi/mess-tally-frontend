import type { Metadata } from "next";
import { BazarScenarios } from "@/components/bazar";

export const metadata: Metadata = {
  title: "Bazar & Grocery Expenses | MessTally",
  description:
    "Log grocery runs, track who paid, and see the house meal rate calculate in real time.",
};

export default function BazarPage() {
  return <BazarScenarios />;
}
