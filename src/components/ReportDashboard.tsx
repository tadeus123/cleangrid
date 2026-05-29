import { BuildingVisual } from './BuildingVisual'

export function ReportDashboard() {
  return (
    <section id="proof" className="section-anchor bg-graphite py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Proof after every shift</h2>
            <p className="mt-4 text-slate-muted">
              Tasks completed, zones verified, issues flagged — logged against your SLA.
            </p>
          </div>

          <div className="report-glow overflow-hidden rounded-xl border border-white/10 bg-graphite-light">
            <p className="border-b border-white/10 px-4 py-2 text-xs text-slate-muted">
              Sample dashboard · illustrative
            </p>
            <div className="grid grid-cols-2 gap-px bg-white/5">
              {[
                { label: 'Tasks completed', value: '98.7%', hi: true },
                { label: 'Bathrooms', value: '42 / 42' },
                { label: 'Floors', value: '18,400 m²' },
                { label: 'Time saved', value: '52%' },
              ].map((m) => (
                <div key={m.label} className="bg-graphite-light p-4">
                  <p className="text-xs text-slate-muted">{m.label}</p>
                  <p className={`mt-1 text-lg font-semibold ${m.hi ? 'text-accent' : 'text-white'}`}>
                    {m.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="hidden h-32 border-t border-white/10 p-2 md:block">
              <BuildingVisual className="h-full w-full opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
