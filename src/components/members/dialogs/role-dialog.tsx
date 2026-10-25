"use client";

import { useState } from "react";
import { DrawerSheet } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks";
import type { MemberRecord } from "@/lib/types/member.types";
import { cn } from "@/lib/utils";

interface RoleOption {
  manager: boolean;
  label: string;
  description: string;
}

const options: RoleOption[] = [
  {
    manager: false,
    label: "Member",
    description: "Can see everything and log their own meals.",
  },
  {
    manager: true,
    label: "Manager",
    description:
      "Can edit meals, bazar and utility, approve requests and manage members.",
  },
];

function RoleForm({
  member,
  onSave,
  onClose,
}: {
  member: MemberRecord;
  onSave: (isManager: boolean) => void;
  onClose: () => void;
}) {
  const [manager, setManager] = useState(member.isManager);
  const unchanged = manager === member.isManager;
  return (
    <div className="flex flex-col gap-4 p-5">
      <div>
        <h3 className="text-h3 text-ink">Change role</h3>
        <p className="mt-1 text-body-sm text-ink-muted">
          Choose what {member.name} can do in this mess.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {options.map((o) => {
          const on = manager === o.manager;
          return (
            <button
              key={o.label}
              type="button"
              aria-pressed={on}
              onClick={() => setManager(o.manager)}
              className={cn(
                "flex min-h-16 flex-col items-start rounded-xl border p-3 text-left transition-colors",
                on
                  ? "border-aubergine-500 bg-aubergine-50"
                  : "border-line hover:border-silver-400",
              )}
            >
              <span className="text-body font-semibold text-ink">
                {o.label}
              </span>
              <span className="text-body-sm text-ink-muted">
                {o.description}
              </span>
            </button>
          );
        })}
      </div>
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          disabled={unchanged}
          onClick={() => {
            onSave(manager);
            onClose();
          }}
        >
          Save role
        </Button>
      </div>
    </div>
  );
}

export function RoleDialog({
  member,
  onSave,
  onClose,
}: {
  member: MemberRecord | null;
  onSave: (id: string, isManager: boolean) => void;
  onClose: () => void;
}) {
  const desktop = useMediaQuery("(min-width: 768px)");
  return (
    <DrawerSheet
      open={!!member}
      onClose={onClose}
      side={desktop ? "center" : "bottom"}
      title="Change role"
      hideTitle
      className="bg-surface pb-[env(safe-area-inset-bottom)]"
    >
      {member && (
        <RoleForm
          key={member.id}
          member={member}
          onSave={(isManager) => onSave(member.id, isManager)}
          onClose={onClose}
        />
      )}
    </DrawerSheet>
  );
}
