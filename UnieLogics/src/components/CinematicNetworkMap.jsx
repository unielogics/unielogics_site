import { useEffect, useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useTheme } from "./ThemeProvider"

const API_URL = import.meta.env?.VITE_API_BASE_URL || 'https://api.uniewms.com/api/v1'
const COORDS_URL = `${API_URL}/wOwners/getAllOnlyCoordinates`
const US_GEOJSON_URL = "https://raw.githubusercontent.com/shawnbot/topogram/master/data/us-states.geojson"

function lerp(a, b, t) {
  return a + (b - a) * t
}

function clamp(v, min = 0, max = 1) {
  return Math.max(min, Math.min(max, v))
}

function ease(t) {
  return t * t * (3 - 2 * t)
}

const MAP_WIDTH = 145
const MAP_HEIGHT = 100
const MAP_CENTER_X = MAP_WIDTH / 2
const MAP_CENTER_Y = MAP_HEIGHT / 2

// Keep all activity inside the country: inset from view so nothing bleeds outside
const MAP_X_MIN = 4
const MAP_X_MAX = MAP_WIDTH - 4
const MAP_Y_MIN = 4
const MAP_Y_MAX = MAP_HEIGHT - 4

function clampToMapBounds(pt) {
  return {
    x: Math.max(MAP_X_MIN, Math.min(MAP_X_MAX, pt.x)),
    y: Math.max(MAP_Y_MIN, Math.min(MAP_Y_MAX, pt.y)),
  }
}

function project(lat, lon) {
  let x = ((lon + 125) / 59) * MAP_WIDTH
  let y = (1 - (lat - 24) / 26) * MAP_HEIGHT
  return clampToMapBounds({ x, y })
}

/** Normalize GeoJSON ring to array of [lon, lat] (handles [lon,lat][] or flat lon,lat,lon,lat). */
function ringToPoints(ring) {
  if (!Array.isArray(ring) || ring.length < 2) return []
  const first = ring[0]
  if (Array.isArray(first) && first.length >= 2) {
    return ring
      .filter((p) => Array.isArray(p) && p.length >= 2)
      .map((p) => [Number(p[0]), Number(p[1])])
  }
  const points = []
  for (let i = 0; i < ring.length - 1; i += 2) {
    const lon = Number(ring[i])
    const lat = Number(ring[i + 1])
    if (Number.isFinite(lon) && Number.isFinite(lat)) points.push([lon, lat])
  }
  return points
}

// NJ/NY area center for regional zoom
const TRI_STATE_CENTER = project(40.55, -74.2)
// Real tri-state prep centers from NETWORK_DATA: BoxHero Brooklyn NY, 102 Queens KOP PA, Discount Middletown CT, Ma dealers Elizabeth NJ, Jie Bethlehem PA
const TRI_STATE_INDICES = [7, 8, 10, 14, 23]

/**
 * Prep centers: warehouse [lat,lon], deliveryZones = nearby cities (clearly separate, not overlapping).
 */
