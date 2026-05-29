const rows = [
  { traditional: 'Human staffing problems', cleangrid: 'Fully managed robotic fleet' },
  { traditional: 'Sick days and missed shifts', cleangrid: 'Always scheduled' },
  { traditional: 'Hard to prove quality', cleangrid: 'Cleaning reports after every shift' },
  { traditional: 'Expensive night work', cleangrid: 'Night cleaning by default' },
  { traditional: 'Manual supervision', cleangrid: 'Remote fleet monitoring' },
  { traditional: 'Pay for labor hours', cleangrid: 'Pay for cleanliness' },
]

export function Comparison() {
  return (
    <section className="border-y border-white/5 bg-graphite-light py-20">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-white">
          Traditional cleaning vs. CleanGrid
        </h2>
        <div className="mt-12 overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-left text-sm">
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
          Twice as clean. Half the time. One tenth the cost.
        </p>
      </div>
    </section>
  )
}
