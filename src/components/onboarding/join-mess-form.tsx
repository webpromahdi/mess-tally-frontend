"use client";

import { AlertCircle, ArrowRight, KeyRound, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useJoinMess } from "@/hooks";
import { getApiMessage } from "@/lib/apiError";

export function JoinMessForm() {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const joinMess = useJoinMess();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase().replace(/\s+/g, "");
    setRoomCode(val);
    if (error) setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = roomCode.trim();

    if (!cleanCode) {
      setError("Room code is required.");
      return;
    }

    setError(null);

    joinMess.mutate(
      { roomCode: cleanCode },
      {
        onSuccess: (response) => {
          if (response.data.membership.status === "ACTIVE") {
            router.replace("/dashboard");
          } else {
            router.replace("/onboarding/pending");
          }
        },
        onError: (err) => {
          setError(
            getApiMessage(
              err,
              "We couldn't join that mess. Check the room code and try again.",
            ),
          );
        },
      },
    );
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
            className="h-11 rounded-lg pl-10 font-mono text-sm sm:text-base font-semibold uppercase tracking-wider"
            maxLength={64}
            autoComplete="off"
            aria-invalid={Boolean(error)}
          />
        </div>

        {error ? (
          <p
            role="alert"
            className="text-xs text-destructive flex items-start gap-1 pt-0.5"
          >
            <AlertCircle className="mt-0.5 size-3.5 shrink-0" />
            <span>{error}</span>
          </p>
        ) : (
          <p className="text-[11px] text-muted-foreground">
            Enter the room code shared by your mess manager.
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="brand-accent"
          disabled={joinMess.isPending}
          className="w-full h-11 sm:h-12 rounded-xl text-sm sm:text-base font-semibold shadow-xs"
        >
          {joinMess.isPending ? (
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
