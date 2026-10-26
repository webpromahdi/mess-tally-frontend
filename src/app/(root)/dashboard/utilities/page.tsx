import { Wallet } from "lucide-react";
import type { Metadata } from "next";
import { NotConnectedState } from "@/components/shared";

export const metadata: Metadata = {
  title: "Utility Bills & Advance Fund | MessTally",
  description:
    "Track deposits and utility bills, monitor remaining fund balance, and ensure smooth flat operations.",
};

export default function UtilitiesPage() {
  return (
    <NotConnectedState
      title="Utility Fund"
      description="The utility fund design is ready, but it isn't connected to your mess data yet. Real deposits and bills will appear here once this module is wired."
      icon={<Wallet />}
    />
  );
}
