import { LinkButton } from "@/components/ui/buttons";
import { Icon } from "@/components/ui/icon";
import Link from "next/link";

export function CTAFooter() {
  return (
    <>
      <section className="py-28">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="glass relative overflow-hidden rounded-2xl p-10 md:p-16 shadow-glow-primary">
            <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
            <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <div className="pill pill-success mb-4 w-fit">
                  <Icon name="zap" className="h-3.5 w-3.5" />
                  Listo en 90 segundos
                </div>
                <h2 className="text-3xl font-semibold md:text-5xl tracking-tight">
                  Empieza a empacar inteligencia con margen hoy.
                </h2>
                <p className="mt-4 text-ink-dim max-w-xl">
                  Crea tu cuenta, conecta tu API key de OpenRouter y publica tu primer blend. Sin contrato, sin tarjeta de
                  crédito.
                </p>
              </div>
              <div className="flex flex-col gap-3 lg:items-end">
                <LinkButton href="/auth/register" className="px-6 py-4 text-base">
                  Crear cuenta gratis
                  <Icon name="arrow" className="h-4 w-4" />
                </LinkButton>
                <LinkButton href="/dashboard" variant="ghost" className="px-6 py-4 text-base">
                  Ver demo del dashboard
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-line/20 bg-bg-surface py-12">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10 grid grid-cols-1 gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-ink">
                <span className="font-bold">A</span>
              </div>
              <span className="font-bold">APICommerce</span>
            </div>
            <p className="text-sm text-ink-dim max-w-xs leading-relaxed">
              La capa de inteligencia para vender tokens AI como producto, con margen, telemetría y agente residente.
            </p>
            <p className="mt-6 label-caps text-ink-muted">© 2026 APICommerce · Obsidian Prism</p>
          </div>
          {(
            [
              {
                title: "Producto",
                links: [
                  { l: "Marketplace de Blends", h: "#blends" },
                  { l: "Pricing", h: "#pricing" },
                  { l: "Agente Prism", h: "#agent" },
                  { l: "Dashboard", h: "/dashboard" },
                ],
              },
              {
                title: "Recursos",
                links: [
                  { l: "Documentación", h: "/dashboard/docs" },
                  { l: "API Reference", h: "/dashboard/docs" },
                  { l: "Status", h: "#" },
                ],
              },
              {
                title: "Empresa",
                links: [
                  { l: "Manifiesto", h: "#manifesto" },
                  { l: "Privacidad", h: "#" },
                  { l: "Términos", h: "#" },
                ],
              },
            ] as const
          ).map((col) => (
            <div key={col.title}>
              <div className="label-caps text-ink mb-4">{col.title}</div>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.l}>
                    <Link href={link.h} className="text-sm text-ink-dim hover:text-ink transition-colors">
                      {link.l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </>
  );
}
