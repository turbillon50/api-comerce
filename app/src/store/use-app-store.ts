"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { nanoid } from "nanoid";
import type {
  Blend,
  ApiKey,
  RequestLog,
  WalletTx,
  AgentMessage,
  AgentMemoryItem,
  User,
} from "@/lib/types";
import {
  seedBlends,
  seedKeys,
  seedRequests,
  seedWallet,
  seedAgentMemory,
} from "@/lib/seed";

type State = {
  user: User | null;
  bootstrapped: boolean;
  blends: Blend[];
  keys: ApiKey[];
  requests: RequestLog[];
  wallet: WalletTx[];
  agentMessages: AgentMessage[];
  agentMemory: AgentMemoryItem[];
  openrouterKey: string;
};

type Actions = {
  bootstrap: () => void;
  signUp: (input: { name: string; email: string; org: string; password: string }) => User;
  signIn: (email: string) => User | null;
  signOut: () => void;

  upsertBlend: (b: Blend) => void;
  deleteBlend: (id: string) => void;

  createKey: (label: string, blendId: string | null, monthlyBudget: number) => ApiKey;
  revokeKey: (id: string) => void;

  topUp: (amount: number) => void;
  recordRequest: (r: Omit<RequestLog, "id" | "ts">) => void;

  appendAgentMessage: (m: Omit<AgentMessage, "id" | "ts">) => AgentMessage;
  addAgentMemory: (m: Omit<AgentMemoryItem, "id" | "ts">) => void;
  removeAgentMemory: (id: string) => void;

  setOpenrouterKey: (k: string) => void;
};

export const useAppStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      user: null,
      bootstrapped: false,
      blends: [],
      keys: [],
      requests: [],
      wallet: [],
      agentMessages: [],
      agentMemory: [],
      openrouterKey: "",

      bootstrap: () => {
        if (get().bootstrapped) return;
        set({
          blends: seedBlends(),
          keys: seedKeys(),
          requests: seedRequests(),
          wallet: seedWallet(),
          agentMemory: seedAgentMemory(),
          agentMessages: [
            {
              id: nanoid(8),
              ts: new Date().toISOString(),
              role: "assistant",
              content:
                "Hola. Soy Prism, tu agente residente. Tengo memoria persistente sobre tu negocio: clientes, blends activos, márgenes objetivo y deudas técnicas. Pregúntame qué blend lanzar a continuación, cómo subir margen, o pídeme que aplique cambios.",
            },
          ],
          bootstrapped: true,
        });
      },

      signUp: (input) => {
        const u: User = {
          id: "u_" + nanoid(8),
          name: input.name,
          email: input.email,
          org: input.org,
          plan: "starter",
          createdAt: new Date().toISOString(),
        };
        set({ user: u });
        get().bootstrap();
        return u;
      },

      signIn: (email) => {
        const current = get().user;
        if (current && current.email === email) return current;
        const u: User = {
          id: "u_" + nanoid(8),
          name: email.split("@")[0],
          email,
          org: "—",
          plan: "starter",
          createdAt: new Date().toISOString(),
        };
        set({ user: u });
        get().bootstrap();
        return u;
      },

      signOut: () => set({ user: null }),

      upsertBlend: (b) => {
        set((s) => {
          const i = s.blends.findIndex((x) => x.id === b.id);
          if (i === -1) return { blends: [b, ...s.blends] };
          const next = [...s.blends];
          next[i] = b;
          return { blends: next };
        });
      },
      deleteBlend: (id) => set((s) => ({ blends: s.blends.filter((b) => b.id !== id) })),

      createKey: (label, blendId, monthlyBudget) => {
        const id = "key_" + nanoid(6);
        const full = "apc_live_" + nanoid(32);
        const k: ApiKey = {
          id,
          label,
          prefix: full.slice(0, 13),
          full,
          blendId,
          createdAt: new Date().toISOString(),
          lastUsedAt: null,
          status: "active",
          monthlyBudget,
          monthlySpend: 0,
        };
        set((s) => ({ keys: [k, ...s.keys] }));
        return k;
      },
      revokeKey: (id) =>
        set((s) => ({
          keys: s.keys.map((k) => (k.id === id ? { ...k, status: "revoked" } : k)),
        })),

      topUp: (amount) =>
        set((s) => ({
          wallet: [
            {
              id: nanoid(8),
              ts: new Date().toISOString(),
              kind: "topup",
              amountUsd: amount,
              note: "Top-up manual",
            },
            ...s.wallet,
          ],
        })),

      recordRequest: (r) =>
        set((s) => ({
          requests: [{ id: nanoid(8), ts: new Date().toISOString(), ...r }, ...s.requests].slice(0, 500),
        })),

      appendAgentMessage: (m) => {
        const msg: AgentMessage = { id: nanoid(8), ts: new Date().toISOString(), ...m };
        set((s) => ({ agentMessages: [...s.agentMessages, msg] }));
        return msg;
      },
      addAgentMemory: (m) => {
        const item: AgentMemoryItem = { id: nanoid(8), ts: new Date().toISOString(), ...m };
        set((s) => ({ agentMemory: [item, ...s.agentMemory] }));
      },
      removeAgentMemory: (id) =>
        set((s) => ({ agentMemory: s.agentMemory.filter((x) => x.id !== id) })),

      setOpenrouterKey: (k) => set({ openrouterKey: k }),
    }),
    {
      name: "apicommerce-store-v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        user: s.user,
        bootstrapped: s.bootstrapped,
        blends: s.blends,
        keys: s.keys,
        requests: s.requests,
        wallet: s.wallet,
        agentMessages: s.agentMessages,
        agentMemory: s.agentMemory,
        openrouterKey: s.openrouterKey,
      }),
    },
  ),
);

export const walletBalance = (txs: WalletTx[]) =>
  txs.reduce((acc, t) => acc + t.amountUsd, 0);
