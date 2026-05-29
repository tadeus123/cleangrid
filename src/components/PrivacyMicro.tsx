export function PrivacyMicro({ dark = false }: { dark?: boolean }) {
  return (
    <p className={`text-xs leading-relaxed ${dark ? 'text-slate-muted' : 'text-slate-500'}`}>
      We use your details only to prepare your quote. Invoices are encrypted in transit, processed
      confidentially, and stored securely in our database.{' '}
      <a href="#privacy" className={dark ? 'text-accent underline' : 'text-accent-dim underline'}>
        Privacy Policy
      </a>
      . PDF or DOC · max 25 MB.
    </p>
  )
}
