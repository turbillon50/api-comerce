import Link from "next/link";
import { Icon } from "@/components/ui/icon";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow opacity-90" />
      <div className="absolute inset-0 tech-grid opacity-40" />
      <header className="relative z-10 mx-auto flex max-w-[1440px] items-center justify-between px-6 py-6 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-ink shadow-glow-primary">
            <span className="font-bold">A</span>
          </div>
          <span className="font-bold">APICommerce</span>
        </Link>
        <Link
          href="/"
          className="text-sm text-ink-dim hover:text-ink flex items-center gap-1"
        >
          <Icon name="chevron" className="h-4 w-4 rotate-180" />
          Volver al sitio
        </Link>
      </header>
      <main className="relative z-10 mx-auto flex max-w-[1440px] items-center justify-center px-6 pb-16 pt-6 lg:px-10">
        {children}
      </main>
    </div>
  );
}
