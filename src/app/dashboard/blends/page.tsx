"use client";

import Link from "next/link";
import { MS } from "@/components/ui/MS";
import { BottomNav } from "@/components/dashboard/Topbar";
import { useAppStore } from "@/store/use-app-store";
import { BLENDS } from "@/lib/catalog";
import { ACCENT_TEXT, ACCENT_BORDER_L, ACCENT_BG_SOFT, ACCENT_SHADOW } from "@/lib/accent";

export default function BlendsPage() {
  const blends = useAppStore((s) => s.blends);

  return (
    <>
      <main className="px-margin-mobile md:px-margin-desktop py-lg max-w-container-max mx-auto">
        <section className="mb-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-lg">
            <div>
              <p className="font-label-caps text-label-caps text-primary-fixed-dim mb-xs uppercase">
                Infrastructure / Compute
              </p>
              <h2 className="font-headline-lg text-headline-lg text-primary">Sistema de Blends</h2>
            </div>
            <Link
              href="/dashboard/blends/new"
              className="px-md py-sm bg-primary-container text-on-primary font-label-caps text-label-caps rounded uppercase hover:brightness-110 transition-all flex items-center gap-sm w-fit"
            >
              <MS name="add" size={18} /> DEPLOY NEW BLEND
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter mb-xl">
            <div className="glass-card p-md rounded-lg">
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-sm uppercase">Active</p>
              <p className="font-stats-lg text-stats-lg text-primary-fixed-dim">{BLENDS.length}</p>
            </div>
            <div className="glass-card p-md rounded-lg">
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-sm uppercase">Throughput</p>
              <p className="font-stats-lg text-stats-lg text-secondary-fixed-dim">
                1.2M <span className="text-label-caps">t/s</span>
              </p>
            </div>
            <div className="glass-card p-md rounded-lg">
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-sm uppercase">Avg Latency</p>
              <p className="font-stats-lg text-stats-lg text-tertiary-fixed-dim">
                124 <span className="text-label-caps">ms</span>
              </p>
            </div>
            <div className="glass-card p-md rounded-lg">
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-sm uppercase">Node Health</p>
              <p className="font-stats-lg text-stats-lg text-primary-container">99.9%</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
            {BLENDS.map((b) => (
              <div
                key={b.slug}
                className={`glass-card rounded-xl overflow-hidden flex flex-col border-l-4 ${ACCENT_BORDER_L[b.accent]} transition-all duration-300 hover:translate-y-[-4px] ${ACCENT_SHADOW[b.accent]}`}
              >
                <div className="p-lg flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-sm mb-xs">
                      <MS name={b.icon} className={ACCENT_TEXT[b.accent]} />
                      <h3 className="font-headline-md text-headline-md text-primary">{b.name}</h3>
                    </div>
                    <p className="text-on-surface-variant text-body-sm max-w-sm">{b.description}</p>
                  </div>
                  <span
                    className={`font-label-caps text-label-caps ${ACCENT_TEXT[b.accent]} ${ACCENT_BG_SOFT[b.accent]} px-sm py-xs rounded whitespace-nowrap`}
                  >
                    {b.status}
                  </span>
                </div>
                <div className="px-lg pb-lg mt-auto">
                  <div className="grid grid-cols-2 gap-md mb-md">
                    <div className="bg-surface-container-lowest p-sm rounded border border-outline-variant/10">
                      <p className="font-label-caps text-label-caps text-on-surface-variant mb-xs">
                        COST / {b.unit.toUpperCase()}
                      </p>
                      <p className={`font-stats-lg text-stats-lg ${ACCENT_TEXT[b.accent]}`}>
                        ${b.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-surface-container-lowest p-sm rounded border border-outline-variant/10">
                      <p className="font-label-caps text-label-caps text-on-surface-variant mb-xs">LATENCY</p>
                      <p className={`font-stats-lg text-stats-lg ${ACCENT_TEXT[b.accent]}`}>{b.latencyMs}ms</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-xs">
                    {b.tags.map((t) => (
                      <span
                        key={t}
                        className="font-label-caps text-[9px] border border-outline-variant px-xs py-[2px] rounded uppercase text-on-surface-variant"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {blends.length > 0 && (
          <section>
            <div className="mb-lg">
              <p className="font-label-caps text-label-caps text-secondary-fixed-dim mb-xs uppercase">
                User-Deployed
              </p>
              <h2 className="font-headline-md text-headline-md text-primary">Your Custom Blends</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
              {blends.map((b) => (
                <div
                  key={b.id}
                  className="glass-card rounded-xl p-lg flex flex-col border-l-4 border-l-secondary-fixed-dim"
                >
                  <div className="flex items-start justify-between mb-md">
                    <div>
                      <h3 className="font-headline-md text-headline-md text-primary">{b.name}</h3>
                      <p className="text-on-surface-variant text-body-sm">{b.description}</p>
                    </div>
                    <span className="font-label-caps text-label-caps text-secondary-fixed-dim bg-secondary-fixed-dim/10 px-sm py-xs rounded uppercase">
                      {b.visibility}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-md mt-auto">
                    <div className="bg-surface-container-lowest p-sm rounded">
                      <p className="font-label-caps text-label-caps text-on-surface-variant mb-xs">PRICE/Mt</p>
                      <p className="font-stats-lg text-stats-lg text-primary">${b.pricePerMtok.toFixed(2)}</p>
                    </div>
                    <div className="bg-surface-container-lowest p-sm rounded">
                      <p className="font-label-caps text-label-caps text-on-surface-variant mb-xs">MARGIN</p>
                      <p className="font-stats-lg text-stats-lg text-primary-fixed-dim">{b.margin}%</p>
                    </div>
                    <div className="bg-surface-container-lowest p-sm rounded">
                      <p className="font-label-caps text-label-caps text-on-surface-variant mb-xs">REQS</p>
                      <p className="font-stats-lg text-stats-lg text-secondary-fixed-dim">{b.requests}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      <BottomNav active="nodes" />
    </>
  );
}
