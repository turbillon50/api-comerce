import Link from "next/link";
import { LinkButton } from "@/components/ui/buttons";

export function LandingNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-line/20 bg-bg/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-ink shadow-glow-primary">
            <span className="font-bold">A</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-base font-bold tracking-tight">APICommerce</span>
            <span className="label-caps text-ink-muted">Obsidian Prism · v1</span>
          </div>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          <Link className="text-sm text-ink-dim hover:text-ink" href="#manifesto">
            Manifiesto
          </Link>
          <Link className="text-sm text-ink-dim hover:text-ink" href="#blends">
            Blends
          </Link>
          <Link className="text-sm text-ink-dim hover:text-ink" href="#pricing">
            Pricing
          </Link>
          <Link className="text-sm text-ink-dim hover:text-ink" href="#agent">
            Agente Prism
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/auth/login"
            className="hidden text-sm text-ink-dim hover:text-ink sm:block"
          >
            Sign in
          </Link>
          <LinkButton href="/auth/register">Crear cuenta</LinkButton>
        </div>
      </div>
    </header>
  );
}
