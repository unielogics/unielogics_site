import { useEffect, useState, useRef } from 'react'
import { MapContainer, TileLayer, CircleMarker, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const API_URL = import.meta.env?.VITE_API_BASE_URL || 'https://api.uniewms.com/api/v1'
const COORDS_URL = `${API_URL}/wOwners/getAllOnlyCoordinates`

// Minimal static map – no zoom/drag, muted styling
const DARK_TILE = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'

function FitBounds({ points }) {
  const map = useMap()
  useEffect(() => {
    if (!points.length) return
    try {
      const bounds = L.latLngBounds(points.map(([lat, lng]) => [lat, lng]))
      map.fitBounds(bounds, { padding: [80, 80], maxZoom: 5 })
    } catch (_) {}
  }, [map, points])
  return null
}

export default function NetworkMapBackground() {
  const [points, setPoints] = useState([])
  const containerRef = useRef(null)

  useEffect(() => {
    fetch(COORDS_URL)
      .then((r) => r.json())
      .then((data) => {
        const list = data?.response || []
        const coords = list
          .filter((w) => Number.isFinite(w.lat) && Number.isFinite(w.long))
          .filter((w) => Math.abs(w.lat) <= 90 && Math.abs(w.long) <= 180)
          .map((w) => [Number(w.lat), Number(w.long)])
        setPoints(coords)
      })
      .catch(() => setPoints([]))
  }, [])

  return (
    <div
      ref={containerRef}
      className="network-map-bg"
      aria-hidden="true"
    >
      <MapContainer
        center={[39.5, -98.35]}
        zoom={4}
        className="network-map-container"
        scrollWheelZoom={false}
        doubleClickZoom={false}
        dragging={false}
        zoomControl={false}
        attributionControl={false}
        keyboard={false}
      >
        <TileLayer url={DARK_TILE} opacity={0.35} />
        {points.length > 0 && <FitBounds points={points} />}
        {points.map(([lat, lng], i) => (
          <CircleMarker
            key={i}
            center={[lat, lng]}
            radius={4}
            pathOptions={{
              fillColor: 'rgba(122,240,198,0.5)',
              color: 'rgba(122,240,198,0.4)',
              weight: 1,
              fillOpacity: 0.6,
            }}
          />
        ))}
      </MapContainer>
    </div>
  )
}
