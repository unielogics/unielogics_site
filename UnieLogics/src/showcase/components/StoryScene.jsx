// StoryScene — "Tuesday at Elizabeth, NJ"
// Scroll-driven narrative: Cortex orchestrating a real shift.
import { useEffect, useRef, useState } from 'react'

const SCENES = [
  {
    time: '09:14',
    chapter: '01',
    stage: 'Stage 04 · Orders & margin',
    title: 'Cortex flags 4 orders.',
    body: "Four orders just landed — high-margin, customers expecting same-day shipping, all best served from our Elizabeth warehouse. We score them in 140ms and push them to the top of the line at Bay 14.",
    metric: { label: 'Orders · prioritized', value: '4 / 8,402' },
    save: 0,
  },
  {
    time: '09:22',
    chapter: '02',
    stage: 'Stage 03 · Warehouse execution',
    title: 'Picker rerouted. Path rebuilt.',
    body: "Marcus was halfway through a lower-priority batch. We pull him forward, hand him a new path through aisles C-203 → C-208 → D-114 → D-117 — the shortest route for the four boxes. 14 fewer steps. Three minutes saved.",
    metric: { label: 'Pick path · optimized', value: '−14 steps' },
    save: 18,
  },
  {
    time: '09:34',
    chapter: '03',
    stage: 'Stage 05 · Outbound & carrier mix',
    title: 'Packed. Scanned. Staged.',
    body: "Pallets land on the outbound dock with 6 minutes to spare. Shipping documents auto-generated. Labels printed. The shipment is ready — and we already know which carrier is closest, with a return trip available.",
    metric: { label: 'Ready for pickup', value: '+6 min slack' },
    save: 42,
  },
  {
    time: '09:40',
    chapter: '04',
    stage: 'Stage 06 · Transport & last-mile',
    title: 'Driver matched. Auto-dispatched.',
    body: "An Elite-rated truck pulled into the lot. Empty trailer. We offered the Elizabeth → Bethlehem run 12 minutes before Marcus finished packing. The driver tapped accept. No phone. No broker. No back-and-forth.",
    metric: { label: 'Driver · matched', value: 'TX-44 · Elite 0.94' },
    save: 84,
  },
  {
    time: '13:08',
    chapter: '05',
    stage: 'Stage 06 · Proof of delivery & payment',
    title: 'Delivered. Payment cleared. Loop closed.',
    body: "Proof of delivery captured in Bethlehem PA — 7 minutes ahead of schedule. We released the driver's $640 in 4 seconds, updated their rating to 0.94, and started looking for their next load before the truck left the lot.",
    metric: { label: 'Loop closed', value: '$640 · 0:00:04' },
    save: 184,
  },
]

