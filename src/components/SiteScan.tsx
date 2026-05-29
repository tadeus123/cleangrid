import { useState } from 'react'
import { submitLead } from '../lib/leads'
import { PrivacyMicro } from './PrivacyMicro'

export function SiteScan() {
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [name, setName] = useState('')
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
      message: 'Site scan request',
    })
    setStatus(result.ok ? 'done' : 'error')
    setFeedback(result.message)
  }

  return (
    <section id="site-scan" className="section-anchor bg-gray-50 py-16">
      <div className="mx-auto max-w-md px-6">
        <h2 className="text-center text-2xl font-bold text-graphite">Book a site scan</h2>
        <p className="mt-2 text-center text-sm text-slate-muted">Written quote within 1 business day.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-3">
          <input
            type="text"
            required
            placeholder="Name"
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
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full rounded-md bg-graphite py-3 text-sm font-semibold text-white"
          >
            {status === 'loading' ? '…' : 'Request scan'}
          </button>
          {feedback && <p className="text-sm text-accent-dim">{feedback}</p>}
          <PrivacyMicro />
        </form>
      </div>
    </section>
  )
}
