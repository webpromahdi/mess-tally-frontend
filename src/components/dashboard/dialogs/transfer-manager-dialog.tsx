"use client";

import {
  ArrowRightLeft,
  Check,
  Loader2,
  ShieldAlert,
  Users,
} from "lucide-react";
import * as React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { DrawerSheet } from "@/components/shared";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMediaQuery, useMessMembers, useTransferManager } from "@/hooks";
import { getApiMessage } from "@/lib/apiError";
import { cn } from "@/lib/utils";

export interface TransferManagerDialogProps {
  open: boolean;
  onClose: () => void;
  currentManagerName?: string;
}

export function TransferManagerDialog({
  open,
  onClose,
  currentManagerName,
}: TransferManagerDialogProps) {
  const desktop = useMediaQuery("(min-width: 768px)");
  const { data: membersData, isLoading, refetch } = useMessMembers("ACTIVE");
  const transferMutation = useTransferManager();

  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Refetch members when dialog opens to ensure fresh data
  React.useEffect(() => {
    if (open) {
      refetch();
    }
  }, [open, refetch]);

  const members = membersData?.data.members ?? [];

  // Debug: Log members data when dialog opens
  React.useEffect(() => {
    if (open && members.length > 0) {
      console.log("Transfer Manager Dialog - All members:", members.map(m => ({
        id: m.id,
        name: m.name,
        isManager: m.isManager,
        status: m.status,
        role: m.role,
      })));
      console.log("Total members:", members.length);
      console.log("Members with isManager=true:", members.filter(m => m.isManager).length);
      console.log("Members with isManager=false:", members.filter(m => !m.isManager).length);
    }
  }, [open, members]);

  const eligibleMembers = members.filter((m) => !m.isManager);

  const selectedMember = eligibleMembers.find((m) => m.id === selectedId);

  const handleClose = () => {
    if (transferMutation.isPending) return;
    setSelectedId(null);
    onClose();
  };

  const handleTransfer = async () => {
    if (!selectedId || !selectedMember) return;

    try {
      await transferMutation.mutateAsync(selectedId);
      toast.success(`Manager position transferred to ${selectedMember.name}.`);
      handleClose();
    } catch (error) {
      toast.error(getApiMessage(error, "Failed to transfer manager position."));
    }
  };

  return (
    <DrawerSheet
      open={open}
      onClose={handleClose}
      side={desktop ? "center" : "bottom"}
      title="Transfer manager role"
      hideTitle
      showClose={!transferMutation.isPending}
      className="bg-surface pb-[env(safe-area-inset-bottom)]"
    >
      <div className="flex flex-col gap-4 p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-start gap-3">
          <span
            aria-hidden
            className="grid size-10 shrink-0 place-items-center rounded-full bg-aubergine-50 text-aubergine-800"
          >
            <ArrowRightLeft className="size-5" />
          </span>
          <div className="min-w-0">
            <h3 className="text-h3 text-ink">Transfer manager role</h3>
            <p className="mt-0.5 text-body-sm text-ink-muted">
              Choose an active member to take over manager responsibilities
              {currentManagerName ? ` from ${currentManagerName}` : ""}.
            </p>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex flex-col gap-2 py-2">
            <div className="h-14 animate-pulse rounded-xl bg-silver-100" />
            <div className="h-14 animate-pulse rounded-xl bg-silver-100" />
            <div className="h-14 animate-pulse rounded-xl bg-silver-100" />
          </div>
        ) : eligibleMembers.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-line bg-canvas p-6 text-center">
            <div className="grid size-11 place-items-center rounded-full bg-silver-200 text-ink-muted">
              <Users className="size-5" />
            </div>
            <p className="mt-3 text-body-sm font-semibold text-ink">
              No other active members
            </p>
            <p className="mt-1 text-caption text-ink-muted">
              You are currently the only active member in this mess. Another
              active member must join before you can transfer manager duties.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex max-h-60 flex-col gap-2 overflow-y-auto pr-0.5">
              {eligibleMembers.map((member) => {
                const isSelected = member.id === selectedId;
                return (
                  <button
                    key={member.id}
                    type="button"
                    aria-pressed={isSelected}
                    disabled={transferMutation.isPending}
                    onClick={() => setSelectedId(member.id)}
                    className={cn(
                      "flex min-h-12 w-full cursor-pointer items-center justify-between gap-3 rounded-xl border p-3 text-left transition-colors",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aubergine-500",
                      isSelected
                        ? "border-aubergine-800 bg-aubergine-50/70"
                        : "border-line bg-surface hover:border-silver-500 hover:bg-canvas/50",
                    )}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <Avatar name={member.name} size="sm" />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="truncate text-body-sm font-semibold text-ink">
                            {member.name}
                          </span>
                          {member.role === "OWNER" && (
                            <Badge variant="role-owner" size="sm">
                              Owner
                            </Badge>
                          )}
                        </div>
                        <span className="block truncate text-caption text-ink-muted">
                          {member.email}
                        </span>
                      </div>
                    </div>

                    <span
                      className={cn(
                        "grid size-5 shrink-0 place-items-center rounded-full border transition-colors",
                        isSelected
                          ? "border-aubergine-800 bg-aubergine-800 text-white"
                          : "border-line-strong bg-surface",
                      )}
                    >
                      {isSelected && <Check className="size-3 stroke-[3]" />}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Warning Callout when member is selected */}
            {selectedMember && (
              <div className="flex items-start gap-2.5 rounded-xl border border-warning/40 bg-warning-surface p-3 text-body-sm text-warning">
                <ShieldAlert className="mt-0.5 size-4 shrink-0 text-warning" />
                <div className="min-w-0 text-caption">
                  <p className="font-semibold text-warning">
                    Confirm manager transfer
                  </p>
                  <p className="mt-0.5 text-warning/90">
                    <strong>{selectedMember.name}</strong> will take over
                    managing meals, bazar entries, deposits, and members. You
                    will lose manager access immediately.
                  </p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                disabled={transferMutation.isPending}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                disabled={!selectedId || transferMutation.isPending}
                onClick={handleTransfer}
              >
                {transferMutation.isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Transferring...</span>
                  </>
                ) : (
                  <span>
                    {selectedMember
                      ? `Transfer to ${selectedMember.name.split(" ")[0]}`
                      : "Transfer manager"}
                  </span>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </DrawerSheet>
  );
}
