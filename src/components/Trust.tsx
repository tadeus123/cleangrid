const items = [
  'Robots operate only in approved cleaning zones',
  'Sensitive areas (IT, labs, executive floors) can be excluded',
  'Camera and data rules defined before deployment — GDPR-aligned options',
  'Replacement robots and maintenance included in subscription',
  'Human escalation within contracted response times',
  'Commercial liability and insurance documented in your agreement',
  'SLA with measurable completion %, response times, and credits',
  'Physical safety: wet-floor protocols, obstacle handling, fire-route exclusions',
]

export function Trust() {
  return (
    <section className="bg-graphite py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-bold tracking-tight text-white">Security, safety, and trust</h2>
        <p className="mt-4 max-w-2xl text-slate-muted">
          Enterprise facility teams need more than a landing page. We document zones, liability,
          insurance, and data before the first night run.
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-lg border border-white/10 bg-graphite-light px-5 py-4 text-sm text-slate-muted"
            >
              <span className="text-accent" aria-hidden>
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-12 grid gap-6 rounded-xl border border-white/10 bg-graphite-light p-8 md:grid-cols-4">
          {[
            { label: 'Cost certainty', desc: 'Fixed monthly subscription' },
            { label: 'Operational reliability', desc: 'No sick days or staffing gaps' },
            { label: 'Proof of clean', desc: 'Logged, measured, reported' },
            { label: 'No ownership burden', desc: 'We own and operate the fleet' },
          ].map((p) => (
            <div key={p.label}>
              <p className="font-semibold text-white">{p.label}</p>
              <p className="mt-1 text-sm text-slate-muted">{p.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-lg border border-accent/20 bg-accent/5 p-6">
          <h3 className="font-semibold text-white">Insurance & liability</h3>
          <p className="mt-2 text-sm text-slate-muted">
            CleanGrid carries commercial liability coverage for approved operations. Named insured,
            limits, and indemnity terms are set out in your facility agreement. Your legal team
            reviews before deployment — we expect that.
          </p>
          <p className="mt-3 text-sm text-slate-muted">
            <strong className="text-white">Operational images:</strong> retained per your contract
            (typically 30–90 days for SLA evidence), access limited to your account team and
            CleanGrid operations — deleted on request after contract end unless law requires otherwise.
          </p>
        </div>
      </div>
    </section>
  )
}
