"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import { MS } from "@/components/ui/MS";
import { BottomNav } from "@/components/dashboard/Topbar";
import { useAppStore } from "@/store/use-app-store";
import { BLENDS } from "@/lib/catalog";
import { ACCENT_TEXT, ACCENT_BORDER_L } from "@/lib/accent";

export default function NewBlendPage() {
  const router = useRouter();
  const upsertBlend = useAppStore((s) => s.upsertBlend);

  const [name, setName] = useState("My Custom Blend");
  const [description, setDescription] = useState("Tuned routing for product analytics workloads.");
  const [base, setBase] = useState<(typeof BLENDS)[number]>(BLENDS[0]);
  const [margin, setMargin] = useState(35);
  const [visibility, setVisibility] = useState<"private" | "unlisted" | "marketplace">("private");

  const finalPrice = +(base.costPerMTok * (1 + margin / 100)).toFixed(2);

  function deploy() {
    upsertBlend({
      id: "bld_" + nanoid(8),
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      description,
      useCase: "chatbot",
      components: [{ modelId: `apicommerce/${base.slug}`, weight: 100, role: "primary" }],
      margin,
      pricePerMtok: finalPrice,
      visibility,
      createdAt: new Date().toISOString(),
      requests: 0,
      successRate: 100,
    });
    router.push("/dashboard/blends");
  }

  return (
    <>
      <main className="px-margin-mobile md:px-margin-desktop py-lg max-w-container-max mx-auto">
        <section className="mb-lg">
          <p className="font-label-caps text-label-caps text-primary-fixed-dim mb-xs uppercase">
            Compute / Deploy
          </p>
          <h2 className="font-headline-lg text-headline-lg text-primary">Compose a New Blend</h2>
          <p className="text-on-surface-variant font-body-md max-w-2xl mt-sm">
            Inherit one of the four canonical blends and tune your pricing margin. Each blend routes through the
            APICommerce neural pipeline for sub-second latency.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          <div className="lg:col-span-2 space-y-gutter">
            <div className="glass-card p-lg rounded-xl space-y-md">
              <h3 className="font-label-caps text-label-caps text-secondary-fixed-dim">METADATA</h3>
              <div>
                <label className="font-label-caps text-label-caps text-on-surface-variant block mb-xs uppercase">
                  Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-lg px-md py-3 font-jetbrains-mono text-body-md focus:ring-1 focus:ring-primary-fixed-dim focus:border-primary-fixed-dim"
                />
              </div>
              <div>
                <label className="font-label-caps text-label-caps text-on-surface-variant block mb-xs uppercase">
                  Description
                </label>
                <textarea
                  value={description}
                  rows={3}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-lg px-md py-3 text-body-md focus:ring-1 focus:ring-primary-fixed-dim focus:border-primary-fixed-dim resize-none"
                />
              </div>
            </div>

            <div className="glass-card p-lg rounded-xl">
              <h3 className="font-label-caps text-label-caps text-secondary-fixed-dim mb-md">BASE BLEND</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                {BLENDS.map((b) => {
                  const active = base.slug === b.slug;
                  return (
                    <button
                      key={b.slug}
                      onClick={() => setBase(b)}
                      className={`p-md rounded-lg text-left transition-all border-l-4 ${ACCENT_BORDER_L[b.accent]} ${active ? "bg-surface-container-high border-primary-fixed-dim/40" : "bg-surface-container-lowest hover:bg-surface-container-high/40"}`}
                    >
                      <div className="flex items-center gap-sm mb-xs">
                        <MS name={b.icon} className={ACCENT_TEXT[b.accent]} />
                        <span className="font-headline-md text-primary">{b.name}</span>
                      </div>
                      <p className="text-on-surface-variant text-body-sm">{b.tagline}</p>
                      <p className={`font-jetbrains-mono text-xs mt-sm ${ACCENT_TEXT[b.accent]}`}>
                        ${b.costPerMTok.toFixed(2)} / 1M tokens · {b.latencyMs}ms
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="glass-card p-lg rounded-xl space-y-md">
              <h3 className="font-label-caps text-label-caps text-secondary-fixed-dim">PRICING & MARGIN</h3>
              <div>
                <label className="font-label-caps text-label-caps text-on-surface-variant block mb-xs uppercase">
                  Margin: <span className="text-primary-fixed-dim">{margin}%</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={200}
                  value={margin}
                  onChange={(e) => setMargin(Number(e.target.value))}
                  className="w-full accent-primary-fixed-dim"
                />
              </div>
              <div className="grid grid-cols-3 gap-md">
                {(["private", "unlisted", "marketplace"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setVisibility(v)}
                    className={`p-sm font-label-caps text-label-caps uppercase rounded transition-all ${visibility === v ? "bg-primary-container text-on-primary" : "bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high"}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-gutter">
            <div className="glass-card p-lg rounded-xl border-l-4 border-l-primary-fixed-dim">
              <h3 className="font-label-caps text-label-caps text-primary-fixed-dim mb-md">PREVIEW</h3>
              <div className="space-y-md">
                <div>
                  <p className="font-label-caps text-label-caps text-on-surface-variant mb-xs">COST IN</p>
                  <p className="font-stats-lg text-stats-lg text-on-surface">
                    ${base.costPerMTok.toFixed(2)} / 1M
                  </p>
                </div>
                <div>
                  <p className="font-label-caps text-label-caps text-on-surface-variant mb-xs">PRICE OUT</p>
                  <p className="font-stats-lg text-stats-lg text-primary-fixed-dim">
                    ${finalPrice.toFixed(2)} / 1M
                  </p>
                </div>
                <div>
                  <p className="font-label-caps text-label-caps text-on-surface-variant mb-xs">EST. LATENCY</p>
                  <p className="font-stats-lg text-stats-lg text-secondary-fixed-dim">{base.latencyMs}ms</p>
                </div>
              </div>
            </div>
            <button
              onClick={deploy}
              className="w-full py-md bg-primary-container text-on-primary font-label-caps text-label-caps rounded uppercase hover:brightness-110 transition-all emerald-glow"
            >
              DEPLOY BLEND
            </button>
          </div>
        </div>
      </main>
      <BottomNav active="nodes" />
    </>
  );
}
