"use client";

import { useState } from "react";
import { Topbar } from "@/components/dashboard/Topbar";
import { Panel } from "@/components/ui/card";
import { Button } from "@/components/ui/buttons";
import { TextInput, Label } from "@/components/ui/inputs";
import { Icon } from "@/components/ui/icon";
import { useAppStore } from "@/store/use-app-store";
import { PROVIDER_MODELS } from "@/lib/catalog";

const PROVIDERS = [
  {
    id: "openrouter",
    name: "OpenRouter",
    blurb: "Gateway unificado a Anthropic, OpenAI, Google, Meta, DeepSeek y más.",
    status: "primary",
    docsHref: "https://openrouter.ai/docs",
  },
  {
    id: "anthropic-direct",
    name: "Anthropic (directo)",
    blurb: "Conexión directa para latencia mínima en Claude. Próximamente.",
    status: "coming",
  },
  {
    id: "openai-direct",
    name: "OpenAI (directo)",
    blurb: "Acceso a GPT-5/Realtime sin intermediario. Próximamente.",
    status: "coming",
  },
  {
    id: "mistral-direct",
    name: "Mistral (directo)",
    blurb: "Para volumen de Mixtral/Codestral. Próximamente.",
    status: "coming",
  },
];

export default function ProvidersPage() {
  const openrouterKey = useAppStore((s) => s.openrouterKey);
  const setOpenrouterKey = useAppStore((s) => s.setOpenrouterKey);
  const [draft, setDraft] = useState(openrouterKey);
  const connected = !!openrouterKey;

  return (
    <>
      <Topbar title="Proveedores" subtitle="Conecta gateways y selecciona modelos disponibles." />
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto scrollbar-thin">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {PROVIDERS.map((p) => (
            <Panel key={p.id} className="!p-6">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold">{p.name}</h3>
                  <p className="mt-1 text-sm text-ink-dim max-w-md">{p.blurb}</p>
                </div>
                {p.id === "openrouter" ? (
                  <span className={connected ? "pill pill-success" : "pill pill-warn"}>
                    {connected ? "conectado" : "pendiente"}
                  </span>
                ) : (
                  <span className="pill pill-warn">coming soon</span>
                )}
              </div>

              {p.id === "openrouter" ? (
                <div className="space-y-3">
                  <div>
                    <Label hint="se almacena cifrada en producción">API key</Label>
                    <TextInput
                      type="password"
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      placeholder="sk-or-v1-…"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => setOpenrouterKey(draft)} disabled={!draft}>
                      <Icon name="check" className="h-4 w-4" />
                      Guardar
                    </Button>
                    {connected ? (
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setOpenrouterKey("");
                          setDraft("");
                        }}
                      >
                        <Icon name="alert" className="h-4 w-4" />
                        Desconectar
                      </Button>
                    ) : null}
                  </div>
                  <p className="text-[11px] text-ink-muted">
                    En servidor, expone <code className="text-ink">OPENROUTER_API_KEY</code> en tu entorno para que el proxy
                    use claves reales. La interfaz de cliente queda como atajo para usuarios bring-your-own-key.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button variant="ghost" disabled>
                    <Icon name="lock" className="h-4 w-4" />
                    Conectar (próximamente)
                  </Button>
                  <p className="text-[11px] text-ink-muted">
                    Mientras tanto, accede al mismo modelo a través de OpenRouter.
                  </p>
                </div>
              )}
            </Panel>
          ))}
        </div>

        <Panel className="mt-6 !p-0 overflow-hidden">
          <div className="flex items-center justify-between border-b border-line/30 px-6 py-4">
            <div>
              <div className="label-caps text-primary-dim mb-1">Catálogo curado</div>
              <h3 className="text-base font-semibold">Modelos disponibles para tus blends</h3>
            </div>
            <span className="text-xs text-ink-muted">{PROVIDER_MODELS.length} modelos</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="text-ink-muted">
                <tr>
                  <th className="px-6 py-2.5 text-left label-caps">Modelo</th>
                  <th className="px-3 py-2.5 text-left label-caps">Proveedor</th>
                  <th className="px-3 py-2.5 text-right label-caps">Contexto</th>
                  <th className="px-3 py-2.5 text-right label-caps">Input</th>
                  <th className="px-3 py-2.5 text-right label-caps">Output</th>
                  <th className="px-6 py-2.5 text-left label-caps">Fortalezas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/15 code">
                {PROVIDER_MODELS.map((m) => (
                  <tr key={m.id} className="hover:bg-bg-2/40">
                    <td className="px-6 py-2.5 text-ink">{m.name}</td>
                    <td className="px-3 py-2.5 text-ink-dim">{m.provider}</td>
                    <td className="px-3 py-2.5 text-right text-ink-dim">
                      {m.context.toLocaleString()}
                    </td>
                    <td className="px-3 py-2.5 text-right text-secondary">${m.inputPrice}</td>
                    <td className="px-3 py-2.5 text-right text-secondary">${m.outputPrice}</td>
                    <td className="px-6 py-2.5">
                      <div className="flex flex-wrap gap-1">
                        {m.strengths.map((s) => (
                          <span key={s} className="pill pill-info !py-0.5 !px-2">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </main>
    </>
  );
}
