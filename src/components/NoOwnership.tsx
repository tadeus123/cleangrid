const points = [
  { title: 'We install them', desc: 'Humanoid fleet deployed and mapped to your building.' },
  { title: 'We operate them', desc: 'Night cleaning by default. 24/7 available.' },
  { title: 'We maintain them', desc: 'Repairs, charging, consumables, remote monitoring.' },
  { title: 'We replace them', desc: 'No downtime. Replacement robots included.' },
  { title: 'You pay for cleanliness', desc: 'Monthly subscription. No robot ownership.' },
]

export function NoOwnership() {
  return (
    <section className="bg-white py-20 text-graphite">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          You do not buy robots.
          <br />
          <span className="text-accent-dim">You subscribe to a clean building.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-muted">
          CleanGrid turns cleaning from a labor problem into building infrastructure. We install,
          operate, maintain, and monitor the fleet. You only pay for the cleanliness outcome.
        </p>
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {points.map((p) => (
            <li key={p.title} className="rounded-lg border border-gray-200 bg-gray-50/80 p-6 text-left">
              <h3 className="font-semibold text-graphite">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-muted">{p.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
