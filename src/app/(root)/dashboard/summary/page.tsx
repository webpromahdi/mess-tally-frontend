import { FileText } from "lucide-react";
import type { Metadata } from "next";
import { NotConnectedState } from "@/components/shared";

export const metadata: Metadata = {
  title: "Monthly Summary & Settlement | MessTally",
  description:
    "Review meal totals, individual member balances, utility fund standing, and settlement transfers.",
};

export default function SummaryPage() {
  return (
    <NotConnectedState
      title="Monthly Summary"
      description="The summary and settlement design is ready, but it isn't connected to your mess data yet. Live totals and transfers will appear here once this module is wired."
      icon={<FileText />}
    />
  );
}
