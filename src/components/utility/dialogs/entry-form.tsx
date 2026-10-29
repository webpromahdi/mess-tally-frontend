"use client";

import { AlertTriangle, Paperclip, Trash2 } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Field, NativeSelect } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatBDT } from "@/lib/format";
import type {
  UtilityCategory,
  UtilityData,
  UtilityEntry,
  UtilityField,
  UtilityInput,
  UtilityKind,
  UtilityMonth,
} from "@/lib/types/utility.types";
import {
  CATEGORIES,
  NOTE_MAX,
  parseAmount,
  upsertEntry,
  validateEntry,
} from "@/lib/utility";
import { cn } from "@/lib/utils";

export interface UtilityFormValues {
  kind: UtilityKind;
  memberId: string;
  category: UtilityCategory | "";
  date: string;
  amount: string;
  note: string;
}

interface EntryFormProps {
  data: UtilityData;
  month: UtilityMonth;
  /** Present when editing. */
  entry?: UtilityEntry;
  initialValues?: Partial<UtilityFormValues>;
  /** Show validation immediately (static validation screen). */
  initialSubmitted?: boolean;
  autoFocus?: boolean;
  /** Resolves `true` on success, so the sheet stays open on failure. */
  onSave: (input: UtilityInput) => Promise<boolean>;
  onDelete?: () => void;
  /** Bills only — toggles `PATCH /utilities/:id/paid`. */
  onTogglePaid?: () => Promise<boolean>;
  onClose: () => void;
}

function defaultDate(today: string, month: UtilityMonth) {
  return today > month.endDate ? month.endDate : today;
}

const KINDS: UtilityKind[] = ["DEPOSIT", "BILL"];

