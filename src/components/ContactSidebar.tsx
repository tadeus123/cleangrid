import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  WHATSAPP_CHAT_URL,
  WHATSAPP_DISPLAY,
  WECHAT_QR_SRC,
  whatsappQrUrl,
} from '../constants/contact'

const PANEL_W = '17.5rem'
const ROW = 'h-[3.5rem]'

function IconQuote({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" strokeLinecap="round" />
      <path d="M9 5a2 2 0 012-2h2a2 2 0 012 2M9 12h6M9 16h4" strokeLinecap="round" />
    </svg>
  )
}

function IconWhatsApp({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function IconWeChat({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-4.657 0-8.432 3.039-8.432 6.787 0 1.45.636 2.794 1.72 3.868a.481.481 0 01.174.543l-.318 1.208a.24.24 0 000 .174.24.24 0 00.237.24c.054 0 .108-.027.136-.054l1.552-.908a.704.704 0 01.585-.08c.96.3 1.997.462 3.046.462 4.657 0 8.432-3.038 8.432-6.786 0-3.748-3.775-6.787-8.432-6.787zm-2.97 3.49c.535 0 .968.44.968.983a.976.976 0 01-.968.984.976.976 0 01-.968-.984c0-.543.433-.983.968-.983zm2.97 0c.535 0 .968.44.968.983a.976.976 0 01-.968.984.976.976 0 01-.968-.984c0-.543.433-.983.968-.983z" />
    </svg>
  )
}

function QrBlock({ label, icon, src, alt }: { label: string; icon: ReactNode; src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-graphite/60">
      <p className="flex items-center gap-2 border-b border-white/8 px-3 py-2 text-[10px] font-medium uppercase tracking-wider text-slate-muted">
        {icon}
        {label}
      </p>
      <div className="flex justify-center bg-white p-3">
        <img src={src} alt={alt} width={120} height={120} className="size-[7.5rem] object-contain" />
      </div>
    </div>
  )
}

function StripIcon({
  children,
  href,
  title,
  className = '',
}: {
  children: ReactNode
  href?: string
  title: string
  className?: string
}) {
  const cell = (
    <span
      className={`flex ${ROW} w-12 shrink-0 items-center justify-center border-b border-white/10 text-accent transition hover:bg-white/[0.06] ${className}`}
    >
      {children}
    </span>
  )
  if (href) {
    return (
      <a href={href} title={title} className="block">
        {cell}
      </a>
    )
  }
  return cell
}

export function ContactSidebar() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div
      ref={rootRef}
      className="fixed right-0 top-1/2 z-50 hidden -translate-y-1/2 md:flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      aria-label="Contact"
    >
      {/* Slide-out panel */}
      <div
        className={`overflow-hidden border border-r-0 border-white/10 bg-graphite-light shadow-2xl transition-[width,opacity] duration-300 ease-out ${
          open ? 'w-[17.5rem] opacity-100' : 'w-0 opacity-0'
        }`}
      >
        <div className={`flex w-[${PANEL_W}] min-w-[17.5rem] flex-col`} style={{ width: PANEL_W }}>
          {/* Aligns with quote icon */}
          <a
            href="#upload"
            className={`${ROW} flex items-center gap-3 border-b border-white/10 px-4 transition hover:bg-white/[0.04]`}
          >
            <IconQuote className="shrink-0 text-accent" />
            <span className="text-sm font-semibold text-white">Get a quote</span>
          </a>

          {/* Aligns with WhatsApp icon */}
          <a
            href={WHATSAPP_CHAT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${ROW} flex flex-col justify-center border-b border-white/10 px-4 transition hover:bg-white/[0.04]`}
          >
            <span className="text-[10px] font-medium uppercase tracking-wider text-slate-muted">WhatsApp</span>
            <span className="text-base font-semibold text-white">{WHATSAPP_DISPLAY}</span>
          </a>

          {/* Middle — beside teal Contact tab; QR codes */}
          <div className="space-y-3 border-b border-white/10 px-3 py-3">
            <QrBlock
              label="Scan · WhatsApp"
              icon={<IconWhatsApp className="h-3.5 w-3.5 text-accent" />}
              src={whatsappQrUrl(140)}
              alt="WhatsApp QR"
            />
            <QrBlock
              label="Scan · WeChat"
              icon={<IconWeChat className="h-3.5 w-3.5 text-accent" />}
              src={WECHAT_QR_SRC}
              alt="WeChat QR"
            />
          </div>

          {/* Spacer row aligns with WeChat icon at bottom */}
          <div className={`${ROW} flex items-center px-4`}>
            <span className="text-xs text-slate-muted">Reply within 1 business day</span>
          </div>
        </div>
      </div>

      {/* Icon strip — quote, WhatsApp, Contact, WeChat */}
      <div className="flex w-12 shrink-0 flex-col overflow-hidden rounded-l-lg border border-white/10 bg-graphite-light shadow-xl">
        <StripIcon href="#upload" title="Get a quote">
          <IconQuote />
        </StripIcon>

        <StripIcon href={WHATSAPP_CHAT_URL} title="WhatsApp">
          <IconWhatsApp />
        </StripIcon>

        {/* Teal Contact tab — sits beside QR section */}
        <div
          className="flex min-h-[11.5rem] flex-1 flex-col items-center justify-center border-b border-white/10 bg-accent px-1 py-4"
          aria-hidden
        >
          <span className="[writing-mode:vertical-rl] rotate-180 text-[10px] font-bold uppercase tracking-[0.2em] text-graphite">
            Contact
          </span>
        </div>

        <StripIcon title="WeChat" className="border-b-0">
          <IconWeChat />
        </StripIcon>
      </div>
    </div>
  )
}

export function ContactWhatsAppBar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/60 md:hidden" onClick={() => setOpen(false)} aria-hidden />
      )}
      <div className="fixed bottom-[4.25rem] right-0 left-0 z-50 md:hidden">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="mx-3 flex w-[calc(100%-1.5rem)] items-center justify-center gap-2 rounded-lg border border-white/10 bg-graphite-light py-2.5 text-sm text-white shadow-lg"
        >
          <IconWhatsApp className="h-4 w-4 text-accent" />
          Contact
        </button>
        {open && (
          <div className="mx-3 mt-2 space-y-2 rounded-xl border border-white/10 bg-graphite-light p-4 shadow-xl">
            <a href="#upload" className="flex items-center gap-2 font-semibold text-accent">
              <IconQuote />
              Get a quote
            </a>
            <a
              href={WHATSAPP_CHAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-white"
            >
              {WHATSAPP_DISPLAY}
            </a>
            <QrBlock
              label="WhatsApp"
              icon={<IconWhatsApp className="h-3.5 w-3.5 text-accent" />}
              src={whatsappQrUrl(120)}
              alt="WhatsApp"
            />
            <QrBlock
              label="WeChat"
              icon={<IconWeChat className="h-3.5 w-3.5 text-accent" />}
              src={WECHAT_QR_SRC}
              alt="WeChat"
            />
          </div>
        )}
      </div>
    </>
  )
}
