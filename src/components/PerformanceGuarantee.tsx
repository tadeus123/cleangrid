const items = [
  {
    label: '10% of current cost',
    desc: 'Subscription anchored to your existing cleaning invoice after site validation.',
  },
  {
    label: '2× cleanliness standard',
    desc: 'Contract defines measurable tasks and scores — not marketing adjectives alone.',
  },
  {
    label: '~50% cleaning window',
    desc: 'Same scope completed in roughly half the time vs. your current schedule baseline.',
  },
  {
    label: 'Pay for results',
    desc: 'Missed SLA shifts receive credits or remediation per contract — not silent failures.',
  },
]

export function PerformanceGuarantee() {
  return (
    <section id="guarantee" className="section-anchor bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-graphite">
          Performance guarantee
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-muted">
          What we put in writing — not just on the homepage.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center"
            >
              <p className="text-lg font-bold text-accent-dim">{item.label}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-muted">{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-slate-muted">
          Minimum contract term is typically 24–36 months to cover deployment. Setup is included
          on larger sites. Consumables may be included or billed at cost — specified in your offer.
        </p>
      </div>
    </section>
  )
}
