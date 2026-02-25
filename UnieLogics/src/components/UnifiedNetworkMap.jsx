import { useEffect, useState, useRef } from 'react'

const API_URL = 'https://api.unielogics.com'
const COORDS_URL = `${API_URL}/wOwners/getAllOnlyCoordinates`
const US_GEOJSON_URL = 'https://raw.githubusercontent.com/shawnbot/topogram/master/data/us-states.geojson'

const LON_MIN = -125
const LON_MAX = -66
const LAT_MIN = 24
const LAT_MAX = 50

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

// Generate network connections between nodes
function generateConnections(nodes, maxConnections = 3) {
  const connections = []
  const usedPairs = new Set()
  
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    let connectionCount = 0
    
    // Connect to nearest nodes
    const distances = nodes
      .map((other, idx) => ({
        node: other,
        idx,
        dist: Math.sqrt(
          Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2)
        )
      }))
      .filter(({ idx }) => idx !== i)
      .sort((a, b) => a.dist - b.dist)
      .slice(0, maxConnections)
    
    distances.forEach(({ node: other, idx }) => {
      const pairKey = `${Math.min(i, idx)}-${Math.max(i, idx)}`
      if (!usedPairs.has(pairKey) && connectionCount < maxConnections) {
        connections.push({
          from: node,
          to: other,
          distance: Math.sqrt(
            Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2)
          )
        })
        usedPairs.add(pairKey)
        connectionCount++
      }
    })
  }
  
  return connections
}

export default function UnifiedNetworkMap({ className = '' }) {
  const [paths, setPaths] = useState([])
  const [pins, setPins] = useState([])
  const [connections, setConnections] = useState([])
  const [animated, setAnimated] = useState(false)
  const svgRef = useRef(null)

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
        
        // Generate network connections
        if (coords.length > 0) {
          const conns = generateConnections(coords, 2)
          setConnections(conns)
        }
      })
      .catch(() => {
        setPins([])
        // Fallback: create sample network for demo
        const sampleNodes = [
          project(40.7128, -74.0060), // NYC
          project(34.0522, -118.2437), // LA
          project(41.8781, -87.6298), // Chicago
          project(29.7604, -95.3698), // Houston
          project(33.4484, -112.0740), // Phoenix
          project(39.9526, -75.1652), // Philadelphia
          project(32.7767, -96.7970), // Dallas
          project(25.7617, -80.1918), // Miami
        ]
        setPins(sampleNodes)
        const conns = generateConnections(sampleNodes, 2)
        setConnections(conns)
      })
  }, [])

  useEffect(() => {
    // Trigger animation after connections are set
    if (connections.length > 0) {
      setTimeout(() => setAnimated(true), 100)
    }
  }, [connections])

  return (
    <div className={`unified-network-map ${className}`}>
      <svg
        ref={svgRef}
        viewBox="0 0 100 42"
        preserveAspectRatio="xMidYMid meet"
        className="network-map-svg"
      >
        {/* State boundaries */}
        <g className="network-map-states">
          {paths.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="0.15"
            />
          ))}
        </g>

        {/* Network connections */}
        <g className="network-map-connections">
          {connections.map((conn, i) => (
            <line
              key={i}
              x1={conn.from.x}
              y1={conn.from.y}
              x2={conn.to.x}
              y2={conn.to.y}
              stroke="rgba(122,240,198,0.2)"
              strokeWidth="0.15"
              className={animated ? 'connection-line animated' : 'connection-line'}
              style={{
                strokeDasharray: `${conn.distance * 0.3} ${conn.distance * 0.7}`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </g>

        {/* Network nodes */}
        <g className="network-map-nodes">
          {pins.map((p, i) => (
            <g key={i} className="network-node">
              {/* Outer glow */}
              <circle
                cx={p.x}
                cy={p.y}
                r="1.2"
                fill="rgba(122,240,198,0.15)"
                className={animated ? 'node-glow animated' : 'node-glow'}
                style={{ animationDelay: `${i * 0.05}s` }}
              />
              {/* Node core */}
              <circle
                cx={p.x}
                cy={p.y}
                r="0.6"
                fill="rgba(122,240,198,0.8)"
                stroke="rgba(122,240,198,1)"
                strokeWidth="0.2"
                className={animated ? 'node-core animated' : 'node-core'}
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  )
}
