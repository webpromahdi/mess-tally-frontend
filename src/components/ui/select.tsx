"use client";

import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import * as React from "react";
import { cn } from "@/lib/utils";

interface SelectContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  itemsMap: Record<string, React.ReactNode>;
  registerItem: (value: string, label: React.ReactNode) => void;
}

const SelectContext = React.createContext<SelectContextValue | null>(null);

function useSelect() {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error("Select components must be used within a <Select>");
  }
  return context;
}

interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
  disabled?: boolean;
  name?: string;
  required?: boolean;
}

function Select({
  value: valueProp,
  defaultValue,
  onValueChange,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  children,
}: SelectProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<
    string | undefined
  >(defaultValue);
  const [uncontrolledOpen, setUncontrolledOpen] =
    React.useState<boolean>(defaultOpen);
  const [itemsMap, setItemsMap] = React.useState<
    Record<string, React.ReactNode>
  >({});

  const isControlledValue = valueProp !== undefined;
  const value = isControlledValue ? valueProp : uncontrolledValue;

  const isControlledOpen = openProp !== undefined;
  const open = isControlledOpen ? openProp : uncontrolledOpen;

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      if (!isControlledValue) {
        setUncontrolledValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [isControlledValue, onValueChange],
  );

  const handleOpenChange = React.useCallback(
    (newOpen: boolean) => {
      if (!isControlledOpen) {
        setUncontrolledOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isControlledOpen, onOpenChange],
  );

  const registerItem = React.useCallback(
    (itemVal: string, itemLabel: React.ReactNode) => {
      setItemsMap((prev) => {
        if (prev[itemVal] === itemLabel) return prev;
        return { ...prev, [itemVal]: itemLabel };
      });
    },
    [],
  );

  const contextValue = React.useMemo<SelectContextValue>(
    () => ({
      value,
      onValueChange: handleValueChange,
      open,
      setOpen: handleOpenChange,
      itemsMap,
      registerItem,
    }),
    [value, handleValueChange, open, handleOpenChange, itemsMap, registerItem],
  );

  return (
    <SelectContext.Provider value={contextValue}>
      <DropdownMenuPrimitive.Root
        data-slot="select"
        open={open}
        onOpenChange={handleOpenChange}
        modal={false}
      >
        {children}
      </DropdownMenuPrimitive.Root>
    </SelectContext.Provider>
  );
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return <DropdownMenuPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({
  placeholder,
  className,
}: {
  placeholder?: string;
  className?: string;
}) {
  const { value, itemsMap } = useSelect();
  const label = value !== undefined ? (itemsMap[value] ?? value) : undefined;

  return (
    <span
      data-slot="select-value"
      className={cn(
        "truncate",
        label === undefined && "text-muted-foreground",
        className,
      )}
    >
      {label ?? placeholder}
    </span>
  );
}

function SelectTrigger({
  className,
  children,
  id,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger> & {
  id?: string;
}) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="select-trigger"
      id={id}
      className={cn(
        "flex h-11 w-full items-center justify-between gap-2 rounded-lg border border-input bg-card px-3.5 py-2 text-base md:text-sm text-foreground shadow-xs transition-all outline-none",
        "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25",
        "hover:border-silver-600 dark:hover:border-aubergine-500",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        "select-none cursor-pointer",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
    </DropdownMenuPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  sideOffset = 4,
  align = "start",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="select-content"
        sideOffset={sideOffset}
        align={align}
        collisionPadding={8}
        className={cn(
          "relative z-50 max-h-96 min-w-32 overflow-x-hidden overflow-y-auto rounded-xl border border-border/80 bg-popover p-1.5 text-popover-foreground shadow-lg outline-none",
          "w-[var(--radix-dropdown-menu-trigger-width)] min-w-[var(--radix-dropdown-menu-trigger-width)]",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          className,
        )}
        {...props}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label>) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="select-label"
      className={cn(
        "px-3 py-1.5 text-xs font-semibold text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  value: itemValue,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  value: string;
}) {
  const { value, onValueChange, registerItem } = useSelect();
  const isSelected = value === itemValue;

  React.useEffect(() => {
    registerItem(itemValue, children);
  }, [itemValue, children, registerItem]);

  return (
    <DropdownMenuPrimitive.Item
      data-slot="select-item"
      data-state={isSelected ? "checked" : "unchecked"}
      onSelect={() => {
        onValueChange?.(itemValue);
      }}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center justify-between rounded-lg px-3 py-2 text-sm outline-none transition-colors",
        "text-foreground",
        "focus:bg-accent/80 focus:text-foreground",
        "data-[state=checked]:bg-primary/10 data-[state=checked]:text-primary data-[state=checked]:font-semibold dark:data-[state=checked]:bg-primary/20 dark:data-[state=checked]:text-primary-foreground",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {isSelected ? (
        <span className="flex size-4 items-center justify-center text-primary dark:text-primary-foreground shrink-0">
          <CheckIcon className="size-4" />
        </span>
      ) : (
        <span className="size-4 shrink-0" aria-hidden="true" />
      )}
    </DropdownMenuPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="select-separator"
      className={cn("-mx-1 my-1 h-px bg-border/60", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1 text-muted-foreground",
        className,
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </div>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1 text-muted-foreground",
        className,
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </div>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
