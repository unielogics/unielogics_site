// Tms — TMS Driver App autonomous story (ported from design tms.html).
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
            <div className="micro" style={{ color: '#FF8A5C', marginBottom: 18 }}>● UnieTMS Driver App · Stage 06 of the chain</div>
            <h1 className="detail-h1">
              The driver app that <em className="serif" style={{ color: '#FF8A5C' }}>operates itself.</em>
            </h1>
            <p className="lede" style={{ marginTop: 24, maxWidth: 580 }}>
              Loads matched, dispatched, accepted, picked up, delivered, paid — without a coordinator on the other end of the phone. The autonomous closure of the chain — warehouse to truck to doorstep, with no phone calls in between.
            </p>
            <div style={{ marginTop: 36, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Anchor href="#waitlist" className="btn btn-primary" style={{ background: '#FF5A1F', color: '#fff', borderColor: '#FF5A1F' }}>Join the driver waitlist <span className="arrow">→</span></Anchor>
              <Anchor href="#flow" className="btn">See the flow</Anchor>
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
            <div className="eyebrow" style={{ color: '#FF8A5C' }}>The autonomous flow</div>
            <h2 className="h-display">
              Five steps. <em className="serif" style={{ color: '#FF8A5C' }}>Zero phone calls.</em>
            </h2>
            <p className="lede">The driver doesn't talk to a broker. The shipper doesn't chase the driver. Cortex matches, dispatches, captures POD, and releases payment — and updates the driver's tier score for the next match.</p>
          </div>

          <div className="tms-flow">
            <div className="tms-flow-step"><div className="ts-num">01</div><h4>Cortex matches</h4><p>Driver scored against load, route, backhaul, hours-of-service. 4,147 candidates ranked in 140ms.</p></div>
            <div className="tms-flow-step"><div className="ts-num">02</div><h4>Driver accepts</h4><p>One tap. The push notification carries the lane, rate, and backhaul opportunity. No call. No back-and-forth.</p></div>
            <div className="tms-flow-step"><div className="ts-num">03</div><h4>System dispatches</h4><p>Route, dock, time window — pushed directly to the cab. Photo-verified pickup. BOL auto-attached.</p></div>
            <div className="tms-flow-step"><div className="ts-num">04</div><h4>POD captured</h4><p>Delivery photographed. Signature captured. Cortex stamps the loop closed at the consignee's door.</p></div>
            <div className="tms-flow-step"><div className="ts-num">05</div><h4>Loop closes</h4><p>Payment released in 4 seconds. Driver tier updated. Next match scored before the truck leaves the lot.</p></div>
          </div>
        </div>
      </section>

      <section className="section light">
        <div className="container">
          <div style={{ maxWidth: 920 }}>
            <div className="eyebrow">Why drivers use it</div>
            <h2 className="h-display">A driver app drivers actually <em className="serif" style={{ color: 'var(--accent-2)' }}>want to open.</em></h2>
            <p className="lede">Glove-friendly. Glare-tolerant. Built around what happens at 03:00 in a freezing dock, not what looks good in a deck.</p>
          </div>
          <div className="feature-grid" style={{ marginTop: 56 }}>
            <div className="feature-card" style={{ background: '#fff', border: '1px solid var(--light-hairline)' }}>
              <div className="ft-tag" style={{ color: 'var(--accent-2)' }}>Hit targets</div>
              <h4 style={{ color: 'var(--light-fg)' }}>56px minimum</h4>
              <p style={{ color: 'var(--light-fg-2)' }}>Every action target sized for cold gloves on a bouncing dashboard.</p>
            </div>
            <div className="feature-card" style={{ background: '#fff', border: '1px solid var(--light-hairline)' }}>
              <div className="ft-tag" style={{ color: 'var(--accent-2)' }}>Visibility</div>
              <h4 style={{ color: 'var(--light-fg)' }}>Signal orange · sunlight-tested</h4>
              <p style={{ color: 'var(--light-fg-2)' }}>The action color survives direct sun on a polarized windshield.</p>
            </div>
            <div className="feature-card" style={{ background: '#fff', border: '1px solid var(--light-hairline)' }}>
              <div className="ft-tag" style={{ color: 'var(--accent-2)' }}>Earnings</div>
              <h4 style={{ color: 'var(--light-fg)' }}>Pay before the call</h4>
              <p style={{ color: 'var(--light-fg-2)' }}>The driver knows the rate, backhaul bonus, and ETA before they tap accept. No bait-and-switch.</p>
            </div>
            <div className="feature-card" style={{ background: '#fff', border: '1px solid var(--light-hairline)' }}>
              <div className="ft-tag" style={{ color: 'var(--accent-2)' }}>Tier</div>
              <h4 style={{ color: 'var(--light-fg)' }}>Score, not seniority</h4>
              <p style={{ color: 'var(--light-fg-2)' }}>On-time, photo quality, and zero-defect deliveries lift your tier. Better tier = first pick of every match.</p>
            </div>
            <div className="feature-card" style={{ background: '#fff', border: '1px solid var(--light-hairline)' }}>
              <div className="ft-tag" style={{ color: 'var(--accent-2)' }}>Payment</div>
              <h4 style={{ color: 'var(--light-fg)' }}>Cleared in seconds</h4>
              <p style={{ color: 'var(--light-fg-2)' }}>POD captured? Payment released. No invoice cycles. No 45-day net.</p>
            </div>
            <div className="feature-card" style={{ background: '#fff', border: '1px solid var(--light-hairline)' }}>
              <div className="ft-tag" style={{ color: 'var(--accent-2)' }}>Offline</div>
              <h4 style={{ color: 'var(--light-fg)' }}>Queues, then syncs</h4>
              <p style={{ color: 'var(--light-fg-2)' }}>Lost signal in a rural dock? Status updates queue locally and replay the moment the radio comes back.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section" id="waitlist">
        <div className="container-tight">
          <h2>You drive.<br /><span className="serif-line">We bring the loads.</span></h2>
          <p className="lede" style={{ textAlign: 'center' }}>
            We're onboarding the first 500 independent drivers and owner-operators to run loads sourced by Cortex — from our warehouse network and existing client base. No fleet contract. No long-term lock-in. Get matched, get paid in seconds.
          </p>
          <div className="btns">
            <Anchor href="#waitlist" className="btn btn-primary" style={{ background: '#FF5A1F', color: '#fff', borderColor: '#FF5A1F' }}>Join the driver waitlist <span className="arrow">→</span></Anchor>
            <Anchor href="index.html" className="btn">Back home</Anchor>
          </div>
          <p className="micro" style={{ marginTop: 32, color: 'var(--fg-3)' }}>
            Independent stays independent · Drive when you want · Payment cleared the moment POD lands
          </p>
        </div>
      </section>
    </>
  )
}
