// UnieConnect — dedicated immersive product page.
// The OMS command center: orders, margin, marketplaces. Reached from /join's
// product rail and from the footer.
import { Anchor } from '../lib/nav'
import { UnieConnectThumb } from '../components/sections'

export default function UnieConnectPage() {
  return (
    <>
      <section className="detail-hero">
        <div className="container detail-hero-inner">
          <div className="detail-hero-copy">
            <div className="micro" style={{ color: 'var(--accent)', marginBottom: 18 }}>● UnieConnect · Beta · Every order, priced for margin</div>
            <h1 className="detail-h1">
              Know your margin <em className="serif">before you ship.</em>
            </h1>
            <p className="lede" style={{ marginTop: 24, maxWidth: 580 }}>
              UnieConnect is the order command center behind every sale. It models true landed cost — fees, shipping, returns, all in — and tells you what each order is actually worth before you promise it. Stop discovering you sold at a loss when the invoice comes back.
            </p>
            <div style={{ marginTop: 36, display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
              <Anchor href="/audit?type=order-financial" className="btn btn-primary">Audit Your Business <span className="arrow">→</span></Anchor>
              <Anchor href="/join#apply" className="btn">Join Our Supply Chain</Anchor>
            </div>
          </div>
          <div className="detail-hero-visual">
            <div style={{ borderRadius: 22, overflow: 'hidden', border: '1px solid var(--hairline)', boxShadow: '0 30px 80px rgba(0,0,0,.4), 0 0 60px var(--accent-faint)', background: 'linear-gradient(135deg, #0b0d12, #060810)', padding: 32 }}>
              <UnieConnectThumb />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 920 }}>
            <div className="eyebrow">What it does for your orders</div>
            <h2 className="h-display">One command center. <em className="serif">Every order, priced right.</em></h2>
            <p className="lede">Orders, customers, marketplace listings, and inventory — all in one operating view. With true margin known the moment a sale is placed, not at month-end.</p>
          </div>

          <div className="feature-grid">
            <div className="feature-card"><div className="ft-tag">Margin at the order</div><h4>True landed cost, instantly</h4><p>Marketplace fees, shipping, returns reserve, fulfillment — modeled into every order's margin the moment it's placed. You see profit per order before you ship.</p></div>
            <div className="feature-card"><div className="ft-tag">Channels</div><h4>Every marketplace in one view</h4><p>Amazon, Walmart, Shopify, eBay, your DTC site — all flowing into a single command center. Stop tab-hopping; start operating.</p></div>
            <div className="feature-card"><div className="ft-tag">Inventory</div><h4>Network-aware inventory</h4><p>See stock across every connected warehouse in real time. We route orders from the closest warehouse with availability — automatically.</p></div>
            <div className="feature-card"><div className="ft-tag">Pricing</div><h4>Margin by lane and region</h4><p>Order-level profit broken down by destination, channel, and SKU. Find the customers and lanes that are quietly losing you money.</p></div>
            <div className="feature-card"><div className="ft-tag">Recommendations</div><h4>Actions you approve</h4><p>The intelligence layer surfaces suggestions — reroute these orders, repackage this SKU, kill this listing — as actions you approve, not silent background changes.</p></div>
            <div className="feature-card"><div className="ft-tag">Audit trail</div><h4>Every decision recorded</h4><p>Why did this order ship from Reno? Why this carrier? Every routing decision is logged with the reason — auditable from day one.</p></div>
          </div>
        </div>
      </section>

      <section className="section light">
        <div className="container">
          <div style={{ maxWidth: 920 }}>
            <div className="eyebrow">Two different storefronts</div>
            <h2 className="h-display">Selling blind, <em className="serif">vs. selling with margin known.</em></h2>
            <p className="lede">The difference between an OMS that just records orders and one that prices them for profit before the box leaves the dock.</p>
          </div>

          <div className="compare-grid">
            <div className="compare-card before">
              <div className="label">Most order systems today</div>
              <h3 className="title">You promise. Then you find out.</h3>
              <ul className="list">
                <li>Margin per order discovered at month-end, from a spreadsheet.</li>
                <li>Marketplace fees modeled on last year's rates.</li>
                <li>Orders ship from "default" warehouse, not the closest one.</li>
                <li>Loss-making SKUs survive because nobody sees them in time.</li>
                <li>Returns charged back days later, with no signal upstream.</li>
              </ul>
              <div className="footnote">Status quo · How most sellers operate</div>
            </div>
            <div className="compare-card after">
              <div className="label">UnieConnect, running for you</div>
              <h3 className="title">Margin known. Every order. Every time.</h3>
              <ul className="list">
                <li>True landed cost modeled the moment the order is placed.</li>
                <li>Current marketplace fees, current shipping rates, current return rates.</li>
                <li>Routed from the closest warehouse with stock — automatically.</li>
                <li>Loss-makers flagged immediately, with the fix proposed.</li>
                <li>Returns close the loop — feeding back into pricing and slotting.</li>
              </ul>
              <div className="footnote">UnieConnect · Cortex operating across it</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 920 }}>
            <div className="eyebrow">Measured impact</div>
            <h2 className="h-display">Margin you can <em className="serif">see.</em></h2>
          </div>
          <div className="stats-row" style={{ marginTop: 64 }}>
            <div className="stat">
              <div className="stat-label">Margin at order</div>
              <div className="stat-num tnum">+8.1<span className="unit">%</span></div>
              <div className="stat-body">Average margin lift when orders are priced for true landed cost upfront.</div>
            </div>
            <div className="stat">
              <div className="stat-label">Channels in view</div>
              <div className="stat-num tnum">1</div>
              <div className="stat-body">One command center across every marketplace and DTC channel you sell on.</div>
            </div>
            <div className="stat">
              <div className="stat-label">Time to first signal</div>
              <div className="stat-num tnum">7<span className="unit"> days</span></div>
              <div className="stat-body">From connection to your first surfaced loss-maker and recoverable margin band.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container-tight">
          <h2>Stop selling blind.<br /><span className="serif-line">Start pricing for profit.</span></h2>
          <p className="lede" style={{ textAlign: 'center' }}>10-minute audit. Share your recent sales data. We rebuild margin per order — fees, shipping, returns all in — and show you exactly where the money is leaking.</p>
          <div className="btns">
            <Anchor href="/audit?type=order-financial" className="btn btn-primary">Audit Your Business <span className="arrow">→</span></Anchor>
            <Anchor href="/join#products" className="btn">Run your OMS on UnieConnect</Anchor>
          </div>
        </div>
      </section>
    </>
  )
}
