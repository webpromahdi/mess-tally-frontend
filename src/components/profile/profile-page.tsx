"use client";

import {
  Camera,
  Check,
  Loader2,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";
import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, ErrorState } from "@/components/shared";
import { useCurrentUser, useUpdateProfile, useUploadProfileImage } from "@/hooks";
import { getApiMessage } from "@/lib/apiError";
import { profileUpdateSchema, type ProfileUpdateValues } from "@/validations";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "U";
}

export function ProfilePage() {
  const { user, isLoading, isError, refetch } = useCurrentUser();
  const updateProfile = useUpdateProfile();
  const uploadImage = useUploadProfileImage();
  const fileInput = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState<ProfileUpdateValues>({
    bio: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ProfileUpdateValues, string>>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    setValues({
      bio: user.profile?.bio ?? "",
      phone: user.profile?.phone ?? "",
      address: user.profile?.address ?? "",
    });
  }, [user]);

  useEffect(
    () => () => {
      if (imagePreview?.startsWith("blob:")) URL.revokeObjectURL(imagePreview);
    },
    [imagePreview],
  );

  if (isLoading) {
    return (
      <div className="flex flex-col gap-5 sm:gap-6">
        <div className="h-20 animate-pulse rounded-xl bg-muted" />
        <div className="h-96 animate-pulse rounded-xl bg-card" />
      </div>
    );
  }

  if (isError || !user) {
    return (
      <Card>
        <ErrorState
          title="Couldn't load your profile"
          description="Check your connection and try again."
          onRetry={() => void refetch()}
        />
      </Card>
    );
  }

  const avatarUrl = imagePreview ?? user.profile?.imageUrl ?? undefined;
  const updateField = (field: keyof ProfileUpdateValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const saveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = profileUpdateSchema.safeParse(values);
    if (!parsed.success) {
      const nextErrors: Partial<Record<keyof ProfileUpdateValues, string>> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof ProfileUpdateValues;
        if (!nextErrors[field]) nextErrors[field] = issue.message;
      }
      setErrors(nextErrors);
      return;
    }

    try {
      await updateProfile.mutateAsync({
        bio: parsed.data.bio,
        ...(parsed.data.phone ? { phone: parsed.data.phone } : {}),
        address: parsed.data.address,
      });
      toast.success("Profile updated");
    } catch (error) {
      toast.error(getApiMessage(error, "Couldn't update your profile."));
    }
  };

  const selectImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!IMAGE_TYPES.includes(file.type)) {
      toast.error("Only JPEG, PNG, and WebP images are allowed.");
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("Image must be 5 MB or smaller.");
      return;
    }

    const preview = URL.createObjectURL(file);
    setImagePreview(preview);
    try {
      await uploadImage.mutateAsync(file);
      setImagePreview(null);
      toast.success("Profile photo updated");
    } catch (error) {
      URL.revokeObjectURL(preview);
      setImagePreview(null);
      toast.error(getApiMessage(error, "Couldn't update your profile photo."));
    }
  };

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <header>
        <h1 className="text-h1 text-ink">Your profile</h1>
        <p className="mt-1 text-body-sm text-ink-muted">
          Keep your personal information up to date.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4 text-center">
            <div className="relative">
              <Avatar className="size-28 border-4 border-secondary shadow-sm">
                {avatarUrl ? (
                  <AvatarImage src={avatarUrl} alt={user.name} className="object-cover" />
                ) : null}
                <AvatarFallback className="bg-primary text-2xl font-bold text-primary-foreground">
                  {initials(user.name)}
                </AvatarFallback>
              </Avatar>
              <button
                type="button"
                aria-label="Change profile photo"
                onClick={() => fileInput.current?.click()}
                disabled={uploadImage.isPending}
                className="absolute right-0 bottom-0 grid size-11 place-items-center rounded-full border-4 border-card bg-brand-accent text-brand-accent-foreground shadow-sm transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {uploadImage.isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Camera className="size-4" />
                )}
              </button>
              <input
                ref={fileInput}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                onChange={(event) => void selectImage(event)}
              />
            </div>
            <div>
              <h2 className="text-h2 text-ink">{user.name}</h2>
              <p className="mt-1 text-body-sm text-ink-muted">{user.email}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 text-caption text-ink-muted">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-silver-100 px-3 py-1.5">
                <Check className="size-3.5 text-success" />
                {user.emailVerified ? "Email verified" : "Email not verified"}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-silver-100 px-3 py-1.5">
                <UserRound className="size-3.5" />
                {user.role === "ADMIN" ? "Administrator" : "Member"}
              </span>
            </div>
            <p className="text-caption text-ink-subtle">
              JPEG, PNG, or WebP up to 5 MB
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Personal information</CardTitle>
            <p className="text-body-sm text-ink-muted">
              Your name and email are managed by your account.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={saveProfile} noValidate className="flex flex-col gap-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name">
                  <Input value={user.name} readOnly className="bg-muted/40" />
                </Field>
                <Field label="Email address">
                  <div className="relative">
                    <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-subtle" />
                    <Input value={user.email} readOnly className="bg-muted/40 pl-9" />
                  </div>
                </Field>
              </div>
              <Field label="Phone number" error={errors.phone} hint="Optional">
                <div className="relative">
                  <Phone className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-subtle" />
                  <Input
                    value={values.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    placeholder="+880 1700 000000"
                    className="pl-9"
                  />
                </div>
              </Field>
              <Field label="Address" error={errors.address} hint="Optional">
                <div className="relative">
                  <MapPin className="pointer-events-none absolute top-3 left-3 size-4 text-ink-subtle" />
                  <Input
                    value={values.address}
                    onChange={(event) => updateField("address", event.target.value)}
                    placeholder="Your current address"
                    className="pl-9"
                  />
                </div>
              </Field>
              <Field label="Bio" error={errors.bio} hint={`${values.bio.length}/500`}>
                <textarea
                  value={values.bio}
                  onChange={(event) => updateField("bio", event.target.value)}
                  placeholder="Tell your mess members a little about yourself"
                  rows={5}
                  className="min-h-28 w-full resize-y rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none transition-all placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25 md:text-sm"
                />
              </Field>
              <div className="flex justify-end border-t border-line pt-5">
                <Button type="submit" variant="primary" disabled={updateProfile.isPending}>
                  {updateProfile.isPending && <Loader2 className="animate-spin" />}
                  {updateProfile.isPending ? "Saving…" : "Save changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
