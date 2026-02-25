import { useRef, useEffect, useState } from 'react'
import Footer from '../components/Footer'
import { products, PRODUCTS_INTRO, STRATEGIC_FLOW } from '../data/productContent'
import { submitLead } from '../lib/leadApi'

const HELP_AREAS = [
  {
    id: 'warehousing',
    title: 'Warehousing',
    description: 'Capacity utilization, fulfillment, and inventory placement to optimize your operations.'
  },
  {
    id: 'last-mile',
    title: 'Last Mile Delivery',
    description: 'Faster delivery and lower per-package cost through smarter routing and network coordination.'
  },
  {
    id: 'freight',
    title: 'Freight',
    description: 'LTL/FTL carrier matching and empty-mile reduction to cut costs and fill capacity.'
  }
]

export default function Products() {
  const revealRefs = useRef([])
  const [contact, setContact] = useState({ name: '', company: '', email: '', phone: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitStatus(null)
    const result = await submitLead({
      name: contact.name,
      email: contact.email,
      phone: contact.phone || undefined,
      company: contact.company,
      notes: contact.message,
      source: 'UnieLogics Products',
    })
    setSubmitting(false)
    if (result.success) {
      setSubmitStatus({ ok: true, message: "Thanks! We'll reach out shortly." })
      setContact({ name: '', company: '', email: '', phone: '', message: '' })
    } else {
      setSubmitStatus({ ok: false, message: result.error || 'Something went wrong. Please try again.' })
    }
  }

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

  return (
    <>
    <main>
      <div className="wrap">
        <section className="page-hero page-section">
          <h1 className="page-title">An Interconnected Ecosystem for Growth and Stability</h1>
          <p className="page-subtitle">
            Software that connects warehouse operators, carriers, sellers, and brands into one ecosystem—driving growth and stability through predictive demand intelligence.
          </p>
        </section>

        <section className="page-section products-comparison reveal" ref={(el) => (revealRefs.current[0] = el)}>
          <div className="table-scroll-wrap comparison-table-wrap">
            <div className="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Status</th>
                    <th>Primary Use Case</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, idx) => (
                    <tr key={idx}>
                      <td><strong>{product.name}</strong></td>
                      <td><span className={`product-status-badge ${product.status.toLowerCase().replace(' ', '-')}`}>{product.status}</span></td>
                      <td>{product.primaryUseCase.split('.')[0]}{product.primaryUseCase.includes('.') ? '.' : ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="comparison-cards">
            {products.map((product, idx) => (
              <div key={idx} className="comparison-card">
                <div className="comparison-card-row">
                  <span className="comparison-card-label">Product</span>
                  <strong>{product.name}</strong>
                </div>
                <div className="comparison-card-row">
                  <span className="comparison-card-label">Status</span>
                  <span className={`product-status-badge ${product.status.toLowerCase().replace(' ', '-')}`}>{product.status}</span>
                </div>
                <div className="comparison-card-row">
                  <span className="comparison-card-label">Primary Use Case</span>
                  <span>{product.primaryUseCase.split('.')[0]}{product.primaryUseCase.includes('.') ? '.' : ''}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="product-suite-section page-section reveal" ref={(el) => (revealRefs.current[1] = el)}>
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
                  ref={(el) => (revealRefs.current[2 + idx] = el)}
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
                        <h4 className="product-suite-headline">{product.headline}</h4>
                        <p>{product.description}</p>
                        <ul className="product-suite-bullets">
                          {product.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                        <p className="product-suite-closing">{product.closing}</p>
                        {product.link ? (
                          <a className="btn" href={product.link} target="_blank" rel="noopener noreferrer" style={{ marginTop: '16px', display: 'inline-block' }}>
                            Visit {product.name}
                          </a>
                        ) : (
                          <span className="micro" style={{ marginTop: '16px', display: 'inline-block', color: 'var(--muted)' }}>Coming soon</span>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="product-suite-content">
                        <h3>{product.name}</h3>
                        <h4 className="product-suite-headline">{product.headline}</h4>
                        <p>{product.description}</p>
                        <ul className="product-suite-bullets">
                          {product.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                        <p className="product-suite-closing">{product.closing}</p>
                        {product.link ? (
                          <a className="btn" href={product.link} target="_blank" rel="noopener noreferrer" style={{ marginTop: '16px', display: 'inline-block' }}>
                            Visit {product.name}
                          </a>
                        ) : (
                          <span className="micro" style={{ marginTop: '16px', display: 'inline-block', color: 'var(--muted)' }}>Coming soon</span>
                        )}
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
        </section>

        <section className="page-section strategic-flow-section reveal" ref={(el) => (revealRefs.current[products.length + 2] = el)}>
          <div className="strategic-flow-header">
            <h2 className="section-title">{STRATEGIC_FLOW.headline}</h2>
            <p className="strategic-flow-subtitle">Each step feeds data back. Each transaction improves the model.</p>
          </div>
          <div className="strategic-flow-track">
            {STRATEGIC_FLOW.steps.map((step, i) => (
              <div key={i} className="strategic-flow-step">
                <div className="strategic-flow-step-inner">
                  <span className="strategic-flow-step-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="strategic-flow-step-text">{step}</span>
                </div>
                {i < STRATEGIC_FLOW.steps.length - 1 && (
                  <div className="strategic-flow-connector" aria-hidden="true">
                    <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 6h18l-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="strategic-flow-closing-box">
            <p className="strategic-flow-closing">{STRATEGIC_FLOW.closing}</p>
          </div>
        </section>

        <section className="page-section products-cta reveal" ref={(el) => (revealRefs.current[products.length + 3] = el)}>
          <div className="products-operators-box">
            <div className="products-operators-content">
              <h2 className="section-title">For Brands &amp; Sellers</h2>
              <p className="micro">This section is dedicated to brands and sellers. Here's how we can help.</p>
              <div className="products-operators-help-list">
                {HELP_AREAS.map((area) => (
                  <div key={area.id} className="products-operators-help-item">
                    <h4>{area.title}</h4>
                    <p>{area.description}</p>
                  </div>
                ))}
              </div>
              <div className="products-operators-audit">
                <h4>Audit Tool</h4>
                <p>Our Audit Tool provides a full analysis to beat your previous expenses, deliver faster and cheaper, and help you grow. Request an audit to discover hidden savings and optimization opportunities.</p>
              </div>
            </div>
            <div className="products-operators-form-wrap">
              <form className="products-operators-form" onSubmit={handleContactSubmit}>
                <h3 className="section-title">Contact us</h3>
                <div className="form-group">
                  <label htmlFor="products-name">Name</label>
                  <input
                    id="products-name"
                    type="text"
                    value={contact.name}
                    onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="products-company">Company</label>
                  <input
                    id="products-company"
                    type="text"
                    value={contact.company}
                    onChange={(e) => setContact((c) => ({ ...c, company: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="products-email">Email</label>
                  <input
                    id="products-email"
                    type="email"
                    required
                    value={contact.email}
                    onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="products-phone">Phone</label>
                  <input
                    id="products-phone"
                    type="tel"
                    value={contact.phone}
                    onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="products-message">Message</label>
                  <textarea
                    id="products-message"
                    value={contact.message}
                    onChange={(e) => setContact((c) => ({ ...c, message: e.target.value }))}
                    rows={4}
                  />
                </div>
                {submitStatus && (
                  <p className={submitStatus.ok ? 'success' : 'error'} style={{ marginTop: 8 }}>
                    {submitStatus.message}
                  </p>
                )}
                <button type="submit" className="btn" disabled={submitting}>{submitting ? 'Sending...' : 'Send message'}</button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
    <Footer />
  </>
  )
}
