import { useEffect, useState, useRef } from 'react'

const API_URL = import.meta.env?.VITE_API_BASE_URL || 'https://api.uniewms.com/api/v1'
const COORDS_URL = `${API_URL}/wOwners/getAllOnlyCoordinates`
const US_GEOJSON_URL = 'https://raw.githubusercontent.com/shawnbot/topogram/master/data/us-states.geojson'

const LON_MIN = -125
const LON_MAX = -66
const LAT_MIN = 24
const LAT_MAX = 50

// Albers Equal Area Conic projection for better US map fit
function project(lat, lon) {
  const phi1 = 29.5 * Math.PI / 180
  const phi2 = 45.5 * Math.PI / 180
  const phi0 = 37.5 * Math.PI / 180
  const lambda0 = -96 * Math.PI / 180
  
  const phi = lat * Math.PI / 180
  const lambda = lon * Math.PI / 180
  
  const n = (Math.sin(phi1) + Math.sin(phi2)) / 2
  const C = Math.cos(phi1) * Math.cos(phi1) + 2 * n * Math.sin(phi1)
  const rho0 = Math.sqrt(C - 2 * n * Math.sin(phi0)) / n
  const rho = Math.sqrt(C - 2 * n * Math.sin(phi)) / n
  const theta = n * (lambda - lambda0)
  
  const scale = 40
  const x = 50 + (rho * Math.sin(theta)) * scale
  const y = 50 - (rho0 - rho * Math.cos(theta)) * scale
  
  return { x, y }
}

function ringToPath(ring) {
  if (!ring || ring.length < 2) return ''
  const pts = ring.map(([lon, lat]) => project(lat, lon))
  return pts.map((p, j) => `${j === 0 ? 'M' : 'L'} ${p.x.toFixed(3)} ${p.y.toFixed(3)}`).join(' ') + ' Z'
}

