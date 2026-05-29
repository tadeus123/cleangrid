const included = [
  'Humanoid cleaning fleet',
  'Site mapping and charging setup',
  'Fleet monitoring and maintenance',
  'Replacement robots',
  'Cleaning reports after every shift',
  'Night cleaning (24/7 optional)',
  'Service-level guarantee',
]

export function Pricing() {
  return (
    <section id="pricing" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-graphite">Brutally simple pricing</h2>
            <p className="mt-4 text-slate-muted">
              CleanGrid does not copy the old model of hours, m², or vague quotes. You subscribe to
              cleanliness at a fraction of what you pay today.
            </p>
            <div className="mt-8 space-y-6">
              <div className="rounded-lg border-2 border-accent/30 bg-teal-50/50 p-6">
                <p className="text-sm font-medium text-accent-dim">Primary rule</p>
                <p className="mt-2 text-2xl font-bold text-graphite">
                  Price = 10% of your current cleaning cost
                </p>
                <p className="mt-2 text-sm text-slate-muted">
                  Show us your current cleaning bill. We clean your building for 10% of it.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 p-6">
                <p className="text-sm font-medium text-graphite">Benchmark pricing</p>
                <p className="mt-2 text-xl font-bold text-graphite">From €99 per 1,000 m² per clean</p>
                <p className="mt-2 text-sm text-slate-muted">
                  Or upload your invoice — whichever is clearer for your building.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-8">
            <h3 className="font-semibold text-graphite">Included in every subscription</h3>
            <ul className="mt-6 space-y-3">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-muted">
                  <svg className="mt-0.5 h-5 w-5 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs text-slate-muted">
              Minimum term typically 24–36 months. Setup included for larger contracts. Premium
              add-ons: 24/7 bathrooms, emergency spill response, weekend deep clean.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
