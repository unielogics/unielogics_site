import { useEffect, useState } from 'react'

const API_URL = 'https://api.unielogics.com'
const COORDS_URL = `${API_URL}/wOwners/getAllOnlyCoordinates`
const US_GEOJSON_URL = 'https://raw.githubusercontent.com/shawnbot/topogram/master/data/us-states.geojson'

// Project lat/lon to SVG coords (Albers-like, contiguous US bounds)
const LON_MIN = -125, LON_MAX = -66, LAT_MIN = 24, LAT_MAX = 50
function project(lat, lon) {
  const x = ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * 100
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * 100
  return { x, y }
}

function ringToPath(ring) {
  if (!ring || ring.length < 2) return ''
  const pts = ring.map(([lon, lat]) => project(lat, lon))
  return pts.map((p, j) => `${j === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ') + ' Z'
}

export default function HeaderMap() {
  const [paths, setPaths] = useState([])
  const [pins, setPins] = useState([])

  useEffect(() => {
    fetch(US_GEOJSON_URL)
      .then((r) => r.json())
      .then((data) => {
        const features = data?.features || []
        const exclude = new Set(['AK', 'HI', 'PR', 'GU', 'VI'])
        const ps = features
          .filter((f) => !exclude.has(f?.properties?.postal || ''))
          .map((f) => {
            const geom = f?.geometry
            if (!geom) return ''
            if (geom.type === 'Polygon') {
              return geom.coordinates.map(ringToPath).join(' ')
            }
            if (geom.type === 'MultiPolygon') {
              return geom.coordinates.flatMap((poly) => poly.map(ringToPath)).join(' ')
            }
            return ''
          })
          .filter(Boolean)
        setPaths(ps)
      })
      .catch(() => setPaths([]))
  }, [])

  useEffect(() => {
    fetch(COORDS_URL, { credentials: 'omit' })
      .then((r) => r.json())
      .then((data) => {
        const list = data?.response || []
        const coords = list
          .filter((w) => {
            const lat = w?.lat ?? w?.latitude
            const lon = w?.long ?? w?.lon ?? w?.longitude
            return Number.isFinite(lat) && Number.isFinite(lon)
          })
          .filter((w) => {
            const lat = Number(w?.lat ?? w?.latitude)
            const lon = Number(w?.long ?? w?.lon ?? w?.longitude)
            return lat >= LAT_MIN && lat <= LAT_MAX && lon >= LON_MIN && lon <= LON_MAX
          })
          .map((w) => project(Number(w?.lat ?? w?.latitude), Number(w?.long ?? w?.lon ?? w?.longitude)))
        setPins(coords)
      })
      .catch(() => setPins([]))
  }, [])

  return (
    <div className="header-map-svg" aria-hidden="true">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        className="header-map-svg-inner"
      >
        <g className="header-map-states">
          {paths.map((d, i) => (
            <path key={i} d={d} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.35" />
          ))}
        </g>
        <g className="header-map-pins">
          {pins.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="1.2" fill="rgba(122,240,198,0.95)" stroke="rgba(122,240,198,0.6)" strokeWidth="0.3" />
          ))}
        </g>
      </svg>
    </div>
  )
}
