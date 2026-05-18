import { nanoid } from "nanoid";
import type { Blend, ApiKey, RequestLog, WalletTx, AgentMemoryItem } from "./types";

const now = () => new Date().toISOString();
const ago = (mins: number) => new Date(Date.now() - mins * 60_000).toISOString();

export function seedBlends(): Blend[] {
  return [
    {
      id: "blend_chat_starter",
      slug: "chat-starter-mix",
      name: "Chat Starter Mix",
      description:
        "Combinación equilibrada para chatbots de soporte: Haiku 4.5 para respuestas rápidas y Sonnet 4.6 como validador en consultas complejas.",
      useCase: "chatbot",
      components: [
        { modelId: "anthropic/claude-haiku-4.5", weight: 80, role: "primary" },
        { modelId: "anthropic/claude-sonnet-4.6", weight: 15, role: "validator" },
        { modelId: "google/gemini-2.5-flash", weight: 5, role: "fallback" },
      ],
      margin: 35,
      pricePerMtok: 3.2,
      visibility: "marketplace",
      createdAt: ago(60 * 24 * 12),
      requests: 124_882,
      successRate: 99.8,
    },
    {
      id: "blend_dev_copilot",
      slug: "dev-copilot-blend",
      name: "Dev Copilot Blend",
      description:
        "Mezcla optimizada para asistentes de código. Claude Sonnet 4.6 como reasoning core, DeepSeek R1 para tareas algorítmicas, Mixtral para autocompletado veloz.",
      useCase: "code",
      components: [
        { modelId: "anthropic/claude-sonnet-4.6", weight: 55, role: "primary" },
        { modelId: "deepseek/deepseek-r1", weight: 30, role: "validator" },
        { modelId: "mistralai/mixtral-8x22b", weight: 15, role: "fallback" },
      ],
      margin: 28,
      pricePerMtok: 9.4,
      visibility: "marketplace",
      createdAt: ago(60 * 24 * 6),
      requests: 38_421,
      successRate: 99.4,
    },
    {
      id: "blend_long_rag",
      slug: "long-context-rag",
      name: "Long-Context RAG",
      description:
        "Ideal para Q&A sobre documentos extensos. Gemini 2.5 Pro como motor de contexto, Sonnet 4.6 como verificador de hechos.",
      useCase: "rag",
      components: [
        { modelId: "google/gemini-2.5-pro", weight: 70, role: "primary" },
        { modelId: "anthropic/claude-sonnet-4.6", weight: 30, role: "validator" },
      ],
      margin: 32,
      pricePerMtok: 4.8,
      visibility: "marketplace",
      createdAt: ago(60 * 24 * 3),
      requests: 12_204,
      successRate: 99.1,
    },
    {
      id: "blend_agent_supreme",
      slug: "agent-supreme-stack",
      name: "Agent Supreme Stack",
      description:
        "Stack premium para agentes autónomos con tool calling de alta fidelidad. Opus 4.5 como planner, Sonnet 4.6 ejecuta, GPT-5 mini valida.",
      useCase: "agent",
      components: [
        { modelId: "anthropic/claude-opus-4.5", weight: 35, role: "primary" },
        { modelId: "anthropic/claude-sonnet-4.6", weight: 50, role: "validator" },
        { modelId: "openai/gpt-5-mini", weight: 15, role: "fallback" },
      ],
      margin: 40,
      pricePerMtok: 28.5,
      visibility: "marketplace",
      createdAt: ago(60 * 24 * 1),
      requests: 4_812,
      successRate: 99.6,
    },
    {
      id: "blend_summarize_lite",
      slug: "summarize-lite",
      name: "Summarize Lite",
      description:
        "El blend más económico. Gemini Flash + Llama 70B para resúmenes masivos a centavos por millón.",
      useCase: "summarize",
      components: [
        { modelId: "google/gemini-2.5-flash", weight: 60, role: "primary" },
        { modelId: "meta-llama/llama-3.3-70b", weight: 40, role: "fallback" },
      ],
      margin: 45,
      pricePerMtok: 0.9,
      visibility: "marketplace",
      createdAt: ago(60 * 24 * 18),
      requests: 421_044,
      successRate: 99.9,
    },
  ];
}

