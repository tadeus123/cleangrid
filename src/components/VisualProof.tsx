const capabilities = [
  {
    title: 'Floors & corridors',
    desc: 'Autonomous routes through offices, schools, and warehouses — mapped to your floor plan.',
  },
  {
    title: 'Bathrooms & break areas',
    desc: 'Scheduled resets and optional CleanGrid Bath (refresh every 30 minutes).',
  },
  {
    title: 'Elevators & doors',
    desc: 'Scoped per site during scan — routes approved with your security team.',
  },
  {
    title: 'Night & low-traffic windows',
    desc: 'Default model: clean when the building is empty. 24/7 available as add-on.',
  },
]

export function VisualProof() {
  return (
    <section className="border-y border-white/5 bg-graphite py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-white">
          What the fleet is built to do
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-muted">
          Representative capabilities — pilot deployments vary by building. Site scan confirms scope
          before go-live. Photos and walkthrough videos available on request during your quote.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c) => (
            <div
              key={c.title}
              className="rounded-xl border border-white/10 bg-graphite-light p-6"
            >
              <div className="mb-4 flex h-24 items-center justify-center rounded-lg bg-accent/5 border border-accent/20">
                <svg className="h-12 w-12 text-accent/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 20l-5.447-2.724A2 2 0 013 15.382V6.618a2 2 0 011.553-1.946L9 2m0 18l6-3m-6 3V2m6 15l5.447 2.724A2 2 0 0021 17.382V8.618a2 2 0 00-1.553-1.946L15 4m0 13V4m0 0L9 2"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-white">{c.title}</h3>
              <p className="mt-2 text-sm text-slate-muted">{c.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-slate-muted">
          Request a pilot walkthrough:{' '}
          <a href="mailto:sales@cleangrid.com" className="text-accent underline">
            sales@cleangrid.com
          </a>
        </p>
      </div>
    </section>
  )
}
