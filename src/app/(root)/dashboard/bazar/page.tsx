import { ShoppingBasket } from "lucide-react";
import type { Metadata } from "next";
import { NotConnectedState } from "@/components/shared";

export const metadata: Metadata = {
  title: "Bazar & Grocery Expenses | MessTally",
  description:
    "Log grocery runs, track who paid, and see the house meal rate calculate in real time.",
};

export default function BazarPage() {
  return (
    <NotConnectedState
      title="Bazar Expenses"
      description="The bazar log design is ready, but it isn't connected to your mess data yet. Real grocery trips and payments will appear here once this module is wired."
      icon={<ShoppingBasket />}
    />
  );
}
