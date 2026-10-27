"use client";

import { Paperclip, Trash2, Upload } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Field, NativeSelect } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getApiMessage } from "@/lib/apiError";
import { NOTE_MAX, parseAmount, upsertBazar, validateBazar } from "@/lib/bazar";
import { formatBDT } from "@/lib/format";
import type {
  BazarData,
  BazarEntry,
  BazarField,
  BazarInput,
  BazarMonth,
} from "@/lib/types/bazar.types";
import { cn } from "@/lib/utils";
import { validateReceipt } from "@/validations";

export interface BazarFormValues {
  memberId: string;
  date: string;
  amount: string;
  note: string;
}

interface BazarEntryFormProps {
  data: BazarData;
  month: BazarMonth;
  /** Present when editing. */
  entry?: BazarEntry;
  initialValues?: Partial<BazarFormValues>;
  /** Show validation immediately (static validation screen). */
  initialSubmitted?: boolean;
  autoFocus?: boolean;
  /** Receipt uploads are a PRO feature (API.md §33–34). */
  isPro?: boolean;
  onSave: (input: BazarInput) => Promise<boolean>;
  onDelete?: () => void;
  /** Resolves with the new receipt URL, or `null` when none was returned. */
  onUploadReceipt?: (file: File) => Promise<string | null>;
  onRemoveReceipt?: () => Promise<void>;
  onClose: () => void;
}

function defaultDate(today: string, month: BazarMonth) {
  return today > month.endDate ? month.endDate : today;
}

