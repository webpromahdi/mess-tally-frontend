import { useQuery } from "@tanstack/react-query";
import { getMonths } from "@/api";
import { queryKeys } from "@/lib/queryKeys";

/** `GET /months` — newest first; FREE messes only see the current month. */
export function useMonths() {
  return useQuery({
    queryKey: queryKeys.workspace.months,
    queryFn: getMonths,
    staleTime: 5 * 60 * 1000,
  });
}
