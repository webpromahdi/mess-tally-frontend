"use client";

import { SendHorizontal, Sparkles } from "lucide-react";
import { DrawerSheet, IconTile } from "@/components/shared";
import { Button } from "@/components/ui/button";

const prompts = [
  "What's the meal rate?",
  "How much do I owe?",
  "Who paid the most bazar?",
];

/** TallyBot drawer trigger target (right, 400px desktop). The real chat ships with the TallyBot module. */
export function TallyBotSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <DrawerSheet
      open={open}
      onClose={onClose}
      side="right"
      title="TallyBot"
      hideTitle
      className="bg-surface"
    >
      <div className="flex items-center gap-3 border-b border-line px-5 py-4 pr-16">
        <IconTile tone="aubergine">
          <Sparkles />
        </IconTile>
        <div className="min-w-0">
          <p className="text-h4 text-ink">TallyBot</p>
          <p className="truncate text-body-sm text-ink-muted">
            Answers from your mess numbers
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-4 overflow-y-auto px-6 text-center">
        <span className="inline-flex size-16 items-center justify-center rounded-3xl bg-marigold-100 text-marigold-900">
          <Sparkles className="size-7" />
        </span>
        <div>
          <p className="text-h3 text-ink">Ask me anything.</p>
          <p className="mt-1 text-body text-ink-muted">
            Try: &lsquo;What&rsquo;s the meal rate?&rsquo;
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {prompts.map((p) => (
            <Button
              key={p}
              variant="outline"
              size="sm"
              className="rounded-full"
            >
              {p}
            </Button>
          ))}
        </div>
      </div>
      <div className="border-t border-line p-4">
        <div className="flex items-center gap-2 rounded-xl border border-line-strong bg-canvas py-1.5 pr-1.5 pl-3">
          <span className="flex-1 truncate text-body text-ink-subtle">
            Message TallyBot…
          </span>
          <Button size="icon-sm" aria-label="Send message" disabled>
            <SendHorizontal />
          </Button>
        </div>
        <p className="mt-2 text-center text-caption text-ink-subtle">
          Chat arrives with the TallyBot module.
        </p>
      </div>
    </DrawerSheet>
  );
}
