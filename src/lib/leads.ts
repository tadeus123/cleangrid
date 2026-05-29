import { WHATSAPP_DISPLAY } from '../constants/contact'
import { supabase, isSupabaseConfigured } from './supabase'

export type LeadType = 'quote' | 'calculator' | 'site-scan'

export type LeadPayload = {
  type: LeadType
  email?: string
  company: string
  name?: string
  phone?: string
  buildingType?: string
  country?: string
  cleanableAreaSqm?: number
  monthlyBill?: number
  monthlyCleanGrid?: number
  monthlySavings?: number
  yearlySavings?: number
  currency?: string
  message?: string
  contractEnd?: string
  file?: File
}

export type SubmitResult = {
  ok: boolean
  message: string
}

const SUCCESS_MSG =
  'Thank you. We will respond within 1 business day with your CleanGrid price and next steps.'

export async function submitLead(payload: LeadPayload): Promise<SubmitResult> {
  if (!isSupabaseConfigured() || !supabase) {
    return {
      ok: false,
      message: `Database not configured. Add Supabase keys to .env — or WhatsApp ${WHATSAPP_DISPLAY}.`,
    }
  }

  const row = {
    type: payload.type,
    company: payload.company.trim(),
    email: payload.email?.trim() || null,
    name: payload.name?.trim() || null,
    phone: payload.phone?.trim() || null,
    building_type: payload.buildingType || null,
    country: payload.country || null,
    cleanable_area_sqm: payload.cleanableAreaSqm ?? null,
    monthly_bill: payload.monthlyBill ?? null,
    monthly_cleangrid: payload.monthlyCleanGrid ?? null,
    monthly_savings: payload.monthlySavings ?? null,
    yearly_savings: payload.yearlySavings ?? null,
    currency: payload.currency ?? 'USD',
    contract_end: payload.contractEnd || null,
    notes: payload.message || null,
    invoice_file_name: payload.file?.name ?? null,
    source_url: typeof window !== 'undefined' ? window.location.href : null,
  }

  const { data, error } = await supabase.from('leads').insert(row).select('id').single()

  if (error || !data?.id) {
    return {
      ok: false,
      message: error?.message ?? `Could not save. WhatsApp ${WHATSAPP_DISPLAY}.`,
    }
  }

  if (payload.file) {
    if (payload.file.size > 25 * 1024 * 1024) {
      return { ok: false, message: 'File must be under 25 MB.' }
    }

    const storagePath = `${data.id}/${Date.now()}-${payload.file.name.replace(/[^\w.\-]+/g, '_')}`
    const { error: uploadError } = await supabase.storage
      .from('invoices')
      .upload(storagePath, payload.file, { upsert: false })

    if (uploadError) {
      return {
        ok: false,
        message: `Saved your details but upload failed: ${uploadError.message}`,
      }
    }

    await supabase
      .from('leads')
      .update({ invoice_storage_path: storagePath })
      .eq('id', data.id)
  }

  return { ok: true, message: SUCCESS_MSG }
}
