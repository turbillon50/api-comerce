import Link from "next/link";
import { MS } from "@/components/ui/MS";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background bg-grid relative flex flex-col">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-container/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <header className="relative z-10 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16 border-b border-outline-variant/20 backdrop-blur-xl bg-surface/60">
        <Link href="/" className="flex items-center gap-2">
          <MS name="api" fill className="text-primary-container" />
          <span className="font-headline-md bg-gradient-to-r from-primary-container to-secondary bg-clip-text text-transparent font-bold">
            APICommerce
          </span>
        </Link>
        <Link
          href="/"
          className="text-on-surface-variant font-label-sm text-label-sm hover:text-primary transition-colors"
        >
          ← Back to home
        </Link>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center px-margin-mobile py-lg">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  );
}
