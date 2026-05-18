import { LinkButton } from "@/components/ui/buttons";
import { Icon } from "@/components/ui/icon";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow opacity-90" />
      <div className="absolute inset-0 tech-grid opacity-50" />
      <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-6 pb-28 pt-20 lg:grid-cols-2 lg:px-10 lg:pt-28">
        <div>
          <div className="pill pill-success mb-6 w-fit">
            <Icon name="zap" className="h-3.5 w-3.5" />
            Multi-provider · Multi-blend · Multi-cliente
          </div>
          <h1 className="mb-6 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            La capa de inteligencia para vender <span className="text-gradient">tokens AI</span> con margen.
          </h1>
          <p className="mb-9 max-w-xl text-lg leading-relaxed text-ink-dim">
            Revende OpenRouter como mezclas curadas. Combina Claude, GPT-5, Gemini y modelos open para crear blends
            dedicados, ponles precio por millón de tokens y monitorea cada request en tiempo real desde un
            dashboard de grado misión-crítica.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <LinkButton href="/auth/register" className="px-6 py-3.5 text-base">
              Empieza gratis
              <Icon name="arrow" className="h-4 w-4" />
            </LinkButton>
            <LinkButton href="#manifesto" variant="ghost" className="px-6 py-3.5 text-base">
              Ver manifiesto
            </LinkButton>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            <div>
              <div className="stat-lg text-ink">10+</div>
              <div className="label-caps text-ink-muted mt-1">Modelos curados</div>
            </div>
            <div>
              <div className="stat-lg text-primary">99.99%</div>
              <div className="label-caps text-ink-muted mt-1">Uptime SLA</div>
            </div>
            <div>
              <div className="stat-lg text-secondary">&lt; 50ms</div>
              <div className="label-caps text-ink-muted mt-1">Edge routing</div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative mx-auto h-[440px] w-full max-w-[520px]">
            <div className="absolute inset-0 rounded-full bg-primary/10 blur-[120px]" />
            <div className="absolute inset-0 grid place-items-center">
              <BlendCoreVisual />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BlendCoreVisual() {
  const orbit = "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-line/40";
  const node =
    "absolute grid h-12 w-12 place-items-center rounded-full glass-light text-xs font-mono shadow-glow-primary";
  return (
    <div className="relative h-[420px] w-[420px]">
      <div className={`${orbit} h-[360px] w-[360px] orbit`}>
        <div className={`${node} -top-6 left-1/2 -translate-x-1/2`}>
          <span className="text-primary">Opus</span>
        </div>
        <div className={`${node} top-1/2 -right-6 -translate-y-1/2 shadow-glow-secondary`}>
          <span className="text-secondary">GPT-5</span>
        </div>
        <div className={`${node} -bottom-6 left-1/2 -translate-x-1/2 shadow-glow-tertiary`}>
          <span className="text-tertiary">Gemini</span>
        </div>
        <div className={`${node} top-1/2 -left-6 -translate-y-1/2`}>
          <span className="text-primary">Llama</span>
        </div>
      </div>
      <div className={`${orbit} h-[240px] w-[240px] orbit`} style={{ animationDirection: "reverse", animationDuration: "18s" }}>
        <div className={`${node} -top-6 left-1/2 -translate-x-1/2 shadow-glow-secondary`}>
          <span className="text-secondary">Sonnet</span>
        </div>
        <div className={`${node} -bottom-6 left-1/2 -translate-x-1/2`}>
          <span className="text-primary">Haiku</span>
        </div>
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid h-32 w-32 place-items-center rounded-full bg-bg-1 hairline shadow-glow-primary">
        <div className="text-center">
          <div className="label-caps text-primary-dim">Blend core</div>
          <div className="mt-1 text-2xl font-bold">Prism</div>
          <div className="mt-1 text-[10px] text-ink-muted code">routing · live</div>
        </div>
      </div>
    </div>
  );
}
