"use client";

import { useState } from "react";
import { MS } from "@/components/ui/MS";
import { BottomNav } from "@/components/dashboard/Topbar";
import { useAppStore, walletBalance } from "@/store/use-app-store";

export default function WalletPage() {
  const wallet = useAppStore((s) => s.wallet);
  const topUp = useAppStore((s) => s.topUp);
  const [amount, setAmount] = useState(100);

  const total = walletBalance(wallet);
  const spend = wallet.filter((t) => t.amountUsd < 0).reduce((a, t) => a + Math.abs(t.amountUsd), 0);
  const topUps = wallet.filter((t) => t.kind === "topup").reduce((a, t) => a + t.amountUsd, 0);

  return (
    <>
      <main className="px-margin-mobile md:px-margin-desktop py-lg max-w-container-max mx-auto">
        <section className="mb-lg">
          <p className="font-label-caps text-label-caps text-primary-fixed-dim mb-xs uppercase">
            Treasury / Governance
          </p>
          <h2 className="font-headline-lg text-headline-lg text-primary">Wallet</h2>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Balance Card */}
          <div className="md:col-span-8 glass-card rounded-xl p-lg flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/10 blur-[100px] -z-10" />
            <div>
              <div className="flex justify-between items-start mb-lg">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">
                  Total API Balance
                </span>
                <MS name="account_balance_wallet" className="text-primary-container" />
              </div>
              <h1 className="font-display-lg text-headline-lg md:text-display-lg text-primary flex items-baseline gap-4 mb-2">
                ${total.toFixed(2)} <span className="text-headline-md opacity-50">USD</span>
              </h1>
              <p className="font-jetbrains-mono text-on-surface-variant text-body-sm">
                ≈ {(total / 0.33).toFixed(2)} API tokens
              </p>
            </div>
            <div className="mt-lg grid grid-cols-1 sm:grid-cols-3 gap-md">
              <div className="bg-white/5 p-md rounded-lg border border-white/5">
                <p className="text-label-sm font-label-caps text-on-surface-variant mb-1">Top-ups</p>
                <p className="font-headline-md text-primary">${topUps.toFixed(2)}</p>
              </div>
              <div className="bg-white/5 p-md rounded-lg border border-white/5">
                <p className="text-label-sm font-label-caps text-on-surface-variant mb-1">Spend</p>
                <p className="font-headline-md text-tertiary-fixed-dim">${spend.toFixed(2)}</p>
              </div>
              <div className="bg-white/5 p-md rounded-lg border border-white/5">
                <p className="text-label-sm font-label-caps text-on-surface-variant mb-1">Discount</p>
                <p className="font-headline-md text-primary-container">12.5%</p>
              </div>
            </div>
          </div>

          {/* Top-up + Network */}
          <div className="md:col-span-4 flex flex-col gap-gutter">
            <div className="glass-card rounded-xl p-md border border-primary-container/20">
              <h3 className="font-headline-md text-primary mb-sm">Top-up Tokens</h3>
              <p className="text-body-sm text-on-surface-variant mb-md">
                Add credits to your account. Stake to reduce consumption costs by up to 40%.
              </p>
              <div className="flex gap-sm mb-md">
                {[50, 100, 250, 500].map((v) => (
                  <button
                    key={v}
                    onClick={() => setAmount(v)}
                    className={`flex-1 py-sm font-jetbrains-mono text-body-sm rounded transition-all ${amount === v ? "bg-primary-container text-on-primary" : "bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high"}`}
                  >
                    ${v}
                  </button>
                ))}
              </div>
              <button
                onClick={() => topUp(amount)}
                className="w-full bg-primary-container text-on-primary font-headline-md text-body-md py-md rounded-lg emerald-glow active:scale-95 transition-all"
              >
                Add ${amount}
              </button>
            </div>
            <div className="glass-card rounded-xl p-md">
              <h3 className="font-headline-md text-primary mb-sm">Network Status</h3>
              <div className="flex items-center gap-sm py-2">
                <span className="w-3 h-3 rounded-full bg-primary-container animate-pulse" />
                <span className="font-jetbrains-mono text-on-surface">Mainnet Optimized</span>
              </div>
              <div className="mt-md pt-md border-t border-white/10 flex justify-between">
                <span className="text-label-sm font-label-caps text-on-surface-variant">Gas Price</span>
                <span className="font-jetbrains-mono text-primary-fixed-dim">12 Gwei</span>
              </div>
            </div>
          </div>

          {/* Transactions */}
          <div className="md:col-span-7 glass-card rounded-xl overflow-hidden">
            <div className="p-md border-b border-white/10 flex justify-between items-center">
              <h3 className="font-headline-md text-primary">API Consumption</h3>
              <span className="font-label-caps text-label-caps text-primary-fixed-dim">{wallet.length} TXNS</span>
            </div>
            <div className="divide-y divide-white/5 max-h-[480px] overflow-y-auto custom-scrollbar">
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
                    <p className="text-[10px] text-on-surface-variant font-jetbrains-mono uppercase">{t.kind}</p>
                  </div>
                </div>
              ))}
              {wallet.length === 0 && (
                <div className="p-lg text-center text-on-surface-variant/40">No transactions yet.</div>
              )}
            </div>
          </div>

          {/* Governance */}
          <div className="md:col-span-5 glass-card rounded-xl flex flex-col">
            <div className="p-md border-b border-white/10">
              <h3 className="font-headline-md text-primary">Active Governance</h3>
            </div>
            <div className="p-md flex-1 space-y-lg">
              <div className="space-y-sm">
                <div className="flex justify-between items-start">
                  <span className="px-sm py-1 bg-primary-container/10 text-primary-container text-[10px] rounded border border-primary-container/20 font-jetbrains-mono">
                    VOTING OPEN
                  </span>
                  <span className="text-label-sm font-label-caps text-on-surface-variant">ID: 412</span>
                </div>
                <h4 className="font-headline-md text-base text-primary">
                  Enable L2 Zero-Knowledge Proofs for Batch Transactions
                </h4>
                <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="bg-primary-container h-full" style={{ width: "72%" }} />
                </div>
                <div className="flex justify-between text-label-sm">
                  <span className="text-primary-container">72% For</span>
                  <span className="text-on-surface-variant">28% Against</span>
                </div>
                <button className="w-full border border-outline-variant hover:border-primary-container transition-colors py-sm rounded font-label-caps text-label-caps text-primary">
                  VOTE NOW
                </button>
              </div>
              <div className="h-px bg-white/5 w-full" />
              <div className="space-y-sm opacity-80">
                <div className="flex justify-between items-start">
                  <span className="px-sm py-1 bg-on-surface-variant/10 text-on-surface-variant text-[10px] rounded border border-white/5 font-jetbrains-mono">
                    UPCOMING
                  </span>
                  <span className="text-label-sm font-label-caps text-on-surface-variant">ID: 413</span>
                </div>
                <h4 className="font-headline-md text-base text-primary">
                  Integrate Claude 3.5 Sonnet into Standard Marketplace
                </h4>
                <p className="text-label-sm font-label-caps text-on-surface-variant">Starts in 2 days</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <BottomNav active="admin" />
    </>
  );
}
