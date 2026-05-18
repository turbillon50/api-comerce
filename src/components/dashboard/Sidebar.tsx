"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { Icon, type IconKey } from "@/components/ui/icon";
import { useAppStore } from "@/store/use-app-store";
import { useRouter } from "next/navigation";

const NAV: { href: string; label: string; icon: IconKey }[] = [
  { href: "/dashboard", label: "Resumen", icon: "home" },
  { href: "/dashboard/blends", label: "Blends", icon: "layers" },
  { href: "/dashboard/keys", label: "API Keys", icon: "key" },
  { href: "/dashboard/requests", label: "Requests", icon: "activity" },
  { href: "/dashboard/wallet", label: "Wallet", icon: "wallet" },
  { href: "/dashboard/providers", label: "Proveedores", icon: "network" },
  { href: "/dashboard/agent", label: "Agente Prism", icon: "bot" },
  { href: "/dashboard/docs", label: "Docs & API", icon: "files" },
];

export function Sidebar() {
  const pathname = usePathname();
  const user = useAppStore((s) => s.user);
  const signOut = useAppStore((s) => s.signOut);
  const router = useRouter();

  return (
    <aside className="hidden lg:flex w-[260px] shrink-0 flex-col border-r border-line/20 bg-bg-surface/80 backdrop-blur-md">
      <div className="px-5 py-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-ink shadow-glow-primary">
            <span className="font-bold">A</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold">APICommerce</div>
            <div className="label-caps text-ink-muted">Console</div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-1">
        {NAV.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-primary/10 text-primary border border-primary/30"
                  : "text-ink-dim hover:bg-bg-3/60 hover:text-ink border border-transparent",
              )}
            >
              <Icon name={item.icon} className="h-4 w-4 shrink-0" />
              <span className="truncate">{item.label}</span>
              {active ? (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary animate-pulse-soft" />
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-line/20 p-3">
        <div className="rounded-lg hairline bg-bg-2/60 p-3">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-secondary/15 text-secondary">
              <Icon name="users" className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold">{user?.name ?? "Invitado"}</div>
              <div className="truncate text-[11px] text-ink-muted">{user?.org ?? "—"}</div>
            </div>
            <button
              title="Salir"
              onClick={() => {
                signOut();
                router.push("/");
              }}
              className="text-ink-muted hover:text-ink"
            >
              <Icon name="logOut" className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-2.5 flex items-center justify-between">
            <span className="pill pill-success">{user?.plan ?? "starter"}</span>
            <Link href="/dashboard/wallet" className="text-[11px] code text-ink-muted hover:text-ink">
              Wallet →
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
