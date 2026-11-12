import { useMutation } from "@tanstack/react-query";
import { sendChat } from "@/api";
import type { ChatMessage } from "@/lib/types";

// Backend caps: 20 messages, 1000 chars each; it only reads the last 6 anyway.
const HISTORY = 6;
const MAX_CHARS = 1000;

/** TallyBot chat. History is client state; send the whole thread each time. */
export function useTallyBotChat() {
  return useMutation({
    mutationFn: (messages: ChatMessage[]) =>
      sendChat(
        messages
          .slice(-HISTORY)
          .map((m) => ({ ...m, content: m.content.slice(0, MAX_CHARS) })),
      ),
  });
}
