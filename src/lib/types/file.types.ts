/** A binary response downloaded through `apiClient` (CSV export, PDF statement). */
export interface DownloadedFile {
  blob: Blob;
  filename: string;
  contentType: string;
}
