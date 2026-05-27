// UnieWMS — dedicated immersive product page.
// Reached from /join's product rail and from the footer.
import { Anchor } from '../lib/nav'

export default function Wms() {
  return (
    <>
      <section className="detail-hero">
        <div className="container detail-hero-inner">
          <div className="detail-hero-copy">
            <div className="micro" style={{ color: 'var(--accent)', marginBottom: 18 }}>● UnieWMS · Live · The warehouse, running for you</div>
            <h1 className="detail-h1">
              The warehouse <em className="serif">runs itself.</em>
            </h1>
            <p className="lede" style={{ marginTop: 24, maxWidth: 580 }}>
              UnieWMS is the warehouse management system behind every fulfillment job we run. Receiving, storage, picking, packing, dispatch — instrumented in real time. Your orders move through it faster, your inventory sits where it should, and you never have to operate a warehouse to get the result.
            </p>
            <div style={{ marginTop: 36, display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
              <Anchor href="/audit?type=task-workflow" className="btn btn-primary">Audit Your Business <span className="arrow">→</span></Anchor>
              <Anchor href="/join#wms" className="btn">Join Our Supply Chain</Anchor>
              <Anchor href="https://uniewms.com" className="btn-tertiary">Open UnieWMS ↗</Anchor>
            </div>
          </div>
          <div className="detail-hero-visual">
            <div style={{ borderRadius: 22, overflow: 'hidden', border: '1px solid var(--hairline)', boxShadow: '0 30px 80px rgba(0,0,0,.4), 0 0 60px var(--accent-faint)' }}>
              <img src="https://prepcenternearme.s3.us-east-1.amazonaws.com/unielogics/uniewms+(2).png" alt="UnieWMS dashboard" style={{ width: '100%', display: 'block' }} loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 920 }}>
            <div className="eyebrow">What it does for your orders</div>
            <h2 className="h-display">Enterprise-grade warehouse software. <em className="serif">Run for you.</em></h2>
            <p className="lede">We take your inventory and run a national-grade warehouse around it — multi-facility, multi-channel — without the multi-quarter implementation. You ship, we handle the rest.</p>
          </div>

          <div className="feature-grid">
            <div className="feature-card"><div className="ft-tag">Inventory</div><h4>Real-time orchestration</h4><p>Receiving, storage, picking, packing, dispatch — every step instrumented. You always know what's in stock, where it is, and when it's going out.</p></div>
            <div className="feature-card"><div className="ft-tag">Predictive</div><h4>Catches drift before it costs you</h4><p>Bin overflows, miss-slotted SKUs, delivery deadlines about to slip — flagged automatically, fixed before they show up in your customer's inbox.</p></div>
            <div className="feature-card"><div className="ft-tag">Multi-facility</div><h4>Inventory near your customers</h4><p>Run one warehouse or a national network. We model where your inventory should sit so every order ships from the closest warehouse to the buyer.</p></div>
            <div className="feature-card"><div className="ft-tag">Throughput</div><h4>Smarter pick paths</h4><p>Pick sequences, slotting, and wave priorities re-scored continuously against demand — orders out the door measurably faster.</p></div>
            <div className="feature-card"><div className="ft-tag">Returns</div><h4>Reverse-flow handled</h4><p>Returns inspected, restocked, and the catalog learns. Refund cycles tightened; bad SKUs surfaced before they hurt margin.</p></div>
            <div className="feature-card"><div className="ft-tag">Time-to-value</div><h4>Live in 2–4 weeks</h4><p>Pre-built integrations to shipping carriers, marketplaces, and OMS systems. No bespoke build, no consulting drag.</p></div>
          </div>
        </div>
      </section>

      <section className="section light">
        <div className="container">
          <div style={{ maxWidth: 920 }}>
            <div className="eyebrow">Two different warehouses</div>
            <h2 className="h-display">The same building, <em className="serif">with and without a brain.</em></h2>
            <p className="lede">A warehouse that only records versus a warehouse whose signal is continuously read and turned into the next move.</p>
          </div>

          <div className="compare-grid">
            <div className="compare-card before">
              <div className="label">Most warehouses today</div>
              <h3 className="title">Recorded. Reviewed later. Reacted to.</h3>
              <ul className="list">
                <li>Slotting fixed quarterly — demand shifts weekly.</li>
                <li>Idle pickers surface in a report, not in the moment.</li>
                <li>Same carrier on every label, regardless of what it costs.</li>
                <li>Late shipments discovered after the cut-off, not before.</li>
                <li>Every warehouse optimizes its own corner.</li>
              </ul>
              <div className="footnote">Status quo · What most operators live with</div>
            </div>
            <div className="compare-card after">
              <div className="label">UnieWMS, running for you</div>
              <h3 className="title">Read continuously. Decided instantly.</h3>
              <ul className="list">
                <li>Slotting re-scored against forecast demand, per wave.</li>
                <li>Pickers re-sequenced live — before the order misses its window.</li>
                <li>Carrier picked per shipment against live rates.</li>
                <li>Late-shipment risk surfaced before the cut-off, with the fix proposed.</li>
                <li>Every warehouse executes against one shared objective.</li>
              </ul>
              <div className="footnote">UnieWMS · Cortex operating across it</div>
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
              <div className="stat-body">Faster handling across our optimized warehouse operations.</div>
            </div>
            <div className="stat">
              <div className="stat-label">Time to live</div>
              <div className="stat-num tnum">2-4<span className="unit"> wk</span></div>
              <div className="stat-body">From signed agreement to your inventory shipping through us.</div>
            </div>
            <div className="stat">
              <div className="stat-label">Audit precision</div>
              <div className="stat-num tnum">100<span className="unit">%</span></div>
              <div className="stat-body">Of warehouse events instrumented and replay-able — nothing happens off-record.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container-tight">
          <h2>Let us run the warehouse.<br /><span className="serif-line">You handle the selling.</span></h2>
          <p className="lede" style={{ textAlign: 'center' }}>10-minute audit. Tell us how you ship today. We show you where time is leaking — receiving, picking, packing, dispatch — and what a faster, cheaper fulfillment setup looks like with us running it.</p>
          <div className="btns">
            <Anchor href="/audit?type=task-workflow" className="btn btn-primary">Audit Your Business <span className="arrow">→</span></Anchor>
            <Anchor href="/join#wms" className="btn">Run your own warehouse on UnieWMS</Anchor>
          </div>
        </div>
      </section>
    </>
  )
}
