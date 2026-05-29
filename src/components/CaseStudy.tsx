import { useCurrency } from '../context/CurrencyContext'
import { formatMoney } from '../lib/currency'

export function CaseStudy() {
  const { currency } = useCurrency()
  const before = currency === 'USD' ? 62_000 : currency === 'GBP' ? 48_000 : 52_000
  const after = Math.round(before * 0.1)

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-center text-sm font-medium uppercase tracking-widest text-accent-dim">
          Anonymised pilot example
        </p>
        <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-graphite">
          How the economics look in practice
        </h2>
        <blockquote className="mt-10 rounded-xl border border-gray-200 bg-gray-50 p-8">
          <p className="text-lg leading-relaxed text-graphite">
            &ldquo;We were spending {formatMoney(before, currency)}/month on night cleaning for a
            multi-wing campus. CleanGrid scoped the building in one scan week and quoted{' '}
            {formatMoney(after, currency)}/month — 10% of our invoice. Reports after every shift
            replaced the old checklist arguments with facility management.&rdquo;
          </p>
          <footer className="mt-6 text-sm text-slate-muted">
            — Operations director, anonymised EU school campus (pilot cohort, 2026)
          </footer>
        </blockquote>
        <p className="mt-4 text-center text-xs text-slate-muted">
          Illustrative composite from pilot discussions — not a public reference customer. Your
          price is always 10% of your verified cleaning spend.
        </p>
      </div>
    </section>
  )
}
