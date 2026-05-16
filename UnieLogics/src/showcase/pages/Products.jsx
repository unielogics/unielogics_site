// Products — full catalog (ported from design products.html).
import { Anchor } from '../lib/nav'
import { CortexOrbital } from '../components/CortexOrbital'

const PRODUCTS = [
  {
    id: 'uniecortex',
    name: 'UnieCortex',
    status: 'Centerpiece',
    statusClass: '',
    link: 'cortex.html',
    image: null,
    useOrbital: true,
    oneliner: 'The intelligence layer your WMS, OMS, and drivers were missing.',
    bullets: [
      'Real-time orchestration across every connected system',
      'Four-track comparison: baseline, base AI, full network AI, theoretical optimum',
      'Local-first inference — your data never leaves your network',
      'Approve / deny gated — never autonomous without your nod',
    ],
    closing: 'The brain. Every other product feeds it, and every other product executes its output.',
  },
  {
    id: 'uniewms',
    name: 'UnieWMS',
    status: 'Live',
    statusClass: '',
    link: 'wms.html',
    image: 'https://prepcenternearme.s3.us-east-1.amazonaws.com/unielogics/uniewms+(2).png',
    oneliner: 'The operational core. Warehouse management Cortex actually trusts.',
    bullets: [
      'Real-time inventory orchestration across receiving, storage, picking, packing, dispatch',
      'Predictive correction & anomaly detection',
      'Multi-client, multi-facility sync — independent operation, network participation',
      'Connects in 2–4 weeks · pre-built integrations',
    ],
    closing: 'Every product in the suite touches a warehouse. This is the warehouse.',
  },
  {
    id: 'unieconnect',
    name: 'UnieConnect',
    status: 'Beta',
    statusClass: '',
    link: '#',
    image: null,
    useConnect: true,
    oneliner: 'The OMS command center. Orders, customers, marketplace listings — one operating view.',
    bullets: [
      "Every order priced for margin before it's promised — current marketplace fees baked in",
      'Order-level profit by lane, region, and channel',
      'Inventory network view across every connected DC',
      'Cortex suggestions surface as approve / deny actions, not background changes',
    ],
    closing: "The command center where the business is actually run — with Cortex sitting in the operator's seat.",
  },
  {
    id: 'driver-app',
    name: 'Driver App · AI dispatch',
    status: 'Waitlist',
    statusClass: '',
    link: 'tms.html',
    image: null,
    useDriverPhone: true,
    oneliner: 'The breakthrough piece. Loads auto-matched to independent drivers — no broker, no phone.',
    bullets: [
      'One-tap load acceptance with rate, backhaul, and ETA up-front',
      'Photo-verified pickup + POD capture',
      'Payment released in seconds after POD',
      'Independent stays independent — no fleet contract, no long-term lock-in',
    ],
    closing: 'Turns every independent driver into addressable, score-able, dispatch-ready network capacity.',
  },
]

