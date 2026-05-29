import { useState } from 'react'

const faqs = [
  {
    q: 'Do we need to buy the robots?',
    a: 'No. CleanGrid owns and operates the fleet. You subscribe to an agreed cleanliness standard — not hardware.',
  },
  {
    q: 'What happens if a robot breaks?',
    a: 'We repair or swap the unit within your SLA. Maintenance and replacement robots are included so your schedule continues.',
  },
  {
    q: 'Can the robots clean at night?',
    a: 'Yes. Night cleaning when the building is empty or low-traffic is our default. Daytime zones can be added where approved.',
  },
  {
    q: 'Can the robots clean bathrooms?',
    a: 'Yes, when scoped in your site plan. CleanGrid Bath adds continuous bathroom refresh (e.g. every 30 minutes) as a premium tier.',
  },
  {
    q: 'Do we pay if the building is not clean enough?',
    a: 'No — not for failed shifts. Your contract defines measurable standards. If we miss them, you receive SLA credits or remediation per agreement. You only pay for shifts that meet the standard.',
  },
  {
    q: 'What about cameras, privacy, and data?',
    a: 'Cleaning zones, camera use, retention, and access are agreed before go-live. Sensitive areas can be excluded. We support GDPR-aligned processing for EU sites.',
  },
  {
    q: 'How is pricing calculated?',
    a: 'Primary: 10% of your current monthly cleaning invoice (after we validate scope). Benchmark: from €99 / $108 / £85 per 1,000 m² per scheduled visit depending on currency. You receive the lower applicable written quote after site scan.',
  },
  {
    q: 'Are humanoids deployed today?',
    a: 'We deploy pilot and production fleets by building type and region. Upload your bill or book a scan — we will confirm availability and timeline for your site.',
  },
  {
    q: 'How long until go-live?',
    a: 'Typically 4–12 weeks after contract: site scan, mapping, install, supervised first runs, then nightly service.',
  },
  {
    q: 'What about elevators, doors, and stairs?',
    a: 'Scoped per building during the site scan. Approved routes can include elevators and doors; stairs and restricted zones are configured case by case.',
  },
  {
    q: 'What countries do you serve?',
    a: 'Pilot and rollout in the EU, UK, North America, UAE, and Singapore. Contact us if your country is not listed.',
  },
  {
    q: 'Can we cancel?',
    a: 'Contracts typically run 24–36 months to cover fleet deployment. Early exit terms are defined clearly in your offer.',
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="section-anchor bg-white py-20 pb-28 md:pb-20">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-graphite">FAQ</h2>
        <p className="mx-auto mt-4 max-w-lg text-center text-slate-muted">
          What facility and operations teams ask before the first site scan.
        </p>
        <div className="mt-12 divide-y divide-gray-200 border-y border-gray-200">
          {faqs.map((faq, i) => (
            <div key={faq.q}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-medium text-graphite focus-visible:outline-offset-4"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                {faq.q}
                <span className="shrink-0 text-accent">{open === i ? '−' : '+'}</span>
              </button>
              {open === i && (
                <p className="pb-5 text-sm leading-relaxed text-slate-muted">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
