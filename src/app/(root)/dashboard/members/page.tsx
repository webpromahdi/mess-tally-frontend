import { Users } from "lucide-react";
import type { Metadata } from "next";
import { NotConnectedState } from "@/components/shared";

export const metadata: Metadata = {
  title: "Members & Roles Management | MessTally",
  description:
    "Manage mess members, review join requests, delegate manager roles, and invite flatmates.",
};

export default function MembersPage() {
  return (
    <NotConnectedState
      title="Members & Roles"
      description="The member management design is ready, but it isn't connected to your mess data yet. Your real roster and join requests will appear here once this module is wired."
      icon={<Users />}
    />
  );
}
