import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  WHATSAPP_CHAT_URL,
  WHATSAPP_DISPLAY,
  WECHAT_ADD_URL,
  WECHAT_DISPLAY,
  WECHAT_QR_SRC,
  whatsappQrUrl,
} from '../constants/contact'

function cx(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(' ')
}

function IconQuote({ className }: { className?: string }) {
  return (
    <svg
      className={cx('block h-5 w-5 shrink-0', className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" strokeLinecap="round" />
      <path d="M9 5a2 2 0 012-2h2a2 2 0 012 2M9 12h6M9 16h4" strokeLinecap="round" />
    </svg>
  )
}

function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg className={cx('block h-5 w-5 shrink-0', className)} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function IconWeChat({ className }: { className?: string }) {
  return (
    <svg className={cx('block h-5 w-5 shrink-0', className)} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-4.657 0-8.432 3.039-8.432 6.787 0 1.45.636 2.794 1.72 3.868a.481.481 0 01.174.543l-.318 1.208a.24.24 0 000 .174.24.24 0 00.237.24c.054 0 .108-.027.136-.054l1.552-.908a.704.704 0 01.585-.08c.96.3 1.997.462 3.046.462 4.657 0 8.432-3.038 8.432-6.786 0-3.748-3.775-6.787-8.432-6.787zm-2.97 3.49c.535 0 .968.44.968.983a.976.976 0 01-.968.984.976.976 0 01-.968-.984c0-.543.433-.983.968-.983zm2.97 0c.535 0 .968.44.968.983a.976.976 0 01-.968.984.976.976 0 01-.968-.984c0-.543.433-.983.968-.983z" />
    </svg>
  )
}

function QrCard({ label, src, alt }: { label: string; src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-graphite">
      <p className="border-b border-white/8 px-3 py-2 text-[10px] font-medium uppercase tracking-wider text-slate-muted">
        {label}
      </p>
      <div className="flex justify-center bg-white p-2.5">
        <img src={src} alt={alt} width={108} height={108} className="size-[6.75rem] object-contain" />
      </div>
    </div>
  )
}

function StripBtn({
  children,
  href,
  title,
  className,
  borderBottom = true,
}: {
  children: ReactNode
  href?: string
  title: string
  className?: string
  borderBottom?: boolean
}) {
  const inner = (
    <span
      className={cx(
        'flex h-14 w-12 items-center justify-center text-accent transition-colors hover:bg-white/[0.06]',
        borderBottom && 'border-b border-white/10',
        className,
      )}
    >
      {children}
    </span>
  )
  if (href) {
    const external = href.startsWith('http')
    return (
      <a href={href} title={title} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
        {inner}
      </a>
    )
  }
  return inner
}

function ContactNumberRow({
  label,
  number,
  href,
  title,
}: {
  label: string
  number: string
  href: string
  title: string
}) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      title={title}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="flex h-14 flex-col justify-center overflow-hidden border-b border-white/10 px-4 transition hover:bg-white/[0.04]"
    >
      <span className="text-[10px] font-medium uppercase tracking-wider text-slate-muted">{label}</span>
      <span className="text-[15px] font-semibold leading-tight text-white">{number}</span>
    </a>
  )
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
      <div
        className={cx(
          'overflow-hidden rounded-l-xl border border-r-0 border-white/10 bg-graphite-light shadow-2xl transition-[grid-template-columns] duration-300 ease-out',
          open ? 'grid-cols-[17.5rem_3rem]' : 'grid-cols-[0rem_3rem]',
        )}
        style={{
          display: 'grid',
          gridTemplateRows: '3.5rem 3.5rem 3.5rem 1fr 3.5rem',
        }}
      >
        {/* Row 1: Quote */}
        <div className="overflow-hidden border-b border-white/10 px-3 py-2">
          <a
            href="#upload"
            className="flex h-full items-center justify-center rounded-md bg-accent px-4 text-xs font-bold uppercase tracking-wide text-graphite transition hover:bg-teal-400"
          >
            Get a quote
          </a>
        </div>
        <StripBtn href="#upload" title="Get a quote">
          <IconQuote />
        </StripBtn>

        {/* Row 2: WhatsApp */}
        <ContactNumberRow
          label="WhatsApp"
          number={WHATSAPP_DISPLAY}
          href={WHATSAPP_CHAT_URL}
          title="Chat on WhatsApp"
        />

        {/* Row 3: WeChat */}
        <ContactNumberRow
          label="WeChat"
          number={WECHAT_DISPLAY}
          href={WECHAT_ADD_URL}
          title="Add on WeChat"
        />

        {/* Strip: WhatsApp + WeChat icons stacked (rows 2–3) */}
        <div
          className="flex flex-col border-b border-white/10"
          style={{ gridColumn: 2, gridRow: '2 / 4' }}
        >
          <StripBtn href={WHATSAPP_CHAT_URL} title="WhatsApp" borderBottom>
            <IconWhatsApp />
          </StripBtn>
          <StripBtn href={WECHAT_ADD_URL} title="Add on WeChat" borderBottom={false}>
            <IconWeChat />
          </StripBtn>
        </div>

        {/* Row 4: QR codes + Contact tab */}
        <div className="overflow-hidden border-b border-white/10 px-3 py-3">
          <div className="space-y-3">
            <QrCard label="Scan · WhatsApp" src={whatsappQrUrl(140)} alt="WhatsApp QR code" />
            <QrCard label="Scan · WeChat" src={WECHAT_QR_SRC} alt="WeChat QR code" />
          </div>
        </div>
        <div
          className="flex items-center justify-center border-b border-l border-white/10 bg-accent"
          style={{ gridColumn: 2, gridRow: 4 }}
          aria-hidden
        >
          <span className="[writing-mode:vertical-rl] rotate-180 text-[10px] font-bold uppercase tracking-[0.22em] text-graphite">
            Contact
          </span>
        </div>

        {/* Row 5: Footer */}
        <div className="flex items-center px-4">
          <span className="text-xs text-slate-muted">We reply within 1 business day</span>
        </div>
        <div className="border-l border-white/10 bg-graphite-light" style={{ gridColumn: 2, gridRow: 5 }} aria-hidden />
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
          className="mx-3 flex w-[calc(100%-1.5rem)] items-center justify-center gap-2 rounded-lg border border-white/10 bg-graphite-light py-2.5 text-sm text-white"
        >
          <IconWhatsApp className="text-accent" />
          Contact
        </button>
        {open && (
          <div className="mx-3 mt-2 space-y-3 rounded-xl border border-white/10 bg-graphite-light p-4 shadow-xl">
            <a href="#upload" className="block rounded-md bg-accent py-2.5 text-center text-xs font-bold uppercase text-graphite">
              Get a quote
            </a>
            <a href={WHATSAPP_CHAT_URL} target="_blank" rel="noopener noreferrer" className="block text-center text-white">
              WhatsApp · {WHATSAPP_DISPLAY}
            </a>
            <a href={WECHAT_ADD_URL} className="block text-center text-white">
              WeChat · {WECHAT_DISPLAY}
            </a>
            <QrCard label="WhatsApp" src={whatsappQrUrl(120)} alt="WhatsApp" />
            <QrCard label="WeChat" src={WECHAT_QR_SRC} alt="WeChat" />
          </div>
        )}
      </div>
    </>
  )
}
