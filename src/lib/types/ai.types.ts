export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/** `POST /ai/chat` data. `proposals` stays empty until write proposals ship. */
export interface ChatResponseData {
  reply: string;
  proposals: unknown[];
}
