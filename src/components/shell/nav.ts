import {
  ChartPie,
  LayoutDashboard,
  type LucideIcon,
  Settings,
  ShoppingBasket,
  Users,
  UtensilsCrossed,
  Zap,
} from "lucide-react";
import type { NavKey } from "./types";

export interface NavItem {
  key: NavKey;
  label: string;
  href: string;
  icon: LucideIcon;
}

export const primaryNav: NavItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    key: "meals",
    label: "Meals",
    href: "/dashboard/meals",
    icon: UtensilsCrossed,
  },
  {
    key: "bazar",
    label: "Bazar",
    href: "/dashboard/bazar",
    icon: ShoppingBasket,
  },
  {
    key: "utility",
    label: "Utility",
    href: "/dashboard/utilities",
    icon: Zap,
  },
  {
    key: "summary",
    label: "Summary",
    href: "/dashboard/summary",
    icon: ChartPie,
  },
];

export const messNav: NavItem[] = [
  {
    key: "members",
    label: "Members",
    href: "/dashboard/members",
    icon: Users,
  },
  {
    key: "settings",
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

/** Bottom nav: 4 primary routes + More (Design.md §11.2). */
export const bottomNav: NavItem[] = primaryNav.slice(0, 4);
