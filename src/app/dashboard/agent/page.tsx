"use client";

import { useState, useRef, useEffect } from "react";
import { MS } from "@/components/ui/MS";
import { BottomNav } from "@/components/dashboard/Topbar";
import { useAppStore } from "@/store/use-app-store";

const MASCOT_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBuj9KGlACyAZnXE62AXtjED1UGmJFov2uVF-wHnRs1VkZW3d_I9Ygb3nNH39lPqljEZz-FfjP7zk1TxtaIaV5uKOSTqUvNg3hS0ZwxM1Hwv3LhNnNXrbUse3y3ilR82tSXu9SsdBbB62PDZkIUWFzl2Qk-pzNJRr2VPSPJ46FCBN83k_fJNTWT1QE_VyrWoPKg1YgZ1kBTkv3z_NdQezOpJfKqF-gKKuVltUQArVtR4XEk_VVFlCHQT-CCUfjyb6_Xy0bJWgurgpNz";

const ANALYSIS_FEED = [
  { ts: "09:42:12.445", tag: "THREAD-7", text: "Scanning node cluster... ", suffix: "OK", suffixClass: "text-primary-fixed-dim", op: 0.8 },
  { ts: "09:42:14.102", tag: "BRAIN-CORE", text: "Analyzing micro-movements in cache layer. Latency spikes detected in region US-EAST-1.", op: 1 },
  { ts: "09:42:15.890", tag: "API_ACTION", text: "Redirecting 14% of traffic to warm nodes. Optimizing energy pulses.", highlight: true },
  { ts: "09:42:16.002", tag: "METRIC", text: "CPU Frequency: 4.8GHz | Temp: 42°C", op: 0.6 },
  { ts: "09:42:18.231", tag: "SECURITY", text: "Rotating transient keys. ", suffix: "DONE", suffixClass: "text-secondary-fixed-dim", op: 0.8 },
];

