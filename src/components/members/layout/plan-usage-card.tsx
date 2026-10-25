import { Progress } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Card, Eyebrow } from "@/components/ui/card";
import { activeMembers } from "@/lib/members";
import type { MembersData } from "@/lib/types/member.types";

export function PlanUsageCard({ data }: { data: MembersData }) {
  const count = activeMembers(data).length;
  const cap = data.mess.memberCap;
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between gap-2">
        <Eyebrow>Plan usage</Eyebrow>
        <Badge
          variant={data.mess.plan === "PRO" ? "plan-pro" : "plan-free"}
          size="sm"
        >
          {data.mess.plan === "PRO" ? "Pro" : "Free"}
        </Badge>
      </div>
      <p className="mt-2 text-h3 text-ink tabular-nums">
        {count} of {cap} members
      </p>
      <Progress
        value={Math.min(100, (count / cap) * 100)}
        label="Members used"
        className="mt-3"
      />
    </Card>
  );
}
