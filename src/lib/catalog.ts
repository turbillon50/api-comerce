/**
 * Canonical APICommerce blends — four resale tiers covering the full
 * spectrum of AI workloads: cheap bot traffic, general-purpose text,
 * premium reasoning/code, and image generation.
 *
 * Each tier is a *blend* (a routing recipe across one or more upstream
 * models) priced uniformly so a customer always knows what a call will
 * cost regardless of which underlying provider answered.
 */

export type BlendSlug = "bot" | "standard" | "pro" | "image";
export type BlendUnit = "1M tokens" | "image";

export type BlendCardCopy = {
  slug: BlendSlug;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  accent: "primary-fixed-dim" | "secondary-fixed-dim" | "tertiary-fixed-dim" | "primary-container";
  price: number;
  unit: BlendUnit;
  latencyMs: number;
  status: "STABLE" | "POPULAR" | "PREMIUM" | "ACTIVE";
  tier: "LOW" | "MID" | "HIGH" | "IMAGE";
  tags: string[];
  /** Curated upstream models that participate in this blend. */
  models: string[];
  /** Recommended workloads. */
  useCases: string[];
};

export const BLENDS: BlendCardCopy[] = [
  {
    slug: "bot",
    name: "Bot Blend",
    tagline: "High-volume chatbots and FAQs",
    description:
      "Cheap, fast routing for chatbot and helpdesk traffic. Optimised for sub-300ms first-token latency.",
    icon: "support_agent",
    accent: "secondary-fixed-dim",
    price: 0.08,
    unit: "1M tokens",
    latencyMs: 220,
    status: "POPULAR",
    tier: "LOW",
    tags: ["Chatbots", "Helpdesk", "FAQ", "Webhooks"],
    models: ["Llama 3.1 8B", "GPT-4o mini", "Claude Haiku 4.5"],
    useCases: ["Customer support bots", "Slack / Telegram replies", "Ticket triage"],
  },
  {
    slug: "standard",
    name: "Standard Blend",
    tagline: "Everyday text and structured output",
    description:
      "Balanced configuration for everyday tasks. Solid reasoning, multilingual, JSON-mode out of the box.",
    icon: "hub",
    accent: "primary-fixed-dim",
    price: 0.2,
    unit: "1M tokens",
    latencyMs: 450,
    status: "STABLE",
    tier: "MID",
    tags: ["Summarisation", "Translation", "Q&A", "Forms"],
    models: ["GPT-4o", "Claude Sonnet 4.6", "Gemini 2.5 Pro"],
    useCases: ["Content drafting", "Document Q&A", "Light agents"],
  },
  {
    slug: "pro",
    name: "Pro Blend",
    tagline: "Complex reasoning, code, agents",
    description:
      "Premium tier for code generation, deep reasoning, and tool-using agents. Designed for accuracy over cost.",
    icon: "code",
    accent: "tertiary-fixed-dim",
    price: 1.2,
    unit: "1M tokens",
    latencyMs: 1100,
    status: "PREMIUM",
    tier: "HIGH",
    tags: ["Code", "Tool use", "Long context", "Planning"],
    models: ["Claude Opus 4.7", "GPT-4 Turbo", "o1-preview"],
    useCases: ["Code review", "Autonomous agents", "Research synthesis"],
  },
  {
    slug: "image",
    name: "Image Blend",
    tagline: "Generate, edit, upscale",
    description:
      "Image generation and editing across the best providers. Pricing is per finished image, no surprises.",
    icon: "image",
    accent: "primary-container",
    price: 0.04,
    unit: "image",
    latencyMs: 4500,
    status: "ACTIVE",
    tier: "IMAGE",
    tags: ["Generation", "Edit", "Upscale", "Variations"],
    models: ["DALL-E 3", "SDXL Turbo", "Imagen 3"],
    useCases: ["Product photos", "Marketing creative", "Avatars"],
  },
];

export function blendBySlug(slug: string) {
  return BLENDS.find((b) => b.slug === slug);
}

/** Format a price + unit pair (e.g. "$0.20 / 1M tokens"). */
export function formatBlendPrice(b: BlendCardCopy) {
  return `$${b.price.toFixed(2)} / ${b.unit}`;
}

/* Legacy exports kept so existing /api routes keep typechecking. */
export const PROVIDER_MODELS = BLENDS.map((b) => ({
  id: `apicommerce/${b.slug}`,
  name: b.name,
  provider: "openrouter" as const,
  context: 200_000,
  inputPrice: b.unit === "1M tokens" ? b.price / 2 : 0,
  outputPrice: b.unit === "1M tokens" ? b.price * 1.5 : b.price,
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