function ConnectThumb() {
  return (
    <svg viewBox="0 0 240 150" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: 'auto', maxHeight: '100%' }}>
      <rect x="0" y="0" width="36" height="150" fill="rgba(255,255,255,.04)" />
      <rect x="6" y="6" width="24" height="3" rx=".8" fill="var(--accent)" />
      {[14, 22, 30, 38, 46, 54, 62].map((y) => <rect key={y} x="6" y={y} width="24" height="2" rx=".5" fill="rgba(255,255,255,.18)" />)}
      <rect x="36" y="0" width="204" height="14" fill="rgba(255,255,255,.06)" />
      <circle cx="48" cy="7" r="2.5" fill="var(--accent)" />
      <text x="54" y="9" fontFamily="Inter" fontSize="4" fill="rgba(255,255,255,.7)">Command Center</text>
      <rect x="208" y="3.5" width="24" height="7" rx="1.5" fill="var(--accent)" />
      <g>
        <rect x="44" y="20" width="58" height="32" rx="2" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.08)" strokeWidth=".3" />
        <text x="48" y="27" fontFamily="JetBrains Mono" fontSize="3" fill="rgba(255,255,255,.55)">ORDERS / HR</text>
        <text x="48" y="38" fontFamily="Inter" fontSize="9" fontWeight="700" fill="#fff">8,402</text>
        <text x="48" y="46" fontFamily="JetBrains Mono" fontSize="2.6" fill="var(--accent)">▲ +12.4%</text>
        <rect x="108" y="20" width="58" height="32" rx="2" fill="rgba(122,240,198,.06)" stroke="var(--accent)" strokeWidth=".3" />
        <text x="112" y="27" fontFamily="JetBrains Mono" fontSize="3" fill="var(--accent)">MARGIN AT ORDER</text>
        <text x="112" y="38" fontFamily="Inter" fontSize="9" fontWeight="700" fill="var(--accent)">+8.1%</text>
        <text x="112" y="46" fontFamily="JetBrains Mono" fontSize="2.6" fill="rgba(255,255,255,.55)">vs static price</text>
        <rect x="172" y="20" width="58" height="32" rx="2" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.08)" strokeWidth=".3" />
        <text x="176" y="27" fontFamily="JetBrains Mono" fontSize="3" fill="rgba(255,255,255,.55)">SKUS LIVE</text>
        <text x="176" y="38" fontFamily="Inter" fontSize="9" fontWeight="700" fill="#fff">2,412</text>
        <text x="176" y="46" fontFamily="JetBrains Mono" fontSize="2.6" fill="rgba(255,255,255,.55)">3 marketplaces</text>
      </g>
      <rect x="44" y="58" width="186" height="44" rx="2" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.06)" strokeWidth=".3" />
      <text x="48" y="65" fontFamily="JetBrains Mono" fontSize="2.6" fill="rgba(255,255,255,.55)">REVENUE · 7D</text>
      <polyline points="48,92 60,86 72,88 84,78 96,82 108,72 120,76 132,68 144,72 156,62 168,66 180,58 192,62 204,52 216,56 228,48" fill="none" stroke="var(--accent)" strokeWidth=".7" />
      <rect x="44" y="108" width="186" height="34" rx="2" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.06)" strokeWidth=".3" />
      <text x="48" y="115" fontFamily="JetBrains Mono" fontSize="2.6" fill="rgba(255,255,255,.55)">CORTEX SUGGESTIONS · 3 pending</text>
      {[121, 128, 135].map((y, i) => (
        <g key={i}>
          <circle cx="50" cy={y} r="1" fill={i === 0 ? 'var(--accent)' : 'rgba(255,255,255,.4)'} />
          <text x="54" y={y + 1.2} fontFamily="Inter" fontSize="3" fill="rgba(255,255,255,.7)">{i === 0 ? 'Re-route 142 SKUs · NJ → FL · save $4,820' : i === 1 ? 'Re-price 38 listings · Amazon · +6.2% margin' : 'Add carrier USPS to mix · LB <2lb · −$0.84/parcel'}</text>
          <rect x="206" y={y - 2} width="20" height="4.5" rx="1" fill={i === 0 ? 'var(--accent)' : 'rgba(255,255,255,.08)'} />
          <text x="216" y={y + 1.2} fontFamily="JetBrains Mono" fontSize="2.4" fill={i === 0 ? 'var(--accent-ink)' : 'rgba(255,255,255,.5)'} textAnchor="middle" fontWeight="600">{i === 0 ? 'APPROVE' : 'review'}</text>
        </g>
      ))}
    </svg>
  )
}

