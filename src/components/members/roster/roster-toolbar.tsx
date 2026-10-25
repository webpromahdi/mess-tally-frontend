import { Search } from "lucide-react";
import { NativeSelect } from "@/components/shared";
import { Input } from "@/components/ui/input";
import type {
  MemberStatusFilter,
  MembersFilter,
} from "@/lib/types/member.types";

export function RosterToolbar({
  filter,
  canSeeRejected,
  onChange,
}: {
  filter: MembersFilter;
  canSeeRejected: boolean;
  onChange: (next: MembersFilter) => void;
}) {
  return (
    <div className="flex flex-col gap-3 border-t border-line p-4 sm:flex-row">
      <div className="relative flex-1">
        <Search
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-muted"
        />
        <Input
          type="search"
          aria-label="Search members"
          placeholder="Search by name"
          value={filter.query}
          onChange={(e) => onChange({ ...filter, query: e.target.value })}
          className="pl-9"
        />
      </div>
      <div className="sm:w-48">
        <NativeSelect
          aria-label="Filter by status"
          value={filter.status}
          onChange={(e) =>
            onChange({
              ...filter,
              status: e.target.value as MemberStatusFilter,
            })
          }
        >
          <option value="ACTIVE">Active</option>
          <option value="LEFT">Left</option>
          {canSeeRejected && <option value="REJECTED">Rejected</option>}
          <option value="all">All</option>
        </NativeSelect>
      </div>
    </div>
  );
}
