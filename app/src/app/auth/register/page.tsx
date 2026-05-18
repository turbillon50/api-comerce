"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/buttons";
import { TextInput, Label } from "@/components/ui/inputs";
import { Icon } from "@/components/ui/icon";
import { useAppStore } from "@/store/use-app-store";

export default function RegisterPage() {
  const router = useRouter();
  const signUp = useAppStore((s) => s.signUp);
  const [form, setForm] = useState({ name: "", email: "", org: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    signUp(form);
    router.push("/dashboard");
  }

  return (
    <div className="grid w-full max-w-5xl grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr] items-center">
      <div className="hidden lg:block">
        <div className="pill pill-success mb-5 w-fit">
          <Icon name="sparkles" className="h-3.5 w-3.5" />
          Plan Starter · gratis
        </div>
        <h1 className="text-4xl font-semibold leading-tight tracking-tight mb-5">
          Crea tu cuenta y arma tu primer <span className="text-gradient">blend</span> en 90 segundos.
        </h1>
        <p className="text-ink-dim mb-8 max-w-md">
          Sin tarjeta de crédito. Te damos 1M de tokens incluidos para que pruebes el routing multi-proveedor con tus propios prompts.
        </p>
        <ul className="space-y-3 text-sm">
          {[
            "5 blends activos al instante",
            "Wallet con top-up Stripe",
            "API keys con presupuesto mensual",
            "Agente Prism con memoria 30 días",
          ].map((f) => (
            <li key={f} className="flex items-center gap-2 text-ink-dim">
              <Icon name="check" className="h-4 w-4 text-primary" /> {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="glass rounded-2xl p-8 shadow-glow-primary">
        <h2 className="mb-1 text-xl font-semibold">Crea tu cuenta</h2>
        <p className="mb-7 text-sm text-ink-dim">Usa tu email corporativo para acceso a marketplace.</p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label>Nombre completo</Label>
            <TextInput
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Sofía Reyes"
              required
            />
          </div>
          <div>
            <Label>Email de trabajo</Label>
            <TextInput
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="sofia@empresa.io"
              required
            />
          </div>
          <div>
            <Label>Organización</Label>
            <TextInput
              value={form.org}
              onChange={(e) => update("org", e.target.value)}
              placeholder="Estudio Turbillón"
              required
            />
          </div>
          <div>
            <Label hint="mínimo 8 caracteres">Contraseña</Label>
            <TextInput
              type="password"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              placeholder="••••••••"
              minLength={8}
              required
            />
          </div>
          <Button type="submit" disabled={submitting} className="w-full justify-center py-3.5">
            {submitting ? <Icon name="spinner" className="h-4 w-4 animate-spin" /> : "Crear cuenta"}
            {!submitting ? <Icon name="arrow" className="h-4 w-4" /> : null}
          </Button>
          <p className="text-center text-xs text-ink-muted">
            Al continuar aceptas nuestros Términos y la política de uso responsable de modelos AI.
          </p>
        </form>

        <div className="mt-6 border-t border-line/30 pt-5 text-center text-sm text-ink-dim">
          ¿Ya tienes cuenta?{" "}
          <Link href="/auth/login" className="text-primary hover:underline">
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