function DriverThumb() {
  return (
    <div style={{ width: 130, height: 260, borderRadius: 26, background: '#0a0a0a', border: '6px solid #1a1a1a', position: 'relative', overflow: 'hidden', boxShadow: '0 0 30px rgba(255,90,31,.2)' }}>
      <div style={{ position: 'absolute', top: 7, left: '50%', transform: 'translateX(-50%)', width: 42, height: 9, borderRadius: 999, background: '#0a0a0a', zIndex: 2 }}></div>
      <div style={{ position: 'absolute', inset: 0, background: '#f4f4f2', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px 9px 7px', background: '#fff', borderBottom: '1px solid #ebebe7', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 6, color: '#00873E', fontWeight: 700 }}>● ELITE 0.92</div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 6, color: '#0A0A0A', fontWeight: 600 }}>ONLINE</div>
        </div>
        <div style={{ padding: '5px 7px', background: '#0A0A0A', color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 6, letterSpacing: '.06em', textAlign: 'center' }}>● CORTEX MATCHED · #44291</div>
        <div style={{ padding: 9, flex: 1 }}>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 5.5, color: '#5A5A55', letterSpacing: '.1em' }}>ACTIVE LOAD</div>
          <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 10, color: '#0A0A0A', marginTop: 4, lineHeight: 1.1 }}>Elizabeth NJ → Bethlehem PA</div>
          <div style={{ marginTop: 10, padding: 7, border: '1px solid #ebebe7', borderRadius: 7, background: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono', fontSize: 6 }}><span style={{ color: '#8A8A82' }}>Pay</span><span style={{ fontWeight: 700, color: '#0A0A0A' }}>$640</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono', fontSize: 6, marginTop: 3 }}><span style={{ color: '#8A8A82' }}>+ backhaul</span><span style={{ fontWeight: 700, color: '#FF5A1F' }}>+$210</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono', fontSize: 6, marginTop: 3 }}><span style={{ color: '#8A8A82' }}>82 mi</span><span style={{ color: '#0A0A0A' }}>3h 35m</span></div>
          </div>
          <div style={{ marginTop: 10, padding: '8px 9px', borderRadius: 9, background: '#FF5A1F', color: '#fff', textAlign: 'center', fontWeight: 700, fontSize: 7, letterSpacing: '.04em' }}>Tap to accept</div>
        </div>
      </div>
    </div>
  )
}

export default function Products() {
  return (
    <>
      <section className="detail-hero">
        <div className="container detail-hero-inner">
          <div className="detail-hero-copy">
            <div className="micro" style={{ color: 'var(--accent)', marginBottom: 18 }}>● Product suite</div>
            <h1 className="detail-h1">
              Four products. <em className="serif">One brain.</em>
            </h1>
            <p className="lede" style={{ marginTop: 24, maxWidth: 580 }}>
              Cortex sits at the center. UnieWMS, UnieConnect, and the Driver App are how it sees the network — and how it executes through it.
            </p>
            <div style={{ marginTop: 36, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Anchor href="cortex.html" className="btn btn-primary">Start with Cortex <span className="arrow">→</span></Anchor>
              <Anchor href="index.html#audit" className="btn">Audit your business</Anchor>
            </div>
          </div>
          <div className="detail-hero-visual">
            <CortexOrbital size={580} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {PRODUCTS.map((p, i) => (
            <div key={p.id} className={`product-detail ${i % 2 === 1 ? 'is-reverse' : ''}`}>
              <div>
                <div className="micro" style={{ color: 'var(--accent)', marginBottom: 14 }}>
                  ● {p.name} · {p.status}
                </div>
                <h3>{p.name}</h3>
                <p style={{ fontSize: 18.5, lineHeight: 1.5 }}>{p.oneliner}</p>
                <ul>
                  {p.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
                <p style={{ fontStyle: 'italic', color: 'var(--fg)', marginTop: 8 }}>{p.closing}</p>
                <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {p.link && p.link !== '#' && (
                    <Anchor href={p.link} className="btn btn-primary">
                      Open {p.name} <span className="arrow">→</span>
                    </Anchor>
                  )}
                  <Anchor href="index.html#audit" className="btn">Run an audit</Anchor>
                </div>
              </div>
              <div className="product-detail-visual">
                {p.useOrbital ? (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CortexOrbital size={420} compact={true} showLabels={false} />
                  </div>
                ) : p.useConnect ? (
                  <ConnectThumb />
                ) : p.useDriverPhone ? (
                  <DriverThumb />
                ) : p.image ? (
                  <>
                    <span className={`pd-status ${p.statusClass}`}>{p.status}</span>
                    <img src={p.image} alt={p.name} loading="lazy" />
                  </>
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1a1a1a, #0a0a0a)' }}>
                    <div style={{ fontFamily: 'JetBrains Mono', fontSize: 14, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--accent)', textAlign: 'center' }}>
                      ● {p.name}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="container-tight">
          <h2>One network.<br /><span className="serif-line">Total coordination.</span></h2>
          <p className="lede" style={{ textAlign: 'center' }}>Start with one product. Grow into the whole suite. Cortex gets smarter as it sees more of your picture.</p>
          <div className="btns">
            <Anchor href="index.html#audit" className="btn btn-primary">Audit your business <span className="arrow">→</span></Anchor>
            <Anchor href="cortex.html" className="btn">Inside Cortex</Anchor>
          </div>
        </div>
      </section>
    </>
  )
}
