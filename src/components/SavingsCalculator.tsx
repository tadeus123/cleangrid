import { useMemo, useState } from 'react'
import { CurrencySelect } from './CurrencySelect'
import { useCurrency } from '../context/CurrencyContext'
import { formatMoney, parseMoneyInput } from '../lib/currency'
import { submitLead } from '../lib/submitLead'
import { PrivacyMicro } from './PrivacyMicro'
import { MIN_MONTHLY_BILL } from '../constants/eligibility'

const SLIDER_MIN = 5_000
const SLIDER_MAX = 500_000

export function SavingsCalculator() {
  const { currency } = useCurrency()
  const [monthly, setMonthly] = useState(50000)
  const [inputValue, setInputValue] = useState('50000')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [leadStatus, setLeadStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [leadMessage, setLeadMessage] = useState('')

  const { cleanGrid, monthlySave, yearlySave } = useMemo(() => {
    const cleanGrid = Math.round(monthly * 0.1)
    return {
      cleanGrid,
      monthlySave: monthly - cleanGrid,
      yearlySave: (monthly - cleanGrid) * 12,
    }
  }, [monthly])

  const syncMonthly = (n: number) => {
    const clamped = Math.min(SLIDER_MAX, Math.max(SLIDER_MIN, n))
    setMonthly(clamped)
    setInputValue(String(clamped))
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !company) return
    setLeadStatus('loading')
    const result = await submitLead({
      type: 'calculator',
      email,
      company,
      monthlyBill: monthly,
      currency,
      message: `CleanGrid ${formatMoney(cleanGrid, currency)}/mo · save ${formatMoney(yearlySave, currency)}/yr`,
    })
    setLeadStatus(result.ok ? 'done' : 'error')
    setLeadMessage(result.message)
  }

  return (
    <section id="calculator" className="section-anchor border-y border-white/5 bg-graphite-light py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-white md:text-4xl">
          Your CleanGrid price = 10% of this number
        </h2>

        <div className="mt-10 rounded-xl border border-white/10 bg-graphite p-8 report-glow">
          <div className="mb-4 flex items-center justify-between gap-4">
            <label htmlFor="monthly-cost" className="text-sm font-medium text-white">
              Current monthly cleaning bill
            </label>
            <CurrencySelect />
          </div>

          <input
            id="monthly-cost"
            type="number"
            min={SLIDER_MIN}
            max={SLIDER_MAX}
            step={500}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
              syncMonthly(parseMoneyInput(e.target.value))
            }}
            className="w-full rounded-md border border-white/15 bg-graphite-light px-4 py-3 text-3xl font-bold text-white"
          />

          <input
            type="range"
            min={SLIDER_MIN}
            max={SLIDER_MAX}
            step={5000}
            value={monthly}
            onChange={(e) => syncMonthly(Number(e.target.value))}
            className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10"
            aria-label="Adjust monthly cleaning bill"
          />
          <div className="mt-1 flex justify-between text-xs text-slate-muted">
            <span>{formatMoney(SLIDER_MIN, currency)}</span>
            <span>{formatMoney(SLIDER_MAX, currency)}</span>
          </div>

          <div className="mt-8 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
            <div>
              <p className="text-xs text-slate-muted">CleanGrid</p>
              <p className="text-2xl font-bold text-accent">{formatMoney(cleanGrid, currency)}/mo</p>
            </div>
            <div>
              <p className="text-xs text-slate-muted">You save / month</p>
              <p className="text-2xl font-bold text-white">{formatMoney(monthlySave, currency)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-muted">You save / year</p>
              <p className="text-2xl font-bold text-white">{formatMoney(yearlySave, currency)}</p>
            </div>
          </div>

          {monthly < MIN_MONTHLY_BILL[currency] && (
            <p className="mt-4 text-xs text-amber-300/90">
              Typical sites spend {formatMoney(MIN_MONTHLY_BILL[currency], currency)}+/month — contact us if
              you&apos;re close.
            </p>
          )}

          <form onSubmit={handleLeadSubmit} className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row">
            <input
              type="email"
              required
              placeholder="Work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-md border border-white/15 bg-graphite-light px-4 py-2.5 text-sm text-white"
            />
            <input
              type="text"
              required
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="flex-1 rounded-md border border-white/15 bg-graphite-light px-4 py-2.5 text-sm text-white"
            />
            <button
              type="submit"
              disabled={leadStatus === 'loading'}
              className="rounded-md bg-accent px-6 py-2.5 text-sm font-semibold text-graphite disabled:opacity-60"
            >
              {leadStatus === 'loading' ? '…' : 'Email estimate'}
            </button>
          </form>
          {leadMessage && (
            <p className={`mt-3 text-sm ${leadStatus === 'error' ? 'text-red-400' : 'text-accent'}`}>
              {leadMessage}
            </p>
          )}
          <PrivacyMicro dark />
        </div>

      </div>
    </section>
  )
}
