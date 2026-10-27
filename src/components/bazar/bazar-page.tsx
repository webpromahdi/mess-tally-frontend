"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { EmptyState, ErrorState, IconTile } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  useBazar,
  useCreateBazar,
  useCreateMonth,
  useDeleteBazar,
  useDeleteBazarReceipt,
  useUpdateBazar,
  useUploadBazarReceipt,
  useWorkspace,
} from "@/hooks";
import { isUpgradeRequired } from "@/lib/apiError";
import { todayIso } from "@/lib/dates";
import { toBazarData } from "@/lib/mappers/bazar.mapper";
import type { BazarInput } from "@/lib/types/bazar.types";
import { useMonthStore } from "@/store";
import { bazarEntrySchema } from "@/validations";
import { BazarView } from "./bazar-view";
import { BazarSkeleton } from "./layout";

/** Validates the designed form values against the API rules before writing. */
function parseEntry(input: BazarInput) {
  const parsed = bazarEntrySchema.safeParse({
    memberId: input.memberId,
    date: input.date,
    amount: input.amount,
    title: input.note.trim() || undefined,
  });
  if (!parsed.success) {
    throw new Error(
      parsed.error.errors[0]?.message ?? "Check the entry and try again.",
    );
  }
  return parsed.data;
}

function UpgradeState() {
  return (
    <Card className="p-4 sm:p-6">
      <EmptyState
        size="lg"
        icon={
          <IconTile tone="marigold" size="lg">
            <Sparkles />
          </IconTile>
        }
        title="This month's bazar log is archived"
        description="Past-month archives are part of MessTally PRO. The current month stays free, and upgrading unlocks every closed month, receipt uploads and PDF statements."
        actions={
          <Button variant="accent" asChild>
            <Link href="/dashboard/settings">
              <Sparkles />
              Upgrade to PRO
            </Link>
          </Button>
        }
      />
    </Card>
  );
}

export function BazarPage() {
  const selectedMonth = useMonthStore((s) => s.selectedMonth);
  const workspace = useWorkspace(selectedMonth);
  const bazarQuery = useBazar({ month: selectedMonth });
  const createBazar = useCreateBazar();
  const updateBazar = useUpdateBazar();
  const deleteBazar = useDeleteBazar();
  const uploadReceipt = useUploadBazarReceipt();
  const deleteReceipt = useDeleteBazarReceipt();
  const createMonth = useCreateMonth();
  const today = todayIso();

  const data = useMemo(() => {
    if (
      !workspace.viewer ||
      !workspace.mess ||
      !workspace.dashboard ||
      !bazarQuery.data?.data
    ) {
      return null;
    }
    return toBazarData({
      viewer: workspace.viewer,
      mess: workspace.mess,
      dashboard: workspace.dashboard,
      members: workspace.members,
      bazar: bazarQuery.data.data,
      today,
    });
  }, [
    workspace.viewer,
    workspace.mess,
    workspace.dashboard,
    workspace.members,
    bazarQuery.data,
    today,
  ]);

  const refetch = () =>
    Promise.all([workspace.refetch(), bazarQuery.refetch()]);

  const handleSave = async (input: BazarInput) => {
    const parsed = parseEntry(input);
    if (input.id) {
      await updateBazar.mutateAsync({
        id: input.id,
        shopperId: parsed.memberId,
        bazarDate: parsed.date,
        amount: parsed.amount,
        // An emptied note resets the stored title to the backend default
        // instead of keeping the old label silently.
        title: parsed.title ?? "",
      });
      return;
    }
    await createBazar.mutateAsync({
      shopperId: parsed.memberId,
      bazarDate: parsed.date,
      amount: parsed.amount,
      ...(parsed.title ? { title: parsed.title } : {}),
    });
  };

  const handleDelete = async (entryId: string) => {
    await deleteBazar.mutateAsync(entryId);
  };

  const handleUploadReceipt = async (entryId: string, file: File) => {
    const result = await uploadReceipt.mutateAsync({
      id: entryId,
      receipt: file,
    });
    return result.data.entry.receiptUrl;
  };

  const handleRemoveReceipt = async (entryId: string) => {
    await deleteReceipt.mutateAsync(entryId);
  };

  const handleCreateMonth = async () => {
    const name = bazarQuery.data?.data.month.name;
    if (!name) throw new Error("Couldn't work out which month to open.");
    await createMonth.mutateAsync({ month: name });
  };

  // A 402 from either query means the selected month is PRO-only.
  if (
    isUpgradeRequired(bazarQuery.error) ||
    isUpgradeRequired(workspace.queries.dashboard.error)
  ) {
    return <UpgradeState />;
  }

  // The roster feeds the payer select and the row names, so wait for it too.
  if (
    workspace.isLoading ||
    workspace.queries.members.isPending ||
    bazarQuery.isPending
  ) {
    return <BazarSkeleton />;
  }

  if (!data) {
    return (
      <Card>
        <ErrorState
          title="Couldn't load bazar entries"
          description="Check your connection and try again."
          onRetry={() => void refetch()}
        />
      </Card>
    );
  }

  return (
    <BazarView
      data={data}
      isPro={workspace.subscription?.isPro ?? false}
      onSave={handleSave}
      onDelete={handleDelete}
      onUploadReceipt={handleUploadReceipt}
      onRemoveReceipt={handleRemoveReceipt}
      onCreateMonth={handleCreateMonth}
    />
  );
}
