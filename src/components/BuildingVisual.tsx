export function BuildingVisual({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden>
      <defs>
        <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1f28" />
          <stop offset="100%" stopColor="#0c0e12" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#floor)" rx="8" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <line
          key={`h${i}`}
          x1={40}
          y1={50 + i * 45}
          x2={360}
          y2={50 + i * 45}
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
        />
      ))}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <line
          key={`v${i}`}
          x1={60 + i * 50}
          y1={40}
          x2={60 + i * 50}
          y2={360}
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
        />
      ))}
      <rect x="80" y="80" width="120" height="90" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <rect x="220" y="80" width="100" height="90" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <rect x="80" y="200" width="240" height="120" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <path
        className="hero-path"
        d="M100 120 L180 120 L180 160 L260 160 L260 240 L140 240 L140 280 L300 280"
      />
      <path
        className="hero-path"
        style={{ animationDelay: '-8s' }}
        d="M280 100 L320 100 L320 200 L200 200 L200 120"
      />
      <circle cx="180" cy="120" r="4" fill="#14b8a6" opacity="0.8" />
      <circle cx="260" cy="160" r="4" fill="#14b8a6" opacity="0.6" />
      <circle cx="140" cy="240" r="4" fill="#14b8a6" opacity="0.7" />
      <text x="200" y="380" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="11" fontFamily="system-ui">
        Night cleaning network · active
      </text>
    </svg>
  )
}
