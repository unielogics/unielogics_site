import { useEffect, useState, useRef } from 'react'

const API_URL = 'https://api.unielogics.com'
const COORDS_URL = `${API_URL}/wOwners/getAllOnlyCoordinates`
const US_GEOJSON_URL = 'https://raw.githubusercontent.com/shawnbot/topogram/master/data/us-states.geojson'

const LON_MIN = -125
const LON_MAX = -66
const LAT_MIN = 24
const LAT_MAX = 50

// Better projection for US map - Albers Equal Area Conic projection
function project(lat, lon) {
  // Albers Equal Area Conic projection parameters for US
  const phi1 = 29.5 * Math.PI / 180 // Standard parallel 1
  const phi2 = 45.5 * Math.PI / 180 // Standard parallel 2
  const phi0 = 37.5 * Math.PI / 180 // Central latitude
  const lambda0 = -96 * Math.PI / 180 // Central longitude
  
  const phi = lat * Math.PI / 180
  const lambda = lon * Math.PI / 180
  
  const n = (Math.sin(phi1) + Math.sin(phi2)) / 2
  const C = Math.cos(phi1) * Math.cos(phi1) + 2 * n * Math.sin(phi1)
  const rho0 = Math.sqrt(C - 2 * n * Math.sin(phi0)) / n
  const rho = Math.sqrt(C - 2 * n * Math.sin(phi)) / n
  const theta = n * (lambda - lambda0)
  
  // Scale and translate to fit viewBox
  const scale = 42
  const x = 50 + (rho * Math.sin(theta)) * scale
  const y = 50 - (rho0 - rho * Math.cos(theta)) * scale
  
  return { x, y }
}

