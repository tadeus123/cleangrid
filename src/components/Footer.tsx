import { WHATSAPP_CHAT_URL, WHATSAPP_DISPLAY } from '../constants/contact'

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-graphite py-12 pb-24 md:pb-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-lg font-semibold text-white">CleanGrid</p>
            <p className="mt-2 text-sm text-slate-muted">Fully managed robotic cleaning for large buildings.</p>
          </div>
          <div>
            <p className="text-sm font-medium text-white">Contact</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-muted">
              <li>
                <a
                  href={WHATSAPP_CHAT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-accent"
                >
                  WhatsApp {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>
                <a href="mailto:privacy@cleangrid.com" className="hover:text-accent">
                  Privacy (legal only)
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-white">Site</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-muted">
              <li>
                <a href="#calculator" className="hover:text-accent">
                  Savings calculator
                </a>
              </li>
              <li>
                <a href="#upload" className="hover:text-accent">
                  Upload bill
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-accent">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-accent">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-10 border-t border-white/10 pt-8 text-center text-xs text-slate-muted">
          © {new Date().getFullYear()} CleanGrid. Pay 10% of today&apos;s cleaning spend · save 90%.
        </p>
      </div>
    </footer>
  )
}
