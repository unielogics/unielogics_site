import { useState } from 'react'
import { Anchor } from '../showcase/lib/nav'
import { submitToUnieSales } from '../lib/leadApi'

const BRAND_ICON = 'https://prepcenternearme.s3.us-east-1.amazonaws.com/unielogics/icononly.png'

const BACKGROUND_OPTIONS = [
  { id: 'ai', label: 'AI / ML', icon: 'cpu' },
  { id: 'ecommerce', label: 'Ecommerce', icon: 'store' },
  { id: 'logistics', label: 'Logistics', icon: 'truck' },
  { id: 'fullstack', label: 'Full-stack', icon: 'layers' },
  { id: 'integrations', label: 'Integrations', icon: 'plug' },
  { id: 'data', label: 'Data & Analytics', icon: 'chart' },
]

function DevIcon({ name, size = 24 }) {
  const stroke = 2
  const common = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: stroke }
  if (name === 'cpu') return <svg {...common} width={size} height={size}><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" /></svg>
  if (name === 'store') return <svg {...common} width={size} height={size}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
  if (name === 'truck') return <svg {...common} width={size} height={size}><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
  if (name === 'layers') return <svg {...common} width={size} height={size}><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /></svg>
  if (name === 'plug') return <svg {...common} width={size} height={size}><path d="M12 22v-5M9 8V2M15 8V2" /><path d="M18 8a4 4 0 0 1-8 0v2h8V8z" /><rect x="2" y="8" width="20" height="6" rx="2" /></svg>
  if (name === 'chart') return <svg {...common} width={size} height={size}><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
  return null
}

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [form, setForm] = useState({ name: '', email: '', phone: '', github: '', background: [], company: '', technologyToPublish: '' })
  const [hpEmail, setHpEmail] = useState('')
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [done, setDone] = useState(false)

  const toggleBackground = (id) => {
    setForm((f) => ({
      ...f,
      background: f.background.includes(id)
        ? f.background.filter((b) => b !== id)
        : [...f.background, id],
    }))
  }

  const handleDeveloperSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitStatus(null)
    const backgroundAreas = form.background
      .map((id) => BACKGROUND_OPTIONS.find((o) => o.id === id)?.label || id)
    const result = await submitToUnieSales({
      tag: 'developer',
      contact: {
        contactName: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        company: form.company.trim() || undefined,
      },
      fields: {
        githubUsername: form.github.trim(),
        backgroundAreas,
        technologyToPublish: form.technologyToPublish.trim() || '',
        message: form.technologyToPublish.trim() || '',
      },
      hp_email: hpEmail,
    })
    setSubmitting(false)
    if (result.success) {
      setDone(true)
      setForm({ name: '', email: '', phone: '', github: '', background: [], company: '', technologyToPublish: '' })
      setHpEmail('')
      setStep(1)
    } else {
      setSubmitStatus({ ok: false, message: result.error || 'Something went wrong. Please try again.' })
    }
  }

  const resetDeveloperForm = () => {
    setDone(false)
    setSubmitStatus(null)
  }

  const totalSteps = 5
  const canProceed = () => {
    if (step === 1) return form.name.trim() && form.email.trim() && form.phone.trim()
    if (step === 2) return form.github.trim()
    if (step === 3) return form.background.length > 0
    return true
  }

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div className="nav-logo" style={{ marginBottom: 18 }}>
            <img className="logo-img" src={BRAND_ICON} alt="UnieLogics" />
            UnieLogics
          </div>
          <p className="footer-tag">
            The operating intelligence for logistics, ecommerce, and transportation. Built from inside the system, for everyone who runs inside it.
          </p>
        </div>

        <div>
          <h4>Supply chain</h4>
          <ul>
            <li><Anchor href="/audit">Audit Your Business</Anchor></li>
            <li><Anchor href="/audit?type=label-spine">Audit your shipping</Anchor></li>
            <li><Anchor href="/audit?type=task-workflow">Audit your fulfillment</Anchor></li>
            <li><Anchor href="/audit?type=network">Audit your freight</Anchor></li>
          </ul>
        </div>

        <div>
          <h4>Operators</h4>
          <ul>
            <li><Anchor href="/join#apply">Join Our Supply Chain</Anchor></li>
            <li><Anchor href="/join#intelligence">The intelligence layer</Anchor></li>
            <li><Anchor href="/join#products">Product suite</Anchor></li>
            <li><a href="mailto:contact@unielogics.com">Contact</a></li>
          </ul>
        </div>

        <div className="footer-developer-widget">
          <h4 className="footer-developer-widget-title">Curious if we're a fit?</h4>
          <p className="footer-developer-widget-tagline">AI, ecommerce, logistics—request to explore.</p>
          {done ? (
            <div className="footer-thanks" role="status" aria-live="polite">
              <svg className="footer-thanks-check" viewBox="0 0 56 56" aria-hidden="true">
                <circle className="footer-thanks-check-circle" cx="28" cy="28" r="25" fill="none" />
                <path className="footer-thanks-check-tick" d="M16 29 L25 38 L41 20" fill="none" />
              </svg>
              <div className="footer-thanks-title">You're on the list.</div>
              <p className="footer-thanks-sub">Thanks for raising your hand. A real person on our team will reach out shortly to explore what we can build together.</p>
              <button type="button" className="footer-thanks-reset" onClick={resetDeveloperForm}>
                Submit another →
              </button>
            </div>
          ) : (
          <form className="footer-developer-form" onSubmit={handleDeveloperSubmit}>
            <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', height: 1, width: 1, overflow: 'hidden' }}>
              <label>
                Don't fill this out
                <input
                  name="hp_email"
                  type="text"
                  autoComplete="off"
                  tabIndex={-1}
                  value={hpEmail}
                  onChange={(e) => setHpEmail(e.target.value)}
                />
              </label>
            </div>
            <div className="footer-developer-pagination">
              {[1, 2, 3, 4, 5].map((s) => (
                <span
                  key={s}
                  className={`footer-developer-dot ${step === s ? 'active' : ''}`}
                  onClick={() => setStep(s)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setStep(s)}
                  aria-label={`Step ${s}`}
                />
              ))}
            </div>
            <div className="footer-developer-step-panel">
              {step === 1 && (
                <>
                  <div className="form-group footer-developer-field">
                    <label htmlFor="dev-name">Name</label>
                    <input id="dev-name" type="text" required placeholder="Your name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div className="form-group footer-developer-field">
                    <label htmlFor="dev-email">Email</label>
                    <input id="dev-email" type="email" required placeholder="you@example.com" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
                  </div>
                  <div className="form-group footer-developer-field footer-developer-field-wide">
                    <label htmlFor="dev-phone">Phone</label>
                    <input id="dev-phone" type="tel" required placeholder="+1 (555) 000-0000" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
                  </div>
                </>
              )}
              {step === 2 && (
                <div className="form-group footer-developer-field footer-developer-field-wide">
                  <label htmlFor="dev-github">GitHub</label>
                  <input id="dev-github" type="text" required placeholder="github.com/username or username" value={form.github} onChange={(e) => setForm((f) => ({ ...f, github: e.target.value }))} />
                </div>
              )}
              {step === 3 && (
                <div className="form-group footer-developer-field footer-developer-field-wide">
                  <label>Background</label>
                  <div className="footer-developer-icons">
                    {BACKGROUND_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        className={`footer-developer-icon-btn ${form.background.includes(opt.id) ? 'selected' : ''}`}
                        onClick={() => toggleBackground(opt.id)}
                      >
                        <DevIcon name={opt.icon} size={16} />
                        <span>{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {step === 4 && (
                <div className="form-group footer-developer-field footer-developer-field-wide">
                  <label htmlFor="dev-company">Company <span className="micro">(optional)</span></label>
                  <input id="dev-company" type="text" placeholder="Current employer" value={form.company} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))} />
                </div>
              )}
              {step === 5 && (
                <div className="form-group footer-developer-field footer-developer-field-wide">
                  <label htmlFor="dev-technology">Any current technology in the industry you'd like to publish? <span className="micro">(optional)</span></label>
                  <textarea id="dev-technology" rows={3} placeholder="Tools, APIs, open-source projects, etc." value={form.technologyToPublish} onChange={(e) => setForm((f) => ({ ...f, technologyToPublish: e.target.value }))} />
                </div>
              )}
            </div>
            <div className="footer-developer-form-actions">
              {step > 1 && (
                <button type="button" className="btn secondary footer-developer-btn footer-developer-back" onClick={() => setStep(step - 1)} disabled={submitting}>
                  Back
                </button>
              )}
              <span className="footer-developer-step-hint">{step} of {totalSteps}</span>
              {step < totalSteps ? (
                <button type="button" className="btn btn-primary footer-developer-btn" onClick={() => setStep(step + 1)} disabled={!canProceed() || submitting}>
                  Next
                </button>
              ) : (
                <button type="submit" className="btn btn-primary footer-developer-btn" disabled={!canProceed() || submitting}>
                  {submitting ? 'Sending...' : 'Request'}
                </button>
              )}
            </div>
            {submitStatus && !submitStatus.ok && (
              <p className="error" style={{ marginTop: 12, marginBottom: 0 }}>
                {submitStatus.message}
              </p>
            )}
          </form>
          )}
        </div>
      </div>

      <div className="footer-bottom">
        <div>© {currentYear} UnieLogics · The operating intelligence</div>
        <div>Built from inside the system.</div>
      </div>
    </footer>
  )
}
