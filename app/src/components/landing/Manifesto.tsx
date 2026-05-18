import { Icon, type IconKey } from "@/components/ui/icon";
import { Panel } from "@/components/ui/card";

const TILES: { title: string; body: string; icon: IconKey; tone: "primary" | "secondary" | "tertiary"; span?: string }[] = [
  {
    title: "Mezcla, no proveedor único.",
    body:
      "El cliente no compra Claude ni GPT — compra un blend. Tú decides qué modelo entra a cada request por rol (primary, validator, fallback) y por peso porcentual.",
    icon: "layers",
    tone: "primary",
    span: "md:col-span-2",
  },
  {
    title: "Margen por defecto.",
    body: "Define el margen del blend (%) y APICommerce calcula el precio final por millón de tokens en tiempo real, viendo costos de cada proveedor.",
    icon: "trendUp",
    tone: "secondary",
  },
  {
    title: "Routing dinámico.",
    body: "Si OpenRouter falla, caemos al validator. Si el validator falla, al fallback. SLO 99.99% sin tocar tu código.",
    icon: "route",
    tone: "tertiary",
  },
  {
    title: "Marketplace integrado.",
    body: "Publica un blend como producto. Otras empresas SaaS lo consumen vía nuestra API, tú cobras el spread y recibes payouts semanales.",
    icon: "boxes",
    tone: "primary",
    span: "md:col-span-2",
  },
  {
    title: "Agente residente.",
    body: "Prism es tu copiloto de negocio con memoria persistente: clientes, métricas, deudas técnicas. Pídele que cree blends o suba margen.",
    icon: "bot",
    tone: "secondary",
  },
  {
    title: "Edge nativo.",
    body: "Cada request resuelve en el edge más cercano. Latencia sub-50ms para usuarios globales sin colas centralizadas.",
    icon: "globe",
    tone: "tertiary",
    span: "md:col-span-2",
  },
];

const toneClass = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  tertiary: "bg-tertiary/10 text-tertiary",
};

export function Manifesto() {
  return (
    <section id="manifesto" className="relative py-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="pill pill-info mx-auto mb-4 w-fit">
            <Icon name="sparkles" className="h-3.5 w-3.5" />
            Manifiesto
          </div>
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
            Construimos la infraestructura para que <span className="text-gradient">otros vendan inteligencia</span>.
          </h2>
          <p className="mt-5 text-ink-dim">
            APICommerce no compite con OpenRouter ni con Anthropic. Reempaqueta su capacidad en productos verticales que tú puedes vender, con tu marca, a tus clientes.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {TILES.map((t) => (
            <Panel key={t.title} className={`!p-7 ${t.span ?? ""}`}>
              <div className={`mb-6 grid h-12 w-12 place-items-center rounded-lg ${toneClass[t.tone]}`}>
                <Icon name={t.icon} className="h-5 w-5" />
              </div>
              <h3 className="mb-3 text-lg font-semibold">{t.title}</h3>
              <p className="text-sm leading-relaxed text-ink-dim">{t.body}</p>
            </Panel>
          ))}
        </div>
      </div>
    </section>
  );
}
