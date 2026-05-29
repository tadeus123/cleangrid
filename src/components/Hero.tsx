import { CTAButtons } from './CTAButtons'

export function Hero() {
  return (
    <section className="section-anchor relative overflow-hidden bg-graphite pt-28 pb-20 md:pt-32 md:pb-24">
      <div className="grid-bg absolute inset-0 opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-r from-graphite via-graphite/95 to-transparent" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-14">
        <div>
          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-5xl lg:text-[3.5rem]">
            Pay <span className="text-accent">10%</span> of your cleaning bill.
            <span className="block text-white/90">Save 90%.</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg text-slate-muted">
            Fully managed robotic cleaning for large buildings. You don&apos;t buy robots — you
            subscribe to cleanliness.
          </p>

          <CTAButtons className="mt-8" primary="calculate" />

          <p className="mt-6 text-xs text-slate-muted">
            For buildings over 5,000 m² or €10k+ monthly cleaning spend · EU, UK, North America
          </p>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[420px] lg:max-w-none">
          <BuildingVisual />
        </div>
      </div>
    </section>
  )
}

function BuildingVisual() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="hero-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1f28" />
          <stop offset="100%" stopColor="#0c0e12" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#hero-floor)" rx="12" />
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
