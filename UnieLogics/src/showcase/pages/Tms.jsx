// UnieTMS Driver App — dedicated immersive product page.
// Reached from /join's product rail and from the footer.
import { useState, useEffect } from 'react'
import { Anchor } from '../lib/nav'
import {
  PhoneScreenAutonomous,
  PhoneScreenInbox,
  PhoneScreenPickup,
  PhoneScreenPOD,
} from '../components/sections'

export default function Tms() {
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

  return (
    <>
      <section className="detail-hero" style={{ background: 'linear-gradient(180deg, #050505, #0a0a0a)' }}>
        <div className="container detail-hero-inner">
          <div className="detail-hero-copy">
            <div className="micro" style={{ color: '#FF8A5C', marginBottom: 18 }}>● UnieTMS Driver App · Your freight, automatically dispatched</div>
            <h1 className="detail-h1">
              Your freight, <em className="serif" style={{ color: '#FF8A5C' }}>auto-dispatched.</em>
            </h1>
            <p className="lede" style={{ marginTop: 24, maxWidth: 580 }}>
              Pallets and full trailers, matched to the right truck the moment they're ready. No broker, no phone tag, no carrier hunting. We move your freight automatically — and you watch it land on time.
            </p>
            <div style={{ marginTop: 36, display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
              <Anchor href="/audit?type=network" className="btn btn-primary">Audit Your Business <span className="arrow">→</span></Anchor>
              <Anchor href="/join#apply" className="btn">Join Our Supply Chain</Anchor>
              <Anchor href="#waitlist" className="btn-tertiary" style={{ color: '#FF8A5C' }}>Drive for us ↓</Anchor>
            </div>
          </div>
          <div className="detail-hero-visual" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="phone-frame">
              <div className="phone-screens">
                <PhoneScreenAutonomous active={screen === 'autonomous'} />
                <PhoneScreenInbox active={screen === 'inbox'} />
                <PhoneScreenPickup active={screen === 'pickup'} />
                <PhoneScreenPOD active={screen === 'pod'} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="flow">
        <div className="container">
          <div style={{ maxWidth: 920 }}>
            <div className="eyebrow" style={{ color: '#FF8A5C' }}>How your load moves</div>
            <h2 className="h-display">
              Five steps. <em className="serif" style={{ color: '#FF8A5C' }}>Zero phone calls.</em>
            </h2>
            <p className="lede">From the moment your freight is ready at the dock to the moment it's delivered, signed, and paid — we run every step. No broker. No back-and-forth. No chasing.</p>
          </div>

          <div className="tms-flow">
            <div className="tms-flow-step"><div className="ts-num">01</div><h4>We match the truck</h4><p>The right driver scored against your load — route, return-trip opportunity, rating, hours available. Hundreds of candidates ranked in 140ms.</p></div>
            <div className="tms-flow-step"><div className="ts-num">02</div><h4>The driver accepts</h4><p>One tap on their phone. The notification carries the lane, rate, and ETA. No call. No back-and-forth. They show up when they said they would.</p></div>
            <div className="tms-flow-step"><div className="ts-num">03</div><h4>We dispatch</h4><p>Route, dock, time window — pushed straight to the cab. Photo-verified pickup. Shipping documents auto-attached. You can watch the live status.</p></div>
            <div className="tms-flow-step"><div className="ts-num">04</div><h4>We capture proof of delivery</h4><p>Delivery photographed. Signature captured. The receiver gets the goods and we have everything you'd ever need for billing or disputes.</p></div>
            <div className="tms-flow-step"><div className="ts-num">05</div><h4>The loop closes</h4><p>Payment released to the driver in 4 seconds. Their rating updates. We score the next match before the truck leaves the lot — keeping capacity warm for your next load.</p></div>
          </div>
        </div>
      </section>

      <section className="section light">
        <div className="container">
          <div style={{ maxWidth: 920 }}>
            <div className="eyebrow">Why this works</div>
            <h2 className="h-display">A driver app drivers actually <em className="serif" style={{ color: 'var(--accent-2)' }}>want to open.</em></h2>
            <p className="lede">The reason your freight moves on time is the network of drivers behind it. They use this app because it pays them better, faster, and respects their time. That reliability shows up in your delivery dates.</p>
          </div>
          <div className="feature-grid" style={{ marginTop: 56 }}>
            <div className="feature-card" style={{ background: '#fff', border: '1px solid var(--light-hairline)' }}>
              <div className="ft-tag" style={{ color: 'var(--accent-2)' }}>Built for the cab</div>
              <h4 style={{ color: 'var(--light-fg)' }}>Sized for cold gloves</h4>
              <p style={{ color: 'var(--light-fg-2)' }}>Every action target sized for gloved hands on a bouncing dashboard. The app works in the real world — not just in a demo video.</p>
            </div>
            <div className="feature-card" style={{ background: '#fff', border: '1px solid var(--light-hairline)' }}>
              <div className="ft-tag" style={{ color: 'var(--accent-2)' }}>Daylight ready</div>
              <h4 style={{ color: 'var(--light-fg)' }}>Survives direct sun</h4>
              <p style={{ color: 'var(--light-fg-2)' }}>Sunlight-tested color and contrast. Drivers can read it through a polarized windshield at noon.</p>
            </div>
            <div className="feature-card" style={{ background: '#fff', border: '1px solid var(--light-hairline)' }}>
              <div className="ft-tag" style={{ color: 'var(--accent-2)' }}>Pay upfront</div>
              <h4 style={{ color: 'var(--light-fg)' }}>No bait-and-switch</h4>
              <p style={{ color: 'var(--light-fg-2)' }}>The driver sees the rate, the return-trip bonus, and the ETA before they tap accept. That's why they say yes — and show up.</p>
            </div>
            <div className="feature-card" style={{ background: '#fff', border: '1px solid var(--light-hairline)' }}>
              <div className="ft-tag" style={{ color: 'var(--accent-2)' }}>Rated by performance</div>
              <h4 style={{ color: 'var(--light-fg)' }}>Score, not seniority</h4>
              <p style={{ color: 'var(--light-fg-2)' }}>On-time deliveries, clean photos, zero defects lift the driver's rating. Higher rating = first pick of your load. Your freight moves on the best drivers, not the loudest.</p>
            </div>
            <div className="feature-card" style={{ background: '#fff', border: '1px solid var(--light-hairline)' }}>
              <div className="ft-tag" style={{ color: 'var(--accent-2)' }}>Paid in seconds</div>
              <h4 style={{ color: 'var(--light-fg)' }}>Proof of delivery = paycheck</h4>
              <p style={{ color: 'var(--light-fg-2)' }}>The moment proof of delivery lands, payment clears. No invoice cycles, no 45-day net. Drivers love it; you get drivers who actually want your loads.</p>
            </div>
            <div className="feature-card" style={{ background: '#fff', border: '1px solid var(--light-hairline)' }}>
              <div className="ft-tag" style={{ color: 'var(--accent-2)' }}>Offline-safe</div>
              <h4 style={{ color: 'var(--light-fg)' }}>Status never gets lost</h4>
              <p style={{ color: 'var(--light-fg-2)' }}>Rural dock with no signal? Status updates queue locally and replay when the radio comes back. Your tracking stays accurate.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 920 }}>
            <div className="eyebrow">Measured impact</div>
            <h2 className="h-display">Freight that <em className="serif" style={{ color: '#FF8A5C' }}>just moves.</em></h2>
          </div>
          <div className="stats-row" style={{ marginTop: 64 }}>
            <div className="stat">
              <div className="stat-label">Empty miles</div>
              <div className="stat-num tnum">−28<span className="unit">%</span></div>
              <div className="stat-body">Return-trip matching cuts wasted miles — and your freight cost moves with it.</div>
            </div>
            <div className="stat">
              <div className="stat-label">Proof to payment</div>
              <div className="stat-num tnum">0:00:04</div>
              <div className="stat-body">Time from proof-of-delivery capture to the driver getting paid.</div>
            </div>
            <div className="stat">
              <div className="stat-label">Coordinator calls</div>
              <div className="stat-num tnum">0</div>
              <div className="stat-body">Per completed load. No broker on the phone, no chasing the driver.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section" id="waitlist">
        <div className="container-tight">
          <h2>Move your freight.<br /><span className="serif-line">Without moving a finger.</span></h2>
          <p className="lede" style={{ textAlign: 'center' }}>
            10-minute audit. Tell us where your pallets and full trailers need to go. We show you what auto-dispatched freight would cost you — and how much faster it would land.
          </p>
          <div className="btns">
            <Anchor href="/audit?type=network" className="btn btn-primary">Audit Your Business <span className="arrow">→</span></Anchor>
            <Anchor href="/join#tms" className="btn">Drive for us · Join the network</Anchor>
          </div>
          <p className="micro" style={{ marginTop: 32, color: 'var(--fg-3)' }}>
            Independent drivers stay independent · No fleet contract · Payment cleared the moment proof of delivery lands
          </p>
        </div>
      </section>
    </>
  )
}
