export type GeocodeResult = {
  lat: number
  lon: number
  label: string
  osmId?: number
}

export type BuildingFootprint = {
  polygon: [number, number][] // [lat, lng]
  areaSqm: number
  tags: Record<string, string>
  source: 'osm' | 'default'
}

/** Photon (Komoot) — free geocoding, no API key */
export async function searchAddress(query: string): Promise<GeocodeResult[]> {
  if (query.trim().length < 3) return []
  const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=6&lang=en`
  const res = await fetch(url)
  if (!res.ok) return []
  const data = (await res.json()) as {
    features: {
      geometry: { coordinates: [number, number] }
      properties: { name?: string; city?: string; country?: string; osm_id?: number; osm_type?: string }
    }[]
  }
  return data.features
    .filter((f) => {
      const p = f.properties
      const t = (p as { osm_value?: string }).osm_value
      return !t || ['building', 'house', 'commercial', 'industrial', 'retail'].includes(t) || p.name
    })
    .map((f) => ({
      lat: f.geometry.coordinates[1],
      lon: f.geometry.coordinates[0],
      label: [f.properties.name, f.properties.city, f.properties.country].filter(Boolean).join(', '),
      osmId: f.properties.osm_id,
    }))
}

function ringAreaSqm(ring: [number, number][]): number {
  if (ring.length < 3) return 0
  const R = 6378137
  let area = 0
  for (let i = 0; i < ring.length; i++) {
    const [lat1, lon1] = ring[i]
    const [lat2, lon2] = ring[(i + 1) % ring.length]
    area +=
      ((lon2 - lon1) * Math.PI) / 180 *
      (2 + Math.sin((lat1 * Math.PI) / 180) + Math.sin((lat2 * Math.PI) / 180))
  }
  return Math.abs((area * R * R) / 2)
}

/** Overpass: building footprint nearest point */
export async function fetchBuildingFootprint(lat: number, lon: number): Promise<BuildingFootprint | null> {
  const query = `
    [out:json][timeout:20];
    (
      way["building"](around:60,${lat},${lon});
      relation["building"](around:60,${lat},${lon});
    );
    out body geom;
  `
  try {
    const res = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: `data=${encodeURIComponent(query)}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    if (!res.ok) return null
    const data = (await res.json()) as {
      elements: {
        type: string
        tags?: Record<string, string>
        geometry?: { lat: number; lon: number }[]
        members?: { role: string; geometry?: { lat: number; lon: number }[] }[]
      }[]
    }

    let best: BuildingFootprint | null = null
    let bestArea = 0

    for (const el of data.elements) {
      let ring: [number, number][] = []
      const tags = el.tags ?? {}

      if (el.type === 'way' && el.geometry && el.geometry.length >= 3) {
        ring = el.geometry.map((g) => [g.lat, g.lon] as [number, number])
      } else if (el.type === 'relation' && el.members) {
        const outer = el.members.find((m) => m.role === 'outer' && m.geometry)
        if (outer?.geometry) {
          ring = outer.geometry.map((g) => [g.lat, g.lon] as [number, number])
        }
      }
      if (ring.length < 3) continue
      const areaSqm = ringAreaSqm(ring)
      if (areaSqm > 200 && areaSqm > bestArea) {
        bestArea = areaSqm
        best = { polygon: ring, areaSqm: Math.round(areaSqm), tags, source: 'osm' }
      }
    }
    return best
  } catch {
    return null
  }
}

/** Fallback rectangle ~typical city block commercial */
export function defaultFootprint(lat: number, lon: number, areaSqm = 4500): BuildingFootprint {
  const side = Math.sqrt(areaSqm)
  const dLat = (side / 2 / 6378137) * (180 / Math.PI)
  const dLon = (side / 2 / (6378137 * Math.cos((lat * Math.PI) / 180))) * (180 / Math.PI)
  const polygon: [number, number][] = [
    [lat - dLat, lon - dLon],
    [lat - dLat, lon + dLon],
    [lat + dLat, lon + dLon],
    [lat + dLat, lon - dLon],
  ]
  return {
    polygon,
    areaSqm,
    tags: { building: 'commercial' },
    source: 'default',
  }
}
