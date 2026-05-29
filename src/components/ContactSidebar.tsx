import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  WHATSAPP_CHAT_URL,
  WHATSAPP_DISPLAY,
  WECHAT_ADD_URL,
  WECHAT_DISPLAY,
  WECHAT_QR_SRC,
  whatsappQrUrl,
} from '../constants/contact'

const PANEL_W = 'w-[12.5rem]' // 200px
const STRIP_W = 'w-10'
const ROW = 'h-10 shrink-0' // 40px rows — fits short viewports

function cx(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(' ')
}

function IconQuote({ className }: { className?: string }) {
  return (
    <svg
      className={cx('block h-[17px] w-[17px] shrink-0', className)}
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
    <svg
      className={cx('block h-[17px] w-[17px] shrink-0', className)}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function IconWeChat({ className }: { className?: string }) {
  return (
    <svg
      className={cx('block h-[17px] w-[17px] shrink-0', className)}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-4.657 0-8.432 3.039-8.432 6.787 0 1.45.636 2.794 1.72 3.868a.481.481 0 01.174.543l-.318 1.208a.24.24 0 000 .174.24.24 0 00.237.24c.054 0 .108-.027.136-.054l1.552-.908a.704.704 0 01.585-.08c.96.3 1.997.462 3.046.462 4.657 0 8.432-3.038 8.432-6.786 0-3.748-3.775-6.787-8.432-6.787zm-2.97 3.49c.535 0 .968.44.968.983a.976.976 0 01-.968.984.976.976 0 01-.968-.984c0-.543.433-.983.968-.983zm2.97 0c.535 0 .968.44.968.983a.976.976 0 01-.968.984.976.976 0 01-.968-.984c0-.543.433-.983.968-.983z" />
    </svg>
  )
}

function QrMini({ label, src, alt, size = 'md' }: { label: string; src: string; alt: string; size?: 'md' | 'sm' }) {
  const img = size === 'sm' ? 'size-14' : 'size-16'
  return (
    <div className="flex min-w-0 flex-col items-center gap-0.5">
      <div className="rounded bg-white p-0.5 shadow-sm">
        <img src={src} alt={alt} width={64} height={64} className={cx(img, 'object-contain')} />
      </div>
      <span className="w-full truncate text-center text-[8px] font-medium uppercase tracking-wide text-slate-muted">
        {label}
      </span>
    </div>
  )
}

function StripLink({
  href,
  title,
  children,
  borderBottom = true,
}: {
  href: string
  title: string
  children: ReactNode
  borderBottom?: boolean
}) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      title={title}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={cx(
        'flex items-center justify-center text-accent transition-colors hover:bg-white/[0.07]',
        STRIP_W,
        ROW,
        borderBottom && 'border-b border-white/10',
      )}
    >
      {children}
    </a>
  )
}

