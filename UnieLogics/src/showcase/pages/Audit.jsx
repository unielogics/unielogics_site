// Audit Your Business — single-scroll cortex-mirror form.
// Reference: https://uniecortex.com/audit-request (captured 2026-05-26).
//
// Layout: Hero → 01 Which audit + cards → 02 Where send your account
// (contact form) → 03 Anything else (notes textarea) → sticky bottom
// "YOUR AUDIT REQUEST" summary with submit. Top-right STEP n/5 indicator.
//
// Deep-linkable via /audit?type=<auditType>. The previous multi-step state
// (persona, common, specifics, scheduling) is dropped — cortex's form is
// flatter, and Franco asked for the same form.
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { submitAuditRequest } from '../../lib/auditApi'
import '../styles/audit-cortex.css'

// ─── Audit type catalog — unielogics's six options, with cortex-style
// subtitle / description / BEST FOR / TYPICAL metadata.
const AUDIT_TYPES = [
  {
    id: 'label-spine',
    title: 'Shipping & Label Audit',
    subtitle: 'Refunds in parcel invoices',
    description:
      'Audit FedEx · UPS · USPS · regional invoices for late deliveries, dim re-weighs, address corrections, fuel over-charges. Files claims before the dispute window closes.',
    bestFor: 'You ship 5,000+ parcels/month',
    typical: '$42k / month recoverable',
    iconTone: 'cyan',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    id: 'order-financial',
    title: 'Order Financial Audit',
    subtitle: 'Marketplace P&L · 2026 fees',
    description:
      'Drop your marketplace P&L. We re-build margin by lane + region with forward-looking fees applied. Surfaces where order economics break and which SKUs to drop.',
    bestFor: 'You sell on Amazon · Shopify · multi',
    typical: '+$18k re-allocation',
    iconTone: 'lavender',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <polygon points="12,3 22,12 12,21 2,12" />
      </svg>
    ),
  },
  {
    id: 'task-workflow',
    title: 'Warehouse & Workflow Audit',
    subtitle: 'Throughput · zones · operators',
    description:
      'Drop WMS exports (order_lines, ASN, billing). We score labor velocity per zone, surface bottlenecks, and recommend the operator + layout changes with the highest impact.',
    bestFor: 'You run a warehouse or 3PL',
    typical: '184 hr/week recoverable',
    iconTone: 'amber',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    id: 'network',
    title: 'Network Footprint Audit',
    subtitle: 'Coverage · regions · DC gaps',
    description:
      'Score how well your current DC footprint covers the demand you serve. We identify the single DC that closes the biggest coverage + cost gap and what the ROI looks like.',
    bestFor: 'You run multiple DCs or considering one',
    typical: '−14 days to coast',
    iconTone: 'emerald',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <circle cx="4" cy="6" r="2" />
        <circle cx="20" cy="6" r="2" />
        <circle cx="4" cy="18" r="2" />
        <circle cx="20" cy="18" r="2" />
        <line x1="6" y1="7" x2="10" y2="11" />
        <line x1="18" y1="7" x2="14" y2="11" />
        <line x1="6" y1="17" x2="10" y2="13" />
        <line x1="18" y1="17" x2="14" y2="13" />
      </svg>
    ),
  },
  {
    id: 'product-catalog',
    title: 'Product Catalog Audit',
    subtitle: 'Landed cost per SKU',
    description:
      'Cross-reference your catalog against demand + fulfillment cost. Identifies the SKUs that lose money once shipping and storage are loaded in, and what to do about them.',
    bestFor: 'You sell 500+ SKUs across channels',
    typical: 'Top-decile cost outliers found',
    iconTone: 'rose',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l8 4v12l-8 4-8-4V6z" />
        <line x1="12" y1="22" x2="12" y2="10" />
        <line x1="4" y1="6" x2="12" y2="10" />
        <line x1="20" y1="6" x2="12" y2="10" />
      </svg>
    ),
  },
  {
    id: 'complete-business',
    title: 'I\'m not sure yet',
    subtitle: 'Help me pick the right one',
    description:
      'We\'ll review your operation and recommend the audit with the highest recoverable dollars for your specific situation. A 10-minute call. No commitment.',
    bestFor: 'You want a recommendation',
    typical: 'We\'ll tell you',
    iconTone: 'muted',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M9 9a3 3 0 1 1 4.2 2.7c-.8.4-1.2 1-1.2 1.8" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
]

const ROLES = [
  'Founder / CEO',
  'COO / Ops lead',
  'Director of Logistics',
  'Procurement / Sourcing',
  'Finance / Controller',
  'Engineering / Integration',
  'Other',
]

