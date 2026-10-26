import {
  CalendarPlus,
  CalendarX,
  Settings,
  ShoppingBasket,
  Utensils,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";
import { EmptyState, ErrorState, IconTile } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatBDT, formatMeals } from "@/lib/format";
import type {
  DashboardBlock,
  DashboardData,
} from "@/lib/types/dashboard.types";
import {
  FundStatusCard,
  MealRateCard,
  MessInfoCard,
  MyBalanceCard,
  type SettlementLine,
  StatCard,
  SummaryLinkCard,
} from "./cards";
import { BazarShareChart, MemberBalanceChart } from "./charts";
import {
  ActionQueue,
  DashboardHeader,
  DashboardLayout,
  edgeToEdge,
} from "./layout";

function BlockError({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <ErrorState />
    </Card>
  );
}

/** Composes every dashboard block for a month that exists. `errors` scopes failures to single blocks. */
export function DashboardView({
  data,
  errors = [],
  formulaOpen,
  settlement = [],
}: {
  data: DashboardData;
  errors?: DashboardBlock[];
  formulaOpen?: boolean;
  /** Closed-month settlement lines for the viewer (from `GET /summary`). */
  settlement?: SettlementLine[];
}) {
  const { viewer, mess, month, meal, fund } = data;

  // Case 1: No active month screen
  if (!month || !meal) {
    const manager = viewer.isManager;
    return (
      <div className="flex flex-col gap-5 sm:gap-6">
        <DashboardHeader data={data} />
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-12">
          <Card className="lg:col-span-8">
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
                  ? "Open a meal month to start logging meals, bazar trips and utility bills. Last month’s figures stay in history."
                  : `Meals, bazar and balances show up here as soon as ${mess.managerFirstName} opens the month.`
              }
              actions={
                manager && (
                  <>
                    <Button variant="accent" asChild>
                      <Link href="/dashboard/settings">
                        <CalendarPlus />
                        Open a month
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/dashboard/settings">
                        <Settings />
                        Month settings
                      </Link>
                    </Button>
                  </>
                )
              }
            />
          </Card>
          <MessInfoCard mess={mess} month={null} className="lg:col-span-4" />
        </div>
      </div>
    );
  }

  const failed = (b: DashboardBlock) => errors.includes(b);
  const closed = month.status === "CLOSED";
  const empty = meal.totalMeals === 0 && meal.totalBazar === 0;

  // Closed months are final, so show the caller's own transfers.
  const settlementLines: SettlementLine[] | undefined = closed
    ? settlement
    : undefined;

  const kpiError = <BlockError />;
  const guestHint =
    (meal.totalGuestMeals ?? 0) > 0
      ? "Includes guest meals"
      : "Across all active members";

  const emptyBlock = (
    <Card className={edgeToEdge}>
      <EmptyState
        icon={
          <IconTile tone="aubergine" size="lg">
            <UtensilsCrossed />
          </IconTile>
        }
        title="Meal sheet is empty"
        description={
          viewer.isManager
            ? "Start adding daily meal counts and the first bazar trip. Balances and charts appear here as soon as there is data."
            : `Balances and charts appear once ${mess.managerFirstName} logs meals and bazar for ${month.longLabel}.`
        }
        actions={
          viewer.isManager && (
            <>
              <Button variant="outline" asChild>
                <Link href="/dashboard/meals">
                  <Utensils />
                  Add Meals
                </Link>
              </Button>
              <Button variant="accent" asChild>
                <Link href="/dashboard/bazar">
                  <ShoppingBasket />
                  Add Bazar Trip
                </Link>
              </Button>
            </>
          )
        }
      />
    </Card>
  );

  return (
    <DashboardLayout
      header={<DashboardHeader data={data} />}
      banners={<ActionQueue data={data} />}
      kpiLabel={`Meal accounting · ${month.longLabel}`}
      mealRate={
        failed("kpis") ? (
          kpiError
        ) : (
          <MealRateCard meal={meal} month={month} defaultOpen={formulaOpen} />
        )
      }
      balance={
        failed("kpis") ? (
          kpiError
        ) : (
          <MyBalanceCard
            balance={data.myBalance ?? 0}
            closed={closed}
            settlement={settlementLines}
          />
        )
      }
      totalBazar={
        failed("kpis") ? (
          kpiError
        ) : (
          <StatCard
            label="Total Bazar"
            value={formatBDT(meal.totalBazar)}
            hint="Confirmed mess bazar"
            icon={<ShoppingBasket />}
            tone="marigold"
          />
        )
      }
      totalMeals={
        failed("kpis") ? (
          kpiError
        ) : (
          <StatCard
            label="Total Meals"
            value={formatMeals(meal.totalMeals)}
            unit="meals"
            hint={guestHint}
            icon={<UtensilsCrossed />}
          />
        )
      }
      fund={
        failed("fund") ? (
          <BlockError />
        ) : fund ? (
          <FundStatusCard fund={fund} canManage={viewer.isManager && !closed} />
        ) : null
      }
      memberChart={
        failed("memberBalances") ? (
          <BlockError className={edgeToEdge} />
        ) : empty ? (
          emptyBlock
        ) : (
          <MemberBalanceChart
            members={meal.members}
            viewerId={viewer.memberId}
            className={edgeToEdge}
          />
        )
      }
      bazarChart={
        failed("bazarShare") ? (
          <BlockError className={edgeToEdge} />
        ) : empty ? null : (
          <BazarShareChart
            members={meal.members}
            totalBazar={meal.totalBazar}
            className={edgeToEdge}
          />
        )
      }
      summary={<SummaryLinkCard monthLabel={month.longLabel} />}
      messInfo={<MessInfoCard mess={mess} month={month} />}
    />
  );
}
