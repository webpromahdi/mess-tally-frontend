"use client";

import { DrawerSheet } from "@/components/shared";
import { useMediaQuery } from "@/hooks";
import type {
  BazarData,
  BazarEntry,
  BazarInput,
} from "@/lib/types/bazar.types";
import { BazarEntryForm, type BazarFormValues } from "./bazar-entry-form";

export interface BazarDialogTarget {
  /** Undefined = new entry. */
  entry?: BazarEntry;
  initialValues?: Partial<BazarFormValues>;
  initialSubmitted?: boolean;
}

/** Center dialog on desktop, bottom sheet on mobile. */
export function BazarEntryDialog({
  target,
  data,
  isPro,
  onSave,
  onDelete,
  onUploadReceipt,
  onRemoveReceipt,
  onClose,
}: {
  target: BazarDialogTarget | null;
  data: BazarData;
  isPro: boolean;
  onSave: (input: BazarInput) => Promise<boolean>;
  onDelete: (entry: BazarEntry) => void;
  /** Resolves with the new receipt URL, or `null` when none was returned. */
  onUploadReceipt: (file: File) => Promise<string | null>;
  onRemoveReceipt: () => Promise<void>;
  onClose: () => void;
}) {
  const desktop = useMediaQuery("(min-width: 768px)");
  const { month } = data;
  const entry = target?.entry;
  return (
    <DrawerSheet
      open={!!target && !!month}
      onClose={onClose}
      side={desktop ? "center" : "bottom"}
      title={entry ? "Edit bazar entry" : "Add bazar trip"}
      hideTitle
      className="overflow-y-auto bg-surface pb-[env(safe-area-inset-bottom)]"
    >
      {target && month && (
        <BazarEntryForm
          key={entry?.id ?? "new"}
          data={data}
          month={month}
          entry={entry}
          initialValues={target.initialValues}
          initialSubmitted={target.initialSubmitted}
          autoFocus={desktop}
          isPro={isPro}
          onSave={onSave}
          onDelete={entry ? () => onDelete(entry) : undefined}
          onUploadReceipt={onUploadReceipt}
          onRemoveReceipt={onRemoveReceipt}
          onClose={onClose}
        />
      )}
    </DrawerSheet>
  );
}
