import { Icon } from "@/components/ui/icon";
import { Panel } from "@/components/ui/card";
import { seedBlends } from "@/lib/seed";

const FEATURED = seedBlends().slice(0, 3);

export function BlendShowcase() {
  return (
    <section id="blends" className="py-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="mb-12 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <div className="pill pill-info mb-4 w-fit">
              <Icon name="boxes" className="h-3.5 w-3.5" />
              Marketplace de blends
            </div>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl max-w-xl">
              Empaques de modelos listos para vender o consumir.
            </h2>
          </div>
          <p className="max-w-md text-sm text-ink-dim">
            Estos son blends curados por nuestro equipo. Puedes clonarlos, ajustarlos y publicarlos bajo tu marca en minutos.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {FEATURED.map((b) => (
            <Panel key={b.id} className="!p-7 flex flex-col">
              <div className="mb-4 flex items-center justify-between">
                <span className="pill pill-success">{b.useCase}</span>
                <span className="text-xs text-ink-muted code">{b.requests.toLocaleString()} req</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold">{b.name}</h3>
              <p className="mb-6 text-sm leading-relaxed text-ink-dim line-clamp-3">{b.description}</p>

              <div className="mb-5 space-y-2.5">
                {b.components.map((c) => (
                  <div
                    key={c.modelId}
                    className="flex items-center justify-between rounded-lg bg-bg-2/70 px-3 py-2 hairline"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          c.role === "primary"
                            ? "bg-primary"
                            : c.role === "validator"
                            ? "bg-secondary"
                            : "bg-tertiary"
                        }`}
                      />
                      <span className="truncate text-xs code text-ink">{c.modelId.split("/")[1]}</span>
                    </div>
                    <span className="text-xs code text-ink-muted">{c.weight}%</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto flex items-end justify-between border-t border-line/30 pt-5">
                <div>
                  <div className="label-caps text-ink-muted mb-1">Precio</div>
                  <div className="stat-lg text-primary">
                    ${b.pricePerMtok.toFixed(2)} <span className="text-xs text-ink-dim">/Mtok</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="label-caps text-ink-muted mb-1">Margen</div>
                  <div className="text-sm font-semibold text-secondary">{b.margin}%</div>
                </div>
              </div>
            </Panel>
          ))}
        </div>
      </div>
    </section>
  );
}
