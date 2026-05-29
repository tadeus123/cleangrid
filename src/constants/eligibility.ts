import type { Currency } from '../lib/currency'
import { formatMoney } from '../lib/currency'

export const MIN_CLEANABLE_SQM = 5_000

export const MIN_MONTHLY_BILL: Record<Currency, number> = {
  EUR: 10_000,
  USD: 11_000,
  GBP: 8_500,
}

export function eligibilityLine(currency: Currency): string {
  return `For buildings over ${MIN_CLEANABLE_SQM.toLocaleString()} m² cleanable, or cleaning spend above ${formatMoney(MIN_MONTHLY_BILL[currency], currency)}/month.`
}
