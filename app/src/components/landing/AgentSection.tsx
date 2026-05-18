import { Icon } from "@/components/ui/icon";
import { Panel } from "@/components/ui/card";

export function AgentSection() {
  return (
    <section id="agent" className="py-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <div className="pill pill-warn mb-4 w-fit">
              <Icon name="bot" className="h-3.5 w-3.5" />
              Prism · Agente residente
            </div>
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl mb-5">
              Memoria persistente que <span className="text-gradient">opera tu negocio</span>.
            </h2>
            <p className="text-ink-dim text-base leading-relaxed mb-7">
              Prism vive en tu dashboard. Recuerda clientes, márgenes objetivo, deudas técnicas y experimentos.
              Le pides en lenguaje natural que cree un blend nuevo, suba el precio de uno existente, o
              te explique por qué bajó el margen de un cliente — y lo hace.
            </p>

            <ul className="space-y-3">
              {[
                {
                  k: "Memoria persistente",
                  v: "Guarda hechos, preferencias, métricas y pendientes en una base que Prism reusa cada conversación.",
                },
                {
                  k: "Acciones del negocio",
                  v: "Crear blends, cambiar pesos, emitir keys, ajustar márgenes, generar reportes — todo desde el chat.",
                },
                {
                  k: "Telemetría como contexto",
                  v: "Conectado a tus requests, wallet y panel — sabe qué está pasando antes de que preguntes.",
                },
              ].map((row) => (
                <li key={row.k} className="flex gap-3">
                  <Icon name="sparkles" className="mt-0.5 h-5 w-5 shrink-0 text-tertiary" />
                  <div>
                    <div className="text-sm font-semibold">{row.k}</div>
                    <div className="text-sm text-ink-dim">{row.v}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Panel className="!p-0 overflow-hidden">
            <div className="border-b border-line/30 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-tertiary/10 text-tertiary">
                  <Icon name="bot" className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Prism</div>
                  <div className="label-caps text-ink-muted">claude-sonnet-4.6 · memoria activa</div>
                </div>
              </div>
              <span className="pill pill-success">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-soft" />
                live
              </span>
            </div>
            <div className="space-y-4 px-6 py-6 text-sm">
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-xl bg-primary/10 px-4 py-3 text-ink">
                  ¿Por qué bajó el margen del Dev Copilot Blend este mes?
                </div>
              </div>
              <div className="flex">
                <div className="max-w-[85%] rounded-xl bg-bg-3/70 px-4 py-3 text-ink-dim leading-relaxed">
                  Tres causas: <span className="text-ink">+18%</span> de tráfico se desvió al validator (DeepSeek R1)
                  por throttling de Sonnet en pico. El costo input/output del fallback Mixtral subió 4¢ en OpenRouter el
                  día 12. Y un cliente nuevo (ACME) tiene prompts 2.3× más largos que la media.
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="pill pill-info">Sugerencia: subir peso primary a 70%</span>
                    <span className="pill pill-warn">Crear blend dedicado ACME</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-xl bg-primary/10 px-4 py-3 text-ink">
                  Crea el blend dedicado para ACME, margen 32%.
                </div>
              </div>
              <div className="flex">
                <div className="max-w-[85%] rounded-xl bg-bg-3/70 px-4 py-3 text-ink-dim">
                  Listo. Blend <span className="code text-secondary">acme-dev-copilot</span> creado en visibilidad{" "}
                  <span className="code text-ink">unlisted</span>, $11.40/Mtok. ¿Genero la API key?
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </section>
  );
}
