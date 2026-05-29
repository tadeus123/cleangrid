const steps = [
  {
    n: '01',
    title: 'Upload your current cleaning bill',
    desc: 'Invoice or contract — we anchor your price to real spend, not a calculator guess.',
  },
  {
    n: '02',
    title: 'We calculate your CleanGrid price',
    desc: 'Typically 10% of current monthly spend. You get a written estimate within 1 business day.',
  },
  {
    n: '03',
    title: 'We scan your building',
    desc: 'On-site or remote walkthrough: zones, access, elevators, bathrooms, schedule.',
  },
  {
    n: '04',
    title: 'We deploy the cleaning fleet',
    desc: 'Robots installed, charging set up, routes approved, first supervised cleaning run.',
  },
  {
    n: '05',
    title: 'Your building stays on standard',
    desc: 'Scheduled cleaning (night by default). Proof-of-clean report after every shift.',
  },
]

export function Process() {
  return (
    <section id="how" className="section-anchor grid-bg border-y border-gray-200 bg-gray-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-graphite md:text-4xl">
          How it works
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-slate-muted">
          Simpler than a cleaning tender: upload your bill, book a scan, subscribe to cleanliness.
        </p>
        <ol className="mt-14">
          {steps.map((s) => (
            <li
              key={s.n}
              className="relative border-l-2 border-accent/30 py-8 pl-8 md:pl-12"
            >
              <span className="absolute -left-[9px] top-10 h-4 w-4 rounded-full border-2 border-accent bg-white" />
              <span className="text-sm font-bold text-accent">{s.n}</span>
              <h3 className="mt-2 text-xl font-semibold text-graphite">{s.title}</h3>
              <p className="mt-2 text-slate-muted">{s.desc}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 text-center">
          <a
            href="#site-scan"
            className="inline-flex rounded-md bg-graphite px-8 py-3 text-sm font-semibold text-white transition hover:bg-graphite-light"
          >
            Book site scan
          </a>
        </div>
      </div>
    </section>
  )
}
