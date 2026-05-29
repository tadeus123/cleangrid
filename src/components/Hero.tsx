import { CTAButtons } from './CTAButtons'
import { EligibilityBanner } from './EligibilityBanner'
import { useCurrency } from '../context/CurrencyContext'
import { formatMoney } from '../lib/currency'
import { MIN_MONTHLY_BILL } from '../constants/eligibility'

export function Hero() {
  const { currency } = useCurrency()
  const exampleBill = MIN_MONTHLY_BILL[currency] * 5
  const exampleSave = Math.round(exampleBill * 12 * 0.9)

  return (
    <section className="section-anchor relative overflow-hidden bg-graphite pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="grid-bg absolute inset-0 opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-graphite" />

      <div className="relative mx-auto max-w-6xl px-6">
        <p className="mb-4 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent">
          Pilot program · EU, UK & North America
        </p>

        <h1 className="max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
          Pay <span className="text-accent">10%</span> of what you spend on cleaning today.
        </h1>

        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/90 md:text-2xl">
          Save <span className="font-semibold text-accent">90%</span>. Same building — higher
          standard, finished in half the time.
        </p>

        <p className="mt-4 max-w-2xl text-base text-slate-muted">
          CleanGrid is fully managed robotic cleaning for offices, schools, factories, hotels, and
          large campuses. You don&apos;t buy robots — you subscribe to a building that meets your
          cleanliness standard.
        </p>

        <div className="mt-6 rounded-lg border border-white/10 bg-white/5 px-5 py-4 md:inline-block">
          <p className="text-sm text-slate-muted">
            Example: {formatMoney(exampleBill, currency)}/month today →{' '}
            <span className="font-semibold text-accent">
              {formatMoney(Math.round(exampleBill * 0.1), currency)}/month
            </span>{' '}
            with CleanGrid
          </p>
          <p className="mt-1 text-xs text-accent">
            ≈ {formatMoney(exampleSave, currency)} saved per year on that bill alone
          </p>
        </div>

        <EligibilityBanner className="mt-6" dark />

        <CTAButtons className="mt-8" primary="calculate" />

        <p className="mt-6 text-sm text-slate-muted">
          Already know your address?{' '}
          <a href="#map-estimate" className="font-medium text-accent underline hover:text-teal-300">
            Search your building on the map
          </a>{' '}
          for an instant ballpark — then upload your bill to lock 10% pricing.
        </p>
      </div>
    </section>
  )
}
