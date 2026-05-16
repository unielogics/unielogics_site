// sections.jsx — All major page sections for UnieLogics home.
import { useEffect, useRef, useState } from 'react'
import { Anchor } from '../lib/nav'
import { useReveal } from '../lib/useReveal'
import { CortexOrbital } from './CortexOrbital'

// ─── Hero ───────────────────────────────────────────────────────────────────
export function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="grid-overlay"></div>
      </div>
      <div className="container hero-split">
        <div>
          <div className="hero-tagline-mark">
            UnieLogics · The operating intelligence
          </div>
          <h1 className="h-hero hero-title">
            Logistics that
            <span className="serif-line">thinks.</span>
          </h1>
          <p className="hero-sub">
            One intelligence layer across the four systems that actually run your operation — <strong style={{ color: 'var(--fg)' }}>WMS, TMS, OMS, and Couriers.</strong> Cortex audits every link, predicts the next move, and orchestrates from the bin to the doorstep. Continuously. Without a coordinator on the other end of the phone.
          </p>
          <div className="hero-cta">
            <Anchor href="#audit" className="btn btn-primary">Audit your business · 10-min report <span className="arrow">→</span></Anchor>
            <Anchor href="#brain" className="btn">See how Cortex thinks ↓</Anchor>
          </div>
        </div>
        <div className="hero-orbital-wrap">
          <CortexOrbital size={620} compact={false} />
        </div>
      </div>
      <div className="hero-meta">
        <div>
          <div>+16% YoY · per adopting node</div>
          <div style={{ marginTop: 4, opacity: .6 }}>Compounds with every system you connect</div>
        </div>
        <div className="scroll-cue">Scroll</div>
        <div style={{ textAlign: 'right' }}>
          <div>5,147 nodes · live</div>
          <div style={{ marginTop: 4, opacity: .6 }}>23 warehouses · 50+ drivers · 5,000+ sellers</div>
        </div>
      </div>
    </section>
  )
}

// ─── The Disconnect — 4 fragmented system tiles ─────────────────────────────
export function DisconnectSection() {
  const ref = useReveal()
  return (
    <section className="disconnect-section" ref={ref}>
      <div className="container">
        <div style={{ maxWidth: 880 }}>
          <div className="eyebrow reveal">The state of logistics</div>
          <h2 className="h-display reveal delay-1">
            Every layer of your supply chain<br />speaks a <em className="serif">different language.</em>
          </h2>
          <p className="lede reveal delay-2">
            Your WMS doesn't see your courier rates. Your TMS doesn't see your warehouse labor. Your OMS doesn't know which DC has the inventory closest to the customer. You're not paying for inefficiency — you're paying for <strong style={{ color: 'var(--fg)' }}>the gap between systems that were never meant to talk to each other.</strong>
          </p>
        </div>

        <div className="disconnect-grid">
          <div className="disco-tile reveal">
            <div className="disco-tile-head">
              <div>
                <div className="disco-tile-system">Warehouse · WMS</div>
                <h4>UnieWMS</h4>
                <div className="disco-tile-sub">Elizabeth NJ · 09:14</div>
              </div>
              <span className="disco-tile-status">Isolated</span>
            </div>
            <div className="disco-rows">
              <div className="disco-row"><span>Active SKUs</span><span className="v">2,412</span></div>
              <div className="disco-row"><span>Pickers on floor</span><span className="v">14</span></div>
              <div className="disco-row is-err"><span>Idle pickers</span><span className="v">2 · 90s+</span></div>
              <div className="disco-row is-err"><span>Outbound · SLA at risk</span><span className="v">4 orders</span></div>
              <div className="disco-row"><span>Last sync to TMS</span><span className="v">— never —</span></div>
            </div>
          </div>

          <div className="disco-tile reveal delay-1">
            <div className="disco-tile-head">
              <div>
                <div className="disco-tile-system">Transport · TMS</div>
                <h4>UnieFreight</h4>
                <div className="disco-tile-sub">National · 09:14</div>
              </div>
              <span className="disco-tile-status">Isolated</span>
            </div>
            <div className="disco-rows">
              <div className="disco-row"><span>Lanes active</span><span className="v">143</span></div>
              <div className="disco-row is-err"><span>Empty miles · today</span><span className="v">28%</span></div>
              <div className="disco-row is-err"><span>Available capacity</span><span className="v">unknown</span></div>
              <div className="disco-row"><span>Carrier TX-44 status</span><span className="v">empty · returning</span></div>
              <div className="disco-row"><span>Match to WMS demand</span><span className="v">— manual —</span></div>
            </div>
          </div>

          <div className="disco-tile reveal delay-2">
            <div className="disco-tile-head">
              <div>
                <div className="disco-tile-system">Orders · OMS</div>
                <h4>Order Management</h4>
                <div className="disco-tile-sub">All channels · 09:14</div>
              </div>
              <span className="disco-tile-status">Isolated</span>
            </div>
            <div className="disco-rows">
              <div className="disco-row"><span>Orders / hour</span><span className="v">8,402</span></div>
              <div className="disco-row is-err"><span>Margin priced at order</span><span className="v">— no —</span></div>
              <div className="disco-row is-err"><span>Marketplace fees modeled</span><span className="v">— 2024 —</span></div>
              <div className="disco-row"><span>Routes to closest DC</span><span className="v">— guesses —</span></div>
              <div className="disco-row"><span>SLA reality check</span><span className="v">— post-hoc —</span></div>
            </div>
          </div>

          <div className="disco-tile reveal delay-3">
            <div className="disco-tile-head">
              <div>
                <div className="disco-tile-system">Last-mile · Couriers</div>
                <h4>Carrier Mix</h4>
                <div className="disco-tile-sub">FedEx · UPS · USPS · 09:14</div>
              </div>
              <span className="disco-tile-status">Isolated</span>
            </div>
            <div className="disco-rows">
              <div className="disco-row"><span>Carriers in mix</span><span className="v">12</span></div>
              <div className="disco-row is-err"><span>Invoice anomalies / mo</span><span className="v">+$42K · unrecovered</span></div>
              <div className="disco-row is-err"><span>Rate counterfactuals</span><span className="v">— never run —</span></div>
              <div className="disco-row"><span>Contract review cycle</span><span className="v">annual</span></div>
              <div className="disco-row"><span>What-if simulations</span><span className="v">— offline —</span></div>
            </div>
          </div>
        </div>

        <div className="disco-bridges-note reveal delay-4">
          <span className="line"></span>
          <span>Four systems · zero shared brain · billions in compounding loss</span>
          <span className="line"></span>
        </div>
      </div>
    </section>
  )
}

