"use client";

import { useState } from "react";
import { MS } from "@/components/ui/MS";
import { BottomNav } from "@/components/dashboard/Topbar";
import { useAppStore } from "@/store/use-app-store";

const PROVIDERS = [
  {
    id: "openrouter",
    name: "OpenRouter",
    icon: "hub",
    description: "Unified gateway across 100+ frontier models — auto-routing and failover included.",
    status: "PRIMARY",
    iconClass: "text-primary-fixed-dim",
  },
  {
    id: "anthropic",
    name: "Anthropic Direct",
    icon: "diamond",
    description: "Claude 4.7 Opus, 4.6 Sonnet, 4.5 Haiku — long-context reasoning and tool use.",
    status: "BACKUP",
    iconClass: "text-tertiary-fixed-dim",
  },
  {
    id: "openai",
    name: "OpenAI Direct",
    icon: "rocket",
    description: "GPT-4 Turbo for high-volume conversational and structured outputs.",
    status: "BACKUP",
    iconClass: "text-secondary-fixed-dim",
  },
  {
    id: "mistral",
    name: "Mistral Direct",
    icon: "memory",
    description: "Cost-efficient European inference with low latency for EU traffic.",
    status: "STAND-BY",
    iconClass: "text-on-surface-variant",
  },
];

export default function ProvidersPage() {
  const orKey = useAppStore((s) => s.openrouterKey);
  const setOrKey = useAppStore((s) => s.setOpenrouterKey);
  const [local, setLocal] = useState(orKey);

  return (
    <>
      <main className="px-margin-mobile md:px-margin-desktop py-lg max-w-container-max mx-auto">
        <section className="mb-lg">
          <p className="font-label-caps text-label-caps text-primary-fixed-dim mb-xs uppercase">
            Admin / Upstream
          </p>
          <h2 className="font-headline-lg text-headline-lg text-primary">Providers</h2>
          <p className="text-on-surface-variant font-body-md mt-sm max-w-2xl">
            Configure the upstream providers that power your blends. Failover is automatic — if a primary provider
            misbehaves, the router shifts traffic instantly.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {PROVIDERS.map((p) => (
              <div key={p.id} className="glass-card rounded-xl p-lg flex flex-col">
                <div className="flex items-start justify-between mb-md">
                  <div className="flex items-center gap-sm">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center">
                      <MS name={p.icon} className={p.iconClass} />
                    </div>
                    <h3 className="font-headline-md text-headline-md text-primary">{p.name}</h3>
                  </div>
                  <span
                    className={`font-label-caps text-label-caps ${p.id === "openrouter" ? "text-primary-fixed-dim bg-primary-fixed-dim/10" : "text-on-surface-variant bg-on-surface-variant/10"} px-sm py-xs rounded`}
                  >
                    {p.status}
                  </span>
                </div>
                <p className="text-on-surface-variant text-body-sm flex-1">{p.description}</p>
              </div>
            ))}
          </div>

          <div className="glass-card p-lg rounded-xl space-y-md">
            <h3 className="font-label-caps text-label-caps text-secondary-fixed-dim">OPENROUTER CREDENTIALS</h3>
            <p className="text-body-sm text-on-surface-variant">
              Bring your own OpenRouter API key. Stored locally in your browser only — never sent to APICommerce
              servers.
            </p>
            <div>
              <label className="font-label-caps text-label-caps text-on-surface-variant block mb-xs uppercase">
                API Key
              </label>
              <input
                value={local}
                onChange={(e) => setLocal(e.target.value)}
                placeholder="sk-or-v1-…"
                className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-lg px-md py-3 font-jetbrains-mono text-body-sm focus:ring-1 focus:ring-primary-fixed-dim focus:border-primary-fixed-dim"
              />
            </div>
            <button
              onClick={() => setOrKey(local)}
              className="w-full py-md bg-primary-container text-on-primary font-label-caps text-label-caps rounded uppercase hover:brightness-110 transition-all"
            >
              SAVE CREDENTIALS
            </button>
            {orKey && (
              <p className="font-jetbrains-mono text-xs text-primary-fixed-dim">● {orKey.slice(0, 12)}… stored</p>
            )}
          </div>
        </div>
      </main>
      <BottomNav active="admin" />
    </>
  );
}
