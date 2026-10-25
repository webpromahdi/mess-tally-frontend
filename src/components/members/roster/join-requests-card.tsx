import { Check, UserCheck, X } from "lucide-react";
import { EmptyState, ErrorState, IconTile } from "@/components/shared";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { MemberRecord } from "@/lib/types/member.types";
import { cn } from "@/lib/utils";

/** Manager-only list of people waiting to join with the room code. */
export function JoinRequestsCard({
  requests,
  atCap,
  error,
  saving,
  failedId,
  onApprove,
  onReject,
}: {
  requests: MemberRecord[];
  atCap: boolean;
  error?: boolean;
  saving: ReadonlySet<string>;
  failedId: string | null;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) {
  return (
    <Card id="requests" className="scroll-mt-20 overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Join requests</CardTitle>
          {!error && requests.length > 0 && (
            <Badge variant="status-pending" size="sm">
              {requests.length}
            </Badge>
          )}
        </div>
      </CardHeader>
      {error ? (
        <ErrorState
          title="Couldn’t load join requests"
          description="The roster below is fine. Check your connection and try again."
        />
      ) : requests.length === 0 ? (
        <EmptyState
          icon={
            <IconTile tone="neutral" size="lg">
              <UserCheck className="size-6" />
            </IconTile>
          }
          title="No pending requests"
          description="New join requests show up here when someone enters your room code."
        />
      ) : (
        <ul>
          {requests.map((r) => {
            const busy = saving.has(r.id);
            return (
              <li
                key={r.id}
                className={cn(
                  "flex min-h-18 flex-wrap items-center gap-3 border-t border-line px-4 py-3",
                  busy && "opacity-60",
                  failedId === r.id && "bg-error-surface",
                )}
              >
                <Avatar name={r.name} size="md" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-body font-medium text-ink">
                    {r.name}
                  </span>
                  <span className="block text-body-sm text-ink-muted">
                    Requested {r.requestedLabel?.toLowerCase()}
                    {failedId === r.id && (
                      <span className="text-error">
                        {" "}
                        · Couldn’t save. Try again.
                      </span>
                    )}
                  </span>
                </span>
                <span className="flex gap-2">
                  <Button
                    variant="outline"
                    disabled={busy}
                    onClick={() => onReject(r.id)}
                    aria-label={`Reject ${r.name}`}
                  >
                    <X className="size-4" />
                    Reject
                  </Button>
                  <Button
                    variant="primary"
                    disabled={busy || atCap}
                    onClick={() => onApprove(r.id)}
                    aria-label={`Approve ${r.name}`}
                  >
                    <Check className="size-4" />
                    Approve
                  </Button>
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
