import { useState } from 'react'

const faqs = [
  {
    q: 'Do we need to buy the robots?',
    a: 'No. CleanGrid owns and operates the fleet. You subscribe to a cleanliness outcome — not hardware.',
  },
  {
    q: 'What happens if a robot breaks?',
    a: 'We repair or replace it. Maintenance and replacement robots are included in your subscription.',
  },
  {
    q: 'Can the robots clean at night?',
    a: 'Yes. Night cleaning is the default model. Robots work when the building is empty or low-traffic.',
  },
  {
    q: 'Can the robots clean bathrooms?',
    a: 'Yes, for sites configured for full-building cleaning. CleanGrid Bath offers continuous bathroom refresh as a premium add-on.',
  },
  {
    q: 'Do we pay if the building is not clean enough?',
    a: 'Your subscription is tied to agreed cleanliness standards. We document every shift — you see proof, not promises.',
  },
  {
    q: 'What about cameras, privacy, and data?',
    a: 'Cleaning zones, camera use, and data handling are defined in your contract before deployment. Sensitive areas can be excluded.',
  },
  {
    q: 'How is pricing calculated?',
    a: 'Upload your current cleaning invoice. CleanGrid price is typically 10% of that amount. Alternatively, from €99 per 1,000 m² per clean.',
  },
  {
    q: 'Can we cancel?',
    a: 'Contracts typically run 24–36 months to cover deployment and fleet costs. Terms are clear in your final offer.',
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-graphite">FAQ</h2>
        <p className="mx-auto mt-4 max-w-lg text-center text-slate-muted">
          The questions facility managers ask first.
        </p>
        <div className="mt-12 divide-y divide-gray-200 border-y border-gray-200">
          {faqs.map((faq, i) => (
            <div key={faq.q}>
              <button
                type="button"
                className="flex w-full items-center justify-between py-5 text-left font-medium text-graphite"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                {faq.q}
                <span className="ml-4 text-accent">{open === i ? '−' : '+'}</span>
              </button>
              {open === i && <p className="pb-5 text-sm leading-relaxed text-slate-muted">{faq.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