export function StoryScene() {
  const stageRef = useRef(null)
  const [sceneIdx, setSceneIdx] = useState(0)
  const [stageProg, setStageProg] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      if (!stageRef.current) return
      const rect = stageRef.current.getBoundingClientRect()
      const vh = window.innerHeight
      const total = rect.height - vh
      if (total <= 0) {
        setStageProg(0)
        return
      }
      const scrolled = -rect.top
      const p = Math.max(0, Math.min(1, scrolled / total))
      setStageProg(p)
      const idx = Math.min(SCENES.length - 1, Math.floor(p * SCENES.length))
      setSceneIdx(idx)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const current = SCENES[sceneIdx]
  const subProg = (stageProg * SCENES.length) - sceneIdx

  return (
    <section className="story-section">
      <div className="story-stage" ref={stageRef} style={{ height: `${SCENES.length * 110}vh` }}>
        <div className="story-pin">
          <div className="story-eyebrow">
            <div className="story-eyebrow-row">
              <span className="story-eyebrow-dot"></span>
              <span>Tuesday · Elizabeth, NJ → Bethlehem, PA</span>
            </div>
            <div className="story-eyebrow-savings tnum mono">
              <span style={{ color: 'var(--fg-3)', marginRight: 8 }}>SAVED THIS SHIFT</span>
              <span style={{ color: 'var(--accent)', fontSize: 14, fontWeight: 600 }}>${current.save.toLocaleString()}</span>
            </div>
          </div>

          <div className="story-body">
            <div className="story-copy">
              <div className="story-chapter mono">CH · {current.chapter}</div>
              <div className="story-time mono">{current.time}</div>
              {current.stage && <div className="story-stage mono">{current.stage}</div>}
              <h3 className="story-title" key={'h-' + sceneIdx}>{current.title}</h3>
              <p className="story-text" key={'p-' + sceneIdx}>{current.body}</p>
              <div className="story-metric mono">
                <span className="story-metric-lbl">{current.metric.label}</span>
                <span className="story-metric-val">{current.metric.value}</span>
              </div>
            </div>

            <div className="story-visual">
              <SceneVisual idx={sceneIdx} progress={subProg} />
            </div>
          </div>

          <div className="story-timeline">
            {SCENES.map((s, i) => (
              <div key={i} className={`story-step ${i === sceneIdx ? 'is-on' : ''} ${i < sceneIdx ? 'is-done' : ''}`}>
                <div className="story-step-dot"></div>
                <div className="story-step-time mono">{s.time}</div>
              </div>
            ))}
            <div className="story-timeline-bar">
              <div className="story-timeline-fill" style={{ width: `${(stageProg * 100)}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SceneVisual({ idx, progress }) {
  return (
    <div className="scene-visual-wrap">
      <div style={{ opacity: idx === 0 ? 1 : 0, transition: 'opacity .5s' }} className="scene-layer"><Scene01OrdersFlagged progress={idx === 0 ? progress : 1} /></div>
      <div style={{ opacity: idx === 1 ? 1 : 0, transition: 'opacity .5s' }} className="scene-layer"><Scene02PickerReroute progress={idx === 1 ? progress : 1} /></div>
      <div style={{ opacity: idx === 2 ? 1 : 0, transition: 'opacity .5s' }} className="scene-layer"><Scene03Staged progress={idx === 2 ? progress : 1} /></div>
      <div style={{ opacity: idx === 3 ? 1 : 0, transition: 'opacity .5s' }} className="scene-layer"><Scene04DriverMatched progress={idx === 3 ? progress : 1} /></div>
      <div style={{ opacity: idx === 4 ? 1 : 0, transition: 'opacity .5s' }} className="scene-layer"><Scene05Delivered progress={idx === 4 ? progress : 1} /></div>
    </div>
  )
}

function Scene01OrdersFlagged({ progress }) {
  const orders = [
    { sku: 'AX-882', val: '$284', flag: true, pri: 'A' },
    { sku: 'KP-104', val: '$112', flag: false, pri: 'C' },
    { sku: 'AX-901', val: '$311', flag: true, pri: 'A' },
    { sku: 'TM-552', val: '$98', flag: false, pri: 'C' },
    { sku: 'AX-883', val: '$268', flag: true, pri: 'A' },
    { sku: 'BR-220', val: '$54', flag: false, pri: 'B' },
    { sku: 'AX-884', val: '$294', flag: true, pri: 'A' },
    { sku: 'LV-417', val: '$76', flag: false, pri: 'B' },
  ]
  const sorted = progress > 0.4
    ? [...orders.filter((o) => o.flag), ...orders.filter((o) => !o.flag)]
    : orders

  return (
    <div className="scene-frame">
      <div className="scene-header mono">
        <span>● OMS · order queue</span>
        <span style={{ color: 'var(--accent)' }}>Cortex scoring · {Math.floor(progress * 4147)} / sec</span>
      </div>
      <div className="oms-list">
        {sorted.map((o, i) => {
          const showFlag = o.flag && progress > 0.25
          return (
            <div
              key={o.sku}
              className={`oms-row ${o.flag ? 'is-flagged' : ''}`}
              style={{
                transform: `translateY(${i * 40}px)`,
                transition: 'transform .8s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              <div className="oms-row-pri">{o.pri}</div>
              <div className="oms-row-sku mono">{o.sku}</div>
              <div className="oms-row-val tnum">{o.val}</div>
              <div className="oms-row-flag">
                {showFlag && <span className="oms-flag-pill">● FLAGGED · TOP-PRIORITY</span>}
              </div>
            </div>
          )
        })}
      </div>
      <div className="scene-footer mono">
        <span>4 flagged · same-day SLA</span>
        <span style={{ color: 'var(--accent)' }}>+ $1,157 revenue at risk → secured</span>
      </div>
    </div>
  )
}

function Scene02PickerReroute({ progress }) {
  const flagged = ['C-203', 'C-208', 'D-114', 'D-117']
  const bins = []
  const cols = ['A', 'B', 'C', 'D', 'E']
  const rows = [101, 105, 110, 114, 117, 203, 208]
  for (let cI = 0; cI < cols.length; cI++) {
    for (let rI = 0; rI < rows.length; rI++) {
      const id = `${cols[cI]}-${rows[rI]}`
      bins.push({ id, col: cI, row: rI, flagged: flagged.includes(id) })
    }
  }
  const pickerPath = [
    { col: 2, row: 5 },
    { col: 2, row: 6 },
    { col: 3, row: 4 },
    { col: 3, row: 5 },
  ]
  const pathLen = pickerPath.length
  const drawCount = Math.min(pathLen, Math.ceil(progress * pathLen * 1.3))

  const pickerT = Math.min(1, progress * 1.6)
  const totalSegs = pickerPath.length - 1
  const segIdx = Math.min(totalSegs - 1, Math.floor(pickerT * totalSegs))
  const segT = (pickerT * totalSegs) - segIdx
  let px = 0, py = 0
  if (pickerPath[segIdx] && pickerPath[segIdx + 1]) {
    const a = pickerPath[segIdx], b = pickerPath[segIdx + 1]
    px = a.col + (b.col - a.col) * segT
    py = a.row + (b.row - a.row) * segT
  } else {
    px = pickerPath[0].col
    py = pickerPath[0].row
  }

  return (
    <div className="scene-frame">
      <div className="scene-header mono">
        <span>● WMS · Elizabeth NJ · Bay 14</span>
        <span style={{ color: 'var(--accent)' }}>Path rebuilt · −14 steps</span>
      </div>
      <div className="warehouse-grid">
        <svg viewBox="0 0 50 35" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%' }}>
          {bins.map((b) => {
            const x = 2 + b.col * 9
            const y = 2 + b.row * 4.4
            return (
              <g key={b.id}>
                <rect x={x} y={y} width={7.5} height={3.5} rx=".3"
                  fill={b.flagged ? 'rgba(79,134,183,.18)' : 'rgba(255,255,255,.05)'}
                  stroke={b.flagged ? 'var(--accent)' : 'rgba(255,255,255,.12)'}
                  strokeWidth=".15"
                  style={{ filter: b.flagged ? 'drop-shadow(0 0 1.5px var(--accent))' : 'none' }} />
                {b.flagged && <text x={x + 3.75} y={y + 2.3} textAnchor="middle" fontSize="1.4" fontFamily="JetBrains Mono" fill="var(--accent)" fontWeight="600">{b.id}</text>}
              </g>
            )
          })}
          {pickerPath.slice(0, drawCount).map((pt, i) => {
            if (i === 0) return null
            const prev = pickerPath[i - 1]
            const x1 = 2 + prev.col * 9 + 3.75
            const y1 = 2 + prev.row * 4.4 + 1.75
            const x2 = 2 + pt.col * 9 + 3.75
            const y2 = 2 + pt.row * 4.4 + 1.75
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="var(--accent)" strokeWidth=".3" strokeDasharray=".7 .5"
              opacity=".75" />
          })}
          <circle cx={2 + px * 9 + 3.75} cy={2 + py * 4.4 + 1.75} r="1.4"
            fill="#fff" stroke="var(--accent)" strokeWidth=".25" />
          <circle cx={2 + px * 9 + 3.75} cy={2 + py * 4.4 + 1.75} r="2.6"
            fill="none" stroke="var(--accent)" strokeWidth=".15" opacity=".5">
            <animate attributeName="r" values="1.8;3;1.8" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
      <div className="scene-footer mono">
        <span>Picker · M. Reyes</span>
        <span style={{ color: 'var(--accent)' }}>4 of 4 bins · 3 min saved</span>
      </div>
    </div>
  )
}

function Scene03Staged({ progress }) {
  const items = [
    { label: 'Pallets wrapped', n: 4, done: progress > 0.15 },
    { label: 'BOL · #44291 generated', n: 1, done: progress > 0.35 },
    { label: 'Carrier dispatch sent', n: 1, done: progress > 0.55 },
    { label: 'Dock 3 assigned', n: 1, done: progress > 0.75 },
  ]
  return (
    <div className="scene-frame">
      <div className="scene-header mono">
        <span>● Outbound · Dock 3</span>
        <span style={{ color: 'var(--accent)' }}>+6 min slack to SLA</span>
      </div>
      <div className="dock-visual">
        <svg viewBox="0 0 100 60" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <line x1="0" y1="48" x2="100" y2="48" stroke="rgba(255,255,255,.18)" strokeWidth=".25" strokeDasharray="1 1" />
          {[0, 1, 2, 3].map((i) => {
            const appear = progress > 0.1 + i * 0.08
            return (
              <g key={i} style={{ opacity: appear ? 1 : 0, transition: 'opacity .5s' }}>
                <rect x={14 + i * 13} y={36} width={11} height={12} rx=".4"
                  fill="rgba(79,134,183,.2)" stroke="var(--accent)" strokeWidth=".25" />
                <rect x={14 + i * 13} y={45} width={11} height={3} fill="rgba(255,255,255,.4)" />
                <text x={19.5 + i * 13} y={43} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="1.7" fill="#fff">P{i + 1}</text>
              </g>
            )
          })}
          {progress > 0.35 && (
            <g style={{ opacity: 1, transition: 'opacity .4s' }}>
              <rect x={73} y={22} width={20} height={24} fill="#fff" stroke="var(--accent)" strokeWidth=".2" rx=".3" />
              <text x={75} y={26} fontFamily="JetBrains Mono" fontSize="1.4" fill="#0a0a0a">BOL</text>
              <line x1={75} y1={28} x2={91} y2={28} stroke="#0a0a0a" strokeWidth=".15" />
              <line x1={75} y1={32} x2={91} y2={32} stroke="#0a0a0a" strokeWidth=".1" />
              <line x1={75} y1={35} x2={91} y2={35} stroke="#0a0a0a" strokeWidth=".1" />
              <line x1={75} y1={38} x2={88} y2={38} stroke="#0a0a0a" strokeWidth=".1" />
              <text x={75} y={43} fontFamily="JetBrains Mono" fontSize=".9" fill="var(--accent)">#44291</text>
            </g>
          )}
        </svg>
      </div>
      <div className="dock-checklist">
        {items.map((it, i) => (
          <div key={i} className={`dock-check ${it.done ? 'is-done' : ''}`}>
            <div className="dock-check-box">{it.done ? '✓' : ''}</div>
            <div className="dock-check-label">{it.label}</div>
            <div className="dock-check-n mono">×{it.n}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Scene04DriverMatched({ progress }) {
  return (
    <div className="scene-frame">
      <div className="scene-header mono">
        <span>● TMS · auto-match</span>
        <span style={{ color: 'var(--accent)' }}>4147 candidates → 1 chosen</span>
      </div>
      <div className="dispatch-visual">
        <svg viewBox="0 0 100 60" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%' }}>
          <rect x="0" y="40" width="100" height="14" fill="rgba(255,255,255,.04)" />
          <line x1="0" y1="47" x2={progress * 100} y2="47" stroke="var(--accent)" strokeWidth=".4" strokeDasharray="2 2" opacity=".7" />
          <g transform="translate(2, 30)">
            <rect x="0" y="0" width="20" height="18" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.18)" strokeWidth=".2" />
            <rect x="3" y="6" width="14" height="12" fill="rgba(79,134,183,.1)" stroke="var(--accent)" strokeWidth=".2" />
            <text x="10" y="14" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="1.6" fill="#fff">DOCK 3</text>
          </g>
          <g transform={`translate(${85 - progress * 50}, 32)`}>
            <rect x="0" y="2" width="18" height="12" fill="rgba(255,255,255,.1)" stroke="var(--accent)" strokeWidth=".3" />
            <path d="M 18 6 L 22 6 L 24 9 L 24 14 L 18 14 Z" fill="rgba(255,255,255,.1)" stroke="var(--accent)" strokeWidth=".3" />
            <text x="9" y="9" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="1.8" fill="#fff" fontWeight="600">TX-44</text>
            <text x="9" y="12" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="1.4" fill="var(--accent)">ELITE 0.94</text>
            <circle cx="4" cy="15" r="1.6" fill="#0a0a0a" stroke="var(--accent)" strokeWidth=".2" />
            <circle cx="20" cy="15" r="1.6" fill="#0a0a0a" stroke="var(--accent)" strokeWidth=".2" />
          </g>
          {progress > 0.4 && (
            <g transform="translate(58, 6)" style={{ opacity: 1, transition: 'opacity .4s' }}>
              <rect x="0" y="0" width="38" height="14" rx="2" fill="#0a0a0a" stroke="var(--accent)" strokeWidth=".25" />
              <circle cx="3" cy="3" r=".8" fill="var(--accent)" />
              <text x="6" y="4" fontFamily="JetBrains Mono" fontSize="1.4" fill="var(--accent)">CORTEX MATCH</text>
              <text x="3" y="8" fontFamily="Plus Jakarta Sans" fontSize="2" fill="#fff" fontWeight="600">Elizabeth → Bethlehem</text>
              <text x="3" y="11.5" fontFamily="JetBrains Mono" fontSize="1.4" fill="rgba(255,255,255,.6)">82 mi · $640 · backhaul +$210</text>
            </g>
          )}
        </svg>
      </div>
      <div className="scene-footer mono">
        <span>Driver matched 12 min before pack-out</span>
        <span style={{ color: 'var(--accent)' }}>No broker · no phone · no friction</span>
      </div>
    </div>
  )
}

function Scene05Delivered({ progress }) {
  return (
    <div className="scene-frame">
      <div className="scene-header mono">
        <span>● Bethlehem PA · 13:08</span>
        <span style={{ color: 'var(--accent)' }}>7 min ahead of SLA</span>
      </div>
      <div className="deliver-visual">
        <svg viewBox="0 0 100 60" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%' }}>
          <g style={{ opacity: Math.min(1, progress * 2) }}>
            <rect x={20} y={6} width={60} height={48} rx="1" fill="rgba(79,134,183,.06)" stroke="var(--accent)" strokeWidth=".3" />
            <text x={24} y={12} fontFamily="JetBrains Mono" fontSize="1.6" fill="var(--accent)">PROOF OF DELIVERY · #44291</text>
            <line x1={24} y1={14} x2={76} y2={14} stroke="rgba(79,134,183,.3)" strokeWidth=".15" />
            <text x={24} y={20} fontFamily="JetBrains Mono" fontSize="1.4" fill="rgba(255,255,255,.6)">CONSIGNEE</text>
            <text x={24} y={24} fontFamily="Plus Jakarta Sans" fontSize="2.4" fill="#fff" fontWeight="600">1450 E Lehigh St, Bethlehem PA</text>
            <text x={24} y={31} fontFamily="JetBrains Mono" fontSize="1.4" fill="rgba(255,255,255,.6)">DELIVERED</text>
            <text x={24} y={35} fontFamily="Plus Jakarta Sans" fontSize="2.2" fill="#fff">13:08 EDT · 7 min early</text>
            <text x={24} y={43} fontFamily="JetBrains Mono" fontSize="1.4" fill="rgba(255,255,255,.6)">PAYMENT</text>
            <text x={24} y={47} fontFamily="Plus Jakarta Sans" fontSize="3" fill="var(--accent)" fontWeight="700">$640.00 · cleared 0:00:04</text>
            <text x={24} y={52} fontFamily="JetBrains Mono" fontSize="1.4" fill="var(--accent)">TIER · 0.92 → 0.94 ▲</text>
          </g>
        </svg>
      </div>
      <div className="results-strip">
        <div className="result-tile">
          <div className="result-num tnum">$184</div>
          <div className="result-lbl mono">Saved · this shipment</div>
        </div>
        <div className="result-tile">
          <div className="result-num tnum">+6 min</div>
          <div className="result-lbl mono">Slack delivered to SLA</div>
        </div>
        <div className="result-tile">
          <div className="result-num tnum">0.94</div>
          <div className="result-lbl mono">Driver tier · ▲ 0.02</div>
        </div>
        <div className="result-tile">
          <div className="result-num tnum">4s</div>
          <div className="result-lbl mono">Payment cleared</div>
        </div>
      </div>
    </div>
  )
}
