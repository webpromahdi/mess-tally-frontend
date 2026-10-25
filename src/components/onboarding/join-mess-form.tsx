"use client";

import {
  AlertCircle,
  ArrowRight,
  Clock,
  Home,
  KeyRound,
  Loader2,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface JoinMessFormProps {
  onSuccess?: (joinResult: {
    roomCode: string;
    messName: string;
    requiresApproval: boolean;
    status: "PENDING" | "ACTIVE";
  }) => void;
  onCancel?: () => void;
}

export function JoinMessForm({ onSuccess }: JoinMessFormProps) {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState("SUN-K7P9M2X4");
  const [isValidating, setIsValidating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mess preview state (defaults to found preview for demo, or toggles on validate)
  const [messPreview, setMessPreview] = useState<{
    name: string;
    location: string;
    membersCount: number;
    createdAt: string;
  } | null>({
    name: "Green Road Flat",
    location: "Dhanmondi, Dhaka",
    membersCount: 4,
    createdAt: "Created 2 months ago",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase().replace(/\s+/g, "");
    setRoomCode(val);
    if (error) setError(null);
  };

  const handleValidate = () => {
    const cleanCode = roomCode.trim();
    if (!cleanCode) {
      setError("Please enter a room code to validate.");
      setMessPreview(null);
      return;
    }

    if (cleanCode.length < 4) {
      setError("Room code must be at least 4 characters.");
      setMessPreview(null);
      return;
    }

    setIsValidating(true);
    setError(null);

    setTimeout(() => {
      setIsValidating(false);
      // Valid mock found state
      setMessPreview({
        name: cleanCode.startsWith("SUN")
          ? "Green Road Flat"
          : "Sunrise Flatmates",
        location: "Dhanmondi, Dhaka",
        membersCount: 4,
        createdAt: "Created 2 months ago",
      });
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = roomCode.trim();

    if (!cleanCode) {
      setError("Room code is required.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    setTimeout(() => {
      setIsSubmitting(false);

      const result = {
        roomCode: cleanCode,
        messName: messPreview?.name || "Green Road Flat",
        requiresApproval: true,
        status: "PENDING" as const,
      };

      if (onSuccess) {
        onSuccess(result);
      } else {
        router.push("/onboarding/pending");
      }
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Room Code */}
      <div className="space-y-2">
        <Label
          htmlFor="room-code-input"
          className="text-xs font-semibold text-foreground/90 flex items-center justify-between"
        >
          <span>
            Room code <span className="text-destructive">*</span>
          </span>
        </Label>

        {/* Input container with key icon and validate button */}
        <div className="relative flex items-center">
          <KeyRound
            className="absolute left-3.5 size-4 text-muted-foreground pointer-events-none"
            aria-hidden="true"
          />
          <Input
            id="room-code-input"
            name="roomCode"
            type="text"
            required
            value={roomCode}
            onChange={handleInputChange}
            placeholder="e.g. SUN-K7P9M2X4"
            className="h-11 rounded-lg pl-10 pr-24 font-mono text-sm sm:text-base font-semibold uppercase tracking-wider"
            maxLength={24}
            autoComplete="off"
            aria-invalid={Boolean(error)}
          />

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleValidate}
            disabled={isValidating}
            className="absolute right-1.5 h-8 gap-1 px-2.5 rounded-md text-xs font-semibold border-primary/20 text-primary hover:bg-primary/5 dark:text-marigold-400 dark:border-primary/40"
          >
            {isValidating ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <ShieldCheck className="size-3.5" />
            )}
            <span>Validate</span>
          </Button>
        </div>

        {error ? (
          <p className="text-xs text-destructive flex items-center gap-1 pt-0.5">
            <AlertCircle className="size-3.5" />
            <span>{error}</span>
          </p>
        ) : (
          <p className="text-[11px] text-muted-foreground">
            Enter the 6-12 character room code (e.g. SUN-K7P9M2X4)
          </p>
        )}
      </div>

      {/* Mess Preview Box (When Validated / Found) */}
      {messPreview && (
        <div className="rounded-xl border border-primary/20 bg-primary/[0.035] dark:border-primary/25 dark:bg-primary/[0.08] p-4 flex items-start gap-3.5 transition-all">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/25 shrink-0">
            <Home className="size-5" />
          </div>

          <div className="space-y-1 w-full">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base text-foreground">
                {messPreview.name}
              </span>
              <Badge
                variant="outline"
                className="border-primary/25 bg-primary/10 text-primary dark:border-primary/40 dark:bg-primary/25 dark:text-marigold-300 text-[10px] font-semibold px-2.5 py-0.5 rounded-full"
              >
                Found
              </Badge>
            </div>

            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3 text-muted-foreground" />
              <span>{messPreview.location}</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-muted-foreground font-medium">
              <span className="inline-flex items-center gap-1">
                <Users className="size-3" />
                <span>{messPreview.membersCount} active members</span>
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3" />
                <span>{messPreview.createdAt}</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="brand-accent"
          disabled={isSubmitting}
          className="w-full h-11 sm:h-12 rounded-xl text-sm sm:text-base font-semibold shadow-xs"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin mr-2" />
              <span>Submitting Request...</span>
            </>
          ) : (
            <>
              <span>Request to Join</span>
              <ArrowRight className="size-4 ml-1.5" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
