type Props = {
  primary?: 'upload' | 'calculate'
  className?: string
}

export function CTAButtons({ primary = 'upload', className = '' }: Props) {
  const uploadPrimary = primary === 'upload'
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a
        href="#upload"
        className={
          uploadPrimary
            ? 'inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-graphite transition hover:bg-teal-400'
            : 'inline-flex items-center justify-center rounded-md border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/5'
        }
      >
        Upload cleaning bill
      </a>
      <a
        href="#calculator"
        className={
          !uploadPrimary
            ? 'inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-graphite transition hover:bg-teal-400'
            : 'inline-flex items-center justify-center rounded-md border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/5'
        }
      >
        Calculate savings
      </a>
    </div>
  )
}
