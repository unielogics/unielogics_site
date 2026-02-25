export default function LossGainChart() {
  const width = 900
  const height = 420
  const margin = 48

  // Downtrend: jagged line from high (top-left) to low (bottom-right)
  // SVG y: smaller = higher on screen. So high cost = small y, low cost = large y
  const trendPoints = [
    [margin, margin + 20],
    [width * 0.15, margin + 80],
    [width * 0.3, margin + 40],
    [width * 0.45, margin + 120],
    [width * 0.58, margin + 70],
    [width * 0.72, margin + 150],
    [width * 0.88, margin + 95],
    [width - margin, height - margin - 30]
  ]
  const pathD = trendPoints.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ')

  return (
    <div className="loss-gain-chart">
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMax meet">
        <defs>
          <linearGradient id="trendStrokeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(239,68,68,0.2)" />
            <stop offset="50%" stopColor="rgba(239,68,68,0.5)" />
            <stop offset="100%" stopColor="rgba(239,68,68,0.85)" />
          </linearGradient>
          <linearGradient id="trendFillGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(239,68,68,0.03)" />
            <stop offset="100%" stopColor="rgba(239,68,68,0.08)" />
          </linearGradient>
        </defs>
        {/* Subtle area under line */}
        <path
          className="chart-area chart-area-trend"
          fill="url(#trendFillGrad)"
          d={`${pathD} L ${width - margin} ${height - margin} L ${margin} ${height - margin} Z`}
        />
        {/* Floating downtrend line */}
        <path
          className="chart-line chart-line-trend"
          d={pathD}
          fill="none"
          stroke="url(#trendStrokeGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
