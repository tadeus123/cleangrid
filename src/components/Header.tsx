import { useState } from 'react'
import { CTAButtons } from './CTAButtons'

const navLinks = [
  { href: '#calculator', label: 'Savings' },
  { href: '#how', label: 'How it works' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-graphite/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none" aria-hidden>
            <path stroke="#14b8a6" strokeWidth="1.5" d="M6 6h8v8H6zM18 6h8v8h-8zM6 18h8v8H6zM18 18h8v8h-8z" />
          </svg>
          <span className="text-lg font-semibold text-white">CleanGrid</span>
        </a>

        <nav className="hidden gap-8 text-sm text-slate-muted lg:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <CTAButtons compact primary="upload" />
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-white lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? '×' : '☰'}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-white" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
          </nav>
          <CTAButtons className="mt-4" compact primary="upload" />
        </div>
      )}
    </header>
  )
}
