/**
 * Server-side OpenRouter client. Used only by /api/openrouter/* routes.
 * If OPENROUTER_API_KEY is missing we fall back to a deterministic mock so
 * the demo works offline.
 */

const OR_BASE = "https://openrouter.ai/api/v1";

export function hasOpenRouterKey() {
  return Boolean(process.env.OPENROUTER_API_KEY);
}

export async function fetchModels() {
  if (!hasOpenRouterKey()) {
    return { source: "mock", data: [] };
  }
  const res = await fetch(`${OR_BASE}/models`, {
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "HTTP-Referer": process.env.OPENROUTER_REFERER ?? "https://apicommerce.io",
      "X-Title": "APICommerce",
    },
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`OpenRouter models ${res.status}`);
  const json = (await res.json()) as { data: unknown[] };
  return { source: "openrouter" as const, data: json.data };
}

export type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

export async function chat(opts: {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
}) {
  if (!hasOpenRouterKey()) {
    return mockChat(opts);
  }
  const res = await fetch(`${OR_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.OPENROUTER_REFERER ?? "https://apicommerce.io",
      "X-Title": "APICommerce",
    },
    body: JSON.stringify({
      model: opts.model,
      messages: opts.messages,
      temperature: opts.temperature ?? 0.4,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenRouter chat ${res.status}: ${text}`);
  }
  return (await res.json()) as {
    choices: { message: { role: string; content: string } }[];
    usage?: { prompt_tokens: number; completion_tokens: number };
  };
}

function mockChat(opts: { model: string; messages: ChatMessage[] }) {
  const last = opts.messages[opts.messages.length - 1]?.content ?? "";
  const reply =
    `[mock · ${opts.model}] Recibí tu solicitud (${last.slice(0, 120)}…). ` +
    `Cuando configures OPENROUTER_API_KEY en el entorno responderé con el modelo real. ` +
    `Mientras tanto, así suena un blend operando: routing primario, validador en sombra y fallback caliente.`;
  return Promise.resolve({
    choices: [{ message: { role: "assistant", content: reply } }],
    usage: { prompt_tokens: Math.max(8, last.length / 4), completion_tokens: 120 },
  });
}
