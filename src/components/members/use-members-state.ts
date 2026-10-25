"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  approveMember,
  regenerateCode,
  rejectMember,
  removeMember,
  setManager,
} from "@/lib/members";
import type { MembersData } from "@/lib/types/member.types";

export const MEMBERS_SAVE_ERROR = "Couldn’t save. Try again.";
const LATENCY_MS = 450;

export interface UseMembersStateOptions {
  /** Every action fails and reverts. */
  failSaves?: boolean;
  initialToast?: string;
  initialFailedId?: string;
}

/** Local stand-in for optimistic mutation: apply now, sync later, revert on error. */
export function useMembersState(
  initial: MembersData,
  { failSaves, initialToast, initialFailedId }: UseMembersStateOptions = {},
) {
  const [data, setData] = useState(initial);
  const [saving, setSaving] = useState<ReadonlySet<string>>(new Set());
  const [failedId, setFailedId] = useState<string | null>(
    initialFailedId ?? null,
  );
  const [toast, setToast] = useState<string | null>(initialToast ?? null);
  const dataRef = useRef(data);
  dataRef.current = data;
  const timers = useRef<number[]>([]);
  useEffect(() => {
    const pending = timers.current;
    return () => {
      for (const t of pending) {
        window.clearTimeout(t);
      }
    };
  }, []);

  const run = useCallback(
    (id: string, apply: (d: MembersData) => MembersData, success?: string) => {
      const previous = dataRef.current;
      setData(apply);
      setFailedId(null);
      setToast(null);
      setSaving((s) => new Set(s).add(id));
      const t = window.setTimeout(() => {
        setSaving((s) => {
          const next = new Set(s);
          next.delete(id);
          return next;
        });
        if (failSaves) {
          setData(previous);
          setFailedId(id);
          setToast(MEMBERS_SAVE_ERROR);
        } else if (success) {
          setToast(success);
        }
      }, LATENCY_MS);
      timers.current.push(t);
    },
    [failSaves],
  );

  const approve = useCallback(
    (id: string) => run(id, (d) => approveMember(d, id), "Request approved"),
    [run],
  );
  const reject = useCallback(
    (id: string) => run(id, (d) => rejectMember(d, id), "Request rejected"),
    [run],
  );
  const changeManager = useCallback(
    (id: string, isManager: boolean) =>
      run(id, (d) => setManager(d, id, isManager), "Role updated"),
    [run],
  );
  const remove = useCallback(
    (id: string) => run(id, (d) => removeMember(d, id), "Member removed"),
    [run],
  );
  const regenerate = useCallback(
    () => run("code", regenerateCode, "New room code generated"),
    [run],
  );
  const leave = useCallback(
    (id: string) => run(id, (d) => removeMember(d, id), "You left the mess"),
    [run],
  );
  const notify = useCallback((message: string) => setToast(message), []);
  const dismissToast = useCallback(() => setToast(null), []);

  return {
    data,
    saving,
    failedId,
    toast,
    approve,
    reject,
    changeManager,
    remove,
    regenerate,
    leave,
    notify,
    dismissToast,
  };
}
