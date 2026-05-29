import { CURRENCIES } from '../lib/currency'
import { useCurrency } from '../context/CurrencyContext'

export function CurrencySelect({ className = '' }: { className?: string }) {
  const { currency, setCurrency } = useCurrency()
  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value as typeof currency)}
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