// ─── Brain reveal — Cortex orbital centerpiece ──────────────────────────────
export function BrainSection() {
  const ref = useReveal()
  return (
    <section className="brain-section" id="brain" ref={ref}>
      <div className="container">
        <div className="eyebrow reveal" style={{ justifyContent: 'center', display: 'inline-flex' }}>UnieCortex</div>
        <h2 className="brain-hero reveal delay-1">
          One <em>brain.</em><br />
          <span className="accent">Four systems. Every decision.</span>
        </h2>
        <p className="lede reveal delay-2" style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          Cortex is the intelligence layer your WMS, TMS, OMS, and couriers were missing. It reads every stream — orders, picks, lanes, rates, returns — and makes the next move obvious. Then it executes it.
        </p>
        <div className="brain-orbital-wrap reveal delay-3">
          <CortexOrbital size={760} compact={false} showLabels={true} />
        </div>
        <div className="brain-cta reveal delay-4">
          <Anchor href="cortex.html" className="btn btn-primary">Inside Cortex <span className="arrow">→</span></Anchor>
          <Anchor href="#story" className="btn">Watch it run a shift</Anchor>
        </div>
      </div>
    </section>
  )
}

// ─── Two-track AI comparison — Baseline vs Cortex ───────────────────────────
export function FourTrackSection() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [counter, setCounter] = useState({ baseline: 0, cortex: 0 })

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !visible) {
          setVisible(true)
          const t0 = performance.now()
          const animate = (now) => {
            const t = Math.min(1, (now - t0) / 1400)
            const eased = 1 - Math.pow(1 - t, 3)
            setCounter({
              baseline: Math.round(1184 * eased),
              cortex: Math.round(897 * eased),
            })
            if (t < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      })
    }, { threshold: 0.25 })
    obs.observe(ref.current)
    const reveals = ref.current.querySelectorAll('.reveal')
    const obs2 = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('on') })
    }, { threshold: 0.15 })
    reveals.forEach((el) => obs2.observe(el))
    return () => { obs.disconnect(); obs2.disconnect() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const savingsAbs = counter.baseline - counter.cortex
  const savingsPct = counter.baseline > 0 ? Math.round((savingsAbs / counter.baseline) * 100) : 0

  return (
    <section className="section twotrack-section" ref={ref}>
      <div className="container">
        <div style={{ maxWidth: 920 }}>
          <div className="eyebrow reveal">The proof, before you commit</div>
          <h2 className="h-display reveal delay-1">
            You don't have to trust the AI.<br />
            <em className="serif" style={{ color: 'var(--accent)' }}>You get to compare it.</em>
          </h2>
          <p className="lede reveal delay-2">
            Every operational decision Cortex makes returns two variants side-by-side — what your current systems would have done, and what the network-aware AI would do instead. You see the dollar gap <em>before</em> you commit. No black boxes. No "trust us."
          </p>
        </div>

        <div className="twotrack-grid reveal delay-3">
          <div className="twotrack-card twotrack-baseline">
            <div className="twotrack-label">Track 01 · Baseline</div>
            <h3 className="twotrack-name">Your current systems</h3>
            <div className="twotrack-cost tnum">${counter.baseline.toLocaleString()}</div>
            <div className="twotrack-delta tnum">as-is · no change</div>
            <ul className="twotrack-bullets">
              <li>Manual carrier selection</li>
              <li>Last-quarter contract rates</li>
              <li>No backhaul matching</li>
              <li>Driver dispatched by phone</li>
              <li>Margin known only at invoice time</li>
            </ul>
          </div>

          <div className="twotrack-savings">
            <div className="ts-arrow-line"></div>
            <div className="ts-bubble">
              <div className="ts-bubble-lbl mono">You save</div>
              <div className="ts-bubble-num tnum">−${savingsAbs.toLocaleString()}</div>
              <div className="ts-bubble-pct mono">−{savingsPct}% per shipment</div>
            </div>
            <div className="ts-arrow-tip"></div>
          </div>

          <div className="twotrack-card twotrack-cortex is-winner">
            <span className="twotrack-winner-pill">● Cortex pick</span>
            <div className="twotrack-label">Track 02 · Cortex Network AI</div>
            <h3 className="twotrack-name">The network-aware decision</h3>
            <div className="twotrack-cost tnum">${counter.cortex.toLocaleString()}</div>
            <div className="twotrack-delta tnum">−${(counter.baseline - counter.cortex).toLocaleString()} · −{savingsPct}%</div>
            <ul className="twotrack-bullets">
              <li>Network-aware route optimization across all participating nodes</li>
              <li>Multi-modal: parcel + LTL + FTL solved as one problem</li>
              <li>Real-time backhaul match before the driver leaves</li>
              <li>Carrier mix priced per shipment, not per contract</li>
              <li>Local-first inference — your data never leaves your perimeter</li>
            </ul>
          </div>
        </div>

        <p className="micro reveal delay-4" style={{ marginTop: 36, textAlign: 'center' }}>
          Approve / deny gated · Cortex proposes, your operators decide · No autonomous changes without your nod
        </p>
      </div>
    </section>
  )
}