function ringToPath(ring) {
  if (!ring || ring.length < 2) return ''
  const pts = ring.map(([lon, lat]) => project(lat, lon))
  return pts.map((p, j) => `${j === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ') + ' Z'
}

// Generate sample data for different operator types
function generateWarehouseNodes(baseNodes) {
  return baseNodes.slice(0, Math.ceil(baseNodes.length * 0.6))
}

function generateTruckNodes(baseNodes) {
  // Trucks are more distributed, use different subset
  const start = Math.floor(baseNodes.length * 0.2)
  return baseNodes.slice(start, start + Math.ceil(baseNodes.length * 0.7))
}

function generateCourierNodes(baseNodes) {
  // Couriers are more localized, use different subset
  const start = Math.floor(baseNodes.length * 0.1)
  return baseNodes.slice(start, start + Math.ceil(baseNodes.length * 0.5))
}

// Generate connections between nodes
function generateConnections(nodes, maxConnections = 2) {
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

export default function LayeredNetworkMap({ scrollProgress = 0 }) {
  const [paths, setPaths] = useState([])
  const [baseNodes, setBaseNodes] = useState([])
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
          setBaseNodes(coords)
          setWarehouseNodes(generateWarehouseNodes(coords))
          setTruckNodes(generateTruckNodes(coords))
          setCourierNodes(generateCourierNodes(coords))
          
          setWarehouseConnections(generateConnections(generateWarehouseNodes(coords), 2))
          setTruckConnections(generateConnections(generateTruckNodes(coords), 2))
          setCourierConnections(generateConnections(generateCourierNodes(coords), 2))
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
          ]
          setBaseNodes(sampleNodes)
          setWarehouseNodes(generateWarehouseNodes(sampleNodes))
          setTruckNodes(generateTruckNodes(sampleNodes))
          setCourierNodes(generateCourierNodes(sampleNodes))
          
          setWarehouseConnections(generateConnections(generateWarehouseNodes(sampleNodes), 2))
          setTruckConnections(generateConnections(generateTruckNodes(sampleNodes), 2))
          setCourierConnections(generateConnections(generateCourierNodes(sampleNodes), 2))
        }
      })
      .catch(() => {
        // Fallback sample data
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
        setBaseNodes(sampleNodes)
        setWarehouseNodes(generateWarehouseNodes(sampleNodes))
        setTruckNodes(generateTruckNodes(sampleNodes))
        setCourierNodes(generateCourierNodes(sampleNodes))
      })
  }, [])

  // Calculate opacity and scale based on scroll progress - more granular control
  // Layer 1: Warehouses (0-33% of scroll)
  const warehouseProgress = Math.max(0, Math.min(1, scrollProgress / 0.33))
  const warehouseOpacity = warehouseProgress > 0.1 ? Math.min(1, (warehouseProgress - 0.1) / 0.4) : 0
  const warehouseScale = 0.5 + (warehouseProgress * 0.5) // Start small, grow to full
  
  // Layer 2: Trucks (33-66% of scroll)
  const truckProgress = Math.max(0, Math.min(1, (scrollProgress - 0.33) / 0.33))
  const truckOpacity = truckProgress > 0.1 ? Math.min(1, (truckProgress - 0.1) / 0.4) : 0
  const truckScale = 0.5 + (truckProgress * 0.5)
  
  // Layer 3: Couriers (66-100% of scroll)
  const courierProgress = Math.max(0, Math.min(1, (scrollProgress - 0.66) / 0.34))
  const courierOpacity = courierProgress > 0.1 ? Math.min(1, (courierProgress - 0.1) / 0.4) : 0
  const courierScale = 0.5 + (courierProgress * 0.5)

  return (
    <div className="layered-network-map">
      <svg
        viewBox="0 0 100 42"
        preserveAspectRatio="xMidYMid meet"
        className="layered-map-svg"
      >
        {/* US Map Background - Visible country outline */}
        <g className="layered-map-states">
          {paths.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="rgba(255,255,255,0.03)"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="0.25"
            />
          ))}
        </g>

        {/* Layer 1: Warehouse Connections - Progressive reveal */}
        <g 
          className="network-layer warehouse-layer" 
          style={{ 
            opacity: warehouseOpacity,
            transform: `scale(${warehouseScale})`,
            transformOrigin: '50% 50%'
          }}
        >
          {warehouseConnections.map((conn, i) => {
            const connectionProgress = Math.min(1, (warehouseProgress - 0.2) * 2)
            const shouldShow = i < Math.floor(warehouseConnections.length * connectionProgress)
            return (
              <line
                key={`warehouse-conn-${i}`}
                x1={conn.from.x}
                y1={conn.from.y}
                x2={conn.to.x}
                y2={conn.to.y}
                stroke="rgba(122,240,198,0.4)"
                strokeWidth="0.25"
                className="connection-line warehouse-connection"
                style={{ 
                  opacity: shouldShow ? 1 : 0,
                  transition: 'opacity 0.3s ease'
                }}
              />
            )
          })}
        </g>

        {/* Layer 2: Truck Connections - Progressive reveal */}
        <g 
          className="network-layer truck-layer" 
          style={{ 
            opacity: truckOpacity,
            transform: `scale(${truckScale})`,
            transformOrigin: '50% 50%'
          }}
        >
          {truckConnections.map((conn, i) => {
            const connectionProgress = Math.min(1, (truckProgress - 0.2) * 2)
            const shouldShow = i < Math.floor(truckConnections.length * connectionProgress)
            return (
              <line
                key={`truck-conn-${i}`}
                x1={conn.from.x}
                y1={conn.from.y}
                x2={conn.to.x}
                y2={conn.to.y}
                stroke="rgba(133,169,255,0.4)"
                strokeWidth="0.25"
                className="connection-line truck-connection"
                style={{ 
                  opacity: shouldShow ? 1 : 0,
                  transition: 'opacity 0.3s ease'
                }}
              />
            )
          })}
        </g>

        {/* Layer 3: Courier Connections - Progressive reveal */}
        <g 
          className="network-layer courier-layer" 
          style={{ 
            opacity: courierOpacity,
            transform: `scale(${courierScale})`,
            transformOrigin: '50% 50%'
          }}
        >
          {courierConnections.map((conn, i) => {
            const connectionProgress = Math.min(1, (courierProgress - 0.2) * 2)
            const shouldShow = i < Math.floor(courierConnections.length * connectionProgress)
            return (
              <line
                key={`courier-conn-${i}`}
                x1={conn.from.x}
                y1={conn.from.y}
                x2={conn.to.x}
                y2={conn.to.y}
                stroke="rgba(255,193,7,0.4)"
                strokeWidth="0.25"
                className="connection-line courier-connection"
                style={{ 
                  opacity: shouldShow ? 1 : 0,
                  transition: 'opacity 0.3s ease'
                }}
              />
            )
          })}
        </g>

        {/* Layer 1: Warehouse Nodes - Progressive reveal with scale */}
        <g 
          className="network-layer warehouse-layer" 
          style={{ 
            opacity: warehouseOpacity,
            transform: `scale(${warehouseScale})`,
            transformOrigin: '50% 50%'
          }}
        >
          {warehouseNodes.map((p, i) => {
            const nodeProgress = Math.min(1, (warehouseProgress - 0.1) * 3)
            const shouldShow = i < Math.floor(warehouseNodes.length * nodeProgress)
            return (
              <g 
                key={`warehouse-${i}`} 
                className="network-node warehouse-node"
                style={{ 
                  opacity: shouldShow ? 1 : 0,
                  transform: shouldShow ? 'scale(1)' : 'scale(0)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease'
                }}
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="1.0"
                  fill="rgba(122,240,198,0.7)"
                  stroke="rgba(122,240,198,1)"
                  strokeWidth="0.2"
                />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="1.5"
                  fill="none"
                  stroke="rgba(122,240,198,0.3)"
                  strokeWidth="0.15"
                  className="node-pulse"
                />
              </g>
            )
          })}
        </g>

        {/* Layer 2: Truck Nodes - Progressive reveal with scale */}
        <g 
          className="network-layer truck-layer" 
          style={{ 
            opacity: truckOpacity,
            transform: `scale(${truckScale})`,
            transformOrigin: '50% 50%'
          }}
        >
          {truckNodes.map((p, i) => {
            const nodeProgress = Math.min(1, (truckProgress - 0.1) * 3)
            const shouldShow = i < Math.floor(truckNodes.length * nodeProgress)
            return (
              <g 
                key={`truck-${i}`} 
                className="network-node truck-node"
                style={{ 
                  opacity: shouldShow ? 1 : 0,
                  transform: shouldShow ? 'scale(1)' : 'scale(0)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease'
                }}
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="0.9"
                  fill="rgba(133,169,255,0.7)"
                  stroke="rgba(133,169,255,1)"
                  strokeWidth="0.2"
                />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="1.4"
                  fill="none"
                  stroke="rgba(133,169,255,0.3)"
                  strokeWidth="0.15"
                  className="node-pulse"
                />
              </g>
            )
          })}
        </g>

        {/* Layer 3: Courier Nodes - Progressive reveal with scale */}
        <g 
          className="network-layer courier-layer" 
          style={{ 
            opacity: courierOpacity,
            transform: `scale(${courierScale})`,
            transformOrigin: '50% 50%'
          }}
        >
          {courierNodes.map((p, i) => {
            const nodeProgress = Math.min(1, (courierProgress - 0.1) * 3)
            const shouldShow = i < Math.floor(courierNodes.length * nodeProgress)
            return (
              <g 
                key={`courier-${i}`} 
                className="network-node courier-node"
                style={{ 
                  opacity: shouldShow ? 1 : 0,
                  transform: shouldShow ? 'scale(1)' : 'scale(0)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease'
                }}
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="0.8"
                  fill="rgba(255,193,7,0.7)"
                  stroke="rgba(255,193,7,1)"
                  strokeWidth="0.2"
                />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="1.3"
                  fill="none"
                  stroke="rgba(255,193,7,0.3)"
                  strokeWidth="0.15"
                  className="node-pulse"
                />
              </g>
            )
          })}
        </g>
      </svg>
    </div>
  )
}
