import { useState } from 'react'

const faqs = [
  {
    q: 'Do we buy the robots?',
    a: 'No. We own and operate the fleet. You subscribe to cleanliness.',
  },
  {
    q: 'What buildings qualify?',
    a: 'Usually 5,000+ m² or €10k+ / $11k+ / £8.5k+ monthly cleaning spend.',
  },
  {
    q: 'How is pricing set?',
    a: '10% of your current cleaning invoice after we validate scope on a site scan.',
  },
  {
    q: 'What if cleaning misses the standard?',
    a: 'SLA credits or remediation per contract — you don\'t pay for failed shifts.',
  },
  {
    q: 'How long until go-live?',
    a: 'Typically 4–12 weeks from contract: scan, install, supervised first runs.',
  },
  {
    q: 'Can robots clean at night?',
    a: 'Yes — that\'s the default. 24/7 is available as an add-on.',
  },
  {
    q: 'Privacy and cameras?',
    a: 'Zones and data rules agreed before deployment. GDPR options for EU sites.',
  },
  {
    q: 'Contact',
    a: 'WhatsApp +49 176 44429908 — we reply within 1 business day on quotes.',
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="section-anchor bg-gray-50 py-16">
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="text-center text-2xl font-bold text-graphite">FAQ</h2>
        <div className="mt-8 divide-y divide-gray-200 border-y border-gray-200">
          {faqs.map((faq, i) => (
            <div key={faq.q}>
              <button
                type="button"
                className="flex w-full justify-between py-4 text-left font-medium text-graphite"
                onClick={() => setOpen(open === i ? null : i)}
              >
                {faq.q}
                <span className="text-accent">{open === i ? '−' : '+'}</span>
              </button>
              {open === i && <p className="pb-4 text-sm text-slate-muted">{faq.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
