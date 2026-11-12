import apiClient from "@/lib/apiClient";
import type { ApiResponse, ChatMessage, ChatResponseData } from "@/lib/types";

/** `POST /ai/chat` — TallyBot answers from the caller's active mess. */
export function sendChat(messages: ChatMessage[]) {
  return apiClient<ApiResponse<ChatResponseData>>("/ai/chat", {
    method: "POST",
    body: { messages },
  });
}
