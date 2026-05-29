import { CTAButtons } from './CTAButtons'
import { BuildingVisual } from './BuildingVisual'

export function Hero() {
  return (
    <section className="section-anchor relative overflow-hidden bg-graphite pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="grid-bg absolute inset-0 opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-graphite/50 to-graphite" />

      <div className="relative mx-auto max-w-6xl px-6">
        <p className="mb-6 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent">
          Now accepting pilot buildings in the EU, UK, and North America
        </p>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
              The robotic cleanliness layer for large buildings — we install and operate inside yours
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-[3.25rem]">
              Cleaning is no longer a staffing problem.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-muted">
              Fully managed robotic cleaning for offices, schools, factories, hotels, and more.{' '}
              <span className="font-medium text-white">
                Pay 10% of today&apos;s cleaning bill (save 90%).
              </span>{' '}
              Higher cleanliness standard. Finished in half the time.
            </p>
            <p className="mt-3 text-sm text-slate-muted">
              Upload your invoice for an exact price — or use the benchmark from €99 per 1,000 m² per
              scheduled visit
              <sup className="ml-0.5 text-accent">1</sup>
            </p>
            <CTAButtons className="mt-8" />
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[320px] lg:max-h-[420px] lg:max-w-none">
            <BuildingVisual className="h-full w-full" />
          </div>
        </div>

        <p className="mt-10 text-xs text-slate-muted">
          <sup>1</sup> Benchmark depends on visit frequency and scope. Your contract price is confirmed
          after a site scan; invoice-based pricing is typically 10% of current spend.
        </p>
      </div>
    </section>
  )
}
