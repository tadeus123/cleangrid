import { useState } from 'react'
import { CTAButtons } from './CTAButtons'
import { CurrencySelect } from './CurrencySelect'
import { useCurrency } from '../context/CurrencyContext'
import { formatMoney, parseMoneyInput } from '../lib/currency'
import { fileToBase64, submitLead } from '../lib/submitLead'
import { EligibilityBanner } from './EligibilityBanner'
import { PrivacyMicro } from './PrivacyMicro'

const BUILDING_TYPES = [
  'Office',
  'School / university',
  'Factory / industrial',
  'Hotel',
  'Warehouse',
  'Hospital / healthcare',
  'Airport / transport',
  'Public building',
  'Other',
]

export function UploadSection() {
  const { currency } = useCurrency()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [buildingType, setBuildingType] = useState('')
  const [country, setCountry] = useState('')
  const [areaSqm, setAreaSqm] = useState('')
  const [monthlyBill, setMonthlyBill] = useState('')
  const [contractEnd, setContractEnd] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')

  const billNum = parseMoneyInput(monthlyBill)
  const estimated = billNum > 0 ? Math.round(billNum * 0.1) : 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !company) return
    setStatus('loading')

    let fileBase64: string | undefined
    if (file) {
      if (file.size > 25 * 1024 * 1024) {
        setStatus('error')
        setFeedback('File must be under 25 MB.')
        return
      }
      fileBase64 = await fileToBase64(file)
    }

    const result = await submitLead({
      type: 'quote',
      email,
      company,
      name: name || undefined,
      phone: phone || undefined,
      buildingType: buildingType || undefined,
      country: country || undefined,
      cleanableAreaSqm: areaSqm ? parseMoneyInput(areaSqm) : undefined,
      monthlyBill: billNum || undefined,
      currency,
      message: contractEnd ? `Current contract ends: ${contractEnd}` : undefined,
      fileName: file?.name,
      fileBase64,
    })

    setStatus(result.ok ? 'done' : 'error')
    setFeedback(result.message)
    if (result.ok) setStep(4)
  }

  if (status === 'done' || step === 4) {
    return (
      <section id="upload" className="section-anchor border-t border-white/5 bg-graphite py-24">
        <div className="mx-auto max-w-lg px-6 text-center">
          <div className="rounded-xl border border-accent/30 bg-accent/10 p-10">
            <p className="text-2xl font-bold text-white">Request received</p>
            <p className="mt-4 text-slate-muted">{feedback}</p>
            <p className="mt-4 text-sm text-slate-muted">
              Questions? Email{' '}
              <a href="mailto:sales@cleangrid.com" className="text-accent underline">
                sales@cleangrid.com
              </a>
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="upload" className="section-anchor border-t border-white/5 bg-graphite py-24 pb-32 md:pb-24">
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-white md:text-4xl">
          Pay 10% of today&apos;s cleaning bill. Save 90%.
        </h2>
        <p className="mt-6 text-center text-lg text-slate-muted">
          We don&apos;t sell robots. We sell cleaner buildings for less — fully managed.
        </p>
        <EligibilityBanner className="mt-4 text-center" dark />

        <div className="mt-8 flex justify-center gap-2 text-xs text-slate-muted">
          {['Contact', 'Building', 'Bill & file'].map((label, i) => (
            <span
              key={label}
              className={`rounded-full px-3 py-1 ${step === i + 1 ? 'bg-accent/20 text-accent' : ''}`}
            >
              {i + 1}. {label}
            </span>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 rounded-xl border border-white/10 bg-graphite-light p-8"
        >
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-sm font-medium text-white">Step 1 — Your details</p>
              <input
                type="text"
                required
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-white/15 bg-graphite px-4 py-2.5 text-sm text-white"
              />
              <input
                type="email"
                required
                placeholder="Work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-white/15 bg-graphite px-4 py-2.5 text-sm text-white"
              />
              <input
                type="text"
                required
                placeholder="Company / building name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full rounded-md border border-white/15 bg-graphite px-4 py-2.5 text-sm text-white"
              />
              <input
                type="tel"
                placeholder="Phone (optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-md border border-white/15 bg-graphite px-4 py-2.5 text-sm text-white"
              />
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full rounded-md bg-accent py-3 text-sm font-semibold text-graphite"
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <p className="text-sm font-medium text-white">Step 2 — Building</p>
              <select
                required
                value={buildingType}
                onChange={(e) => setBuildingType(e.target.value)}
                className="w-full rounded-md border border-white/15 bg-graphite px-4 py-2.5 text-sm text-white"
              >
                <option value="">Building type</option>
                {BUILDING_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Country / city"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full rounded-md border border-white/15 bg-graphite px-4 py-2.5 text-sm text-white"
              />
              <input
                type="number"
                placeholder="Cleanable area (m², optional)"
                value={areaSqm}
                onChange={(e) => setAreaSqm(e.target.value)}
                className="w-full rounded-md border border-white/15 bg-graphite px-4 py-2.5 text-sm text-white"
              />
              <input
                type="text"
                placeholder="Current contract end date (optional)"
                value={contractEnd}
                onChange={(e) => setContractEnd(e.target.value)}
                className="w-full rounded-md border border-white/15 bg-graphite px-4 py-2.5 text-sm text-white"
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 rounded-md border border-white/20 py-3 text-sm text-white"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 rounded-md bg-accent py-3 text-sm font-semibold text-graphite"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <p className="text-sm font-medium text-white">Step 3 — Current cleaning spend</p>
              <div className="flex gap-3">
                <input
                  type="number"
                  placeholder="Current monthly cleaning bill"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(e.target.value)}
                  className="flex-1 rounded-md border border-white/15 bg-graphite px-4 py-2.5 text-sm text-white"
                />
                <CurrencySelect />
              </div>
              {estimated > 0 && (
                <p className="rounded-lg bg-accent/10 px-4 py-3 text-sm text-accent">
                  Indicative CleanGrid price: {formatMoney(estimated, currency)}/month (10% of{' '}
                  {formatMoney(billNum, currency)})
                </p>
              )}
              <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
                <PrivacyMicro dark />
              </div>
              <label className="block cursor-pointer rounded-lg border border-dashed border-white/20 p-4">
                <span className="text-sm font-medium text-white">Upload cleaning invoice</span>
                <span className="mt-1 block text-xs text-slate-muted">
                  PDF, DOC, or DOCX · max 25 MB
                </span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf"
                  className="mt-3 w-full text-sm text-slate-muted file:mr-4 file:rounded file:border-0 file:bg-accent file:px-4 file:py-2 file:text-sm file:font-semibold file:text-graphite"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
                {file && <p className="mt-2 text-xs text-accent">{file.name}</p>}
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 rounded-md border border-white/20 py-3 text-sm text-white"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="flex-1 rounded-md bg-accent py-3 text-sm font-semibold text-graphite disabled:opacity-60"
                >
                  {status === 'loading' ? 'Submitting…' : 'Submit for quote'}
                </button>
              </div>
              {feedback && status === 'error' && (
                <p className="text-sm text-red-400">{feedback}</p>
              )}
            </div>
          )}
        </form>

        <p className="mt-6 text-center text-xs text-slate-muted">
          By submitting you agree to our{' '}
          <a href="#privacy" className="text-accent underline">
            Privacy Policy
          </a>
          . Response within 1 business day.
        </p>

        <CTAButtons className="mt-8 justify-center" primary="calculate" />
      </div>
    </section>
  )
}
