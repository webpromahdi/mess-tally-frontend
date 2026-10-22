import { ofetch } from "ofetch";
import { env } from "@/env";

/**
 * Shared ofetch instance for all API calls.
 * - baseURL: pulled from validated env (NEXT_PUBLIC_API_BASE_URL)
 * - credentials: "include" to send cookies (required for cookie-based auth)
 *
 * Usage:
 *   import apiClient from "@/lib/apiClient";
 *   const data = await apiClient("/users", { method: "GET" });
 */
const apiClient = ofetch.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
  credentials: "include",
});

export default apiClient;
