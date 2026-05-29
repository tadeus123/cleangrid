/** Optional OpenAI refinement for map estimates (set OPENAI_API_KEY on Vercel) */
export default async function handler(request, response) {
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (request.method === 'OPTIONS') return response.status(200).end()
  if (request.method !== 'POST') {
    return response.status(405).json({ success: false, error: 'Method not allowed' })
  }

  const body = request.body ?? {}
  const det = body.deterministic
  if (!det) {
    return response.status(400).json({ success: false, error: 'Missing deterministic estimate' })
  }

  const openaiKey = process.env.OPENAI_API_KEY
  if (!openaiKey) {
    return response.status(200).json({
      success: true,
      confidence: body.footprintSource === 'osm' ? 'medium' : 'low',
      needsReview: body.footprintSource !== 'osm',
      note:
        body.footprintSource === 'osm'
          ? 'Based on mapped building outline. Upload your cleaning bill to lock your price at 10%.'
          : 'Outline estimated — book a site scan or upload your bill for an exact quote.',
    })
  }

  const context = {
    address: body.address,
    footprintSqm: det.footprintSqm,
    floors: det.floors,
    cleanableSqm: det.cleanableSqm,
    buildingUse: det.buildingUse,
    osmTags: body.osmTags,
    footprintSource: body.footprintSource,
    traditionalLow: det.traditionalLow,
    traditionalHigh: det.traditionalHigh,
    currency: body.currency ?? 'EUR',
  }

  try {
    const upstream = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.2,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content: `You validate commercial cleaning cost ballparks for large buildings.
Rules:
- Be conservative; never go below 75% or above 125% of provided traditionalLow/traditionalHigh.
- If footprint is default/guessed or campus-like, set needsReview true and confidence low.
- monthlyTraditionalLow/High must be integers in the same currency as input.
Output JSON only: { "confidence": "high"|"medium"|"low", "needsReview": boolean, "note": string (max 220 chars), "monthlyTraditionalLow": number, "monthlyTraditionalHigh": number }`,
          },
          { role: 'user', content: JSON.stringify(context) },
        ],
      }),
    })

    if (!upstream.ok) {
      return response.status(200).json({
        success: true,
        confidence: 'medium',
        needsReview: true,
        note: 'Ballpark from building footprint. Upload your bill to confirm 10% pricing.',
      })
    }

    const data = await upstream.json()
    const text = data.choices?.[0]?.message?.content
    let parsed
    try {
      parsed = JSON.parse(text)
    } catch {
      parsed = {}
    }

    const minL = det.traditionalLow * 0.75
    const maxH = det.traditionalHigh * 1.25
    let low = parsed.monthlyTraditionalLow ?? det.traditionalLow
    let high = parsed.monthlyTraditionalHigh ?? det.traditionalHigh
    low = Math.round(Math.max(minL, Math.min(det.traditionalLow * 1.25, low)))
    high = Math.round(Math.min(maxH, Math.max(det.traditionalHigh * 0.75, high)))
    if (high <= low) {
      low = det.traditionalLow
      high = det.traditionalHigh
    }

    return response.status(200).json({
      success: true,
      confidence: parsed.confidence ?? 'medium',
      needsReview: Boolean(parsed.needsReview),
      note: parsed.note ?? 'Upload your cleaning bill to lock 10% pricing.',
      monthlyTraditionalLow: low,
      monthlyTraditionalHigh: high,
      cleanGridLow: Math.round(low * 0.1),
      cleanGridHigh: Math.round(high * 0.1),
    })
  } catch {
    return response.status(200).json({
      success: true,
      confidence: 'medium',
      needsReview: true,
      note: 'Ballpark from satellite map data. Upload your bill for a binding quote.',
    })
  }
}
