"use client";

import { SendHorizontal, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { IconTile } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useTallyBotChat } from "@/hooks";
import { getApiMessage } from "@/lib/apiError";
import type { ChatMessage } from "@/lib/types";
import { cn } from "@/lib/utils";

const prompts = [
  "What's the meal rate?",
  "How much do I owe?",
  "Who paid the most bazar?",
];

/**
 * Floating TallyBot widget: bottom-right button that toggles a chat window
 * above it (near full-screen on phones, sits above the mobile bottom nav).
 * No backdrop, so the page stays usable. Read-only answers from `POST /ai/chat`.
 */
export function TallyBotSheet() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const chat = useTallyBotChat();
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pending = chat.isPending;

  useEffect(() => {
    if (open && (messages.length || pending)) {
      endRef.current?.scrollIntoView({ block: "end" });
    }
  }, [open, messages, pending]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const send = (text: string) => {
    const content = text.trim();
    if (!content || pending) return;
    const thread: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages(thread);
    setDraft("");
    chat.mutate(thread, {
      onSuccess: (res) =>
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            // The backend rejects empty messages in history.
            content: res.data.reply.trim() || "Sorry, I couldn't answer that.",
          },
        ]),
    });
  };

  return (
    <>
      {open && (
        <section
          id="tallybot-window"
          aria-label="TallyBot"
          className={cn(
            "fixed inset-x-2 top-2 z-40 flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-pop",
            // Above the FAB, which sits above the mobile bottom nav.
            "bottom-[calc(9.5rem+env(safe-area-inset-bottom))]",
            "sm:inset-x-auto sm:top-auto sm:right-4 sm:h-[min(560px,calc(100dvh-11rem))] sm:w-95",
            "lg:right-6 lg:bottom-24",
          )}
        >
          <div className="flex items-center gap-3 border-b border-line px-4 py-3">
            <IconTile tone="aubergine">
              <Sparkles />
            </IconTile>
            <div className="min-w-0 flex-1">
              <p className="text-h4 text-ink">TallyBot</p>
              <p className="truncate text-body-sm text-ink-muted">
                Answers from your mess numbers
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Close TallyBot"
              onClick={() => setOpen(false)}
              className="text-ink-muted"
            >
              <X />
            </Button>
          </div>

          {messages.length === 0 ? (
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
                    onClick={() => send(p)}
                  >
                    {p}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div
              className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4"
              aria-live="polite"
            >
              {messages.map((m, i) => (
                <p
                  // biome-ignore lint/suspicious/noArrayIndexKey: append-only thread
                  key={i}
                  className={cn(
                    "max-w-[85%] whitespace-pre-wrap wrap-break-word rounded-2xl px-3.5 py-2.5 text-body",
                    m.role === "user"
                      ? "self-end bg-brand-accent text-brand-accent-foreground"
                      : "self-start bg-canvas text-ink",
                  )}
                >
                  {m.content}
                </p>
              ))}
              {pending && (
                <p className="self-start rounded-2xl bg-canvas px-3.5 py-2.5 text-body text-ink-muted">
                  Thinking…
                </p>
              )}
              {chat.isError && !pending && (
                <p
                  role="alert"
                  className="self-start text-body-sm text-destructive"
                >
                  {getApiMessage(chat.error)}
                </p>
              )}
              <div ref={endRef} />
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(draft);
            }}
            className="border-t border-line p-4"
          >
            <div className="flex items-center gap-2 rounded-xl border border-line-strong bg-canvas py-1.5 pr-1.5 pl-3 focus-within:border-ring">
              <input
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                maxLength={1000}
                placeholder="Message TallyBot…"
                aria-label="Message TallyBot"
                className="min-h-9 min-w-0 flex-1 bg-transparent text-body text-ink outline-none placeholder:text-ink-subtle"
              />
              <Button
                type="submit"
                size="icon-sm"
                aria-label="Send message"
                disabled={!draft.trim() || pending}
              >
                <SendHorizontal />
              </Button>
            </div>
            <p className="mt-2 text-center text-caption text-ink-subtle">
              TallyBot can only read your mess data.
            </p>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close TallyBot" : "Open TallyBot"}
        aria-expanded={open}
        aria-controls="tallybot-window"
        className={cn(
          "fixed right-4 z-40 grid size-14 cursor-pointer place-items-center rounded-full bg-aubergine-800 text-marigold-400 shadow-pop transition-transform hover:scale-105",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marigold-400",
          "bottom-[calc(5rem+env(safe-area-inset-bottom))] lg:right-6 lg:bottom-6",
        )}
      >
        {open ? <X className="size-6" /> : <Sparkles className="size-6" />}
      </button>
    </>
  );
}