export default function Audit() {
  const [searchParams] = useSearchParams()
  const [auditType, setAuditType] = useState(null)
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    workEmail: '',
    role: 'COO / Ops lead',
    company: '',
    companyWebsite: '',
    phone: '',
  })
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState(null) // { ok, message }
  const [done, setDone] = useState(false)

  // Tab title reflects the rename
  useEffect(() => {
    const prev = document.title
    document.title = 'Audit Your Business — UnieLogics'
    return () => {
      document.title = prev
    }
  }, [])

  // Deep-link
  useEffect(() => {
    const t = searchParams.get('type')
    if (t && AUDIT_TYPES.some((a) => a.id === t)) setAuditType(t)
  }, [searchParams])

  // Validity for step indicator + submit button
  const auditPicked = !!auditType
  const contactValid =
    contact.firstName.trim() &&
    contact.lastName.trim() &&
    contact.workEmail.trim() &&
    contact.company.trim()
  const notesProvided = notes.trim().length > 0

  // Step counter: 1 audit, 2 audit-picked, 3 contact-valid, 4 notes-provided, 5 submitting/done
  const stepN = useMemo(() => {
    if (done) return 5
    if (submitting) return 5
    if (notesProvided && contactValid && auditPicked) return 4
    if (contactValid && auditPicked) return 3
    if (auditPicked) return 2
    return 1
  }, [auditPicked, contactValid, notesProvided, submitting, done])

  const canSubmit = auditPicked && contactValid && !submitting

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!canSubmit) return
    setSubmitting(true)
    setStatus(null)
    const result = await submitAuditRequest({
      auditType,
      contact,
      notes: notes.trim() || undefined,
      source: 'UnieLogics Audit Your Business',
    })
    setSubmitting(false)
    if (result.success) {
      setDone(true)
    } else {
      setStatus({ ok: false, message: result.error || 'Something went wrong. Please try again.' })
    }
  }

  const selectedType = AUDIT_TYPES.find((a) => a.id === auditType)

  return (
    <main className="audit-cortex">
      {/* Top-right step indicator */}
      <div className="cx-step-indicator" aria-hidden="true">
        <span>Step {stepN}/5</span>
        <span className="step-bar">
          <div style={{ width: `${(stepN / 5) * 100}%` }} />
        </span>
      </div>

      {done ? (
        <section className="cx-done">
          <h1>
            <span className="accent">Check your email.</span>
          </h1>
          <p>
            We've sent your audit-request confirmation to{' '}
            <strong style={{ color: 'var(--cx-text)' }}>{contact.workEmail}</strong>. We'll
            route the right audit and reply with a one-time activation link within 1 business
            day. Your data stays inside your own systems.
          </p>
        </section>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* ─── Hero ─────────────────────────────────────────────────────── */}
          <section className="cx-hero">
            <span className="cx-hero-pill">FREE AUDIT · 10 MINUTES · LOCAL-FIRST</span>
            <h1 className="cx-hero-title">
              Tell us where it hurts.
              <span className="line2">We'll route the right audit.</span>
            </h1>
            <p className="cx-hero-sub">
              Six audit workflows. One operating intelligence. Pick the audit you want to
              run, tell us about your operation, and we'll email your activation link and a
              10-minute onboarding walk-through within 1 business day.
            </p>
            <div className="cx-hero-stats">
              <div>
                <div className="cx-stat-num">10 min</div>
                <div className="cx-stat-label">audit cycle</div>
              </div>
              <div>
                <div className="cx-stat-num">4-track</div>
                <div className="cx-stat-label">AI per decision</div>
              </div>
              <div>
                <div className="cx-stat-num">$0</div>
                <div className="cx-stat-label">to run an audit</div>
              </div>
              <div>
                <div className="cx-stat-num">1 biz day</div>
                <div className="cx-stat-label">access turnaround</div>
              </div>
            </div>
          </section>

          {/* ─── 01 Which audit do you want to run? ───────────────────────── */}
          <section className="cx-section" id="audit-pick">
            <div className="cx-section-label">
              <div className="cx-step-num">01</div>
              <h2>Which audit do you want to run?</h2>
              <span className="cx-required-pill">Required</span>
              <p className="cx-section-helper">
                Pick one. Each takes ~10 minutes and returns a four-track recommendation
                with a recoverable-dollar band.
              </p>
            </div>
            <div className="cx-cards-grid">
              {AUDIT_TYPES.map((a) => (
                <button
                  type="button"
                  key={a.id}
                  className={`cx-card ${auditType === a.id ? 'selected' : ''}`}
                  onClick={() => setAuditType(a.id)}
                  aria-pressed={auditType === a.id}
                >
                  <div className="cx-card-head">
                    <span className={`cx-card-icon tone-${a.iconTone}`}>{a.icon}</span>
                    <span className="cx-card-radio" />
                  </div>
                  <div className="cx-card-title">{a.title}</div>
                  <div className="cx-card-subtitle">{a.subtitle}</div>
                  <p className="cx-card-desc">{a.description}</p>
                  <div className="cx-card-stats">
                    <span className="cx-card-stat-key">Best for</span>
                    <span className="cx-card-stat-val">{a.bestFor}</span>
                    <span className="cx-card-stat-key">Typical</span>
                    <span className="cx-card-stat-val accent">{a.typical}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* ─── 02 Where should we send your account? ────────────────────── */}
          <section className="cx-section" id="audit-contact">
            <div className="cx-section-label">
              <div className="cx-step-num">02</div>
              <h2>Where should we send your audit?</h2>
              <span className="cx-required-pill">Required</span>
              <p className="cx-section-helper">
                We'll route the audit + onboarding link to your inbox within 1 business
                day. Your data stays local-first — we never ingest client information.
              </p>
            </div>
            <div className="cx-form-grid">
              <div className="cx-field">
                <label>
                  First name <span className="req">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={contact.firstName}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, firstName: e.target.value }))
                  }
                />
              </div>
              <div className="cx-field">
                <label>
                  Last name <span className="req">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={contact.lastName}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, lastName: e.target.value }))
                  }
                />
              </div>
              <div className="cx-field cx-field-full">
                <label>
                  Work email <span className="req">*</span>
                  <span className="helper">· we'll send your activation link here</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="jane@yourbrand.com"
                  value={contact.workEmail}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, workEmail: e.target.value }))
                  }
                />
              </div>
              <div className="cx-field">
                <label>Role</label>
                <select
                  value={contact.role}
                  onChange={(e) => setContact((c) => ({ ...c, role: e.target.value }))}
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div className="cx-field">
                <label>
                  Company <span className="req">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={contact.company}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, company: e.target.value }))
                  }
                />
              </div>
              <div className="cx-field cx-field-full">
                <label>
                  Company website <span className="helper">· optional</span>
                </label>
                <input
                  type="url"
                  placeholder="https://yourbrand.com"
                  value={contact.companyWebsite}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, companyWebsite: e.target.value }))
                  }
                />
              </div>
              <div className="cx-field cx-field-full">
                <label>
                  Phone{' '}
                  <span className="helper">· optional · for high-volume operators</span>
                </label>
                <input
                  type="tel"
                  placeholder="+1 555 0100"
                  value={contact.phone}
                  onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                />
              </div>
            </div>
          </section>

          {/* ─── 03 Anything else? ────────────────────────────────────────── */}
          <section className="cx-section" id="audit-notes">
            <div className="cx-section-label">
              <div className="cx-step-num">03</div>
              <h2>Anything else we should know?</h2>
              <p className="cx-section-helper">
                Specific carriers in play, marketplace channels, weird edge-cases,
                deadlines, links to data — anything that sharpens the audit.
              </p>
            </div>
            <div className="cx-form-grid">
              <div className="cx-field cx-field-full">
                <textarea
                  className="cx-textarea"
                  placeholder="e.g. Mid-sized 3PL on the East Coast running 12 facilities. FedEx is our primary carrier but we suspect we're overpaying on dim weights. Aiming to have a recovery plan by Q3."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* ─── Sticky summary + submit ──────────────────────────────────── */}
          <div className="cx-summary">
            <div className="cx-summary-inner">
              <div>
                <div className="cx-summary-grid">
                  <div>
                    <div className="cx-summary-eyebrow">Audit</div>
                    <div className={`cx-summary-val ${selectedType ? '' : 'empty'}`}>
                      {selectedType ? selectedType.title : '— pick one above'}
                    </div>
                  </div>
                  <div>
                    <div className="cx-summary-eyebrow">Contact</div>
                    <div className={`cx-summary-val ${contactValid ? '' : 'empty'}`}>
                      {contactValid
                        ? `${contact.firstName} ${contact.lastName} · ${contact.company}`
                        : '—'}
                    </div>
                  </div>
                  <div>
                    <div className="cx-summary-eyebrow">Notes</div>
                    <div className={`cx-summary-val ${notesProvided ? '' : 'empty'}`}>
                      {notesProvided ? `${notes.trim().length} chars` : 'none yet'}
                    </div>
                  </div>
                </div>
                {status && !status.ok && (
                  <p className="cx-error" style={{ marginTop: 10 }}>
                    {status.message}
                  </p>
                )}
                <p className="cx-fine-print">
                  By submitting, you agree to UnieLogics's terms. Your data stays
                  local-first — no client information leaves your network until you grant
                  access.
                </p>
              </div>
              <button type="submit" className="cx-submit" disabled={!canSubmit}>
                {submitting
                  ? 'Sending…'
                  : canSubmit
                    ? 'Audit Your Business →'
                    : 'Complete required fields'}
              </button>
            </div>
          </div>
        </form>
      )}
    </main>
  )
}
