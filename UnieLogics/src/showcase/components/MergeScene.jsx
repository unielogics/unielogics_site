// MergeScene — "Industry in isolation → Cortex orchestrating"
// FOUR INDUSTRY ARCHETYPES in a 2x2 grid; scroll choreography zooms in,
// Cortex emerges, metrics flip green per archetype.
import { useRef, useState, useEffect } from 'react'

const INDUSTRIES = [
  {
    key: 'warehouses',
    label: 'Warehouse operators',
    sub: '3PL · Prep · Fulfillment',
    quadrant: 'tl',
    before: [
      { l: 'Pickers idle', v: '12% of shift', bad: true },
      { l: 'Slotting accuracy', v: 'last-quarter', bad: true },
      { l: 'Labor scheduling', v: 'by gut feel', bad: true },
      { l: 'Capacity to sellers', v: 'unknown', bad: true },
    ],
    after: [
      { l: 'Payroll spend', v: '−12%' },
      { l: 'Throughput', v: '+47%' },
      { l: 'Labor scheduling', v: 'demand-tied' },
      { l: 'Capacity, monetized', v: '+$84K / mo' },
    ],
  },
  {
    key: 'carriers',
    label: 'Carriers & truckers',
    sub: 'LTL · FTL · Owner-operator',
    quadrant: 'tr',
    before: [
      { l: 'Empty miles', v: '28%', bad: true },
      { l: 'Broker margin lost', v: '20–30%', bad: true },
      { l: 'Loads found via', v: 'phone', bad: true },
      { l: 'Payment cycle', v: '45-day net', bad: true },
    ],
    after: [
      { l: 'Empty miles', v: '−18% absolute' },
      { l: 'Net pay / mile', v: '+24%' },
      { l: 'Loads matched in', v: '140ms' },
      { l: 'Payment cleared', v: '0:00:04' },
    ],
  },
  {
    key: 'sellers',
    label: 'Ecommerce sellers',
    sub: 'D2C · Marketplaces · Brands',
    quadrant: 'bl',
    before: [
      { l: 'Inventory placement', v: 'by guess', bad: true },
      { l: 'Margin known at', v: 'invoice time', bad: true },
      { l: 'DC routing', v: 'manual', bad: true },
      { l: 'Fee model vintage', v: '2024', bad: true },
    ],
    after: [
      { l: 'Inventory placement', v: 'predictive' },
      { l: 'Margin priced at', v: 'order time' },
      { l: 'Last-mile cost', v: '−22%' },
      { l: 'Fee model', v: 'current · live' },
    ],
  },
  {
    key: 'lastmile',
    label: 'Last-mile & brokers',
    sub: 'FedEx · UPS · USPS · Regionals',
    quadrant: 'br',
    before: [
      { l: 'Invoice anomalies', v: '+$42K / mo unrecovered', bad: true },
      { l: 'Rate counterfactuals', v: 'never run', bad: true },
      { l: 'Contract review', v: 'annual', bad: true },
      { l: 'Carrier mix decision', v: 'phone calls', bad: true },
    ],
    after: [
      { l: 'Refunds recovered', v: '$42K / mo · auto' },
      { l: 'Counterfactuals', v: 'every shipment' },
      { l: 'Contract review', v: 'quarterly rebid' },
      { l: 'Carrier mix', v: 'per-shipment' },
    ],
  },
]

function clamp01(v) {
  return Math.max(0, Math.min(1, v))
}

