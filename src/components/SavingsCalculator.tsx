import { useMemo, useState } from 'react'
import { CurrencySelect } from './CurrencySelect'
import { useCurrency } from '../context/CurrencyContext'
import { formatMoney, parseMoneyInput } from '../lib/currency'
import { submitLead } from '../lib/leads'
import { PrivacyMicro } from './PrivacyMicro'

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

  const applyTypedAmount = (raw: string) => {
    setInputValue(raw)
    if (raw.trim() === '') {
      setMonthly(0)
      return
    }
    setMonthly(Math.max(0, parseMoneyInput(raw)))
  }

  const sliderValue = Math.min(SLIDER_MAX, Math.max(SLIDER_MIN, monthly))

  const handleSliderChange = (n: number) => {
    setMonthly(n)
    setInputValue(String(n))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!company.trim()) return
    setLeadStatus('loading')
    setLeadMessage('')

    try {
      const { downloadSavingsPdf } = await import('../lib/generateSavingsPdf')
      downloadSavingsPdf({
        company: company.trim(),
        email: email.trim() || undefined,
        currency,
        monthlyCurrent: monthly,
        monthlyCleanGrid: cleanGrid,
        monthlySave,
        yearlySave,
      })
    } catch {
      setLeadStatus('error')
      setLeadMessage('Could not create PDF. Try again or contact us on WhatsApp.')
      return
    }

    let message = 'PDF downloaded — share it with your team.'

    if (email.trim()) {
      const result = await submitLead({
        type: 'calculator',
        email: email.trim(),
        company: company.trim(),
        monthlyBill: monthly,
        monthlyCleanGrid: cleanGrid,
        monthlySavings: monthlySave,
        yearlySavings: yearlySave,
        currency,
      })
      if (result.ok) {
        message += ' We received your details and will follow up within 1 business day.'
      } else {
        message += ` ${result.message}`
      }
    }

    setLeadStatus('done')
    setLeadMessage(message)
  }

  return (
    <section id="calculator" className="section-anchor border-y border-white/5 bg-graphite-light py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-white md:text-4xl">
          Build your savings report
        </h2>
        <p className="mt-3 text-center text-sm text-slate-muted">
          Download a branded PDF to share with finance and facilities — current spend vs CleanGrid.
        </p>

        <div className="mt-10 rounded-xl border border-white/10 bg-graphite p-8 report-glow">
          <div className="mb-4 flex items-center justify-between gap-4">
            <label htmlFor="monthly-cost" className="text-sm font-medium text-white">
              Current monthly cleaning bill
            </label>
            <CurrencySelect />
          </div>

          <input
            id="monthly-cost"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="Enter monthly bill"
            value={inputValue}
            onChange={(e) => applyTypedAmount(e.target.value)}
            className="w-full rounded-md border border-white/15 bg-graphite-light px-4 py-3 text-3xl font-bold text-white"
          />

          <input
            type="range"
            min={SLIDER_MIN}
            max={SLIDER_MAX}
            step={5000}
            value={sliderValue}
            onChange={(e) => handleSliderChange(Number(e.target.value))}
            className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10"
            aria-label="Quick adjust (optional)"
          />
          <p className="mt-1 text-center text-xs text-slate-muted">
            Slider is a quick guide · type any amount above
          </p>

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

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row">
            <input
              type="text"
              required
              placeholder="Company / building"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="flex-1 rounded-md border border-white/15 bg-graphite-light px-4 py-2.5 text-sm text-white"
            />
            <input
              type="email"
              placeholder="Work email (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-md border border-white/15 bg-graphite-light px-4 py-2.5 text-sm text-white"
            />
            <button
              type="submit"
              disabled={leadStatus === 'loading'}
              className="rounded-md bg-accent px-6 py-2.5 text-sm font-semibold text-graphite disabled:opacity-60"
            >
              {leadStatus === 'loading' ? '…' : 'Download PDF report'}
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
