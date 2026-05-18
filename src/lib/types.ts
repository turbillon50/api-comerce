export type ProviderId = "openrouter" | "anthropic-direct" | "openai-direct" | "mistral-direct";

export type ProviderModel = {
  id: string;
  name: string;
  provider: ProviderId;
  context: number;
  inputPrice: number;
  outputPrice: number;
  strengths: ("reasoning" | "speed" | "code" | "vision" | "long-context" | "cheap")[];
};

export type BlendComponent = {
  modelId: string;
  weight: number;
  role: "primary" | "fallback" | "validator";
};

export type Blend = {
  id: string;
  name: string;
  slug: string;
  description: string;
  useCase: "chatbot" | "code" | "research" | "rag" | "summarize" | "vision" | "agent";
  components: BlendComponent[];
  margin: number;
  pricePerMtok: number;
  visibility: "private" | "unlisted" | "marketplace";
  createdAt: string;
  requests: number;
  successRate: number;
};

export type ApiKey = {
  id: string;
  label: string;
  prefix: string;
  full: string;
  blendId: string | null;
  createdAt: string;
  lastUsedAt: string | null;
  status: "active" | "revoked";
  monthlyBudget: number;
  monthlySpend: number;
};

export type RequestLog = {
  id: string;
  ts: string;
  blendId: string;
  modelId: string;
  keyId: string;
  promptTokens: number;
  completionTokens: number;
  costUsd: number;
  latencyMs: number;
  status: "ok" | "error" | "throttled";
  origin: string;
};

export type WalletTx = {
  id: string;
  ts: string;
  kind: "topup" | "request" | "payout" | "refund" | "blend-sale";
  amountUsd: number;
  note: string;
};

export type AgentMessage = {
  id: string;
  ts: string;
  role: "user" | "assistant" | "system";
  content: string;
};

export type AgentMemoryItem = {
  id: string;
  kind: "fact" | "preference" | "todo" | "metric";
  text: string;
  ts: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  org: string;
  plan: "starter" | "growth" | "scale" | "enterprise";
  createdAt: string;
};
