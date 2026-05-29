import { BuildingVisual } from './BuildingVisual'
import { CTAButtons } from './CTAButtons'
import {
  HERO_USD_EXAMPLE_BILL,
  HERO_USD_EXAMPLE_CLEANGRID,
  HERO_USD_PRICE,
  HERO_USD_UNIT,
} from '../constants/pricing'

export function Hero() {
  return (
    <section className="section-anchor relative overflow-hidden bg-graphite pt-28 pb-20 md:pt-32 md:pb-24">
      <div className="grid-bg absolute inset-0 opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-r from-graphite via-graphite/95 to-transparent" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.28em]">
            <span className="text-accent">Clean</span>
            <span className="text-white/90">Grid</span>
          </p>

          <h1 className="font-serif text-[1.75rem] font-normal leading-[1.2] tracking-tight text-white md:text-4xl lg:text-[2.65rem]">
            Affordable humanoid robotic cleaning from{' '}
            <span className="text-accent">
              ${HERO_USD_PRICE.toFixed(2)} {HERO_USD_UNIT}
            </span>{' '}
            in the world&apos;s largest commercial buildings.
          </h1>

          <p className="mt-6 max-w-md text-sm text-slate-muted">
            Example: ${HERO_USD_EXAMPLE_BILL.toLocaleString('en-US')}/month on cleaning today →{' '}
            <span className="font-medium text-white">
              ${HERO_USD_EXAMPLE_CLEANGRID.toLocaleString('en-US')}/month
            </span>{' '}
            with CleanGrid. Same building — we own and operate the fleet.
          </p>

          <CTAButtons className="mt-8" primary="upload" />

          <p className="mt-6 text-xs text-slate-muted">
            Buildings over 5,000 m² · EU, UK, North America · written quote from your invoice
          </p>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[420px] lg:max-w-none">
          <BuildingVisual className="h-full w-full" />
        </div>
      </div>
    </section>
  )
}
