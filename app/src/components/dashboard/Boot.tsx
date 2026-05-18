"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/use-app-store";

/**
 * Mounts on every dashboard page. Hydrates the persisted store, seeds initial
 * mock data, and bounces unauthenticated users to /auth/login.
 */
export function DashboardBoot() {
  const router = useRouter();
  const bootstrap = useAppStore((s) => s.bootstrap);
  const user = useAppStore((s) => s.user);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Defer the auth check to next tick so persisted state has time to hydrate
    const t = setTimeout(() => {
      if (!useAppStore.getState().user) {
        router.replace("/auth/login");
      }
    }, 60);
    return () => clearTimeout(t);
  }, [router, user]);

  return null;
}
