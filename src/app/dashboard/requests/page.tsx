"use client";

import { useMemo, useState } from "react";
import { MS } from "@/components/ui/MS";
import { BottomNav } from "@/components/dashboard/Topbar";
import { useAppStore } from "@/store/use-app-store";
import { BLENDS, blendBySlug } from "@/lib/catalog";

export default function RequestsPage() {
  const requests = useAppStore((s) => s.requests);
  const recordRequest = useAppStore((s) => s.recordRequest);
  const keys = useAppStore((s) => s.keys);

  const [prompt, setPrompt] = useState("Summarize today's anomaly logs and flag the top 3 by impact.");
  const [selectedBlend, setSelectedBlend] = useState(BLENDS[1]); // Support Blend default

  const reqsPerMin = useMemo(() => {
    if (requests.length === 0) return 0;
    const last = requests.filter((r) => Date.now() - new Date(r.ts).getTime() < 60000).length;
    return last || Math.min(8421, requests.length * 12);
  }, [requests]);

  function execute() {
    const blend = selectedBlend;
    const tokens = Math.round(prompt.split(/\s+/).length * 1.4);
    const cost = (tokens / 1_000_000) * blend.costPerMTok;
    recordRequest({
      blendId: `apicommerce/${blend.slug}`,
      modelId: `apicommerce/${blend.slug}`,
      keyId: keys[0]?.id ?? "key_demo",
      promptTokens: tokens,
      completionTokens: Math.round(tokens * 0.6),
      costUsd: +cost.toFixed(6),
      latencyMs: blend.latencyMs + Math.round(Math.random() * 40 - 20),
      status: "ok",
      origin: "playground",
    });
  }

  return (
    <>
      <main className="px-margin-mobile md:px-margin-desktop py-lg max-w-container-max mx-auto">
        <section className="mb-lg">
          <p className="font-label-caps text-label-caps text-primary-fixed-dim mb-xs uppercase">
            Routing / Playground
          </p>
          <h2 className="font-headline-lg text-headline-lg text-primary">Panel de Requests</h2>
        </section>

        <div className="mb-lg">
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <MS name="psychology" className="text-secondary-fixed-dim" />
            </div>
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-xl py-5 pl-14 pr-32 font-jetbrains-mono text-body-md focus:ring-1 focus:ring-secondary-fixed-dim focus:border-secondary-fixed-dim transition-all shadow-inner placeholder:text-on-surface-variant/40"
              placeholder="Describe your AI task..."
              type="text"
            />
            <div className="absolute inset-y-2 right-2 flex items-center">
              <button
                onClick={execute}
                className="bg-primary-fixed-dim text-on-primary px-6 h-full rounded-lg font-label-caps text-label-caps flex items-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-primary-container/10 active:scale-95"
              >
                <span>EXECUTE</span>
                <MS name="bolt" size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          {/* Pipeline + Logs */}
          <div className="lg:col-span-2 space-y-gutter">
            <div className="glass-panel rounded-xl p-md relative overflow-hidden h-64 border border-outline-variant/20">
              <div className="flex justify-between items-center mb-md relative z-10">
                <h3 className="font-label-caps text-label-caps text-primary-fixed-dim">LIVE REQUEST STREAM</h3>
                <MS name="fullscreen" className="text-on-surface-variant/40" size={18} />
              </div>
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/4 left-0 w-full h-[1px] neural-pulse" />
                <div className="absolute top-1/2 left-0 w-full h-[1px] neural-pulse" style={{ animationDelay: "1s" }} />
                <div className="absolute top-3/4 left-0 w-full h-[1px] neural-pulse" style={{ animationDelay: "2s" }} />
              </div>
              <div className="relative z-10 flex h-full items-center justify-between px-lg pb-md">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full border-2 border-primary-fixed-dim/30 bg-primary-fixed-dim/10 flex items-center justify-center">
                    <MS name="upload" className="text-primary-fixed-dim" />
                  </div>
                  <span className="font-label-caps text-[10px]">INBOUND</span>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="relative w-24 h-24 md:w-32 md:h-32">
                    <div className="absolute inset-0 rounded-full border-4 border-t-secondary-fixed-dim border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                    <div className="absolute inset-2 rounded-full border border-outline-variant/30 flex items-center justify-center bg-surface-container/40">
                      <span className="font-jetbrains-mono text-headline-md text-secondary-fixed-dim font-bold">
                        CORE
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full border-2 border-secondary-fixed-dim/30 bg-secondary-fixed-dim/10 flex items-center justify-center">
                    <MS name="download" className="text-secondary-fixed-dim" />
                  </div>
                  <span className="font-label-caps text-[10px]">OUTBOUND</span>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-xl overflow-hidden border border-outline-variant/20">
              <div className="px-md py-3 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-high/40">
                <h3 className="font-label-caps text-label-caps text-on-surface-variant">ACTIVE ROUTING LOGS</h3>
                <span className="text-primary-fixed-dim font-jetbrains-mono text-[10px]">
                  {reqsPerMin.toLocaleString()} REQ/MIN
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-jetbrains-mono text-[12px]">
                  <thead className="text-on-surface-variant/60 border-b border-outline-variant/10">
                    <tr>
                      <th className="px-md py-3 font-normal">TIMESTAMP</th>
                      <th className="px-md py-3 font-normal">ID</th>
                      <th className="px-md py-3 font-normal">BLEND</th>
                      <th className="px-md py-3 font-normal">LATENCY</th>
                      <th className="px-md py-3 font-normal">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10 text-on-surface-variant">
                    {requests.slice(0, 15).map((r) => {
                      const slug = r.blendId.split("/").pop() ?? r.blendId;
                      const blend = blendBySlug(slug);
                      return (
                        <tr key={r.id} className="hover:bg-surface-container-highest/30 transition-colors">
                          <td className="px-md py-3">{new Date(r.ts).toLocaleTimeString()}</td>
                          <td className="px-md py-3">#{r.id.slice(0, 5).toUpperCase()}</td>
                          <td className="px-md py-3 text-secondary-fixed-dim">{blend?.name ?? slug}</td>
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
                        <td colSpan={5} className="px-md py-6 text-center text-on-surface-variant/40">
                          Hit EXECUTE to dispatch your first request.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-gutter">
            <div className="glass-panel rounded-xl p-md border-l-4 border-l-secondary-fixed-dim">
              <div className="flex justify-between items-start mb-md">
                <div>
                  <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-1">BLEND SELECTED</h3>
                  <p className="font-headline-md text-headline-md text-secondary-fixed-dim">
                    {selectedBlend.name}
                  </p>
                </div>
                <MS name="auto_awesome" className="text-secondary-fixed-dim" />
              </div>
              <div className="space-y-xs">
                {BLENDS.map((b) => (
                  <button
                    key={b.slug}
                    onClick={() => setSelectedBlend(b)}
                    className={`w-full flex items-center justify-between p-sm rounded text-left transition-colors ${selectedBlend.slug === b.slug ? "bg-secondary-fixed-dim/10 text-secondary-fixed-dim" : "text-on-surface-variant hover:bg-surface-container-high/40"}`}
                  >
                    <span className="flex items-center gap-sm">
                      <MS name={b.icon} size={18} />
                      <span className="font-body-sm">{b.name}</span>
                    </span>
                    <span className="font-jetbrains-mono text-[10px]">{b.latencyMs}ms</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-panel rounded-xl p-md grid grid-cols-2 gap-md">
              <div className="space-y-1">
                <h3 className="font-label-caps text-label-caps text-on-surface-variant">EST. COST</h3>
                <p className="font-stats-lg text-stats-lg text-primary-fixed-dim">
                  ${((selectedBlend.costPerMTok * 1.4 * prompt.split(/\s+/).length) / 1_000_000).toFixed(6)}
                </p>
                <p className="text-[10px] text-on-surface-variant/40">PER REQUEST</p>
              </div>
              <div className="space-y-1">
                <h3 className="font-label-caps text-label-caps text-on-surface-variant">RESPONSE</h3>
                <p className="font-stats-lg text-stats-lg text-secondary-fixed-dim">
                  {(selectedBlend.latencyMs / 1000).toFixed(2)}s
                </p>
                <p className="text-[10px] text-on-surface-variant/40">AVG LATENCY</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <BottomNav active="traffic" />
    </>
  );
}
