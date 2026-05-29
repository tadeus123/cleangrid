import { CTAButtons } from './CTAButtons'

export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-graphite/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2">
          <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none" aria-hidden>
            <path
              stroke="#14b8a6"
              strokeWidth="1.5"
              d="M6 6h8v8H6zM18 6h8v8h-8zM6 18h8v8H6zM18 18h8v8h-8z"
            />
            <path stroke="#14b8a6" strokeWidth="1" opacity="0.5" d="M14 10h4M10 14v4M22 14v4M14 22h4" />
          </svg>
          <span className="text-lg font-semibold tracking-tight text-white">CleanGrid</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-slate-muted md:flex">
          <a href="#how" className="transition hover:text-white">
            How it works
          </a>
          <a href="#buildings" className="transition hover:text-white">
            Buildings
          </a>
          <a href="#pricing" className="transition hover:text-white">
            Pricing
          </a>
          <a href="#faq" className="transition hover:text-white">
            FAQ
          </a>
        </nav>
        <div className="hidden sm:block">
          <CTAButtons className="!gap-2 [&_a]:px-4 [&_a]:py-2 [&_a]:text-xs" />
        </div>
      </div>
    </header>
  )
}
