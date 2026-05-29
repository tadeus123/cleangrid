/** Vercel serverless — forwards leads to Web3Forms (set WEB3FORMS_ACCESS_KEY in Vercel env) */
export default async function handler(request, response) {
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (request.method === 'OPTIONS') {
    return response.status(200).end()
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ success: false, error: 'Method not allowed' })
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY
  if (!accessKey) {
    return response.status(503).json({
      success: false,
      error: 'Form not configured. Set WEB3FORMS_ACCESS_KEY in Vercel environment variables.',
    })
  }

  const body = request.body ?? {}
  const lines = [
    `Submission type: ${body.type ?? 'quote'}`,
    `Company: ${body.company ?? '—'}`,
    `Contact: ${body.name ?? '—'}`,
    `Email: ${body.email ?? '—'}`,
    `Phone: ${body.phone ?? '—'}`,
    `Building type: ${body.buildingType ?? '—'}`,
    `Country: ${body.country ?? '—'}`,
    body.cleanableAreaSqm && `Cleanable area: ${body.cleanableAreaSqm} m²`,
    body.monthlyBill && `Current monthly bill: ${body.monthlyBill} ${body.currency ?? 'EUR'}`,
    body.message && `Notes: ${body.message}`,
    body.fileName && `File: ${body.fileName}`,
  ].filter(Boolean)

  const payload = {
    access_key: accessKey,
    subject: `CleanGrid lead — ${body.company ?? body.email ?? 'New'}`,
    email: body.email,
    from_name: body.name ?? body.company,
    message: lines.join('\n'),
  }

  if (body.fileBase64 && body.fileName) {
    payload.attachment = body.fileBase64
    payload.file_name = body.fileName
  }

  try {
    const upstream = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await upstream.json()
    return response.status(upstream.ok ? 200 : 502).json(data)
  } catch {
    return response.status(500).json({ success: false, message: 'Upstream error' })
  }
}
