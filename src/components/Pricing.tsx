import { useCurrency } from '../context/CurrencyContext'
import { formatMoney, BENCHMARK_PER_1000_SQM } from '../lib/currency'
import { EligibilityBanner } from './EligibilityBanner'

const included = [
  'Robotic fleet + mapping',
  'Maintenance & replacements',
  'Proof-of-clean reports',
  'Night cleaning · SLA',
]

export function Pricing() {
  const { currency } = useCurrency()

  return (
    <section id="pricing" className="section-anchor bg-white py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-bold text-graphite">Pricing</h2>
        <p className="mt-4 text-4xl font-bold text-graphite">
          10% of your current cleaning bill
        </p>
        <p className="mt-2 text-slate-muted">You keep 90%. Binding price after we validate your invoice.</p>

        <EligibilityBanner className="mt-6" />

        <p className="mt-8 text-sm text-slate-muted">
          No invoice yet? Benchmark from {formatMoney(BENCHMARK_PER_1000_SQM[currency], currency)} per
          1,000 m² per visit.
        </p>

        <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-graphite">
          {included.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="text-accent">✓</span>
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-8 text-xs text-slate-muted">
          Guarantee: 2× agreed standard · ~half the time · SLA credits if missed · 24–36 month typical
          term
        </p>

        <a
          href="#upload"
          className="mt-10 inline-flex rounded-md bg-accent px-8 py-3 text-sm font-semibold text-graphite"
        >
          Upload cleaning bill
        </a>
      </div>
    </section>
  )
}
