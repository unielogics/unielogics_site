import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Footer from '../components/Footer'
import { submitLead } from '../lib/leadApi'

const PERSONAS = [
  { id: 'warehouse', label: 'Warehouse operator', desc: '3PL, fulfillment, or warehouse ops', icon: 'warehouse' },
  { id: 'freight', label: 'Freight broker', desc: 'LTL/FTL, carrier matching', icon: 'truck' },
  { id: 'courier', label: 'Courier', desc: 'Last-mile, local delivery', icon: 'van' },
  { id: 'brand', label: 'Ecommerce / Brand', desc: 'Nationwide optimization', icon: 'store' }
]

const SOLUTIONS = [
  { id: 'audit', label: 'Audit', desc: 'Network & operations audit', icon: 'audit' },
  { id: 'implementation', label: 'Implementation', desc: 'Product rollout & integration', icon: 'wrench' },
  { id: 'nationwide', label: 'Nationwide optimization', desc: 'Inventory & network placement', icon: 'map' },
  { id: 'demo', label: 'Product demo', desc: 'UnieWMS, UnieFreight, UnieCourier', icon: 'demo' }
]

function Icon({ name }) {
  const size = 40
  const stroke = 2
  const common = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: stroke }
  if (name === 'warehouse')
    return <svg {...common} width={size} height={size}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
  if (name === 'truck')
    return <svg {...common} width={size} height={size}><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
  if (name === 'van')
    return <svg {...common} width={size} height={size}><rect x="1" y="4" width="18" height="12" rx="1" /><path d="M19 8h2v8h-2" /><path d="M5 8h14" /></svg>
  if (name === 'store')
    return <svg {...common} width={size} height={size}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
  if (name === 'audit')
    return <svg {...common} width={size} height={size}><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
  if (name === 'wrench')
    return <svg {...common} width={size} height={size}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
  if (name === 'map')
    return <svg {...common} width={size} height={size}><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" /></svg>
  if (name === 'demo')
    return <svg {...common} width={size} height={size}><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
  return null
}

