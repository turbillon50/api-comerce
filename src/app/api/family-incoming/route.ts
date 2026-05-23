import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// In-memory store (volatile). Prism doesn't have a Neon DB yet; when one
// is wired, swap this for a real table. Until then, the chat "works" —
// messages arrive, get ACKed, are queryable — but they reset on cold start.
interface StoredMessage {
  messageId: string;
  channel: string;
  sender: string;
  senderKind: string;
  content: string;
  payload: unknown;
  replyTo: string | null;
  mentions: unknown[];
  familyCreatedAt: string;
  receivedAt: string;
}

const store: Map<string, StoredMessage> = (globalThis as { __familyStore?: Map<string, StoredMessage> }).__familyStore
  ?? new Map<string, StoredMessage>();
(globalThis as { __familyStore?: Map<string, StoredMessage> }).__familyStore = store;

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

type AuthResult = { ok: true } | { ok: false; reason: string; code: number };

function validateBearer(req: NextRequest): AuthResult {
  const expected = process.env.FAMILY_AGENT_TOKEN ?? "";
  if (!expected) return { ok: false, reason: "FAMILY_AGENT_TOKEN not set", code: 503 };
  const header = req.headers.get("authorization") ?? "";
  const m = /^Bearer\s+(.+)$/i.exec(header);
  const presented = m?.[1] ?? "";
  if (!presented || !safeEqual(presented, expected)) {
    return { ok: false, reason: "invalid Authorization Bearer token", code: 401 };
  }
  return { ok: true };
}

async function ackToFamily(
  ackUrl: string,
  messageId: string,
  externalRef: string | null,
  errorMsg?: string,
): Promise<void> {
  if (!ackUrl) return;
  const token = process.env.FAMILY_AGENT_TOKEN ?? "";
  const handle = process.env.FAMILY_AGENT_HANDLE ?? "prism";
  try {
    await fetch(ackUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        messageId,
        agent: handle,
        ...(externalRef ? { externalRef } : {}),
        ...(errorMsg ? { error: errorMsg } : {}),
      }),
    });
  } catch {
    // best-effort
  }
}

export async function POST(req: NextRequest) {
  const auth = validateBearer(req);
  if (!auth.ok) return NextResponse.json({ ok: false, error: auth.reason }, { status: auth.code });

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  const messageId = body?.messageId as string | undefined;
  const channel = body?.channel as string | undefined;
  const sender = body?.sender as string | undefined;
  const content = body?.content as string | undefined;
  if (!messageId || !channel || !sender || !content) {
    return NextResponse.json(
      { ok: false, error: "messageId, channel, sender and content are required" },
      { status: 422 },
    );
  }

  const ackUrl = (body?.ackUrl as string | undefined) ?? "";

  // Idempotent insert.
  const existing = store.get(messageId);
  const externalRef = `family_messages:${messageId}`;
  if (!existing) {
    store.set(messageId, {
      messageId,
      channel,
      sender,
      senderKind: (body?.senderKind as string | undefined) ?? "unknown",
      content,
      payload: body?.payload ?? null,
      replyTo: (body?.replyTo as string | null | undefined) ?? null,
      mentions: Array.isArray(body?.mentions) ? body?.mentions : [],
      familyCreatedAt: (body?.createdAt as string | undefined) ?? new Date().toISOString(),
      receivedAt: new Date().toISOString(),
    });
  }

  if (ackUrl) void ackToFamily(ackUrl, messageId, externalRef);
  return NextResponse.json({ ok: true, externalRef, deduplicated: !!existing });
}

export async function GET() {
  return NextResponse.json({
    configured: Boolean(process.env.FAMILY_AGENT_TOKEN),
    handle: process.env.FAMILY_AGENT_HANDLE ?? "prism",
    baseUrl: process.env.FAMILY_BASE_URL ?? "https://family.vercel.app",
    storage: "in-memory (volatile)",
    storedCount: store.size,
  });
}
