import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { services } from '../data/services'
import ServiceCard from '../components/ServiceCard'
import Footer from '../components/Footer'
import { submitLead } from '../lib/leadApi'

const SERVICE_ICONS = {
  audit: 'audit',
  implementation: 'wrench',
  'nationwide-optimization': 'map',
  'operations-optimization': 'chart'
}

const PERSONAS = [
  { id: 'warehouse', label: 'Warehouse & 3PL', desc: 'Fulfillment, warehouse ops', icon: 'warehouse' },
  { id: 'freight', label: 'Freight & carrier', desc: 'LTL/FTL, carrier matching', icon: 'truck' },
  { id: 'brand', label: 'Brand / shipper', desc: 'Transportation & delivery', icon: 'store' }
]

function ServiceFormIcon({ name }) {
  const size = 40
  const stroke = 2
  const common = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: stroke }
  if (name === 'audit')
    return <svg {...common} width={size} height={size}><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
  if (name === 'wrench')
    return <svg {...common} width={size} height={size}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
  if (name === 'map')
    return <svg {...common} width={size} height={size}><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" /></svg>
  if (name === 'chart')
    return <svg {...common} width={size} height={size}><path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></svg>
  if (name === 'warehouse')
    return <svg {...common} width={size} height={size}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
  if (name === 'truck')
    return <svg {...common} width={size} height={size}><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
  if (name === 'store')
    return <svg {...common} width={size} height={size}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
  return null
}

