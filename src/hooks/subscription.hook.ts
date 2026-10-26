import { useQuery } from "@tanstack/react-query";
import { getSubscription } from "@/api";
import { queryKeys } from "@/lib/queryKeys";

/** `GET /subscription` — plan badge and PRO gates. */
export function useSubscription() {
  return useQuery({
    queryKey: queryKeys.workspace.subscription,
    queryFn: getSubscription,
    staleTime: 5 * 60 * 1000,
  });
}
