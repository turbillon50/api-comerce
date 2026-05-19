"use client";

import Link from "next/link";
import { useMemo } from "react";
import { MS } from "@/components/ui/MS";
import { BottomNav } from "@/components/dashboard/Topbar";
import { useAppStore, walletBalance } from "@/store/use-app-store";
import { BLENDS } from "@/lib/catalog";
import { ACCENT_TEXT } from "@/lib/accent";

export default function DashboardOverview() {
  const blends = useAppStore((s) => s.blends);
  const keys = useAppStore((s) => s.keys);
  const requests = useAppStore((s) => s.requests);
  const wallet = useAppStore((s) => s.wallet);
  const user = useAppStore((s) => s.user);

  const stats = useMemo(() => {
    const totalReqs = requests.length;
    const avgLatency =
      requests.length > 0
        ? Math.round(requests.reduce((a, r) => a + r.latencyMs, 0) / requests.length)
        : 0;
    const successRate =
      requests.length > 0
        ? Math.round((requests.filter((r) => r.status === "ok").length / requests.length) * 1000) / 10
        : 100;
    return { totalReqs, avgLatency, successRate };
  }, [requests]);

  const balance = walletBalance(wallet);

  return (
    <>
      <main className="px-margin-mobile md:px-margin-desktop py-lg max-w-container-max mx-auto">
        <section className="mb-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-lg">
            <div>
              <p className="font-label-caps text-label-caps text-primary-fixed-dim mb-xs uppercase">
                Operations / Overview
              </p>
              <h2 className="font-headline-lg text-headline-lg text-primary">
                {user ? `Welcome back, ${user.name}` : "Cluster Health"}
              </h2>
            </div>
            <div className="flex items-center gap-sm bg-surface-container-low px-md py-sm rounded border border-outline-variant/20">
              <span className="w-2 h-2 rounded-full bg-primary-fixed-dim status-pulse" />
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                All Clusters Operational
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
            <div className="glass-card p-md rounded-lg">
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-sm uppercase">
                Active Blends
              </p>
              <p className="font-stats-lg text-stats-lg text-primary-fixed-dim">
                {String(blends.length).padStart(2, "0")}
              </p>
            </div>
            <div className="glass-card p-md rounded-lg">
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-sm uppercase">
                Total Requests
              </p>
              <p className="font-stats-lg text-stats-lg text-secondary-fixed-dim">{stats.totalReqs}</p>
            </div>
            <div className="glass-card p-md rounded-lg">
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-sm uppercase">
                Avg Latency
              </p>
              <p className="font-stats-lg text-stats-lg text-tertiary-fixed-dim">
                {stats.avgLatency} <span className="text-label-caps">ms</span>
              </p>
            </div>
            <div className="glass-card p-md rounded-lg">
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-sm uppercase">
                Success Rate
              </p>
              <p className="font-stats-lg text-stats-lg text-primary-container">{stats.successRate}%</p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-gutter mb-xl">
          <div className="lg:col-span-2 glass-card rounded-xl p-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-container to-transparent opacity-30" />
            <h4 className="font-label-caps text-label-caps text-primary-fixed-dim uppercase mb-lg">
              Infrastructure Pulse
            </h4>
            <div className="h-48 md:h-64 flex items-end justify-between gap-xs">
              {[0.7, 0.5, 0.85, 0.62, 0.92, 0.74, 1, 0.8, 0.66, 0.5, 0.78, 0.9, 0.6, 0.72, 0.84].map(
                (h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-surface-container-high/40 rounded-t border-t border-primary-fixed-dim/40"
                    style={{ height: `${h * 100}%` }}
                  />
                ),
              )}
            </div>
          </div>

          <div className="glass-card rounded-xl p-lg flex flex-col justify-between">
            <div>
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-sm uppercase">
                Credit Balance
              </p>
              <p className="font-display-lg text-headline-lg text-primary mb-1">${balance.toFixed(2)}</p>
              <p className="font-jetbrains-mono text-on-surface-variant text-body-sm">
                {keys.filter((k) => k.status === "active").length} active keys · {blends.length} blends
              </p>
            </div>
            <Link
              href="/dashboard/billing"
              className="mt-md py-md bg-primary-container text-on-primary font-label-caps text-label-caps rounded uppercase hover:brightness-110 transition-all text-center"
            >
              MANAGE BILLING
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          <div className="lg:col-span-2 glass-card rounded-xl overflow-hidden">
            <div className="px-md py-3 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-high/40">
              <h3 className="font-label-caps text-label-caps text-on-surface-variant">ACTIVE ROUTING LOGS</h3>
              <Link
                href="/dashboard/requests"
                className="text-primary-fixed-dim font-jetbrains-mono text-[10px] hover:underline"
              >
                VIEW ALL →
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-jetbrains-mono text-[12px]">
                <thead className="text-on-surface-variant/60 border-b border-outline-variant/10">
                  <tr>
                    <th className="px-md py-3 font-normal">TIMESTAMP</th>
                    <th className="px-md py-3 font-normal">BLEND</th>
                    <th className="px-md py-3 font-normal">LATENCY</th>
                    <th className="px-md py-3 font-normal">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10 text-on-surface-variant">
                  {requests.slice(0, 6).map((r) => {
                    const blend = blends.find((b) => b.id === r.blendId);
                    return (
                      <tr key={r.id} className="hover:bg-surface-container-highest/30 transition-colors">
                        <td className="px-md py-3">{new Date(r.ts).toLocaleTimeString()}</td>
                        <td className="px-md py-3 text-secondary-fixed-dim">
                          {blend?.name ?? r.blendId}
                        </td>
                        <td className="px-md py-3">{r.latencyMs}ms</td>
                        <td className="px-md py-3">
                          {r.status === "ok" ? (
                            <span className="text-primary-fixed-dim">● SUCCESS</span>
                          ) : r.status === "throttled" ? (
                            <span className="text-tertiary-fixed-dim">● THROTTLED</span>
                          ) : (
                            <span className="text-error">● ERROR</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {requests.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-md py-6 text-center text-on-surface-variant/40">
                        No traffic yet. Make your first request.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="glass-card rounded-xl p-md flex flex-col">
            <div className="flex justify-between items-center border-b border-outline-variant/30 pb-sm mb-md">
              <h3 className="font-label-caps text-label-caps text-secondary-fixed-dim">QUICK ACCESS</h3>
              <MS name="bolt" className="text-secondary-fixed-dim" size={18} />
            </div>
            <div className="space-y-sm flex-1">
              {BLENDS.map((b) => (
                <Link
                  key={b.slug}
                  href="/dashboard/blends"
                  className="flex items-center justify-between p-sm rounded-lg bg-surface-container-high/40 border border-outline-variant/10 hover:border-primary-fixed-dim/40 transition-colors group"
                >
                  <div className="flex items-center gap-sm">
                    <MS name={b.icon} className={ACCENT_TEXT[b.accent]} />
                    <span className="font-body-sm text-on-surface group-hover:text-primary">{b.name}</span>
                  </div>
                  <span className={`font-jetbrains-mono text-[10px] ${ACCENT_TEXT[b.accent]}`}>
                    ${b.price.toFixed(2)} / {b.unit === "1M tokens" ? "Mt" : "img"}
                  </span>
                </Link>
              ))}
            </div>
            <Link
              href="/dashboard/blends/new"
              className="mt-md py-sm border border-primary-fixed-dim/40 text-primary-fixed-dim font-label-caps text-label-caps rounded uppercase hover:bg-primary-fixed-dim/10 transition-all text-center"
            >
              + DEPLOY BLEND
            </Link>
          </div>
        </section>
      </main>
      <BottomNav active="nodes" />
    </>
  );
}
