import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CinematicNetworkMap from '../components/CinematicNetworkMap'
import Footer from '../components/Footer'

export default function Solutions() {
  const revealRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('on')
        })
      },
      { threshold: 0.12 }
    )
    revealRefs.current.forEach((el) => { if (el) observer.observe(el) })
    return () => revealRefs.current.forEach((el) => { if (el) observer.unobserve(el) })
  }, [])

  const ecosystemList = [
    { label: 'Investors', icon: 'chart' },
    { label: 'Enterprise sellers', icon: 'store' },
    { label: 'Ecommerce brands', icon: 'tag' },
    { label: 'Warehouse operators', icon: 'warehouse' },
    { label: 'Carrier networks', icon: 'truck' },
    { label: 'Dispatch teams', icon: 'clipboard' }
  ]

  return (
    <>
      <main className="solutions-page">
        <div className="wrap">
          {/* 1. Hero */}
          <section className="page-hero page-section solutions-hero">
            <h1 className="page-title">Unifying Market Activity</h1>
            <p className="page-subtitle">
              The logistics industry is hyper-fragmented. UnieLogics builds the intelligence layer that synchronizes the market.
            </p>
            <div className="solutions-hero-accent" aria-hidden="true" />
            <div className="cta-row solutions-hero-cta">
              <Link className="btn btn-primary" to="/get-started">Request an Audit</Link>
              <Link className="btn secondary" to="/products">Explore the Platform</Link>
            </div>
          </section>

          {/* 2. Problem + Solution side by side */}
          <section className="page-section solutions-section solutions-problem-solution reveal" ref={(el) => (revealRefs.current[0] = el)}>
            <div className="solutions-problem-solution-grid">
              <div className="solutions-problem-column">
                <h2 className="section-title">The Hyper-Fragmented Market Problem</h2>
                <p className="statement">Today's logistics ecosystem operates in silos.</p>
                <div className="solutions-problem-card">
                  <ul className="solutions-problem-list">
                    <li>Empty and partially filled trucks</li>
                    <li>Idle warehouse capacity</li>
                    <li>Manual dispatch and reactive freight</li>
                    <li>Disconnected WMS, TMS, and ecommerce systems</li>
                  </ul>
                  <p className="micro solutions-problem-result">Each operator optimizes locally. No one optimizes structurally. The result: higher costs, lower margins, operational volatility.</p>
                </div>
              </div>
              <div className="solutions-solution-column">
                <div className="solutions-map-header">
                  <h2 className="section-title">Our Solution</h2>
                  <p className="statement">An Interconnected Supply Chain Synchronization</p>
                </div>
                <div className="solutions-network-wrap solutions-network-full">
                  <div className="network-map-container network-map-full">
                    <div className="network-map-visualization">
                      <CinematicNetworkMap scrollProgress={1} hideFinalMessage />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Audit + Ecosystem: merged, out-of-the-box full-width band */}
        <section className="solutions-audit-ecosystem-band page-section reveal" ref={(el) => (revealRefs.current[1] = el)}>
          <div className="solutions-audit-ecosystem-inner">
            <div className="solutions-audit-block">
              <h2 className="section-title">Network Audit & Optimization Engine</h2>
              <p className="statement">Our AI-powered audit evaluates freight efficiency, carrier utilization, warehouse throughput, inventory positioning, and delivery cost.</p>
              <p className="micro">The platform identifies inefficiencies and provides executable optimization pathways—not just reports. Enterprise, hybrid, or continuous optimization.</p>
              <div className="solutions-audit-cta">
                <Link className="btn btn-primary" to="/get-started">Request an Audit</Link>
              </div>
            </div>
            <div className="solutions-ecosystem-block">
              <h2 className="section-title">Built for the Entire Ecosystem</h2>
              <p className="statement">For operators and brands across the United States.</p>
              <div className="ecosystem-personas">
                {ecosystemList.map((item) => (
                  <div key={item.label} className="ecosystem-persona">
                    {item.icon === 'chart' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></svg>
                    )}
                    {item.icon === 'store' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                    )}
                    {item.icon === 'tag' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>
                    )}
                    {item.icon === 'warehouse' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                    )}
                    {item.icon === 'truck' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
                    )}
                    {item.icon === 'clipboard' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /><path d="M9 14h6" /><path d="M9 18h6" /></svg>
                    )}
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
