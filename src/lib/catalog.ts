/**
 * Canonical blends — extracted 1:1 from the Stitch designs
 * (sistema_de_blends + marketplace_de_blends_v2 + wallet_governance).
 */

export type BlendSlug = "general" | "support" | "builder" | "agent";

export type BlendCardCopy = {
  slug: BlendSlug;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  accent: "primary-fixed-dim" | "secondary-fixed-dim" | "tertiary-fixed-dim" | "primary-container";
  costPerMTok: number;
  latencyMs: number;
  status: "STABLE" | "SCALING" | "PREMIUM" | "ACTIVE";
  tags: string[];
};

export const BLENDS: BlendCardCopy[] = [
  {
    slug: "general",
    name: "General Blend",
    tagline: "Optimizado para tareas comunes",
    description:
      "Balanced configuration for everyday tasks. Optimized for a perfect ratio of speed and reasoning capability.",
    icon: "hub",
    accent: "primary-fixed-dim",
    costPerMTok: 0.15,
    latencyMs: 450,
    status: "STABLE",
    tags: ["Content Auth", "Summarization", "Chat"],
  },
  {
    slug: "support",
    name: "Support Blend",
    tagline: "Ideal para atención al cliente",
    description:
      "Optimized for high-volume customer queries. Specialized in empathetic response and rapid context retrieval.",
    icon: "insights",
    accent: "secondary-fixed-dim",
    costPerMTok: 0.08,
    latencyMs: 220,
    status: "SCALING",
    tags: ["Help Desk", "Ticket Routing", "Sentiment"],
  },
  {
    slug: "builder",
    name: "Builder Blend",
    tagline: "Máximo rendimiento creativo",
    description:
      "High reasoning for code and complex architecture. Exceptional logic for software engineering tasks.",
    icon: "code",
    accent: "tertiary-fixed-dim",
    costPerMTok: 1.2,
    latencyMs: 1100,
    status: "PREMIUM",
    tags: ["Refactoring", "Debugging", "DevOps"],
  },
  {
    slug: "agent",
    name: "Agent Blend",
    tagline: "Diseñado para flujos autónomos",
    description:
      "Autonomous capability. Designed for self-correction, tool use, and multi-step orchestration flows.",
    icon: "smart_toy",
    accent: "primary-container",
    costPerMTok: 0.45,
    latencyMs: 680,
    status: "ACTIVE",
    tags: ["Tool Use", "Planning", "Web Search"],
  },
];

export function blendBySlug(slug: string) {
  return BLENDS.find((b) => b.slug === slug);
}

/* Legacy export retained so existing imports in /api routes don't break. */
export const PROVIDER_MODELS = BLENDS.map((b) => ({
  id: `apicommerce/${b.slug}`,
  name: b.name,
  provider: "openrouter" as const,
  context: 200_000,
  inputPrice: b.costPerMTok / 2,
  outputPrice: b.costPerMTok * 1.5,
  strengths: b.tags as unknown as ("reasoning" | "speed" | "code" | "vision" | "long-context" | "cheap")[],
}));

export function modelById(id: string) {
  return PROVIDER_MODELS.find((m) => m.id === id);
}

export const USE_CASES = BLENDS.map((b) => ({
  id: b.slug,
  label: b.name,
  description: b.tagline,
  icon: b.icon,
}));
