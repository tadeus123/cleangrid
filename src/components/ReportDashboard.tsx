export function ReportDashboard() {
  return (
    <section className="bg-graphite py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-accent">CleanGrid Proof</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Proof of clean, after every shift.
            </h2>
            <p className="mt-4 text-slate-muted">
              Every cleaning run is logged, measured, and reported. Facility managers get cost
              certainty, operational reliability, and documented cleanliness — not promises.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-slate-muted">
              {[
                'Areas completed and bathrooms refreshed',
                'Issues detected with photos or sensor proof',
                'Cleanliness score and time saved',
                'Cost saved vs. previous contract',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="report-glow overflow-hidden rounded-xl border border-white/10 bg-graphite-light">
            <div className="border-b border-white/10 px-5 py-4">
              <p className="text-xs text-slate-muted">CleanGrid Report · Last night</p>
              <p className="font-semibold text-white">Berlin School Campus</p>
            </div>
            <div className="grid grid-cols-2 gap-px bg-white/5 p-px">
              {[
                { label: 'Cleaning completed', value: '98.7%', highlight: true },
                { label: 'Bathrooms refreshed', value: '42 / 42' },
                { label: 'Floors cleaned', value: '18,400 m²' },
                { label: 'Issues detected', value: '3' },
                { label: 'Time saved', value: '52%' },
                { label: 'Cost saved this month', value: '€38,200', highlight: true },
              ].map((m) => (
                <div key={m.label} className="bg-graphite-light p-4">
                  <p className="text-xs text-slate-muted">{m.label}</p>
                  <p
                    className={`mt-1 text-lg font-semibold ${m.highlight ? 'text-accent' : 'text-white'}`}
                  >
                    {m.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-white/10 px-5 py-3 text-xs">
              <span className="text-slate-muted">Next cleaning run</span>
              <span className="font-medium text-white">22:00 tonight</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
