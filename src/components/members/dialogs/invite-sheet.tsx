"use client";

import { Copy } from "lucide-react";
import { DrawerSheet } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks";

export function InviteSheet({
  open,
  roomCode,
  onCopy,
  onClose,
}: {
  open: boolean;
  roomCode: string;
  onCopy: () => void;
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
        <div className="flex justify-end">
          <Button variant="primary" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </DrawerSheet>
  );
}
