// Wms — UnieWMS operational core (ported from design wms.html).
import { Anchor } from '../lib/nav'

export default function Wms() {
  return (
    <>
      <section className="detail-hero">
        <div className="container detail-hero-inner">
          <div className="detail-hero-copy">
            <div className="micro" style={{ color: 'var(--accent)', marginBottom: 18 }}>● UnieWMS · Live · Stage 03 of the chain</div>
            <h1 className="detail-h1">
              Every product in the suite <em className="serif">touches a warehouse.</em>
            </h1>
            <p className="lede" style={{ marginTop: 24, maxWidth: 580 }}>
              UnieWMS is the foundation of the network — corporate-grade architecture with the simplicity an agile operator can run on. The central data engine that feeds Cortex everything it needs to orchestrate the rest of the chain.
            </p>
            <div style={{ marginTop: 36, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Anchor href="https://uniewms.com" className="btn btn-primary">Open UnieWMS <span className="arrow">→</span></Anchor>
              <Anchor href="/audit?type=task-workflow&persona=warehouse" className="btn">Request a warehouse audit</Anchor>
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

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 920 }}>
            <div className="eyebrow">The intelligence layer</div>
            <h2 className="h-display">UnieWMS doesn't just record. <em className="serif">It feeds Cortex.</em></h2>
            <p className="lede">Every event the warehouse generates becomes signal. Cortex reads that stream continuously and turns it into the next decision — wave priority, slotting move, carrier choice — before the friction cascades into an SLA miss.</p>
          </div>

          <div className="feature-grid">
            <div className="feature-card"><div className="ft-tag">Receiving</div><h4>Inbound velocity & dwell</h4><p>ASN-to-putaway timing, dock congestion, and staging dwell — read as leading indicators of tomorrow's pick delays.</p></div>
            <div className="feature-card"><div className="ft-tag">Picking</div><h4>Labor & path signal</h4><p>Per-task, per-operator, per-zone velocity. Cortex re-sequences waves and flags the lanes dragging throughput.</p></div>
            <div className="feature-card"><div className="ft-tag">Slotting</div><h4>Demand-weighted placement</h4><p>Bin and zone occupancy scored against forecast demand — not just empty space — so the next putaway shortens the next pick.</p></div>
            <div className="feature-card"><div className="ft-tag">Outbound</div><h4>Carrier & SLA pressure</h4><p>Order cut-offs, weight bands, and SLA risk surface in real time, feeding the per-shipment carrier decision downstream.</p></div>
            <div className="feature-card"><div className="ft-tag">Returns</div><h4>Reverse-flow drift</h4><p>Return reasons and restock latency close the loop — catalog and slotting corrections that compound across the network.</p></div>
            <div className="feature-card"><div className="ft-tag">Consent</div><h4>Local-first by default</h4><p>Signal is processed inside your perimeter. Nothing leaves your network without an explicit, gated decision.</p></div>
          </div>
        </div>
      </section>

      <section className="section light">
        <div className="container">
          <div style={{ maxWidth: 920 }}>
            <div className="eyebrow">Two different warehouses</div>
            <h2 className="h-display">The same building, <em className="serif">with and without a brain.</em></h2>
            <p className="lede">A WMS that only records versus a WMS whose signal is continuously read by Cortex and turned into the next move.</p>
          </div>

          <div className="compare-grid">
            <div className="compare-card before">
              <div className="label">Without an intelligence layer</div>
              <h3 className="title">Recorded. Reviewed later. Reacted to.</h3>
              <ul className="list">
                <li>Slotting fixed quarterly — demand shifts weekly.</li>
                <li>Idle pickers surface in a report, not in the moment.</li>
                <li>Carrier chosen by contract, not by this shipment.</li>
                <li>SLA risk discovered after the cut-off, not before.</li>
                <li>Every facility optimizes its own corner.</li>
              </ul>
              <div className="footnote">Status quo · Most WMS deployments</div>
            </div>
            <div className="compare-card after">
              <div className="label">With Cortex reading UnieWMS</div>
              <h3 className="title">Read continuously. Decided instantly. Approved by you.</h3>
              <ul className="list">
                <li>Slotting re-scored against forecast demand, per wave.</li>
                <li>Labor drift flagged live — re-sequenced before it cascades.</li>
                <li>Carrier priced per shipment against live rates.</li>
                <li>SLA pressure surfaced before the cut-off, with the fix proposed.</li>
                <li>Every facility executes against one shared objective.</li>
              </ul>
              <div className="footnote">UnieWMS · Cortex operating</div>
            </div>
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
            <Anchor href="/audit?type=task-workflow&persona=warehouse" className="btn btn-primary">Audit my warehouse <span className="arrow">→</span></Anchor>
            <Anchor href="https://uniewms.com" className="btn">Open UnieWMS</Anchor>
          </div>
        </div>
      </section>
    </>
  )
}
