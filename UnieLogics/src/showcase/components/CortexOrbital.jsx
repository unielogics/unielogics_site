// CortexOrbital — the iconic centerpiece.
// Cortex AI brain at center, orbited by the 4 operational systems it commands.
import { useEffect, useState } from 'react'

export function CortexOrbital({ size = 720, showLabels = true, compact = false }) {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    let raf
    const start = performance.now()
    const loop = (now) => {
      setTick((now - start) / 1000)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  const satellites = [
    { angle: -Math.PI / 2, label: 'UnieWMS', sub: 'Warehouse', metric: '32 picks/min', glyph: 'wms' },
    { angle: 0, label: 'UnieFreight', sub: 'Transport (TMS)', metric: '143 lanes active', glyph: 'tms' },
    { angle: Math.PI / 2, label: 'OMS', sub: 'Orders', metric: '8,402 orders / hr', glyph: 'oms' },
    { angle: Math.PI, label: 'UnieCourier', sub: 'Last-mile', metric: '12 carriers · 4 modes', glyph: 'courier' },
  ]

  const cx = 50, cy = 50
  const r = compact ? 22 : 26
  const brainR = compact ? 9 : 10
  const satR = compact ? 5 : 5.5

  const pulsesPerSpoke = 3
  const pulsePeriod = 3.2

  return (
    <svg viewBox="0 0 100 100" className="cortex-orbital" style={{ width: size, height: size, maxWidth: '100%', display: 'block' }}>
      <defs>
        <radialGradient id="brainGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="1" />
          <stop offset="40%" stopColor="var(--accent)" stopOpacity=".6" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="brainCore" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fff" stopOpacity=".95" />
          <stop offset="35%" stopColor="var(--accent)" stopOpacity=".8" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity=".15" />
        </radialGradient>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0.6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--accent)" strokeOpacity=".18" strokeWidth=".3" />
      <circle cx={cx} cy={cy} r={r + 6} fill="none" stroke="var(--accent)" strokeOpacity=".06" strokeWidth=".3" strokeDasharray="1 2" />
      <circle cx={cx} cy={cy} r={r - 6} fill="none" stroke="var(--accent)" strokeOpacity=".06" strokeWidth=".3" strokeDasharray="1 2" />

      <g style={{ transform: `rotate(${tick * 4}deg)`, transformOrigin: 'center' }}>
        {Array.from({ length: 60 }).map((_, i) => {
          const a = (i / 60) * Math.PI * 2
          const x1 = cx + Math.cos(a) * (r + 6)
          const y1 = cy + Math.sin(a) * (r + 6)
          const x2 = cx + Math.cos(a) * (r + 6.8)
          const y2 = cy + Math.sin(a) * (r + 6.8)
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--accent)" strokeOpacity={i % 5 === 0 ? .6 : .15} strokeWidth=".18" />
        })}
      </g>

      {satellites.map((s, i) => {
        const sx = cx + Math.cos(s.angle) * r
        const sy = cy + Math.sin(s.angle) * r
        return (
          <g key={'spoke-' + i}>
            <line x1={cx} y1={cy} x2={sx} y2={sy} stroke="var(--accent)" strokeOpacity=".18" strokeWidth=".25" />
            {Array.from({ length: pulsesPerSpoke }).map((_, p) => {
              const phase = ((tick / pulsePeriod) + p / pulsesPerSpoke + i * 0.13) % 1
              const t = phase
              const px = cx + (sx - cx) * t
              const py = cy + (sy - cy) * t
              const opacity = Math.sin(phase * Math.PI)
              return <circle key={'out-' + p} cx={px} cy={py} r=".5" fill="var(--accent)" opacity={opacity * .8} />
            })}
            {Array.from({ length: pulsesPerSpoke - 1 }).map((_, p) => {
              const phase = ((tick / (pulsePeriod * 1.3)) + p / (pulsesPerSpoke - 1) + i * 0.27 + 0.5) % 1
              const t = 1 - phase
              const px = cx + (sx - cx) * t
              const py = cy + (sy - cy) * t
              const opacity = Math.sin(phase * Math.PI)
              return <circle key={'in-' + p} cx={px} cy={py} r=".42" fill="#fff" opacity={opacity * .55} />
            })}
          </g>
        )
      })}

      <circle cx={cx} cy={cy} r={brainR * 2.2} fill="url(#brainGlow)" opacity={.5 + .15 * Math.sin(tick * 1.5)} />

      <g filter="url(#softGlow)">
        <circle cx={cx} cy={cy} r={brainR} fill="url(#brainCore)" />
        <circle cx={cx} cy={cy} r={brainR - 1.5} fill="none" stroke="var(--accent)" strokeWidth=".4" strokeOpacity=".7" />
        <circle cx={cx} cy={cy} r={brainR - 3} fill="none" stroke="#fff" strokeWidth=".3" strokeOpacity=".5" />
      </g>

      <g opacity=".55">
        {Array.from({ length: 14 }).map((_, i) => {
          const a = (i / 14) * Math.PI * 2 + tick * 0.06
          const r0 = brainR * 0.45 + Math.sin(tick * 2 + i) * 0.4
          const r1 = brainR * 0.85
          const x1 = cx + Math.cos(a) * r0
          const y1 = cy + Math.sin(a) * r0
          const x2 = cx + Math.cos(a) * r1
          const y2 = cy + Math.sin(a) * r1
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fff" strokeWidth=".15" strokeOpacity=".8" />
        })}
      </g>

      <text x={cx} y={cy - 0.2} textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="2.6" fontWeight="700" fill="#fff" letterSpacing="-.04em">CORTEX</text>
      <text x={cx} y={cy + 2.6} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="1.3" fill="var(--accent)" letterSpacing=".15em">AI</text>

      {satellites.map((s, i) => {
        const sx = cx + Math.cos(s.angle) * r
        const sy = cy + Math.sin(s.angle) * r
        const labelOffset = satR + 5.5
        const lx = cx + Math.cos(s.angle) * (r + labelOffset)
        const ly = cy + Math.sin(s.angle) * (r + labelOffset)
        const isLeft = Math.cos(s.angle) < -0.3
        const isRight = Math.cos(s.angle) > 0.3
        const anchor = isLeft ? 'end' : isRight ? 'start' : 'middle'

        return (
          <g key={'sat-' + i}>
            <circle cx={sx} cy={sy} r={satR + 2.5} fill="var(--accent-2)" opacity={.08 + .04 * Math.sin(tick * 2 + i)} />
            <circle cx={sx} cy={sy} r={satR} fill="var(--bg)" stroke="var(--accent-2)" strokeWidth=".5" />
            <circle cx={sx} cy={sy} r={satR - 1.6} fill="var(--accent-2)" opacity=".15" />

            <SatelliteGlyph kind={s.glyph} cx={sx} cy={sy} size={satR * 1.0} />

            {showLabels && (
              <g>
                <text x={lx} y={ly - 0.5} textAnchor={anchor} fontFamily="Plus Jakarta Sans" fontSize="2.4" fontWeight="600" fill="#fff" letterSpacing="-.01em">
                  {s.label}
                </text>
                <text x={lx} y={ly + 2.2} textAnchor={anchor} fontFamily="JetBrains Mono" fontSize="1.4" fill="var(--fg-3)" letterSpacing=".1em">
                  {s.sub.toUpperCase()}
                </text>
                <text x={lx} y={ly + 4.4} textAnchor={anchor} fontFamily="JetBrains Mono" fontSize="1.3" fill="var(--accent-2)" letterSpacing=".08em">
                  {s.metric}
                </text>
              </g>
            )}
          </g>
        )
      })}
    </svg>
  )
}

