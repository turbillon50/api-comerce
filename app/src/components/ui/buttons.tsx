"use client";

import { cn } from "@/lib/cn";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost" | "danger" | "subtle";

function classes(variant: Variant) {
  switch (variant) {
    case "primary":
      return "bg-primary text-primary-ink font-bold hover:brightness-110 hover:shadow-glow-primary";
    case "ghost":
      return "border border-line/60 text-ink hover:bg-bg-3/70 hover:border-primary/50";
    case "danger":
      return "bg-danger/15 text-danger border border-danger/30 hover:bg-danger/25";
    case "subtle":
      return "text-ink-dim hover:text-ink";
  }
}

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={cn(
        "inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm transition-all active:scale-[0.98]",
        classes(variant),
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm transition-all active:scale-[0.98]",
        classes(variant),
        className,
      )}
    >
      {children}
    </Link>
  );
}
