"use client";

import { Topbar } from "@/components/dashboard/Topbar";
import { Panel } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { useAppStore } from "@/store/use-app-store";

const SAMPLE_BLEND = "blend_chat_starter";

export default function DocsPage() {
  const keys = useAppStore((s) => s.keys);
  const sampleKey = keys[0]?.full ?? "apc_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

  const curl = `curl https://api.apicommerce.io/v1/chat/completions \\
  -H "Authorization: Bearer ${sampleKey}" \\
  -H "X-Blend: ${SAMPLE_BLEND}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "messages": [
      { "role": "user", "content": "Hola, ¿qué hace tu producto?" }
    ]
  }'`;

  const node = `import { ApiCommerce } from "@apicommerce/sdk";

const apc = new ApiCommerce({ apiKey: process.env.APC_KEY });

const reply = await apc.chat({
  blend: "${SAMPLE_BLEND}",
  messages: [{ role: "user", content: "Resume este PDF en 5 bullets" }],
});`;

  const python = `from apicommerce import APICommerce
apc = APICommerce(api_key=os.environ["APC_KEY"])

reply = apc.chat.completions.create(
    blend="${SAMPLE_BLEND}",
    messages=[{"role": "user", "content": "Diagnóstico de este log"}],
)`;

  return (
    <>
      <Topbar title="Docs & API" subtitle="OpenAI-compatible. Cambia tu BASE_URL y ya." />
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto scrollbar-thin">
        <Panel className="!p-6 mb-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <div className="label-caps text-primary-dim mb-2">Base URL</div>
              <code className="text-sm code text-ink">https://api.apicommerce.io/v1</code>
            </div>
            <div>
              <div className="label-caps text-primary-dim mb-2">Auth</div>
              <code className="text-sm code text-ink">Bearer apc_live_…</code>
            </div>
            <div>
              <div className="label-caps text-primary-dim mb-2">Header de blend</div>
              <code className="text-sm code text-ink">X-Blend: &lt;slug&gt;</code>
            </div>
          </div>
        </Panel>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Code title="curl" body={curl} icon="terminal" />
          <Code title="Node.js" body={node} icon="code" />
          <Code title="Python" body={python} icon="code" />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <Panel className="!p-6">
            <div className="label-caps text-secondary mb-3">Endpoints v1</div>
            <ul className="space-y-3 text-sm">
              {[
                { m: "POST", p: "/v1/chat/completions", d: "Chat OpenAI-compatible con routing por blend" },
                { m: "POST", p: "/v1/embeddings", d: "Embeddings ruteados (próximamente)" },
                { m: "GET", p: "/v1/blends", d: "Lista blends accesibles para tu key" },
                { m: "GET", p: "/v1/usage", d: "Telemetría agregada por ventana" },
              ].map((e) => (
                <li key={e.p} className="flex items-start gap-3">
                  <span className="pill pill-info shrink-0">{e.m}</span>
                  <div className="min-w-0">
                    <code className="text-sm code text-ink">{e.p}</code>
                    <div className="text-xs text-ink-muted">{e.d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel className="!p-6">
            <div className="label-caps text-tertiary mb-3">Mascota API · UX para clientes</div>
            <p className="text-sm text-ink-dim leading-relaxed mb-4">
              Cuando tus clientes consumen tu blend, ven la marca "APICommerce powered by …" o tu propio whitelabel.
              Configura el footer y el icono de la mascota en tu organización.
            </p>
            <ul className="space-y-2.5 text-sm text-ink-dim">
              <li className="flex items-center gap-2">
                <Icon name="check" className="h-4 w-4 text-primary" /> Errors human-friendly por modelo
              </li>
              <li className="flex items-center gap-2">
                <Icon name="check" className="h-4 w-4 text-primary" /> Rate-limit headers compatibles con OpenAI
              </li>
              <li className="flex items-center gap-2">
                <Icon name="check" className="h-4 w-4 text-primary" /> Streaming SSE en todos los blends
              </li>
            </ul>
          </Panel>
        </div>
      </main>
    </>
  );
}

function Code({ title, body, icon }: { title: string; body: string; icon: "terminal" | "code" }) {
  return (
    <Panel className="!p-0 overflow-hidden">
      <div className="flex items-center justify-between border-b border-line/30 px-5 py-3">
        <div className="flex items-center gap-2">
          <Icon name={icon} className="h-4 w-4 text-secondary" />
          <span className="text-sm font-semibold">{title}</span>
        </div>
        <button
          onClick={() => navigator.clipboard?.writeText(body)}
          className="text-[11px] text-ink-muted hover:text-ink"
        >
          <Icon name="copy" className="h-3.5 w-3.5 inline mr-1" />
          copy
        </button>
      </div>
      <pre className="overflow-x-auto px-5 py-4 text-xs code text-ink-dim leading-relaxed">
        <code>{body}</code>
      </pre>
    </Panel>
  );
}