function SatelliteGlyph({ kind, cx, cy, size = 5 }) {
  const s = size * 0.55
  switch (kind) {
    case 'wms':
      return (
        <g transform={`translate(${cx - s / 2}, ${cy - s / 2})`} stroke="#fff" strokeWidth=".3" fill="none">
          <path d={`M 0 ${s * 0.4} L ${s / 2} 0 L ${s} ${s * 0.4} L ${s} ${s} L 0 ${s} Z`} />
          <line x1={s * 0.4} y1={s * 0.55} x2={s * 0.6} y2={s * 0.55} />
          <line x1={s * 0.4} y1={s * 0.75} x2={s * 0.6} y2={s * 0.75} />
        </g>
      )
    case 'tms':
      return (
        <g transform={`translate(${cx - s / 2}, ${cy - s / 2})`} stroke="#fff" strokeWidth=".3" fill="none">
          <rect x={0} y={s * 0.25} width={s * 0.65} height={s * 0.5} />
          <path d={`M ${s * 0.65} ${s * 0.4} L ${s * 0.85} ${s * 0.4} L ${s} ${s * 0.55} L ${s} ${s * 0.75} L ${s * 0.65} ${s * 0.75} Z`} />
          <circle cx={s * 0.25} cy={s * 0.8} r={s * 0.08} />
          <circle cx={s * 0.85} cy={s * 0.8} r={s * 0.08} />
        </g>
      )
    case 'oms':
      return (
        <g transform={`translate(${cx - s / 2}, ${cy - s / 2})`} stroke="#fff" strokeWidth=".3" fill="none">
          <rect x={s * 0.15} y={0} width={s * 0.7} height={s} />
          <line x1={s * 0.25} y1={s * 0.3} x2={s * 0.75} y2={s * 0.3} />
          <line x1={s * 0.25} y1={s * 0.5} x2={s * 0.75} y2={s * 0.5} />
          <line x1={s * 0.25} y1={s * 0.7} x2={s * 0.6} y2={s * 0.7} />
        </g>
      )
    case 'courier':
      return (
        <g transform={`translate(${cx - s / 2}, ${cy - s / 2})`} stroke="#fff" strokeWidth=".3" fill="none">
          <path d={`M 0 ${s * 0.25} L ${s / 2} 0 L ${s} ${s * 0.25} L ${s} ${s} L 0 ${s} Z`} />
          <line x1={0} y1={s * 0.25} x2={s} y2={s * 0.25} />
          <line x1={s / 2} y1={0} x2={s / 2} y2={s * 0.25} />
        </g>
      )
    default:
      return null
  }
}
