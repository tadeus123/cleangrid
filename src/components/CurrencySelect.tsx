import { CURRENCIES, type Currency } from '../lib/currency'
import { useCurrency } from '../context/CurrencyContext'

type Props = {
  className?: string
  variant?: 'select' | 'tabs'
}

export function CurrencySelect({ className = '', variant = 'tabs' }: Props) {
  const { currency, setCurrency } = useCurrency()

  if (variant === 'select') {
    return (
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as Currency)}
        className={`rounded-md border border-white/15 bg-graphite-light px-3 py-2 text-sm text-white ${className}`}
        aria-label="Currency"
      >
        {CURRENCIES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.label}
          </option>
        ))}
      </select>
    )
  }

  return (
    <div className={`flex gap-1 rounded-lg border border-white/15 bg-graphite-light p-1 ${className}`} role="group" aria-label="Currency">
      {CURRENCIES.map((c) => (
        <button
          key={c.code}
          type="button"
          onClick={() => setCurrency(c.code)}
          className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
            currency === c.code ? 'bg-accent text-graphite' : 'text-slate-muted hover:text-white'
          }`}
        >
          {c.code}
        </button>
      ))}
    </div>
  )
}