const NETWORK_DATA = [
  { warehouse: [30.6333, -97.6784], deliveryZones: [[30.5083, -97.6789], [30.7212, -97.5890], [30.5321, -97.8123]] },
  { warehouse: [32.8140, -96.9489], deliveryZones: [[32.7521, -97.0123], [32.9156, -96.8456], [32.7801, -96.8234]] },
  { warehouse: [42.9634, -85.6681], deliveryZones: [[42.8856, -85.7234], [43.0312, -85.6123], [42.9012, -85.5456]] },
  { warehouse: [29.6744, -95.2006], deliveryZones: [[29.7523, -95.3234], [29.6012, -95.0890], [29.7123, -95.1567]] },
  { warehouse: [30.3322, -81.6557], deliveryZones: [[30.3234, -81.5567], [30.4123, -81.7234], [30.2234, -81.6890]] },
  { warehouse: [28.5383, -81.3792], deliveryZones: [[28.5412, -81.2678], [28.6123, -81.4234], [28.4456, -81.3789]] },
  { warehouse: [29.6631, -95.4733], deliveryZones: [[29.7234, -95.5567], [29.5890, -95.4123], [29.7123, -95.3789]] },
  { warehouse: [40.5900, -73.9050], deliveryZones: [[40.6512, -73.9678], [40.5234, -73.8123], [40.6123, -73.8456]] },
  { warehouse: [40.0884, -75.3960], deliveryZones: [[40.1456, -75.3234], [40.0234, -75.4789], [40.1123, -75.4456]] },
  { warehouse: [37.9577, -121.2908], deliveryZones: [[37.9534, -121.4234], [38.0123, -121.2234], [37.8890, -121.2678]] },
  { warehouse: [41.5623, -72.6506], deliveryZones: [[41.6123, -72.7123], [41.5012, -72.5789], [41.5890, -72.7234]] },
  { warehouse: [29.6197, -95.6349], deliveryZones: [[29.7012, -95.7123], [29.5234, -95.5678], [29.6567, -95.5456]] },
  { warehouse: [26.2712, -80.2706], deliveryZones: [[26.2234, -80.2123], [26.3234, -80.3234], [26.2789, -80.3890]] },
  { warehouse: [45.7833, -108.5007], deliveryZones: [[45.8123, -108.4234], [45.7456, -108.5890], [45.8234, -108.5567]] },
  { warehouse: [40.6639, -74.1783], deliveryZones: [[40.7123, -74.1123], [40.6012, -74.2456], [40.7234, -74.2234]] },
  { warehouse: [38.8833, -104.8000], deliveryZones: [[38.9234, -104.7123], [38.8234, -104.8890], [38.9456, -104.8456]] },
  { warehouse: [33.6000, -117.6720], deliveryZones: [[33.6789, -117.6123], [33.5234, -117.7234], [33.6456, -117.7567]] },
  { warehouse: [33.7825, -117.2287], deliveryZones: [[33.8456, -117.1678], [33.7123, -117.2890], [33.8012, -117.3123]] },
  { warehouse: [45.7756, -108.4890], deliveryZones: [[45.8123, -108.4234], [45.7456, -108.5890], [45.8234, -108.5567]] },
  { warehouse: [45.5488, -122.5318], deliveryZones: [[45.6123, -122.4678], [45.4678, -122.5890], [45.5567, -122.6234]] },
  { warehouse: [43.5460, -96.7313], deliveryZones: [[43.6012, -96.6789], [43.4789, -96.7890], [43.5678, -96.8123]] },
  { warehouse: [29.8306, -95.6858], deliveryZones: [[29.8890, -95.6123], [29.7567, -95.7567], [29.8456, -95.7234]] },
  { warehouse: [42.3714, -83.4702], deliveryZones: [[42.4234, -83.4123], [42.3123, -83.5234], [42.4012, -83.5567]] },
  { warehouse: [40.6259, -75.3705], deliveryZones: [[40.6789, -75.3123], [40.5678, -75.4234], [40.6567, -75.4456]] },
  { warehouse: [30.2100, -81.6100], deliveryZones: [[30.2678, -81.5456], [30.1456, -81.6678], [30.2789, -81.6789]] },
  { warehouse: [45.5229, -122.6784], deliveryZones: [[45.5789, -122.6234], [45.4678, -122.7456], [45.5456, -122.7123]] },
]

/** Freight routes: [fromIdx, toIdx]. Connects regional and nationwide. */
const FREIGHT_ROUTES = [
  [7, 8], [7, 14], [8, 14], [8, 23], [10, 14], [14, 23],
  [0, 1], [0, 3], [1, 3], [1, 11], [3, 6], [3, 11], [3, 21], [6, 11], [6, 21],
  [4, 5], [4, 12], [4, 24], [5, 12], [5, 24], [12, 24],
  [15, 16], [16, 17], [15, 17],
  [18, 19], [19, 25], [18, 25],
  [2, 22], [2, 8], [9, 10], [9, 23], [13, 18], [13, 19], [20, 2], [20, 22],
]