function generateConnections(nodes, maxConnections = 3) {
  const connections = []
  const usedPairs = new Set()
  
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    let connectionCount = 0
    
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

export default function UnifiedNetworkLayers({ scrollProgress = 0 }) {
  const [paths, setPaths] = useState([])
  const [warehouseNodes, setWarehouseNodes] = useState([])
  const [truckNodes, setTruckNodes] = useState([])
  const [courierNodes, setCourierNodes] = useState([])
  const [warehouseConnections, setWarehouseConnections] = useState([])
  const [truckConnections, setTruckConnections] = useState([])
  const [courierConnections, setCourierConnections] = useState([])

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
        
        if (coords.length > 0) {
          // Split into three distinct sets
          const total = coords.length
          const wNodes = coords.slice(0, Math.ceil(total * 0.4))
          const tNodes = coords.slice(Math.ceil(total * 0.2), Math.ceil(total * 0.6))
          const cNodes = coords.slice(Math.ceil(total * 0.4), Math.ceil(total * 0.8))
          
          setWarehouseNodes(wNodes)
          setTruckNodes(tNodes)
          setCourierNodes(cNodes)
          
          setWarehouseConnections(generateConnections(wNodes, 2))
          setTruckConnections(generateConnections(tNodes, 2))
          setCourierConnections(generateConnections(cNodes, 2))
        } else {
          // Fallback sample data
          const sampleNodes = [
            project(40.7128, -74.0060), // NYC
            project(34.0522, -118.2437), // LA
            project(41.8781, -87.6298), // Chicago
            project(29.7604, -95.3698), // Houston
            project(33.4484, -112.0740), // Phoenix
            project(39.9526, -75.1652), // Philadelphia
            project(32.7767, -96.7970), // Dallas
            project(25.7617, -80.1918), // Miami
            project(47.6062, -122.3321), // Seattle
            project(39.7392, -104.9903), // Denver
            project(36.1627, -86.7816), // Nashville
            project(35.2271, -80.8431), // Charlotte
            project(37.7749, -122.4194), // San Francisco
            project(38.9072, -77.0369), // Washington DC
            project(42.3601, -71.0589), // Boston
          ]
          const wNodes = sampleNodes.slice(0, 6)
          const tNodes = sampleNodes.slice(3, 9)
          const cNodes = sampleNodes.slice(6, 12)
          
          setWarehouseNodes(wNodes)
          setTruckNodes(tNodes)
          setCourierNodes(cNodes)
          
          setWarehouseConnections(generateConnections(wNodes, 2))
          setTruckConnections(generateConnections(tNodes, 2))
          setCourierConnections(generateConnections(cNodes, 2))
        }
      })
      .catch(() => {
        // Fallback
        const sampleNodes = [
          project(40.7128, -74.0060),
          project(34.0522, -118.2437),
          project(41.8781, -87.6298),
          project(29.7604, -95.3698),
          project(33.4484, -112.0740),
          project(39.9526, -75.1652),
          project(32.7767, -96.7970),
          project(25.7617, -80.1918),
        ]
        setWarehouseNodes(sampleNodes.slice(0, 4))
        setTruckNodes(sampleNodes.slice(2, 6))
        setCourierNodes(sampleNodes.slice(4, 8))
      })
  }, [])

  // Progressive layer reveal - each layer gets 33% of scroll
  const layer1Progress = Math.max(0, Math.min(1, scrollProgress / 0.33))
  const layer2Progress = Math.max(0, Math.min(1, (scrollProgress - 0.33) / 0.33))
  const layer3Progress = Math.max(0, Math.min(1, (scrollProgress - 0.66) / 0.34))

  // Layer visibility
  const showLayer1 = layer1Progress > 0.05
  const showLayer2 = layer2Progress > 0.05
  const showLayer3 = layer3Progress > 0.05

  return (
    <div className="unified-network-layers">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        className="unified-layers-svg"
      >
        {/* US Map Background - Visible and properly projected */}
        <g className="us-map-background">
          {paths.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="rgba(255,255,255,0.05)"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="0.3"
            />
          ))}
        </g>

        {/* Layer 1: Warehouses - Base layer */}
        {showLayer1 && (
          <g 
            className="network-layer layer-warehouses"
            style={{ 
              opacity: Math.min(1, layer1Progress * 1.5),
            }}
          >
            {/* Connections */}
            {warehouseConnections.map((conn, i) => {
              const connProgress = Math.min(1, (layer1Progress - 0.2) * 2)
              const show = i < Math.floor(warehouseConnections.length * connProgress)
              return (
                <line
                  key={`w-conn-${i}`}
                  x1={conn.from.x}
                  y1={conn.from.y}
                  x2={conn.to.x}
                  y2={conn.to.y}
                  stroke="rgba(122,240,198,0.5)"
                  strokeWidth="0.4"
                  style={{ 
                    opacity: show ? 1 : 0,
                    transition: 'opacity 0.2s ease'
                  }}
                />
              )
            })}
            {/* Nodes */}
            {warehouseNodes.map((p, i) => {
              const nodeProgress = Math.min(1, (layer1Progress - 0.1) * 3)
              const show = i < Math.floor(warehouseNodes.length * nodeProgress)
              return (
                <g key={`w-node-${i}`} style={{ opacity: show ? 1 : 0, transition: 'opacity 0.3s ease' }}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="1.2"
                    fill="rgba(122,240,198,0.8)"
                    stroke="rgba(122,240,198,1)"
                    strokeWidth="0.25"
                  />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="2.0"
                    fill="none"
                    stroke="rgba(122,240,198,0.4)"
                    strokeWidth="0.2"
                    className="pulse-ring"
                  />
                </g>
              )
            })}
          </g>
        )}

        {/* Layer 2: Trucks - Overlay layer */}
        {showLayer2 && (
          <g 
            className="network-layer layer-trucks"
            style={{ 
              opacity: Math.min(1, layer2Progress * 1.5),
            }}
          >
            {/* Connections */}
            {truckConnections.map((conn, i) => {
              const connProgress = Math.min(1, (layer2Progress - 0.2) * 2)
              const show = i < Math.floor(truckConnections.length * connProgress)
              return (
                <line
                  key={`t-conn-${i}`}
                  x1={conn.from.x}
                  y1={conn.from.y}
                  x2={conn.to.x}
                  y2={conn.to.y}
                  stroke="rgba(133,169,255,0.5)"
                  strokeWidth="0.4"
                  style={{ 
                    opacity: show ? 1 : 0,
                    transition: 'opacity 0.2s ease'
                  }}
                />
              )
            })}
            {/* Nodes */}
            {truckNodes.map((p, i) => {
              const nodeProgress = Math.min(1, (layer2Progress - 0.1) * 3)
              const show = i < Math.floor(truckNodes.length * nodeProgress)
              return (
                <g key={`t-node-${i}`} style={{ opacity: show ? 1 : 0, transition: 'opacity 0.3s ease' }}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="1.1"
                    fill="rgba(133,169,255,0.8)"
                    stroke="rgba(133,169,255,1)"
                    strokeWidth="0.25"
                  />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="1.9"
                    fill="none"
                    stroke="rgba(133,169,255,0.4)"
                    strokeWidth="0.2"
                    className="pulse-ring"
                  />
                </g>
              )
            })}
          </g>
        )}

        {/* Layer 3: Couriers - Final overlay layer */}
        {showLayer3 && (
          <g 
            className="network-layer layer-couriers"
            style={{ 
              opacity: Math.min(1, layer3Progress * 1.5),
            }}
          >
            {/* Connections */}
            {courierConnections.map((conn, i) => {
              const connProgress = Math.min(1, (layer3Progress - 0.2) * 2)
              const show = i < Math.floor(courierConnections.length * connProgress)
              return (
                <line
                  key={`c-conn-${i}`}
                  x1={conn.from.x}
                  y1={conn.from.y}
                  x2={conn.to.x}
                  y2={conn.to.y}
                  stroke="rgba(255,193,7,0.5)"
                  strokeWidth="0.4"
                  style={{ 
                    opacity: show ? 1 : 0,
                    transition: 'opacity 0.2s ease'
                  }}
                />
              )
            })}
            {/* Nodes */}
            {courierNodes.map((p, i) => {
              const nodeProgress = Math.min(1, (layer3Progress - 0.1) * 3)
              const show = i < Math.floor(courierNodes.length * nodeProgress)
              return (
                <g key={`c-node-${i}`} style={{ opacity: show ? 1 : 0, transition: 'opacity 0.3s ease' }}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="1.0"
                    fill="rgba(255,193,7,0.8)"
                    stroke="rgba(255,193,7,1)"
                    strokeWidth="0.25"
                  />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="1.8"
                    fill="none"
                    stroke="rgba(255,193,7,0.4)"
                    strokeWidth="0.2"
                    className="pulse-ring"
                  />
                </g>
              )
            })}
          </g>
        )}
      </svg>
    </div>
  )
}
