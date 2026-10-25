"use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

function subscribe(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia(query);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/** Chart animations and motion effects are JS-driven; they need an explicit reduced-motion check. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => {
      if (typeof window === "undefined") return false;
      return window.matchMedia(query).matches;
    },
    () => false,
  );
}
