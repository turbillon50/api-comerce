/**
 * APICommerce mascot — inline SVG so it renders crisp at any size and never
 * shows a transparency-checker background like the original PNG export did.
 *
 * The mascot is an orbital "neural orb": three rings around a glowing core
 * with two small eyes. Tinted using the platform's emerald + cyan accents.
 */
export function Mascot({ size = 280, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 320 320"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="APICommerce mascot"
    >
      <defs>
        <radialGradient id="mascot-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5bffa1" stopOpacity="1" />
          <stop offset="55%" stopColor="#00e383" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00391d" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="mascot-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00ff94" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#00ff94" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="mascot-ring-a" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ff94" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#00e0ff" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="mascot-ring-b" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00e0ff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#d0bcff" stopOpacity="0.4" />
        </linearGradient>
        <filter id="mascot-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* Outer atmospheric glow */}
      <circle cx="160" cy="160" r="140" fill="url(#mascot-glow)" />

      {/* Three orbital rings — slight skew to suggest 3D */}
      <ellipse
        cx="160"
        cy="160"
        rx="115"
        ry="40"
        fill="none"
        stroke="url(#mascot-ring-a)"
        strokeWidth="1.5"
        transform="rotate(-25 160 160)"
      />
      <ellipse
        cx="160"
        cy="160"
        rx="115"
        ry="40"
        fill="none"
        stroke="url(#mascot-ring-b)"
        strokeWidth="1.5"
        transform="rotate(25 160 160)"
      />
      <ellipse
        cx="160"
        cy="160"
        rx="115"
        ry="115"
        fill="none"
        stroke="#00ff94"
        strokeOpacity="0.35"
        strokeWidth="1"
        strokeDasharray="2 4"
      />

      {/* Core orb */}
      <circle cx="160" cy="160" r="90" fill="url(#mascot-core)" filter="url(#mascot-blur)" />
      <circle cx="160" cy="160" r="62" fill="#00ff94" opacity="0.18" />
      <circle
        cx="160"
        cy="160"
        r="56"
        fill="none"
        stroke="#5bffa1"
        strokeWidth="1.2"
        strokeOpacity="0.5"
      />

      {/* Eyes */}
      <ellipse cx="140" cy="160" rx="6" ry="9" fill="#f2fff1" />
      <ellipse cx="180" cy="160" rx="6" ry="9" fill="#f2fff1" />
      <circle cx="140" cy="161" r="2.2" fill="#00391d" />
      <circle cx="180" cy="161" r="2.2" fill="#00391d" />

      {/* Highlight */}
      <ellipse cx="135" cy="135" rx="22" ry="14" fill="#ffffff" opacity="0.18" />
    </svg>
  );
}
