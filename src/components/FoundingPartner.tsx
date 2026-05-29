export function FoundingPartner() {
  return (
    <section className="border-y border-white/5 bg-graphite-light py-16">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-accent">Founding partner program</p>
        <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">
          Early buildings get priority deployment and locked-in pricing
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-muted">
          We are onboarding a limited number of large sites per city. Founding partners receive
          fixed 10% pricing for the contract term, direct access to our deployment team, and
          co-branded case studies when successful.
        </p>
        <a
          href="#upload"
          className="mt-8 inline-flex rounded-md bg-accent px-8 py-3 text-sm font-semibold text-graphite"
        >
          Apply as founding partner
        </a>
      </div>
    </section>
  )
}
