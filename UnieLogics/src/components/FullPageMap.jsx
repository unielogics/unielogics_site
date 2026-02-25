import { useEffect, useState, useRef } from 'react'

const API_URL = 'https://api.unielogics.com'
const COORDS_URL = `${API_URL}/wOwners/getAllOnlyCoordinates`
const US_GEOJSON_URL = 'https://raw.githubusercontent.com/shawnbot/topogram/master/data/us-states.geojson'

const LON_MIN = -125
const LON_MAX = -66
const LAT_MIN = 24
const LAT_MAX = 50

const VIEW_HEIGHT = 42

function project(lat, lon) {
  const x = ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * 100
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * VIEW_HEIGHT
  return { x, y }
}

function ringToPath(ring) {
  if (!ring || ring.length < 2) return ''
  const pts = ring.map(([lon, lat]) => project(lat, lon))
  return pts.map((p, j) => `${j === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ') + ' Z'
}

export default function FullPageMap() {
  const [paths, setPaths] = useState([])
  const [pins, setPins] = useState([])
  const containerRef = useRef(null)
  const svgRef = useRef(null)

  useEffect(() => {
    const c = containerRef.current
    const s = svgRef.current
    if (!c || !s) return
    Object.assign(c.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      zIndex: '0',
      pointerEvents: 'none',
      opacity: '0.75',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '1200px',
    })
    Object.assign(s.style, {
      width: 'calc(100vw + 100px)',
      maxWidth: '2020px',
      height: 'auto',
      flexShrink: '0',
      transform: 'scaleX(1.2) perspective(2200px) rotateX(6deg) rotateY(-1deg)',
      transformOrigin: 'center center',
    })
  }, [])

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
    <div ref={containerRef} className="full-page-map" aria-hidden="true">
      <svg
        ref={svgRef}
        viewBox="0 0 100 42"
        preserveAspectRatio="xMidYMid meet"
      >
        <g className="full-page-map-states">
          {paths.map((d, i) => (
            <path key={i} d={d} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.2" />
          ))}
        </g>
        <g className="full-page-map-pins">
          {pins.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="0.65" fill="rgba(122,240,198,0.5)" stroke="rgba(122,240,198,0.35)" strokeWidth="0.2" />
          ))}
        </g>
      </svg>
    </div>
  )
}
