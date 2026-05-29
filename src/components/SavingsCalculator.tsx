import { useMemo, useState } from 'react'
import { CTAButtons } from './CTAButtons'
import { CurrencySelect } from './CurrencySelect'
import { useCurrency } from '../context/CurrencyContext'
import { formatMoney, parseMoneyInput, BENCHMARK_PER_1000_SQM } from '../lib/currency'
import { submitLead } from '../lib/submitLead'

export function SavingsCalculator() {
  const { currency } = useCurrency()
  const [monthly, setMonthly] = useState(50000)
  const [inputValue, setInputValue] = useState('50000')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [buildingType, setBuildingType] = useState('')
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
    const clamped = Math.min(500000, Math.max(1000, n))
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
      buildingType: buildingType || undefined,
      monthlyBill: monthly,
      currency,
      message: `Calculator lead — CleanGrid est. ${formatMoney(cleanGrid, currency)}/mo, saves ${formatMoney(yearlySave, currency)}/yr`,
    })
    setLeadStatus(result.ok ? 'done' : 'error')
    setLeadMessage(result.message)
  }

  return (
    <section id="calculator" className="section-anchor border-y border-white/5 bg-graphite-light py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Upload your cleaning bill. Your price is 10% of what you pay today.
            </h2>
            <p className="mt-4 text-slate-muted">
              Your current invoice is the anchor. CleanGrid subscription = 10% of that amount. Same
              building — higher agreed standard, shorter cleaning window, fully managed by us.
            </p>
            <p className="mt-4 text-sm text-slate-muted">
              Benchmark reference: from {formatMoney(BENCHMARK_PER_1000_SQM[currency], currency)} per
              1,000 m² per scheduled visit (final quote after site scan).
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-graphite p-8 report-glow">
            <div className="mb-6 flex items-center justify-between gap-4">
              <label htmlFor="monthly-cost" className="text-sm font-medium text-slate-muted">
                Current monthly cleaning bill
              </label>
              <CurrencySelect />
            </div>

            <input
              id="monthly-cost"
              type="number"
              min={1000}
              max={500000}
              step={500}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value)
                syncMonthly(parseMoneyInput(e.target.value))
              }}
              className="w-full rounded-md border border-white/15 bg-graphite-light px-4 py-3 text-2xl font-bold text-white"
            />

            <input
              type="range"
              min={5000}
              max={500000}
              step={5000}
              value={monthly}
              onChange={(e) => syncMonthly(Number(e.target.value))}
              className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10"
              aria-label="Adjust monthly cleaning bill"
            />

            <div className="mt-8 space-y-4 border-t border-white/10 pt-8">
              <div className="flex justify-between gap-4">
                <span className="text-slate-muted">CleanGrid estimated price</span>
                <span className="text-xl font-semibold text-accent">
                  {formatMoney(cleanGrid, currency)}/mo
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-muted">You save per month (90%)</span>
                <span className="font-semibold text-white">{formatMoney(monthlySave, currency)}</span>
              </div>
              <div className="flex justify-between rounded-lg bg-accent/10 px-4 py-3">
                <span className="font-medium text-white">Estimated yearly savings</span>
                <span className="text-xl font-bold text-accent">{formatMoney(yearlySave, currency)}</span>
              </div>
              <div className="rounded-lg border border-white/10 px-4 py-3 text-xs text-slate-muted">
                <strong className="text-white">Performance target (contract):</strong> 2× agreed
                cleanliness standard · cleaning completed in ~50% of today&apos;s window · night service
                standard
              </div>
            </div>

            <form onSubmit={handleLeadSubmit} className="mt-8 space-y-3 border-t border-white/10 pt-8">
              <p className="text-sm font-medium text-white">Email me this estimate</p>
              <input
                type="email"
                required
                placeholder="Work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-white/15 bg-graphite-light px-4 py-2.5 text-sm text-white placeholder:text-slate-muted"
              />
              <input
                type="text"
                required
                placeholder="Company / building name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full rounded-md border border-white/15 bg-graphite-light px-4 py-2.5 text-sm text-white placeholder:text-slate-muted"
              />
              <select
                value={buildingType}
                onChange={(e) => setBuildingType(e.target.value)}
                className="w-full rounded-md border border-white/15 bg-graphite-light px-4 py-2.5 text-sm text-white"
              >
                <option value="">Building type (optional)</option>
                <option value="office">Office</option>
                <option value="school">School / university</option>
                <option value="factory">Factory / industrial</option>
                <option value="hotel">Hotel</option>
                <option value="warehouse">Warehouse</option>
                <option value="hospital">Hospital / healthcare</option>
                <option value="airport">Airport / transport</option>
                <option value="other">Other</option>
              </select>
              <button
                type="submit"
                disabled={leadStatus === 'loading'}
                className="w-full rounded-md bg-accent py-3 text-sm font-semibold text-graphite disabled:opacity-60"
              >
                {leadStatus === 'loading' ? 'Sending…' : 'Send estimate to my inbox'}
              </button>
              {leadMessage && (
                <p className={`text-sm ${leadStatus === 'error' ? 'text-red-400' : 'text-accent'}`}>
                  {leadMessage}
                </p>
              )}
            </form>

            <CTAButtons className="mt-6" primary="upload" />
          </div>
        </div>
      </div>
    </section>
  )
}
