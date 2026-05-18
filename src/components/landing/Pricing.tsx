import { Icon } from "@/components/ui/icon";
import { LinkButton } from "@/components/ui/buttons";

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "0",
    suffix: "/ mes",
    blurb: "Para validar tu idea y ensamblar tus primeros blends.",
    features: [
      "Hasta 5 blends activos",
      "1 millón de tokens incluidos",
      "Wallet con top-up manual",
      "1 API key por blend",
      "Comunidad y docs",
    ],
    cta: "Empieza gratis",
    href: "/auth/register",
    highlight: false,
  },
  {
    id: "growth",
    name: "Growth",
    price: "49",
    suffix: "/ mes",
    blurb: "Para revendedores con clientes activos y SLAs ligeros.",
    features: [
      "Blends ilimitados",
      "10M tokens incluidos · overage a costo",
      "Marketplace publishing",
      "Hasta 20 API keys",
      "Agente Prism · memoria 30 días",
      "Soporte por email",
    ],
    cta: "Probar 14 días",
    href: "/auth/register",
    highlight: true,
  },
  {
    id: "scale",
    name: "Scale",
    price: "199",
    suffix: "/ mes",
    blurb: "Operadores serios con volumen y necesidad de governance.",
    features: [
      "50M tokens incluidos",
      "Validators y shadow runs",
      "Auto top-up + alertas margen",
      "API keys ilimitadas + RBAC",
      "Agente Prism · memoria ilimitada",
      "Soporte 24/5",
    ],
    cta: "Contactar ventas",
    href: "/auth/register",
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-28 border-t border-line/20 bg-bg-surface/60">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="mb-14 text-center">
          <div className="pill pill-success mx-auto mb-4 w-fit">
            <Icon name="receipt" className="h-3.5 w-3.5" />
            Pricing transparente
          </div>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Paga por plataforma. Los tokens van directo de tu wallet.
          </h2>
          <p className="mt-4 text-ink-dim max-w-2xl mx-auto text-sm">
            Cobramos por orquestación, blends, marketplace y agente. El costo de los modelos pasa a tu wallet a precio de
            OpenRouter — sin recargo. Tú decides el margen que pones a tus clientes.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.id}
              className={`relative rounded-xl p-7 transition-all ${
                p.highlight
                  ? "glass border-primary/40 shadow-glow-primary"
                  : "glass-light"
              }`}
            >
              {p.highlight ? (
                <span className="pill pill-success absolute -top-3 left-7">Más popular</span>
              ) : null}
              <div className="mb-2 text-lg font-semibold">{p.name}</div>
              <p className="mb-6 text-sm text-ink-dim min-h-[40px]">{p.blurb}</p>
              <div className="mb-7 flex items-baseline gap-1">
                <span className="text-5xl font-bold tracking-tight">${p.price}</span>
                <span className="text-sm text-ink-muted">{p.suffix}</span>
              </div>
              <ul className="mb-8 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-ink-dim">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <LinkButton
                href={p.href}
                variant={p.highlight ? "primary" : "ghost"}
                className="w-full justify-center"
              >
                {p.cta}
              </LinkButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
