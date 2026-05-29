import { jsPDF } from 'jspdf'
import type { Currency } from './currency'
import { formatMoney } from './currency'
import { HERO_USD_PRICE, HERO_USD_UNIT } from '../constants/pricing'
import { WHATSAPP_DISPLAY, WHATSAPP_URL } from '../constants/contact'

export type SavingsPdfInput = {
  company: string
  email?: string
  currency: Currency
  monthlyCurrent: number
  monthlyCleanGrid: number
  monthlySave: number
  yearlySave: number
}

const C = {
  graphite: [12, 14, 18] as [number, number, number],
  panel: [245, 247, 250] as [number, number, number],
  accent: [20, 184, 166] as [number, number, number],
  ink: [17, 24, 39] as [number, number, number],
  muted: [100, 116, 139] as [number, number, number],
}

export function downloadSavingsPdf(input: SavingsPdfInput): void {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const date = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const fiveYearSave = input.yearlySave * 5
  const pct =
    input.monthlyCurrent > 0 ? Math.round((input.monthlySave / input.monthlyCurrent) * 100) : 90

  doc.setFillColor(...C.graphite)
  doc.rect(0, 0, 210, 44, 'F')
  doc.setFillColor(...C.accent)
  doc.rect(0, 42, 210, 2, 'F')

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text('CleanGrid', 20, 20)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(180, 190, 200)
  doc.text('Internal savings report — share with your team', 20, 30)

  let y = 56
  doc.setTextColor(...C.ink)
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text(input.company, 20, y)
  y += 7

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...C.muted)
  doc.text(`Prepared ${date}${input.email ? ` · ${input.email}` : ''}`, 20, y)
  y += 12

  doc.setFontSize(10)
  doc.setTextColor(...C.ink)
  const headline = `Affordable humanoid robotic cleaning from $${HERO_USD_PRICE.toFixed(2)} ${HERO_USD_UNIT} in the world's largest commercial buildings.`
  doc.text(doc.splitTextToSize(headline, 170), 20, y)
  y += 14

  const row = (label: string, left: string, right: string, accentRight = false) => {
    doc.setFillColor(...C.panel)
    doc.roundedRect(20, y, 170, 13, 2, 2, 'F')
    doc.setFontSize(8)
    doc.setTextColor(...C.muted)
    doc.text(label, 24, y + 5)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...C.ink)
    doc.text(left, 24, y + 11)
    doc.setTextColor(...(accentRight ? C.accent : C.ink))
    doc.text(right, 115, y + 11)
    doc.setFont('helvetica', 'normal')
    y += 16
  }

  doc.setFontSize(7)
  doc.setTextColor(...C.muted)
  doc.text('YOUR CONTRACT TODAY', 24, y)
  doc.text('WITH CLEANGRID', 115, y)
  y += 5

  row(
    'Monthly cleaning',
    formatMoney(input.monthlyCurrent, input.currency),
    formatMoney(input.monthlyCleanGrid, input.currency),
    true,
  )
  row('Monthly savings', '—', formatMoney(input.monthlySave, input.currency), true)
  row('Annual savings', '—', formatMoney(input.yearlySave, input.currency), true)
  row('5-year savings', '—', formatMoney(fiveYearSave, input.currency), true)

  doc.setFillColor(...C.accent)
  doc.roundedRect(20, y, 170, 14, 2, 2, 'F')
  doc.setTextColor(...C.graphite)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text(`You keep ~${pct}% of today's cleaning budget.`, 24, y + 9)
  y += 22

  doc.setTextColor(...C.ink)
  doc.setFontSize(12)
  doc.text('How CleanGrid gets the price this low', 20, y)
  y += 7

  doc.setFontSize(9)
  doc.setTextColor(...C.muted)
  const bullets = [
    'Humanoid robotic fleets — no staffing agencies, overtime, or turnover markup.',
    'We own and operate the fleet: install, mapping, maintenance, and monitoring included.',
    'Night cleaning by default — ready for morning occupancy without shift overlap.',
    'Proof after every shift: tasks, zones, and SLA metrics logged in your dashboard.',
    'Binding price anchored to your real invoice (~10% after site validation).',
  ]
  for (const b of bullets) {
    const lines = doc.splitTextToSize(`• ${b}`, 168)
    doc.text(lines, 22, y)
    y += lines.length * 4.2 + 1.5
  }

  y += 4
  doc.setTextColor(...C.ink)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Next steps', 20, y)
  y += 7
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...C.muted)
  const steps = [
    '1. Upload your cleaning bill at cleangrid.company — quote within 1 business day.',
    '2. Site scan (3–7 days): zones, access, bathrooms, schedule.',
    '3. Deploy fleet (4–12 weeks): supervised first runs, then nightly cleaning + reports.',
  ]
  for (const s of steps) {
    const lines = doc.splitTextToSize(s, 168)
    doc.text(lines, 20, y)
    y += lines.length * 4.2 + 1.5
  }

  y += 6
  doc.setDrawColor(...C.accent)
  doc.setLineWidth(0.6)
  doc.line(20, y, 190, y)
  y += 8
  doc.setTextColor(...C.accent)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text('Contact — WhatsApp only', 20, y)
  y += 6
  doc.setTextColor(...C.ink)
  doc.setFont('helvetica', 'normal')
  doc.text(`${WHATSAPP_DISPLAY}`, 20, y)
  doc.setTextColor(...C.muted)
  doc.text(WHATSAPP_URL, 20, y + 5)

  doc.setFontSize(7)
  doc.text(
    'Indicative model for internal discussion. Binding offer follows invoice review and site validation.',
    20,
    287,
  )

  const safeName = input.company.replace(/[^\w\-]+/g, '-').slice(0, 40) || 'building'
  doc.save(`CleanGrid-Savings-${safeName}.pdf`)
}
