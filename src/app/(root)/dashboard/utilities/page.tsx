import type { Metadata } from "next";
import { UtilityScenarios } from "@/components/utility";

export const metadata: Metadata = {
  title: "Utility Bills & Advance Fund | MessTally",
  description:
    "Track deposits and utility bills, monitor remaining fund balance, and ensure smooth flat operations.",
};

export default function UtilitiesPage() {
  return <UtilityScenarios />;
}
