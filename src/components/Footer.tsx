export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-graphite py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-white">CleanGrid</span>
        </div>
        <p className="text-center text-sm text-slate-muted">
          The robotic cleanliness layer for large buildings.
          <br />
          Cleaner buildings. Lower costs. Fully operated by us.
        </p>
        <p className="text-xs text-slate-muted">© {new Date().getFullYear()} CleanGrid</p>
      </div>
    </footer>
  )
}
