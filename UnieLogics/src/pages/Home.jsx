import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FullPageMap from '../components/FullPageMap'
import CinematicNetworkMap from '../components/CinematicNetworkMap'
import LossGainChart from '../components/LossGainChart'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'
import { products, PRODUCTS_INTRO } from '../data/productContent'

const gaps = [
  { title: 'Freight Cost & Empty Miles', description: 'Predictive freight coordination fills empty capacity and reduces costs.' },
  { title: 'Last-Mile Delivery Speed & Pricing', description: 'Route optimization and volume prediction accelerate delivery and lower per-package costs.' },
  { title: 'Smart Network Placement', description: 'Forecasted demand places inventory where needed most, reducing transfers and delays.' },
  { title: 'Inter-Network Peer-to-Peer Coordination', description: 'Warehouses, carriers, and sellers share operational intelligence for collaborative optimization.' },
  { title: 'Employee Utilization', description: 'Predictive workload balancing reduces overtime and maximizes labor efficiency.' },
  { title: 'Inventory Forecasting & Nationwide Placement', description: 'National demand intelligence ensures fulfillment is proactive, not reactive.' }
]

const BANNER_THRESHOLD_DESKTOP = 0.78
const BANNER_THRESHOLD_MOBILE = 0.48

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isNarrowViewport, setIsNarrowViewport] = useState(false)
  const networkSectionRef = useRef(null)
  const revealRefs = useRef([])

  // Track viewport width so banner shows earlier on mobile
  useEffect(() => {
    const check = () => setIsNarrowViewport(window.innerWidth <= 768)
    window.addEventListener('resize', check)
    check()
    return () => window.removeEventListener('resize', check)
  }, [])

  // Scroll progress calculation for network map
  useEffect(() => {
    const handleScroll = () => {
      if (!networkSectionRef.current) return
      
      const rect = networkSectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionTop = rect.top
      const sectionHeight = rect.height
      
      // Calculate progress: 0 when section enters viewport, 1 when it exits
      const scrollRange = sectionHeight + windowHeight
      const scrolled = windowHeight - sectionTop
      const progress = Math.max(0, Math.min(1, scrolled / scrollRange))
      
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial calculation
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Intersection Observer for reveal animations
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

  const heroLine1 = "The Unified Operating Network for"
  const heroLine2 = "Logistics, Ecommerce & Transportation"
  const heroLine = heroLine1 + " " + heroLine2
  // Mobile only: 3 lines
  const heroLine1M = "The Unified Operating"
  const heroLine2M = "Network for Logistics,"
  const heroLine3M = "Ecommerce & Transportation"
  const heroLineMobile = heroLine1M + " " + heroLine2M + " " + heroLine3M
  const heroLineMobileLen = heroLineMobile.length

  const renderTypingLine = (text, delayOffset = 0) => {
    const words = text.split(' ')
    return words.map((word, wordIdx) => {
      let charOffset = 0
      for (let i = 0; i < wordIdx; i++) charOffset += words[i].length + 1
      return (
        <span key={wordIdx} className="type-word">
          {word.split('').map((char, charIdx) => {
            const delay = (delayOffset + charOffset + charIdx) * 0.03
            return (
              <span key={charIdx} className="type-char-wrapper">
                <span className="type-char" style={{ animationDelay: `${delay}s` }}>{char}</span>
              </span>
            )
          })}
          {wordIdx < words.length - 1 && (
            <span className="type-char-wrapper">
              <span className="type-char" style={{ animationDelay: `${(delayOffset + charOffset + word.length) * 0.03}s` }}> </span>
            </span>
          )}
        </span>
      )
    })
  }

  const showBanner = scrollProgress >= (isNarrowViewport ? BANNER_THRESHOLD_MOBILE : BANNER_THRESHOLD_DESKTOP)

  return (
    <>
      <FullPageMap />
      <main>
        {/* Hero Section - typing effect starts on load, no reveal delay */}
        <section className="hero">
          <div className="wrap hero-content hero-typing-wrap">
            {/* Desktop: 2 lines */}
            <h1 className="hero-title hero-title-desktop">
              <span className="type-line">
                <span className="type-line-row">{renderTypingLine(heroLine1)}</span>
                <br />
                <span className="type-line-row">{renderTypingLine(heroLine2, heroLine1.length + 1)}</span>
                <span className="type-cursor" style={{ animationDelay: `${heroLine.length * 0.03}s` }}>|</span>
              </span>
            </h1>
            {/* Mobile: 3 lines */}
            <h1 className="hero-title hero-title-mobile" aria-hidden="true">
              <span className="type-line">
                <span className="type-line-row">{renderTypingLine(heroLine1M)}</span>
                <br />
                <span className="type-line-row">{renderTypingLine(heroLine2M, heroLine1M.length + 1)}</span>
                <br />
                <span className="type-line-row">{renderTypingLine(heroLine3M, heroLine1M.length + 1 + heroLine2M.length + 1)}</span>
                <span className="type-cursor" style={{ animationDelay: `${heroLineMobileLen * 0.03}s` }}>|</span>
              </span>
            </h1>
            <p className="hero-subtitle">
              UnieLogics connects warehouses, carriers, sellers, and fulfillment networks into one predictive ecosystem — eliminating silos, filling capacity gaps, and fixing inefficiencies before they impact cost or delivery.
            </p>
            <div className="hero-cta">
              <Link to="/solutions" className="btn btn-primary">Audit Your Business</Link>
              <Link to="/products" className="btn btn-secondary">Explore Our Platform</Link>
            </div>
          </div>
        </section>

        {/* Fragmentation Drives Cost */}
        <section className="mission-section fragmentation-section">
          <div className="fragmentation-chart-bg" aria-hidden="true">
            <LossGainChart />
          </div>
          <div className="wrap fragmentation-wrap">
            <div className="mission-content reveal" ref={(el) => (revealRefs.current[7] = el)}>
              <h2 className="section-title">Fragmentation Drives Cost</h2>
              <p className="statement">Disconnected systems create gaps:</p>
              <ul className="fragmentation-list">
                <li>Empty freight & inefficient routes</li>
                <li>Slow, expensive last-mile delivery</li>
                <li>Reactive inventory placement</li>
                <li>Underutilized workforce</li>
                <li>Poor network coordination</li>
              </ul>
            </div>
          </div>
        </section>

        {/* The Gaps We Eliminate */}
        <section className="gaps-section">
          <div className="wrap gaps-wrap">
            <h2 className="section-title reveal" ref={(el) => (revealRefs.current[10] = el)}>The Gaps We Eliminate</h2>
            <p className="statement gaps-subtitle reveal" ref={(el) => (revealRefs.current[17] = el)}>The Inefficiencies That Are Dragging Your Operations</p>
            <div className="integration-grid gaps-grid">
              {gaps.map((gap, idx) => (
                <div key={idx} className="integration-item reveal" ref={(el) => (revealRefs.current[11 + idx] = el)}>
                  <h3>{gap.title}</h3>
                  <p>{gap.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* One Network. Three Domains. Total Coordination. */}
        <section className="pillars-section">
          <div className="wrap">
            <h2 className="section-title pillars-header reveal" ref={(el) => (revealRefs.current[18] = el)}>
              One Network. Three Domains. Total Coordination.
            </h2>
            <div className="pillars-grid">
              <div className="pillar reveal" ref={(el) => (revealRefs.current[0] = el)}>
                <div className="pillar-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <h3>Logistics</h3>
                <p>Warehousing, fulfillment, and distribution networks.</p>
              </div>
              <div className="pillar reveal" ref={(el) => (revealRefs.current[1] = el)}>
                <div className="pillar-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                </div>
                <h3>Ecommerce</h3>
                <p>Sellers, prep centers, and marketplace operations.</p>
              </div>
              <div className="pillar reveal" ref={(el) => (revealRefs.current[2] = el)}>
                <div className="pillar-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h3>Transportation</h3>
                <p>Freight brokerage, carrier networks, and last-mile delivery.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Platforms Section */}
        <section className="product-suite-section platforms-section">
          <div className="wrap">
            <div className="product-suite-header">
              <h2 className="section-title">Interconnected Efficiency</h2>
              <p className="statement">
                Superior solutions for logistics, ecommerce, and transportation built for nationwide scale.
              </p>
            </div>

            <div className="product-suite-alternating">
              {products.map((product, idx) => {
                const isEven = idx % 2 === 0
                return (
                  <div
                    key={idx}
                    className="product-suite-item reveal"
                    ref={(el) => (revealRefs.current[3 + idx] = el)}
                    style={{ transitionDelay: `${idx * 0.06}s` }}
                  >
                    {isEven ? (
                      <>
                        <div className="product-suite-image">
                          {product.image ? (
                            <img src={product.image} alt="" />
                          ) : (
                            <div className="product-suite-image-placeholder" aria-hidden="true" />
                          )}
                          {product.status && (
                            <span className={`product-suite-badge ${product.status.toLowerCase().replace(' ', '-')}`}>
                              {product.status}
                            </span>
                          )}
                        </div>
                        <div className="product-suite-content">
                          <h3>{product.name}</h3>
                          <p>{product.shortDescription}</p>
                          <ul className="product-suite-bullets product-suite-bullets-condensed">
                            {product.bullets.slice(0, 4).map((b, i) => (
                              <li key={i}>{b}</li>
                            ))}
                          </ul>
                          <Link to="/products" className="btn" style={{ marginTop: '16px', display: 'inline-block' }}>
                            Learn more about {product.name}
                          </Link>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="product-suite-content">
                          <h3>{product.name}</h3>
                          <p>{product.shortDescription}</p>
                          <ul className="product-suite-bullets product-suite-bullets-condensed">
                            {product.bullets.slice(0, 4).map((b, i) => (
                              <li key={i}>{b}</li>
                            ))}
                          </ul>
                          <Link to="/products" className="btn" style={{ marginTop: '16px', display: 'inline-block' }}>
                            Learn more about {product.name}
                          </Link>
                        </div>
                        <div className="product-suite-image">
                          {product.image ? (
                            <img src={product.image} alt="" />
                          ) : (
                            <div className="product-suite-image-placeholder" aria-hidden="true" />
                          )}
                          {product.status && (
                            <span className={`product-suite-badge ${product.status.toLowerCase().replace(' ', '-')}`}>
                              {product.status}
                            </span>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Hyper-Connected Intelligence / Network Map Section */}
        <section ref={networkSectionRef} className="unified-network-section network-map-section">
          <div className="wrap">
            <div className="network-section-header">
              <h2 className="section-title">Hyper-Connected Intelligence</h2>
              <p className="statement">
                UnieLogics analyzes millions of operational data points to identify inefficiencies, forecast demand, and optimize networks.
              </p>
              <p className="micro">
                Operators manage. We coordinate.
              </p>
            </div>
          </div>
          <div className="network-map-sticky-wrap">
            <div className="network-map-inline">
              <CinematicNetworkMap scrollProgress={scrollProgress} />
            </div>
            <div
              className="network-map-cta-banner-outer"
              style={{
                opacity: showBanner ? 1 : 0,
                visibility: showBanner ? "visible" : "hidden",
                pointerEvents: showBanner ? "auto" : "none",
                transition: "opacity 0.5s ease",
              }}
            >
              <div className="network-map-cta-banner">
                <div className="network-map-cta-content">
                  <p className="network-cta-text">See The Impact</p>
                  <p className="network-cta-support">
                    Our audit engine analyzes thousands of data points to reveal: Hidden capacity gaps, Operational inefficiencies, Cost-saving opportunities, Recommended integration strategies.
                  </p>
                </div>
                <Link to="/solutions" className="btn btn-primary network-cta-btn">
                  Request An Audit
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ — fills gap between Audit CTA and Future section */}
        <FAQ />

        {/* The Future of Logistics Is Unified */}
        <section className="future-section">
          <div className="wrap">
            <div className="future-content reveal" ref={(el) => (revealRefs.current[21] = el)}>
              <h2 className="section-title">The Future of Logistics Is Unified</h2>
              <p className="statement">
                Disconnected operators lose margin. Predictive networks win.
              </p>
              <p className="micro">
                UnieLogics synchronizes your entire ecosystem — before gaps become costs.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
