/** Support & sales — WhatsApp only (no email support). */
export const WHATSAPP_E164 = '4917644429908'
export const WHATSAPP_DISPLAY = '+49 176 44429908'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_E164}`
export const WHATSAPP_PREFILL = encodeURIComponent(
  'Hi CleanGrid — I would like a quote for robotic cleaning at our building.',
)

export const WHATSAPP_CHAT_URL = `${WHATSAPP_URL}?text=${WHATSAPP_PREFILL}`

export function whatsappQrUrl(size = 140): string {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=6&data=${encodeURIComponent(WHATSAPP_URL)}`
}

/** Replace /public/images/wechat-qr.png with your official WeChat QR when ready. */
export const WECHAT_QR_SRC = '/images/wechat-qr.png'
