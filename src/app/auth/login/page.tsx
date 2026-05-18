"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/buttons";
import { TextInput, Label } from "@/components/ui/inputs";
import { Icon } from "@/components/ui/icon";
import { useAppStore } from "@/store/use-app-store";

export default function LoginPage() {
  const router = useRouter();
  const signIn = useAppStore((s) => s.signIn);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    signIn(email);
    router.push("/dashboard");
  }

  return (
    <div className="w-full max-w-md">
      <div className="glass rounded-2xl p-8 shadow-glow-secondary">
        <div className="pill pill-info mb-5 w-fit">
          <Icon name="lock" className="h-3.5 w-3.5" />
          Acceso al panel
        </div>
        <h1 className="text-2xl font-semibold mb-1">Bienvenido de vuelta</h1>
        <p className="text-sm text-ink-dim mb-7">Continúa donde dejaste tu operación.</p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label>Email</Label>
            <TextInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@empresa.io"
              required
            />
          </div>
          <div>
            <Label hint="¿Olvidaste tu contraseña?">Contraseña</Label>
            <TextInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <Button type="submit" disabled={busy} className="w-full justify-center py-3.5">
            {busy ? <Icon name="spinner" className="h-4 w-4 animate-spin" /> : "Entrar"}
            {!busy ? <Icon name="arrow" className="h-4 w-4" /> : null}
          </Button>
        </form>

        <div className="mt-6 border-t border-line/30 pt-5 text-center text-sm text-ink-dim">
          ¿Aún no tienes cuenta?{" "}
          <Link href="/auth/register" className="text-primary hover:underline">
            Crea una gratis
          </Link>
        </div>
      </div>
    </div>
  );
}
