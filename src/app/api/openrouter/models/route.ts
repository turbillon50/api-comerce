import { NextResponse } from "next/server";
import { fetchModels } from "@/lib/openrouter";

export const runtime = "edge";

export async function GET() {
  try {
    const result = await fetchModels();
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 502 },
    );
  }
}
