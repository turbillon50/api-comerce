"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MS } from "@/components/ui/MS";
import { useAppStore } from "@/store/use-app-store";

export default function RegisterPage() {
  const router = useRouter();
  const signUp = useAppStore((s) => s.signUp);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [password, setPassword] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    signUp({
      name: name || "Operator",
      email: email || "founder@apicommerce.io",
      org: org || "APICommerce Labs",
      password: password || "demo",
    });
    router.push("/dashboard");
  }

  return (
    <div className="glass-card p-lg md:p-xl rounded-2xl space-y-lg">
      <div className="space-y-sm text-center">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-secondary/10 flex items-center justify-center border border-secondary/20">
          <MS name="rocket_launch" className="text-secondary" />
        </div>
        <h1 className="font-headline-lg text-headline-lg text-primary">Create your account</h1>
        <p className="text-on-surface-variant font-body-md">
          Free tier includes 50,000 requests / month.
        </p>
      </div>

      <form onSubmit={submit} className="space-y-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
          <div>
            <label className="font-label-caps text-label-caps text-on-surface-variant block mb-xs uppercase">
              First Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-surface-container-high border border-outline-variant/40 rounded-lg px-md py-3 font-jetbrains-mono text-body-sm focus:ring-1 focus:ring-primary-fixed-dim focus:border-primary-fixed-dim"
              placeholder="Operator"
            />
          </div>
          <div>
            <label className="font-label-caps text-label-caps text-on-surface-variant block mb-xs uppercase">
              Org
            </label>
            <input
              value={org}
              onChange={(e) => setOrg(e.target.value)}
              className="w-full bg-surface-container-high border border-outline-variant/40 rounded-lg px-md py-3 font-jetbrains-mono text-body-sm focus:ring-1 focus:ring-primary-fixed-dim focus:border-primary-fixed-dim"
              placeholder="APICommerce Labs"
            />
          </div>
        </div>
        <div>
          <label className="font-label-caps text-label-caps text-on-surface-variant block mb-xs uppercase">
            Work Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-surface-container-high border border-outline-variant/40 rounded-lg px-md py-3 font-jetbrains-mono text-body-sm focus:ring-1 focus:ring-primary-fixed-dim focus:border-primary-fixed-dim"
            placeholder="founder@company.io"
          />
        </div>
        <div>
          <label className="font-label-caps text-label-caps text-on-surface-variant block mb-xs uppercase">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-surface-container-high border border-outline-variant/40 rounded-lg px-md py-3 font-jetbrains-mono text-body-sm focus:ring-1 focus:ring-primary-fixed-dim focus:border-primary-fixed-dim"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full py-md bg-primary-container text-on-primary font-headline-md text-body-md rounded-lg emerald-glow active:scale-95 transition-all"
        >
          Create Free Account
        </button>
        <p className="text-center text-label-sm font-label-caps text-on-surface-variant uppercase">
          By signing up, you agree to our Terms of Service.
        </p>
      </form>

      <div className="text-center text-on-surface-variant text-body-sm">
        Already a member?{" "}
        <Link href="/auth/login" className="text-primary-fixed-dim hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
