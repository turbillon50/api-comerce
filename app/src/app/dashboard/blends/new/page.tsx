"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import { Topbar } from "@/components/dashboard/Topbar";
import { Panel } from "@/components/ui/card";
import { Button } from "@/components/ui/buttons";
import { TextInput, Textarea, Label } from "@/components/ui/inputs";
import { Icon } from "@/components/ui/icon";
import { PROVIDER_MODELS, USE_CASES, modelById } from "@/lib/catalog";
import { useAppStore } from "@/store/use-app-store";
import type { Blend, BlendComponent } from "@/lib/types";

type Draft = {
  name: string;
  slug: string;
  description: string;
  useCase: Blend["useCase"];
  visibility: Blend["visibility"];
  margin: number;
  components: BlendComponent[];
};

const EMPTY: Draft = {
  name: "",
  slug: "",
  description: "",
  useCase: "chatbot",
  visibility: "private",
  margin: 30,
  components: [{ modelId: "anthropic/claude-sonnet-4.6", weight: 100, role: "primary" }],
};

export default function NewBlendPage() {
  const router = useRouter();
  const upsert = useAppStore((s) => s.upsertBlend);
  const [d, setD] = useState<Draft>(EMPTY);

  const totalWeight = d.components.reduce((a, c) => a + c.weight, 0);

  const baseCost = useMemo(() => {
    let sum = 0;
    for (const c of d.components) {
      const m = modelById(c.modelId);
      if (!m) continue;
      const blended = (m.inputPrice * 0.3 + m.outputPrice * 0.7);
      sum += (c.weight / 100) * blended;
    }
    return sum;
  }, [d.components]);

  const finalPrice = baseCost * (1 + d.margin / 100);

  function patch<K extends keyof Draft>(k: K, v: Draft[K]) {
    setD((s) => ({ ...s, [k]: v }));
  }

  function patchComponent(i: number, partial: Partial<BlendComponent>) {
    setD((s) => ({
      ...s,
      components: s.components.map((c, idx) => (idx === i ? { ...c, ...partial } : c)),
    }));
  }

  function addComponent() {
    setD((s) => ({
      ...s,
      components: [
        ...s.components,
        { modelId: "anthropic/claude-haiku-4.5", weight: 0, role: "fallback" },
      ],
    }));
  }

  function removeComponent(i: number) {
    setD((s) => ({ ...s, components: s.components.filter((_, idx) => idx !== i) }));
  }

  function save() {
    const slug =
      d.slug || d.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const id = "blend_" + nanoid(8);
    const blend: Blend = {
      id,
      slug,
      name: d.name || "Untitled blend",
      description: d.description,
      useCase: d.useCase,
      components: d.components.filter((c) => c.weight > 0),
      margin: d.margin,
      pricePerMtok: +finalPrice.toFixed(2),
      visibility: d.visibility,
      createdAt: new Date().toISOString(),
      requests: 0,
      successRate: 100,
    };
    upsert(blend);
    router.push("/dashboard/blends");
  }

  return (
    <>
      <Topbar title="Nuevo blend" subtitle="Compón una mezcla multi-proveedor y pónle precio." />
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto scrollbar-thin">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-5">
            <Panel className="!p-6">
              <h3 className="mb-5 text-base font-semibold">Información básica</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label hint="aparecerá en marketplace">Nombre</Label>
                  <TextInput
                    value={d.name}
                    onChange={(e) => patch("name", e.target.value)}
                    placeholder="ACME Dev Copilot"
                  />
                </div>
                <div>
                  <Label hint="lowercase-con-guiones">Slug</Label>
                  <TextInput
                    value={d.slug}
                    onChange={(e) => patch("slug", e.target.value)}
                    placeholder="acme-dev-copilot"
                  />
                </div>
                <div>
                  <Label>Caso de uso</Label>
                  <select
                    value={d.useCase}
                    onChange={(e) => patch("useCase", e.target.value as Draft["useCase"])}
                    className="w-full rounded-lg bg-bg-2/80 hairline px-3 py-2 text-sm code text-ink focus:outline-none ring-focus"
                  >
                    {USE_CASES.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <Label>Descripción</Label>
                  <Textarea
                    rows={3}
                    value={d.description}
                    onChange={(e) => patch("description", e.target.value)}
                    placeholder="¿Para qué sirve este blend? ¿Qué garantías ofrece?"
                  />
                </div>
              </div>
            </Panel>

            <Panel className="!p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold">Componentes</h3>
                  <p className="text-xs text-ink-muted">Suma de pesos: {totalWeight}%</p>
                </div>
                <Button variant="ghost" onClick={addComponent}>
                  <Icon name="plus" className="h-4 w-4" /> Agregar modelo
                </Button>
              </div>

              <div className="space-y-3">
                {d.components.map((c, i) => {
                  const m = modelById(c.modelId);
                  return (
                    <div key={i} className="hairline rounded-lg bg-bg-2/50 p-4">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                        <div className="md:col-span-5">
                          <Label>Modelo</Label>
                          <select
                            value={c.modelId}
                            onChange={(e) => patchComponent(i, { modelId: e.target.value })}
                            className="w-full rounded-lg bg-bg-3/80 hairline px-3 py-2 text-sm code focus:outline-none ring-focus"
                          >
                            {PROVIDER_MODELS.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.name} · {p.context.toLocaleString()} ctx
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="md:col-span-3">
                          <Label>Rol</Label>
                          <select
                            value={c.role}
                            onChange={(e) =>
                              patchComponent(i, { role: e.target.value as BlendComponent["role"] })
                            }
                            className="w-full rounded-lg bg-bg-3/80 hairline px-3 py-2 text-sm code focus:outline-none ring-focus"
                          >
                            <option value="primary">primary</option>
                            <option value="validator">validator</option>
                            <option value="fallback">fallback</option>
                          </select>
                        </div>
                        <div className="md:col-span-3">
                          <Label hint="%">Peso</Label>
                          <input
                            type="number"
                            min={0}
                            max={100}
                            value={c.weight}
                            onChange={(e) =>
                              patchComponent(i, { weight: Math.max(0, Math.min(100, +e.target.value)) })
                            }
                            className="w-full rounded-lg bg-bg-3/80 hairline px-3 py-2 text-sm code focus:outline-none ring-focus"
                          />
                        </div>
                        <button
                          onClick={() => removeComponent(i)}
                          className="md:col-span-1 grid h-10 place-items-center rounded-lg hairline text-ink-muted hover:text-danger hover:border-danger/40"
                          title="Quitar"
                        >
                          <Icon name="alert" className="h-4 w-4" />
                        </button>
                      </div>
                      {m ? (
                        <div className="mt-3 grid grid-cols-3 gap-3 text-[11px] text-ink-muted code">
                          <span>
                            input{" "}
                            <span className="text-secondary">${m.inputPrice}/Mtok</span>
                          </span>
                          <span>
                            output{" "}
                            <span className="text-secondary">${m.outputPrice}/Mtok</span>
                          </span>
                          <span>ctx {m.context.toLocaleString()}</span>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </Panel>

            <Panel className="!p-6">
              <h3 className="mb-5 text-base font-semibold">Precio y publicación</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label hint={`base $${baseCost.toFixed(2)}/Mtok`}>Margen (%)</Label>
                  <input
                    type="number"
                    min={0}
                    max={300}
                    value={d.margin}
                    onChange={(e) => patch("margin", +e.target.value)}
                    className="w-full rounded-lg bg-bg-2/80 hairline px-3 py-2 text-sm code focus:outline-none ring-focus"
                  />
                </div>
                <div>
                  <Label>Visibilidad</Label>
                  <select
                    value={d.visibility}
                    onChange={(e) => patch("visibility", e.target.value as Draft["visibility"])}
                    className="w-full rounded-lg bg-bg-2/80 hairline px-3 py-2 text-sm code focus:outline-none ring-focus"
                  >
                    <option value="private">private — solo tú</option>
                    <option value="unlisted">unlisted — con link</option>
                    <option value="marketplace">marketplace — público</option>
                  </select>
                </div>
              </div>
            </Panel>
          </div>

          <div className="space-y-5">
            <Panel className="!p-6 shadow-glow-primary">
              <div className="label-caps text-primary-dim mb-2">Resumen</div>
              <h3 className="text-xl font-semibold mb-1">{d.name || "Untitled blend"}</h3>
              <p className="text-xs text-ink-muted code mb-5">{d.slug || "slug"}</p>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="hairline bg-bg-2/60 rounded p-3">
                  <div className="label-caps text-ink-muted mb-1">Costo base</div>
                  <div className="stat-lg text-ink">${baseCost.toFixed(2)}</div>
                </div>
                <div className="hairline bg-bg-2/60 rounded p-3">
                  <div className="label-caps text-ink-muted mb-1">Precio final</div>
                  <div className="stat-lg text-primary">${finalPrice.toFixed(2)}</div>
                </div>
              </div>

              <div className="text-xs text-ink-dim mb-5 leading-relaxed">
                Cobras a tu cliente <span className="text-primary">${finalPrice.toFixed(2)}</span> por millón de tokens.
                APICommerce te entrega <span className="text-ink">${baseCost.toFixed(2)}</span> de costo en OpenRouter.
                Margen efectivo: <span className="text-secondary">{d.margin}%</span>.
              </div>

              <Button onClick={save} className="w-full justify-center py-3">
                <Icon name="sparkles" className="h-4 w-4" />
                Crear blend
              </Button>
            </Panel>

            <Panel className="!p-6">
              <div className="label-caps text-tertiary mb-2">Tip de Prism</div>
              <p className="text-sm text-ink-dim leading-relaxed">
                Para chatbots: 70-80% primary rápido (Haiku/Flash), 15% validator (Sonnet) y 10% fallback (Llama). Mantén
                margen entre 30-40% para no asustar al cliente y dejar espacio a promociones.
              </p>
            </Panel>
          </div>
        </div>
      </main>
    </>
  );
}