export default function GetStarted() {
  const [searchParams] = useSearchParams()
  const [step, setStep] = useState(1)
  const [persona, setPersona] = useState(null)
  const [solution, setSolution] = useState(null)
  const [qualifying, setQualifying] = useState({
    volume: '',
    locations: '',
    timeline: ''
  })
  const [contact, setContact] = useState({ name: '', company: '', email: '', phone: '', source: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // { ok: boolean, message: string }

  useEffect(() => {
    const type = searchParams.get('type')
    if (type && PERSONAS.some((p) => p.id === type)) {
      setPersona(type)
    }
  }, [searchParams])

  const buildMailtoBody = () => {
    const lines = [
      'Get Started submission',
      '---',
      `Persona: ${persona || 'Not selected'}`,
      `Solution interest: ${solution || 'Not selected'}`,
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitStatus(null)
    const notes = [
      `Persona: ${persona || 'Not selected'}`,
      `Solution interest: ${solution || 'Not selected'}`,
      `Monthly volume: ${qualifying.volume || 'N/A'}`,
      `Locations: ${qualifying.locations || 'N/A'}`,
      `Timeline: ${qualifying.timeline || 'N/A'}`,
      `How did you hear: ${contact.source || 'N/A'}`,
    ].join('\n')
    const result = await submitLead({
      name: contact.name,
      email: contact.email,
      phone: contact.phone || undefined,
      company: contact.company,
      notes,
      source: 'UnieLogics Get Started',
    })
    setSubmitting(false)
    if (result.success) {
      setSubmitStatus({ ok: true, message: "Thanks! We'll reach out shortly." })
      setContact({ name: '', company: '', email: '', phone: '', source: '' })
      setStep(1)
      setPersona(null)
      setSolution(null)
      setQualifying({ volume: '', locations: '', timeline: '' })
    } else {
      setSubmitStatus({ ok: false, message: result.error || 'Something went wrong. Please try again.' })
    }
  }

  return (
    <>
      <main>
        <div className="wrap get-started-wrap">
          <section className="get-started-unified">
            <div className="get-started-header">
              <h1 className="page-title">Get Started</h1>
              <p className="page-subtitle">
                Tell us who you are and what you're looking for. We'll match you with the right solution.
              </p>
              <div className="micro" style={{ marginTop: '16px' }}>
                Step {step} of 4
              </div>
              <div className="get-started-progress">
                <div className="get-started-progress-bar" style={{ width: `${(step / 4) * 100}%` }} />
              </div>
            </div>

            <form className="get-started-form" onSubmit={(e) => { e.preventDefault(); if (step < 4) setStep((s) => s + 1); else handleSubmit(e); }}>
              {/* Step 1: Who are you? */}
              {step === 1 && (
                <div className="form-step-panel reveal on">
                  <h2 className="section-title">Who are you?</h2>
                  <p className="micro" style={{ marginBottom: '16px' }}>Select the option that best describes you.</p>
                  <div className="form-tile-grid">
                    {PERSONAS.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        className={`form-tile ${persona === p.id ? 'selected' : ''}`}
                        onClick={() => setPersona(p.id)}
                      >
                        <span className="form-tile-icon"><Icon name={p.icon} /></span>
                        <span className="form-tile-label">{p.label}</span>
                        <span className="form-tile-desc">{p.desc}</span>
                      </button>
                    ))}
                  </div>
                  <div className="cta-row" style={{ justifyContent: 'center', marginTop: '28px' }}>
                    <button type="button" className="btn" onClick={() => setStep(2)} disabled={!persona}>
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: What are you looking for? */}
              {step === 2 && (
                <div className="form-step-panel reveal on">
                  <h2 className="section-title">What are you looking for?</h2>
                  <p className="micro" style={{ marginBottom: '16px' }}>We'll use this to recommend the right solution.</p>
                  <div className="form-tile-grid">
                    {SOLUTIONS.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        className={`form-tile ${solution === s.id ? 'selected' : ''}`}
                        onClick={() => setSolution(s.id)}
                      >
                        <span className="form-tile-icon"><Icon name={s.icon} /></span>
                        <span className="form-tile-label">{s.label}</span>
                        <span className="form-tile-desc">{s.desc}</span>
                      </button>
                    ))}
                  </div>
                  <div className="cta-row" style={{ justifyContent: 'center', marginTop: '28px', gap: '12px' }}>
                    <button type="button" className="btn secondary" onClick={() => setStep(1)}>Back</button>
                    <button type="button" className="btn" onClick={() => setStep(3)} disabled={!solution}>Continue</button>
                  </div>
                </div>
              )}

              {/* Step 3: Qualifying questions */}
              {step === 3 && (
                <div className="form-step-panel reveal on">
                  <h2 className="section-title">A few quick questions</h2>
                  <p className="micro" style={{ marginBottom: '24px' }}>Scale and timeline help us tailor our response.</p>
                  <div style={{ maxWidth: 480, margin: '0 auto' }}>
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                      <label>Approximate monthly volume (orders or shipments)</label>
                      <input
                        type="text"
                        placeholder="e.g. 5,000 orders"
                        value={qualifying.volume}
                        onChange={(e) => setQualifying((q) => ({ ...q, volume: e.target.value }))}
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                      <label>Number of locations</label>
                      <input
                        type="text"
                        placeholder="e.g. 3"
                        value={qualifying.locations}
                        onChange={(e) => setQualifying((q) => ({ ...q, locations: e.target.value }))}
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                      <label>When do you want to start?</label>
                      <select
                        value={qualifying.timeline}
                        onChange={(e) => setQualifying((q) => ({ ...q, timeline: e.target.value }))}
                      >
                        <option value="">Select...</option>
                        <option value="ASAP">ASAP</option>
                        <option value="1-3 months">1–3 months</option>
                        <option value="3-6 months">3–6 months</option>
                        <option value="Exploring">Just exploring</option>
                      </select>
                    </div>
                  </div>
                  <div className="cta-row" style={{ justifyContent: 'center', marginTop: '28px', gap: '12px' }}>
                    <button type="button" className="btn secondary" onClick={() => setStep(2)}>Back</button>
                    <button type="button" className="btn" onClick={() => setStep(4)}>Continue</button>
                  </div>
                </div>
              )}

              {/* Step 4: Contact & submit */}
              {step === 4 && (
                <div className="form-step-panel reveal on">
                  <h2 className="section-title">Contact details</h2>
                  <p className="micro" style={{ marginBottom: '24px' }}>We'll reach out based on your selections.</p>
                  <div style={{ maxWidth: 480, margin: '0 auto' }}>
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                      <label>Name *</label>
                      <input
                        type="text"
                        required
                        value={contact.name}
                        onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                      <label>Company *</label>
                      <input
                        type="text"
                        required
                        value={contact.company}
                        onChange={(e) => setContact((c) => ({ ...c, company: e.target.value }))}
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                      <label>Email *</label>
                      <input
                        type="email"
                        required
                        value={contact.email}
                        onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                      <label>Phone</label>
                      <input
                        type="tel"
                        value={contact.phone}
                        onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                      <label>How did you hear about us? <span className="micro">(optional)</span></label>
                      <input
                        type="text"
                        placeholder=""
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
                  <div className="cta-row" style={{ justifyContent: 'center', marginTop: '28px', gap: '12px' }}>
                    <button type="button" className="btn secondary" onClick={() => setStep(3)} disabled={submitting}>Back</button>
                    <button type="submit" className="btn" disabled={submitting}>{submitting ? 'Sending...' : 'Submit'}</button>
                  </div>
                </div>
              )}
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
