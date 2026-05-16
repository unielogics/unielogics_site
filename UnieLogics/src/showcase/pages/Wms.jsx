// Wms — UnieWMS operational core (ported from design wms.html).
import { Anchor } from '../lib/nav'

export default function Wms() {
  return (
    <>
      <section className="detail-hero">
        <div className="container detail-hero-inner">
          <div className="detail-hero-copy">
            <div className="micro" style={{ color: 'var(--accent)', marginBottom: 18 }}>● UnieWMS · Live · The operational core</div>
            <h1 className="detail-h1">
              Every product in the suite <em className="serif">touches a warehouse.</em>
            </h1>
            <p className="lede" style={{ marginTop: 24, maxWidth: 580 }}>
              UnieWMS is the foundation of the network — corporate-grade architecture with the simplicity an agile operator can run on. The central data engine that feeds Cortex everything it needs to orchestrate the rest.
            </p>
            <div style={{ marginTop: 36, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Anchor href="https://uniewms.com" className="btn btn-primary">Open UnieWMS <span className="arrow">→</span></Anchor>
              <Anchor href="index.html#audit" className="btn">Request a warehouse audit</Anchor>
            </div>
          </div>
          <div className="detail-hero-visual">
            <div style={{ borderRadius: 22, overflow: 'hidden', border: '1px solid var(--hairline)', boxShadow: '0 30px 80px rgba(0,0,0,.4), 0 0 60px var(--accent-faint)' }}>
              <img src="https://prepcenternearme.s3.us-east-1.amazonaws.com/unielogics/uniewms+(2).png" alt="UnieWMS" style={{ width: '100%', display: 'block' }} />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 920 }}>
            <div className="eyebrow">What it does</div>
            <h2 className="h-display">Built like an enterprise WMS. <em className="serif">Runs like a startup tool.</em></h2>
            <p className="lede">Connect multi-warehouse setups in 2–4 weeks. Get the kind of automation that big logistics corps use — without the implementation drag.</p>
          </div>

          <div className="feature-grid">
            <div className="feature-card"><div className="ft-tag">Inventory</div><h4>Real-time orchestration</h4><p>Receiving, storage, picking, packing, dispatch — all instrumented. Every event captured. Every drift surfaced.</p></div>
            <div className="feature-card"><div className="ft-tag">Predictive</div><h4>Correction & anomaly detection</h4><p>Bin overflows, temperature drifts, mis-slotted SKUs — flagged before they cascade into an SLA miss.</p></div>
            <div className="feature-card"><div className="ft-tag">Multi-facility</div><h4>Multi-client, multi-facility sync</h4><p>Run one warehouse or a national network. Same engine. Cortex sees the whole map, you keep operational control per facility.</p></div>
            <div className="feature-card"><div className="ft-tag">Network</div><h4>Independent + connected</h4><p>Participate in the UnieLogics network while keeping your operational independence. No data shared without explicit consent.</p></div>
            <div className="feature-card"><div className="ft-tag">Throughput</div><h4>Pick-path optimization</h4><p>Wave priorities, pick sequences, slotting recommendations — proposed by Cortex, approved by your team.</p></div>
            <div className="feature-card"><div className="ft-tag">Time-to-value</div><h4>Connects in 2–4 weeks</h4><p>Pre-built integrations to TMS, OMS, and carrier APIs. No bespoke implementation. No multi-quarter consulting engagement.</p></div>
          </div>
        </div>
      </section>

      <section className="section light">
        <div className="container">
          <div style={{ maxWidth: 920 }}>
            <div className="eyebrow">Measured impact</div>
            <h2 className="h-display">The numbers <em className="serif">compound</em> with the network.</h2>
          </div>
          <div className="stats-row" style={{ marginTop: 64 }}>
            <div className="stat">
              <div className="stat-label">Handling speed</div>
              <div className="stat-num tnum">47<span className="unit">%</span></div>
              <div className="stat-body">Faster handling across optimized warehouse operations.</div>
            </div>
            <div className="stat">
              <div className="stat-label">Implementation</div>
              <div className="stat-num tnum">2-4<span className="unit"> wk</span></div>
              <div className="stat-body">Time to connect a multi-warehouse setup.</div>
            </div>
            <div className="stat">
              <div className="stat-label">Audit precision</div>
              <div className="stat-num tnum">100<span className="unit">%</span></div>
              <div className="stat-body">Of operational events instrumented and replay-able.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container-tight">
          <h2>Connect your warehouse.<br /><span className="serif-line">See the network.</span></h2>
          <p className="lede" style={{ textAlign: 'center' }}>10-minute audit. Drop your WMS task export. We score labor, throughput, and zone coverage — and tell you which operators, lanes, and bins are dragging the rest.</p>
          <div className="btns">
            <Anchor href="index.html#audit" className="btn btn-primary">Audit my warehouse <span className="arrow">→</span></Anchor>
            <Anchor href="https://uniewms.com" className="btn">Open UnieWMS</Anchor>
          </div>
        </div>
      </section>
    </>
  )
}
