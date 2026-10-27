/** Profile row — API.md §50–51. */
export interface ProfileDto {
  id: string;
  userId: string;
  imageUrl: string | null;
  imagePublicId: string | null;
  bio: string | null;
  phone: string | null;
  address: string | null;
  createdAt: string;
  updatedAt: string;
}

/** `PATCH /profile/update` — at least one field is required. */
export interface UpdateProfileRequest {
  /** Max 500 characters. */
  bio?: string;
  /** Max 20, `^\+?[0-9\s()-]{6,20}$`. */
  phone?: string;
  /** Max 255 characters. */
  address?: string;
}
