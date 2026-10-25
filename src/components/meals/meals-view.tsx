"use client";

import { CalendarPlus, CalendarX, Utensils } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Banner,
  DrawerSheet,
  EmptyState,
  ErrorState,
  IconTile,
  Popover,
  Toast,
} from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useMediaQuery } from "@/hooks";
import { formatDayLong } from "@/lib/dates";
import { formatBDT } from "@/lib/format";
import { entryKey } from "@/lib/meals";
import type { MealsGridData, UpsertMealInput } from "@/lib/types/meal.types";
import { DayEntryDialog } from "./dialogs";
import { CellEditor, type EditorValues, MealsGrid } from "./grid";
import { MealsHeader, MealsSummaryStrip } from "./layout";
import { MobileDayList } from "./mobile";

interface EditorTarget {
  memberId: string;
  date: string;
}

export interface MealsViewProps {
  data: MealsGridData;
  initialEditor?: EditorTarget;
  initialEditorValues?: Partial<EditorValues>;
  initialDayDate?: string;
  initialOpenDate?: string;
  gridError?: boolean;
  failedKey?: string | null;
  initialToast?: string | null;
}

export function MealsView({
  data,
  initialEditor,
  initialEditorValues,
  initialDayDate,
  initialOpenDate,
  gridError,
  failedKey: initialFailedKey,
  initialToast,
}: MealsViewProps) {
  const { month } = data;
  const desktop = useMediaQuery("(min-width: 768px)");
  const [editor, setEditor] = useState<EditorTarget | null>(
    initialEditor ?? null,
  );
  const [values, setValues] = useState(initialEditorValues);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [dayDate, setDayDate] = useState<string | null>(initialDayDate ?? null);
  const [toast, setToast] = useState<string | null>(initialToast ?? null);
  const [failedKey, _setFailedKey] = useState<string | null>(
    initialFailedKey ?? null,
  );
  const saving = useRef<ReadonlySet<string>>(new Set()).current;
  const firstOpen = useRef(true);
  const canEdit = !!month && !month.isLocked;

  useEffect(() => {
    if (!editor || !desktop) {
      setAnchor(null);
      return;
    }
    const el = document.querySelector<HTMLElement>(
      `[data-cell="${entryKey(editor.memberId, editor.date)}"]`,
    );
    if (firstOpen.current) {
      el?.scrollIntoView({ block: "nearest", inline: "center" });
      firstOpen.current = false;
    }
    setAnchor(el);
  }, [editor, desktop]);

  const closeEditor = useCallback(() => {
    setEditor(null);
    setValues(undefined);
  }, []);
  const closeDay = useCallback(() => setDayDate(null), []);

  const handleSaveCell = useCallback(
    (_input: UpsertMealInput) => {
      closeEditor();
      setToast("Saved meal entry");
    },
    [closeEditor],
  );

  const handleClearCell = useCallback(() => {
    closeEditor();
    setToast("Cleared day meals");
  }, [closeEditor]);

  const handleSaveBulk = useCallback(
    (_inputs: UpsertMealInput[]) => {
      closeDay();
      setToast("Saved daily meal entries");
    },
    [closeDay],
  );

  const logDate = month
    ? data.today < month.endDate
      ? data.today
      : month.endDate
    : data.today;

  if (!month) {
    const manager = data.viewer.isManager;
    return (
      <div className="flex flex-col gap-5 sm:gap-6">
        <MealsHeader data={data} />
        <Card>
          <EmptyState
            size="lg"
            icon={
              <IconTile tone={manager ? "marigold" : "neutral"} size="lg">
                {manager ? <CalendarPlus /> : <CalendarX />}
              </IconTile>
            }
            title={
              manager
                ? "No active month"
                : "Waiting for the manager to open this month."
            }
            description={
              manager
                ? "Open a meal month to start logging daily meals for your flatmates."
                : `Daily meals appear here as soon as ${data.mess.managerFirstName} opens the month.`
            }
            actions={
              manager && (
                <Button variant="accent">
                  <CalendarPlus />
                  Open a month
                </Button>
              )
            }
          />
        </Card>
      </div>
    );
  }

  const member = editor
    ? data.members.find((m) => m.id === editor.memberId)
    : undefined;
  const entry = editor
    ? data.entries.find(
        (e) => e.memberId === editor.memberId && e.date === editor.date,
      )
    : undefined;
  const range = { start: month.startDate, end: month.endDate };
  const isEmpty = data.entries.length === 0;

  const editorBody =
    editor && member ? (
      <CellEditor
        key={`${editor.memberId}${editor.date}`}
        member={member}
        date={editor.date}
        today={data.today}
        range={range}
        entry={entry}
        initialValues={values}
        autoFocus={desktop}
        size={desktop ? "md" : "lg"}
        onSave={handleSaveCell}
        onClear={handleClearCell}
        onClose={closeEditor}
      />
    ) : null;

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <MealsHeader data={data} onLogDay={() => setDayDate(logDate)} />

      {month.isLocked && (
        <Banner
          tone="neutral"
          title={`${month.longLabel} is closed`}
          description={`Meals are locked. Final meal rate ${formatBDT(data.mealRate)}.`}
        />
      )}

      <MealsSummaryStrip data={data} />

      {gridError ? (
        <Card>
          <ErrorState
            title="Couldn't load the meal sheet"
            description="Your totals above are fine. Check your connection and try again."
          />
        </Card>
      ) : isEmpty && canEdit ? (
        <Card>
          <EmptyState
            size="lg"
            icon={
              <IconTile tone="marigold" size="lg">
                <Utensils />
              </IconTile>
            }
            title="Meal sheet is empty"
            description="Start adding daily meal counts for your flatmates."
            actions={
              <Button variant="accent" onClick={() => setDayDate(logDate)}>
                <CalendarPlus />
                Add Meals
              </Button>
            }
          />
        </Card>
      ) : desktop ? (
        <Card className="overflow-hidden">
          <MealsGrid
            data={data}
            canEdit={canEdit}
            activeKey={editor ? entryKey(editor.memberId, editor.date) : null}
            saving={saving}
            failedKey={failedKey}
            onCellSelect={(memberId, date) => setEditor({ memberId, date })}
          />
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-line px-4 py-3 text-caption text-ink-muted">
            <span className="inline-flex items-center gap-1.5">
              <span
                aria-hidden
                className="size-1.5 rounded-full bg-marigold-500"
              />
              Includes guest meals
            </span>
            <span>Future days are locked until they arrive</span>
            {canEdit && <span>Arrow keys move between days. Enter edits.</span>}
          </p>
        </Card>
      ) : (
        <MobileDayList
          data={data}
          canEdit={canEdit}
          initialOpenDate={initialOpenDate}
          saving={saving}
          failedKey={failedKey}
          onEditCell={(memberId, date) => setEditor({ memberId, date })}
          onEditDay={setDayDate}
        />
      )}

      {desktop ? (
        <Popover
          open={!!editor && !!anchor}
          anchor={anchor}
          onClose={closeEditor}
          label={
            editor && member
              ? `Edit meals for ${member.name}, ${formatDayLong(editor.date)}`
              : "Edit meals"
          }
        >
          {editorBody}
        </Popover>
      ) : (
        <DrawerSheet
          open={!!editor}
          onClose={closeEditor}
          side="bottom"
          title="Edit meals"
          hideTitle
          showClose={false}
          className="bg-surface pb-[env(safe-area-inset-bottom)]"
        >
          {editorBody}
        </DrawerSheet>
      )}

      <DayEntryDialog
        open={dayDate !== null}
        initialDate={dayDate ?? logDate}
        data={data}
        onSave={handleSaveBulk}
        onClose={closeDay}
      />

      {toast && (
        <Toast
          message={toast}
          onDismiss={() => setToast(null)}
          autoDismissMs={3000}
        />
      )}
    </div>
  );
}
