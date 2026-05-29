import { WHATSAPP_CHAT_URL, WHATSAPP_DISPLAY } from '../constants/contact'

const items = [
  'Approved zones only · sensitive areas excluded',
  'Liability & insurance in contract',
  'Human escalation · SLA credits',
  'GDPR-aligned data options',
]

export function Trust() {
  return (
    <section className="bg-graphite py-16">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-2xl font-bold text-white">Security & trust</h2>
        <ul className="mt-8 flex flex-wrap justify-center gap-4">
          {items.map((item) => (
            <li
              key={item}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-muted"
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-slate-muted">
          Questions?{' '}
          <a
            href={WHATSAPP_CHAT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline hover:text-teal-300"
          >
            WhatsApp {WHATSAPP_DISPLAY}
          </a>
        </p>
      </div>
    </section>
  )
}