// ─── Network section — 16% YoY across 5 specific levers ─────────────────────
export function NetworkSection() {
  const ref = useReveal()
  const levers = [
    { n: '01', metric: '+$1,840', unit: 'per truck · monthly', title: 'Independent capacity, finally earning.', body: 'Per-truck, per-warehouse, per-business owner: capacity that used to sit idle gets matched to demand. Independent operators see earnings rise without changing their hours.' },
    { n: '02', metric: '+38%', unit: 'volume of activity', title: 'More jobs run through the same asset.', body: 'Drop-off frequency, route density, and pickup velocity all climb. The same truck or facility handles measurably more business per shift, per week, per quarter.' },
    { n: '03', metric: '−14%', unit: 'fuel use · per warehouse', title: 'Significantly less fuel burned.', body: 'Cortex collapses redundant trips, optimizes inbound staging, and right-sizes shuttle loads. Per-warehouse fuel cost drops materially within the first quarter.' },
    { n: '04', metric: '−22%', unit: 'delivery time · network avg', title: 'Better delivery times for everyone.', body: 'Inventory placement guided by Cortex puts product closer to demand before it spikes. Every party — seller, carrier, recipient — sees the parcel arrive faster.' },
    { n: '05', metric: '±6%', unit: 'seasonal variance · vs ±28%', title: 'Fluctuation, normalized.', body: 'Cortex smooths the activity curve across the year. Operations stay steady through Q4 peaks and Q1 troughs — predictable headcount, predictable margins, predictable cash flow.' },
  ]
  return (
    <section className="network-section" ref={ref}>
      <div className="container">
        <div style={{ maxWidth: 920 }}>
          <div className="eyebrow reveal">The network effect</div>
          <h2 className="h-display reveal delay-1">
            +16% per year. <em className="serif">Every party that adopts.</em>
          </h2>
          <p className="lede reveal delay-2">
            Cortex doesn't just optimize the work you have. It compounds across five operational levers — earnings, activity, fuel, delivery, and steadiness — for every truck, every warehouse, every business in the network.
          </p>
        </div>

        <div className="network-yoy-hero reveal delay-3">
          <div className="network-stat-num tnum">+16<span className="unit">%</span></div>
          <div className="network-stat-label">Estimated YoY improvement · per adopting party</div>
        </div>

        <div className="network-levers">
          {levers.map((l, i) => (
            <div key={i} className={`lever-card reveal delay-${(i % 4) + 1}`}>
              <div className="lever-n mono">{l.n}</div>
              <div className="lever-metric">
                <div className="lever-metric-num tnum">{l.metric}</div>
                <div className="lever-metric-unit mono">{l.unit}</div>
              </div>
              <div className="lever-body">
                <h3>{l.title}</h3>
                <p>{l.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Last-mile placement section ────────────────────────────────────────────
export function LastMileSection() {
  const ref = useReveal()
  return (
    <section className="lastmile-section" ref={ref}>
      <div className="container">
        <div style={{ maxWidth: 920 }}>
          <div className="eyebrow reveal">Placement is the lever</div>
          <h2 className="h-display reveal delay-1">
            Better placement.<br />
            <em className="serif" style={{ color: 'var(--accent-2)' }}>Last-mile savings that compound.</em>
          </h2>
          <p className="lede reveal delay-2">
            Cortex understands where every SKU should physically live — not just at the warehouse level, but at the zone, aisle, and bin. The shorter the path from shelf to doorstep, the cheaper the last mile gets. And the last mile is where the margin lives.
          </p>
        </div>

        <div className="lastmile-grid">
          <div className="lastmile-card reveal">
            <div className="lm-eyebrow">National placement</div>
            <h3>Inventory ends up closest to demand.</h3>
            <p>Cortex models demand-weighted parcel cost across your warehouse footprint and tells you which SKUs to position where — before the demand arrives. Every parcel ships from the closest possible node.</p>
            <div className="lm-stat">
              <div className="lm-stat-num tnum">−22%</div>
              <div className="lm-stat-lbl">Avg parcel distance</div>
            </div>
          </div>
          <div className="lastmile-card reveal delay-1">
            <div className="lm-eyebrow">Carrier mix</div>
            <h3>The cheapest carrier for THIS parcel.</h3>
            <p>Live rate counterfactuals run on every order: what would FedEx charge? UPS? USPS? A regional? The system picks the cheapest service that meets the SLA — per shipment, not per contract.</p>
            <div className="lm-stat">
              <div className="lm-stat-num tnum">−18%</div>
              <div className="lm-stat-lbl">Last-mile cost per order</div>
            </div>
          </div>
          <div className="lastmile-card reveal delay-2">
            <div className="lm-eyebrow">Invoice recovery</div>
            <h3>Every label, audited.</h3>
            <p>Late deliveries, address corrections, dimensional re-weighs — every line on every carrier invoice gets benchmarked against what it should have cost. Refunds surface automatically. Filed before the deadline.</p>
            <div className="lm-stat">
              <div className="lm-stat-num tnum">$42K</div>
              <div className="lm-stat-lbl">Avg recovered · per month</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function AuditFunnel() {
  const ref = useReveal()
  const options = [
    { tag: 'Label Spine Audit', title: 'Shipping is too expensive', promise: 'Drop your label CSV. We benchmark every shipment against the rate it should have paid, and hand you the recoverable dollar band.' },
    { tag: 'Task & Workflow Audit', title: 'The warehouse feels slow', promise: 'Drop your WMS task export. We score labor velocity, throughput, and zone coverage — and tell you which operators, lanes, and bins are dragging the rest.' },
    { tag: 'Order Financial Audit', title: 'Margins are disappearing', promise: 'Drop your marketplace P&L. We rebuild margin by lane and region with the 2026 fee model already applied.' },
    { tag: 'Network Audit', title: 'My network footprint feels wrong', promise: 'Drop your warehouse locations. We score state-level coverage, demand-weighted parcel cost, and the complementary DC that would close your biggest gap.' },
  ]

  return (
    <section className="audit-funnel" id="audit" ref={ref}>
      <div className="container">
        <div className="eyebrow reveal" style={{ justifyContent: 'center', display: 'inline-flex', width: '100%' }}>10-minute audit</div>
        <h2 className="question reveal delay-1">
          Tell us where it hurts.<br />
          We'll show you <em>the audit</em> that fixes it.
        </h2>
        <div className="audit-options">
          {options.map((o, i) => (
            <button key={i} className="audit-tile reveal" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="audit-tile-tag">→ {o.tag}</div>
              <h3 className="audit-tile-title">{o.title}</h3>
              <p className="audit-tile-promise">{o.promise}</p>
              <span className="audit-tile-arrow">Start this audit</span>
            </button>
          ))}
        </div>
        <div className="audit-extra reveal delay-3">
          <div style={{ flex: '0 0 auto' }}>
            <div className="ax-label">For sellers · Product Catalog Audit</div>
            <h4 className="ax-title">I want to sell more profitable SKUs</h4>
          </div>
          <p className="ax-desc" style={{ flex: 1, minWidth: 260 }}>
            Hand us ASINs or UPCs. We blend Keepa demand history, fulfillment economics, and placement allocation into a landed-cost-per-SKU view.
          </p>
          <Anchor href="#audit" className="btn" style={{ flex: '0 0 auto' }}>Start →</Anchor>
        </div>
        <div className="audit-trust">
          Every audit returns a before / after proposal · approve / deny gated · your data never leaves your network
        </div>
      </div>
    </section>
  )
}

// ─── The Shift (light) ──────────────────────────────────────────────────────
export function ShiftSection() {
  const ref = useReveal()
  return (
    <section className="section light" ref={ref}>
      <div className="container">
        <div style={{ maxWidth: 900 }}>
          <div className="eyebrow reveal">The shift</div>
          <h2 className="h-display reveal delay-1">
            Not dashboards.<br />
            Not recommendations.<br />
            <em className="serif" style={{ color: 'var(--accent-2)' }}>Autonomous execution.</em>
          </h2>
          <p className="lede reveal delay-2">
            The answer was never a better dashboard or a smarter recommendation engine. Those tools still require humans to interpret, deliberate, and act — introducing the exact friction the system cannot afford. The real shift is structural.
          </p>
        </div>

        <div className="shift-grid">
          <div className="shift-card is-strike reveal">
            <div className="index">01 · Dashboards</div>
            <h3 className="h-card">Visibility without action.</h3>
            <p className="body">Seeing the problem doesn't solve it. Noise without execution.</p>
          </div>
          <div className="shift-card is-strike reveal delay-1">
            <div className="index">02 · Recommendations</div>
            <h3 className="h-card">Suggestions that require approval.</h3>
            <p className="body">Collapse under real-time demand. The human is always the bottleneck.</p>
          </div>
          <div className="shift-card is-final reveal delay-2">
            <div className="index">03 · UnieCortex</div>
            <h3 className="h-card">Autonomous execution.</h3>
            <p className="body">A system that understands everything, decides instantly, and executes — without a queue, an approval chain, or a delay.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Cortex stage header ────────────────────────────────────────────────────
export function CortexHeader() {
  const ref = useReveal()
  return (
    <section className="section cortex-section-header" ref={ref}>
      <div className="container-tight">
        <div className="eyebrow reveal">UnieCortex · Operating Intelligence</div>
        <h2 className="h-display reveal delay-1">
          One layer. <em className="serif">Every</em> node. Every decision.
        </h2>
        <p className="lede reveal delay-2">
          The intelligence brain that holds the entire logistics network in view while simultaneously resolving the tiniest operational frictions. Scroll.
        </p>
      </div>
    </section>
  )
}

// ─── Before / After + Stats (light) ─────────────────────────────────────────
export function BeforeAfterSection() {
  const ref = useReveal()
  return (
    <section className="section light" ref={ref}>
      <div className="container">
        <div style={{ maxWidth: 900 }}>
          <div className="eyebrow reveal">Two different worlds</div>
          <h2 className="h-display reveal delay-1">
            The transition is not incremental. It is <em className="serif">categorical.</em>
          </h2>
          <p className="lede reveal delay-2">
            What logistics looks like without an intelligence layer — versus what it becomes once UnieCortex is running across the network.
          </p>
        </div>

        <div className="compare-grid">
          <div className="compare-card before reveal">
            <div className="label">Before · Today</div>
            <h3 className="title">Reactive. Fragmented. Manual.</h3>
            <ul className="list">
              <li>15–30% of truck miles run empty. Billions in lost revenue annually.</li>
              <li>Carrier margins compress to 3–6%. One downturn ends the business.</li>
              <li>Coordination happens by phone, email, and spreadsheet.</li>
              <li>Inventory placement reacts to demand — never anticipates it.</li>
              <li>Pricing accuracy varies by lane, by hour, by mood.</li>
              <li>Every operator optimizes their corner. The whole stays broken.</li>
            </ul>
            <div className="footnote">Status quo · Industry baseline</div>
          </div>
          <div className="compare-card after reveal delay-2">
            <div className="label">After · UnieLogics</div>
            <h3 className="title">Predictive. Unified. Autonomous.</h3>
            <ul className="list">
              <li>Empty miles filled by predictive backhaul — before trucks leave the dock.</li>
              <li>Carrier margins expanded by routing efficiency, not rate hikes.</li>
              <li>Every node executes against shared, system-wide objectives.</li>
              <li>Inventory placed where demand will appear, not where it last appeared.</li>
              <li>Pricing accuracy improved 18% across active freight lanes.</li>
              <li>One intelligence layer. Continuously optimizing total throughput.</li>
            </ul>
            <div className="footnote">UnieCortex · Operating</div>
          </div>
        </div>

        <div className="stats-row reveal delay-3">
          <div className="stat">
            <div className="stat-label">Pricing improvement</div>
            <div className="stat-num tnum">18<span className="unit">%</span></div>
            <div className="stat-body">Gains in pricing accuracy across active freight lanes.</div>
          </div>
          <div className="stat">
            <div className="stat-label">Operational speed</div>
            <div className="stat-num tnum">6<span className="unit">×</span></div>
            <div className="stat-body">Acceleration in high-friction workflows. Decisions resolved, not made.</div>
          </div>
          <div className="stat">
            <div className="stat-label">Handling speed</div>
            <div className="stat-num tnum">47<span className="unit">%</span></div>
            <div className="stat-body">Faster handling across optimized warehouse operations.</div>
          </div>
        </div>
        <p className="micro reveal delay-4" style={{ marginTop: 24 }}>
          Results compound across the network. The more nodes participate, the stronger the signal.
        </p>
      </div>
    </section>
  )
}

// ─── Product suite (dark) — 3 focused products ──────────────────────────────
export function ProductSuiteSection() {
  const ref = useReveal()
  return (
    <section className="section" ref={ref}>
      <div className="container">
        <div style={{ maxWidth: 900 }}>
          <div className="eyebrow reveal">The product suite</div>
          <h2 className="h-display reveal delay-1">
            One <em className="serif">network.</em> Three products. One brain.
          </h2>
          <p className="lede reveal delay-2">
            Cortex is the intelligence. These are the three systems it runs through — the warehouse, the order command center, and the driver in the cab. Adopt one. Adopt all three. The brain gets sharper as it sees more of your picture.
          </p>
        </div>

        <div className="product-hero">
          <div className="reveal">
            <div className="micro" style={{ marginBottom: 18, color: 'var(--accent)' }}>● Live · Turn-key · Out of the box</div>
            <h3 style={{ fontSize: 'clamp(36px, 4.6vw, 64px)', fontWeight: 600, letterSpacing: '-.03em', lineHeight: 1.05, margin: '0 0 22px 0' }}>UnieWMS</h3>
            <p className="lede" style={{ marginBottom: 24 }}>
              The first turn-key, out-of-the-box warehouse system that comes with <strong style={{ color: 'var(--fg)' }}>20%+ discounted LTL & parcel rates</strong> on day one — and audits every single client for fulfillment savings, surfacing an <strong style={{ color: 'var(--accent)' }}>18% average reduction</strong> across the board with multi-warehouse optimization.
            </p>
            <ul style={{ padding: 0, margin: '0 0 28px 0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li className="body" style={{ fontSize: 15 }}>· 20%+ pre-negotiated LTL & parcel rates · live the moment you ship</li>
              <li className="body" style={{ fontSize: 15 }}>· Per-client fulfillment audit · 18% avg savings surfaced</li>
              <li className="body" style={{ fontSize: 15 }}>· Multi-warehouse optimization built in · no consulting cycle</li>
              <li className="body" style={{ fontSize: 15 }}>· Turn-key onboarding · 2–4 weeks from contract to live</li>
            </ul>
            <Anchor href="wms.html" className="btn">Inside UnieWMS <span className="arrow">→</span></Anchor>
          </div>
          <div className="product-hero-image">
            <span className="corner-tag">Live</span>
            <img src="https://prepcenternearme.s3.us-east-1.amazonaws.com/unielogics/uniewms+(2).png" alt="UnieWMS interface" loading="lazy" />
          </div>
        </div>

        <div className="product-strip" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <Anchor href="#audit" className="product-tile reveal" style={{ minHeight: 400 }}>
            <span className="status-pill">Beta</span>
            <h3 className="name">UnieConnect</h3>
            <p className="summary">The OMS command center. Every order, customer, marketplace listing, and SKU in one operating view — with Cortex pricing every order for margin before it's promised.</p>
            <div className="img-area" style={{ background: 'linear-gradient(135deg, #0b0d12, #060810)', padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UnieConnectThumb />
            </div>
            <div className="more">Open UnieConnect →</div>
          </Anchor>

          <Anchor href="tms.html" className="product-tile reveal delay-1" style={{ minHeight: 400 }}>
            <span className="status-pill" style={{ background: 'rgba(255,90,31,.12)', color: '#FF8A5C', borderColor: '#FF5A1F' }}>Waitlist</span>
            <h3 className="name">Driver App · AI dispatch</h3>
            <p className="summary">The breakthrough piece. Cortex auto-matches loads to independent drivers — no broker, no phone. One tap to accept. Payment cleared the moment POD lands.</p>
            <div className="img-area" style={{ background: 'linear-gradient(135deg, #1a1614, #0a0a0a)', padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DriverAppThumb />
            </div>
            <div className="more" style={{ color: '#FF8A5C' }}>Join the driver waitlist →</div>
          </Anchor>
        </div>
      </div>
    </section>
  )
}

export function UnieConnectThumb() {
  return (
    <svg viewBox="0 0 240 150" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%' }}>
      <rect x="0" y="0" width="36" height="150" fill="rgba(255,255,255,.04)" />
      <rect x="6" y="6" width="24" height="3" rx=".8" fill="var(--accent)" />
      {[14, 22, 30, 38, 46, 54, 62].map((y) => (
        <rect key={y} x="6" y={y} width="24" height="2" rx=".5" fill="rgba(255,255,255,.18)" />
      ))}
      <rect x="36" y="0" width="204" height="14" fill="rgba(255,255,255,.06)" />
      <circle cx="48" cy="7" r="2.5" fill="var(--accent)" />
      <text x="54" y="9" fontFamily="Inter" fontSize="4" fill="rgba(255,255,255,.7)">Command Center</text>
      <rect x="208" y="3.5" width="24" height="7" rx="1.5" fill="var(--accent)" />
      <g>
        <rect x="44" y="20" width="58" height="32" rx="2" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.08)" strokeWidth=".3" />
        <text x="48" y="27" fontFamily="JetBrains Mono" fontSize="3" fill="rgba(255,255,255,.55)">ORDERS / HR</text>
        <text x="48" y="38" fontFamily="Inter" fontSize="9" fontWeight="700" fill="#fff" letterSpacing="-.04em">8,402</text>
        <text x="48" y="46" fontFamily="JetBrains Mono" fontSize="2.6" fill="var(--accent)">▲ +12.4%</text>
        <rect x="108" y="20" width="58" height="32" rx="2" fill="rgba(122,240,198,.06)" stroke="var(--accent)" strokeWidth=".3" />
        <text x="112" y="27" fontFamily="JetBrains Mono" fontSize="3" fill="var(--accent)">MARGIN AT ORDER</text>
        <text x="112" y="38" fontFamily="Inter" fontSize="9" fontWeight="700" fill="var(--accent)" letterSpacing="-.04em">+8.1%</text>
        <text x="112" y="46" fontFamily="JetBrains Mono" fontSize="2.6" fill="rgba(255,255,255,.55)">vs static price</text>
        <rect x="172" y="20" width="58" height="32" rx="2" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.08)" strokeWidth=".3" />
        <text x="176" y="27" fontFamily="JetBrains Mono" fontSize="3" fill="rgba(255,255,255,.55)">SKUS LIVE</text>
        <text x="176" y="38" fontFamily="Inter" fontSize="9" fontWeight="700" fill="#fff" letterSpacing="-.04em">2,412</text>
        <text x="176" y="46" fontFamily="JetBrains Mono" fontSize="2.6" fill="rgba(255,255,255,.55)">3 marketplaces</text>
      </g>
      <g>
        <rect x="44" y="58" width="186" height="44" rx="2" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.06)" strokeWidth=".3" />
        <text x="48" y="65" fontFamily="JetBrains Mono" fontSize="2.6" fill="rgba(255,255,255,.55)">REVENUE · 7D</text>
        <polyline points="48,92 60,86 72,88 84,78 96,82 108,72 120,76 132,68 144,72 156,62 168,66 180,58 192,62 204,52 216,56 228,48"
          fill="none" stroke="var(--accent)" strokeWidth=".7" />
        <polyline points="48,92 60,86 72,88 84,78 96,82 108,72 120,76 132,68 144,72 156,62 168,66 180,58 192,62 204,52 216,56 228,48 228,98 48,98"
          fill="var(--accent)" opacity=".12" stroke="none" />
      </g>
      <g>
        <rect x="44" y="108" width="186" height="34" rx="2" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.06)" strokeWidth=".3" />
        <text x="48" y="115" fontFamily="JetBrains Mono" fontSize="2.6" fill="rgba(255,255,255,.55)">CORTEX SUGGESTIONS · 3 pending</text>
        {[121, 128, 135].map((y, i) => (
          <g key={i}>
            <circle cx="50" cy={y} r="1" fill={i === 0 ? 'var(--accent)' : 'rgba(255,255,255,.4)'} />
            <text x="54" y={y + 1.2} fontFamily="Inter" fontSize="3" fill="rgba(255,255,255,.7)">
              {i === 0 ? 'Re-route 142 SKUs · NJ → FL · save $4,820' : i === 1 ? 'Re-price 38 listings · Amazon · +6.2% margin' : 'Add carrier USPS to mix · LB <2lb · −$0.84/parcel'}
            </text>
            <rect x="206" y={y - 2} width="20" height="4.5" rx="1" fill={i === 0 ? 'var(--accent)' : 'rgba(255,255,255,.08)'} />
            <text x="216" y={y + 1.2} fontFamily="JetBrains Mono" fontSize="2.4" fill={i === 0 ? 'var(--accent-ink)' : 'rgba(255,255,255,.5)'} textAnchor="middle" fontWeight="600">{i === 0 ? 'APPROVE' : 'review'}</text>
          </g>
        ))}
      </g>
    </svg>
  )
}

export function DriverAppThumb() {
  return (
    <div style={{
      width: 110, height: 220, borderRadius: 22,
      background: '#0a0a0a', border: '5px solid #1a1a1a',
      position: 'relative', overflow: 'hidden',
      boxShadow: '0 0 24px rgba(255,90,31,.18)',
    }}>
      <div style={{ position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)', width: 36, height: 8, borderRadius: 999, background: '#0a0a0a', zIndex: 2 }}></div>
      <div style={{ position: 'absolute', inset: 0, background: '#f4f4f2', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '18px 8px 6px', background: '#fff', borderBottom: '1px solid #ebebe7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 5, color: '#00873E', fontWeight: 700 }}>● ELITE 0.92</div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 5, color: '#0A0A0A', fontWeight: 600 }}>ONLINE</div>
        </div>
        <div style={{ padding: '4px 6px', background: '#0A0A0A', color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 5, letterSpacing: '.06em', textAlign: 'center' }}>● CORTEX MATCHED · #44291</div>
        <div style={{ padding: 8, flex: 1 }}>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 4.5, color: '#5A5A55', letterSpacing: '.1em' }}>ACTIVE LOAD</div>
          <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 8, color: '#0A0A0A', marginTop: 3, lineHeight: 1.1 }}>Elizabeth NJ → Bethlehem PA</div>
          <div style={{ marginTop: 8, padding: 6, border: '1px solid #ebebe7', borderRadius: 6, background: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono', fontSize: 5 }}>
              <span style={{ color: '#8A8A82' }}>Pay</span><span style={{ fontWeight: 700, color: '#0A0A0A' }}>$640</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono', fontSize: 5, marginTop: 2 }}>
              <span style={{ color: '#8A8A82' }}>+ backhaul</span><span style={{ fontWeight: 700, color: '#FF5A1F' }}>+$210</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono', fontSize: 5, marginTop: 2 }}>
              <span style={{ color: '#8A8A82' }}>82 mi</span><span style={{ color: '#0A0A0A' }}>3h 35m</span>
            </div>
          </div>
          <div style={{ marginTop: 8, padding: '6px 8px', borderRadius: 8, background: '#FF5A1F', color: '#fff', textAlign: 'center', fontWeight: 700, fontSize: 6, letterSpacing: '.04em' }}>Tap to accept</div>
        </div>
      </div>
    </div>
  )
}

// ─── TMS Driver App — the breakthrough section ──────────────────────────────
export function TMSSection() {
  const [screen, setScreen] = useState('autonomous')
  useEffect(() => {
    const seq = ['autonomous', 'inbox', 'pickup', 'pod']
    let i = 0
    const t = setInterval(() => {
      i = (i + 1) % seq.length
      setScreen(seq[i])
    }, 4200)
    return () => clearInterval(t)
  }, [])
  const ref = useReveal()
  return (
    <section className="section tms-section" ref={ref}>
      <div className="container">
        <div className="tms-grid">
          <div className="tms-copy">
            <div className="eyebrow reveal" style={{ color: '#FF8A5C' }}>The breakthrough</div>
            <h2 className="h-display reveal delay-1">
              Every independent operator,<br />running at <em className="serif" style={{ color: '#FF8A5C' }}>maximum capacity.</em>
            </h2>
            <p className="lede reveal delay-2">
              The hardest problem in logistics isn't routing — it's that <strong style={{ color: '#fff' }}>most capacity in the network is owned by independent parties</strong> the central system can't see. The TMS Driver App fixes that. It turns every independent driver, every owner-operator, every small fleet into addressable, score-able, dispatch-ready network capacity — without losing their independence.
            </p>
            <ul className="reveal delay-3" style={{ padding: 0, margin: '32px 0 0 0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 480 }}>
              <li className="body"><strong style={{ color: '#fff' }}>Cortex matches the driver to the load</strong> — not the load to a broker. Skill, location, tier, hours-of-service all scored in 140ms.</li>
              <li className="body"><strong style={{ color: '#fff' }}>Driver accepts in one tap.</strong> Rate, backhaul opportunity, and ETA visible before they commit. No call. No negotiation.</li>
              <li className="body"><strong style={{ color: '#fff' }}>System dispatches and pays automatically.</strong> POD captured, payment cleared in seconds, tier score lifts for the next match.</li>
              <li className="body"><strong style={{ color: '#fff' }}>Independent stays independent.</strong> No fleet contract. No long-term lock-in. Drive when you want, for the network when it pays.</li>
            </ul>
            <div className="reveal delay-4" style={{ marginTop: 36, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Anchor href="tms.html#waitlist" className="btn" style={{ background: '#FF5A1F', color: '#fff', borderColor: '#FF5A1F' }}>
                Join the driver waitlist <span className="arrow">→</span>
              </Anchor>
              <Anchor href="tms.html" className="btn">See the full driver app</Anchor>
            </div>
          </div>

          <div className="reveal delay-2">
            <div className="phone-frame">
              <div className="phone-screens">
                <PhoneScreenAutonomous active={screen === 'autonomous'} />
                <PhoneScreenInbox active={screen === 'inbox'} />
                <PhoneScreenPickup active={screen === 'pickup'} />
                <PhoneScreenPOD active={screen === 'pod'} />
              </div>
            </div>
            <div className="tms-controls">
              {[
                { id: 'autonomous', label: 'Auto-match' },
                { id: 'inbox', label: 'Inbox' },
                { id: 'pickup', label: 'Pickup' },
                { id: 'pod', label: 'POD' },
              ].map((s) => (
                <button key={s.id} className={screen === s.id ? 'on' : ''} onClick={() => setScreen(s.id)}>{s.label}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="tms-stats-strip reveal delay-3">
          <div className="tms-stat-tile">
            <div className="tn tnum">+3.2×</div>
            <div className="tl">Loads per active driver / wk</div>
            <div className="tb">Independent drivers see more matched work — without a dispatcher chasing them down.</div>
          </div>
          <div className="tms-stat-tile">
            <div className="tn tnum">−28%</div>
            <div className="tl">Empty-mile rate</div>
            <div className="tb">Backhaul matching surfaces return loads before the driver leaves the dock.</div>
          </div>
          <div className="tms-stat-tile">
            <div className="tn tnum">0:00:04</div>
            <div className="tl">POD → payment cleared</div>
            <div className="tb">No invoice cycles. No 45-day net. Payment releases the moment POD lands.</div>
          </div>
          <div className="tms-stat-tile">
            <div className="tn tnum">0 calls</div>
            <div className="tl">Per completed load</div>
            <div className="tb">Match, dispatch, pickup, drop, POD, pay — every step in the app. No phone friction.</div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Phone mini-screens
export function PhoneScaffold({ active, children }) {
  return (
    <div className={`phone-screen ${active ? 'is-active' : ''}`}>
      <div className="pmini-header">
        <div className="pmini-tier">Elite · 0.92</div>
        <div className="pmini-status">Online</div>
      </div>
      {children}
      <div className="pmini-tab">
        <div className="ti on"><div className="ic"></div>Load</div>
        <div className="ti"><div className="ic"></div>Inbox</div>
        <div className="ti"><div className="ic"></div>Schedule</div>
        <div className="ti"><div className="ic"></div>Pay</div>
        <div className="ti"><div className="ic"></div>Hub</div>
      </div>
    </div>
  )
}
export function PhoneScreenAutonomous({ active }) {
  return (
    <PhoneScaffold active={active}>
      <div className="pmini-auto-banner">● Cortex matched · Load #44291</div>
      <div className="pmini-body">
        <div className="pmini-eyebrow">Active load · auto-dispatched</div>
        <h4 className="pmini-title">Elizabeth, NJ → Bethlehem, PA</h4>
        <div className="pmini-load-card">
          <div className="pmini-load-row"><span className="lbl">Distance</span><span>82 mi</span></div>
          <div className="pmini-load-row"><span className="lbl">Pay</span><span>$640</span></div>
          <div className="pmini-load-row"><span className="lbl">Type</span><span>Dry · 14 pallets</span></div>
          <div className="pmini-stops">
            <div className="pmini-stop is-done">
              <div className="dot"></div>
              <div>
                <div className="city">Pickup · 09:40</div>
                <div className="addr">200 Industrial Pkwy, Elizabeth NJ</div>
              </div>
            </div>
            <div className="pmini-stop">
              <div className="dot"></div>
              <div>
                <div className="city">Drop · 13:15</div>
                <div className="addr">1450 E Lehigh St, Bethlehem PA</div>
              </div>
            </div>
          </div>
        </div>
        <div className="pmini-action">Tap to start drive</div>
      </div>
    </PhoneScaffold>
  )
}
export function PhoneScreenInbox({ active }) {
  return (
    <PhoneScaffold active={active}>
      <div className="pmini-body">
        <div className="pmini-eyebrow">3 cortex-matched offers</div>
        <h4 className="pmini-title">Tailored to your tier · today</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { city: 'NJ → MA', pay: '$880', mi: '188 mi', hot: true },
            { city: 'NJ → PA', pay: '$640', mi: '82 mi', hot: false },
            { city: 'NJ → MD', pay: '$540', mi: '174 mi', hot: false },
          ].map((o, i) => (
            <div key={i} style={{
              border: o.hot ? '1.5px solid #FF5A1F' : '1px solid #ebebe7',
              borderRadius: 12, padding: 12, background: '#fff',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{o.city}</div>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 600, color: o.hot ? '#FF5A1F' : '#0A0A0A' }}>{o.pay}</div>
              </div>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#8A8A82', marginTop: 4 }}>{o.mi} · auto-routed</div>
              {o.hot && <div style={{ marginTop: 8, padding: '6px 8px', borderRadius: 6, background: '#FF5A1F', color: '#fff', fontSize: 10, fontFamily: 'JetBrains Mono', letterSpacing: '.08em', textTransform: 'uppercase', textAlign: 'center' }}>● Top match · accept</div>}
            </div>
          ))}
        </div>
      </div>
    </PhoneScaffold>
  )
}
export function PhoneScreenPickup({ active }) {
  return (
    <PhoneScaffold active={active}>
      <div className="pmini-auto-banner">● Pickup verification · 4 photos</div>
      <div className="pmini-body">
        <div className="pmini-eyebrow">On-site · Elizabeth NJ</div>
        <h4 className="pmini-title">Capture pickup</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            { l: 'Pallets', done: true },
            { l: 'Seal', done: true },
            { l: 'BOL', done: false },
            { l: 'Truck door', done: false },
          ].map((s, i) => (
            <div key={i} style={{
              aspectRatio: '1 / 1', borderRadius: 10,
              background: s.done ? '#E3F4E9' : '#fff',
              border: s.done ? '1.5px solid #00873E' : '1.5px dashed #DEDDD7',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, background: s.done ? '#00873E' : '#DEDDD7', display: 'grid', placeItems: 'center', color: '#fff', fontSize: 14 }}>{s.done ? '✓' : '+'}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: s.done ? '#00873E' : '#5A5A55' }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div className="pmini-action" style={{ marginTop: 14 }}>2 of 4 captured</div>
      </div>
    </PhoneScaffold>
  )
}
export function PhoneScreenPOD({ active }) {
  return (
    <PhoneScaffold active={active}>
      <div className="pmini-auto-banner" style={{ background: 'linear-gradient(90deg, #00873E, #0A6B33)' }}>● Loop closed · payment released</div>
      <div className="pmini-body">
        <div className="pmini-eyebrow">Delivered · 13:08</div>
        <h4 className="pmini-title">Load #44291 complete</h4>
        <div style={{ padding: 16, background: '#E3F4E9', borderRadius: 14, border: '1px solid #00873E', textAlign: 'center' }}>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: '#00873E', marginBottom: 8 }}>Payment released</div>
          <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 600, fontSize: 36, color: '#0A0A0A', letterSpacing: '-.02em' }}>$640.00</div>
          <div style={{ fontSize: 11, color: '#5A5A55', marginTop: 8 }}>Cleared in 0:00:04 · No invoice. No follow-up.</div>
        </div>
        <div style={{ marginTop: 16, padding: '12px 14px', background: '#fff', borderRadius: 12, border: '1px solid #ebebe7', fontSize: 12, fontFamily: 'JetBrains Mono', color: '#5A5A55' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Tier score</span><span style={{ color: '#00873E', fontWeight: 600 }}>0.92 → 0.94</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}><span>On-time %</span><span style={{ color: '#0A0A0A' }}>98.1%</span></div>
        </div>
      </div>
    </PhoneScaffold>
  )
}

// ─── Why Now (light) ────────────────────────────────────────────────────────
export function WhyNowSection() {
  const ref = useReveal()
  return (
    <section className="section light" ref={ref}>
      <div className="container">
        <div style={{ maxWidth: 900 }}>
          <div className="eyebrow reveal">Why now</div>
          <h2 className="h-display reveal delay-1">
            This only became <em className="serif">possible</em> now.
          </h2>
          <p className="lede reveal delay-2">
            The vision of autonomous logistics coordination existed for years. The infrastructure to execute it at scale did not — until now. Three converging forces closed the gap.
          </p>
        </div>

        <div className="forces-grid">
          <div className="force-card reveal">
            <div className="glyph">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 9h6v6H9z" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" /></svg>
            </div>
            <h3>Network-aware compute</h3>
            <p className="body">Local-first inference processes millions of simultaneous logistics decisions in seconds — every node in the network learns from every other node, continuously.</p>
          </div>
          <div className="force-card reveal delay-1">
            <div className="glyph">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="6" cy="6" r="3" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="18" r="3" /><path d="M6 9v6M18 9v6M9 6h6M9 18h6" /></svg>
            </div>
            <h3>API Connectivity at Scale</h3>
            <p className="body">Fragmented systems — TMS, WMS, OMS, carrier networks — are now connectable via standardized APIs, making unified data ingestion finally viable.</p>
          </div>
          <div className="force-card reveal delay-2">
            <div className="glyph">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v6M12 16v6M2 12h6M16 12h6" /><circle cx="12" cy="12" r="4" /></svg>
            </div>
            <h3>Real-Time Data Accessibility</h3>
            <p className="body">Live shipment telemetry, dynamic pricing signals, and inventory states are accessible in milliseconds — the raw material for continuous optimization.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Traction (dark) ────────────────────────────────────────────────────────
export function TractionSection() {
  const ref = useReveal()
  return (
    <section className="section" ref={ref}>
      <div className="container">
        <div style={{ maxWidth: 900 }}>
          <div className="eyebrow reveal">Traction</div>
          <h2 className="h-display reveal delay-1">
            UnieLogics is not starting from <em className="serif">zero.</em>
          </h2>
          <p className="lede reveal delay-2">
            Marketplace access, LTL interest, and a warehouse pipeline are already in place. We are not selling vision. We are connecting nodes that already want to be connected.
          </p>
        </div>

        <div className="traction-grid reveal delay-3">
          <div className="traction-cell">
            <div className="traction-num tnum"><span className="accent">5,000</span>+</div>
            <div className="traction-label">Marketplace LOI</div>
            <div className="traction-body">Signed letter of intent with a marketplace partner representing access to 5,000+ ecommerce sellers — both a distribution channel and a monetization layer.</div>
          </div>
          <div className="traction-cell">
            <div className="traction-num tnum"><span className="accent">2</span></div>
            <div className="traction-label">LTL pilot discussions</div>
            <div className="traction-body">Active interest from two LTL firms exploring AI for shipment coordination, pricing intelligence, and routing optimization.</div>
          </div>
          <div className="traction-cell">
            <div className="traction-num tnum"><span className="accent">23</span></div>
            <div className="traction-label">Warehouses pending</div>
            <div className="traction-body">Pipeline of 23 warehouse locations pending implementation. Target deployment wedge: 10–15 warehouses + 50+ LTL drivers.</div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── CTA (dark) ─────────────────────────────────────────────────────────────
export function CTASection() {
  return (
    <section className="cta-section" id="audit">
      <div className="container-tight">
        <h2>
          Join the future<br />
          <span className="serif-line">through Cortex.</span>
        </h2>
        <p className="lede" style={{ textAlign: 'center' }}>
          Our audit engine analyzes thousands of data points to reveal hidden capacity gaps, operational inefficiencies, and cost-saving opportunities — with executable optimization pathways, not just reports.
        </p>
        <div className="btns">
          <Anchor href="#audit" className="btn btn-primary">Request a network audit <span className="arrow">→</span></Anchor>
          <Anchor href="cortex.html" className="btn">Explore UnieCortex</Anchor>
        </div>
      </div>
    </section>
  )
}