/** Create / edit form. Previews the resulting fund balance before saving. */
export function EntryForm({
  data,
  month,
  entry,
  initialValues,
  initialSubmitted,
  autoFocus,
  onSave,
  onDelete,
  onTogglePaid,
  onClose,
}: EntryFormProps) {
  const payers = data.members.filter(
    (m) => m.status === "ACTIVE" || m.id === entry?.memberId,
  );
  const [values, setValues] = useState<UtilityFormValues>({
    kind: entry?.kind ?? "DEPOSIT",
    memberId: entry?.memberId ?? payers[0]?.id ?? "",
    category: entry?.category ?? "",
    date: entry ? entry.date : defaultDate(data.today, month),
    amount: entry ? String(entry.amount) : "",
    note: entry?.note ?? "",
    ...initialValues,
  });
  const [submitted, setSubmitted] = useState(!!initialSubmitted);
  const [saving, setSaving] = useState(false);
  const [paid, setPaid] = useState(entry?.isPaid ?? false);
  const [paidBusy, setPaidBusy] = useState(false);
  const [paidError, setPaidError] = useState<string | null>(null);
  const isDeposit = values.kind === "DEPOSIT";

  const input: UtilityInput = {
    id: entry?.id ?? null,
    kind: values.kind,
    memberId: isDeposit ? values.memberId : null,
    category: isDeposit || values.category === "" ? null : values.category,
    date: values.date,
    amount: parseAmount(values.amount),
    note: values.note.trim(),
  };
  const errors = validateEntry(input, {
    start: month.startDate,
    end: month.endDate,
    today: data.today,
    memberIds: payers.map((m) => m.id),
  });
  const errorFor = (field: UtilityField) =>
    submitted ? errors.find((e) => e.field === field)?.message : undefined;

  const preview =
    errors.length === 0 ? upsertEntry(data, input, "preview") : null;
  const overdraws = !!preview && !isDeposit && preview.balance < 0;
  const patch = (next: Partial<UtilityFormValues>) =>
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

  const togglePaid = async () => {
    if (!onTogglePaid) return;
    setPaidError(null);
    setPaidBusy(true);
    try {
      if (await onTogglePaid()) setPaid((value) => !value);
    } finally {
      setPaidBusy(false);
    }
  };

  const noun = isDeposit ? "deposit" : "bill";

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4 p-5 pt-4">
      <div className="pr-10">
        <h3 className="text-h3 text-ink">
          {entry ? `Edit ${noun}` : isDeposit ? "Record deposit" : "Add bill"}
        </h3>
        <p className="mt-0.5 text-body-sm text-ink-muted">
          {isDeposit
            ? "Adds money to the utility fund."
            : "Paid from the utility fund, not the meal rate."}
        </p>
      </div>

      {!entry && (
        <div className="grid grid-cols-2 gap-1 rounded-xl bg-silver-200 p-1">
          {KINDS.map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={values.kind === k}
              onClick={() => patch({ kind: k })}
              className={cn(
                "min-h-11 rounded-lg text-body-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-aubergine-500",
                values.kind === k
                  ? "bg-surface text-ink shadow-sm"
                  : "text-ink-muted hover:text-ink",
              )}
            >
              {k === "DEPOSIT" ? "Deposit" : "Bill"}
            </button>
          ))}
        </div>
      )}

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
        {isDeposit ? (
          <Field label="Deposited by" error={errorFor("memberId")}>
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
        ) : (
          <Field label="Category" error={errorFor("category")}>
            <NativeSelect
              value={values.category}
              onChange={(e) =>
                patch({ category: e.target.value as UtilityCategory | "" })
              }
            >
              <option value="">Choose a category</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </NativeSelect>
          </Field>
        )}
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
          placeholder={
            isDeposit ? "e.g. October share" : "e.g. October electricity bill"
          }
          value={values.note}
          onChange={(e) => patch({ note: e.target.value })}
        />
      </Field>

      {!isDeposit && (
        <div className="flex items-center gap-2 rounded-xl border border-dashed border-line px-3 py-2.5 text-body-sm text-ink-muted">
          <Paperclip aria-hidden className="size-4 shrink-0" />
          Receipts aren’t tracked for utility bills yet.
        </div>
      )}

      {!isDeposit && entry && onTogglePaid && (
        <div className="flex items-start justify-between gap-3 rounded-xl border border-line px-3 py-2.5">
          <div className="min-w-0">
            <p className="text-body-sm font-medium text-ink">
              Paid from the fund
            </p>
            <p className="mt-0.5 text-caption text-ink-muted">
              {paid
                ? "Included in bills paid and the fund balance."
                : "Unpaid bills don’t reduce the fund balance."}
            </p>
            {paidError && (
              <p role="alert" className="mt-1 text-caption text-error">
                {paidError}
              </p>
            )}
          </div>
          <Button
            type="button"
            variant={paid ? "outline" : "primary"}
            size="sm"
            disabled={paidBusy}
            onClick={() => void togglePaid()}
          >
            {paidBusy ? "Saving…" : paid ? "Mark unpaid" : "Mark paid"}
          </Button>
        </div>
      )}

      <div aria-live="polite" className="flex flex-col gap-2">
        <p
          className={cn(
            "rounded-xl bg-silver-100 px-3 py-2.5 text-body-sm",
            preview ? "text-ink" : "text-ink-muted",
          )}
        >
          {preview ? (
            <>
              Fund balance will become{" "}
              <strong className="tabular-nums">
                {formatBDT(preview.balance)}
              </strong>{" "}
              <span className="text-ink-muted">
                (now {formatBDT(data.balance)})
              </span>
            </>
          ) : (
            "Fix the highlighted fields to preview the fund balance."
          )}
        </p>
        {overdraws && (
          <p className="flex items-start gap-2 rounded-xl bg-error-surface px-3 py-2.5 text-body-sm text-error">
            <AlertTriangle aria-hidden className="mt-0.5 size-4 shrink-0" />
            This bill is more than the fund holds. Ask members for a top-up.
          </p>
        )}
      </div>

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
            {saving ? "Saving…" : isDeposit ? "Save Deposit" : "Save Bill"}
          </Button>
        </div>
      </div>
    </form>
  );
}
