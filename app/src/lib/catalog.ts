import type { ProviderModel } from "./types";

/**
 * Static catalog used by the marketplace and blend builder. In production this
 * is replaced by /api/openrouter/models which proxies the OpenRouter catalog
 * and merges it with curated metadata.
 */
export const PROVIDER_MODELS: ProviderModel[] = [
  {
    id: "anthropic/claude-opus-4.5",
    name: "Claude Opus 4.5",
    provider: "openrouter",
    context: 200_000,
    inputPrice: 15,
    outputPrice: 75,
    strengths: ["reasoning", "code", "long-context"],
  },
  {
    id: "anthropic/claude-sonnet-4.6",
    name: "Claude Sonnet 4.6",
    provider: "openrouter",
    context: 200_000,
    inputPrice: 3,
    outputPrice: 15,
    strengths: ["reasoning", "code", "speed"],
  },
  {
    id: "anthropic/claude-haiku-4.5",
    name: "Claude Haiku 4.5",
    provider: "openrouter",
    context: 200_000,
    inputPrice: 0.8,
    outputPrice: 4,
    strengths: ["speed", "cheap"],
  },
  {
    id: "openai/gpt-5",
    name: "GPT-5",
    provider: "openrouter",
    context: 256_000,
    inputPrice: 12,
    outputPrice: 60,
    strengths: ["reasoning", "vision", "code"],
  },
  {
    id: "openai/gpt-5-mini",
    name: "GPT-5 mini",
    provider: "openrouter",
    context: 128_000,
    inputPrice: 1.6,
    outputPrice: 8,
    strengths: ["speed", "cheap"],
  },
  {
    id: "google/gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    provider: "openrouter",
    context: 1_000_000,
    inputPrice: 2.5,
    outputPrice: 10,
    strengths: ["long-context", "vision", "reasoning"],
  },
  {
    id: "google/gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    provider: "openrouter",
    context: 1_000_000,
    inputPrice: 0.3,
    outputPrice: 1.2,
    strengths: ["speed", "cheap", "long-context"],
  },
  {
    id: "meta-llama/llama-3.3-70b",
    name: "Llama 3.3 70B",
    provider: "openrouter",
    context: 128_000,
    inputPrice: 0.5,
    outputPrice: 0.8,
    strengths: ["cheap", "code"],
  },
  {
    id: "mistralai/mixtral-8x22b",
    name: "Mixtral 8×22B",
    provider: "openrouter",
    context: 65_000,
    inputPrice: 0.9,
    outputPrice: 1.2,
    strengths: ["speed", "code"],
  },
  {
    id: "deepseek/deepseek-r1",
    name: "DeepSeek R1",
    provider: "openrouter",
    context: 128_000,
    inputPrice: 0.55,
    outputPrice: 2.2,
    strengths: ["reasoning", "code"],
  },
];

export function modelById(id: string) {
  return PROVIDER_MODELS.find((m) => m.id === id);
}

export const USE_CASES: { id: string; label: string; description: string; icon: string }[] = [
  { id: "chatbot", label: "Chatbot", description: "Atención conversacional 24/7 con tono consistente", icon: "chat" },
  { id: "code", label: "Code copilot", description: "Asistente de programación con razonamiento profundo", icon: "code" },
  { id: "research", label: "Research", description: "Análisis profundo y síntesis multi-fuente", icon: "search" },
  { id: "rag", label: "RAG / Docs", description: "Q&A sobre documentos con contexto largo", icon: "library" },
  { id: "summarize", label: "Summarize", description: "Resumen rápido y económico de contenido", icon: "compress" },
  { id: "vision", label: "Vision", description: "Análisis de imágenes y multimodal", icon: "eye" },
  { id: "agent", label: "Agent", description: "Agentes autónomos con tool calling", icon: "bot" },
];
