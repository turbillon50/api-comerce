"use client";

import { MS } from "@/components/ui/MS";
import { BottomNav } from "@/components/dashboard/Topbar";

const SNIPPETS = {
  curl: `curl https://api.apicommerce.io/v1/chat/completions \\
  -H "Authorization: Bearer $APICOMERCE_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "blend": "support",
    "messages": [{ "role": "user", "content": "Hi" }]
  }'`,
  node: `import { APICommerce } from "@apicommerce/sdk";

const client = new APICommerce({ apiKey: process.env.APICOMERCE_KEY });

const res = await client.chat.completions.create({
  blend: "builder",
  messages: [{ role: "user", content: "Refactor this React component" }],
});

console.log(res.choices[0].message.content);`,
  python: `from apicommerce import APICommerce

client = APICommerce(api_key=os.environ["APICOMERCE_KEY"])

res = client.chat.completions.create(
    blend="agent",
    messages=[{"role": "user", "content": "Plan a 3-step migration"}],
)

print(res.choices[0].message.content)`,
};

export default function DocsPage() {
  return (
    <>
      <main className="px-margin-mobile md:px-margin-desktop py-lg max-w-container-max mx-auto">
        <section className="mb-lg">
          <p className="font-label-caps text-label-caps text-primary-fixed-dim mb-xs uppercase">
            Developer / Console
          </p>
          <h2 className="font-headline-lg text-headline-lg text-primary">Docs & API Reference</h2>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          <div className="lg:col-span-2 space-y-gutter">
            {(Object.entries(SNIPPETS) as [keyof typeof SNIPPETS, string][]).map(([lang, code]) => (
              <div key={lang} className="glass-panel rounded-xl overflow-hidden">
                <div className="px-md py-3 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-high/40">
                  <h3 className="font-label-caps text-label-caps text-secondary-fixed-dim uppercase">{lang}</h3>
                  <button
                    onClick={() => navigator.clipboard.writeText(code)}
                    className="text-primary-fixed-dim font-jetbrains-mono text-[10px] hover:underline flex items-center gap-1"
                  >
                    <MS name="content_copy" size={14} /> COPY
                  </button>
                </div>
                <pre className="p-md text-xs font-jetbrains-mono text-on-surface overflow-x-auto custom-scrollbar leading-relaxed">
                  {code}
                </pre>
              </div>
            ))}
          </div>

          <div className="space-y-gutter">
            <div className="glass-card p-lg rounded-xl">
              <h3 className="font-label-caps text-label-caps text-primary-fixed-dim mb-md">ENDPOINTS</h3>
              <ul className="space-y-sm text-body-sm font-jetbrains-mono">
                <li className="flex items-center gap-sm">
                  <span className="px-2 py-0.5 bg-primary-fixed-dim/10 text-primary-fixed-dim text-[10px] rounded">
                    POST
                  </span>
                  <span className="text-on-surface">/v1/chat/completions</span>
                </li>
                <li className="flex items-center gap-sm">
                  <span className="px-2 py-0.5 bg-primary-fixed-dim/10 text-primary-fixed-dim text-[10px] rounded">
                    POST
                  </span>
                  <span className="text-on-surface">/v1/embeddings</span>
                </li>
                <li className="flex items-center gap-sm">
                  <span className="px-2 py-0.5 bg-secondary-fixed-dim/10 text-secondary-fixed-dim text-[10px] rounded">
                    GET
                  </span>
                  <span className="text-on-surface">/v1/blends</span>
                </li>
                <li className="flex items-center gap-sm">
                  <span className="px-2 py-0.5 bg-secondary-fixed-dim/10 text-secondary-fixed-dim text-[10px] rounded">
                    GET
                  </span>
                  <span className="text-on-surface">/v1/usage</span>
                </li>
                <li className="flex items-center gap-sm">
                  <span className="px-2 py-0.5 bg-tertiary-fixed-dim/10 text-tertiary-fixed-dim text-[10px] rounded">
                    DEL
                  </span>
                  <span className="text-on-surface">/v1/keys/:id</span>
                </li>
              </ul>
            </div>

            <div className="glass-card p-lg rounded-xl">
              <h3 className="font-label-caps text-label-caps text-secondary-fixed-dim mb-md">RATE LIMITS</h3>
              <div className="space-y-md font-jetbrains-mono text-body-sm">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">FREE TIER</span>
                  <span className="text-primary-fixed-dim">50k req/mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">PRO</span>
                  <span className="text-primary-fixed-dim">5M req/mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">SCALE</span>
                  <span className="text-primary-fixed-dim">unlimited</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <BottomNav active="logs" />
    </>
  );
}
