export type Currency = 'EUR' | 'USD' | 'GBP'

export const CURRENCIES: { code: Currency; label: string; symbol: string; locale: string }[] = [
  { code: 'EUR', label: 'EUR (€)', symbol: '€', locale: 'de-DE' },
  { code: 'USD', label: 'USD ($)', symbol: '$', locale: 'en-US' },
  { code: 'GBP', label: 'GBP (£)', symbol: '£', locale: 'en-GB' },
]

/** Benchmark: €99 per 1,000 m² per visit — converted approximately for display */
export const BENCHMARK_PER_1000_SQM: Record<Currency, number> = {
  EUR: 99,
  USD: 108,
  GBP: 85,
}

export function formatMoney(amount: number, currency: Currency): string {
  return new Intl.NumberFormat(
    CURRENCIES.find((c) => c.code === currency)?.locale ?? 'en-US',
    {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    },
  ).format(amount)
}

export function parseMoneyInput(value: string): number {
  const n = Number(value.replace(/[^\d.]/g, ''))
  return Number.isFinite(n) ? Math.max(0, Math.round(n)) : 0
}
