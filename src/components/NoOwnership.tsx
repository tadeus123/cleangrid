export function NoOwnership() {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-graphite md:text-4xl">
            You don&apos;t buy robots.
            <br />
            <span className="text-accent-dim">We run everything.</span>
          </h2>
          <ul className="mt-8 space-y-4 text-slate-muted">
            {[
              'Install, route, and charge the fleet',
              'Night cleaning included — 24/7 optional',
              'Maintain and replace robots',
              'You pay one monthly subscription',
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-accent">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <img
          src="/images/robot-cleaning.jpg"
          alt="Humanoid cleaning fleet in a modern building corridor"
          className="aspect-[4/5] w-full rounded-xl border border-gray-200 object-cover shadow-lg lg:aspect-square"
          loading="lazy"
        />
      </div>
    </section>
  )
}
