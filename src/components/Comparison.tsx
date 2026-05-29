const rows = [
  { traditional: 'Staffing gaps', cleangrid: 'Scheduled fleet' },
  { traditional: 'Quality hard to prove', cleangrid: 'Report every shift' },
  { traditional: 'Expensive nights', cleangrid: 'Night cleaning included' },
  { traditional: 'Pay for hours', cleangrid: 'Pay for cleanliness' },
]

export function Comparison() {
  return (
    <section className="border-y border-white/5 bg-graphite-light py-16">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-center text-2xl font-bold text-white">vs. traditional cleaning</h2>
        <table className="mt-8 w-full text-sm">
          <tbody>
            {rows.map((row) => (
              <tr key={row.traditional} className="border-b border-white/5">
                <td className="py-3 text-slate-muted">{row.traditional}</td>
                <td className="py-3 text-right font-medium text-accent">{row.cleangrid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
