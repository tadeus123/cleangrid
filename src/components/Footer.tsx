export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-graphite py-12 pb-24 md:pb-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-lg font-semibold text-white">CleanGrid</p>
            <p className="mt-2 text-sm text-slate-muted">
              The robotic cleanliness layer for large buildings.
              <br />
              Cleaner buildings. Lower costs. Fully operated by us.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-white">Contact</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-muted">
              <li>
                <a href="mailto:sales@cleangrid.com" className="hover:text-accent">
                  sales@cleangrid.com
                </a>
              </li>
              <li>
                <a href="mailto:privacy@cleangrid.com" className="hover:text-accent">
                  privacy@cleangrid.com
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
                <a href="#site-scan" className="hover:text-accent">
                  Book site scan
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
