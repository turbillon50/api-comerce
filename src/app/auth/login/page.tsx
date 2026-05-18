"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MS } from "@/components/ui/MS";
import { useAppStore } from "@/store/use-app-store";

export default function LoginPage() {
  const router = useRouter();
  const signIn = useAppStore((s) => s.signIn);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    signIn(email || "demo@apicommerce.io");
    router.push("/dashboard");
  }

  return (
    <div className="glass-card p-lg md:p-xl rounded-2xl space-y-lg">
      <div className="space-y-sm text-center">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-primary-container/10 flex items-center justify-center border border-primary-container/20">
          <MS name="login" className="text-primary-container" />
        </div>
        <h1 className="font-headline-lg text-headline-lg text-primary">Welcome back</h1>
        <p className="text-on-surface-variant font-body-md">Sign in to access your console.</p>
      </div>

      <form onSubmit={submit} className="space-y-md">
        <div>
          <label className="font-label-caps text-label-caps text-on-surface-variant block mb-xs uppercase">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="w-full bg-surface-container-high border border-outline-variant/40 rounded-lg px-md py-3 font-jetbrains-mono text-body-md focus:ring-1 focus:ring-primary-fixed-dim focus:border-primary-fixed-dim"
            placeholder="you@company.io"
          />
        </div>
        <div>
          <label className="font-label-caps text-label-caps text-on-surface-variant block mb-xs uppercase">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="w-full bg-surface-container-high border border-outline-variant/40 rounded-lg px-md py-3 font-jetbrains-mono text-body-md focus:ring-1 focus:ring-primary-fixed-dim focus:border-primary-fixed-dim"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full py-md bg-primary-container text-on-primary font-headline-md text-body-md rounded-lg emerald-glow active:scale-95 transition-all"
        >
          Enter Console
        </button>
      </form>

      <div className="text-center text-on-surface-variant text-body-sm">
        New here?{" "}
        <Link href="/auth/register" className="text-primary-fixed-dim hover:underline">
          Create an account
        </Link>
      </div>

      <div className="border-t border-outline-variant/20 pt-md">
        <p className="text-center text-[10px] font-label-caps text-on-surface-variant uppercase">
          Demo: any email signs in instantly
        </p>
      </div>
    </div>
  );
}
