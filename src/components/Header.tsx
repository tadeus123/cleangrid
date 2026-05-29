import { useState } from 'react'
import { CTAButtons } from './CTAButtons'

const navLinks = [
  { href: '#calculator', label: 'Savings' },
  { href: '#how', label: 'How it works' },
  { href: '#proof', label: 'Reports' },
  { href: '#buildings', label: 'Buildings' },
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
            <path stroke="#14b8a6" strokeWidth="1" opacity="0.5" d="M14 10h4M10 14v4M22 14v4M14 22h4" />
          </svg>
          <span className="text-lg font-semibold tracking-tight text-white">CleanGrid</span>
        </a>

        <nav className="hidden items-center gap-6 text-sm text-slate-muted lg:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <CTAButtons compact />
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-white lg:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? (
            <span className="text-2xl leading-none">×</span>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-graphite px-6 py-6 lg:hidden">
          <nav className="flex flex-col gap-4 text-sm text-slate-muted">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-medium text-white"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <CTAButtons className="mt-6 flex-col [&_a]:w-full" compact />
        </div>
      )}
    </header>
  )
}