/** Create / edit form. Shows the resulting meal rate before saving (AC 4.1.3). */
export function BazarEntryForm({
  data,
  month,
  entry,
  initialValues,
  initialSubmitted,
  autoFocus,
  isPro,
  onSave,
  onDelete,
  onUploadReceipt,
  onRemoveReceipt,
  onClose,
}: BazarEntryFormProps) {
  const payers = data.members.filter(
    (m) => m.status === "ACTIVE" || m.id === entry?.memberId,
  );
  const viewerIsPayer = payers.some((m) => m.id === data.viewer.memberId);
  const [values, setValues] = useState<BazarFormValues>({
    memberId: entry
      ? entry.memberId
      : viewerIsPayer
        ? data.viewer.memberId
        : (payers[0]?.id ?? ""),
    date: entry ? entry.date : defaultDate(data.today, month),
    amount: entry ? String(entry.amount) : "",
    note: entry?.note ?? "",
    ...initialValues,
  });
  const [submitted, setSubmitted] = useState(!!initialSubmitted);
  const [saving, setSaving] = useState(false);
  const [receiptUrl, setReceiptUrl] = useState(entry?.receiptUrl ?? null);
  const [receiptBusy, setReceiptBusy] = useState(false);
  const [receiptError, setReceiptError] = useState<string | null>(null);

  const canManageReceipt = Boolean(entry && isPro);
  const locked = month.isLocked;

  const uploadReceipt = async (file: File) => {
    if (!onUploadReceipt) return;
    const invalid = validateReceipt(file);
    if (invalid) {
      setReceiptError(invalid);
      return;
    }
    setReceiptError(null);
    setReceiptBusy(true);
    try {
      setReceiptUrl((await onUploadReceipt(file)) ?? null);
    } catch (error) {
      setReceiptError(
        getApiMessage(error, "Couldn't upload the receipt. Try again."),
      );
    } finally {
      setReceiptBusy(false);
    }
  };

  const removeReceipt = async () => {
    if (!onRemoveReceipt) return;
    setReceiptError(null);
    setReceiptBusy(true);
    try {
      await onRemoveReceipt();
      setReceiptUrl(null);
    } catch (error) {
      setReceiptError(
        getApiMessage(error, "Couldn't remove the receipt. Try again."),
      );
    } finally {
      setReceiptBusy(false);
    }
  };

  const input: BazarInput = {
    id: entry?.id ?? null,
    memberId: values.memberId,
    date: values.date,
    amount: parseAmount(values.amount),
    note: values.note.trim(),
  };
  const errors = validateBazar(input, {
    start: month.startDate,
    end: month.endDate,
    today: data.today,
    memberIds: payers.map((m) => m.id),
  });
  const errorFor = (field: BazarField) =>
    submitted ? errors.find((e) => e.field === field)?.message : undefined;

  const preview =
    errors.length === 0 ? upsertBazar(data, input, "preview") : null;
  const patch = (next: Partial<BazarFormValues>) =>
    setValues((v) => ({ ...v, ...next }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (errors.length !== 0) return;
    setSaving(true);
    try {
      // Keep the sheet open on failure so the typed values aren't lost.
      if (await onSave(input)) onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4 p-5 pt-4">
      <div className="pr-10">
        <h3 className="text-h3 text-ink">
          {entry ? "Edit bazar entry" : "Add bazar trip"}
        </h3>
        <p className="mt-0.5 text-body-sm text-ink-muted">
          Counts toward the house total and the meal rate.
        </p>
      </div>

      <Field label="Amount (৳)" error={errorFor("amount")}>
        <Input
          type="text"
          inputMode="decimal"
          autoComplete="off"
          placeholder="0.00"
          data-autofocus={autoFocus || undefined}
          value={values.amount}
          onChange={(e) => patch({ amount: e.target.value })}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Paid by" error={errorFor("memberId")}>
          <NativeSelect
            value={values.memberId}
            onChange={(e) => patch({ memberId: e.target.value })}
          >
            {payers.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
                {m.id === data.viewer.memberId ? " (you)" : ""}
              </option>
            ))}
          </NativeSelect>
        </Field>
        <Field label="Date" error={errorFor("date")}>
          <Input
            type="date"
            min={month.startDate}
            max={data.today < month.endDate ? data.today : month.endDate}
            value={values.date}
            onChange={(e) => patch({ date: e.target.value })}
          />
        </Field>
      </div>

      <Field
        label="Note (optional)"
        error={errorFor("note")}
        hint={`${values.note.length}/${NOTE_MAX}`}
      >
        <Input
          type="text"
          placeholder="e.g. Rice, lentils and oil"
          value={values.note}
          onChange={(e) => patch({ note: e.target.value })}
        />
      </Field>

      <div className="flex flex-col gap-2 rounded-xl border border-dashed border-line px-3 py-2.5 text-body-sm text-ink-muted">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <Paperclip aria-hidden className="size-4 shrink-0" />
          {receiptUrl ? (
            <>
              <a
                href={receiptUrl}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-ink underline underline-offset-2"
              >
                View receipt
              </a>
              {canManageReceipt && !locked && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-error"
                  disabled={receiptBusy}
                  onClick={() => void removeReceipt()}
                >
                  <Trash2 />
                  Remove
                </Button>
              )}
            </>
          ) : (
            <span>
              {entry
                ? isPro
                  ? "No receipt attached yet."
                  : "Receipt uploads are a PRO feature."
                : "Save the entry, then attach a receipt."}
            </span>
          )}
          {!receiptUrl && canManageReceipt && !locked && (
            <label
              className={cn(
                "inline-flex min-h-8 cursor-pointer items-center gap-1.5 rounded-md border border-line bg-surface px-3 text-body-sm font-medium text-ink transition-colors hover:bg-silver-100",
                receiptBusy && "pointer-events-none opacity-60",
              )}
            >
              <Upload aria-hidden className="size-4" />
              {receiptBusy ? "Uploading…" : "Attach receipt"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                disabled={receiptBusy}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  e.target.value = "";
                  if (file) void uploadReceipt(file);
                }}
              />
            </label>
          )}
        </div>
        {receiptError ? (
          <p role="alert" className="text-error">
            {receiptError}
          </p>
        ) : (
          canManageReceipt &&
          !locked && (
            <p className="text-caption">JPEG, PNG or WebP · up to 5 MB.</p>
          )
        )}
      </div>

      <p
        aria-live="polite"
        className={cn(
          "rounded-xl bg-silver-100 px-3 py-2.5 text-body-sm",
          preview ? "text-ink" : "text-ink-muted",
        )}
      >
        {preview ? (
          <>
            Meal rate will become{" "}
            <strong className="tabular-nums">
              {formatBDT(preview.mealRate)}
            </strong>{" "}
            <span className="text-ink-muted">
              (now {formatBDT(data.mealRate)})
            </span>
          </>
        ) : (
          "Fix the highlighted fields to preview the meal rate."
        )}
      </p>

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
        {onDelete ? (
          <Button
            type="button"
            variant="ghost"
            className="text-error"
            onClick={onDelete}
          >
            <Trash2 />
            Delete
          </Button>
        ) : (
          <span />
        )}
        <div className="flex flex-col-reverse gap-2 sm:flex-row">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={saving}>
            {saving ? "Saving…" : "Save Bazar Entry"}
          </Button>
        </div>
      </div>
    </form>
  );
}
