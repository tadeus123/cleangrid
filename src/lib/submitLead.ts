import { WHATSAPP_DISPLAY } from '../constants/contact'

export type LeadPayload = {
  type: 'quote' | 'calculator' | 'site-scan'
  email: string
  company: string
  name?: string
  phone?: string
  buildingType?: string
  country?: string
  cleanableAreaSqm?: number
  monthlyBill?: number
  currency?: string
  message?: string
  fileName?: string
  fileBase64?: string
}

export type SubmitResult = {
  ok: boolean
  message: string
}

export async function submitLead(payload: LeadPayload): Promise<SubmitResult> {
  try {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = (await res.json()) as { success?: boolean; message?: string; error?: string }
    if (res.ok && data.success !== false) {
      return {
        ok: true,
        message: 'Thank you. We will respond within 1 business day with your CleanGrid price and next steps.',
      }
    }
    return {
      ok: false,
      message:
        data.message ??
        data.error ??
        `Something went wrong. Message us on WhatsApp (${WHATSAPP_DISPLAY}).`,
    }
  } catch {
    const fallbackKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined
    if (fallbackKey) {
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: fallbackKey,
            subject: `CleanGrid ${payload.type}`,
            email: payload.email,
            from_name: payload.name ?? payload.company,
            message: formatLeadMessage(payload),
            attachment: payload.fileBase64,
            file_name: payload.fileName,
          }),
        })
        const data = (await res.json()) as { success?: boolean }
        if (data.success) {
          return {
            ok: true,
            message: 'Thank you. We will respond within 1 business day with your CleanGrid price and next steps.',
          }
        }
      } catch {
        /* fall through */
      }
    }
    return {
      ok: false,
      message: `Could not send right now. Message us on WhatsApp (${WHATSAPP_DISPLAY}) or try again.`,
    }
  }
}

function formatLeadMessage(p: LeadPayload): string {
  return [
    `Type: ${p.type}`,
    `Company: ${p.company}`,
    `Email: ${p.email}`,
    p.name && `Contact: ${p.name}`,
    p.phone && `Phone: ${p.phone}`,
    p.buildingType && `Building: ${p.buildingType}`,
    p.country && `Country: ${p.country}`,
    p.cleanableAreaSqm && `Area: ${p.cleanableAreaSqm} m²`,
    p.monthlyBill && `Monthly bill: ${p.monthlyBill} ${p.currency ?? 'EUR'}`,
    p.message && `Notes: ${p.message}`,
    p.fileName && `Attachment: ${p.fileName}`,
  ]
    .filter(Boolean)
    .join('\n')
}

export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      const base64 = result.split(',')[1]
      resolve(base64 ?? '')
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
