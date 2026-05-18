import type { BlendCardCopy } from "./catalog";

/**
 * Static Tailwind class maps per blend accent. Required because Tailwind's JIT
 * only sees class names that appear as complete literals in source code.
 */
export const ACCENT_TEXT: Record<BlendCardCopy["accent"], string> = {
  "primary-fixed-dim": "text-primary-fixed-dim",
  "secondary-fixed-dim": "text-secondary-fixed-dim",
  "tertiary-fixed-dim": "text-tertiary-fixed-dim",
  "primary-container": "text-primary-container",
};

export const ACCENT_BORDER_L: Record<BlendCardCopy["accent"], string> = {
  "primary-fixed-dim": "border-l-primary-fixed-dim",
  "secondary-fixed-dim": "border-l-secondary-fixed-dim",
  "tertiary-fixed-dim": "border-l-tertiary-fixed-dim",
  "primary-container": "border-l-primary-container",
};

export const ACCENT_BG_SOFT: Record<BlendCardCopy["accent"], string> = {
  "primary-fixed-dim": "bg-primary-fixed-dim/10",
  "secondary-fixed-dim": "bg-secondary-fixed-dim/10",
  "tertiary-fixed-dim": "bg-tertiary-fixed-dim/10",
  "primary-container": "bg-primary-container/10",
};

export const ACCENT_SHADOW: Record<BlendCardCopy["accent"], string> = {
  "primary-fixed-dim": "hover:shadow-[0_10px_30px_-10px_rgba(0,227,131,0.2)]",
  "secondary-fixed-dim": "hover:shadow-[0_10px_30px_-10px_rgba(208,188,255,0.2)]",
  "tertiary-fixed-dim": "hover:shadow-[0_10px_30px_-10px_rgba(229,196,91,0.2)]",
  "primary-container": "hover:shadow-[0_10px_30px_-10px_rgba(0,255,148,0.2)]",
};