export function seedKeys(): ApiKey[] {
  return [
    {
      id: "key_prod_chatbot",
      label: "Production · Chatbot",
      prefix: "apc_live_a91f",
      full: "apc_live_a91f7b22c0e1d4f6e8a3b5c7d9e1f3a5b7c9d1e3",
      blendId: "blend_chat_starter",
      createdAt: ago(60 * 24 * 30),
      lastUsedAt: ago(2),
      status: "active",
      monthlyBudget: 500,
      monthlySpend: 318.42,
    },
    {
      id: "key_staging_dev",
      label: "Staging · Dev Copilot",
      prefix: "apc_test_3c2e",
      full: "apc_test_3c2e98ab12cd34ef56ab78cd90ef12ab34cd56",
      blendId: "blend_dev_copilot",
      createdAt: ago(60 * 24 * 14),
      lastUsedAt: ago(48),
      status: "active",
      monthlyBudget: 150,
      monthlySpend: 42.18,
    },
    {
      id: "key_internal_rag",
      label: "Internal · Docs RAG",
      prefix: "apc_live_77fa",
      full: "apc_live_77fa3344aabb5566ccdd7788eeff9900",
      blendId: "blend_long_rag",
      createdAt: ago(60 * 24 * 4),
      lastUsedAt: ago(11),
      status: "active",
      monthlyBudget: 200,
      monthlySpend: 88.6,
    },
  ];
}

export function seedRequests(): RequestLog[] {
  const out: RequestLog[] = [];
  const blends = ["blend_chat_starter", "blend_dev_copilot", "blend_long_rag", "blend_agent_supreme"];
  const models = [
    "anthropic/claude-sonnet-4.6",
    "anthropic/claude-haiku-4.5",
    "google/gemini-2.5-pro",
    "deepseek/deepseek-r1",
    "openai/gpt-5-mini",
  ];
  const keys = ["key_prod_chatbot", "key_staging_dev", "key_internal_rag"];
  for (let i = 0; i < 48; i++) {
    const ok = Math.random() > 0.06;
    out.push({
      id: nanoid(8),
      ts: ago(Math.floor(Math.random() * 60 * 24)),
      blendId: blends[Math.floor(Math.random() * blends.length)],
      modelId: models[Math.floor(Math.random() * models.length)],
      keyId: keys[Math.floor(Math.random() * keys.length)],
      promptTokens: 200 + Math.floor(Math.random() * 4000),
      completionTokens: 60 + Math.floor(Math.random() * 1200),
      costUsd: +(Math.random() * 0.18).toFixed(4),
      latencyMs: 220 + Math.floor(Math.random() * 1400),
      status: ok ? "ok" : Math.random() > 0.5 ? "error" : "throttled",
      origin: ["api.cliente-mx.io", "chatbot.acme.com", "rag.docs-internal", "agent-runtime"][
        Math.floor(Math.random() * 4)
      ],
    });
  }
  return out.sort((a, b) => (a.ts < b.ts ? 1 : -1));
}

export function seedWallet(): WalletTx[] {
  return [
    { id: nanoid(8), ts: ago(60 * 24 * 30), kind: "topup", amountUsd: 1000, note: "Top-up inicial · Stripe ****4242" },
    { id: nanoid(8), ts: ago(60 * 24 * 22), kind: "request", amountUsd: -212.4, note: "Consumo blend_chat_starter (semana 1)" },
    { id: nanoid(8), ts: ago(60 * 24 * 15), kind: "request", amountUsd: -188.13, note: "Consumo blend_dev_copilot" },
    { id: nanoid(8), ts: ago(60 * 24 * 10), kind: "topup", amountUsd: 500, note: "Auto top-up · umbral $200" },
    { id: nanoid(8), ts: ago(60 * 24 * 8), kind: "blend-sale", amountUsd: 84.22, note: "Marketplace · Chat Starter Mix · 12 ventas" },
    { id: nanoid(8), ts: ago(60 * 24 * 3), kind: "request", amountUsd: -96.7, note: "Consumo agregado (7d)" },
    { id: nanoid(8), ts: ago(60 * 24 * 1), kind: "blend-sale", amountUsd: 42.0, note: "Marketplace · Long-Context RAG · 5 ventas" },
  ];
}

export function seedAgentMemory(): AgentMemoryItem[] {
  return [
    { id: nanoid(8), kind: "fact", text: "Organización: Estudio Turbillón. Sector: AI dev tools.", ts: ago(60 * 24 * 30) },
    {
      id: nanoid(8),
      kind: "preference",
      text: "Prefiero blends que prioricen latencia <800ms cuando el caso de uso es chatbot.",
      ts: ago(60 * 24 * 20),
    },
    {
      id: nanoid(8),
      kind: "metric",
      text: "Margen objetivo de cada blend en marketplace: ≥30%.",
      ts: ago(60 * 24 * 14),
    },
    {
      id: nanoid(8),
      kind: "todo",
      text: "Lanzar blend Vision Multimodal para clientes de retail antes del cierre del trimestre.",
      ts: ago(60 * 24 * 5),
    },
    {
      id: nanoid(8),
      kind: "fact",
      text: "Cliente clave: ACME Corp. Volumen mensual proyectado: 8M tokens en Dev Copilot Blend.",
      ts: ago(60 * 24 * 2),
    },
  ];
}
