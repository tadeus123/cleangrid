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

/** Same mobile as WhatsApp — linked on WeChat for “Add by phone”. */
export const WECHAT_E164 = WHATSAPP_E164
export const WECHAT_DISPLAY = WHATSAPP_DISPLAY

/**
 * Opens WeChat to add this number (mobile). Not as reliable as wa.me — set
 * VITE_WECHAT_PROFILE_URL to your https://u.wechat.com/… link from the app if you have one.
 */
const wechatProfileUrl = import.meta.env.VITE_WECHAT_PROFILE_URL?.trim()
export const WECHAT_ADD_URL =
  wechatProfileUrl ||
  `weixin://dl/add?phone=${WECHAT_E164}`

/** Replace /public/images/wechat-qr.png with your official WeChat QR when ready. */
export const WECHAT_QR_SRC = '/images/wechat-qr.png'
