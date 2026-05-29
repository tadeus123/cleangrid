const steps = [
  {
    n: '01',
    title: 'Upload your current cleaning bill',
    desc: 'Invoice or contract — we anchor your price to real spend, not a calculator guess.',
    when: 'Day 0',
  },
  {
    n: '02',
    title: 'We calculate your CleanGrid price',
    desc: 'Typically 10% of current monthly spend. Written estimate within 1 business day.',
    when: '1 business day',
  },
  {
    n: '03',
    title: 'We scan your building',
    desc: 'On-site or remote walkthrough: zones, access, elevators, bathrooms, schedule.',
    when: '3–7 days',
  },
  {
    n: '04',
    title: 'We deploy the cleaning fleet',
    desc: 'Install, mapping, charging, routes approved, first supervised cleaning run.',
    when: '4–8 weeks from contract',
  },
  {
    n: '05',
    title: 'Your building stays on standard',
    desc: 'Night cleaning by default. Proof-of-clean report after every shift.',
    when: 'Ongoing',
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
          Typical timeline from first contact to nightly cleaning:{' '}
          <strong className="text-graphite">4–12 weeks</strong>, depending on building size and access.
        </p>
        <ol className="mt-14">
          {steps.map((s) => (
            <li key={s.n} className="relative border-l-2 border-accent/30 py-8 pl-8 md:pl-12">
              <span className="absolute -left-[9px] top-10 h-4 w-4 rounded-full border-2 border-accent bg-white" />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-sm font-bold text-accent">{s.n}</span>
                <span className="rounded-full bg-accent/10 px-3 py-0.5 text-xs font-medium text-accent-dim">
                  {s.when}
                </span>
              </div>
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
