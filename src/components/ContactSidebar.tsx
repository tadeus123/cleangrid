import { useEffect, useState } from 'react'
import {
  WHATSAPP_CHAT_URL,
  WHATSAPP_DISPLAY,
  WECHAT_QR_SRC,
  whatsappQrUrl,
} from '../constants/contact'

function IconHeadset({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M4 11v3a8 8 0 0016 0v-3M12 19v2M8 11V7a4 4 0 018 0v4" strokeLinecap="round" />
    </svg>
  )
}

function IconQuote({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" />
    </svg>
  )
}

function IconWhatsApp({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function IconWeChat({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-4.657 0-8.432 3.039-8.432 6.787 0 1.45.636 2.794 1.72 3.868a.481.481 0 01.174.543l-.318 1.208a.24.24 0 000 .174.24.24 0 00.237.24c.054 0 .108-.027.136-.054l1.552-.908a.704.704 0 01.585-.08c.96.3 1.997.462 3.046.462 4.657 0 8.432-3.038 8.432-6.786 0-3.748-3.775-6.787-8.432-6.787zm-2.97 3.49c.535 0 .968.44.968.983a.976.976 0 01-.968.984.976.976 0 01-.968-.984c0-.543.433-.983.968-.983zm2.97 0c.535 0 .968.44.968.983a.976.976 0 01-.968.984.976.976 0 01-.968-.984c0-.543.433-.983.968-.983z" />
    </svg>
  )
}

type Tab = 'menu' | 'whatsapp' | 'wechat'

export function ContactSidebar() {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<Tab>('menu')

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const openTab = (next: Tab) => {
    setTab(next)
    setOpen(true)
  }

  const stripBtn =
    'flex w-12 flex-col items-center justify-center gap-1 border-b border-white/10 px-1 py-3 text-[10px] font-semibold uppercase leading-tight tracking-wide transition hover:bg-white/10'

  return (
    <div
      className="fixed right-0 top-1/2 z-50 flex -translate-y-1/2 items-stretch md:bottom-auto md:top-1/2"
      aria-label="Contact options"
    >
      {/* Fold-out panel */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          open ? 'w-[min(100vw-3rem,17.5rem)] opacity-100' : 'w-0 opacity-0'
        }`}
      >
        <div className="mr-0 h-full min-w-[17.5rem] border border-r-0 border-white/10 bg-[#152238] shadow-2xl">
          {tab === 'menu' && (
            <div className="p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Contact</p>
              <a
                href="#upload"
                onClick={() => setOpen(false)}
                className="mt-3 flex items-center gap-3 rounded-md bg-accent px-4 py-3 text-sm font-bold uppercase tracking-wide text-graphite transition hover:bg-teal-400"
              >
                <IconQuote className="h-5 w-5 shrink-0" />
                Get a quote
              </a>
              <button
                type="button"
                onClick={() => setTab('whatsapp')}
                className="mt-2 flex w-full items-center gap-3 rounded-md bg-[#1e3354] px-4 py-3 text-left text-sm text-white transition hover:bg-[#243d66]"
              >
                <IconWhatsApp className="h-5 w-5 shrink-0 text-[#25D366]" />
                WhatsApp
              </button>
              <button
                type="button"
                onClick={() => setTab('wechat')}
                className="flex w-full items-center gap-3 rounded-md bg-[#1e3354] px-4 py-3 text-left text-sm text-white transition hover:bg-[#243d66]"
              >
                <IconWeChat className="h-5 w-5 shrink-0 text-[#07C160]" />
                WeChat
              </button>
            </div>
          )}

          {tab === 'whatsapp' && (
            <div className="p-4">
              <button
                type="button"
                onClick={() => setTab('menu')}
                className="text-xs text-white/50 hover:text-white"
              >
                ← Back
              </button>
              <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-[#25D366]">
                WhatsApp
              </p>
              <a
                href={WHATSAPP_CHAT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-lg font-semibold text-white hover:text-accent"
              >
                {WHATSAPP_DISPLAY}
              </a>
              <p className="mt-1 text-xs text-white/50">Tap to chat · reply within 1 business day</p>
              <div className="mt-4 rounded-md bg-white p-2">
                <img
                  src={whatsappQrUrl(140)}
                  alt="WhatsApp QR code"
                  width={140}
                  height={140}
                  className="mx-auto block"
                />
              </div>
              <a
                href={WHATSAPP_CHAT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] py-2.5 text-sm font-semibold text-white"
              >
                <IconWhatsApp className="h-4 w-4" />
                Open WhatsApp
              </a>
            </div>
          )}

          {tab === 'wechat' && (
            <div className="p-4">
              <button
                type="button"
                onClick={() => setTab('menu')}
                className="text-xs text-white/50 hover:text-white"
              >
                ← Back
              </button>
              <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-[#07C160]">
                Scan to WeChat
              </p>
              <p className="mt-1 text-xs text-white/50">Add CleanGrid on WeChat</p>
              <div className="mt-4 rounded-md bg-white p-2">
                <img
                  src={WECHAT_QR_SRC}
                  alt="WeChat QR code"
                  width={140}
                  height={140}
                  className="mx-auto block"
                />
              </div>
              <a
                href={WHATSAPP_CHAT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block text-center text-xs text-white/60 underline hover:text-white"
              >
                Or message us on WhatsApp
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Right strip — always visible */}
      <div className="flex flex-col overflow-hidden rounded-l-lg border border-r-0 border-white/10 bg-[#152238] shadow-xl">
        <button
          type="button"
          onClick={() => {
            if (open && tab === 'menu') setOpen(false)
            else openTab('menu')
          }}
          className={`${stripBtn} border-b-0 bg-accent text-graphite hover:bg-teal-400`}
          aria-expanded={open}
        >
          <IconHeadset className="h-5 w-5" />
          <span>Contact</span>
        </button>
        <a
          href="#upload"
          className={`${stripBtn} text-white`}
          title="Get a quote"
          onClick={() => setOpen(false)}
        >
          <IconQuote className="h-5 w-5" />
          <span>Quote</span>
        </a>
        <button
          type="button"
          onClick={() => openTab('whatsapp')}
          className={`${stripBtn} text-white`}
          title="WhatsApp"
        >
          <IconWhatsApp className="h-5 w-5 text-[#25D366]" />
          <span>WA</span>
        </button>
        <button
          type="button"
          onClick={() => openTab('wechat')}
          className={`${stripBtn} border-b-0 text-white`}
          title="WeChat"
        >
          <IconWeChat className="h-5 w-5 text-[#07C160]" />
          <span>WeChat</span>
        </button>
      </div>
    </div>
  )
}

/** Slim bar above mobile sticky CTA */
export function ContactWhatsAppBar() {
  return (
    <div className="fixed bottom-[4.25rem] left-0 right-0 z-40 border-t border-white/10 bg-graphite/95 px-4 py-2 backdrop-blur-md md:hidden">
      <a
        href={WHATSAPP_CHAT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 text-xs text-slate-muted"
      >
        <span>Questions?</span>
        <span className="font-medium text-white">Message us on WhatsApp</span>
        <IconWhatsApp className="h-4 w-4 text-[#25D366]" />
      </a>
    </div>
  )
}
