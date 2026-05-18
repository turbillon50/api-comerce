"use client";

import { useAppStore, walletBalance } from "@/store/use-app-store";
import { Icon } from "@/components/ui/icon";
import Link from "next/link";

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  const wallet = useAppStore((s) => s.wallet);
  const balance = walletBalance(wallet);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-line/20 bg-bg/70 px-6 backdrop-blur-xl">
      <div className="min-w-0">
        <h1 className="truncate text-lg font-semibold tracking-tight">{title}</h1>
        {subtitle ? <p className="truncate text-xs text-ink-muted">{subtitle}</p> : null}
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex hairline bg-bg-2/70 rounded-lg px-3 py-1.5 text-xs items-center gap-2">
          <Icon name="search" className="h-3.5 w-3.5 text-ink-muted" />
          <input
            placeholder="Buscar blend, key, modelo…"
            className="w-44 bg-transparent text-xs focus:outline-none placeholder:text-ink-muted/60"
          />
          <span className="label-caps text-ink-muted">⌘K</span>
        </div>

        <Link
          href="/dashboard/wallet"
          className="flex items-center gap-2 rounded-lg hairline bg-bg-2/70 px-3 py-1.5 text-xs hover:border-primary/40 transition-colors"
        >
          <Icon name="wallet" className="h-3.5 w-3.5 text-primary" />
          <span className="code text-ink">${balance.toFixed(2)}</span>
        </Link>

        <Link
          href="/dashboard/blends/new"
          className="hidden md:inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-ink hover:brightness-110"
        >
          <Icon name="plus" className="h-3.5 w-3.5" />
          Nuevo blend
        </Link>
      </div>
    </header>
  );
}
