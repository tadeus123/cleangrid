import { useState } from 'react'
import { submitLead } from '../lib/submitLead'

export function SiteScan() {
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    const result = await submitLead({
      type: 'site-scan',
      email,
      company,
      name,
      phone: phone || undefined,
      country: country || undefined,
      message: message || 'Site scan request',
    })
    setStatus(result.ok ? 'done' : 'error')
    setFeedback(result.message)
  }

  return (
    <section id="site-scan" className="section-anchor bg-gray-50 py-20">
      <div className="mx-auto max-w-xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-graphite">Book a site scan</h2>
        <p className="mt-4 text-center text-slate-muted">
          On-site or remote walkthrough. We map zones, access, schedule, and return a written CleanGrid
          offer within 1 business day.
        </p>
        <form onSubmit={handleSubmit} className="mt-10 space-y-4 rounded-xl border border-gray-200 bg-white p-8">
          <input
            type="text"
            required
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-gray-200 px-4 py-2.5 text-sm"
          />
          <input
            type="email"
            required
            placeholder="Work email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-200 px-4 py-2.5 text-sm"
          />
          <input
            type="text"
            required
            placeholder="Company / building"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full rounded-md border border-gray-200 px-4 py-2.5 text-sm"
          />
          <input
            type="tel"
            placeholder="Phone (optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-md border border-gray-200 px-4 py-2.5 text-sm"
          />
          <input
            type="text"
            placeholder="Country / city"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full rounded-md border border-gray-200 px-4 py-2.5 text-sm"
          />
          <textarea
            placeholder="Building size, type, or questions (optional)"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-md border border-gray-200 px-4 py-2.5 text-sm"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full rounded-md bg-graphite py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            {status === 'loading' ? 'Booking…' : 'Request site scan'}
          </button>
          {feedback && (
            <p className={`text-sm ${status === 'error' ? 'text-red-600' : 'text-accent-dim'}`}>
              {feedback}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
