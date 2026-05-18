"use client";

import { useState } from "react";
import { Topbar } from "@/components/dashboard/Topbar";
import { Panel } from "@/components/ui/card";
import { Button } from "@/components/ui/buttons";
import { Icon } from "@/components/ui/icon";
import { useAppStore, walletBalance } from "@/store/use-app-store";

const QUICK = [50, 100, 250, 500, 1000];

export default function WalletPage() {
  const wallet = useAppStore((s) => s.wallet);
  const topUp = useAppStore((s) => s.topUp);
  const [amount, setAmount] = useState(100);

  const balance = walletBalance(wallet);
  const inflow = wallet.filter((t) => t.amountUsd > 0).reduce((a, t) => a + t.amountUsd, 0);
  const outflow = -wallet.filter((t) => t.amountUsd < 0).reduce((a, t) => a + t.amountUsd, 0);
  const marketplaceRev = wallet
    .filter((t) => t.kind === "blend-sale")
    .reduce((a, t) => a + t.amountUsd, 0);

  return (
    <>
      <Topbar title="Wallet & governance" subtitle="Top-ups, consumo y revenue del marketplace." />
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto scrollbar-thin">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
          <Panel className="!p-5 md:col-span-2 shadow-glow-primary">
            <div className="label-caps text-primary-dim mb-3">Saldo disponible</div>
            <div className="text-4xl font-bold tracking-tight">
              ${balance.toFixed(2)}{" "}
              <span className="text-sm text-ink-muted code">USD</span>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {QUICK.map((q) => (
                <button
                  key={q}
                  onClick={() => setAmount(q)}
                  className={`hairline rounded-full px-3 py-1 text-xs code ${
                    amount === q ? "bg-primary text-primary-ink font-bold" : "text-ink-dim hover:text-ink"
                  }`}
                >
                  ${q}
                </button>
              ))}
              <input
                type="number"
                min={10}
                value={amount}
                onChange={(e) => setAmount(+e.target.value)}
                className="w-24 hairline bg-bg-2/70 rounded-lg px-3 py-1.5 text-xs code text-ink focus:outline-none ring-focus"
              />
              <Button onClick={() => topUp(amount)}>
                <Icon name="card" className="h-4 w-4" />
                Top-up ${amount}
              </Button>
            </div>
            <p className="mt-3 text-[11px] text-ink-muted">
              Stripe simulado en demo. En producción procesa por Stripe Connect con auto top-up bajo umbral.
            </p>
          </Panel>
          <Panel className="!p-5">
            <div className="label-caps text-ink-muted mb-3">Top-ups acumulados</div>
            <div className="stat-lg text-secondary">${inflow.toFixed(2)}</div>
            <div className="mt-2 text-[11px] text-ink-muted">vida completa de la cuenta</div>
          </Panel>
          <Panel className="!p-5">
            <div className="label-caps text-ink-muted mb-3">Consumo total</div>
            <div className="stat-lg text-warning">${outflow.toFixed(2)}</div>
            <div className="mt-2 text-[11px] text-ink-muted">tokens + suscripción</div>
          </Panel>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Panel className="lg:col-span-2 !p-0 overflow-hidden">
            <div className="flex items-center justify-between border-b border-line/30 px-6 py-4">
              <div>
                <div className="label-caps text-primary-dim mb-1">Movimientos</div>
                <h3 className="text-base font-semibold">Historial completo</h3>
              </div>
            </div>
            <div className="divide-y divide-line/15">
              {wallet.map((t) => (
                <div key={t.id} className="flex items-center justify-between gap-3 px-6 py-3.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`grid h-9 w-9 place-items-center rounded-full ${iconBg(t.kind)}`}>
                      <Icon name={iconFor(t.kind)} className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm">{t.note}</div>
                      <div className="text-[11px] text-ink-muted code">
                        {new Date(t.ts).toLocaleString("es-MX")} · {t.kind}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`code text-sm whitespace-nowrap ${
                      t.amountUsd >= 0 ? "text-primary" : "text-warning"
                    }`}
                  >
                    {t.amountUsd >= 0 ? "+" : ""}${t.amountUsd.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="!p-6">
            <div className="label-caps text-tertiary mb-2">Marketplace</div>
            <h3 className="text-base font-semibold mb-1">Revenue por blends publicados</h3>
            <p className="text-xs text-ink-muted mb-5">
              Cada venta en marketplace genera un payout aquí. APICommerce retiene 8% sobre el spread.
            </p>
            <div className="stat-lg text-tertiary mb-4">${marketplaceRev.toFixed(2)}</div>
            <div className="hairline bg-bg-2/60 rounded p-3 mb-3 text-xs text-ink-dim leading-relaxed">
              Payouts semanales los lunes a tu Stripe Connect.
            </div>
            <h4 className="label-caps text-ink-muted mb-2 mt-5">Governance</h4>
            <ul className="text-xs text-ink-dim space-y-2">
              <li className="flex items-center gap-2">
                <Icon name="shield" className="h-3.5 w-3.5 text-secondary" /> Auto top-up bajo umbral $50
              </li>
              <li className="flex items-center gap-2">
                <Icon name="shield" className="h-3.5 w-3.5 text-secondary" /> Alertas Slack a margen &lt;25%
              </li>
              <li className="flex items-center gap-2">
                <Icon name="shield" className="h-3.5 w-3.5 text-secondary" /> Spending cap mensual: $5,000
              </li>
            </ul>
          </Panel>
        </div>
      </main>
    </>
  );
}

function iconFor(kind: string) {
  switch (kind) {
    case "topup":
      return "card" as const;
    case "request":
      return "activity" as const;
    case "blend-sale":
      return "boxes" as const;
    case "payout":
      return "trendUp" as const;
    case "refund":
      return "refresh" as const;
    default:
      return "receipt" as const;
  }
}
function iconBg(kind: string) {
  switch (kind) {
    case "topup":
      return "bg-secondary/15 text-secondary";
    case "blend-sale":
      return "bg-tertiary/15 text-tertiary";
    case "request":
      return "bg-warning/15 text-warning";
    default:
      return "bg-bg-3 text-ink-dim";
  }
}
