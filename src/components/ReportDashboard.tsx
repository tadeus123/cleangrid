import { BuildingVisual } from './BuildingVisual'

export function ReportDashboard() {
  return (
    <section id="proof" className="section-anchor bg-graphite py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-accent">CleanGrid Proof</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Proof of clean, after every shift.
            </h2>
            <p className="mt-4 text-slate-muted">
              Every run is logged against your SLA: tasks completed, zones verified, issues flagged.
              Facility managers get cost certainty and documented cleanliness — not verbal promises.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-slate-muted">
              {[
                'Areas completed and bathrooms refreshed (checklist-based)',
                'Issues flagged with photo or sensor evidence',
                'Cleanliness score vs. your contracted standard',
                'Time and cost vs. your previous contract',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-2 text-center text-xs uppercase tracking-wider text-slate-muted lg:text-left">
              Illustrative sample dashboard — not a live customer site
            </p>
            <div className="report-glow overflow-hidden rounded-xl border border-white/10 bg-graphite-light">
              <div className="grid gap-4 border-b border-white/10 p-4 md:grid-cols-2">
                <div>
                  <p className="text-xs text-slate-muted">CleanGrid Report · Sample</p>
                  <p className="font-semibold text-white">Example — School campus</p>
                </div>
                <div className="hidden h-24 md:block">
                  <BuildingVisual className="h-full w-full opacity-80" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-px bg-white/5 p-px">
                {[
                  { label: 'Tasks completed (SLA)', value: '98.7%', highlight: true },
                  { label: 'Bathrooms refreshed', value: '42 / 42' },
                  { label: 'Floors cleaned', value: '18,400 m²' },
                  { label: 'Minor issues flagged & resolved', value: '3' },
                  { label: 'Time vs. prior contract', value: '−52%' },
                  { label: 'Est. cost saved this month', value: '$38,200', highlight: true },
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
                <span className="text-slate-muted">Next scheduled run</span>
                <span className="font-medium text-white">22:00 tonight</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
