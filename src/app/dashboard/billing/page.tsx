"use client";

import { useMemo, useState } from "react";
import { MS } from "@/components/ui/MS";
import { BottomNav } from "@/components/dashboard/Topbar";
import { useAppStore, walletBalance } from "@/store/use-app-store";
import { BLENDS } from "@/lib/catalog";

const TOPUP_PRESETS = [10, 50, 100, 250];

const PLAN_TIERS = [
  {
    id: "starter",
    name: "Starter",
    blurb: "50k free tokens/month, all blends.",
    price: "$0",
    accent: "text-on-surface",
    cta: "Current",
  },
  {
    id: "growth",
    name: "Growth",
    blurb: "Volume discount past 10M tokens. Priority queue.",
    price: "$29 /mo",
    accent: "text-primary-fixed-dim",
    cta: "Upgrade",
  },
  {
    id: "scale",
    name: "Scale",
    blurb: "Past 500M tokens — custom rate, dedicated routing.",
    price: "Talk to us",
    accent: "text-secondary-fixed-dim",
    cta: "Contact",
  },
];

export default function BillingPage() {
  const wallet = useAppStore((s) => s.wallet);
  const topUp = useAppStore((s) => s.topUp);
  const requests = useAppStore((s) => s.requests);
  const [amount, setAmount] = useState(50);
  const [busy, setBusy] = useState(false);

  const balance = walletBalance(wallet);
  const topUpsTotal = wallet.filter((t) => t.kind === "topup").reduce((a, t) => a + t.amountUsd, 0);
  const spendTotal = wallet.filter((t) => t.amountUsd < 0).reduce((a, t) => a + Math.abs(t.amountUsd), 0);

  /** Breakdown of consumption per blend over the recorded request log. */
  const breakdown = useMemo(() => {
    const byBlend = new Map<string, { calls: number; cost: number }>();
    for (const r of requests) {
      const slug = r.blendId.split("/").pop() ?? r.blendId;
      const cur = byBlend.get(slug) ?? { calls: 0, cost: 0 };
      cur.calls += 1;
      cur.cost += r.costUsd;
      byBlend.set(slug, cur);
    }
    return BLENDS.map((b) => ({
      blend: b,
      ...(byBlend.get(b.slug) ?? { calls: 0, cost: 0 }),
    }));
  }, [requests]);

  async function checkout() {
    setBusy(true);
    try {
      // In real life this hits POST /api/billing/checkout-session and Stripe
      // redirects to the hosted checkout. For the demo we just credit the
      // wallet immediately so the meter reflects it.
      await new Promise((r) => setTimeout(r, 700));
      topUp(amount);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <main className="px-margin-mobile md:px-margin-desktop py-lg max-w-container-max mx-auto">
        <section className="mb-lg">
          <p className="font-label-caps text-label-caps text-primary-fixed-dim mb-xs uppercase">
            Account / Credits
          </p>
          <h2 className="font-headline-lg text-headline-lg text-primary">Billing</h2>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Balance hero */}
          <div className="md:col-span-8 glass-card rounded-xl p-lg flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/10 blur-[100px] -z-10" />
            <div>
              <div className="flex justify-between items-start mb-lg">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">
                  Credit Balance
                </span>
                <MS name="credit_card" className="text-primary-container" />
              </div>
              <h1 className="font-display-lg text-headline-lg md:text-display-lg text-primary flex items-baseline gap-4 mb-2">
                ${balance.toFixed(2)} <span className="text-headline-md opacity-50">USD</span>
              </h1>
              <p className="font-jetbrains-mono text-on-surface-variant text-body-sm">
                Used ${spendTotal.toFixed(2)} this month · Topped up ${topUpsTotal.toFixed(2)} lifetime
              </p>
            </div>
            <div className="mt-lg grid grid-cols-2 sm:grid-cols-3 gap-md">
              <div className="bg-white/5 p-md rounded-lg border border-white/5">
                <p className="text-label-sm font-label-caps text-on-surface-variant mb-1">Top-ups</p>
                <p className="font-headline-md text-primary">${topUpsTotal.toFixed(2)}</p>
              </div>
              <div className="bg-white/5 p-md rounded-lg border border-white/5">
                <p className="text-label-sm font-label-caps text-on-surface-variant mb-1">Spend</p>
                <p className="font-headline-md text-tertiary-fixed-dim">${spendTotal.toFixed(2)}</p>
              </div>
              <div className="bg-white/5 p-md rounded-lg border border-white/5">
                <p className="text-label-sm font-label-caps text-on-surface-variant mb-1">Calls</p>
                <p className="font-headline-md text-secondary-fixed-dim">{requests.length}</p>
              </div>
            </div>
          </div>

          {/* Stripe top-up */}
          <div className="md:col-span-4 flex flex-col gap-gutter">
            <div className="glass-card rounded-xl p-md border border-primary-container/20">
              <div className="flex items-center gap-sm mb-sm">
                <MS name="credit_card" className="text-primary-container" />
                <h3 className="font-headline-md text-primary">Top up via Stripe</h3>
              </div>
              <p className="text-body-sm text-on-surface-variant mb-md">
                Credits never expire. Auto-recharge available once you set a card on file.
              </p>
              <div className="grid grid-cols-4 gap-2 mb-md">
                {TOPUP_PRESETS.map((v) => (
                  <button
                    key={v}
                    onClick={() => setAmount(v)}
                    className={`py-sm font-jetbrains-mono text-body-sm rounded transition-all ${amount === v ? "bg-primary-container text-on-primary" : "bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high"}`}
                  >
                    ${v}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-sm mb-md">
                <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                  Custom
                </label>
                <input
                  type="number"
                  min={5}
                  max={10000}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="flex-1 bg-surface-container-lowest border border-outline-variant/40 rounded-lg px-sm py-2 font-jetbrains-mono text-body-sm focus:ring-1 focus:ring-primary-fixed-dim focus:border-primary-fixed-dim"
                />
              </div>
              <button
                onClick={checkout}
                disabled={busy || amount < 5}
                className="w-full bg-primary-container text-on-primary font-headline-md text-body-md py-md rounded-lg emerald-glow active:scale-95 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
              >
                {busy ? (
                  <>
                    <MS name="hourglass_top" size={18} />
                    Processing…
                  </>
                ) : (
                  <>
                    <MS name="lock" size={18} />
                    Pay ${amount} with Stripe
                  </>
                )}
              </button>
              <p className="text-[10px] text-on-surface-variant/60 font-label-caps mt-sm text-center uppercase">
                Demo mode: credits added instantly.
              </p>
            </div>
          </div>

          {/* Usage breakdown */}
          <div className="md:col-span-7 glass-card rounded-xl overflow-hidden">
            <div className="p-md border-b border-white/10 flex justify-between items-center">
              <h3 className="font-headline-md text-primary">Usage by blend</h3>
              <span className="font-label-caps text-label-caps text-primary-fixed-dim">
                {requests.length} CALLS
              </span>
            </div>
            <div className="divide-y divide-white/5">
              {breakdown.map(({ blend, calls, cost }) => (
                <div
                  key={blend.slug}
                  className="p-md flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-md">
                    <div className="bg-surface-container-high p-sm rounded-lg">
                      <MS name={blend.icon} className="text-primary-container" />
                    </div>
                    <div>
                      <p className="font-headline-md text-sm text-primary">{blend.name}</p>
                      <p className="text-label-sm font-label-caps text-on-surface-variant uppercase">
                        {calls} call{calls === 1 ? "" : "s"} · ${blend.price.toFixed(2)} / {blend.unit}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-jetbrains-mono text-tertiary-fixed-dim">${cost.toFixed(4)}</p>
                    <p className="text-[10px] text-on-surface-variant font-jetbrains-mono uppercase">spent</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Plans */}
          <div className="md:col-span-5 glass-card rounded-xl flex flex-col">
            <div className="p-md border-b border-white/10">
              <h3 className="font-headline-md text-primary">Plans</h3>
            </div>
            <div className="p-md space-y-md flex-1">
              {PLAN_TIERS.map((p, i) => (
                <div
                  key={p.id}
                  className={`p-md rounded-lg border ${i === 0 ? "border-primary-container/30 bg-primary-container/5" : "border-outline-variant/20 bg-surface-container-lowest"}`}
                >
                  <div className="flex justify-between items-baseline mb-1">
                    <p className={`font-headline-md ${p.accent}`}>{p.name}</p>
                    <p className="font-jetbrains-mono text-on-surface text-body-sm">{p.price}</p>
                  </div>
                  <p className="text-body-sm text-on-surface-variant mb-sm">{p.blurb}</p>
                  <button
                    disabled={i === 0}
                    className={`w-full py-sm rounded font-label-caps text-label-caps uppercase ${i === 0 ? "border border-primary-container/30 text-primary-container cursor-default" : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors"}`}
                  >
                    {p.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent transactions */}
          <div className="md:col-span-12 glass-card rounded-xl overflow-hidden">
            <div className="p-md border-b border-white/10 flex justify-between items-center">
              <h3 className="font-headline-md text-primary">Recent transactions</h3>
              <span className="font-label-caps text-label-caps text-on-surface-variant">{wallet.length} ENTRIES</span>
            </div>
            <div className="divide-y divide-white/5 max-h-[400px] overflow-y-auto custom-scrollbar">
              {wallet.map((t) => (
                <div
                  key={t.id}
                  className="p-md flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-md">
                    <div className="bg-surface-container-high p-sm rounded-lg">
                      <MS
                        name={
                          t.kind === "topup"
                            ? "add_circle"
                            : t.kind === "request"
                              ? "bolt"
                              : t.kind === "payout"
                                ? "payments"
                                : t.kind === "blend-sale"
                                  ? "shopping_cart"
                                  : "refresh"
                        }
                        className={t.amountUsd >= 0 ? "text-primary-container" : "text-tertiary-fixed-dim"}
                      />
                    </div>
                    <div>
                      <p className="font-headline-md text-sm text-primary">{t.note}</p>
                      <p className="text-label-sm font-label-caps text-on-surface-variant uppercase">
                        {new Date(t.ts).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-jetbrains-mono ${t.amountUsd >= 0 ? "text-primary-container" : "text-tertiary-fixed-dim"}`}
                    >
                      {t.amountUsd >= 0 ? "+" : ""}${t.amountUsd.toFixed(4)}
                    </p>
                    <p className="text-[10px] text-on-surface-variant font-jetbrains-mono uppercase">
                      {t.kind}
                    </p>
                  </div>
                </div>
              ))}
              {wallet.length === 0 && (
                <div className="p-lg text-center text-on-surface-variant/40">No transactions yet.</div>
              )}
            </div>
          </div>
        </div>
      </main>
      <BottomNav active="admin" />
    </>
  );
}
