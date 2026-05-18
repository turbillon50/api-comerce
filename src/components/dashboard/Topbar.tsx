"use client";

import { MS } from "@/components/ui/MS";

export function Topbar({ subtitle }: { subtitle?: string }) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-gutter h-16 bg-surface/60 backdrop-blur-xl border-b border-outline-variant/30">
      <div className="flex items-center gap-md">
        <MS name="terminal" className="text-primary-fixed-dim" />
        <div className="flex flex-col leading-tight">
          <h1 className="font-jetbrains-mono text-headline-md font-bold text-primary-fixed-dim drop-shadow-[0_0_8px_rgba(0,227,131,0.5)] uppercase tracking-tighter">
            APICOMERCE
          </h1>
          {subtitle ? (
            <span className="font-label-caps text-on-surface-variant opacity-70">{subtitle}</span>
          ) : (
            <span className="font-label-caps text-on-surface-variant opacity-70">
              Infrastructure for AI Consumption
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-md">
        <div className="hidden md:flex items-center gap-sm px-3 py-1 bg-surface-container-high rounded-full border border-outline-variant/20">
          <span className="w-2 h-2 rounded-full bg-primary-fixed-dim animate-pulse" />
          <span className="font-label-caps text-label-caps text-primary-fixed-dim">SYSTEM ONLINE</span>
        </div>
        <MS name="sensors" className="text-primary-fixed-dim" />
      </div>
    </header>
  );
}

export function BottomNav({ active }: { active: "nodes" | "traffic" | "mascot" | "logs" | "admin" }) {
  const items: { key: typeof active; icon: string; label: string; href: string }[] = [
    { key: "nodes", icon: "hub", label: "Nodes", href: "/dashboard" },
    { key: "traffic", icon: "insights", label: "Traffic", href: "/dashboard/requests" },
    { key: "mascot", icon: "smart_toy", label: "Mascot", href: "/dashboard/agent" },
    { key: "logs", icon: "code", label: "Logs", href: "/dashboard/docs" },
    { key: "admin", icon: "settings", label: "Admin", href: "/dashboard/providers" },
  ];
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 h-20 bg-surface-container-lowest/80 backdrop-blur-lg border-t border-secondary-container/20">
      {items.map((i) => (
        <a
          key={i.key}
          href={i.href}
          className={
            i.key === active
              ? "flex flex-col items-center justify-center text-primary-fixed-dim font-bold scale-110 drop-shadow-[0_0_5px_rgba(0,227,131,0.4)]"
              : "flex flex-col items-center justify-center text-on-surface-variant/60 hover:text-secondary-fixed"
          }
        >
          <MS name={i.icon} fill={i.key === active} />
          <span className="font-label-caps text-[10px]">{i.label}</span>
        </a>
      ))}
    </nav>
  );
}
