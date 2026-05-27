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
            UnieLogics · Supply chain, run for you
          </div>
          <h1 className="h-hero hero-title">
            Supply Chain That
            <span className="serif-line">Works For You.</span>
          </h1>
          <p className="hero-sub">
            We run the <strong style={{ color: 'var(--fg)' }}>warehouse, the parcels, and the freight</strong> — three things you don't have to operate anymore. One supply chain, three services on call, backed by intelligence that finds you savings on every shipment.
          </p>
          <div className="hero-cta">
            <Anchor href="/audit" className="btn btn-primary">Audit your business · instant improvements, no commitment <span className="arrow">→</span></Anchor>
          </div>
          <div className="hero-tertiary">
            <Anchor href="/join#apply">You run a warehouse, fleet, OMS, or broker yourself? → Join Our Supply Chain</Anchor>
          </div>
        </div>
        <div className="hero-orbital-wrap">
          <CortexOrbital size={620} compact={false} />
        </div>
      </div>
      <div className="hero-meta">
        <div>
          <div>+16% YoY · per adopting business</div>
          <div style={{ marginTop: 4, opacity: .6 }}>Compounds with every system you connect</div>
        </div>
        <div className="scroll-cue">Scroll</div>
        <div style={{ textAlign: 'right' }}>
          <div>5,147 businesses · live</div>
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
          <div className="eyebrow reveal">Why your supply chain costs too much</div>
          <h2 className="h-display reveal delay-1">
            Four broken corners.<br /><em className="serif">One bill, every month.</em>
          </h2>
          <p className="lede reveal delay-2">
            Your warehouse doesn't talk to your shipping. Your shipping doesn't talk to your freight. Your orders don't know which warehouse to ship from. You're not paying for inefficiency — you're paying for <strong style={{ color: 'var(--fg)' }}>the gaps between four systems that were never meant to talk to each other.</strong>
          </p>
        </div>

        <div className="disconnect-grid">
          <div className="disco-tile reveal">
            <div className="disco-tile-head">
              <div>
                <div className="disco-tile-system">Your fulfillment</div>
                <h4>Warehouse</h4>
                <div className="disco-tile-sub">Where orders get picked and packed</div>
              </div>
              <span className="disco-tile-status">Slow</span>
            </div>
            <div className="disco-rows">
              <div className="disco-row"><span>Orders out the door</span><span className="v">slow</span></div>
              <div className="disco-row is-err"><span>Inventory in the wrong place</span><span className="v">often</span></div>
              <div className="disco-row is-err"><span>Pick-pack errors</span><span className="v">creep up</span></div>
              <div className="disco-row"><span>Returns restocked</span><span className="v">days late</span></div>
              <div className="disco-row"><span>What's actually in stock</span><span className="v">— a guess —</span></div>
            </div>
          </div>

          <div className="disco-tile reveal delay-1">
            <div className="disco-tile-head">
              <div>
                <div className="disco-tile-system">Your freight</div>
                <h4>LTL & FTL</h4>
                <div className="disco-tile-sub">Pallets and full trailers moving between locations</div>
              </div>
              <span className="disco-tile-status">Wasteful</span>
            </div>
            <div className="disco-rows">
              <div className="disco-row"><span>Trucks rolling empty</span><span className="v">28% of miles</span></div>
              <div className="disco-row is-err"><span>Pallets waiting</span><span className="v">days</span></div>
              <div className="disco-row is-err"><span>Capacity finder</span><span className="v">— phone calls —</span></div>
              <div className="disco-row"><span>Carrier rates</span><span className="v">a guess</span></div>
              <div className="disco-row"><span>Return trips matched</span><span className="v">— never —</span></div>
            </div>
          </div>

          <div className="disco-tile reveal delay-2">
            <div className="disco-tile-head">
              <div>
                <div className="disco-tile-system">Your orders</div>
                <h4>Margin</h4>
                <div className="disco-tile-sub">Selling without knowing if you made money</div>
              </div>
              <span className="disco-tile-status">Blind</span>
            </div>
            <div className="disco-rows">
              <div className="disco-row"><span>Promised before profit checked</span><span className="v">always</span></div>
              <div className="disco-row is-err"><span>True margin per order</span><span className="v">— unknown —</span></div>
              <div className="disco-row is-err"><span>Marketplace fees modeled</span><span className="v">last year's</span></div>
              <div className="disco-row"><span>Ships from closest warehouse</span><span className="v">— a guess —</span></div>
              <div className="disco-row"><span>Loss discovered</span><span className="v">at invoice time</span></div>
            </div>
          </div>

          <div className="disco-tile reveal delay-3">
            <div className="disco-tile-head">
              <div>
                <div className="disco-tile-system">Your parcels</div>
                <h4>Shipping</h4>
                <div className="disco-tile-sub">Every box that goes out the door</div>
              </div>
              <span className="disco-tile-status">Overpriced</span>
            </div>
            <div className="disco-rows">
              <div className="disco-row"><span>Same carrier on every label</span><span className="v">always</span></div>
              <div className="disco-row is-err"><span>Cheapest option compared</span><span className="v">— never —</span></div>
              <div className="disco-row is-err"><span>Invoice overcharges</span><span className="v">+$42K / mo · unrecovered</span></div>
              <div className="disco-row"><span>Rates renegotiated</span><span className="v">annually</span></div>
              <div className="disco-row"><span>Cost trajectory</span><span className="v">creeps every quarter</span></div>
            </div>
          </div>
        </div>

        <div className="disco-bridges-note reveal delay-4">
          <span className="line"></span>
          <span>Four broken corners · zero shared brain — and you pay the difference, every single month</span>
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
          <span className="accent">Watching every shipment.</span>
        </h2>
        <p className="lede reveal delay-2" style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          A single intelligence layer reads every order, every pick, every truck, every rate, every return — and finds you savings on every shipment, automatically. You don't have to operate it; we do.
        </p>
        <div className="brain-orbital-wrap reveal delay-3">
          <CortexOrbital size={760} compact={false} showLabels={true} />
        </div>
        <div className="brain-cta reveal delay-4">
          <Anchor href="/audit" className="btn btn-primary">Audit Your Business <span className="arrow">→</span></Anchor>
          <Anchor href="#story" className="btn">Watch a shipment run</Anchor>
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
            Intelligence that finds you savings.<br />
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
              <li>Network-aware route optimization across all participating businesses</li>
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
// `voice="consumer"` (Home) or `voice="provider"` (default; Join page).
export function NetworkSection({ voice = 'provider' }) {
  const ref = useReveal()
  const providerLevers = [
    { n: '01', metric: '+$1,840', unit: 'per truck · monthly', title: 'Independent capacity, finally earning.', body: 'Per-truck, per-warehouse, per-business owner: capacity that used to sit idle gets matched to demand. Independent operators see earnings rise without changing their hours.' },
    { n: '02', metric: '+38%', unit: 'volume of activity', title: 'More jobs run through the same asset.', body: 'Drop-off frequency, route density, and pickup velocity all climb. The same truck or facility handles measurably more business per shift, per week, per quarter.' },
    { n: '03', metric: '−14%', unit: 'fuel use · per warehouse', title: 'Significantly less fuel burned.', body: 'Cortex collapses redundant trips, optimizes inbound staging, and right-sizes shuttle loads. Per-warehouse fuel cost drops materially within the first quarter.' },
    { n: '04', metric: '−22%', unit: 'delivery time · network avg', title: 'Better delivery times for everyone.', body: 'Inventory placement guided by Cortex puts product closer to demand before it spikes. Every party — seller, carrier, recipient — sees the parcel arrive faster.' },
    { n: '05', metric: '±6%', unit: 'seasonal variance · vs ±28%', title: 'Fluctuation, normalized.', body: 'Cortex smooths the activity curve across the year. Operations stay steady through Q4 peaks and Q1 troughs — predictable headcount, predictable margins, predictable cash flow.' },
  ]
  const consumerLevers = [
    { n: '01', metric: '−18%', unit: 'shipping cost · per order', title: 'Cheaper shipping, automatically.', body: 'Every parcel goes out on the cheapest carrier that meets your deadline — picked per shipment, not negotiated once a year.' },
    { n: '02', metric: '−22%', unit: 'delivery time', title: 'Faster delivery, less complaining.', body: 'Inventory placed near where your customers actually live. Orders ship from the closest warehouse and arrive sooner — every time.' },
    { n: '03', metric: '+8.1%', unit: 'margin · at the moment of sale', title: 'Margin you know upfront.', body: "We model true landed cost — fees, shipping, returns — before you promise an order, so you stop selling at a loss without knowing it." },
    { n: '04', metric: '47%', unit: 'faster handling', title: 'Orders out the door faster.', body: 'Better pick paths, smarter slotting, sharper inbound — your orders move through our warehouses measurably faster.' },
    { n: '05', metric: '$42K', unit: 'recovered · per month', title: 'Every carrier invoice audited.', body: "Late deliveries, dimensional re-weighs, address corrections — we catch what shouldn't have been charged and file refunds before the deadline." },
  ]
  const isConsumer = voice === 'consumer'
  const levers = isConsumer ? consumerLevers : providerLevers
  return (
    <section className="network-section" ref={ref}>
      <div className="container">
        <div style={{ maxWidth: 920 }}>
          <div className="eyebrow reveal">{isConsumer ? 'What you get' : 'The supply-chain network effect'}</div>
          <h2 className="h-display reveal delay-1">
            {isConsumer ? (
              <>Real savings. <em className="serif">Real fast.</em></>
            ) : (
              <>+16% per year. <em className="serif">Every party that adopts.</em></>
            )}
          </h2>
          <p className="lede reveal delay-2">
            {isConsumer
              ? 'Five things we move the needle on the moment you plug in: shipping cost, delivery time, margin per order, warehouse speed, and recovered carrier overcharges.'
              : 'Cortex doesn\'t just optimize the work you have. It compounds across five operational levers — earnings, activity, fuel, delivery, and steadiness — for every truck, every warehouse, every business in the network.'}
          </p>
        </div>

        <div className="network-yoy-hero reveal delay-3">
          <div className="network-stat-num tnum">{isConsumer ? <>−18<span className="unit">%</span></> : <>+16<span className="unit">%</span></>}</div>
          <div className="network-stat-label">{isConsumer ? 'Average shipping savings · across active customers' : 'Estimated YoY improvement · per adopting party'}</div>
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
          <div className="eyebrow reveal">Stage 06 · Last-mile</div>
          <h2 className="h-display reveal delay-1">
            Better placement.<br />
            <em className="serif" style={{ color: 'var(--accent-2)' }}>Last-mile savings that compound.</em>
          </h2>
          <p className="lede reveal delay-2">
            We figure out where every one of your products should physically live — at which warehouse, in which zone, in which bin. The shorter the path from shelf to doorstep, the cheaper the last mile gets. And the last mile is where the margin lives.
          </p>
        </div>

        <div className="lastmile-grid">
          <div className="lastmile-card reveal">
            <div className="lm-eyebrow">Smarter placement</div>
            <h3>Inventory ends up closest to demand.</h3>
            <p>We model expected demand across our warehouse footprint and stage your inventory where customers actually live — before they order. Every parcel ships from the closest warehouse.</p>
            <div className="lm-stat">
              <div className="lm-stat-num tnum">−22%</div>
              <div className="lm-stat-lbl">Avg parcel distance</div>
            </div>
          </div>
          <div className="lastmile-card reveal delay-1">
            <div className="lm-eyebrow">Cheapest carrier per shipment</div>
            <h3>The cheapest carrier for THIS parcel.</h3>
            <p>We run live rate comparisons on every order: what would FedEx charge? UPS? USPS? A regional carrier? We pick the cheapest one that hits your deadline — per shipment, not per contract.</p>
            <div className="lm-stat">
              <div className="lm-stat-num tnum">−18%</div>
              <div className="lm-stat-lbl">Last-mile cost per order</div>
            </div>
          </div>
          <div className="lastmile-card reveal delay-2">
            <div className="lm-eyebrow">Invoice recovery</div>
            <h3>Every label, audited.</h3>
            <p>Late deliveries, address corrections, dimensional re-weighs — we benchmark every line on every carrier invoice against what it should have cost. Refunds surface automatically; we file them before the deadline.</p>
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
    { type: 'label-spine', tag: 'Shipping audit', title: 'My shipping is too expensive', promise: "Send us a list of your recent shipments. We benchmark every label against the cheapest carrier that could have hit the deadline, and show you exactly how much you've been overpaying." },
    { type: 'task-workflow', tag: 'Fulfillment audit', title: 'My orders go out too slow', promise: 'Tell us how you ship today. We score where time is leaking — receiving, picking, packing, dispatch — and show you what a faster, cheaper fulfillment setup would look like.' },
    { type: 'order-financial', tag: 'Margin audit', title: 'My margins are disappearing', promise: "Share your recent sales data. We rebuild margin per order — fees, shipping, returns all in — so you stop selling at a loss without knowing it." },
    { type: 'network', tag: 'Network audit', title: 'My shipments come from the wrong place', promise: 'Tell us where your customers actually live. We model where your inventory should sit to ship from the closest warehouse on every order.' },
  ]

  return (
    <section className="audit-funnel" id="audit" ref={ref}>
      <div className="container">
        <div className="eyebrow reveal" style={{ justifyContent: 'center', display: 'inline-flex', width: '100%' }}>End-to-end audit · 10 minutes</div>
        <h2 className="question reveal delay-1">
          Tell us where it hurts.<br />
          We'll show you <em>the audit</em> that fixes it.
        </h2>
        <div className="audit-options">
          {options.map((o, i) => (
            <Anchor key={i} href={`/audit?type=${o.type}`} className="audit-tile reveal" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="audit-tile-tag">→ {o.tag}</div>
              <h3 className="audit-tile-title">{o.title}</h3>
              <p className="audit-tile-promise">{o.promise}</p>
              <span className="audit-tile-arrow">Start this audit</span>
            </Anchor>
          ))}
        </div>
        <div className="audit-extra reveal delay-3">
          <div style={{ flex: '0 0 auto' }}>
            <div className="ax-label">For sellers · Product Catalog Audit</div>
            <h4 className="ax-title">I want to sell more profitable SKUs</h4>
          </div>
          <p className="ax-desc" style={{ flex: 1, minWidth: 260 }}>
            Send us your product list. We blend demand history, true landed cost, and where to place inventory — and show you which products are actually making you money.
          </p>
          <Anchor href="/audit?type=product-catalog" className="btn" style={{ flex: '0 0 auto' }}>Start →</Anchor>
        </div>
        <div className="audit-trust">
          Every audit returns a before / after proposal · no commitment · your data stays yours
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
          One layer. <em className="serif">Every</em> stage. Every decision.
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
          <div className="eyebrow reveal">Before and after</div>
          <h2 className="h-display reveal delay-1">
            Your supply chain, <em className="serif">before and after.</em>
          </h2>
          <p className="lede reveal delay-2">
            What your supply chain costs you today — versus what it looks like once we're running it for you.
          </p>
        </div>

        <div className="compare-grid">
          <div className="compare-card before reveal">
            <div className="label">Before · Today</div>
            <h3 className="title">You pay too much. You wait too long.</h3>
            <ul className="list">
              <li>Shipping rates negotiated once a year, used on every label after.</li>
              <li>Carrier overcharges go unrecovered — $42K a month for a mid-sized seller.</li>
              <li>Inventory sits in the wrong warehouse, shipping farther than it should.</li>
              <li>Margin per order is unknown until the invoice comes back.</li>
              <li>Returns sit for days; restock signals never reach the catalog.</li>
              <li>You coordinate the gap between warehouse, freight, and parcels yourself.</li>
            </ul>
            <div className="footnote">Status quo · What you live with today</div>
          </div>
          <div className="compare-card after reveal delay-2">
            <div className="label">After · UnieLogics</div>
            <h3 className="title">You ship cheaper. You ship faster. You don't operate any of it.</h3>
            <ul className="list">
              <li>Cheapest carrier picked per shipment — not per contract.</li>
              <li>Every invoice audited; overcharges recovered automatically.</li>
              <li>Inventory placed close to where your customers actually live.</li>
              <li>True margin known the moment the order is placed.</li>
              <li>Returns restocked fast; the catalog learns from what came back.</li>
              <li>One supply chain run for you — warehouse, parcels, and freight.</li>
            </ul>
            <div className="footnote">UnieLogics · Running it for you</div>
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
          Results compound across the network. The more businesses participate, the stronger the signal.
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
            One <em className="serif">chain.</em> Three products. One brain.
          </h2>
          <p className="lede reveal delay-2">
            Cortex is the intelligence. These are the three systems it runs through — feeding it the warehouse, the order command center, and the driver in the cab. Adopt one. Adopt all three. The brain gets sharper as it sees more of your picture.
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
        <rect x="108" y="20" width="58" height="32" rx="2" fill="rgba(79,134,183,.06)" stroke="var(--accent)" strokeWidth=".3" />
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
            <div className="eyebrow reveal" style={{ color: '#FF8A5C' }}>Stage 06 · The breakthrough</div>
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
            <p className="body">Local-first inference processes millions of simultaneous logistics decisions in seconds — every business in the network learns from every other, continuously.</p>
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
// `voice="consumer"` (Home) or `voice="provider"` (default; Join page).
export function TractionSection({ voice = 'provider' }) {
  const ref = useReveal()
  const isConsumer = voice === 'consumer'
  return (
    <section className="section" ref={ref}>
      <div className="container">
        <div style={{ maxWidth: 900 }}>
          <div className="eyebrow reveal">{isConsumer ? 'You\'re joining a warm network' : 'Traction'}</div>
          <h2 className="h-display reveal delay-1">
            {isConsumer ? (
              <>The network is already <em className="serif">running.</em></>
            ) : (
              <>UnieLogics is not starting from <em className="serif">zero.</em></>
            )}
          </h2>
          <p className="lede reveal delay-2">
            {isConsumer
              ? "More than 5,000 brands, two freight networks, and 23 warehouses are already plugged in. The moment you start, you're inside a working supply chain — not waiting for one to be built."
              : 'Marketplace access, LTL interest, and a warehouse pipeline are already in place. We are not selling vision. We are connecting businesses that already want to be connected.'}
          </p>
        </div>

        <div className="traction-grid reveal delay-3">
          <div className="traction-cell">
            <div className="traction-num tnum"><span className="accent">5,000</span>+</div>
            <div className="traction-label">{isConsumer ? 'Brands already onboarding' : 'Marketplace LOI'}</div>
            <div className="traction-body">{isConsumer
              ? '5,000+ ecommerce brands are coming in through a marketplace partner — meaning the moment you join, you\'re shipping inside a network of buyers and sellers, not a single store.'
              : 'Signed letter of intent with a marketplace partner representing access to 5,000+ ecommerce sellers — both a distribution channel and a monetization layer.'}</div>
          </div>
          <div className="traction-cell">
            <div className="traction-num tnum"><span className="accent">2</span></div>
            <div className="traction-label">{isConsumer ? 'Freight networks live' : 'LTL pilot discussions'}</div>
            <div className="traction-body">{isConsumer
              ? 'Two LTL freight networks are already running through us — meaning your pallets and full trailers move on real capacity from day one, not a marketing promise.'
              : 'Active interest from two LTL firms exploring AI for shipment coordination, pricing intelligence, and routing optimization.'}</div>
          </div>
          <div className="traction-cell">
            <div className="traction-num tnum"><span className="accent">23</span></div>
            <div className="traction-label">{isConsumer ? 'Warehouses ready for you' : 'Warehouses pending'}</div>
            <div className="traction-body">{isConsumer
              ? '23 warehouse locations across the country are coming online — so your inventory sits close to where your customers actually live.'
              : 'Pipeline of 23 warehouse locations pending implementation. Target deployment wedge: 10–15 warehouses + 50+ LTL drivers.'}</div>
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
          Let us run your <em className="serif">supply chain.</em><br />
          <span className="serif-line">Start with a free audit.</span>
        </h2>
        <p className="lede" style={{ textAlign: 'center' }}>
          Tell us where it hurts — shipping, fulfillment, freight, or margin — and we'll show you what we'd do about it. 10 minutes. No commitment. Real numbers, not a pitch.
        </p>
        <div className="btns">
          <Anchor href="/audit" className="btn btn-primary">Audit Your Business <span className="arrow">→</span></Anchor>
          <Anchor href="/join#apply" className="btn">Join Our Supply Chain</Anchor>
        </div>
      </div>
    </section>
  )
}

// ─── End-to-end stage walkthrough (light) ───────────────────────────────────
// `voice="consumer"` (Home) or `voice="provider"` (default; Join page).
export function EndToEndSection({ voice = 'provider' }) {
  const ref = useReveal()
  const providerStages = [
    { n: '01', name: 'Supply', body: 'Blends supplier ETAs with demand to shape the inbound plan.', metric: null, who: 'warehouses, sellers' },
    { n: '02', name: 'Inbound & receiving', body: 'Reads dock and dwell signal; flags drift before it cascades.', metric: null, who: 'warehouses, carriers' },
    { n: '03', name: 'Warehouse execution', body: 'Re-sequences picks, rescues idle pickers, scores slotting per demand.', metric: '47% faster handling', who: 'warehouses, sellers' },
    { n: '04', name: 'Orders & margin', body: "Prices every order against landed cost before it's promised.", metric: '+8.1% margin at order', who: 'sellers, brands' },
    { n: '05', name: 'Outbound & carrier mix', body: 'Picks the cheapest carrier that meets the deadline — per shipment.', metric: '−18% last-mile cost', who: 'warehouses, carriers, sellers' },
    { n: '06', name: 'Transport & last-mile', body: 'Auto-matches drivers, fills empty return trips, pays on proof of delivery.', metric: '0:00:04 POD → payment', who: 'carriers, drivers, brokers' },
    { n: '07', name: 'Returns & the loop', body: 'Reverse-flow signal turns into catalog and slotting corrections.', metric: null, who: 'warehouses, sellers' },
  ]
  const consumerStages = [
    { n: '01', name: 'Supply', body: 'We forecast what you need where, so the right inventory lands before demand spikes.', metric: null },
    { n: '02', name: 'We receive it', body: 'Your goods land at our warehouses. We check, scan, and put it away for you.', metric: null },
    { n: '03', name: 'We pick & pack', body: "When orders hit, we find them faster than your team would. 47% faster, in fact.", metric: '47% faster handling' },
    { n: '04', name: 'We price every order', body: "We model true margin before you promise the order — fees, shipping, returns, all in.", metric: '+8.1% margin at order' },
    { n: '05', name: 'We ship it', body: 'Every parcel goes out on the cheapest carrier that hits the deadline. Per shipment.', metric: '−18% last-mile cost' },
    { n: '06', name: 'We move freight', body: "Pallets and full trailers go on the right truck the moment they're ready. No phone tag.", metric: '0:00:04 POD → payment' },
    { n: '07', name: 'We cover returns', body: 'When something comes back, we restock it and use the signal to make the next sale better.', metric: null },
  ]
  const isConsumer = voice === 'consumer'
  const stages = isConsumer ? consumerStages : providerStages
  return (
    <section className="section light" ref={ref}>
      <div className="container">
        <div style={{ maxWidth: 920 }}>
          <div className="eyebrow reveal">{isConsumer ? 'How we run it for you' : 'End to end'}</div>
          <h2 className="h-display reveal delay-1">
            {isConsumer ? (
              <>Your shipment, <em className="serif">end to end.</em></>
            ) : (
              <>One brain across <em className="serif">every stage of the chain.</em></>
            )}
          </h2>
          <p className="lede reveal delay-2">
            {isConsumer
              ? "From the moment your inventory shows up at our warehouse to the moment a customer holds the box — and back through any return — we run every step. You stay focused on selling."
              : "Most platforms own a slice — the warehouse, or the truck, or the order. Cortex reads the whole chain at once and turns each stage into the next decision. From the supplier signal to the customer doorstep and back again through returns. Nothing is handed off blind."}
          </p>
        </div>

        <div className="endtoend-rail reveal delay-3">
          {stages.map((s) => (
            <div key={s.n} className="endtoend-card">
              <div className="endtoend-stage-n">{s.n}</div>
              <div className="endtoend-stage-name">{s.name}</div>
              <p className="endtoend-card-body">{s.body}</p>
              {s.metric && <div className="endtoend-card-metric">{s.metric}</div>}
              {!isConsumer && (
                <div className="endtoend-card-who">
                  <span>Who sees it:</span> {s.who}
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="endtoend-foot reveal delay-4">
          {isConsumer
            ? 'Seven stages. One supply chain. We run it — you get the savings.'
            : 'One brain. Every stage. Open to every business in the network — warehouses, carriers, sellers, drivers.'}
        </p>
      </div>
    </section>
  )
}

// ─── Open by design — the open-network contrast (light) ─────────────────────
// `voice="consumer"` (Home) or `voice="provider"` (default; Join page).
export function OpenNetworkSection({ voice = 'provider' }) {
  const ref = useReveal()
  const isConsumer = voice === 'consumer'
  return (
    <section className="section light" ref={ref}>
      <div className="container">
        <div style={{ maxWidth: 920 }}>
          <div className="eyebrow reveal">{isConsumer ? 'Open by design' : 'Open by design'}</div>
          <h2 className="h-display reveal delay-1">
            {isConsumer ? (
              <>You don't have to pick a single warehouse,<br />
                <em className="serif" style={{ color: 'var(--accent-2)' }}>or a single carrier.</em></>
            ) : (
              <>Not a single operator's supply chain.<br />
                <em className="serif" style={{ color: 'var(--accent-2)' }}>The supply chain everyone can plug into.</em></>
            )}
          </h2>
          <p className="lede reveal delay-2">
            {isConsumer
              ? "Most supply-chain offerings lock you into one company's warehouse and one company's trucks. We're the opposite. We work across a network of warehouses, parcel carriers, and freight operators — and pick the right one for every shipment. You get the savings; we handle the picking."
              : "Most end-to-end supply-chain offerings are run by one company for the rest of the market. UnieLogics is the opposite. The intelligence is the platform — and every business in the network gets to see it. Warehouses, carriers, sellers, drivers, brokers. Same brain. Different windows."}
          </p>
        </div>

        <div className="shift-grid">
          {isConsumer ? (
            <>
              <div className="shift-card is-final reveal">
                <div className="index">01 · Pick the cheapest carrier</div>
                <h3 className="h-card">Per shipment, not per contract.</h3>
                <p className="body">FedEx, UPS, USPS, regional carriers, LTL freight — we run live rate comparisons on every parcel and pallet. The right one goes on every shipment.</p>
              </div>
              <div className="shift-card is-final reveal delay-1">
                <div className="index">02 · Use the closest warehouse</div>
                <h3 className="h-card">Inventory near your demand.</h3>
                <p className="body">Your goods can sit in one warehouse or several — we model where to place them so every order ships from the closest location to the buyer.</p>
              </div>
              <div className="shift-card is-final reveal delay-2">
                <div className="index">03 · Keep your independence</div>
                <h3 className="h-card">Your data stays yours.</h3>
                <p className="body">We never sell your sales data, your customer list, or your catalog. We coordinate the shipping; you keep the relationship with your customer.</p>
              </div>
            </>
          ) : (
            <>
              <div className="shift-card is-final reveal">
                <div className="index">01 · Everyone sees the brain</div>
                <h3 className="h-card">One Cortex, many windows.</h3>
                <p className="body">Warehouses see slotting and labor. Carriers see return-trip matches and live rates. Sellers see margin and where to place inventory. Drivers see matched loads. Brokers see who has capacity. Each business looks through its own window.</p>
              </div>
              <div className="shift-card is-final reveal delay-1">
                <div className="index">02 · Bring your own systems</div>
                <h3 className="h-card">No mandate to switch.</h3>
                <p className="body">Cortex sits across the WMS, TMS, OMS, and carriers you already run — and across the partners you already work with. Plug in; nothing forced to rip out.</p>
              </div>
              <div className="shift-card is-final reveal delay-2">
                <div className="index">03 · Data stays with you</div>
                <h3 className="h-card">Open network ≠ shared dataset.</h3>
                <p className="body">Each business's signal stays inside its own systems. Cortex coordinates by consent — every recommendation needs your approval before it runs. End to end.</p>
              </div>
            </>
          )}
        </div>

        <div className="opennet-strip reveal delay-3">
          {isConsumer
            ? 'No single-warehouse lock-in · No single-carrier contract · Always the right one for every shipment'
            : 'No walled garden · No single-operator lock-in · Every business in the network sees the next move'}
        </div>
      </div>
    </section>
  )
}

// ─── Two doors — audience splitter (light) ──────────────────────────────────
export function TwoDoorsSection() {
  const ref = useReveal()
  return (
    <section className="section light twodoors-section" ref={ref}>
      <div className="container">
        <div style={{ maxWidth: 920 }}>
          <div className="eyebrow reveal">Two ways in</div>
          <h2 className="h-display reveal delay-1">
            Which one are <em className="serif">you?</em>
          </h2>
        </div>

        <div className="twodoors-grid reveal delay-2">
          <Anchor href="/audit" className="twodoor-tile">
            <div className="twodoor-tag">→ I need supply-chain help</div>
            <h3 className="twodoor-title">You sell, ship, or run a business that already has a supply chain.</h3>
            <p className="twodoor-body">You want it cheaper, faster, smarter. Start with a free 10-minute audit; we'll show you where the money is leaking and how to plug the leak.</p>
            <div className="twodoor-for">For: brands, sellers, shippers, and operators looking to optimize.</div>
            <span className="twodoor-arrow">Get a 10-minute audit →</span>
          </Anchor>
          <Anchor href="/join" className="twodoor-tile twodoor-tile-alt">
            <div className="twodoor-tag">→ I run a business that fits the network</div>
            <h3 className="twodoor-title">You operate a warehouse, run a fleet or drive a truck, build an OMS or marketplace, or broker freight.</h3>
            <p className="twodoor-body">You want a brain that pulls more work toward you while keeping you independent. Plug in and the network starts feeding you.</p>
            <div className="twodoor-for">For: warehouses / 3PLs, carriers / drivers, OMS / marketplaces, brokers.</div>
            <span className="twodoor-arrow">Join the network →</span>
          </Anchor>
        </div>
      </div>
    </section>
  )
}

// ─── Three services — consumer-facing offerings (light) ────────────────────
export function ThreeServicesSection() {
  const ref = useReveal()
  const services = [
    {
      n: '01',
      name: 'Fulfillment',
      pitch: 'Drop your inventory at our warehouses. We receive it, store it, pick it, pack it, and ship it — across every channel you sell on.',
      how: 'You send us stock. We turn orders into delivered boxes.',
      auditType: 'task-workflow',
      cta: 'Audit my fulfillment',
    },
    {
      n: '02',
      name: 'Shipping',
      pitch: 'Every parcel goes out on the cheapest carrier that meets your deadline — picked per shipment, not negotiated once a year.',
      how: 'We compare FedEx, UPS, USPS, and regional carriers on every label.',
      auditType: 'label-spine',
      cta: 'Audit my shipping',
    },
    {
      n: '03',
      name: 'LTL & FTL',
      pitch: 'Pallets, full trailers, and everything in between. Loads matched to the right truck automatically — no broker, no phone tag.',
      how: 'Tell us where it needs to go. We move it.',
      auditType: 'network',
      cta: 'Audit my freight',
    },
  ]
  return (
    <section className="section light three-services-section" ref={ref}>
      <div className="container">
        <div style={{ maxWidth: 920 }}>
          <div className="eyebrow reveal">Three services. One supply chain.</div>
          <h2 className="h-display reveal delay-1">
            What we can <em className="serif">run for you.</em>
          </h2>
          <p className="lede reveal delay-2">
            Pick one. Pick all three. We handle warehousing, parcel shipping, and freight moves — backed by the intelligence layer that finds savings on every shipment.
          </p>
        </div>

        <div className="three-services-grid reveal delay-3">
          {services.map((s) => (
            <Anchor key={s.n} href={`/audit?type=${s.auditType}`} className="service-tile">
              <div className="service-tile-n">{s.n}</div>
              <h3 className="service-tile-name">{s.name}</h3>
              <p className="service-tile-pitch">{s.pitch}</p>
              <div className="service-tile-how"><span>How it works:</span> {s.how}</div>
              <span className="service-tile-cta">{s.cta} →</span>
            </Anchor>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Join page hero (dark) ─────────────────────────────────────────────────
export function JoinHero() {
  return (
    <section className="join-hero">
      <div className="container join-hero-inner">
        <div className="join-hero-copy">
          <div className="micro" style={{ color: 'var(--accent)', marginBottom: 18 }}>● Join Our Supply Chain · For operators</div>
          <h1 className="detail-h1">
            Join the <em className="serif">open</em> supply chain.
          </h1>
          <p className="lede" style={{ marginTop: 24, maxWidth: 620 }}>
            You run a warehouse, a fleet, a truck, an OMS, or a brokerage. We're the open network that pulls more matched work toward you while keeping you independent. One brain across every stage — and your business gets a window into it.
          </p>
          <div style={{ marginTop: 36, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Anchor href="#apply" className="btn btn-primary">Apply to join <span className="arrow">→</span></Anchor>
            <Anchor href="#intelligence" className="btn">See the intelligence layer</Anchor>
          </div>
        </div>
        <div className="join-hero-visual">
          <CortexOrbital size={560} showLabels={true} />
        </div>
      </div>
    </section>
  )
}

// ─── Intelligence layer — Cortex deep-dive on the Join page ────────────────
export function IntelligenceLayerSection() {
  const ref = useReveal()
  return (
    <section className="section light" id="intelligence" ref={ref}>
      <div className="container">
        <div style={{ maxWidth: 920 }}>
          <div className="eyebrow reveal">The intelligence layer · UnieCortex</div>
          <h2 className="h-display reveal delay-1">
            One brain. Reading everything. <em className="serif" style={{ color: 'var(--accent-2)' }}>Recommending the next move.</em>
          </h2>
          <p className="lede reveal delay-2">
            UnieCortex sits across every stage of the chain — orders, picks, lanes, rates, returns — and turns the whole stream into a single coordinated decision. The AI runs inside your own systems, not in a shared cloud. Every recommendation needs your approval before it runs.
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
              <li>Warehouse footprint scored against demand-weighted parcel cost</li>
              <li>Seasonal staffing forecasts tied to inbound and order velocity</li>
              <li>Network design — where the next warehouse should be, and why</li>
              <li>Multi-warehouse routing across parcel, LTL, and FTL in one optimization</li>
              <li>Marketplace fee modeling baked into every margin call</li>
            </ul>
          </div>
        </div>

        <div className="trust-grid" style={{ marginTop: 56 }}>
          <div className="trust-card">
            <div className="trust-card-num mono">01</div>
            <h3>Runs on your systems</h3>
            <p>Every model — routing, scoring, agents — runs inside <strong>your</strong> network. Your shipment, billing, order, and employee data never leaves your perimeter. This isn't a privacy mode. It's the only mode.</p>
          </div>
          <div className="trust-card">
            <div className="trust-card-num mono">02</div>
            <h3>You approve every move</h3>
            <p>Cortex proposes. You approve. Every wave, every putaway, every carrier change is a proposal with a before-state, an after-state, and a reason — gated on human consent.</p>
          </div>
          <div className="trust-card">
            <div className="trust-card-num mono">03</div>
            <h3>Open integrations</h3>
            <p>Live rates from carrier APIs. Demand history. Address validation. Marketplace APIs. Nothing locked behind a Cortex-only system.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Product rail — UnieWMS / UnieTMS / UnieConnect compressed (dark) ──────
export function ProductRailSection() {
  const ref = useReveal()
  const products = [
    {
      id: 'wms',
      anchor: 'wms',
      name: 'UnieWMS',
      status: 'Live',
      stage: 'Stages 02–03 · Inbound, receiving, warehouse execution',
      audience: 'For warehouse operators and 3PLs',
      pitch: 'The warehouse management system Cortex actually trusts. Turn-key, multi-client, multi-facility — connects in 2–4 weeks. Every operational event instrumented and replay-able.',
      bullets: [
        'Real-time orchestration across receiving, storage, picking, packing, dispatch',
        'Predictive correction and anomaly detection',
        'Multi-client, multi-facility sync',
        'Pre-negotiated LTL & parcel rates from day one',
      ],
      pagePath: '/wms',
      pageLabel: 'Inside UnieWMS',
      externalLink: 'https://uniewms.com',
      externalLabel: 'Open UnieWMS ↗',
      renderVisual: () => (
        <img
          src="https://prepcenternearme.s3.us-east-1.amazonaws.com/unielogics/uniewms+(2).png"
          alt="UnieWMS dashboard"
          loading="lazy"
        />
      ),
    },
    {
      id: 'tms',
      anchor: 'tms',
      name: 'UnieTMS · Driver App',
      status: 'Waitlist',
      stage: 'Stage 06 · Transport & last-mile',
      audience: 'For drivers, carriers, and brokers',
      pitch: 'The driver app that operates itself. Loads matched, dispatched, accepted, picked up, delivered, paid — no coordinator on the other end of the phone.',
      bullets: [
        'One-tap load acceptance with rate, return-trip, and ETA up-front',
        'Photo-verified pickup and proof-of-delivery capture',
        'Payment cleared in seconds after delivery — no invoice cycles',
        'Independent drivers stay independent — no fleet contract',
      ],
      pagePath: '/tms',
      pageLabel: 'Inside UnieTMS',
      renderVisual: () => (
        <div className="product-rail-visual-driver">
          <DriverAppThumb />
        </div>
      ),
    },
    {
      id: 'connect',
      anchor: 'products',
      name: 'UnieConnect',
      status: 'Beta',
      stage: 'Stage 04 · Orders & margin',
      audience: 'For sellers, brands, and marketplaces',
      pitch: 'The OMS command center. Every order priced for true margin before it ships. Orders, customers, marketplace listings, and inventory in one operating view.',
      bullets: [
        "Margin modeled at the moment of sale — fees, shipping, returns",
        'Order-level profit by lane, region, and channel',
        'Inventory network view across every connected warehouse',
        'Cortex suggestions surface as actions you approve',
      ],
      pagePath: '/connect',
      pageLabel: 'Inside UnieConnect',
      renderVisual: () => (
        <div className="product-rail-visual-connect">
          <UnieConnectThumb />
        </div>
      ),
    },
  ]
  return (
    <section className="section" id="products" ref={ref}>
      <div className="container">
        <div style={{ maxWidth: 920 }}>
          <div className="eyebrow reveal">The product rail</div>
          <h2 className="h-display reveal delay-1">
            Three products. <em className="serif">One brain.</em>
          </h2>
          <p className="lede reveal delay-2">
            UnieWMS runs the warehouse. UnieTMS runs the truck. UnieConnect runs the orders. Cortex sits across all three and turns them into a single coordinated supply chain.
          </p>
        </div>

        <div className="product-rail-grid reveal delay-3">
          {products.map((p) => (
            <div key={p.id} id={p.anchor} className="product-rail-card">
              <div className="product-rail-visual">{p.renderVisual()}</div>
              <div className="product-rail-body">
                <div className="product-rail-head">
                  <div className="product-rail-name">{p.name}</div>
                  <span className="product-rail-status">{p.status}</span>
                </div>
                <div className="product-rail-stage mono">{p.stage}</div>
                <div className="product-rail-audience mono">{p.audience}</div>
                <p className="product-rail-pitch">{p.pitch}</p>
                <ul className="product-rail-bullets">
                  {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
                <div className="product-rail-actions">
                  <Anchor href={p.pagePath} className="product-rail-link product-rail-link-primary">{p.pageLabel} →</Anchor>
                  {p.externalLink && (
                    <Anchor href={p.externalLink} className="product-rail-link product-rail-link-ext">{p.externalLabel}</Anchor>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
