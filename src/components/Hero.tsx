import { CTAButtons } from './CTAButtons'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-graphite pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="grid-bg absolute inset-0 opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-graphite/50 to-graphite" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
              The robotic cleanliness layer for large buildings
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-[3.25rem]">
              Cleaning is no longer a staffing problem.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-muted">
              Fully managed humanoid cleaning fleets for offices, schools, factories, hotels,
              warehouses, and public buildings — from{' '}
              <span className="font-medium text-white">10% of your current cleaning cost</span>.
              Twice as clean. Half the time.
            </p>
            <p className="mt-3 text-sm text-slate-muted">
              From €99 per 1,000 m² per clean · Or upload your invoice — we price at 10%
            </p>
            <CTAButtons className="mt-8" />
          </div>

          <div className="relative hidden aspect-square max-h-[420px] lg:block">
            <BuildingVisual />
          </div>
        </div>
      </div>
    </section>
  )
}

function BuildingVisual() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden>
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
