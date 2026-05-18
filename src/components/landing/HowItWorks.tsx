import { Icon } from "@/components/ui/icon";
import { Panel } from "@/components/ui/card";

const STEPS = [
  {
    n: "01",
    title: "Conecta tus proveedores",
    body: "Pega tu API key de OpenRouter. APICommerce indexa el catálogo (Claude, GPT-5, Gemini, Llama, DeepSeek…) con su pricing por millón de tokens.",
    icon: "network" as const,
  },
  {
    n: "02",
    title: "Compón tu blend",
    body: "Selecciona modelos, asigna pesos y roles (primary / validator / fallback). Define el margen y obtienes un precio final automático.",
    icon: "wand" as const,
  },
  {
    n: "03",
    title: "Emite claves dedicadas",
    body: "Cada cliente recibe una API key vinculada al blend, con presupuesto mensual y telemetría individual. Cero filtración entre cuentas.",
    icon: "key" as const,
  },
  {
    n: "04",
    title: "Mide, ajusta, escala",
    body: "Panel de requests en vivo, alertas de margen y un agente residente que sugiere optimizaciones basadas en consumo real.",
    icon: "line" as const,
  },
];

export function HowItWorks() {
  return (
    <section className="border-y border-line/20 bg-bg-surface/80 py-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="mb-16 text-center">
          <div className="pill pill-success mx-auto mb-4 w-fit">
            <Icon name="route" className="h-3.5 w-3.5" />
            Cómo funciona
          </div>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            De OpenRouter a producto facturable en cuatro pasos.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Panel key={s.n} className="!p-6 relative">
              <div className="label-caps text-primary-dim mb-4">{s.n}</div>
              <div className="mb-5 grid h-11 w-11 place-items-center rounded-lg bg-bg-3 text-primary">
                <Icon name={s.icon} className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-base font-semibold">{s.title}</h3>
              <p className="text-sm leading-relaxed text-ink-dim">{s.body}</p>
              {i < STEPS.length - 1 ? (
                <Icon name="chevron" className="absolute -right-4 top-1/2 hidden h-5 w-5 text-line lg:block" />
              ) : null}
            </Panel>
          ))}
        </div>
      </div>
    </section>
  );
}
