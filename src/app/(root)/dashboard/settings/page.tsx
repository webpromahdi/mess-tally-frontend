import type { Metadata } from "next";
import { SettingsPage } from "@/components/settings";

export const metadata: Metadata = {
  title: "Settings | MessTally",
  description: "Mess, month, and member preferences.",
};

export default function SettingsRoute() {
  return <SettingsPage />;
}
