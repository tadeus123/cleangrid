type Props = {
  primary?: 'map' | 'upload' | 'calculate' | 'scan'
  className?: string
  compact?: boolean
}

const btnPrimary =
  'inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-graphite transition hover:bg-teal-400'
const btnSecondary =
  'inline-flex items-center justify-center rounded-md border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/5'
const btnTertiary =
  'inline-flex items-center justify-center rounded-md border border-accent/40 px-5 py-3 text-sm font-medium text-accent transition hover:bg-accent/10'

export function CTAButtons({ primary = 'calculate', className = '', compact = false }: Props) {
  const size = compact ? '[&_a]:px-3 [&_a]:py-2 [&_a]:text-xs' : ''
  return (
    <div className={`flex flex-wrap gap-3 ${size} ${className}`}>
      <a href="#calculator" className={primary === 'calculate' ? btnPrimary : btnSecondary}>
        Calculate savings
      </a>
      <a href="#upload" className={primary === 'upload' ? btnPrimary : btnSecondary}>
        Upload cleaning bill
      </a>
      <a href="#map-estimate" className={primary === 'map' ? btnPrimary : btnTertiary}>
        Map estimate
      </a>
      {!compact && (
        <a href="#site-scan" className={primary === 'scan' ? btnPrimary : btnTertiary}>
          Book site scan
        </a>
      )}
    </div>
  )
}
