import type { Metadata } from "next";
import { ProfilePage } from "@/components/profile";

export const metadata: Metadata = {
  title: "Profile | MessTally",
  description: "Manage your MessTally profile information.",
};

export default function ProfileRoute() {
  return <ProfilePage />;
}
