import { cn } from "@/lib/cn";
import { type HTMLAttributes, type ReactNode } from "react";

export function Panel({
  className,
  children,
  glow,
  ...props
}: HTMLAttributes<HTMLDivElement> & { glow?: "primary" | "secondary" | "tertiary" }) {
  return (
    <div
      className={cn(
        "glass rounded-xl p-6 relative overflow-hidden",
        glow === "primary" && "shadow-glow-primary",
        glow === "secondary" && "shadow-glow-secondary",
        glow === "tertiary" && "shadow-glow-tertiary",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function Stat({
  label,
  value,
  delta,
  hint,
  trend,
}: {
  label: string;
  value: ReactNode;
  delta?: string;
  hint?: string;
  trend?: "up" | "down" | "flat";
}) {
  const color =
    trend === "up" ? "text-primary" : trend === "down" ? "text-danger" : "text-secondary";
  return (
    <Panel className="!p-5">
      <div className="label-caps text-ink-muted mb-3">{label}</div>
      <div className="stat-lg text-ink">{value}</div>
      <div className="mt-3 flex items-center justify-between">
        {delta ? <span className={cn("text-xs font-mono", color)}>{delta}</span> : <span />}
        {hint ? <span className="text-xs text-ink-muted">{hint}</span> : null}
      </div>
    </Panel>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  right,
}: {
  eyebrow?: string;
  title: string;
  right?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between mb-5">
      <div>
        {eyebrow ? <div className="label-caps text-primary-dim mb-1.5">{eyebrow}</div> : null}
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      </div>
      {right}
    </div>
  );
}
