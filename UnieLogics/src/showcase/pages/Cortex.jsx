// Cortex — UnieCortex deep-dive (ported from design cortex.html).
import { Anchor } from '../lib/nav'
import { CortexOrbital } from '../components/CortexOrbital'

export default function Cortex() {
  return (
    <>
      <section className="detail-hero">
        <div className="container detail-hero-inner">
          <div className="detail-hero-copy">
            <div className="micro" style={{ color: 'var(--accent)', marginBottom: 18 }}>
              ● UnieCortex · The operating intelligence inside the chain
            </div>
            <h1 className="detail-h1">
              The brain behind <em className="serif">every</em> decision.
            </h1>
            <p className="lede" style={{ marginTop: 24, maxWidth: 580 }}>
              Cortex is the intelligence layer your end-to-end supply chain was missing. One brain reading every stream — orders, picks, lanes, rates, returns — and making the next move obvious. Then executing it. Every recommendation needs your approval before it runs. The AI runs inside your own systems, not in a shared cloud. Your data never leaves your perimeter.
            </p>
            <div style={{ marginTop: 36, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Anchor href="/audit?type=complete-business" className="btn btn-primary">Request a Complete Business Audit <span className="arrow">→</span></Anchor>
              <Anchor href="#capabilities" className="btn">Capabilities</Anchor>
            </div>
          </div>
          <div className="detail-hero-visual">
            <CortexOrbital size={620} />
          </div>
        </div>
      </section>

      <section className="section" id="capabilities">
        <div className="container">
          <div style={{ maxWidth: 920 }}>
            <div className="eyebrow">Two zooms · one intelligence</div>
            <h2 className="h-display">
              The only intelligence that operates at <em className="serif">both ends</em> of the telescope.
            </h2>
            <p className="lede">
              Most platforms own a slice of the chain. Cortex sees all seven stages at once — because a perfect pick path doesn't matter if the parcel was shipped from the wrong warehouse.
            </p>
          </div>

          <div className="capability-split">
            <div className="capability-col">
              <div className="capability-col-tag mono">Micro · the bin, the task, the parcel</div>
              <h3>Resolves friction before it cascades.</h3>
              <ul>
                <li>Pick paths re-sequenced per wave, not per shift</li>
                <li>Labor velocity scored per task, per operator, per zone</li>
                <li>Carrier and service chosen per order, not per contract</li>
                <li>Fee anomalies flagged on every invoice before they're paid</li>
                <li>Putaway placement scored against demand, not just empty space</li>
              </ul>
            </div>
            <div className="capability-col">
              <div className="capability-col-tag mono">Macro · the network, the season, the year</div>
              <h3>Orchestrates total throughput.</h3>
              <ul>
                <li>DC footprint scored against demand-weighted parcel cost</li>
                <li>Seasonal staffing forecasts tied to inbound and order velocity</li>
                <li>Network design — where the next warehouse should be, and why</li>
                <li>Multi-DC routing across parcel, LTL, and FTL in one optimization</li>
                <li>2026 marketplace fee modeling baked into every margin call</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section light">
        <div className="container">
          <div style={{ maxWidth: 920 }}>
            <div className="eyebrow">Four-track intelligence</div>
            <h2 className="h-display">
              Intelligence that finds you savings.<br />
              <em className="serif" style={{ color: 'var(--accent-2)' }}>You get to compare it.</em>
            </h2>
            <p className="lede">
              Every operational decision Cortex makes returns four variants side-by-side: your current systems, Cortex base heuristics, the full network-aware AI, and an independent comparison floor. You see the dollar gap before you commit.
            </p>
          </div>
          <ol className="fourtrack-list">
            <li>
              <div className="ft-num">01</div>
              <div>
                <h4>Original — your current systems</h4>
                <p>Exactly what your stack would have done. The baseline you compare everything else against.</p>
              </div>
            </li>
            <li>
              <div className="ft-num">02</div>
              <div>
                <h4>Internal AI — Cortex heuristics</h4>
                <p>Our proprietary scoring across labor, lanes, rates, demand. Fast. Auditable. Operator-controllable.</p>
              </div>
            </li>
            <li>
              <div className="ft-num" style={{ color: 'var(--accent-2)' }}>03</div>
              <div>
                <h4>Network AI — the recommendation</h4>
                <p>Our heuristics enriched by network signal across every participating warehouse, carrier, and seller. Multi-modal. Cortex's default pick.</p>
              </div>
            </li>
            <li>
              <div className="ft-num">04</div>
              <div>
                <h4>Theoretical optimum — independent solver</h4>
                <p>A fully independent AI pipeline with no Cortex domain context. Useful comparison floor — but no memory of past network patterns.</p>
              </div>
            </li>
          </ol>
          <p className="micro" style={{ marginTop: 28, color: 'var(--light-fg-3)' }}>
            No black boxes · No "trust us" · Every recommendation passes through an approval gate
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 920 }}>
            <div className="eyebrow">The trust contract</div>
            <h2 className="h-display">
              The intelligence is yours.<br />
              <em className="serif" style={{ color: 'var(--accent)' }}>So is the hardware it runs on.</em>
            </h2>
          </div>

          <div className="trust-grid">
            <div className="trust-card">
              <div className="trust-card-num mono">01</div>
              <h3>Local-first inference</h3>
              <p>Every model — routing, scoring, agents — runs on <strong>your</strong> infrastructure, in <strong>your</strong> network. Your ASN, billing, order, and employee data never leaves your perimeter. This isn't a privacy mode. It's the only mode.</p>
            </div>
            <div className="trust-card">
              <div className="trust-card-num mono">02</div>
              <h3>Approve / deny, not autonomous</h3>
              <p>Cortex proposes. Your operators approve. Every wave, every putaway, every carrier change is a proposal with a before-state, an after-state, and a reason — gated on human consent.</p>
            </div>
            <div className="trust-card">
              <div className="trust-card-num mono">03</div>
              <h3>Open integrations</h3>
              <p>Shippo for live rates. Geoapify for geocoding. Keepa for demand. Google Maps for address validation. SP-API for Amazon. Nothing locked behind a Cortex-only API.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section light">
        <div className="container">
          <div style={{ maxWidth: 920 }}>
            <div className="eyebrow">Predictive operations</div>
            <h2 className="h-display">
              Cortex doesn't just <span style={{ textDecoration: 'line-through', opacity: .5 }}>react.</span><br />
              It <em className="serif" style={{ color: 'var(--accent-2)' }}>forecasts.</em>
            </h2>
          </div>
          <div className="predict-grid">
            <div className="predict-card">
              <h4>Demand</h4>
              <p>Keepa history blended with your own label velocity, fee inflation already modeled forward.</p>
            </div>
            <div className="predict-card">
              <h4>Capacity</h4>
              <p>Labor and throughput forecasts tied to seasonal demand and check-in sessions — not last-quarter headcount.</p>
            </div>
            <div className="predict-card">
              <h4>Cost</h4>
              <p>Shipping rate counterfactuals on every lane. Carrier mix re-negotiated quarterly, not annually.</p>
            </div>
            <div className="predict-card">
              <h4>Routing</h4>
              <p>Multi-modal vehicle routing across parcel, LTL, and FTL in a single optimization — running on your own infrastructure.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container-tight">
          <h2>
            See your network<br />
            <span className="serif-line">through Cortex.</span>
          </h2>
          <p className="lede" style={{ textAlign: 'center' }}>
            A complete operating-intelligence review across every system — ending with a
            scheduled deep-dive. Your data never leaves your network.
          </p>
          <div className="btns">
            <Anchor href="/audit?type=complete-business" className="btn btn-primary">Request a Complete Business Audit <span className="arrow">→</span></Anchor>
            <Anchor href="index.html" className="btn">Back home</Anchor>
          </div>
        </div>
      </section>
    </>
  )
}
