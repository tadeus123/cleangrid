import type { Currency } from '../lib/currency'
import { formatMoney } from '../lib/currency'

/** Illustrative uplift on base subscription — confirmed in written offer */
export function addonPriceHint(baseMonthly: number, pctLow: number, pctHigh: number, currency: Currency): string {
  const low = Math.round(baseMonthly * (pctLow / 100))
  const high = Math.round(baseMonthly * (pctHigh / 100))
  return `+${formatMoney(low, currency)}–${formatMoney(high, currency)}/mo on base`
}

export const ADDON_HINTS = {
  always: { pctLow: 35, pctHigh: 60, label: '24/7 continuous cleaning' },
  bath: { pctLow: 15, pctHigh: 30, label: 'Always-Clean Bathrooms' },
  spill: { pctLow: 5, pctHigh: 15, label: 'Emergency spill response' },
  deep: { pctLow: 10, pctHigh: 20, label: 'Weekend deep clean' },
} as const
