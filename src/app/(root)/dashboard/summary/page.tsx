import type { Metadata } from "next";
import { SummaryPage } from "@/components/summary";

export const metadata: Metadata = {
  title: "Monthly Summary & Settlement | MessTally",
  description:
    "Review meal totals, individual member balances, utility fund standing, and settlement transfers.",
};

export default function SummaryRoute() {
  return <SummaryPage />;
}
