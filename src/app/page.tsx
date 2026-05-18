import Link from "next/link";
import { MS } from "@/components/ui/MS";
import { BLENDS } from "@/lib/catalog";

const MASCOT_URL =
  "https://lh3.googleusercontent.com/aida/ADBb0ujIwBaTwjykR5bTLg8nx11TG7qiaj-v9fkAxNXGyWYBRautHyxUgejsU9Syt1jKCGUwNr5hj1hJfnPDkSji49qsyiQwL-gilOv61iuSqXoUHZB780oBVpd-9jkJk2bfRjBqvYrJ1s2WfqCrzj8YIqnhIiQTmHjEEJsxt7SupAK673uhpdPwVO0nQFPfsCa5Su20bhIpqcSDdoB1zcGC5JnbUfQ6jn4wfsvDBZjVxsa4495wiVUkYLE3-v85";

export default function HomePage() {
  return (
    <>
      {/* TopAppBar — Stitch landing_page_manifiesto_v2 */}
      <header className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-xl border-b border-white/10 shadow-xl flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16">
        <div className="flex items-center gap-2">
          <MS name="api" fill className="text-primary-container" />
          <span className="font-headline-md text-headline-md bg-gradient-to-r from-primary-container to-secondary bg-clip-text text-transparent font-bold">
            APICommerce
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link className="text-primary border-b-2 border-primary font-label-sm text-label-sm py-1" href="/">
            Home
          </Link>
          <Link
            className="text-on-surface-variant hover:bg-white/5 transition-all duration-300 font-label-sm text-label-sm px-2 py-1 rounded"
            href="/dashboard/blends"
          >
            Marketplace
          </Link>
          <Link
            className="text-on-surface-variant hover:bg-white/5 transition-all duration-300 font-label-sm text-label-sm px-2 py-1 rounded"
            href="/dashboard"
          >
            Console
          </Link>
          <Link
            className="text-on-surface-variant hover:bg-white/5 transition-all duration-300 font-label-sm text-label-sm px-2 py-1 rounded"
            href="/dashboard/wallet"
          >
            Wallet
          </Link>
        </nav>
        <Link
          href="/auth/register"
          className="bg-primary-container text-on-primary font-label-sm text-label-sm px-6 py-2 rounded-full active:scale-95 transition-transform hover:opacity-90"
        >
          Connect Wallet
        </Link>
      </header>

      <main className="relative pt-16">
        {/* Hero */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-grid">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-container/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]" />

          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-gutter items-center z-10 w-full">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/10 border border-primary-container/20 text-primary-fixed-dim">
                <MS name="bolt" size={16} />
                <span className="font-label-sm text-label-sm">v2.0 Mainnet Live</span>
              </div>
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg leading-tight text-primary">
                Infrastructure for the{" "}
                <span className="bg-gradient-to-r from-primary-container to-secondary-fixed-dim bg-clip-text text-transparent">
                  Decentralized Web
                </span>
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-lg">
                Deploy high-performance AI Blends with the ease of a storefront. Scale globally across distributed nodes
                without the overhead of traditional cloud legacy.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/auth/register"
                  className="px-8 py-4 bg-gradient-to-r from-primary-container to-secondary text-on-primary-container font-headline-md text-body-md rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all"
                >
                  Start Building
                </Link>
                <Link
                  href="/dashboard/docs"
                  className="px-8 py-4 glass-card text-primary font-headline-md text-body-md rounded-xl hover:bg-white/10 active:scale-95 transition-all"
                >
                  View Docs
                </Link>
              </div>
            </div>

            <div className="relative flex justify-center items-center">
              <div className="relative w-full aspect-square flex items-center justify-center">
                <img
                  alt="API Mascot"
                  className="w-2/3 h-2/3 object-contain z-20 drop-shadow-[0_0_50px_rgba(0,255,148,0.4)]"
                  src={MASCOT_URL}
                />
                <div className="absolute inset-0 border-[20px] border-white/5 rounded-full scale-100 animate-pulse" />
                <div className="absolute inset-4 border-[2px] border-primary-container/20 rounded-full scale-90" />
                <div className="absolute inset-12 border-[1px] border-secondary/20 rounded-full scale-110" />
              </div>
            </div>
          </div>
        </section>

        {/* Bento Features */}
        <section className="py-24 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-16">
            <h2 className="font-headline-md text-display-lg text-primary mb-4">Engineered for Performance</h2>
            <p className="text-on-surface-variant font-body-md">
              The toolset for the next generation of commerce.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 glass-card rounded-xl p-8 flex flex-col justify-between group hover:border-primary-container/50 transition-colors">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary-container/10 flex items-center justify-center">
                  <MS name="route" className="text-primary-container" />
                </div>
                <h3 className="font-headline-md text-headline-md text-primary">Auto-routing</h3>
                <p className="text-on-surface-variant font-body-md">
                  Our intelligent network automatically discovers the fastest nodes for your API requests, ensuring
                  sub-100ms latency across 40+ countries globally.
                </p>
              </div>
              <div className="mt-8 flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-surface-container rounded-full text-label-sm font-data-mono text-primary-container">
                  ACTIVE_PROTOCOLS
                </span>
                <span className="px-3 py-1 bg-surface-container rounded-full text-label-sm font-data-mono text-secondary">
                  EDGE_NODES
                </span>
              </div>
            </div>

            <div className="glass-card rounded-xl p-8 space-y-4 glow-violet border-secondary/20">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                <MS name="savings" className="text-secondary" />
              </div>
              <h3 className="font-headline-md text-headline-md text-primary">Cost-optimization</h3>
              <p className="text-on-surface-variant font-body-md">
                Dynamic pricing that scales with your usage. Save up to 40% compared to traditional SaaS gateways.
              </p>
            </div>

            <div className="glass-card rounded-xl p-8 space-y-4 glow-emerald border-primary-container/20">
              <div className="w-12 h-12 rounded-lg bg-primary-container/10 flex items-center justify-center">
                <MS name="hub" className="text-primary-container" />
              </div>
              <h3 className="font-headline-md text-headline-md text-primary">Web3 Native</h3>
              <p className="text-on-surface-variant font-body-md">
                Immutable logging and decentralized authentication baked into the core protocol. No centralized keys,
                no single points of failure.
              </p>
            </div>

            <div className="md:col-span-2 glass-card rounded-xl p-8 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-4">
                <h3 className="font-headline-md text-headline-md text-primary">Live Network Insights</h3>
                <p className="text-on-surface-variant font-body-md">
                  Monitor your decentralized infrastructure in real-time with granular telemetry data streams.
                </p>
                <div className="pt-4 flex gap-4">
                  <div className="flex flex-col">
                    <span className="text-label-sm font-data-mono text-on-surface-variant">UPTIME</span>
                    <span className="text-headline-md font-data-mono text-primary-container">99.998%</span>
                  </div>
                  <div className="flex flex-col border-l border-white/10 pl-4">
                    <span className="text-label-sm font-data-mono text-on-surface-variant">TX_LOAD</span>
                    <span className="text-headline-md font-data-mono text-secondary">42.4k/s</span>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 aspect-video bg-surface-container rounded-lg border border-white/5 p-4 overflow-hidden relative">
                <pre className="text-[10px] font-data-mono text-primary-fixed-dim/60 whitespace-pre">{`{
  "status": "scaling",
  "nodes": ["sg-01", "us-east-1"],
  "integrity": 0.9992,
  "load": 0.12
}`}</pre>
                <div className="absolute bottom-2 right-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-container rounded-full animate-pulse" />
                  <span className="text-[10px] text-primary-container font-data-mono">SYNCING</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Manifest */}
        <section className="py-24 bg-surface-container-lowest relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop relative z-10 text-center">
            <span className="font-data-mono text-label-sm text-primary-container mb-4 block">THE MANIFEST</span>
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-8">
              Our Vision for Open Infrastructure
            </h2>
            <div className="space-y-6 text-on-surface-variant font-body-md leading-relaxed text-left glass-card p-12 rounded-2xl">
              <p>
                We believe that the future of commerce is not owned by a handful of corporate cloud providers. It is
                built on open, permissionless protocols that empower the individual developer and merchant.
              </p>
              <p>
                APICommerce exists to bridge the gap between the complex world of decentralized networks and the
                intuitive needs of high-velocity commerce. We are building the tools that make Web3 invisible, so the
                value becomes undeniable.
              </p>
              <p className="italic text-primary border-l-2 border-primary-container pl-6">
                "Decentralization is not a feature; it is the fundamental requirement for a free digital economy."
              </p>
            </div>
          </div>
        </section>

        {/* Precios Transparentes — from landing_page_con_precios_detallados */}
        <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <img
                alt="API Mascot"
                className="w-24 h-24 rounded-full bg-secondary-container/10 p-2 border border-secondary/20"
                src={MASCOT_URL}
              />
            </div>
            <h2 className="font-headline-lg text-headline-lg mb-4 text-primary">Precios Transparentes</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Paga solo por lo que usas con nuestro modelo Pay-as-you-go. Sin compromisos a largo plazo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="font-headline-sm text-headline-sm mb-6 flex items-center gap-2 text-primary">
                <MS name="layers" className="text-primary-container" />
                Nuestras Mezclas (Blends)
              </h3>
              <div className="space-y-4">
                {BLENDS.map((b) => {
                  const isHighlight = b.slug === "builder";
                  return (
                    <div
                      key={b.slug}
                      className={`flex justify-between items-center p-4 rounded-lg bg-surface-container-high border ${
                        isHighlight ? "border-primary-container/30 border-2" : "border-outline-variant/20"
                      }`}
                    >
                      <div>
                        <p className={`font-bold ${isHighlight ? "text-primary-container" : "text-on-surface"}`}>
                          {b.name}
                        </p>
                        <p className="text-label-sm text-on-surface-variant">{b.tagline}</p>
                      </div>
                      <p
                        className={`font-code-md ${
                          isHighlight ? "text-primary-container font-bold" : "text-secondary"
                        }`}
                      >
                        ${b.costPerMTok.toFixed(2)}{" "}
                        <span className="text-xs text-on-surface-variant">/ 1M tokens</span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-secondary-container/10 border border-secondary/20">
                <div className="flex items-start gap-4">
                  <MS name="card_giftcard" className="text-secondary" />
                  <div>
                    <h4 className="font-bold mb-1 text-on-surface">Nivel Gratuito (Free Tier)</h4>
                    <p className="font-body-md text-on-surface-variant">
                      Tus primeras 50,000 peticiones al mes son totalmente gratis. Prueba todas nuestras funciones sin
                      riesgo.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-xl bg-primary-container/10 border border-primary-container/20">
                <div className="flex items-start gap-4">
                  <MS name="corporate_fare" className="text-primary-container" />
                  <div>
                    <h4 className="font-bold mb-1 text-on-surface">Descuentos por Volumen</h4>
                    <p className="font-body-md text-on-surface-variant">
                      ¿Eres una gran empresa? Ofrecemos precios personalizados y soporte prioritario para escalas
                      superiores a 500M de tokens.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-xl bg-surface-variant/30 border border-outline-variant/20">
                <div className="flex items-start gap-4">
                  <MS name="help_outline" className="text-tertiary-fixed-dim" />
                  <div>
                    <h4 className="font-bold mb-1 text-on-surface">¿Hay costes ocultos?</h4>
                    <p className="font-body-md text-on-surface-variant">
                      Sin costes ocultos, solo pagas por lo que consumes. Sin cuotas de mantenimiento ni de
                      implementación.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <div className="glass-card py-20 px-8 rounded-[2rem] border-primary-container/20 overflow-hidden relative">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary-container/10 rounded-full blur-[80px]" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary/10 rounded-full blur-[80px]" />
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-6">
              Ready to Build the Future?
            </h2>
            <p className="text-on-surface-variant font-body-md max-w-xl mx-auto mb-10">
              Join 10,000+ developers deploying next-generation decentralized commerce applications today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/auth/register"
                className="px-10 py-5 bg-primary-container text-on-primary-container font-headline-md text-headline-md rounded-xl shadow-[0_0_30px_rgba(0,255,148,0.3)] hover:scale-105 active:scale-95 transition-all"
              >
                Get Started Free
              </Link>
              <Link
                href="/dashboard/docs"
                className="px-10 py-5 glass-card text-primary font-headline-md text-headline-md rounded-xl hover:bg-white/10 active:scale-95 transition-all"
              >
                Talk to an Architect
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant w-full py-12">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-gutter">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <MS name="api" fill className="text-primary-container" />
              <span className="font-headline-md text-headline-md text-primary">APICommerce</span>
            </div>
            <p className="text-on-surface-variant font-body-md max-w-sm">
              The world's most advanced decentralized API gateway. Built for speed, security, and the future of open
              trade.
            </p>
            <div className="text-on-surface-variant font-body-md">
              © 2024 APICommerce. Built for the decentralized web.
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <span className="font-label-sm text-label-sm text-primary block">Platform</span>
              <ul className="space-y-2">
                <li>
                  <Link href="/dashboard/docs" className="text-on-surface-variant font-body-md hover:text-primary-fixed">
                    Docs
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-on-surface-variant font-body-md hover:text-primary-fixed">
                    Manifest
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-on-surface-variant font-body-md hover:text-primary-fixed">
                    Console
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <span className="font-label-sm text-label-sm text-primary block">Community</span>
              <ul className="space-y-2">
                <li>
                  <a className="text-on-surface-variant font-body-md hover:text-primary-fixed" href="#">
                    Discord
                  </a>
                </li>
                <li>
                  <a className="text-on-surface-variant font-body-md hover:text-primary-fixed" href="#">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4 hidden md:block">
              <span className="font-label-sm text-label-sm text-primary block">Legal</span>
              <ul className="space-y-2">
                <li>
                  <a className="text-on-surface-variant font-body-md hover:text-primary-fixed" href="#">
                    Privacy
                  </a>
                </li>
                <li>
                  <a className="text-on-surface-variant font-body-md hover:text-primary-fixed" href="#">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Nav (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-margin-mobile py-2 bg-surface/80 backdrop-blur-lg border-t border-white/10 z-50 rounded-t-xl shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
        <Link
          href="/"
          className="flex flex-col items-center justify-center bg-primary-container/20 text-primary-fixed-dim rounded-xl p-2"
        >
          <MS name="home" />
          <span className="font-label-sm text-label-sm mt-1">Home</span>
        </Link>
        <Link
          href="/dashboard/blends"
          className="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary"
        >
          <MS name="grid_view" />
          <span className="font-label-sm text-label-sm mt-1">Marketplace</span>
        </Link>
        <Link
          href="/dashboard"
          className="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary"
        >
          <MS name="dashboard" />
          <span className="font-label-sm text-label-sm mt-1">Console</span>
        </Link>
        <Link
          href="/dashboard/wallet"
          className="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary"
        >
          <MS name="account_balance_wallet" />
          <span className="font-label-sm text-label-sm mt-1">Wallet</span>
        </Link>
      </nav>
    </>
  );
}
