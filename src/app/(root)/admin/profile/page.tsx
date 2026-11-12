import type { Metadata } from "next";
import { ProfilePage } from "@/components/profile";

export const metadata: Metadata = {
  title: "Profile | MessTally Admin",
  description: "Manage your MessTally profile information.",
};

// Same profile screen as /dashboard/profile, but inside the admin shell,
// which (unlike the dashboard shell) doesn't require a mess.
export default function AdminProfileRoute() {
  return <ProfilePage />;
}
