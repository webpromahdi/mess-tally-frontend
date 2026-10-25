import { cloneElement, type ReactElement, type ReactNode, useId } from "react";
import { cn } from "@/lib/utils";

interface ControlProps {
  id?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
}

/** Label + control + hint/error. Wires `id`, `aria-invalid` and `aria-describedby` onto the child. */
export function Field({
  label,
  hint,
  error,
  className,
  children,
}: {
  label: string;
  hint?: ReactNode;
  error?: string;
  className?: string;
  children: ReactElement<ControlProps>;
}) {
  const id = useId();
  const noteId = `${id}-note`;
  const note = error ?? hint;
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-label text-ink">
        {label}
      </label>
      {cloneElement(children, {
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": note ? noteId : undefined,
      })}
      {note && (
        <p
          id={noteId}
          role={error ? "alert" : undefined}
          className={cn(
            "text-caption",
            error ? "text-error" : "text-ink-muted",
          )}
        >
          {note}
        </p>
      )}
    </div>
  );
}
