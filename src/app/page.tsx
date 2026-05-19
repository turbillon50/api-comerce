import Link from "next/link";
import { MS } from "@/components/ui/MS";
import { Mascot } from "@/components/ui/Mascot";
import { BLENDS } from "@/lib/catalog";

export default function HomePage() {
  return (
    <>
      {/* TopAppBar */}
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
            Blends
          </Link>
          <Link
            className="text-on-surface-variant hover:bg-white/5 transition-all duration-300 font-label-sm text-label-sm px-2 py-1 rounded"
            href="/dashboard"
          >
            Console
          </Link>
          <Link
            className="text-on-surface-variant hover:bg-white/5 transition-all duration-300 font-label-sm text-label-sm px-2 py-1 rounded"
            href="/dashboard/billing"
          >
            Billing
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/auth/login"
            className="hidden sm:inline-block text-on-surface-variant font-label-sm text-label-sm hover:text-primary transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/auth/register"
            className="bg-primary-container text-on-primary font-label-sm text-label-sm px-5 py-2 rounded-full active:scale-95 transition-transform hover:brightness-110 emerald-glow"
          >
            Get Started
          </Link>
        </div>
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
                <span className="font-label-sm text-label-sm">Pay-as-you-go AI API</span>
              </div>
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg leading-tight text-primary">
                One key.{" "}
                <span className="bg-gradient-to-r from-primary-container to-secondary-fixed-dim bg-clip-text text-transparent">
                  Four AI blends.
                </span>{" "}
                Per-second billing.
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-lg">
                Buy a single API key and route to the right model for the job — a cheap blend for bots,
                a premium blend for complex reasoning, an image blend for generation. Top up with Stripe,
                see consumption live, scale only what you use.
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
              <div className="flex items-center gap-6 pt-4 text-on-surface-variant text-body-sm">
                <div className="flex items-center gap-2">
                  <MS name="credit_card" size={18} className="text-primary-fixed-dim" />
                  <span>Stripe checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <MS name="speed" size={18} className="text-secondary-fixed-dim" />
                  <span>OpenAI-compatible</span>
                </div>
                <div className="flex items-center gap-2">
                  <MS name="analytics" size={18} className="text-tertiary-fixed-dim" />
                  <span>Live usage meter</span>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center items-center">
              <div className="relative w-full aspect-square max-w-md flex items-center justify-center">
                <Mascot size={420} className="z-20 drop-shadow-[0_0_50px_rgba(0,255,148,0.4)]" />
                <div className="absolute inset-0 border-[20px] border-white/5 rounded-full scale-100 animate-pulse pointer-events-none" />
                <div className="absolute inset-4 border-[2px] border-primary-container/20 rounded-full scale-90 pointer-events-none" />
                <div className="absolute inset-12 border-[1px] border-secondary/20 rounded-full scale-110 pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* Bento Features */}
        <section className="py-24 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-16">
            <h2 className="font-headline-md text-display-lg text-primary mb-4">Pick the right blend for the job</h2>
            <p className="text-on-surface-variant font-body-md max-w-2xl mx-auto">
              Each request is routed to the model tier that matches the workload — you pay only for what
              that tier costs, plus a flat margin we publish up front.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 glass-card rounded-xl p-8 flex flex-col justify-between group hover:border-primary-container/50 transition-colors">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary-container/10 flex items-center justify-center">
                  <MS name="route" className="text-primary-container" />
                </div>
                <h3 className="font-headline-md text-headline-md text-primary">Smart routing</h3>
                <p className="text-on-surface-variant font-body-md">
                  Send `blend: "support"` for a Telegram bot, `blend: "builder"` for a code-review agent,
                  `blend: "image"` for product photos. One endpoint, four tiers, predictable pricing.
                </p>
              </div>
              <div className="mt-8 flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-surface-container rounded-full text-label-sm font-data-mono text-primary-container">
                  TEXT / CHAT
                </span>
                <span className="px-3 py-1 bg-surface-container rounded-full text-label-sm font-data-mono text-secondary">
                  CODE / REASONING
                </span>
                <span className="px-3 py-1 bg-surface-container rounded-full text-label-sm font-data-mono text-tertiary-fixed-dim">
                  IMAGE
                </span>
              </div>
            </div>

            <div className="glass-card rounded-xl p-8 space-y-4 glow-violet border-secondary/20">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                <MS name="payments" className="text-secondary" />
              </div>
              <h3 className="font-headline-md text-headline-md text-primary">Stripe top-ups</h3>
              <p className="text-on-surface-variant font-body-md">
                Recharge $10, $50, or $250 in a click. Credits never expire. Auto-recharge when the meter
                hits your floor.
              </p>
            </div>

            <div className="glass-card rounded-xl p-8 space-y-4 glow-emerald border-primary-container/20">
              <div className="w-12 h-12 rounded-lg bg-primary-container/10 flex items-center justify-center">
                <MS name="speed" className="text-primary-container" />
              </div>
              <h3 className="font-headline-md text-headline-md text-primary">Per-second metering</h3>
              <p className="text-on-surface-variant font-body-md">
                Every call shows up in your dashboard in real time with tokens-in, tokens-out, latency, and
                the exact USD it cost you.
              </p>
            </div>

            <div className="md:col-span-2 glass-card rounded-xl p-8 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-4">
                <h3 className="font-headline-md text-headline-md text-primary">Mix and match</h3>
                <p className="text-on-surface-variant font-body-md">
                  Compose your own blend by combining models: a fast cheap one as primary, a premium one
                  as fallback for retries, an image model for attachments. Set your margin, share the key
                  with your team.
                </p>
                <div className="pt-4 flex gap-4">
                  <div className="flex flex-col">
                    <span className="text-label-sm font-data-mono text-on-surface-variant">SLA</span>
                    <span className="text-headline-md font-data-mono text-primary-container">99.9%</span>
                  </div>
                  <div className="flex flex-col border-l border-white/10 pl-4">
                    <span className="text-label-sm font-data-mono text-on-surface-variant">TIERS</span>
                    <span className="text-headline-md font-data-mono text-secondary">4</span>
                  </div>
                  <div className="flex flex-col border-l border-white/10 pl-4">
                    <span className="text-label-sm font-data-mono text-on-surface-variant">FREE TIER</span>
                    <span className="text-headline-md font-data-mono text-tertiary-fixed-dim">50k/mo</span>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 aspect-video bg-surface-container rounded-lg border border-white/5 p-4 overflow-hidden relative">
                <pre className="text-[10px] font-data-mono text-primary-fixed-dim/80 whitespace-pre leading-relaxed">{`POST /v1/chat/completions
{
  "blend": "support",
  "messages": [...]
}

→ tokens: 312
→ cost: $0.000025
→ latency: 184ms`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* Tiers / Precios */}
        <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-headline-lg mb-4 text-primary">Four tiers, one billing line</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Pay only for what you call. Volume discounts kick in automatically past 500M tokens / month.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="font-headline-sm text-headline-sm mb-6 flex items-center gap-2 text-primary">
                <MS name="layers" className="text-primary-container" />
                Tier pricing
              </h3>
              <div className="space-y-4">
                {BLENDS.map((b) => {
                  const isHighlight = b.slug === "pro";
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
                        ${b.price.toFixed(2)}{" "}
                        <span className="text-xs text-on-surface-variant">/ {b.unit}</span>
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
                    <h4 className="font-bold mb-1 text-on-surface">Free tier</h4>
                    <p className="font-body-md text-on-surface-variant">
                      First 50,000 tokens / month on the house. Test all four blends with no card.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-xl bg-primary-container/10 border border-primary-container/20">
                <div className="flex items-start gap-4">
                  <MS name="corporate_fare" className="text-primary-container" />
                  <div>
                    <h4 className="font-bold mb-1 text-on-surface">Volume discounts</h4>
                    <p className="font-body-md text-on-surface-variant">
                      Past 500M tokens / month we negotiate a custom rate and add priority routing.
                      Email us with your projected use case.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-xl bg-surface-variant/30 border border-outline-variant/20">
                <div className="flex items-start gap-4">
                  <MS name="help_outline" className="text-tertiary-fixed-dim" />
                  <div>
                    <h4 className="font-bold mb-1 text-on-surface">Any hidden fees?</h4>
                    <p className="font-body-md text-on-surface-variant">
                      None. No minimums, no platform fees, no per-key surcharge. You pay only the per-token
                      tier price.
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
              Ready to ship?
            </h2>
            <p className="text-on-surface-variant font-body-md max-w-xl mx-auto mb-10">
              Sign up, drop your first key into your app, and watch the meter tick. No commit, no annual
              contract.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/auth/register"
                className="px-10 py-5 bg-primary-container text-on-primary-container font-headline-md text-headline-md rounded-xl shadow-[0_0_30px_rgba(0,255,148,0.3)] hover:scale-105 active:scale-95 transition-all"
              >
                Get a Free Key
              </Link>
              <Link
                href="/dashboard/docs"
                className="px-10 py-5 glass-card text-primary font-headline-md text-headline-md rounded-xl hover:bg-white/10 active:scale-95 transition-all"
              >
                Read the API
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
              Pay-as-you-go AI API. Four tiers, one key, per-second billing.
            </p>
            <div className="text-on-surface-variant font-body-md">© 2024 APICommerce.</div>
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
                  <Link href="/dashboard/blends" className="text-on-surface-variant font-body-md hover:text-primary-fixed">
                    Blends
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
              <span className="font-label-sm text-label-sm text-primary block">Support</span>
              <ul className="space-y-2">
                <li>
                  <a className="text-on-surface-variant font-body-md hover:text-primary-fixed" href="mailto:hello@apicommerce.io">
                    Email
                  </a>
                </li>
                <li>
                  <a className="text-on-surface-variant font-body-md hover:text-primary-fixed" href="#">
                    Status
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
          <span className="font-label-sm text-label-sm mt-1">Blends</span>
        </Link>
        <Link
          href="/dashboard"
          className="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary"
        >
          <MS name="dashboard" />
          <span className="font-label-sm text-label-sm mt-1">Console</span>
        </Link>
        <Link
          href="/dashboard/billing"
          className="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary"
        >
          <MS name="credit_card" />
          <span className="font-label-sm text-label-sm mt-1">Billing</span>
        </Link>
      </nav>
    </>
  );
}
