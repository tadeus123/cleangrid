import { useEffect } from 'react'
import { MapContainer, TileLayer, Polygon, useMap } from 'react-leaflet'
import type { LatLngExpression } from 'leaflet'

type Props = {
  center: LatLngExpression
  zoom: number
  polygon: [number, number][] | null
}

function FlyTo({ center, zoom }: { center: LatLngExpression; zoom: number }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 0.8 })
  }, [map, center, zoom])
  return null
}

export function BuildingMap({ center, zoom, polygon }: Props) {
  const positions = polygon?.map(([lat, lng]) => [lat, lng] as LatLngExpression) ?? []

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="h-full w-full rounded-lg"
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
      <FlyTo center={center} zoom={zoom} />
      {positions.length >= 3 && (
        <Polygon
          positions={positions}
          pathOptions={{ color: '#14b8a6', fillColor: '#14b8a6', fillOpacity: 0.25, weight: 2 }}
        />
      )}
    </MapContainer>
  )
}
