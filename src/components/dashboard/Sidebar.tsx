"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MS } from "@/components/ui/MS";

type NavItem = { href: string; label: string; icon: string };

const NAV: NavItem[] = [
  { href: "/dashboard", label: "Cluster Health", icon: "health_and_safety" },
  { href: "/dashboard/blends", label: "API Routing", icon: "alt_route" },
  { href: "/dashboard/requests", label: "Usage Quotas", icon: "data_usage" },
  { href: "/dashboard/keys", label: "Security Keys", icon: "vpn_key" },
  { href: "/dashboard/billing", label: "Billing", icon: "credit_card" },
  { href: "/dashboard/providers", label: "Providers", icon: "hub" },
  { href: "/dashboard/agent", label: "Mascot Module", icon: "smart_toy" },
  { href: "/dashboard/docs", label: "Docs / API", icon: "code" },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex fixed left-0 top-16 bottom-0 w-[280px] bg-surface-container border-r border-outline-variant flex-col py-md z-40">
      <div className="px-md mb-lg">
        <div className="flex items-center gap-md p-md bg-surface-container-low rounded-lg border border-outline-variant/20">
          <div className="w-10 h-10 rounded bg-primary-container flex items-center justify-center text-on-primary font-bold">
            IR
          </div>
          <div>
            <p className="font-jetbrains-mono text-secondary-fixed-dim text-sm font-bold">INFRA_ROOT</p>
            <p className="text-on-surface-variant text-[10px] uppercase tracking-widest">apicommerce-v1.0.4</p>
          </div>
        </div>
      </div>

      <nav className="flex flex-col gap-xs flex-1 overflow-y-auto custom-scrollbar">
        {NAV.map((item) => {
          const active =
            pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                active
                  ? "bg-secondary-container/10 text-secondary-fixed-dim border-l-4 border-secondary-fixed-dim px-4 py-3 flex items-center gap-md transition-all"
                  : "text-on-surface-variant px-4 py-3 flex items-center gap-md hover:bg-surface-container-high transition-all"
              }
            >
              <MS name={item.icon} />
              <span className="font-body-lg text-body-lg">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-md mt-auto">
        <div className="p-md rounded-lg bg-surface-container-highest/30 border border-outline-variant/10">
          <div className="flex justify-between items-center mb-2">
            <span className="font-label-caps text-label-caps text-on-surface-variant">NODE STATUS</span>
            <span className="w-2 h-2 rounded-full bg-primary-fixed shadow-[0_0_8px_#00e383]" />
          </div>
          <p className="font-jetbrains-mono text-[10px] text-primary-fixed-dim">REGION: EU-WEST-1 (PROD)</p>
        </div>
      </div>
    </aside>
  );
}
