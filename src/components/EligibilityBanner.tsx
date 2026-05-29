import { useCurrency } from '../context/CurrencyContext'
import { eligibilityLine } from '../constants/eligibility'

type Props = {
  className?: string
  dark?: boolean
}

export function EligibilityBanner({ className = '', dark = false }: Props) {
  const { currency } = useCurrency()
  return (
    <p
      className={`text-sm ${dark ? 'text-slate-muted' : 'text-slate-600'} ${className}`}
    >
      <span className={dark ? 'text-white/90' : 'font-medium text-graphite'}>Who it&apos;s for:</span>{' '}
      {eligibilityLine(currency)}
    </p>
  )
}
