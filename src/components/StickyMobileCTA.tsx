export function StickyMobileCTA() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-graphite/95 p-3 backdrop-blur-md md:hidden"
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <div className="flex gap-2">
        <a
          href="#calculator"
          className="flex-1 rounded-md bg-accent py-3 text-center text-sm font-semibold text-graphite"
        >
          Savings
        </a>
        <a
          href="#upload"
          className="flex-1 rounded-md border border-white/20 py-3 text-center text-sm font-medium text-white"
        >
          Upload bill
        </a>
      </div>
    </div>
  )
}
