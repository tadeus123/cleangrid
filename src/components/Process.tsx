const steps = [
  { title: 'Upload bill', when: 'Day 0' },
  { title: 'We quote 10%', when: '1 day' },
  { title: 'Site scan', when: '3–7 days' },
  { title: 'Fleet deployed', when: '4–8 weeks' },
  { title: 'Nightly cleaning + reports', when: 'Ongoing' },
]

export function Process() {
  return (
    <section id="how" className="section-anchor border-y border-gray-200 bg-gray-50 py-16">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-center text-2xl font-bold text-graphite">How it works</h2>
        <div className="mt-10 flex flex-wrap justify-between gap-4">
          {steps.map((s, i) => (
            <div key={s.title} className="min-w-[120px] flex-1 text-center">
              <p className="text-xs font-bold text-accent">{s.when}</p>
              <p className="mt-1 text-sm font-medium text-graphite">
                {i + 1}. {s.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
