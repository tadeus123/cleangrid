import { useState, useMemo } from 'react'
import { CTAButtons } from './CTAButtons'

function formatEuro(n: number) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n)
}

export function SavingsCalculator() {
  const [monthly, setMonthly] = useState(50000)

  const { cleanGrid, monthlySave, yearlySave } = useMemo(() => {
    const cleanGrid = Math.round(monthly * 0.1)
    const monthlySave = monthly - cleanGrid
    const yearlySave = monthlySave * 12
    return { cleanGrid, monthlySave, yearlySave }
  }, [monthly])

  return (
    <section id="calculator" className="border-y border-white/5 bg-graphite-light py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Show us your bill. We clean for 10%.
            </h2>
            <p className="mt-4 text-slate-muted">
              Your current cleaning invoice is the only proof we need. CleanGrid price = 10% of
              what you pay today. Same building. Twice as clean. Half the time.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-graphite p-8 report-glow">
            <label htmlFor="monthly-cost" className="block text-sm font-medium text-slate-muted">
              Current monthly cleaning bill
            </label>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-2xl text-white/50">€</span>
              <input
                id="monthly-cost"
                type="range"
                min={5000}
                max={500000}
                step={5000}
                value={monthly}
                onChange={(e) => setMonthly(Number(e.target.value))}
                className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-white/10 accent-accent"
              />
            </div>
            <p className="mt-2 text-3xl font-bold text-white">{formatEuro(monthly)}</p>

            <div className="mt-8 space-y-4 border-t border-white/10 pt-8">
              <div className="flex justify-between">
                <span className="text-slate-muted">CleanGrid estimated price</span>
                <span className="text-xl font-semibold text-accent">{formatEuro(cleanGrid)}/mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-muted">Monthly savings</span>
                <span className="font-semibold text-white">{formatEuro(monthlySave)}</span>
              </div>
              <div className="flex justify-between rounded-lg bg-accent/10 px-4 py-3">
                <span className="font-medium text-white">Estimated yearly savings</span>
                <span className="text-xl font-bold text-accent">{formatEuro(yearlySave)}</span>
              </div>
            </div>

            <CTAButtons className="mt-8" primary="upload" />
          </div>
        </div>
      </div>
    </section>
  )
}
