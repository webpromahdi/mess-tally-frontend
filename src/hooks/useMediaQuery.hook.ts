"use client";

import { useMemo, useSyncExternalStore } from "react";

export function useMediaQuery(query: string): boolean {
  const subscribe = useMemo(
    () => (onChange: () => void) => {
      if (typeof window === "undefined") return () => {};
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => {
      if (typeof window === "undefined") return false;
      return window.matchMedia(query).matches;
    },
    () => false,
  );
}
