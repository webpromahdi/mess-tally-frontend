import type { Metadata } from "next";
import { MembersScenarios } from "@/components/members";

export const metadata: Metadata = {
  title: "Members & Roles Management | MessTally",
  description:
    "Manage mess members, review join requests, delegate manager roles, and invite flatmates.",
};

export default function MembersPage() {
  return <MembersScenarios />;
}
