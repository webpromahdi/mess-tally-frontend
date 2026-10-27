"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { EmptyState, ErrorState, IconTile } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  useCreateFundDeposit,
  useCreateMonth,
  useCreateUtilityBill,
  useDeleteFundDeposit,
  useDeleteUtilityBill,
  useFundDeposits,
  useSetUtilityBillPaid,
  useUpdateFundDeposit,
  useUpdateUtilityBill,
  useUtilityBills,
  useUtilityFund,
  useWorkspace,
} from "@/hooks";
import { isUpgradeRequired } from "@/lib/apiError";
import { todayIso } from "@/lib/dates";
import { toUtilityCategory, toUtilityData } from "@/lib/mappers/utility.mapper";
import type { UtilityInput } from "@/lib/types/utility.types";
import { useMonthStore } from "@/store";
import {
  fundDepositSchema,
  updateUtilityBillSchema,
  utilityBillSchema,
} from "@/validations";
import { UtilitySkeleton } from "./layout";
import { UtilityView } from "./utility-view";

function firstError(error: { errors: { message: string }[] }): never {
  throw new Error(error.errors[0]?.message ?? "Check the entry and try again.");
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
        title="This month's utility ledger is archived"
        description="Past-month archives are part of MessTally PRO. The current month stays free, and upgrading unlocks every closed month's bills, deposits and summary."
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

export function UtilityPage() {
  const selectedMonth = useMonthStore((s) => s.selectedMonth);
  const workspace = useWorkspace(selectedMonth);
  const billsQuery = useUtilityBills(selectedMonth);
  const fundQuery = useUtilityFund(selectedMonth);
  const depositsQuery = useFundDeposits(selectedMonth);
  const createBill = useCreateUtilityBill();
  const updateBill = useUpdateUtilityBill();
  const deleteBill = useDeleteUtilityBill();
  const setBillPaid = useSetUtilityBillPaid();
  const createDeposit = useCreateFundDeposit();
  const updateDeposit = useUpdateFundDeposit();
  const deleteDeposit = useDeleteFundDeposit();
  const createMonth = useCreateMonth();
  const today = todayIso();

  const data = useMemo(() => {
    if (
      !workspace.viewer ||
      !workspace.mess ||
      !workspace.dashboard ||
      !billsQuery.data?.data ||
      !fundQuery.data?.data ||
      !depositsQuery.data?.data
    ) {
      return null;
    }
    return toUtilityData({
      viewer: workspace.viewer,
      mess: workspace.mess,
      dashboard: workspace.dashboard,
      members: workspace.members,
      bills: billsQuery.data.data,
      fund: fundQuery.data.data,
      deposits: depositsQuery.data.data,
      today,
    });
  }, [
    workspace.viewer,
    workspace.mess,
    workspace.dashboard,
    workspace.members,
    billsQuery.data,
    fundQuery.data,
    depositsQuery.data,
    today,
  ]);

  const refetch = () =>
    Promise.all([
      workspace.refetch(),
      billsQuery.refetch(),
      fundQuery.refetch(),
      depositsQuery.refetch(),
    ]);

  const handleSave = async (input: UtilityInput) => {
    const monthKey =
      billsQuery.data?.data.month.name ??
      fundQuery.data?.data.month.name ??
      selectedMonth;

    if (input.kind === "DEPOSIT") {
      const parsed = fundDepositSchema.safeParse({
        memberId: input.memberId ?? "",
        amount: input.amount,
        date: input.date,
        note: input.note.trim() || null,
      });
      if (!parsed.success) firstError(parsed.error);
      const payload = {
        memberId: parsed.data.memberId,
        amount: parsed.data.amount,
        date: parsed.data.date,
        note: parsed.data.note,
      };
      if (input.id) {
        await updateDeposit.mutateAsync({ id: input.id, ...payload });
      } else {
        await createDeposit.mutateAsync(payload);
      }
      return;
    }

    if (!monthKey) throw new Error("Couldn't work out which month to use.");

    // The design's single Note field maps to the required API `title`.
    const title = input.note.trim() || `${input.category ?? "Utility"} bill`;

    if (input.id) {
      const parsed = updateUtilityBillSchema.safeParse({
        category: input.category,
        title,
        amount: input.amount,
        dueDate: input.date,
      });
      if (!parsed.success) firstError(parsed.error);
      await updateBill.mutateAsync({
        id: input.id,
        category: toUtilityCategory(parsed.data.category),
        title: parsed.data.title,
        amount: parsed.data.amount,
        dueDate: parsed.data.dueDate,
      });
      return;
    }

    const parsed = utilityBillSchema.safeParse({
      month: monthKey,
      category: input.category,
      title,
      amount: input.amount,
      dueDate: input.date,
    });
    if (!parsed.success) firstError(parsed.error);
    await createBill.mutateAsync({
      month: parsed.data.month,
      category: toUtilityCategory(parsed.data.category),
      title: parsed.data.title,
      amount: parsed.data.amount,
      dueDate: parsed.data.dueDate,
    });
  };

  const handleDelete = async (entry: {
    id: string;
    kind: UtilityInput["kind"];
  }) => {
    if (entry.kind === "DEPOSIT") {
      await deleteDeposit.mutateAsync(entry.id);
      return;
    }
    await deleteBill.mutateAsync(entry.id);
  };

  const handleTogglePaid = async ({
    id,
    isPaid,
  }: {
    id: string;
    isPaid: boolean;
  }) => {
    await setBillPaid.mutateAsync({ id, isPaid: !isPaid });
  };

  const handleCreateMonth = async () => {
    const name =
      billsQuery.data?.data.month.name ?? fundQuery.data?.data.month.name;
    if (!name) throw new Error("Couldn't work out which month to open.");
    await createMonth.mutateAsync({ month: name });
  };

  // A 402 from any scoped read means the selected month is PRO-only.
  if (
    isUpgradeRequired(billsQuery.error) ||
    isUpgradeRequired(fundQuery.error) ||
    isUpgradeRequired(depositsQuery.error) ||
    isUpgradeRequired(workspace.queries.dashboard.error)
  ) {
    return <UpgradeState />;
  }

  // The roster feeds the depositor select and row names, so wait for it too.
  if (
    workspace.isLoading ||
    workspace.queries.members.isPending ||
    billsQuery.isPending ||
    fundQuery.isPending ||
    depositsQuery.isPending
  ) {
    return <UtilitySkeleton />;
  }

  if (!data) {
    return (
      <Card>
        <ErrorState
          title="Couldn't load the utility ledger"
          description="Check your connection and try again."
          onRetry={() => void refetch()}
        />
      </Card>
    );
  }

  return (
    <UtilityView
      data={data}
      onSave={handleSave}
      onDelete={handleDelete}
      onTogglePaid={async (entry) =>
        handleTogglePaid({ id: entry.id, isPaid: entry.isPaid })
      }
      onCreateMonth={data.viewer.isManager ? handleCreateMonth : undefined}
    />
  );
}
