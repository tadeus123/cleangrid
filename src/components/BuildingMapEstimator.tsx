import { useCallback, useEffect, useRef, useState } from 'react'
import {
  computeEstimate,
  inferFloorsFromOsm,
  inferUseFromOsm,
  applyAiRange,
  type BuildingUse,
  type EstimateResult,
} from '../lib/estimate'
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
  other: 'Building',
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
  const [buildingUse, setBuildingUse] = useState<BuildingUse>('office')
  const [floors, setFloors] = useState(4)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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

      let det = computeEstimate({
        footprintSqm: areaSqm,
        floors: fl,
        buildingUse: use,
        currency,
        source,
      })
      setEstimate(det)
      setLoading(true)
      try {
        const res = await fetch('/api/estimate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            address: loc.label,
            footprintSource: source,
            currency,
            deterministic: det,
          }),
        })
        const data = await res.json()
        if (data.monthlyTraditionalLow && data.monthlyTraditionalHigh) {
          det = applyAiRange(det, currency, {
            monthlyTraditionalLow: data.monthlyTraditionalLow,
            monthlyTraditionalHigh: data.monthlyTraditionalHigh,
            cleanGridLow: data.cleanGridLow,
            cleanGridHigh: data.cleanGridHigh,
          })
          setEstimate(det)
        }
      } catch {
        /* deterministic only */
      } finally {
        setLoading(false)
      }
    },
    [currency],
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
      setSuggestions(await searchAddress(query))
      setOpenSuggest(true)
    }, 280)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query])

  useEffect(() => {
    if (!footprintSqm || !location) return
    setEstimate(
      computeEstimate({
        footprintSqm,
        floors,
        buildingUse,
        currency,
        source: footprintSource,
      }),
    )
  }, [currency, floors, buildingUse, footprintSqm, footprintSource, location])

  const center = location
    ? ([location.lat, location.lon] as [number, number])
    : ([52.52, 13.405] as [number, number])
  const zoom = location ? 17 : 4

  return (
    <section id="map-estimate" className="section-anchor border-t border-white/5 bg-graphite py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl font-bold text-white md:text-3xl">Ballpark from your building on the map</h2>
        <p className="mt-2 max-w-xl text-slate-muted">
          Search an address — indicative range only. Upload your bill for a binding 10% price.
        </p>

        <div className="relative z-20 mt-6">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Building address…"
            className="w-full rounded-lg border border-white/15 bg-graphite-light py-3.5 pl-4 text-white placeholder:text-slate-muted"
            autoComplete="off"
          />
          {openSuggest && suggestions.length > 0 && (
            <ul className="absolute z-30 mt-1 max-h-48 w-full overflow-auto rounded-lg border border-white/10 bg-graphite-light py-1 shadow-xl">
              {suggestions.map((s, i) => (
                <li key={`${s.lat}-${i}`}>
                  <button
                    type="button"
                    className="w-full px-4 py-2.5 text-left text-sm text-white hover:bg-white/5"
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
          <div className="relative z-0 h-[260px] overflow-hidden rounded-lg border border-white/10 lg:col-span-3 lg:h-[320px]">
            <BuildingMap center={center} zoom={zoom} polygon={polygon} />
          </div>
          <div className="lg:col-span-2">
            {estimate && location ? (
              <div className="rounded-lg border border-accent/20 bg-graphite-light p-6">
                <p className="truncate text-sm text-white">{location.label}</p>
                <p className="mt-2 text-xs text-slate-muted">
                  ~{estimate.footprintSqm.toLocaleString()} m² · {floors} floors · {USE_LABELS[buildingUse]}
                </p>
                <p className="mt-4 text-xs text-slate-muted line-through">
                  Est. today {estimate.formatted.traditional}/mo
                </p>
                <p className="text-2xl font-bold text-accent">{estimate.formatted.cleanGrid}/mo</p>
                <a href="#upload" className="mt-4 block text-center text-sm font-semibold text-accent underline">
                  Upload bill to lock price →
                </a>
              </div>
            ) : (
              <p className="flex h-full min-h-[120px] items-center text-sm text-slate-muted">
                {loading ? 'Calculating…' : 'Select an address'}
              </p>
            )}
            <CurrencySelect className="mt-4" />
          </div>
        </div>
      </div>
    </section>
  )
}
