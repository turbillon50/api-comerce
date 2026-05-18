"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Topbar } from "@/components/dashboard/Topbar";
import { Panel, Stat, SectionTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { useAppStore, walletBalance } from "@/store/use-app-store";
import { LinkButton } from "@/components/ui/buttons";
import { modelById } from "@/lib/catalog";

export default function DashboardHome() {
  const user = useAppStore((s) => s.user);
  const blends = useAppStore((s) => s.blends);
  const keys = useAppStore((s) => s.keys);
  const requests = useAppStore((s) => s.requests);
  const wallet = useAppStore((s) => s.wallet);

  const stats = useMemo(() => {
    const balance = walletBalance(wallet);
    const totalRequests = requests.length;
    const ok = requests.filter((r) => r.status === "ok").length;
    const successRate = totalRequests ? (ok / totalRequests) * 100 : 100;
    const spend = requests.reduce((acc, r) => acc + r.costUsd, 0);
    return { balance, totalRequests, successRate, spend };
  }, [requests, wallet]);

  const sparkline = useMemo(() => buildSparkline(requests), [requests]);

  return (
    <>
      <Topbar title={`Hola, ${user?.name?.split(" ")[0] ?? "operador"}.`} subtitle={user?.org ?? ""} />
      <main className="flex-1 p-6 lg:p-8 scrollbar-thin overflow-y-auto">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 mb-6">
          <Stat
            label="Saldo wallet"
            value={`$${stats.balance.toFixed(2)}`}
            delta="+18% vs mes pasado"
            trend="up"
            hint="USD"
          />
          <Stat
            label="Requests 24h"
            value={stats.totalRequests.toLocaleString()}
            delta={`${stats.successRate.toFixed(1)}% ok`}
            trend={stats.successRate > 99 ? "up" : "flat"}
            hint="todas las keys"
          />
          <Stat
            label="Gasto OpenRouter"
            value={`$${stats.spend.toFixed(2)}`}
            delta="-4.2% latencia p95"
            trend="down"
            hint="rolling 24h"
          />
          <Stat
            label="Blends activos"
            value={blends.length.toString()}
            delta={`${blends.filter((b) => b.visibility === "marketplace").length} en marketplace`}
            trend="flat"
            hint=""
          />
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <Panel className="lg:col-span-2 !p-0 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-line/30">
              <div>
                <div className="label-caps text-primary-dim mb-1">Throughput · 24h</div>
                <h3 className="text-base font-semibold">Requests por hora</h3>
              </div>
              <span className="pill pill-success">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-soft" />
                live
              </span>
            </div>
            <div className="px-2 pb-6 pt-4">
              <Sparkline data={sparkline} />
            </div>
          </Panel>

          <Panel className="!p-0 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-line/30">
              <div>
                <div className="label-caps text-primary-dim mb-1">Top blends</div>
                <h3 className="text-base font-semibold">Por revenue</h3>
              </div>
              <Link href="/dashboard/blends" className="text-xs text-ink-muted hover:text-ink">
                Ver todos →
              </Link>
            </div>
            <ul className="divide-y divide-line/20">
              {blends
                .slice()
                .sort((a, b) => b.requests - a.requests)
                .slice(0, 5)
                .map((b) => (
                  <li key={b.id} className="flex items-center justify-between px-6 py-3.5">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold">{b.name}</div>
                      <div className="truncate text-[11px] text-ink-muted">
                        {b.requests.toLocaleString()} req · margen {b.margin}%
                      </div>
                    </div>
                    <span className="code text-xs text-primary">${b.pricePerMtok}/Mtok</span>
                  </li>
                ))}
            </ul>
          </Panel>

          <Panel className="lg:col-span-2 !p-0 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-line/30">
              <div>
                <div className="label-caps text-primary-dim mb-1">Requests recientes</div>
                <h3 className="text-base font-semibold">Stream global</h3>
              </div>
              <Link href="/dashboard/requests" className="text-xs text-ink-muted hover:text-ink">
                Panel completo →
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="text-ink-muted">
                  <tr>
                    <th className="px-6 py-2.5 text-left label-caps">Hora</th>
                    <th className="px-3 py-2.5 text-left label-caps">Modelo</th>
                    <th className="px-3 py-2.5 text-left label-caps">Blend</th>
                    <th className="px-3 py-2.5 text-right label-caps">Tokens</th>
                    <th className="px-3 py-2.5 text-right label-caps">Costo</th>
                    <th className="px-6 py-2.5 text-right label-caps">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/15 code">
                  {requests.slice(0, 8).map((r) => {
                    const m = modelById(r.modelId);
                    const b = blends.find((x) => x.id === r.blendId);
                    return (
                      <tr key={r.id} className="hover:bg-bg-2/40">
                        <td className="px-6 py-2.5 text-ink-muted">
                          {new Date(r.ts).toLocaleTimeString("es-MX", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="px-3 py-2.5 text-ink">{m?.name ?? r.modelId.split("/")[1]}</td>
                        <td className="px-3 py-2.5 text-ink-dim">{b?.name ?? r.blendId}</td>
                        <td className="px-3 py-2.5 text-right text-ink-dim">
                          {(r.promptTokens + r.completionTokens).toLocaleString()}
                        </td>
                        <td className="px-3 py-2.5 text-right text-primary">${r.costUsd.toFixed(4)}</td>
                        <td className="px-6 py-2.5 text-right">
                          <StatusPill status={r.status} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Panel>

          <Panel className="!p-6">
            <SectionTitle eyebrow="Acciones rápidas" title="¿Qué quieres hacer?" />
            <div className="grid grid-cols-2 gap-3">
              <QuickAction href="/dashboard/blends/new" icon="layers" label="Nuevo blend" />
              <QuickAction href="/dashboard/keys" icon="key" label="Emitir key" />
              <QuickAction href="/dashboard/wallet" icon="wallet" label="Top-up" />
              <QuickAction href="/dashboard/providers" icon="network" label="Proveedores" />
            </div>
            <div className="mt-6 hairline bg-bg-2/60 rounded-lg p-4">
              <div className="label-caps text-tertiary mb-2">Prism sugiere</div>
              <p className="text-sm text-ink-dim leading-relaxed">
                Tu blend <span className="text-ink">Long-Context RAG</span> está con margen 32% y latencia p95 alta. Si subes el peso primary
                a Gemini Pro a 80% caes a margen 28% pero ganas 240ms.
              </p>
              <Link
                href="/dashboard/agent"
                className="mt-3 inline-flex items-center gap-1 text-xs text-tertiary hover:underline"
              >
                Conversar con Prism <Icon name="arrow" className="h-3 w-3" />
              </Link>
            </div>
          </Panel>

          <Panel className="lg:col-span-3 !p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <div className="label-caps text-primary-dim mb-2">Onboarding</div>
                <h3 className="text-lg font-semibold mb-1">Conecta OpenRouter</h3>
                <p className="text-sm text-ink-dim leading-relaxed mb-3">
                  Sin tu API key seguimos en modo mock. Pega la tuya en proveedores y empezamos a empujar tokens reales.
                </p>
                <LinkButton href="/dashboard/providers" variant="ghost">
                  Conectar
                </LinkButton>
              </div>
              <div>
                <div className="label-caps text-primary-dim mb-2">Marketplace</div>
                <h3 className="text-lg font-semibold mb-1">Publica un blend</h3>
                <p className="text-sm text-ink-dim leading-relaxed mb-3">
                  Cambia visibilidad a marketplace para que otros lo consuman. Tú cobras el spread.
                </p>
                <LinkButton href="/dashboard/blends" variant="ghost">
                  Mis blends
                </LinkButton>
              </div>
              <div>
                <div className="label-caps text-primary-dim mb-2">Memoria</div>
                <h3 className="text-lg font-semibold mb-1">Alimenta a Prism</h3>
                <p className="text-sm text-ink-dim leading-relaxed mb-3">
                  Mientras más le cuentes sobre tu negocio, mejor opera. Agrega hechos y metas en su panel de memoria.
                </p>
                <LinkButton href="/dashboard/agent" variant="ghost">
                  Abrir agente
                </LinkButton>
              </div>
            </div>
          </Panel>
        </div>
      </main>
    </>
  );
}

function buildSparkline(reqs: { ts: string }[]) {
  const buckets = new Array(24).fill(0);
  const now = Date.now();
  for (const r of reqs) {
    const diffH = Math.floor((now - new Date(r.ts).getTime()) / 3_600_000);
    if (diffH >= 0 && diffH < 24) buckets[23 - diffH]++;
  }
  return buckets;
}

function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-1 h-40 px-4">
      {data.map((v, i) => {
        const h = Math.max(6, (v / max) * 140);
        return (
          <div key={i} className="flex-1 group relative">
            <div
              className="w-full rounded bg-primary/40 hover:bg-primary transition-colors"
              style={{ height: `${h}px` }}
              title={`${v} req`}
            />
            {i % 4 === 0 ? (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-[10px] code text-ink-muted">
                {i}h
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
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

function QuickAction({
  href,
  icon,
  label,
}: {
  href: string;
  icon: "layers" | "key" | "wallet" | "network";
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group hairline rounded-lg bg-bg-2/60 p-4 hover:border-primary/40 hover:bg-bg-3/60 transition-colors"
    >
      <Icon name={icon} className="h-5 w-5 text-primary mb-2" />
      <div className="text-sm font-semibold text-ink">{label}</div>
      <div className="text-[11px] text-ink-muted">→</div>
    </Link>
  );
}
