import { NextRequest, NextResponse } from "next/server";
import { chat, type ChatMessage } from "@/lib/openrouter";

export const runtime = "edge";

/**
 * The "Prism" business agent. Memory is held client-side in localStorage and
 * forwarded with each request as a system block. We default to Sonnet 4.6 via
 * OpenRouter; if no key is configured, the underlying client falls back to a
 * deterministic mock so the dashboard still demos.
 */
export async function POST(req: NextRequest) {
  const body = (await req.json()) as {
    messages: ChatMessage[];
    memory: { kind: string; text: string }[];
    model?: string;
  };
  if (!Array.isArray(body.messages)) {
    return NextResponse.json({ error: "messages[] required" }, { status: 400 });
  }
  const memoryBlock = body.memory?.length
    ? `Persistent business memory:\n` +
      body.memory.map((m) => `- (${m.kind}) ${m.text}`).join("\n")
    : "No persistent memory yet.";

  const system: ChatMessage = {
    role: "system",
    content:
      `You are Prism, the resident business agent for an APICommerce reseller. ` +
      `You help run a SaaS that resells AI tokens through curated "blends" (multi-provider routing recipes). ` +
      `Speak Spanish by default unless the user writes in English. Be concise, opinionated, and concrete. ` +
      `Always reference the relevant blends, keys, margins or wallet figures from memory. Suggest next actions.\n\n` +
      memoryBlock,
  };

  const messages: ChatMessage[] = [system, ...body.messages];
  try {
    const out = await chat({
      model: body.model ?? "anthropic/claude-sonnet-4.6",
      messages,
      temperature: 0.5,
    });
    return NextResponse.json(out);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 502 });
  }
}
