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
  actions?: {
    approve: (id: string) => Promise<void>;
    reject: (id: string) => Promise<void>;
    changeManager: (id: string, isManager: boolean) => Promise<void>;
    remove: (id: string) => Promise<void>;
    leave: () => Promise<void>;
  };
}

/** Local stand-in for optimistic mutation: apply now, sync later, revert on error. */
export function useMembersState(
  initial: MembersData,
  {
    failSaves,
    initialToast,
    initialFailedId,
    actions,
  }: UseMembersStateOptions = {},
) {
  const [data, setData] = useState(initial);
  const [saving, setSaving] = useState<ReadonlySet<string>>(new Set());
  const [failedId, setFailedId] = useState<string | null>(
    initialFailedId ?? null,
  );
  const [toast, setToast] = useState<string | null>(initialToast ?? null);
  const dataRef = useRef(data);
  dataRef.current = data;
  useEffect(() => {
    setData(initial);
  }, [initial]);
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

  const approve = useCallback(async (id: string) => {
    if (failSaves) return run(id, (d) => approveMember(d, id), "Request approved");
    try {
      await actions?.approve(id);
      setToast("Request approved");
    } catch {
      setFailedId(id);
      setToast(MEMBERS_SAVE_ERROR);
    }
  }, [actions, failSaves, run]);
  const reject = useCallback(async (id: string) => {
    if (failSaves) return run(id, (d) => rejectMember(d, id), "Request rejected");
    try {
      await actions?.reject(id);
      setToast("Request rejected");
    } catch {
      setFailedId(id);
      setToast(MEMBERS_SAVE_ERROR);
    }
  }, [actions, failSaves, run]);
  const changeManager = useCallback(async (id: string, isManager: boolean) => {
    if (failSaves) return run(id, (d) => setManager(d, id, isManager), "Role updated");
    try {
      await actions?.changeManager(id, isManager);
      setToast("Role updated");
    } catch {
      setFailedId(id);
      setToast(MEMBERS_SAVE_ERROR);
    }
  }, [actions, failSaves, run]);
  const remove = useCallback(async (id: string) => {
    if (failSaves) return run(id, (d) => removeMember(d, id), "Member removed");
    try {
      await actions?.remove(id);
      setToast("Member removed");
    } catch {
      setFailedId(id);
      setToast(MEMBERS_SAVE_ERROR);
    }
  }, [actions, failSaves, run]);
  const regenerate = useCallback(
    () => run("code", regenerateCode, "New room code generated"),
    [run],
  );
  const leave = useCallback(async () => {
    if (failSaves) return run("leave", (d) => removeMember(d, d.viewer.memberId), "You left the mess");
    try {
      await actions?.leave();
      setToast("You left the mess");
    } catch {
      setFailedId("leave");
      setToast(MEMBERS_SAVE_ERROR);
    }
  }, [actions, failSaves, run]);
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
