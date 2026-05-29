import { useCurrency } from '../context/CurrencyContext'
import { formatMoney, BENCHMARK_PER_1000_SQM } from '../lib/currency'
import { ADDON_HINTS, addonPriceHint } from '../constants/addons'
import { EligibilityBanner } from './EligibilityBanner'

const included = [
  'Robotic cleaning fleet (humanoid or mixed fleet per site)',
  'Site mapping, charging, and route approval',
  'Fleet monitoring, maintenance, and replacement units',
  'Proof-of-clean reports after every shift',
  'Night cleaning standard (24/7 optional add-on)',
  'Service-level agreement with measurable metrics',
  'Human escalation and on-call support',
]

export function Pricing() {
  const { currency } = useCurrency()

  return (
    <section id="pricing" className="section-anchor bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-graphite">Transparent pricing</h2>
            <p className="mt-4 text-slate-muted">
              One primary rule. One benchmark reference. No vague hourly quotes.
            </p>

            <div className="mt-8 space-y-6">
              <div className="rounded-lg border-2 border-accent/30 bg-teal-50/50 p-6">
                <p className="text-sm font-medium text-accent-dim">Primary rule (most sites)</p>
                <p className="mt-2 text-2xl font-bold text-graphite">
                  Monthly price = 10% of your current cleaning spend
                </p>
                <p className="mt-2 text-sm text-slate-muted">
                  Upload your invoice. We confirm scope on a site scan, then fix your subscription in
                  writing. You save 90% vs. today if we hit agreed SLA.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 p-6">
                <p className="text-sm font-medium text-graphite">Benchmark reference</p>
                <p className="mt-2 text-xl font-bold text-graphite">
                  From {formatMoney(BENCHMARK_PER_1000_SQM[currency], currency)} per 1,000 m² per
                  scheduled visit
                </p>
                <p className="mt-2 text-sm text-slate-muted">
                  <strong>Per visit</strong> = one scheduled cleaning run (e.g. one night). If you clean
                  20 nights/month, multiply by 20 for a rough monthly benchmark. Binding price is
                  always <strong>10% of your actual invoice</strong> after site scan.
                </p>
              </div>

              <EligibilityBanner />

              <p className="text-sm text-slate-muted">
                <strong>Setup:</strong> €0 or minimal onboarding on qualifying contracts.{' '}
                <strong>Term:</strong> typically 24–36 months.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-8">
            <h3 className="font-semibold text-graphite">Included in every subscription</h3>
            <ul className="mt-6 space-y-3">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-muted">
                  <svg
                    className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-sm font-medium text-graphite">Premium add-ons (illustrative)</p>
              <p className="mt-1 text-xs text-slate-muted">
                On a {formatMoney(10_000, currency)}/mo base subscription, typical uplifts:
              </p>
              <ul className="mt-3 space-y-2 text-xs text-slate-muted">
                <li>
                  {ADDON_HINTS.always.label}:{' '}
                  {addonPriceHint(10_000, ADDON_HINTS.always.pctLow, ADDON_HINTS.always.pctHigh, currency)}
                </li>
                <li>
                  {ADDON_HINTS.bath.label}:{' '}
                  {addonPriceHint(10_000, ADDON_HINTS.bath.pctLow, ADDON_HINTS.bath.pctHigh, currency)}
                </li>
                <li>
                  {ADDON_HINTS.spill.label}:{' '}
                  {addonPriceHint(10_000, ADDON_HINTS.spill.pctLow, ADDON_HINTS.spill.pctHigh, currency)}
                </li>
                <li>
                  {ADDON_HINTS.deep.label}:{' '}
                  {addonPriceHint(10_000, ADDON_HINTS.deep.pctLow, ADDON_HINTS.deep.pctHigh, currency)}
                </li>
              </ul>
            </div>
            <a
              href="#upload"
              className="mt-6 inline-flex w-full justify-center rounded-md bg-accent py-3 text-sm font-semibold text-graphite"
            >
              Upload cleaning bill
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
