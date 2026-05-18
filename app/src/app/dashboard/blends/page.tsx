"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Topbar } from "@/components/dashboard/Topbar";
import { Panel } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/buttons";
import { useAppStore } from "@/store/use-app-store";
import { modelById, USE_CASES } from "@/lib/catalog";

const FILTERS = [
  { id: "all", label: "Todos" },
  ...USE_CASES.map((u) => ({ id: u.id, label: u.label })),
];

export default function BlendsPage() {
  const blends = useAppStore((s) => s.blends);
  const deleteBlend = useAppStore((s) => s.deleteBlend);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return blends.filter((b) => {
      if (filter !== "all" && b.useCase !== filter) return false;
      if (query && !`${b.name} ${b.description}`.toLowerCase().includes(query.toLowerCase()))
        return false;
      return true;
    });
  }, [blends, filter, query]);

  return (
    <>
      <Topbar
        title="Blends"
        subtitle="Empaques de modelos curados. Crea, ajusta, publica."
      />
      <main className="flex-1 p-6 lg:p-8 scrollbar-thin overflow-y-auto">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
                  filter === f.id
                    ? "bg-primary text-primary-ink font-bold"
                    : "hairline text-ink-dim hover:text-ink"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="hairline bg-bg-2/70 rounded-lg px-3 py-2 text-xs flex items-center gap-2">
              <Icon name="search" className="h-3.5 w-3.5 text-ink-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar…"
                className="w-44 bg-transparent focus:outline-none placeholder:text-ink-muted/60 code"
              />
            </div>
            <Link
              href="/dashboard/blends/new"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-ink hover:brightness-110"
            >
              <Icon name="plus" className="h-4 w-4" />
              Nuevo blend
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((b) => (
            <Panel key={b.id} className="!p-6 flex flex-col">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="pill pill-success">{b.useCase}</span>
                  <span
                    className={`pill ${
                      b.visibility === "marketplace"
                        ? "pill-info"
                        : b.visibility === "unlisted"
                        ? "pill-warn"
                        : "pill-warn !bg-bg-3 !text-ink-muted !border-line/40"
                    }`}
                  >
                    {b.visibility}
                  </span>
                </div>
                <button
                  onClick={() => {
                    if (confirm(`¿Eliminar ${b.name}?`)) deleteBlend(b.id);
                  }}
                  className="text-ink-muted hover:text-danger"
                  title="Eliminar"
                >
                  <Icon name="alert" className="h-3.5 w-3.5" />
                </button>
              </div>
              <h3 className="mb-1 text-lg font-semibold">{b.name}</h3>
              <p className="mb-4 text-xs text-ink-muted code">{b.slug}</p>
              <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-ink-dim">{b.description}</p>

              <div className="mb-5 space-y-1.5">
                {b.components.map((c) => {
                  const m = modelById(c.modelId);
                  return (
                    <div
                      key={c.modelId}
                      className="flex items-center justify-between rounded bg-bg-2/60 px-2.5 py-1.5 hairline"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            c.role === "primary"
                              ? "bg-primary"
                              : c.role === "validator"
                              ? "bg-secondary"
                              : "bg-tertiary"
                          }`}
                        />
                        <span className="truncate text-xs code text-ink">
                          {m?.name ?? c.modelId.split("/")[1]}
                        </span>
                        <span className="label-caps text-ink-muted">{c.role}</span>
                      </div>
                      <span className="text-xs code text-ink-muted">{c.weight}%</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-auto grid grid-cols-3 gap-3 border-t border-line/30 pt-4">
                <div>
                  <div className="label-caps text-ink-muted mb-1">Precio</div>
                  <div className="text-sm code text-primary">${b.pricePerMtok.toFixed(2)}</div>
                </div>
                <div>
                  <div className="label-caps text-ink-muted mb-1">Margen</div>
                  <div className="text-sm code text-secondary">{b.margin}%</div>
                </div>
                <div>
                  <div className="label-caps text-ink-muted mb-1">Requests</div>
                  <div className="text-sm code text-ink">{b.requests.toLocaleString()}</div>
                </div>
              </div>
            </Panel>
          ))}

          {filtered.length === 0 ? (
            <Panel className="md:col-span-2 xl:col-span-3 !p-12 text-center">
              <Icon name="layers" className="mx-auto mb-4 h-10 w-10 text-ink-muted" />
              <h3 className="text-base font-semibold mb-2">No hay blends en este filtro</h3>
              <p className="text-sm text-ink-dim mb-5">Crea uno o ajusta tu búsqueda.</p>
              <Link
                href="/dashboard/blends/new"
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-ink"
              >
                <Icon name="plus" className="h-4 w-4" />
                Crear blend
              </Link>
            </Panel>
          ) : null}
        </div>
      </main>
    </>
  );
}
