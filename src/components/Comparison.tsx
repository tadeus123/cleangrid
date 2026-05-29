const rows = [
  { traditional: 'Staffing gaps, sick days, missed shifts', cleangrid: 'Scheduled fleet — no staffing gaps' },
  { traditional: 'Quality hard to prove', cleangrid: 'Proof-of-clean report every shift' },
  { traditional: 'Expensive night and weekend cover', cleangrid: 'Night cleaning included by default' },
  { traditional: 'On-site supervision required', cleangrid: 'Remote monitoring + human escalation' },
  { traditional: 'Pay for labor hours', cleangrid: 'Pay for agreed cleanliness standard' },
  { traditional: 'You manage suppliers and equipment', cleangrid: 'We own, maintain, and replace robots' },
  { traditional: 'Insurance and SLAs vary by vendor', cleangrid: 'Enterprise SLA, liability, and data terms in contract' },
]

export function Comparison() {
  return (
    <section className="border-y border-white/5 bg-graphite-light py-20">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-white">
          Traditional cleaning vs. CleanGrid
        </h2>
        <div className="mt-12 overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-graphite">
                <th className="px-6 py-4 font-medium text-slate-muted">Traditional cleaning</th>
                <th className="px-6 py-4 font-medium text-accent">CleanGrid</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.traditional} className="border-b border-white/5 last:border-0">
                  <td className="px-6 py-4 text-slate-muted">{row.traditional}</td>
                  <td className="px-6 py-4 font-medium text-white">{row.cleangrid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-8 text-center text-lg font-medium text-white">
          Pay 10% of today&apos;s bill · save 90% · higher standard · half the cleaning window
        </p>
        <p className="mt-2 text-center text-xs text-slate-muted">
          Performance metrics defined in your SLA and measured each shift.
        </p>
      </div>
    </section>
  )
}
