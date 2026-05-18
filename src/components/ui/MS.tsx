import { cn } from "@/lib/cn";

/**
 * Material Symbols Outlined icon — matches the `<span class="material-symbols-outlined">` usage
 * inside every Stitch HTML export.
 */
export function MS({
  name,
  className,
  fill,
  weight,
  size,
}: {
  name: string;
  className?: string;
  fill?: boolean;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
  size?: number;
}) {
  const style: React.CSSProperties = {
    fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' ${weight ?? 400}, 'GRAD' 0, 'opsz' 24`,
    fontSize: size ? `${size}px` : undefined,
    lineHeight: 1,
  };
  return (
    <span className={cn("material-symbols-outlined", className)} style={style}>
      {name}
    </span>
  );
}
