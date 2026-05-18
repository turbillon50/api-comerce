"use client";

import { useState } from "react";
import { MS } from "@/components/ui/MS";
import { BottomNav } from "@/components/dashboard/Topbar";
import { useAppStore } from "@/store/use-app-store";
import { BLENDS } from "@/lib/catalog";

export default function KeysPage() {
  const keys = useAppStore((s) => s.keys);
  const createKey = useAppStore((s) => s.createKey);
  const revokeKey = useAppStore((s) => s.revokeKey);
  const blends = useAppStore((s) => s.blends);

  const [label, setLabel] = useState("production-key");
  const [blendId, setBlendId] = useState<string>("");
  const [budget, setBudget] = useState(100);
  const [reveal, setReveal] = useState<string | null>(null);

  function generate() {
    const k = createKey(label, blendId || null, budget);
    setReveal(k.full);
    setLabel("production-key");
  }

  return (
    <>
      <main className="px-margin-mobile md:px-margin-desktop py-lg max-w-container-max mx-auto">
        <section className="mb-lg">
          <p className="font-label-caps text-label-caps text-primary-fixed-dim mb-xs uppercase">
            Access / Credentials
          </p>
          <h2 className="font-headline-lg text-headline-lg text-primary">Security Keys</h2>
          <p className="text-on-surface-variant font-body-md mt-sm">
            Issue scoped API keys with budget caps. Keys are shown once on creation — store them in your vault.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          <div className="lg:col-span-1 space-y-gutter">
            <div className="glass-card p-lg rounded-xl space-y-md">
              <h3 className="font-label-caps text-label-caps text-secondary-fixed-dim">ISSUE NEW KEY</h3>
              <div>
                <label className="font-label-caps text-label-caps text-on-surface-variant block mb-xs uppercase">
                  Label
                </label>
                <input
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-lg px-md py-3 font-jetbrains-mono text-body-md focus:ring-1 focus:ring-primary-fixed-dim focus:border-primary-fixed-dim"
                />
              </div>
              <div>
                <label className="font-label-caps text-label-caps text-on-surface-variant block mb-xs uppercase">
                  Scoped Blend
                </label>
                <select
                  value={blendId}
                  onChange={(e) => setBlendId(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-lg px-md py-3 font-jetbrains-mono text-body-md focus:ring-1 focus:ring-primary-fixed-dim"
                >
                  <option value="">All blends</option>
                  {BLENDS.map((b) => (
                    <option key={b.slug} value={`apicommerce/${b.slug}`}>
                      {b.name}
                    </option>
                  ))}
                  {blends.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} (custom)
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-label-caps text-label-caps text-on-surface-variant block mb-xs uppercase">
                  Monthly Budget (USD)
                </label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-lg px-md py-3 font-jetbrains-mono text-body-md focus:ring-1 focus:ring-primary-fixed-dim"
                />
              </div>
              <button
                onClick={generate}
                className="w-full py-md bg-primary-container text-on-primary font-label-caps text-label-caps rounded uppercase hover:brightness-110 transition-all emerald-glow"
              >
                GENERATE KEY
              </button>
            </div>

            {reveal && (
              <div className="glass-card p-lg rounded-xl border-l-4 border-l-primary-fixed-dim">
                <p className="font-label-caps text-label-caps text-primary-fixed-dim mb-sm">
                  NEW KEY — COPY NOW
                </p>
                <code className="block font-jetbrains-mono text-xs text-on-surface bg-surface-container-lowest p-sm rounded break-all">
                  {reveal}
                </code>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(reveal);
                  }}
                  className="mt-sm text-secondary-fixed-dim font-label-caps text-label-caps hover:underline"
                >
                  Copy to clipboard
                </button>
              </div>
            )}
          </div>

          <div className="lg:col-span-2 glass-card rounded-xl overflow-hidden">
            <div className="px-md py-3 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-high/40">
              <h3 className="font-label-caps text-label-caps text-on-surface-variant">ISSUED KEYS</h3>
              <span className="text-primary-fixed-dim font-jetbrains-mono text-[10px]">
                {keys.filter((k) => k.status === "active").length} ACTIVE
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-jetbrains-mono text-[12px]">
                <thead className="text-on-surface-variant/60 border-b border-outline-variant/10">
                  <tr>
                    <th className="px-md py-3 font-normal">LABEL</th>
                    <th className="px-md py-3 font-normal">PREFIX</th>
                    <th className="px-md py-3 font-normal">BUDGET</th>
                    <th className="px-md py-3 font-normal">SPEND</th>
                    <th className="px-md py-3 font-normal">STATUS</th>
                    <th className="px-md py-3 font-normal"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10 text-on-surface-variant">
                  {keys.map((k) => (
                    <tr key={k.id} className="hover:bg-surface-container-highest/30 transition-colors">
                      <td className="px-md py-3 text-on-surface">{k.label}</td>
                      <td className="px-md py-3 text-secondary-fixed-dim">{k.prefix}…</td>
                      <td className="px-md py-3">${k.monthlyBudget}</td>
                      <td className="px-md py-3 text-tertiary-fixed-dim">${k.monthlySpend.toFixed(2)}</td>
                      <td className="px-md py-3">
                        {k.status === "active" ? (
                          <span className="text-primary-fixed-dim">● ACTIVE</span>
                        ) : (
                          <span className="text-error">● REVOKED</span>
                        )}
                      </td>
                      <td className="px-md py-3 text-right">
                        {k.status === "active" && (
                          <button
                            onClick={() => revokeKey(k.id)}
                            className="text-error hover:underline font-label-caps text-label-caps"
                          >
                            REVOKE
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {keys.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-md py-6 text-center text-on-surface-variant/40">
                        No keys yet. Generate one to start consuming the API.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <BottomNav active="admin" />
    </>
  );
}
