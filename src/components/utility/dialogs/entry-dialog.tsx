"use client";

import { DrawerSheet } from "@/components/shared";
import { useMediaQuery } from "@/hooks";
import type {
  UtilityData,
  UtilityEntry,
  UtilityInput,
} from "@/lib/types/utility.types";
import { EntryForm, type UtilityFormValues } from "./entry-form";

export interface UtilityDialogTarget {
  /** Undefined = new entry. */
  entry?: UtilityEntry;
  initialValues?: Partial<UtilityFormValues>;
  initialSubmitted?: boolean;
}

/** Center dialog on desktop, bottom sheet on mobile. */
export function UtilityEntryDialog({
  target,
  data,
  onSave,
  onDelete,
  onTogglePaid,
  onClose,
}: {
  target: UtilityDialogTarget | null;
  data: UtilityData;
  /** Resolves `true` on success, so the sheet stays open on failure. */
  onSave: (input: UtilityInput) => Promise<boolean>;
  onDelete: (entry: UtilityEntry) => void;
  onTogglePaid?: () => Promise<boolean>;
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
      title={entry ? "Edit utility entry" : "Add utility entry"}
      hideTitle
      className="overflow-y-auto bg-surface pb-[env(safe-area-inset-bottom)]"
    >
      {target && month && (
        <EntryForm
          key={entry?.id ?? target.initialValues?.kind ?? "new"}
          data={data}
          month={month}
          entry={entry}
          initialValues={target.initialValues}
          initialSubmitted={target.initialSubmitted}
          autoFocus={desktop}
          onSave={onSave}
          onDelete={entry ? () => onDelete(entry) : undefined}
          onTogglePaid={entry ? onTogglePaid : undefined}
          onClose={onClose}
        />
      )}
    </DrawerSheet>
  );
}
