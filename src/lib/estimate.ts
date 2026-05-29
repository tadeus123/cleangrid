import type { Currency } from './currency'
import { formatMoney } from './currency'

export type BuildingUse =
  | 'office'
  | 'school'
  | 'factory'
  | 'hotel'
  | 'warehouse'
  | 'retail'
  | 'other'

/** Share of footprint that is cleanable per floor */
const CLEANABLE_FACTOR: Record<BuildingUse, number> = {
  office: 0.75,
  school: 0.8,
  factory: 0.7,
  hotel: 0.85,
  warehouse: 0.92,
  retail: 0.8,
  other: 0.75,
}

/** Traditional cleaning €/m² cleanable / month (EU benchmark band) */
const RATE_LOW_EUR: Record<BuildingUse, number> = {
  office: 1.8,
  school: 2.0,
  factory: 2.4,
  hotel: 2.4,
  warehouse: 1.1,
  retail: 2.0,
  other: 2.0,
}

const RATE_HIGH_EUR: Record<BuildingUse, number> = {
  office: 3.2,
  school: 3.6,
  factory: 4.8,
  hotel: 4.2,
  warehouse: 2.4,
  retail: 3.4,
  other: 3.5,
}

const FX: Record<Currency, number> = { EUR: 1, USD: 1.09, GBP: 0.86 }

export type EstimateInput = {
  footprintSqm: number
  floors: number
  buildingUse: BuildingUse
  currency: Currency
  source: 'osm' | 'default'
}

export type EstimateResult = {
  footprintSqm: number
  floors: number
  cleanableSqm: number
  buildingUse: BuildingUse
  traditionalLow: number
  traditionalHigh: number
  cleanGridLow: number
  cleanGridHigh: number
  saveLow: number
  saveHigh: number
  formatted: {
    traditional: string
    cleanGrid: string
    save: string
  }
}

export function inferUseFromOsm(tags: Record<string, string> | undefined): BuildingUse {
  if (!tags) return 'office'
  const b = (tags.building ?? tags['building:use'] ?? '').toLowerCase()
  if (b.includes('school') || b.includes('university') || b.includes('college')) return 'school'
  if (b.includes('industrial') || b.includes('factory') || b.includes('warehouse')) {
    return b.includes('warehouse') ? 'warehouse' : 'factory'
  }
  if (b.includes('hotel') || b.includes('hospital')) return 'hotel'
  if (b.includes('retail') || b.includes('commercial')) return 'retail'
  if (b.includes('office') || b.includes('civic') || b.includes('public')) return 'office'
  return 'other'
}

export function inferFloorsFromOsm(tags: Record<string, string> | undefined, footprintSqm: number): number {
  const levels = tags?.['building:levels'] ?? tags?.levels
  if (levels) {
    const n = parseInt(levels, 10)
    if (n > 0 && n < 120) return n
  }
  const height = tags?.height ? parseFloat(tags.height) : NaN
  if (Number.isFinite(height) && height > 3) {
    return Math.max(1, Math.min(60, Math.round(height / 3.2)))
  }
  if (footprintSqm > 25000) return 4
  if (footprintSqm > 8000) return 6
  if (footprintSqm > 2000) return 4
  return 3
}

export function computeEstimate(input: EstimateInput): EstimateResult {
  const { footprintSqm, floors, buildingUse, currency } = input
  const fx = FX[currency]
  const cleanableSqm = Math.round(footprintSqm * floors * CLEANABLE_FACTOR[buildingUse])
  const traditionalLow = Math.round(cleanableSqm * RATE_LOW_EUR[buildingUse] * fx)
  const traditionalHigh = Math.round(cleanableSqm * RATE_HIGH_EUR[buildingUse] * fx)
  const cleanGridLow = Math.round(traditionalLow * 0.1)
  const cleanGridHigh = Math.round(traditionalHigh * 0.1)
  const saveLow = traditionalLow - cleanGridHigh
  const saveHigh = traditionalHigh - cleanGridLow

  return {
    footprintSqm,
    floors,
    cleanableSqm,
    buildingUse,
    traditionalLow,
    traditionalHigh,
    cleanGridLow,
    cleanGridHigh,
    saveLow,
    saveHigh,
    formatted: {
      traditional: `${formatMoney(traditionalLow, currency)} – ${formatMoney(traditionalHigh, currency)}`,
      cleanGrid: `${formatMoney(cleanGridLow, currency)} – ${formatMoney(cleanGridHigh, currency)}`,
      save: `${formatMoney(saveLow, currency)} – ${formatMoney(saveHigh, currency)}`,
    },
  }
}

export function applyAiRange(
  det: EstimateResult,
  currency: Currency,
  ai: {
    monthlyTraditionalLow: number
    monthlyTraditionalHigh: number
    cleanGridLow?: number
    cleanGridHigh?: number
  },
): EstimateResult {
  const traditionalLow = ai.monthlyTraditionalLow
  const traditionalHigh = ai.monthlyTraditionalHigh
  const cleanGridLow = ai.cleanGridLow ?? Math.round(traditionalLow * 0.1)
  const cleanGridHigh = ai.cleanGridHigh ?? Math.round(traditionalHigh * 0.1)
  const saveLow = traditionalLow - cleanGridHigh
  const saveHigh = traditionalHigh - cleanGridLow
  return {
    ...det,
    traditionalLow,
    traditionalHigh,
    cleanGridLow,
    cleanGridHigh,
    saveLow,
    saveHigh,
    formatted: {
      traditional: `${formatMoney(traditionalLow, currency)} – ${formatMoney(traditionalHigh, currency)}`,
      cleanGrid: `${formatMoney(cleanGridLow, currency)} – ${formatMoney(cleanGridHigh, currency)}`,
      save: `${formatMoney(saveLow, currency)} – ${formatMoney(saveHigh, currency)}`,
    },
  }
}
