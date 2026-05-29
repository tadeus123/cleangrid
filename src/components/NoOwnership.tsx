const points = [
  {
    title: 'We install them',
    desc: 'Fleet deployed, mapped to floors, doors, elevators, and zones you approve.',
  },
  {
    title: 'We operate them',
    desc: 'Night cleaning included. 24/7 continuous cleaning available as a premium add-on.',
  },
  {
    title: 'We maintain them',
    desc: 'Repairs, charging, consumables, and 24/7 remote monitoring.',
  },
  {
    title: 'We replace them',
    desc: 'Swap units within SLA if one fails — your building stays on schedule.',
  },
  {
    title: 'You pay for cleanliness',
    desc: 'Monthly subscription tied to agreed standards. No robot purchase or capex.',
  },
]

export function NoOwnership() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-graphite">
          You don&apos;t buy robots.
          <br />
          <span className="text-accent-dim">You subscribe to a building that meets your standard.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-muted">
          CleanGrid turns cleaning from a staffing problem into building infrastructure. We install,
          operate, maintain, and monitor the fleet. You only pay for the agreed cleanliness outcome.
        </p>
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {points.map((p) => (
            <li
              key={p.title}
              className="rounded-lg border border-gray-200 bg-gray-50/80 p-6 text-left"
            >
              <h3 className="font-semibold text-graphite">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-muted">{p.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
