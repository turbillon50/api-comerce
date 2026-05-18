"use client";

import { useMemo, useState } from "react";
import { Topbar } from "@/components/dashboard/Topbar";
import { Panel } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { useAppStore } from "@/store/use-app-store";
import { modelById } from "@/lib/catalog";

const STATUS_FILTERS = ["all", "ok", "error", "throttled"] as const;

export default function RequestsPage() {
  const requests = useAppStore((s) => s.requests);
  const blends = useAppStore((s) => s.blends);
  const keys = useAppStore((s) => s.keys);

  const [status, setStatus] = useState<(typeof STATUS_FILTERS)[number]>("all");
  const [blendId, setBlendId] = useState("all");

  const filtered = useMemo(
    () =>
      requests.filter((r) => {
        if (status !== "all" && r.status !== status) return false;
        if (blendId !== "all" && r.blendId !== blendId) return false;
        return true;
      }),
    [requests, status, blendId],
  );

  const agg = useMemo(() => {
    const ok = filtered.filter((r) => r.status === "ok").length;
    const totalCost = filtered.reduce((a, r) => a + r.costUsd, 0);
    const totalTokens = filtered.reduce(
      (a, r) => a + r.promptTokens + r.completionTokens,
      0,
    );
    const avgLat = filtered.length
      ? filtered.reduce((a, r) => a + r.latencyMs, 0) / filtered.length
      : 0;
    return {
      count: filtered.length,
      successRate: filtered.length ? (ok / filtered.length) * 100 : 100,
      cost: totalCost,
      tokens: totalTokens,
      avgLatency: avgLat,
    };
  }, [filtered]);

  return (
    <>
      <Topbar title="Panel de requests" subtitle="Live stream con filtros y agregados." />
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto scrollbar-thin">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          <Stat label="Requests" value={agg.count.toLocaleString()} hint="filtrados" />
          <Stat
            label="Success rate"
            value={`${agg.successRate.toFixed(1)}%`}
            tone={agg.successRate > 99 ? "primary" : "warn"}
          />
          <Stat label="Costo total" value={`$${agg.cost.toFixed(2)}`} tone="primary" />
          <Stat label="Latencia avg" value={`${Math.round(agg.avgLatency)}ms`} tone="secondary" />
        </div>

        <Panel className="!p-0 overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/30 px-6 py-4">
            <div className="flex flex-wrap items-center gap-2">
              {STATUS_FILTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`rounded-full px-3 py-1 text-xs ${
                    status === s
                      ? "bg-primary text-primary-ink font-bold"
                      : "hairline text-ink-dim hover:text-ink"
                  }`}
                >
                  {s}
                </button>
              ))}
              <select
                value={blendId}
                onChange={(e) => setBlendId(e.target.value)}
                className="hairline bg-bg-2/70 rounded-full px-3 py-1 text-xs code text-ink"
              >
                <option value="all">Todos los blends</option>
                {blends.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
            <span className="pill pill-success">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-soft" /> live
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="text-ink-muted">
                <tr>
                  <Th>Hora</Th>
                  <Th>Modelo</Th>
                  <Th>Blend</Th>
                  <Th>Key</Th>
                  <Th>Origen</Th>
                  <Th align="right">Prompt</Th>
                  <Th align="right">Out</Th>
                  <Th align="right">Lat.</Th>
                  <Th align="right">Costo</Th>
                  <Th align="right">Status</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/15 code">
                {filtered.slice(0, 80).map((r) => {
                  const m = modelById(r.modelId);
                  const b = blends.find((x) => x.id === r.blendId);
                  const k = keys.find((x) => x.id === r.keyId);
                  return (
                    <tr key={r.id} className="hover:bg-bg-2/40">
                      <Td>
                        <span className="text-ink-muted">
                          {new Date(r.ts).toLocaleTimeString("es-MX", {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </span>
                      </Td>
                      <Td>{m?.name ?? r.modelId.split("/")[1]}</Td>
                      <Td className="text-ink-dim">{b?.name ?? r.blendId}</Td>
                      <Td className="text-ink-dim">{k?.label.split("·")[0] ?? r.keyId}</Td>
                      <Td className="text-ink-muted">{r.origin}</Td>
                      <Td align="right">{r.promptTokens.toLocaleString()}</Td>
                      <Td align="right">{r.completionTokens.toLocaleString()}</Td>
                      <Td align="right">
                        <span className={r.latencyMs > 1000 ? "text-warning" : "text-ink"}>
                          {r.latencyMs}ms
                        </span>
                      </Td>
                      <Td align="right" className="text-primary">
                        ${r.costUsd.toFixed(4)}
                      </Td>
                      <Td align="right">
                        <StatusPill status={r.status} />
                      </Td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length === 0 ? (
              <div className="px-6 py-12 text-center text-sm text-ink-muted">
                Sin requests para este filtro.
              </div>
            ) : null}
          </div>
        </Panel>
      </main>
    </>
  );
}

function Stat({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "primary" | "secondary" | "warn";
}) {
  const c =
    tone === "primary"
      ? "text-primary"
      : tone === "secondary"
      ? "text-secondary"
      : tone === "warn"
      ? "text-warning"
      : "text-ink";
  return (
    <Panel className="!p-5">
      <div className="label-caps text-ink-muted mb-3">{label}</div>
      <div className={`stat-lg ${c}`}>{value}</div>
      {hint ? <div className="mt-2 text-[11px] text-ink-muted">{hint}</div> : null}
    </Panel>
  );
}

function Th({ children, align }: { children: React.ReactNode; align?: "right" }) {
  return (
    <th className={`px-3 py-2.5 label-caps ${align === "right" ? "text-right" : "text-left"} ${align === "right" ? "" : "first:pl-6"} last:pr-6`}>
      {children}
    </th>
  );
}
function Td({ children, align, className = "" }: { children: React.ReactNode; align?: "right"; className?: string }) {
  return (
    <td className={`px-3 py-2 ${align === "right" ? "text-right" : ""} ${className} first:pl-6 last:pr-6`}>
      {children}
    </td>
  );
}
function StatusPill({ status }: { status: "ok" | "error" | "throttled" }) {
  const cls =
    status === "ok"
      ? "pill pill-success"
      : status === "throttled"
      ? "pill pill-warn"
      : "pill pill-warn !bg-danger/15 !text-danger !border-danger/30";
  return <span className={cls}>{status}</span>;
}
