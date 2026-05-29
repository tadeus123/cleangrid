const steps = [
  { n: '01', title: 'Upload your current cleaning bill', desc: 'We anchor pricing to your real invoice — not a guess.' },
  { n: '02', title: 'We calculate your CleanGrid price', desc: 'Typically 10% of current cost. Instant savings estimate.' },
  { n: '03', title: 'We scan your building', desc: 'Site walkthrough or remote mapping. Zones, access, schedule.' },
  { n: '04', title: 'We deploy the humanoid fleet', desc: 'Robots installed, charging set up, first supervised run.' },
  { n: '05', title: 'Your building gets cleaned every night', desc: 'Reports after every shift. Proof of clean, every time.' },
]

export function Process() {
  return (
    <section id="how" className="grid-bg border-y border-gray-200 bg-gray-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-graphite md:text-4xl">
          How it works
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-slate-muted">
          More like fintech than cleaning. Upload your bill, get a fleet, subscribe to cleanliness.
        </p>
        <ol className="mt-14 space-y-0">
          {steps.map((s, i) => (
            <li
              key={s.n}
              className="relative flex flex-col gap-4 border-l-2 border-accent/30 py-8 pl-8 md:flex-row md:items-start md:gap-12 md:pl-12"
            >
              <span className="absolute -left-[9px] top-10 h-4 w-4 rounded-full border-2 border-accent bg-white" />
              <span className="text-sm font-bold text-accent">{s.n}</span>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-graphite">{s.title}</h3>
                <p className="mt-2 text-slate-muted">{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block md:w-24" aria-hidden />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
