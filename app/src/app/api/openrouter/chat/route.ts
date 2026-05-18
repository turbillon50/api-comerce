import { NextRequest, NextResponse } from "next/server";
import { chat, type ChatMessage } from "@/lib/openrouter";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as {
    model?: string;
    messages?: ChatMessage[];
    temperature?: number;
  };
  if (!body.model || !Array.isArray(body.messages)) {
    return NextResponse.json({ error: "model and messages required" }, { status: 400 });
  }
  try {
    const out = await chat({
      model: body.model,
      messages: body.messages,
      temperature: body.temperature,
    });
    return NextResponse.json(out);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 502 });
  }
}
