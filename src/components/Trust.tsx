const items = [
  'Robots operate only in approved cleaning zones',
  'Sensitive areas can be excluded from routes',
  'Data and camera rules agreed before deployment',
  'Replacement robots and maintenance included',
  'Human escalation included in every contract',
  'Enterprise security and insurance protocols',
  'Service-level agreements with measurable standards',
]

export function Trust() {
  return (
    <section className="bg-graphite py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-bold tracking-tight text-white">Security, safety, and trust</h2>
        <p className="mt-4 max-w-2xl text-slate-muted">
          Facility managers need answers before they upload a bill. CleanGrid is built for
          enterprise buildings — not demos.
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3 rounded-lg border border-white/10 bg-graphite-light px-5 py-4 text-sm text-slate-muted">
              <span className="text-accent">✓</span>
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-12 grid gap-6 rounded-xl border border-white/10 bg-graphite-light p-8 md:grid-cols-4">
          {[
            { label: 'Cost certainty', desc: 'Fixed monthly subscription' },
            { label: 'Operational reliability', desc: 'No sick days or missed shifts' },
            { label: 'Proof of clean', desc: 'Logged, measured, reported' },
            { label: 'No ownership burden', desc: 'We own and operate the fleet' },
          ].map((p) => (
            <div key={p.label}>
              <p className="font-semibold text-white">{p.label}</p>
              <p className="mt-1 text-sm text-slate-muted">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
