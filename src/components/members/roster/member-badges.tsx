import { Badge } from "@/components/ui/badge";
import type { MemberRecord } from "@/lib/types/member.types";

export function RoleBadge({ member }: { member: MemberRecord }) {
  if (member.role === "OWNER") {
    return (
      <Badge variant="role-owner" size="sm">
        Owner
      </Badge>
    );
  }
  return member.isManager ? (
    <Badge variant="role-manager" size="sm">
      Manager
    </Badge>
  ) : (
    <Badge variant="role-member" size="sm">
      Member
    </Badge>
  );
}

export function StatusBadge({ status }: { status: MemberRecord["status"] }) {
  if (status === "ACTIVE") {
    return (
      <Badge variant="status-active" size="sm">
        Active
      </Badge>
    );
  }
  if (status === "PENDING") {
    return (
      <Badge variant="status-pending" size="sm">
        Pending
      </Badge>
    );
  }
  if (status === "REJECTED") {
    return (
      <Badge variant="status-rejected" size="sm">
        Rejected
      </Badge>
    );
  }
  return (
    <Badge variant="neutral" size="sm">
      Left
    </Badge>
  );
}