export default function Services() {
  const revealRefs = useRef([])
  const [formStep, setFormStep] = useState(1)
  const [selectedServices, setSelectedServices] = useState([])
  const [persona, setPersona] = useState('')
  const [qualifying, setQualifying] = useState({ volume: '', locations: '', timeline: '' })
  const [contact, setContact] = useState({ name: '', company: '', email: '', phone: '', source: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

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

  const toggleService = (id) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const buildMailtoBody = () => {
    const serviceNames = selectedServices.map((id) => services.find((s) => s.id === id)?.title || id).join(', ')
    const lines = [
      'Services request',
      '---',
      `Services needed: ${serviceNames || 'None selected'}`,
      `Who are you: ${persona ? PERSONAS.find((p) => p.id === persona)?.label || persona : 'Not selected'}`,
      '---',
      `Monthly volume: ${qualifying.volume || 'N/A'}`,
      `Locations: ${qualifying.locations || 'N/A'}`,
      `Timeline: ${qualifying.timeline || 'N/A'}`,
      '---',
      `Name: ${contact.name}`,
      `Company: ${contact.company}`,
      `Email: ${contact.email}`,
      `Phone: ${contact.phone}`,
      `How did you hear: ${contact.source || 'N/A'}`
    ]
    return lines.join('\n')
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitStatus(null)
    const notes = buildMailtoBody()
    const result = await submitLead({
      name: contact.name,
      email: contact.email,
      phone: contact.phone || undefined,
      company: contact.company,
      notes,
      source: 'UnieLogics Services',
    })
    setSubmitting(false)
    if (result.success) {
      setSubmitStatus({ ok: true, message: "Thanks! We'll reach out shortly." })
      setContact({ name: '', company: '', email: '', phone: '', source: '' })
      setSelectedServices([])
      setPersona('')
      setQualifying({ volume: '', locations: '', timeline: '' })
    } else {
      setSubmitStatus({ ok: false, message: result.error || 'Something went wrong. Please try again.' })
    }
  }

  const audienceSegments = [
    {
      id: 'warehouses',
      label: 'Warehouse & 3PL operators',
      value: 'Capacity utilization, fulfillment, and integration with carrier networks.',
      icon: 'warehouse'
    },
    {
      id: 'freight',
      label: 'Freight & carrier networks',
      value: 'Load matching, empty-mile reduction, and nationwide capacity.',
      icon: 'truck'
    },
    {
      id: 'brands',
      label: 'Brands & shippers',
      value: 'Transportation, inventory placement, and delivery of merchandise at scale.',
      icon: 'store'
    }
  ]

  return (
    <>
    <main className="services-page">
      <div className="wrap services-wrap">
        <section className="page-hero page-section services-hero">
          <h1 className="page-title">Services That Unify the Market</h1>
          <p className="page-subtitle">
            For warehouse and freight operators: capacity, matching, and optimization. For brands: transportation, placement, and delivery of your merchandise—at scale.
          </p>
          <div className="services-hero-accent" aria-hidden="true" />
          <div className="cta-row services-hero-cta">
            <Link className="btn btn-primary" to="/get-started">Request Consultation</Link>
            <Link className="btn secondary" to="/products">Explore the Platform</Link>
          </div>
        </section>

        <section className="page-section services-who reveal" ref={(el) => (revealRefs.current[0] = el)}>
          <h2 className="section-title">Who We Serve</h2>
          <p className="statement">The providers that seek future stability and growth.</p>
          <div className="services-audience-grid" style={{ marginTop: '28px' }}>
            {audienceSegments.map((seg) => (
              <div key={seg.id} className="audience-card">
                {seg.icon === 'warehouse' && (
                  <svg className="audience-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                )}
                {seg.icon === 'truck' && (
                  <svg className="audience-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
                )}
                {seg.icon === 'store' && (
                  <svg className="audience-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                )}
                <h3 className="audience-card-title">{seg.label}</h3>
                <p className="audience-card-value">{seg.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="page-section reveal" ref={(el) => (revealRefs.current[1] = el)}>
          <h2 className="section-title">What We Offer</h2>
          <p className="statement">Audit, technology implementation, nationwide optimization, and operations support for warehouses, freight networks, and brands.</p>
          <div className="integration-grid" style={{ marginTop: '28px' }}>
            {services.map((service, idx) => (
              <div key={service.id} className="reveal" ref={(el) => (revealRefs.current[idx + 2] = el)}>
                <ServiceCard service={service} showBullets />
              </div>
            ))}
          </div>
        </section>

        <section className="page-section services-request-form reveal" ref={(el) => (revealRefs.current[services.length + 2] = el)}>
          <div className="services-form-wrap">
            <h2 className="section-title">Get Your Solution</h2>
            <p className="micro" style={{ marginBottom: '8px' }}>Select the services you need and answer a few questions. We'll match you with the right path.</p>
            <div className="services-form-progress" aria-hidden="true">
              <span className="micro">Step {formStep} of 4</span>
              <div className="services-form-progress-bar">
                <div className="services-form-progress-fill" style={{ width: `${(formStep / 4) * 100}%` }} />
              </div>
            </div>
            <form className="services-form" onSubmit={(e) => { e.preventDefault(); if (formStep < 4) setFormStep((s) => s + 1); else handleFormSubmit(e); }}>
              {formStep === 1 && (
                <div className="form-step-panel reveal on">
                  <h3 className="form-step-title">Which services do you need?</h3>
                  <p className="micro" style={{ marginBottom: '20px' }}>Select all that apply.</p>
                  <div className="form-tile-grid form-tile-grid-multi">
                    {services.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        className={`form-tile ${selectedServices.includes(s.id) ? 'selected' : ''}`}
                        onClick={() => toggleService(s.id)}
                      >
                        <span className="form-tile-icon">
                          <ServiceFormIcon name={SERVICE_ICONS[s.id] || 'wrench'} />
                        </span>
                        <span className="form-tile-label">{s.title}</span>
                        <span className="form-tile-desc">{s.description.length > 60 ? `${s.description.slice(0, 57)}…` : s.description}</span>
                      </button>
                    ))}
                  </div>
                  <div className="cta-row services-form-actions">
                    <button type="button" className="btn btn-primary" onClick={() => setFormStep(2)}>
                      Continue
                    </button>
                  </div>
                </div>
              )}
              {formStep === 2 && (
                <div className="form-step-panel reveal on">
                  <h3 className="form-step-title">Who are you?</h3>
                  <p className="micro" style={{ marginBottom: '20px' }}>This helps us tailor our response.</p>
                  <div className="form-tile-grid">
                    {PERSONAS.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        className={`form-tile ${persona === p.id ? 'selected' : ''}`}
                        onClick={() => setPersona(p.id)}
                      >
                        <span className="form-tile-icon"><ServiceFormIcon name={p.icon} /></span>
                        <span className="form-tile-label">{p.label}</span>
                        <span className="form-tile-desc">{p.desc}</span>
                      </button>
                    ))}
                  </div>
                  <div className="cta-row services-form-actions" style={{ gap: '12px' }}>
                    <button type="button" className="btn secondary" onClick={() => setFormStep(1)}>Back</button>
                    <button type="button" className="btn btn-primary" onClick={() => setFormStep(3)} disabled={!persona}>Continue</button>
                  </div>
                </div>
              )}
              {formStep === 3 && (
                <div className="form-step-panel reveal on">
                  <h3 className="form-step-title">A few quick questions</h3>
                  <p className="micro" style={{ marginBottom: '24px' }}>Scale and timeline help us recommend the right solution.</p>
                  <div className="services-form-fields">
                    <div className="form-group">
                      <label>Approximate monthly volume (orders or shipments)</label>
                      <input
                        type="text"
                        placeholder="e.g. 5,000 orders"
                        value={qualifying.volume}
                        onChange={(e) => setQualifying((q) => ({ ...q, volume: e.target.value }))}
                      />
                    </div>
                    <div className="form-group">
                      <label>Number of locations</label>
                      <input
                        type="text"
                        placeholder="e.g. 3"
                        value={qualifying.locations}
                        onChange={(e) => setQualifying((q) => ({ ...q, locations: e.target.value }))}
                      />
                    </div>
                    <div className="form-group">
                      <label>When do you want to start?</label>
                      <select
                        value={qualifying.timeline}
                        onChange={(e) => setQualifying((q) => ({ ...q, timeline: e.target.value }))}
                      >
                        <option value="">Select…</option>
                        <option value="ASAP">ASAP</option>
                        <option value="1-3 months">1–3 months</option>
                        <option value="3-6 months">3–6 months</option>
                        <option value="Exploring">Just exploring</option>
                      </select>
                    </div>
                  </div>
                  <div className="cta-row services-form-actions" style={{ gap: '12px' }}>
                    <button type="button" className="btn secondary" onClick={() => setFormStep(2)}>Back</button>
                    <button type="button" className="btn btn-primary" onClick={() => setFormStep(4)}>Continue</button>
                  </div>
                </div>
              )}
              {formStep === 4 && (
                <div className="form-step-panel reveal on">
                  <h3 className="form-step-title">Contact details</h3>
                  <p className="micro" style={{ marginBottom: '24px' }}>We'll reach out based on your selections.</p>
                  <div className="services-form-fields">
                    <div className="form-group">
                      <label>Name *</label>
                      <input
                        type="text"
                        required
                        value={contact.name}
                        onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                      />
                    </div>
                    <div className="form-group">
                      <label>Company *</label>
                      <input
                        type="text"
                        required
                        value={contact.company}
                        onChange={(e) => setContact((c) => ({ ...c, company: e.target.value }))}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        required
                        value={contact.email}
                        onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="tel"
                        value={contact.phone}
                        onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                      />
                    </div>
                    <div className="form-group">
                      <label>How did you hear about us? <span className="micro">(optional)</span></label>
                      <input
                        type="text"
                        value={contact.source}
                        onChange={(e) => setContact((c) => ({ ...c, source: e.target.value }))}
                      />
                    </div>
                  </div>
                  {submitStatus && (
                    <p className={submitStatus.ok ? 'success' : 'error'} style={{ marginTop: 16, marginBottom: 0 }}>
                      {submitStatus.message}
                    </p>
                  )}
                  <div className="cta-row services-form-actions" style={{ gap: '12px' }}>
                    <button type="button" className="btn secondary" onClick={() => setFormStep(3)} disabled={submitting}>Back</button>
                    <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting ? 'Sending...' : 'Submit request'}</button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </section>
      </div>
    </main>
    <Footer />
  </>
  )
}
