"use client";

import { Copy, RefreshCw } from "lucide-react";
import { DrawerSheet } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks";

export function InviteSheet({
  open,
  roomCode,
  canRegenerate,
  onCopy,
  onRegenerate,
  onClose,
}: {
  open: boolean;
  roomCode: string;
  canRegenerate: boolean;
  onCopy: () => void;
  onRegenerate: () => void;
  onClose: () => void;
}) {
  const desktop = useMediaQuery("(min-width: 768px)");
  return (
    <DrawerSheet
      open={open}
      onClose={onClose}
      side={desktop ? "center" : "bottom"}
      title="Invite flatmates"
      hideTitle
      className="bg-surface pb-[env(safe-area-inset-bottom)]"
    >
      <div className="flex flex-col gap-4 p-5">
        <div>
          <h3 className="text-h3 text-ink">Invite flatmates</h3>
          <p className="mt-1 text-body-sm text-ink-muted">
            Share this room code. People who enter it appear under join requests
            until a manager approves them.
          </p>
        </div>
        <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-silver-100 p-4">
          <span className="font-mono text-h2 tracking-[0.3em] text-ink">
            {roomCode}
          </span>
          <Button variant="outline" onClick={onCopy}>
            <Copy className="size-4" />
            Copy
          </Button>
        </div>
        {canRegenerate && (
          <div className="flex items-center justify-between gap-3">
            <p className="text-body-sm text-ink-muted">
              Regenerating makes the old code stop working.
            </p>
            <Button variant="ghost" size="sm" onClick={onRegenerate}>
              <RefreshCw className="size-4" />
              Regenerate
            </Button>
          </div>
        )}
        <div className="flex justify-end">
          <Button variant="primary" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </DrawerSheet>
  );
}