export default function AgentPage() {
  const [input, setInput] = useState("");
  const append = useAppStore((s) => s.appendAgentMessage);
  const messages = useAppStore((s) => s.agentMessages);
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  function send() {
    if (!input.trim()) return;
    append({ role: "user", content: input });
    const userText = input;
    setInput("");
    setTimeout(() => {
      append({
        role: "assistant",
        content: `Processing "${userText}". Detected 4.2% inefficiency in current routing. Recalibrating data shards for -12% energy expenditure without performance impact.`,
      });
    }, 600);
  }

  return (
    <>
      <main className="px-margin-mobile md:px-margin-desktop py-lg max-w-container-max mx-auto">
        <section className="mb-lg">
          <p className="font-label-caps text-label-caps text-primary-fixed-dim mb-xs uppercase">
            Autonomy / Mascot
          </p>
          <h2 className="font-headline-lg text-headline-lg text-primary">Módulo API Mascota</h2>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Mascot Hologram */}
          <div className="lg:col-span-8 relative flex flex-col items-center justify-center glass-panel rounded-xl overflow-hidden group min-h-[420px]">
            <div className="scan-line" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#00391d_0%,#131314_70%)] opacity-30 pointer-events-none" />
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
              <div className="absolute inset-0 bg-primary-fixed-dim/5 rounded-full blur-[100px] scale-75 animate-pulse" />
              <img
                alt="API Mascot"
                className="w-3/5 h-3/5 object-contain hologram-glow z-10 transition-transform duration-500 group-hover:scale-105"
                src={MASCOT_URL}
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[110%] h-[110%] border border-primary-fixed-dim/10 rounded-full animate-[spin_20s_linear_infinite]" />
                <div
                  className="w-[105%] h-[105%] border-dashed border-2 border-secondary-fixed-dim/10 rounded-full"
                  style={{ animation: "spin 30s linear infinite reverse" }}
                />
              </div>
            </div>
            <div className="relative z-10 text-center mt-md mb-md">
              <p className="font-label-caps text-primary-fixed-dim text-xs mb-xs tracking-[0.2em]">
                MASCOT IDENTITY: API
              </p>
              <div className="flex items-center gap-md justify-center">
                <span className="font-stats-lg text-primary-fixed-dim">TECHNICAL GUIDE MODE</span>
                <MS name="verified" fill className="text-primary-fixed-dim" size={16} />
              </div>
            </div>
          </div>

          {/* Analysis Feed */}
          <div className="lg:col-span-4 glass-panel rounded-xl p-md flex flex-col gap-md overflow-hidden">
            <div className="flex justify-between items-center border-b border-outline-variant/30 pb-sm">
              <h3 className="font-label-caps text-label-caps text-secondary-fixed-dim">SYSTEM ANALYSIS</h3>
              <MS name="monitoring" className="text-secondary-fixed-dim" size={18} />
            </div>
            <div className="flex-1 overflow-y-auto space-y-md font-jetbrains-mono max-h-[320px] custom-scrollbar">
              {ANALYSIS_FEED.map((line, i) =>
                line.highlight ? (
                  <div
                    key={i}
                    className="space-y-xs border-l-2 border-primary-fixed-dim pl-sm bg-primary-container/5 py-xs"
                  >
                    <p className="text-[10px] text-primary-fixed-dim">
                      {line.ts} [{line.tag}]
                    </p>
                    <p className="text-xs text-primary-fixed">{line.text}</p>
                  </div>
                ) : (
                  <div key={i} className="space-y-xs" style={{ opacity: line.op ?? 1 }}>
                    <p className="text-[10px] text-outline">
                      {line.ts} [{line.tag}]
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      {line.text}
                      {line.suffix ? <span className={line.suffixClass}>{line.suffix}</span> : null}
                    </p>
                  </div>
                ),
              )}
            </div>
            <div className="pt-sm border-t border-outline-variant/30">
              <div className="flex justify-between text-[10px] font-label-caps mb-xs">
                <span className="text-on-surface-variant">PROCESSING PULSE</span>
                <span className="text-primary-fixed-dim">98.4%</span>
              </div>
              <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden">
                <div className="w-[98%] h-full bg-primary-fixed-dim" />
              </div>
            </div>
          </div>

          {/* Dialogue */}
          <div className="lg:col-span-8 glass-panel rounded-xl p-md">
            <div className="flex gap-md mb-md">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-surface-container-high border border-primary-fixed-dim/30 flex items-center justify-center">
                  <MS name="smart_toy" className="text-primary-fixed-dim" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-sm mb-xs">
                  <span className="font-label-caps text-xs text-primary-fixed-dim">API DECISION LOG</span>
                  <span className="w-1 h-1 rounded-full bg-outline-variant" />
                  <span className="font-label-caps text-[10px] text-on-surface-variant">PERSISTENT MEMORY</span>
                </div>
                <div className="space-y-sm max-h-[280px] overflow-y-auto custom-scrollbar pr-sm" ref={feedRef}>
                  {messages.map((m) => (
                    <p
                      key={m.id}
                      className={`${m.role === "user" ? "text-secondary-fixed-dim font-jetbrains-mono text-body-sm" : "font-body-md text-on-surface italic"} leading-relaxed`}
                    >
                      {m.role === "user" ? "> " : ""}
                      {m.content}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-sm">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask Prism to analyze, optimize, or deploy..."
                className="flex-1 bg-surface-container-lowest border border-outline-variant/40 rounded-lg px-md py-sm font-jetbrains-mono text-body-sm focus:ring-1 focus:ring-primary-fixed-dim focus:border-primary-fixed-dim"
              />
              <button
                onClick={send}
                className="px-md py-sm bg-primary-fixed-dim text-on-primary font-label-caps text-label-caps rounded uppercase hover:brightness-110 transition-all"
              >
                SEND
              </button>
            </div>
          </div>

          {/* Cost Optimization */}
          <div className="lg:col-span-4 glass-panel rounded-xl p-md">
            <h3 className="font-label-caps text-secondary-fixed-dim text-xs mb-md border-b border-outline-variant/20 pb-xs">
              COST OPTIMIZATION
            </h3>
            <div className="space-y-md">
              <div className="flex items-start gap-md">
                <MS name="energy_savings_leaf" className="text-primary-fixed-dim" size={20} />
                <div>
                  <p className="font-label-caps text-[10px] text-on-surface-variant">IDLE NODE REDUCTION</p>
                  <p className="text-xs text-primary-fixed-dim">+ $1,240 / MONTH SAVINGS</p>
                </div>
              </div>
              <div className="flex items-start gap-md">
                <MS name="cloud_done" className="text-secondary-fixed-dim" size={20} />
                <div>
                  <p className="font-label-caps text-[10px] text-on-surface-variant">S3 COMPRESSION RATIO</p>
                  <p className="text-xs text-secondary-fixed-dim">+ 18% STORAGE EFFICIENCY</p>
                </div>
              </div>
              <button className="w-full mt-sm py-sm bg-secondary-container/10 border border-secondary-fixed-dim/30 text-secondary-fixed-dim font-label-caps text-[10px] rounded hover:bg-secondary-container/20 transition-all">
                EXECUTE ALL OPTIMIZATIONS
              </button>
            </div>
          </div>
        </div>
      </main>
      <BottomNav active="mascot" />
    </>
  );
}
