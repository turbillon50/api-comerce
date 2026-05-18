import { NextRequest, NextResponse } from "next/server";
import { chat, type ChatMessage } from "@/lib/openrouter";

export const runtime = "edge";

type RunBody = {
  blend: {
    components: { modelId: string; weight: number; role: "primary" | "fallback" | "validator" }[];
  };
  messages: ChatMessage[];
};

/**
 * Picks the primary model by weight, falls back to the next role if the first
 * call errors. Validators don't get called from this endpoint in v1 — they
 * surface in the dashboard as "shadow runs" we'd execute async in production.
 */
export async function POST(req: NextRequest) {
  const body = (await req.json()) as RunBody;
  const primaries = body.blend.components
    .filter((c) => c.role !== "validator")
    .sort((a, b) => b.weight - a.weight);

  let lastErr: unknown = null;
  for (const c of primaries) {
    try {
      const out = await chat({ model: c.modelId, messages: body.messages });
      return NextResponse.json({
        modelUsed: c.modelId,
        role: c.role,
        ...out,
      });
    } catch (err) {
      lastErr = err;
    }
  }
  return NextResponse.json(
    { error: "all providers failed", detail: String(lastErr) },
    { status: 502 },
  );
}
