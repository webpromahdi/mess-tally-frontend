import apiClient from "@/lib/apiClient";
import type { DownloadedFile } from "@/lib/types";

/**
 * Fetch a binary endpoint (CSV export, PDF statement) through the shared
 * client so cookies and the API base URL are reused.
 */
export async function fetchFile(
  path: string,
  {
    query,
    fallbackFilename,
  }: {
    query?: Record<string, string>;
    fallbackFilename: string;
  },
): Promise<DownloadedFile> {
  const response = await apiClient.raw<Blob, "blob">(path, {
    method: "GET",
    query,
    responseType: "blob",
  });

  if (!response._data) {
    throw new Error("The server returned an empty file.");
  }

  const disposition = response.headers.get("content-disposition") ?? "";
  const match = /filename="?([^";]+)"?/i.exec(disposition);

  return {
    blob: response._data,
    filename: match?.[1] ?? fallbackFilename,
    contentType:
      response.headers.get("content-type") ?? "application/octet-stream",
  };
}

/** Trigger a browser download for a fetched file (client only). */
export function saveFile(file: DownloadedFile) {
  const url = URL.createObjectURL(file.blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = file.filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
