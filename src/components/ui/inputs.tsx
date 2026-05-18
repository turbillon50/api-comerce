"use client";

import { cn } from "@/lib/cn";
import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";

export const TextInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function TextInput({ className, ...props }, ref) {
    return (
      <div
        className={cn(
          "ring-focus hairline rounded-lg bg-bg-2/80 px-3 py-2 transition-shadow",
          className,
        )}
      >
        <input
          ref={ref}
          {...props}
          className="w-full bg-transparent text-sm text-ink placeholder:text-ink-muted/70 focus:outline-none code"
        />
      </div>
    );
  },
);

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, ...props }, ref) {
    return (
      <div className={cn("ring-focus hairline rounded-lg bg-bg-2/80 px-3 py-2", className)}>
        <textarea
          ref={ref}
          {...props}
          className="w-full bg-transparent text-sm text-ink placeholder:text-ink-muted/70 focus:outline-none resize-y code"
        />
      </div>
    );
  },
);

export function Label({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div className="flex items-center justify-between mb-1.5">
      <span className="label-caps text-ink-muted">{children}</span>
      {hint ? <span className="text-[11px] text-ink-muted/80">{hint}</span> : null}
    </div>
  );
}
