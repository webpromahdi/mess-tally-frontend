import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile, uploadProfileImage } from "@/api";
import { queryKeys } from "@/lib/queryKeys";

/**
 * The profile row is embedded in `/auth/me`, so any profile write refreshes
 * that cache (the shell avatar, name and bio all come from it).
 */
function useProfileInvalidation() {
  const queryClient = useQueryClient();
  return () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me }),
      queryClient.invalidateQueries({ queryKey: queryKeys.workspace.myMesses }),
    ]);
}

/** `PATCH /profile/update` — partial bio / phone / address update. */
export function useUpdateProfile() {
  const invalidate = useProfileInvalidation();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => invalidate(),
  });
}

/** `PATCH /profile/image` — uploads to Cloudinary, replacing the old asset. */
export function useUploadProfileImage() {
  const invalidate = useProfileInvalidation();
  return useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: () => invalidate(),
  });
}