export default function CinematicNetworkMap({ scrollProgress = 0, hideFinalMessage = false }) {
  const { theme } = useTheme()
  const [paths, setPaths] = useState([])
  const [allWarehouses, setAllWarehouses] = useState([])
  const [time, setTime] = useState(0)
  const rafRef = useRef(null)
  const isLight = theme === 'light'
  const mapFill = 'none'
  const mapStroke = isLight ? 'rgba(15,17,22,0.5)' : 'rgba(255,255,255,0.5)'
  const mapStrokeWidth = 0.22

  // Load US Map
  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/80561277-9255-4c94-92b0-dc2ed86ffc82', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'CinematicNetworkMap.jsx:GeoJSON-fetch-start', message: 'US map GeoJSON fetch started', data: { url: US_GEOJSON_URL }, timestamp: Date.now(), hypothesisId: 'H1' }) }).catch(() => {});
    // #endregion
    fetch(US_GEOJSON_URL)
      .then(r => {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/80561277-9255-4c94-92b0-dc2ed86ffc82', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'CinematicNetworkMap.jsx:GeoJSON-response', message: 'GeoJSON response', data: { ok: r.ok, status: r.status }, timestamp: Date.now(), hypothesisId: 'H1' }) }).catch(() => {});
        // #endregion
        return r.json()
      })
      .then(data => {
        const features = data?.features || []
        const exclude = new Set(["AK", "HI", "PR", "GU", "VI"])
        const newPaths = []

        features.forEach(f => {
          if (exclude.has(f?.properties?.postal)) return
          const geom = f.geometry
          if (!geom) return

          // Polygon: [rings]; MultiPolygon: [[rings], [rings], ...] — each polygon is array of rings
          const polygons =
            geom.type === "Polygon"
              ? [geom.coordinates]
              : geom.type === "MultiPolygon"
              ? geom.coordinates
              : []

          polygons.forEach(polygon => {
            if (!Array.isArray(polygon)) return
            polygon.forEach(ring => {
              const points = ringToPoints(ring)
              if (points.length < 2) return
              const d =
                points
                  .map(([lon, lat], i) => {
                    const p = project(lat, lon)
                    return `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`
                  })
                  .join(" ") + " Z"
              newPaths.push(d)
            })
          })
        })

        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/80561277-9255-4c94-92b0-dc2ed86ffc82', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'CinematicNetworkMap.jsx:GeoJSON-parsed', message: 'GeoJSON parsed', data: { featuresLength: features.length, newPathsLength: newPaths.length, firstPathLen: newPaths[0]?.length }, timestamp: Date.now(), hypothesisId: 'H2' }) }).catch(() => {});
        // #endregion
        setPaths(newPaths)
      })
      .catch(err => {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/80561277-9255-4c94-92b0-dc2ed86ffc82', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'CinematicNetworkMap.jsx:GeoJSON-catch', message: 'GeoJSON fetch failed', data: { err: String(err?.message || err) }, timestamp: Date.now(), hypothesisId: 'H1' }) }).catch(() => {});
        // #endregion
        setPaths([])
      })
  }, [])

  // Load Warehouse Coordinates
  useEffect(() => {
    fetch(COORDS_URL, { credentials: 'omit' })
      .then(r => r.json())
      .then(data => {
        const list = data?.response || []
        const coords = list
          .filter(w => {
            const lat = w?.lat ?? w?.latitude
            const lon = w?.long ?? w?.lon ?? w?.longitude
            return Number.isFinite(lat) && Number.isFinite(lon)
          })
          .filter(w => {
            const lat = Number(w?.lat ?? w?.latitude)
            const lon = Number(w?.long ?? w?.lon ?? w?.longitude)
            return lat >= 24 && lat <= 50 && lon >= -125 && lon <= -66
          })
          .map(w => project(Number(w?.lat ?? w?.latitude), Number(w?.long ?? w?.lon ?? w?.longitude)))
        
        if (coords.length > 0) {
          setAllWarehouses(coords)
        } else {
          // Fallback: Tri-state area warehouses (NY, NJ, PA)
          const fallback = [
            project(40.7128, -74.0060), // NYC, NY
            project(40.7357, -74.1724), // Newark, NJ
            project(40.2170, -74.7429), // Trenton, NJ
            project(40.0583, -74.4057), // Central NJ
            project(40.8859, -74.0435), // North NJ
            project(39.9526, -75.1652), // Philadelphia, PA
            project(40.2737, -76.8844), // Harrisburg, PA
            project(40.4406, -79.9959), // Pittsburgh, PA
          ]
          setAllWarehouses(fallback)
        }
      })
      .catch(() => {
        // Fallback: Tri-state warehouses
        const fallback = [
          project(40.7128, -74.0060), // NYC
          project(40.7357, -74.1724), // Newark
          project(40.2170, -74.7429), // Trenton
          project(39.9526, -75.1652), // Philadelphia
        ]
        setAllWarehouses(fallback)
      })
  }, [])

  // Animation Clock
  useEffect(() => {
    const animate = (t) => {
      setTime(t / 1000)
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // Intro: title/description show first (0-0.08); map fades in (0.08-0.18) then animation continues
  const MAP_FADE_START = 0.08
  const MAP_FADE_END = 0.18
  const mapOpacity = scrollProgress < MAP_FADE_START ? 0 : scrollProgress < MAP_FADE_END
    ? clamp((scrollProgress - MAP_FADE_START) / (MAP_FADE_END - MAP_FADE_START))
    : 1

  // Scroll bands: regional (0-0.6) → zoom out (0.6-0.75) → nationwide repeat (0.75-1)
  const REGIONAL_WAREHOUSE_END = 0.2
  const REGIONAL_TRUCK_END = 0.4
  const REGIONAL_COURIER_END = 0.6
  const ZOOM_END = 0.75
  const NATIONWIDE_WAREHOUSE_END = 0.85
  const NATIONWIDE_TRUCK_END = 0.92
  const NATIONWIDE_COURIER_END = 1.0

  const isRegional = scrollProgress < ZOOM_END
  const isNationwide = scrollProgress >= ZOOM_END
  const zoomProgress = scrollProgress >= REGIONAL_COURIER_END
    ? clamp((scrollProgress - REGIONAL_COURIER_END) / (ZOOM_END - REGIONAL_COURIER_END))
    : 0

  // Camera: zoomed in on NJ/NY until 0.6, then zoom out 0.6-0.75 to full US
  const zoomStart = 12
  const zoomEnd = 0.9
  const zoom = scrollProgress < REGIONAL_COURIER_END
    ? zoomStart
    : scrollProgress >= ZOOM_END
      ? zoomEnd
      : lerp(zoomStart, zoomEnd, zoomProgress)
  const centerX = scrollProgress >= ZOOM_END ? MAP_CENTER_X : lerp(TRI_STATE_CENTER.x, MAP_CENTER_X, zoomProgress)
  const centerY = scrollProgress >= ZOOM_END ? MAP_CENTER_Y : lerp(TRI_STATE_CENTER.y, MAP_CENTER_Y, zoomProgress)

  // No horizontal offset so map stays centered (was 7 and caused 10px left / 40px right imbalance)
  const fullViewOffsetX = 0

  const cameraTransform = `
    translate(${MAP_CENTER_X - centerX * zoom - fullViewOffsetX} ${MAP_CENTER_Y - centerY * zoom})
    scale(${zoom})
  `

  // Scaling: regional = proportional; nationwide = 6x larger, trucks/couriers animate when zoomed out
  const iconScale = isNationwide
    ? Math.max(2.0, clamp(0.6 * zoom, 1.8, 2.4))
    : clamp(0.18 * zoom, 0.12, 0.45)
  const routeStrokeWidth = clamp(0.06 * zoom, 0.04, 0.18)

  // Opacity: regional phased; nationwide = all visible and moving as soon as zoom completes
  const warehouseOpacity = isRegional
    ? (scrollProgress < REGIONAL_WAREHOUSE_END ? clamp(scrollProgress / REGIONAL_WAREHOUSE_END) * 0.9 + 0.1 : 1)
    : 1
  const truckOpacity = isRegional
    ? (scrollProgress < REGIONAL_WAREHOUSE_END ? 0 : scrollProgress < REGIONAL_TRUCK_END ? clamp((scrollProgress - REGIONAL_WAREHOUSE_END) / (REGIONAL_TRUCK_END - REGIONAL_WAREHOUSE_END)) * 0.9 + 0.1 : 1)
    : 1
  const courierOpacity = isRegional
    ? (scrollProgress < REGIONAL_TRUCK_END ? 0 : scrollProgress < REGIONAL_COURIER_END ? clamp((scrollProgress - REGIONAL_TRUCK_END) / (REGIONAL_COURIER_END - REGIONAL_TRUCK_END)) * 0.9 + 0.1 : 1)
    : 1

  // Project real warehouse locations and delivery zones from NETWORK_DATA
  const { warehouseCoords, deliveryZoneCoords } = useMemo(() => {
    const wh = NETWORK_DATA.map((d) => project(d.warehouse[0], d.warehouse[1]))
    const dz = NETWORK_DATA.map((d) =>
      (d.deliveryZones || []).map(([lat, lon]) => project(lat, lon))
    )
    return { warehouseCoords: wh, deliveryZoneCoords: dz }
  }, [])

  // Regional: real tri-state prep centers from NETWORK_DATA (indices 7,8,10,14,23)
  const triStateWarehouses = useMemo(() => {
    return TRI_STATE_INDICES
      .filter((i) => i >= 0 && i < warehouseCoords.length)
      .map((i) => warehouseCoords[i])
  }, [warehouseCoords])

  const nationwideWarehouses = warehouseCoords
  const displayWarehouses = isNationwide ? nationwideWarehouses : triStateWarehouses

  // Map display warehouse index → NETWORK_DATA index
  const displayToGlobalIndex = useMemo(() => {
    if (isNationwide) return warehouseCoords.map((_, i) => i)
    return TRI_STATE_INDICES.filter((i) => i >= 0 && i < warehouseCoords.length)
  }, [warehouseCoords, isNationwide])

  // Truck Routes: use FREIGHT_ROUTES when both endpoints are in displayWarehouses
  const truckRoutes = useMemo(() => {
    const routes = []
    const wh = displayWarehouses
    for (const [fromIdx, toIdx] of FREIGHT_ROUTES) {
      if (fromIdx >= NETWORK_DATA.length || toIdx >= NETWORK_DATA.length) continue
      const fromInDisplay = displayToGlobalIndex.indexOf(fromIdx)
      const toInDisplay = displayToGlobalIndex.indexOf(toIdx)
      if (fromInDisplay >= 0 && toInDisplay >= 0 && fromIdx !== toIdx) {
        routes.push([wh[fromInDisplay], wh[toInDisplay]])
      }
    }
    if (routes.length === 0) {
      const maxDist = isNationwide ? 100 : 25
      for (let i = 0; i < wh.length; i++) {
        for (let j = i + 1; j < wh.length; j++) {
          const dist = Math.sqrt(Math.pow(wh[i].x - wh[j].x, 2) + Math.pow(wh[i].y - wh[j].y, 2))
          if (dist > 2 && dist < maxDist) routes.push([wh[i], wh[j]])
        }
      }
      return routes.slice(0, isNationwide ? 35 : 15)
    }
    return routes.slice(0, isNationwide ? 35 : 15)
  }, [displayWarehouses, displayToGlobalIndex, isNationwide])

  // Courier Routes: ~20 cars in regional (4 per warehouse), same effect nationwide (3 per warehouse)
  const MIN_DELIVERY_DIST = 1.5
  const COURIER_PER_WAREHOUSE_REGIONAL = 4
  const COURIER_PER_WAREHOUSE_NATIONWIDE = 3
  const courierRoutes = useMemo(() => {
    const routes = []
    const perWh = isNationwide ? COURIER_PER_WAREHOUSE_NATIONWIDE : COURIER_PER_WAREHOUSE_REGIONAL
    displayWarehouses.forEach((w, di) => {
      const globalIdx = displayToGlobalIndex[di]
      if (globalIdx < 0 || !deliveryZoneCoords[globalIdx]?.length) return
      const fromData = deliveryZoneCoords[globalIdx]
        .map((dest) => ({
          dest,
          d: Math.sqrt(Math.pow(dest.x - w.x, 2) + Math.pow(dest.y - w.y, 2)),
        }))
        .filter(({ d }) => d >= MIN_DELIVERY_DIST)
        .slice(0, perWh)
      const destsToUse = [...fromData]
      for (let i = destsToUse.length; i < perWh; i++) {
        const angle = (di * 1.2 + i * 0.8) * Math.PI
        const dist = 2.2 + i * 0.3
        destsToUse.push({
          dest: clampToMapBounds({ x: w.x + Math.cos(angle) * dist, y: w.y + Math.sin(angle) * dist }),
          d: dist,
        })
      }
      destsToUse.forEach(({ dest }) => routes.push([w, clampToMapBounds(dest)]))
    })
    return routes
  }, [displayWarehouses, displayToGlobalIndex, deliveryZoneCoords, isNationwide])

  // Phase labels: regional only (no zoom/nationwide labels)
  // Colors: green=warehouse, blue=truck, orange=courier
  const phaseData =
    scrollProgress < REGIONAL_WAREHOUSE_END ? { text: "1. Warehouses", color: "#22c55e" } :
    scrollProgress < REGIONAL_TRUCK_END ? { text: "2. Freight between warehouses", color: "#3b82f6" } :
    scrollProgress < REGIONAL_COURIER_END ? { text: "3. Last-mile to homes", color: "#fb923c" } : null
  const phaseLabelOpacity =
    scrollProgress < REGIONAL_WAREHOUSE_END ? Math.min(1, (scrollProgress / REGIONAL_WAREHOUSE_END) * 1.2) :
    scrollProgress < REGIONAL_TRUCK_END ? Math.min(1, ((scrollProgress - REGIONAL_WAREHOUSE_END) / (REGIONAL_TRUCK_END - REGIONAL_WAREHOUSE_END)) * 1.2) :
    scrollProgress < REGIONAL_COURIER_END ? Math.min(1, ((scrollProgress - REGIONAL_TRUCK_END) / (REGIONAL_COURIER_END - REGIONAL_TRUCK_END)) * 1.2) :
    scrollProgress < ZOOM_END ? Math.min(1, zoomProgress * 1.2) :
    scrollProgress < NATIONWIDE_WAREHOUSE_END ? Math.min(1, ((scrollProgress - ZOOM_END) / (NATIONWIDE_WAREHOUSE_END - ZOOM_END)) * 1.2) :
    scrollProgress < NATIONWIDE_TRUCK_END ? Math.min(1, ((scrollProgress - NATIONWIDE_WAREHOUSE_END) / (NATIONWIDE_TRUCK_END - NATIONWIDE_WAREHOUSE_END)) * 1.2) :
    scrollProgress < NATIONWIDE_COURIER_END ? Math.min(1, ((scrollProgress - NATIONWIDE_TRUCK_END) / (NATIONWIDE_COURIER_END - NATIONWIDE_TRUCK_END)) * 1.2) : 0
  const showFinalMessage = isNationwide && scrollProgress >= 0.94

  return (
    <div className="unified-network-scroll" style={{ width: "100%", height: "100%", position: "relative", minHeight: "300px" }}>
      <div style={{ opacity: mapOpacity, transition: "opacity 0.5s ease", width: "100%", height: "100%", position: "relative" }}>
      {/* Phase labels overlay */}
      <div className="network-map-phase-overlay" aria-hidden="true">
        {phaseData && (
          <div
            className="network-map-phase-label"
            style={{
              opacity: phaseLabelOpacity,
              transition: "opacity 0.35s ease",
              backgroundColor: "rgba(0,0,0,0.65)",
              color: phaseData.color,
              padding: "10px 18px",
              borderRadius: "8px",
            }}
          >
            {phaseData.text}
          </div>
        )}
        {!hideFinalMessage && (
          <div
            className="network-map-final-message"
            style={{
              opacity: showFinalMessage ? 1 : 0,
              visibility: showFinalMessage ? "visible" : "hidden",
              transition: "opacity 0.5s ease",
            }}
          >
            The United States, connected and optimized with our technology.
          </div>
        )}
      </div>

      <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "100%", display: "block" }}>
        {/* #region agent log */}
        {(() => {
          fetch('http://127.0.0.1:7242/ingest/80561277-9255-4c94-92b0-dc2ed86ffc82', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'CinematicNetworkMap.jsx:render-map', message: 'Map render', data: { pathsLength: paths.length, mapFill: mapFill?.slice?.(0, 30), hasPaths: paths.length > 0 }, timestamp: Date.now(), hypothesisId: 'H4,H5' }) }).catch(() => {});
          return null;
        })()}
        {/* #endregion */}
        <g transform={cameraTransform}>
          {/* Clip so all activity stays inside the country */}
          {paths.length > 0 && (
            <defs>
              <clipPath id="usActivityClip" clipPathUnits="userSpaceOnUse">
                {paths.map((d, i) => (
                  <path key={i} d={d} fillRule="evenodd" />
                ))}
              </clipPath>
            </defs>
          )}

          {/* Map - state outlines (zoomed); clearly visible */}
          <g opacity={1}>
            {paths.map((d, i) => (
              <path
                key={i}
                d={d}
                fill={mapFill}
                fillRule="evenodd"
                stroke={mapStroke}
                strokeWidth={mapStrokeWidth}
                strokeLinejoin="round"
              />
            ))}
          </g>

          {/* Activity (routes, icons) clipped to US outline - no exposure outside country */}
          <g clipPath={paths.length > 0 ? "url(#usActivityClip)" : undefined}>

          {/* Truck Routes */}
          <g opacity={truckOpacity * 0.5}>
            {truckRoutes.map(([a, b], i) => {
              const midX = (a.x + b.x) / 2
              const midY = (a.y + b.y) / 2 - 0.8
              return (
                <path
                  key={i}
                  d={`M ${a.x} ${a.y} Q ${midX} ${midY} ${b.x} ${b.y}`}
                  stroke="#3b82f6"
                  strokeWidth={routeStrokeWidth}
                  fill="none"
                />
              )
            })}
          </g>

          {/* Courier Routes */}
          {courierRoutes.length > 0 && (
            <g opacity={courierOpacity * 0.5}>
              {courierRoutes.map(([a, b], i) => (
                <line
                  key={`courier-route-${i}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="#fb923c"
                  strokeWidth={routeStrokeWidth}
                  strokeDasharray={`${0.15 * zoom} ${0.15 * zoom}`}
                />
              ))}
            </g>
          )}

          {/* Warehouses - green building icon */}
          <g opacity={warehouseOpacity}>
            {displayWarehouses.map((w, i) => (
              <g
                key={i}
                transform={`translate(${w.x}, ${w.y}) scale(${iconScale})`}
                aria-label="Warehouse"
              >
                <path d="M -0.4 -0.25 L 0 -0.5 L 0.4 -0.25 L 0.4 0.35 L -0.4 0.35 Z" fill="#22c55e" stroke="#16a34a" strokeWidth="0.08" />
                <rect x="-0.25" y="-0.02" width="0.15" height="0.25" fill="#16a34a" rx="0.02" />
                <rect x="-0.08" y="0.06" width="0.12" height="0.14" fill="#16a34a" rx="0.02" />
                <rect x="0.08" y="0.06" width="0.12" height="0.14" fill="#16a34a" rx="0.02" />
              </g>
            ))}
          </g>

          {/* Freight - semi truck icon */}
          <g opacity={truckOpacity}>
            {truckRoutes.map(([a, b], i) => {
              const speed = 0.1
              const t = (time * speed + i * 0.3) % 1
              const x = lerp(a.x, b.x, t)
              const y = lerp(a.y, b.y, t)

              return (
                <g
                  key={i}
                  transform={`translate(${x}, ${y}) scale(${iconScale})`}
                  aria-label="Freight truck"
                >
                  <rect x="-0.4" y="-0.15" width="0.5" height="0.3" fill="#3b82f6" stroke="#2563eb" strokeWidth="0.04" rx="0.03" />
                  <rect x="0.05" y="-0.2" width="0.35" height="0.35" fill="#3b82f6" stroke="#2563eb" strokeWidth="0.04" rx="0.03" />
                  <circle cx="-0.1" cy="0.2" r="0.08" fill="#1e40af" />
                  <circle cx="0.28" cy="0.2" r="0.08" fill="#1e40af" />
                  <circle cx="0.38" cy="0.2" r="0.08" fill="#1e40af" />
                </g>
              )
            })}
          </g>

          {/* Houses at courier destinations */}
          {courierRoutes.length > 0 && courierOpacity > 0 && (
            <g opacity={courierOpacity * 0.9}>
              {courierRoutes.map(([a, b], i) => (
                <g
                  key={`house-${i}`}
                  transform={`translate(${b.x}, ${b.y}) scale(${iconScale})`}
                  aria-label="Delivery destination"
                >
                  <path d="M -0.18 0 L 0 -0.14 L 0.18 0 Z" fill="rgba(255,255,255,0.6)" stroke="rgba(255,255,255,0.8)" strokeWidth="0.04" />
                  <rect x="-0.14" y="0" width="0.28" height="0.16" fill="rgba(255,255,255,0.5)" stroke="rgba(255,255,255,0.8)" strokeWidth="0.03" rx="0.02" />
                  <rect x="-0.04" y="0.05" width="0.08" height="0.11" fill="rgba(0,0,0,0.3)" rx="0.02" />
                </g>
              ))}
            </g>
          )}

          {/* Couriers - leave warehouse, drive to houses, return */}
          {courierRoutes.length > 0 && courierOpacity > 0 && (
            <g opacity={courierOpacity}>
              {courierRoutes.map(([a, b], i) => {
                const speed = 0.05
                const t = (time * speed + i * 0.25) % 1
                const phase = t < 0.5 ? t * 2 : 2 - t * 2
                const eff = 0.08 + 0.84 * phase
                const x = lerp(a.x, b.x, eff)
                const y = lerp(a.y, b.y, eff)

                return (
                  <g
                    key={`courier-${i}`}
                    transform={`translate(${x}, ${y}) scale(${iconScale})`}
                    aria-label="Courier"
                  >
                    <rect x="-0.28" y="-0.12" width="0.56" height="0.32" fill="#fb923c" stroke="#f97316" strokeWidth="0.04" rx="0.04" />
                    <rect x="-0.18" y="-0.18" width="0.2" height="0.2" fill="#f97316" stroke="#ea580c" strokeWidth="0.03" rx="0.03" />
                    <circle cx="-0.1" cy="0.25" r="0.07" fill="#c2410c" />
                    <circle cx="0.1" cy="0.25" r="0.07" fill="#c2410c" />
                    <rect x="0.08" y="-0.08" width="0.06" height="0.08" fill="rgba(255,255,255,0.4)" rx="0.02" />
                  </g>
                )
              })}
            </g>
          )}

          </g>
        </g>

        {/* Vignette */}
        <defs>
          <radialGradient id="vignette">
            <stop offset="70%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.2)" />
          </radialGradient>
        </defs>
        <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="none" />

      </svg>
      </div>
    </div>
  )
}

