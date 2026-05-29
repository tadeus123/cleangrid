import { useCallback, useEffect, useRef, useState } from 'react'
import {
  computeEstimate,
  inferFloorsFromOsm,
  inferUseFromOsm,
  applyAiRange,
  type BuildingUse,
  type EstimateResult,
} from '../lib/estimate'
import { formatMoney } from '../lib/currency'
import {
  searchAddress,
  fetchBuildingFootprint,
  defaultFootprint,
  type GeocodeResult,
} from '../lib/osm'
import { useCurrency } from '../context/CurrencyContext'
import { CurrencySelect } from './CurrencySelect'
import { BuildingMap } from './BuildingMap'
import 'leaflet/dist/leaflet.css'

const USE_LABELS: Record<BuildingUse, string> = {
  office: 'Office',
  school: 'School',
  factory: 'Factory',
  hotel: 'Hotel',
  warehouse: 'Warehouse',
  retail: 'Retail',
  other: 'Large building',
}

export function BuildingMapEstimator() {
  const { currency } = useCurrency()
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<GeocodeResult[]>([])
  const [openSuggest, setOpenSuggest] = useState(false)
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useState<GeocodeResult | null>(null)
  const [polygon, setPolygon] = useState<[number, number][] | null>(null)
  const [footprintSqm, setFootprintSqm] = useState(0)
  const [footprintSource, setFootprintSource] = useState<'osm' | 'default'>('default')
  const [estimate, setEstimate] = useState<EstimateResult | null>(null)
  const [aiNote, setAiNote] = useState<string | null>(null)
  const [confidence, setConfidence] = useState<string>('medium')
  const [needsReview, setNeedsReview] = useState(false)
  const [buildingUse, setBuildingUse] = useState<BuildingUse>('office')
  const [floors, setFloors] = useState(4)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const runAiRefine = useCallback(
    async (
      loc: GeocodeResult,
      det: EstimateResult,
      source: 'osm' | 'default',
      tags: Record<string, string>,
    ) => {
      try {
        const res = await fetch('/api/estimate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            address: loc.label,
            footprintSource: source,
            osmTags: tags,
            currency,
            deterministic: det,
          }),
        })
        const data = await res.json()
        if (data.monthlyTraditionalLow && data.monthlyTraditionalHigh) {
          setEstimate(
            applyAiRange(det, currency, {
              monthlyTraditionalLow: data.monthlyTraditionalLow,
              monthlyTraditionalHigh: data.monthlyTraditionalHigh,
              cleanGridLow: data.cleanGridLow,
              cleanGridHigh: data.cleanGridHigh,
            }),
          )
        }
        setAiNote(data.note ?? null)
        setConfidence(data.confidence ?? 'medium')
        setNeedsReview(Boolean(data.needsReview))
      } catch {
        setAiNote(
          source === 'osm'
            ? 'Based on mapped building outline. Upload your cleaning bill to lock 10% pricing.'
            : 'Outline estimated from map pin — upload your bill or book a scan for exact pricing.',
        )
        setNeedsReview(source !== 'osm')
      }
    },
    [currency],
  )

  const runEstimate = useCallback(
    async (
      loc: GeocodeResult,
      poly: [number, number][],
      areaSqm: number,
      tags: Record<string, string>,
      source: 'osm' | 'default',
    ) => {
      const use = inferUseFromOsm(tags)
      const fl = inferFloorsFromOsm(tags, areaSqm)
      setBuildingUse(use)
      setFloors(fl)
      setFootprintSqm(areaSqm)
      setPolygon(poly)
      setFootprintSource(source)

      const det = computeEstimate({
        footprintSqm: areaSqm,
        floors: fl,
        buildingUse: use,
        currency,
        source,
      })
      setEstimate(det)
      setAiNote(null)
      setLoading(true)
      await runAiRefine(loc, det, source, tags)
      setLoading(false)
    },
    [currency, runAiRefine],
  )

  const selectPlace = async (place: GeocodeResult) => {
    setQuery(place.label)
    setOpenSuggest(false)
    setLocation(place)
    setLoading(true)
    setSuggestions([])

    const footprint = await fetchBuildingFootprint(place.lat, place.lon)
    const fp = footprint ?? defaultFootprint(place.lat, place.lon)
    await runEstimate(place, fp.polygon, fp.areaSqm, fp.tags, fp.source)
  }

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (query.length < 3) {
      setSuggestions([])
      return
    }
    debounceRef.current = setTimeout(async () => {
      const results = await searchAddress(query)
      setSuggestions(results)
      setOpenSuggest(results.length > 0)
    }, 280)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query])

  useEffect(() => {
    if (!footprintSqm || !location) return
    const det = computeEstimate({
      footprintSqm,
      floors,
      buildingUse,
      currency,
      source: footprintSource,
    })
    setEstimate(det)
  }, [currency, floors, buildingUse, footprintSqm, footprintSource, location])

  const center = location
    ? ([location.lat, location.lon] as [number, number])
    : ([52.52, 13.405] as [number, number])
  const zoom = location ? 17 : 4

  const yearlySave =
    estimate &&
    `${formatMoney(estimate.saveLow * 12, currency)} – ${formatMoney(estimate.saveHigh * 12, currency)}`

  return (
    <section id="map-estimate" className="section-anchor relative border-t border-white/5 bg-graphite-light py-16 md:py-20">
      <div className="grid-bg absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center lg:text-left">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Instant ballpark (optional)
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Search your building on the map
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-muted lg:mx-0">
            We read the footprint from OpenStreetMap and show a conservative savings range in seconds.
            For a binding price, upload your cleaning bill — we charge 10% of that amount.
          </p>
        </div>

        <div className="relative z-20 mt-8">
          <div className="relative">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => suggestions.length > 0 && setOpenSuggest(true)}
              placeholder="Search building address…"
              className="w-full rounded-xl border border-white/15 bg-graphite-light py-4 pl-5 pr-12 text-lg text-white placeholder:text-slate-muted shadow-lg focus:border-accent"
              autoComplete="off"
            />
            {loading && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-accent">
                …
              </span>
            )}
          </div>
          {openSuggest && suggestions.length > 0 && (
            <ul className="absolute z-30 mt-2 max-h-64 w-full overflow-auto rounded-xl border border-white/10 bg-graphite-light py-2 shadow-xl">
              {suggestions.map((s, i) => (
                <li key={`${s.lat}-${s.lon}-${i}`}>
                  <button
                    type="button"
                    className="w-full px-5 py-3 text-left text-sm text-white hover:bg-white/5"
                    onClick={() => selectPlace(s)}
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-5">
          <div className="relative z-0 h-[280px] overflow-hidden rounded-xl border border-white/10 lg:col-span-3 lg:h-[360px]">
            <BuildingMap center={center} zoom={zoom} polygon={polygon} />
            {!location && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-graphite/60 text-sm text-slate-muted">
                Search a building to start
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center lg:col-span-2">
            {estimate && location ? (
              <div className="report-glow rounded-xl border border-accent/20 bg-graphite-light p-6">
                <p className="text-xs uppercase tracking-wider text-slate-muted">
                  {footprintSource === 'osm' ? 'Mapped footprint' : 'Estimated outline'} ·{' '}
                  {confidence} confidence
                </p>
                <p className="mt-1 truncate text-sm font-medium text-white">{location.label}</p>
                <p className="mt-3 text-sm text-slate-muted">
                  ~{estimate.footprintSqm.toLocaleString()} m² footprint · {floors} floors · ~
                  {estimate.cleanableSqm.toLocaleString()} m² cleanable · {USE_LABELS[buildingUse]}
                </p>

                <div className="mt-6 space-y-4">
                  <div>
                    <p className="text-xs text-slate-muted">Today&apos;s cleaning (est.)</p>
                    <p className="text-lg font-semibold text-white/80 line-through decoration-white/30">
                      {estimate.formatted.traditional}/mo
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-accent">CleanGrid (10% — save 90%)</p>
                    <p className="text-3xl font-bold text-accent">{estimate.formatted.cleanGrid}/mo</p>
                  </div>
                  {yearlySave && (
                    <p className="text-sm text-white">Save {yearlySave} per year</p>
                  )}
                </div>

                {aiNote && (
                  <p className="mt-4 rounded-lg bg-white/5 px-3 py-2 text-xs leading-relaxed text-slate-muted">
                    {aiNote}
                  </p>
                )}
                {needsReview && (
                  <p className="mt-2 text-xs text-amber-400/90">
                    Large or complex site — upload your bill or book a scan for a binding quote.
                  </p>
                )}

                <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                  <a
                    href="#upload"
                    className="flex-1 rounded-md bg-accent py-3 text-center text-sm font-semibold text-graphite"
                  >
                    Upload bill — lock 10%
                  </a>
                  <a
                    href="#site-scan"
                    className="flex-1 rounded-md border border-white/20 py-3 text-center text-sm font-medium text-white"
                  >
                    Book site scan
                  </a>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-white/15 p-8 text-center text-sm text-slate-muted">
                Type an address and pick a result — your savings estimate appears here instantly.
              </div>
            )}

            <div className="mt-4 flex items-center justify-between gap-3">
              <CurrencySelect className="text-xs" />
              {estimate && (
                <div className="flex flex-wrap gap-1">
                  {(Object.keys(USE_LABELS) as BuildingUse[]).slice(0, 4).map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setBuildingUse(u)}
                      className={`rounded-full px-2 py-0.5 text-[10px] ${
                        buildingUse === u ? 'bg-accent/20 text-accent' : 'text-slate-muted'
                      }`}
                    >
                      {USE_LABELS[u]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-muted lg:text-left">
          Indicative range from map data and industry benchmarks — not a binding offer. Final price =
          10% of your actual cleaning invoice after site validation.
        </p>
      </div>
    </section>
  )
}
