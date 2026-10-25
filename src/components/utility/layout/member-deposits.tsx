import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { formatBDT } from "@/lib/format";
import type { UtilityData } from "@/lib/types/utility.types";
import { depositedBy } from "@/lib/utility";

/** Who has put money into the fund this month. */
export function MemberDeposits({ data }: { data: UtilityData }) {
  const active = data.members.filter((m) => m.status === "ACTIVE");
  return (
    <Card className="gap-0">
      <CardHeader>
        <CardTitle>Deposits by member</CardTitle>
      </CardHeader>
      <ul className="grid gap-px border-t border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {active.map((m) => {
          const total = depositedBy(data.entries, m.id);
          return (
            <li
              key={m.id}
              className="flex min-h-16 items-center gap-3 bg-surface px-4 py-3"
            >
              <Avatar name={m.name} size="md" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-body-sm font-medium text-ink">
                  {m.name}
                  {m.id === data.viewer.memberId ? " (you)" : ""}
                </p>
                <p className="text-body-sm text-ink-muted tabular-nums">
                  {formatBDT(total)}
                </p>
              </div>
              {total === 0 && (
                <Badge variant="status-pending" size="sm">
                  None yet
                </Badge>
              )}
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
