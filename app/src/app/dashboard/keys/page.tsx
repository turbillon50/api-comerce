"use client";

import { useState } from "react";
import { Topbar } from "@/components/dashboard/Topbar";
import { Panel } from "@/components/ui/card";
import { Button } from "@/components/ui/buttons";
import { TextInput, Label } from "@/components/ui/inputs";
import { Icon } from "@/components/ui/icon";
import { useAppStore } from "@/store/use-app-store";

export default function KeysPage() {
  const keys = useAppStore((s) => s.keys);
  const blends = useAppStore((s) => s.blends);
  const createKey = useAppStore((s) => s.createKey);
  const revokeKey = useAppStore((s) => s.revokeKey);

  const [label, setLabel] = useState("");
  const [blendId, setBlendId] = useState<string>("");
  const [budget, setBudget] = useState(100);
  const [reveal, setReveal] = useState<Record<string, boolean>>({});
  const [justCreated, setJustCreated] = useState<string | null>(null);

  function onCreate() {
    if (!label) return;
    const k = createKey(label, blendId || null, budget);
    setJustCreated(k.id);
    setLabel("");
    setBudget(100);
    setReveal((r) => ({ ...r, [k.id]: true }));
  }

  return (
    <>
      <Topbar title="API Keys" subtitle="Emite, monitorea y revoca claves por blend." />
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto scrollbar-thin">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Panel className="!p-0 overflow-hidden">
            <div className="border-b border-line/30 px-6 py-4">
              <h3 className="text-base font-semibold">Claves activas</h3>
              <p className="text-xs text-ink-muted">{keys.length} en total</p>
            </div>
            <div className="divide-y divide-line/15">
              {keys.map((k) => {
                const b = blends.find((x) => x.id === k.blendId);
                const usagePct = (k.monthlySpend / k.monthlyBudget) * 100;
                return (
                  <div key={k.id} className="px-6 py-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">{k.label}</span>
                          {k.status === "revoked" ? (
                            <span className="pill pill-warn !bg-danger/15 !text-danger !border-danger/30">
                              revoked
                            </span>
                          ) : (
                            <span className="pill pill-success">active</span>
                          )}
                          {justCreated === k.id ? (
                            <span className="pill pill-info">nuevo · cópiala ahora</span>
                          ) : null}
                        </div>
                        <div className="mt-1 text-[11px] text-ink-muted">
                          {b ? `blend · ${b.name}` : "sin blend asignado"} · creada{" "}
                          {new Date(k.createdAt).toLocaleDateString("es-MX")}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setReveal((r) => ({ ...r, [k.id]: !r[k.id] }))}
                          className="hairline rounded px-2 py-1 text-[11px] code text-ink-dim hover:text-ink"
                        >
                          <Icon name={reveal[k.id] ? "eyeOff" : "eye"} className="h-3.5 w-3.5 inline mr-1" />
                          {reveal[k.id] ? "ocultar" : "mostrar"}
                        </button>
                        <button
                          onClick={() => navigator.clipboard?.writeText(k.full)}
                          className="hairline rounded px-2 py-1 text-[11px] code text-ink-dim hover:text-ink"
                        >
                          <Icon name="copy" className="h-3.5 w-3.5 inline mr-1" />
                          copy
                        </button>
                        {k.status === "active" ? (
                          <button
                            onClick={() => revokeKey(k.id)}
                            className="hairline rounded px-2 py-1 text-[11px] code text-danger hover:bg-danger/10"
                          >
                            revocar
                          </button>
                        ) : null}
                      </div>
                    </div>

                    <div className="mt-3 rounded bg-bg-2/60 px-3 py-2 hairline">
                      <code className="text-xs text-ink">
                        {reveal[k.id] ? k.full : `${k.prefix}${"•".repeat(28)}`}
                      </code>
                    </div>

                    <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      <div className="hairline rounded bg-bg-2/40 px-3 py-2">
                        <div className="label-caps text-ink-muted mb-1">Último uso</div>
                        <div className="code text-ink">
                          {k.lastUsedAt
                            ? `${new Date(k.lastUsedAt).toLocaleString("es-MX")}`
                            : "nunca"}
                        </div>
                      </div>
                      <div className="hairline rounded bg-bg-2/40 px-3 py-2">
                        <div className="label-caps text-ink-muted mb-1">Gasto / Presupuesto</div>
                        <div className="code text-ink">
                          ${k.monthlySpend.toFixed(2)} / ${k.monthlyBudget.toFixed(0)}
                        </div>
                      </div>
                      <div className="hairline rounded bg-bg-2/40 px-3 py-2">
                        <div className="label-caps text-ink-muted mb-1">Uso mensual</div>
                        <div className="mt-1 h-1.5 rounded-full bg-bg-3 overflow-hidden">
                          <div
                            className={`h-full ${usagePct > 80 ? "bg-danger" : "bg-primary"}`}
                            style={{ width: `${Math.min(100, usagePct)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {keys.length === 0 ? (
                <div className="px-6 py-12 text-center text-sm text-ink-muted">
                  Aún no tienes API keys. Crea una en el panel derecho.
                </div>
              ) : null}
            </div>
          </Panel>

          <Panel className="!p-6 self-start sticky top-20">
            <h3 className="mb-1 text-base font-semibold">Emitir nueva key</h3>
            <p className="mb-5 text-xs text-ink-muted">
              Una clave por cliente o por ambiente. Después no podrás verla completa de nuevo.
            </p>
            <div className="space-y-4">
              <div>
                <Label>Etiqueta</Label>
                <TextInput
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="Production · Acme"
                />
              </div>
              <div>
                <Label hint="opcional">Blend asignado</Label>
                <select
                  value={blendId}
                  onChange={(e) => setBlendId(e.target.value)}
                  className="w-full rounded-lg bg-bg-2/80 hairline px-3 py-2 text-sm code focus:outline-none ring-focus"
                >
                  <option value="">— sin blend (acceso a todos) —</option>
                  {blends.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label hint="USD">Presupuesto mensual</Label>
                <input
                  type="number"
                  min={10}
                  value={budget}
                  onChange={(e) => setBudget(+e.target.value)}
                  className="w-full rounded-lg bg-bg-2/80 hairline px-3 py-2 text-sm code focus:outline-none ring-focus"
                />
              </div>
              <Button onClick={onCreate} className="w-full justify-center py-3">
                <Icon name="key" className="h-4 w-4" />
                Emitir clave
              </Button>
            </div>
          </Panel>
        </div>
      </main>
    </>
  );
}
