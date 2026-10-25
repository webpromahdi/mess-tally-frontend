import { UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { activeMembers, pluralMembers } from "@/lib/members";
import type { MembersData } from "@/lib/types/member.types";

export function MembersHeader({
  data,
  onInvite,
}: {
  data: MembersData;
  onInvite?: () => void;
}) {
  const count = activeMembers(data).length;
  return (
    <header className="flex flex-wrap items-end justify-between gap-3">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h1 className="text-h1 text-ink">Members</h1>
          <Badge variant="neutral" size="sm">
            {count}
          </Badge>
        </div>
        <p className="mt-1 text-body-sm text-ink-muted">
          {pluralMembers(count)} in {data.mess.name}
        </p>
      </div>
      <Button variant="primary" onClick={onInvite}>
        <UserPlus className="size-4" />
        Invite
      </Button>
    </header>
  );
}