export function MergeScene() {
  const stageRef = useRef(null)
  const [p, setP] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      if (!stageRef.current) return
      const r = stageRef.current.getBoundingClientRect()
      const total = r.height - window.innerHeight
      if (total <= 0) {
        setP(0)
        return
      }
      const scrolled = -r.top
      setP(Math.max(0, Math.min(1, scrolled / total)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const zoomIn = clamp01((p - 0.05) / 0.20)
  const lineDraw = clamp01((p - 0.35) / 0.15)
  const brainShow = clamp01((p - 0.42) / 0.18)
  const flipMetrics = clamp01((p - 0.55) / 0.15)

  const tileScale = 0.78 + 0.22 * zoomIn

  return (
    <section className="merge-section">
      <div className="merge-stage" ref={stageRef} style={{ height: '380vh' }}>
        <div className="merge-pin">
          <div className="merge-header">
            <div className="merge-eyebrow mono">
              {p < 0.22 ? 'Today · Four industries · Four languages' :
                p < 0.42 ? 'Up close · The failures, by type' :
                  p < 0.60 ? 'Cortex · The connective tissue' :
                    'Cortex overlooking · Per-type improvements'}
            </div>
            <h2 className="merge-title">
              {p < 0.22 ? <>Every layer of your supply chain<br />speaks a <em className="serif">different language.</em></> :
                p < 0.42 ? <>The same problem,<br />told <em className="serif">four different ways.</em></> :
                  p < 0.60 ? <>One brain. Four parties.<br /><em className="serif">Same page.</em></> :
                    <>The numbers <em className="serif">flip.</em><br />Per archetype. Continuously.</>}
            </h2>
          </div>

          <div className="merge-canvas">
            <MergeOrbital lineDraw={lineDraw} brainShow={brainShow} flipMetrics={flipMetrics} />
          </div>

          <div className="merge-tiles-grid">
            {INDUSTRIES.map((s) => (
              <IndustryTile key={s.key} ind={s} scale={tileScale} flipMetrics={flipMetrics} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function MergeOrbital({ lineDraw, brainShow }) {
  const cx = 50, cy = 50
  const brainR = 1 + 8 * brainShow

  const quadrantTargets = {
    tl: { x: 34, y: 34 },
    tr: { x: 66, y: 34 },
    bl: { x: 34, y: 66 },
    br: { x: 66, y: 66 },
  }

  return (
    <svg viewBox="0 0 100 100" className="merge-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="m-brainGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="1" />
          <stop offset="50%" stopColor="var(--accent)" stopOpacity=".5" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="m-brainCore" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fff" stopOpacity=".95" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity=".15" />
        </radialGradient>
      </defs>

      {Object.entries(quadrantTargets).map(([q, t], i) => {
        const reveal = clamp01(lineDraw * 1.3 - i * 0.04)
        const ex = cx + (t.x - cx) * reveal
        const ey = cy + (t.y - cy) * reveal
        return (
          <g key={q}>
            <line x1={cx} y1={cy} x2={ex} y2={ey}
              stroke="var(--accent)" strokeWidth=".3"
              strokeDasharray="1.5 1.5"
              opacity={Math.min(1, reveal * 1.4)} />
            {reveal > 0.95 && (
              <>
                <circle r=".7" fill="var(--accent)">
                  <animateMotion dur="1.8s" repeatCount="indefinite" path={`M ${cx} ${cy} L ${t.x} ${t.y}`} />
                </circle>
                <circle r=".5" fill="#fff" opacity=".6">
                  <animateMotion dur="2.4s" repeatCount="indefinite" path={`M ${t.x} ${t.y} L ${cx} ${cy}`} />
                </circle>
              </>
            )}
          </g>
        )
      })}

      {brainShow > 0.05 && (
        <circle cx={cx} cy={cy} r={brainR * 2.4} fill="url(#m-brainGlow)" opacity={brainShow} />
      )}

      {brainShow > 0.05 && (
        <g style={{ opacity: brainShow }}>
          <circle cx={cx} cy={cy} r={brainR} fill="url(#m-brainCore)" />
          <circle cx={cx} cy={cy} r={brainR - 1.3} fill="none" stroke="var(--accent)" strokeWidth=".35" strokeOpacity=".7" />
          {Array.from({ length: 12 }).map((_, j) => {
            const a = (j / 12) * Math.PI * 2
            const r0 = brainR * 0.4
            const r1 = brainR * 0.85
            return <line key={j}
              x1={cx + Math.cos(a) * r0} y1={cy + Math.sin(a) * r0}
              x2={cx + Math.cos(a) * r1} y2={cy + Math.sin(a) * r1}
              stroke="#fff" strokeWidth=".12" strokeOpacity=".75" />
          })}
          {brainShow > 0.6 && (
            <>
              <text x={cx} y={cy + .2} textAnchor="middle" fontFamily="Plus Jakarta Sans"
                fontSize={brainR * 0.34} fontWeight="700" fill="#fff" letterSpacing="-.04em">CORTEX</text>
              <text x={cx} y={cy + brainR * 0.5} textAnchor="middle" fontFamily="JetBrains Mono"
                fontSize={brainR * 0.16} fill="var(--accent)" letterSpacing=".18em">AI</text>
            </>
          )}
        </g>
      )}
    </svg>
  )
}

function IndustryTile({ ind, scale, flipMetrics }) {
  const flipped = flipMetrics > 0.5
  return (
    <div className={`industry-tile q-${ind.quadrant} ${flipped ? 'is-flipped' : ''}`}
      style={{ transform: `scale(${scale})` }}>
      <div className="it-head">
        <div>
          <div className="it-label">{ind.label}</div>
          <div className="it-sub mono">{ind.sub}</div>
        </div>
        <div className="it-status mono">
          {flipped ? '● Cortex overlooking' : '● Working in isolation'}
        </div>
      </div>
      <div className="it-rows">
        {ind.before.map((row, i) => {
          const after = ind.after[i] || row
          return (
            <div key={i} className="it-row">
              <span className="it-row-l">{flipped ? after.l : row.l}</span>
              <span
                className="it-row-v"
                style={{
                  color: flipped ? 'var(--accent)' : 'var(--accent-2)',
                }}>
                {flipped ? after.v : row.v}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