function ChannelRow({
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
      className={cx(
        'flex min-w-0 flex-col justify-center border-b border-white/10 px-2.5 transition hover:bg-white/[0.04]',
        ROW,
      )}
    >
      <span className="text-[8px] font-medium uppercase tracking-wider text-slate-muted">{label}</span>
      <span className="truncate text-xs font-semibold leading-tight text-white">{number}</span>
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
      className="pointer-events-none fixed inset-y-3 right-0 z-50 hidden items-center md:flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      aria-label="Contact"
    >
      <div
        className={cx(
          'contact-rail pointer-events-auto flex max-h-[calc(100dvh-1.5rem)] overflow-hidden rounded-l-lg border border-r-0 border-white/10 bg-graphite-light shadow-xl shadow-black/40',
          'transition-[width] duration-300 ease-out',
          open ? 'w-[calc(12.5rem+2.5rem)]' : STRIP_W,
        )}
      >
        {/* Panel */}
        <div
          className={cx(
            'contact-rail shrink-0 overflow-hidden border-r border-white/10 transition-[width,opacity] duration-300 ease-out',
            open ? `${PANEL_W} opacity-100` : 'pointer-events-none w-0 border-r-0 opacity-0',
          )}
        >
          <div className={cx(PANEL_W, 'flex flex-col')}>
            <a
              href="#upload"
              className={cx(
                'flex items-center justify-center border-b border-white/10 bg-accent/95 text-[9px] font-bold uppercase tracking-wide text-graphite transition hover:bg-teal-400',
                ROW,
              )}
            >
              Get a quote
            </a>

            <ChannelRow
              label="WhatsApp"
              number={WHATSAPP_DISPLAY}
              href={WHATSAPP_CHAT_URL}
              title="Chat on WhatsApp"
            />
            <ChannelRow label="WeChat" number={WECHAT_DISPLAY} href={WECHAT_ADD_URL} title="Add on WeChat" />

            <div className={cx('flex items-center justify-center border-b border-white/10 px-1.5', 'h-[5.25rem]')}>
              <div className="grid w-full grid-cols-2 gap-1">
                <QrMini label="WhatsApp" src={whatsappQrUrl(88)} alt="WhatsApp QR" />
                <QrMini label="WeChat" src={WECHAT_QR_SRC} alt="WeChat QR" />
              </div>
            </div>

            <p className={cx('flex items-center px-2.5 text-[9px] leading-snug text-slate-muted', 'h-8')}>
              Reply within 1 business day
            </p>
          </div>
        </div>

        {/* Icon rail — height locked to panel (no overflow scroll) */}
        <div className={cx('contact-rail flex shrink-0 flex-col overflow-hidden', STRIP_W)}>
          <StripLink href="#upload" title="Get a quote">
            <IconQuote />
          </StripLink>
          <StripLink href={WHATSAPP_CHAT_URL} title="WhatsApp">
            <IconWhatsApp />
          </StripLink>
          <StripLink href={WECHAT_ADD_URL} title="WeChat" borderBottom={false}>
            <IconWeChat />
          </StripLink>

          <div
            className="flex h-[5.25rem] shrink-0 items-center justify-center border-t border-white/10 bg-accent"
            aria-hidden
          >
            <span className="[writing-mode:vertical-rl] rotate-180 text-[8px] font-bold uppercase tracking-[0.18em] text-graphite">
              Contact
            </span>
          </div>

          <div className="h-8 shrink-0" aria-hidden />
        </div>
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
      <div
        className="fixed right-0 left-0 z-50 md:hidden"
        style={{ bottom: 'calc(4.75rem + env(safe-area-inset-bottom, 0px))' }}
      >
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="mx-3 flex w-[calc(100%-1.5rem)] items-center justify-center gap-2 rounded-lg border border-white/10 bg-graphite-light py-2.5 text-sm text-white shadow-lg"
        >
          <span className="flex items-center gap-1.5 text-accent">
            <IconWhatsApp />
            <IconWeChat />
          </span>
          Contact
        </button>
        {open && (
          <div className="contact-rail mx-3 mt-2 overflow-hidden rounded-xl border border-white/10 bg-graphite-light p-3 shadow-xl">
            <a
              href="#upload"
              className="mb-2 block rounded-md bg-accent py-2.5 text-center text-xs font-bold uppercase text-graphite"
            >
              Get a quote
            </a>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={WHATSAPP_CHAT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/10 px-2 py-2 text-center transition hover:bg-white/[0.04]"
              >
                <span className="block text-[9px] uppercase tracking-wide text-slate-muted">WhatsApp</span>
                <span className="mt-0.5 block text-xs font-semibold text-white">{WHATSAPP_DISPLAY}</span>
              </a>
              <a
                href={WECHAT_ADD_URL}
                className="rounded-lg border border-white/10 px-2 py-2 text-center transition hover:bg-white/[0.04]"
              >
                <span className="block text-[9px] uppercase tracking-wide text-slate-muted">WeChat</span>
                <span className="mt-0.5 block text-xs font-semibold text-white">{WECHAT_DISPLAY}</span>
              </a>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <QrMini label="WhatsApp" src={whatsappQrUrl(88)} alt="WhatsApp" size="sm" />
              <QrMini label="WeChat" src={WECHAT_QR_SRC} alt="WeChat" size="sm" />
            </div>
            <p className="mt-2 text-center text-[10px] text-slate-muted">Reply within 1 business day</p>
          </div>
        )}
      </div>
    </>
  )
}
