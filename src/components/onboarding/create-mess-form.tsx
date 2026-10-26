"use client";

import {
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateMess } from "@/hooks";
import { getApiMessage } from "@/lib/apiError";

const CUTOFF_OPTIONS = [
  { value: "10:00", label: "10:00 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "20:00", label: "08:00 PM" },
];

interface CreatedMess {
  id: string;
  name: string;
  roomCode: string;
  currency: string;
  mealCutoffTime: string;
}

export function CreateMessForm() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [currency, setCurrency] = useState("BDT");
  const [mealCutoffTime, setMealCutoffTime] = useState("11:00");

  const createMess = useCreateMess();
  const [nameError, setNameError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [createdData, setCreatedData] = useState<CreatedMess | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) {
      setNameError("Mess name is required.");
      return;
    }

    setNameError(null);
    setSubmitError(null);

    createMess.mutate(
      {
        name: trimmedName,
        address: address.trim() || undefined,
        currency,
        mealCutoffTime,
      },
      {
        onSuccess: (response) => {
          const mess = response.data.mess;
          setCreatedData({
            id: mess.id,
            name: mess.name,
            roomCode: mess.roomCode,
            currency: mess.currency,
            mealCutoffTime: mess.mealCutoffTime,
          });
        },
        onError: (error) => {
          setSubmitError(
            getApiMessage(error, "We couldn't create your mess. Try again."),
          );
        },
      },
    );
  };

  const handleCopyCode = async () => {
    if (!createdData?.roomCode) return;
    try {
      await navigator.clipboard.writeText(createdData.roomCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  // If created successfully, show clean completion state
  if (createdData) {
    return (
      <div className="space-y-6 text-center py-2">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="size-8" />
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-bold tracking-tight text-foreground">
            Mess Created Successfully!
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
            You are now the <strong>Owner &amp; Manager</strong> of{" "}
            <span className="text-foreground font-semibold">
              "{createdData.name}"
            </span>
            .
          </p>
        </div>

        {/* Room Code Card */}
        <div className="rounded-xl border-2 border-dashed border-primary/30 bg-secondary/15 p-4 space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Mess Room Code
          </span>

          <div className="flex items-center justify-center gap-2.5">
            <span className="font-mono text-xl sm:text-2xl font-extrabold tracking-widest text-primary">
              {createdData.roomCode}
            </span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleCopyCode}
              className="size-8 rounded-lg shrink-0 border-border"
              title="Copy Room Code"
              aria-label="Copy Room Code"
            >
              {copiedCode ? (
                <Check className="size-3.5 text-primary" />
              ) : (
                <Copy className="size-3.5 text-muted-foreground" />
              )}
            </Button>
          </div>

          <p className="text-[11px] text-muted-foreground">
            Share this code with your flatmates so they can join your mess.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center pt-2">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto min-w-[180px] h-11 rounded-xl font-semibold"
          >
            <Link href="/dashboard">
              <span>Go to Dashboard</span>
              <ArrowRight className="size-4 ml-1.5" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Mess Name */}
      <div className="space-y-1.5">
        <Label
          htmlFor="mess-name-input"
          className="text-xs font-semibold text-foreground/90 flex items-center justify-between"
        >
          <span>
            Mess name <span className="text-destructive">*</span>
          </span>
        </Label>
        <Input
          id="mess-name-input"
          name="name"
          type="text"
          required
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (nameError) setNameError(null);
          }}
          placeholder="e.g. Green Road Flat"
          className="h-11 rounded-lg"
          aria-invalid={Boolean(nameError)}
        />
        {nameError && (
          <p className="text-xs text-destructive flex items-center gap-1 pt-0.5">
            <AlertCircle className="size-3.5" />
            <span>{nameError}</span>
          </p>
        )}
      </div>

      {/* Address */}
      <div className="space-y-1.5">
        <Label
          htmlFor="mess-address-input"
          className="text-xs font-semibold text-foreground/90"
        >
          Address{" "}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </Label>
        <Input
          id="mess-address-input"
          name="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="e.g. Green Road, Dhanmondi, Dhaka"
          className="h-11 rounded-lg"
        />
      </div>

      {/* Cutoff Time & Currency Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Daily Meal Cutoff Time */}
        <div className="space-y-1.5">
          <Label
            htmlFor="meal-cutoff-select"
            className="text-xs font-semibold text-foreground/90"
          >
            Daily meal cutoff time <span className="text-destructive">*</span>
          </Label>
          <Select value={mealCutoffTime} onValueChange={setMealCutoffTime}>
            <SelectTrigger id="meal-cutoff-select" className="h-11 rounded-lg">
              <div className="flex items-center gap-2.5 min-w-0">
                <Clock
                  className="size-4 text-muted-foreground shrink-0"
                  aria-hidden="true"
                />
                <SelectValue placeholder="Select cutoff time" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {CUTOFF_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Currency */}
        <div className="space-y-1.5">
          <Label
            htmlFor="currency-select"
            className="text-xs font-semibold text-foreground/90"
          >
            Currency
          </Label>
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger id="currency-select" className="h-11 rounded-lg">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BDT">BDT (৳)</SelectItem>
              <SelectItem value="USD">USD ($)</SelectItem>
              <SelectItem value="EUR">EUR (€)</SelectItem>
              <SelectItem value="INR">INR (₹)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {submitError && (
        <p
          role="alert"
          className="flex items-start gap-1.5 rounded-lg bg-destructive/10 p-2.5 text-xs text-destructive"
        >
          <AlertCircle className="mt-0.5 size-3.5 shrink-0" />
          <span>{submitError}</span>
        </p>
      )}

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          disabled={createMess.isPending}
          className="w-full h-11 sm:h-12 rounded-xl text-sm sm:text-base font-semibold shadow-xs"
        >
          {createMess.isPending ? (
            <>
              <Loader2 className="size-4 animate-spin mr-2" />
              <span>Creating Mess...</span>
            </>
          ) : (
            <>
              <span>Create Mess</span>
              <ArrowRight className="size-4 ml-1.5" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
