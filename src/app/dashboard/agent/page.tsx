"use client";

import { useState, useRef, useEffect } from "react";
import { Topbar } from "@/components/dashboard/Topbar";
import { Panel } from "@/components/ui/card";
import { Button } from "@/components/ui/buttons";
import { Textarea, TextInput, Label } from "@/components/ui/inputs";
import { Icon } from "@/components/ui/icon";
import { useAppStore } from "@/store/use-app-store";
import type { AgentMemoryItem } from "@/lib/types";

const MEM_KINDS: AgentMemoryItem["kind"][] = ["fact", "preference", "todo", "metric"];

export default function AgentPage() {
  const messages = useAppStore((s) => s.agentMessages);
  const append = useAppStore((s) => s.appendAgentMessage);
  const memory = useAppStore((s) => s.agentMemory);
  const addMemory = useAppStore((s) => s.addAgentMemory);
  const removeMemory = useAppStore((s) => s.removeAgentMemory);

  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [memDraft, setMemDraft] = useState("");
  const [memKind, setMemKind] = useState<AgentMemoryItem["kind"]>("fact");

  const scrollerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: 1e9, behavior: "smooth" });
  }, [messages.length]);

  async function send() {
    const text = input.trim();
    if (!text) return;
    setInput("");
    append({ role: "user", content: text });
    setBusy(true);
    try {
      const payload = {
        messages: [...messages, { role: "user", content: text }].map((m) => ({
          role: m.role,
          content: m.content,
        })),
        memory: memory.map((m) => ({ kind: m.kind, text: m.text })),
      };
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      const reply =
        json?.choices?.[0]?.message?.content ?? json?.error ?? "Sin respuesta del agente.";
      append({ role: "assistant", content: reply });
    } catch (err) {
      append({ role: "assistant", content: `Error: ${(err as Error).message}` });
    } finally {
      setBusy(false);
    }
  }

  function onSaveMemory() {
    if (!memDraft.trim()) return;
    addMemory({ kind: memKind, text: memDraft.trim() });
    setMemDraft("");
  }

  return (
    <>
      <Topbar
        title="Agente Prism"
        subtitle="Memoria persistente · operador residente de tu negocio."
      />
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6 p-6 lg:p-8 overflow-hidden">
        <Panel className="!p-0 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between border-b border-line/30 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-tertiary/15 text-tertiary">
                <Icon name="bot" className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-semibold">Prism</div>
                <div className="label-caps text-ink-muted">
                  claude-sonnet-4.6 · {memory.length} fragmentos de memoria
                </div>
              </div>
            </div>
            <span className="pill pill-success">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-soft" />
              ready
            </span>
          </div>

          <div ref={scrollerRef} className="flex-1 overflow-y-auto scrollbar-thin px-6 py-5 space-y-4">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : ""}`}>
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-3 text-sm whitespace-pre-wrap leading-relaxed ${
                    m.role === "user"
                      ? "bg-primary/10 border border-primary/20 text-ink"
                      : "bg-bg-3/70 border border-line/30 text-ink-dim"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {busy ? (
              <div className="flex">
                <div className="rounded-xl bg-bg-3/70 border border-line/30 px-4 py-3 text-sm text-ink-dim flex items-center gap-2">
                  <Icon name="spinner" className="h-4 w-4 animate-spin" />
                  Prism está pensando…
                </div>
              </div>
            ) : null}
          </div>

          <div className="border-t border-line/30 px-4 py-3">
            <div className="flex items-end gap-2">
              <div className="flex-1 ring-focus hairline rounded-lg bg-bg-2/80 px-3 py-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={2}
                  placeholder="Pregúntale a Prism… (Enter para enviar)"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                  className="w-full resize-none bg-transparent text-sm text-ink focus:outline-none placeholder:text-ink-muted/70"
                />
              </div>
              <Button onClick={send} disabled={busy || !input.trim()} className="py-2.5">
                <Icon name="arrow" className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-2 text-[11px] text-ink-muted code">
              Sin <code>OPENROUTER_API_KEY</code> en el servidor responde un mock determinista.
            </p>
          </div>
        </Panel>

        <div className="flex flex-col gap-5 overflow-hidden">
          <Panel className="!p-6 shrink-0">
            <div className="label-caps text-tertiary mb-3">Memoria persistente</div>
            <p className="text-xs text-ink-dim mb-4 leading-relaxed">
              Lo que pongas aquí se inyecta como contexto en cada conversación. Hechos, preferencias, métricas y pendientes.
            </p>

            <div className="space-y-3">
              <div>
                <Label>Tipo</Label>
                <div className="flex flex-wrap gap-2">
                  {MEM_KINDS.map((k) => (
                    <button
                      key={k}
                      onClick={() => setMemKind(k)}
                      className={`rounded-full px-3 py-1 text-xs ${
                        memKind === k
                          ? "bg-primary text-primary-ink font-bold"
                          : "hairline text-ink-dim hover:text-ink"
                      }`}
                    >
                      {k}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label>Texto</Label>
                <TextInput
                  value={memDraft}
                  onChange={(e) => setMemDraft(e.target.value)}
                  placeholder="Cliente prioritario: ACME · margen objetivo 32%"
                />
              </div>
              <Button onClick={onSaveMemory} variant="ghost" className="w-full justify-center">
                <Icon name="sparkles" className="h-4 w-4" />
                Agregar a memoria
              </Button>
            </div>
          </Panel>

          <Panel className="!p-0 flex-1 overflow-hidden flex flex-col">
            <div className="border-b border-line/30 px-6 py-3 flex items-center justify-between">
              <h4 className="text-sm font-semibold">Fragmentos guardados</h4>
              <span className="text-[11px] text-ink-muted">{memory.length}</span>
            </div>
            <div className="overflow-y-auto scrollbar-thin divide-y divide-line/15">
              {memory.map((m) => (
                <div key={m.id} className="px-6 py-3 flex items-start gap-3">
                  <span className={`pill ${pillFor(m.kind)} shrink-0`}>{m.kind}</span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm leading-relaxed text-ink">{m.text}</div>
                    <div className="text-[11px] text-ink-muted code mt-1">
                      {new Date(m.ts).toLocaleDateString("es-MX")}
                    </div>
                  </div>
                  <button
                    onClick={() => removeMemory(m.id)}
                    className="text-ink-muted hover:text-danger"
                    title="Eliminar"
                  >
                    <Icon name="alert" className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
              {memory.length === 0 ? (
                <div className="px-6 py-12 text-center text-sm text-ink-muted">
                  Aún no hay memoria. Agrega hechos sobre tu negocio.
                </div>
              ) : null}
            </div>
          </Panel>
        </div>
      </main>
    </>
  );
}

function pillFor(kind: AgentMemoryItem["kind"]) {
  switch (kind) {
    case "fact":
      return "pill-info";
    case "preference":
      return "pill-warn";
    case "todo":
      return "pill-warn !bg-tertiary/15 !text-tertiary !border-tertiary/30";
    case "metric":
      return "pill-success";
  }
}
