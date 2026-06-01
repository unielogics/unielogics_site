// IndustryPros — partner-program presentation page at /industry-pros.
//
// Structure (per plan §2):
//   1. Hero (split layout, sample-economics card on the right)
//   2. Long-scroll of the top 5 hero slides
//   3. "View the full deck" horizontal carousel with all 17 slides
//   4. Download PDF + Apply CTAs
//   5. Inline partner application form (posts to UnieSales)
//
// /industry-pros?print=1 sets <body data-print="1"> which the print stylesheet
// uses to hide the hero, carousel chrome, apply form, and footer — leaving
// only the 17 slides for headless Chrome to PDF.
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Anchor } from '../lib/nav'
import { submitToUnieSales } from '../../lib/leadApi'
import { useHoneypot } from '../../lib/Honeypot'
import { ALL_SLIDES, TOTAL_SLIDES } from '../components/IndustryProsSlides'
import '../styles/industry-pros.css'

const PARTNER_TYPES = [
  'Freight broker',
  '3PL consultant',
  'Warehouse advisor',
  'Ecommerce consultant',
  'Supply chain auditor',
  'WMS/OMS implementer',
  'Carrier relationship manager',
  'Marketplace consultant',
  'Advisor / other',
]

const BOOK_KINDS = [
  'Warehouses & 3PLs',
  'Ecommerce sellers / brands',
  'Distributors & wholesalers',
  'Manufacturers with LTL/FTL',
  'Marketplace operators',
  'Owner-operators',
  'Forwarders',
]

const AUDIT_SPECIALTIES = [
  'Billing leakage / invoice recovery',
  'Freight inefficiencies',
  'WMS / OMS workflow gaps',
  'Client retention',
  'Inventory / replenishment',
  'Margin / fees',
  'SLA / labor velocity',
  'Other',
]

const BOOK_SIZES = ['1–5', '6–20', '20–50', '50+']
const BILLING_MODELS = ['Success fee', 'Retainer', 'SaaS license', 'Hybrid']

const COMMISSION_ROWS = [
  { product: 'UnieWMS', pct: '90%', label: 'first-year' },
  { product: 'UnieWMS Renewals', pct: '30%', label: 'every year after' },
  { product: 'Cortex APIs', pct: '30%', label: 'ongoing' },
  { product: 'UnieConnect', pct: '30%', label: 'ongoing' },
  { product: 'LTL / FTL Tech', pct: '10%', label: 'eligible usage' },
]

function Tiles({ options, value, onToggle, multi = false }) {
  const arr = Array.isArray(value) ? value : []
  const isSel = (o) => (multi ? arr.includes(o) : value === o)
  return (
    <div className="ip-tile-grid">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          className={`ip-tile ${isSel(o) ? 'is-selected' : ''}`}
          onClick={() =>
            multi
              ? onToggle(arr.includes(o) ? arr.filter((x) => x !== o) : [...arr, o])
              : onToggle(o)
          }
          aria-pressed={isSel(o)}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

export default function IndustryPros() {
  const [searchParams] = useSearchParams()
  const isPrintMode = searchParams.get('print') === '1'

  // Page-level title + print-mode body flag for headless Chrome.
  useEffect(() => {
    const prevTitle = document.title
    document.title = 'UnieLogics — Industry Partner Program'
    if (isPrintMode) document.body.setAttribute('data-print', '1')
    return () => {
      document.title = prevTitle
      document.body.removeAttribute('data-print')
    }
  }, [isPrintMode])

  // Two modes: desktop ≥1024px → one-slide-at-a-time deck w/ prev/next;
  // smaller → natural vertical flow, every slide visible, scroll normally.
  const [isDesktopDeck, setIsDesktopDeck] = useState(
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)').matches : false,
  )
  useEffect(() => {
    if (isPrintMode) return
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktopDeck(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [isPrintMode])

  // Active slide — single source of truth. Desktop: driven by buttons / keys.
  // Mobile: driven by IntersectionObserver as the user scrolls.
  const [activeSlide, setActiveSlide] = useState(1)
  const goPrev = () => setActiveSlide((s) => Math.max(1, s - 1))
  const goNext = () => setActiveSlide((s) => Math.min(TOTAL_SLIDES, s + 1))

  // Keyboard nav on desktop (← → / PgUp PgDn).
  useEffect(() => {
    if (!isDesktopDeck || isPrintMode) return
    const onKey = (e) => {
      // Don't hijack typing in the apply form.
      const t = e.target
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return
      if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); goNext() }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); goPrev() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isDesktopDeck, isPrintMode])

  // Mobile: observe which slot is dominantly in view and update the HUD.
  useEffect(() => {
    if (isDesktopDeck || isPrintMode) return
    const slots = document.querySelectorAll('.ip-deck-slot')
    if (!slots.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.5) {
            const n = parseInt(e.target.dataset.n || '0', 10)
            if (n) setActiveSlide(n)
          }
        })
      },
      { threshold: [0.5] },
    )
    slots.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [isDesktopDeck, isPrintMode])

  // ─── Apply form state ────────────────────────────────────────────────────
  const [partnerType, setPartnerType] = useState([])
  const [represents, setRepresents] = useState([])
  const [audits, setAudits] = useState([])
  const [bookSize, setBookSize] = useState('')
  const [billing, setBilling] = useState('')
  const [contact, setContact] = useState({
    name: '', email: '', company: '', companyWebsite: '', phone: '', anythingElse: '',
  })
  const { field: honeypotField, getValue: getHoneypot } = useHoneypot()
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState(null)
  const [done, setDone] = useState(false)

  const canSubmit = useMemo(() => {
    return (
      partnerType.length > 0 &&
      represents.length > 0 &&
      audits.length > 0 &&
      !!bookSize &&
      !!billing &&
      contact.name.trim() &&
      contact.email.trim() &&
      contact.company.trim() &&
      contact.companyWebsite.trim() &&
      contact.phone.trim() &&
      contact.anythingElse.trim() &&
      !submitting
    )
  }, [partnerType, represents, audits, bookSize, billing, contact, submitting])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!canSubmit) return
    setSubmitting(true)
    setStatus(null)
    const result = await submitToUnieSales({
      // NOTE: backend `partner` tag isn't in the documented enum yet — using
      // get_started + fields.partner_program until the backend team adds it.
      tag: 'get_started',
      contact: {
        contactName: contact.name.trim(),
        email: contact.email.trim().toLowerCase(),
        phone: contact.phone.trim(),
        company: contact.company.trim(),
        title: 'Partner applicant',
      },
      fields: {
        partner_program: true,
        partnerType,
        representsBooks: represents,
        auditsOptimizes: audits,
        clientBookSize: bookSize,
        billingModel: billing,
        companyWebsite: contact.companyWebsite.trim(),
        anythingElse: contact.anythingElse.trim(),
        subForm: 'industry-pros',
      },
      hp_email: getHoneypot(),
    })
    setSubmitting(false)
    if (result.success) {
      setDone(true)
    } else {
      setStatus({ ok: false, message: result.error || 'Something went wrong. Please try again.' })
    }
  }

  return (
    <main className="ip-page">
      {/* ─── HERO (hidden in print) ────────────────────────────────────── */}
      <section className="ip-hero">
        <div className="ip-hero-inner">
          <div className="ip-hero-copy">
            <span className="ip-hero-pill">PARTNER PROGRAM · OPEN</span>
            <h1 className="ip-hero-title">
              Turn logistics relationships into <em>long-term recurring</em> income.
            </h1>
            <p className="ip-hero-sub">
              A corporate partner program for brokers, consultants, auditors, and industry
              professionals who can open doors in warehousing, freight, ecommerce, and
              supply chain operations. <strong>Audit-led selling. Recurring partner economics.</strong>
            </p>
            <div className="ip-hero-ctas">
              <Anchor href="#apply" className="ip-btn ip-btn-primary">
                Apply to the partner program →
              </Anchor>
              <a
                href="/industry-pros.pdf"
                className="ip-btn ip-btn-outline"
                download="UnieLogics-Industry-Partner-Program.pdf"
              >
                Download the deck (PDF) ↓
              </a>
            </div>
          </div>
          <aside className="ip-hero-card">
            <div className="ip-hero-card-tag mono">SAMPLE COMMISSION SCHEDULE</div>
            <div className="ip-hero-card-title">Eligible partner earnings</div>
            <ul className="ip-hero-card-rows">
              {COMMISSION_ROWS.map((r) => (
                <li key={r.product}>
                  <span className="ip-hero-card-product">{r.product}</span>
                  <span className="ip-hero-card-pct">{r.pct}</span>
                  <span className="ip-hero-card-label mono">{r.label}</span>
                </li>
              ))}
            </ul>
            <p className="ip-hero-card-fineprint">
              Based on eligible collected revenue and final partner terms.
              Not an earnings guarantee.
            </p>
          </aside>
        </div>
      </section>

      {/* ─── DECK (desktop: prev/next deck · mobile: natural scroll) ──── */}
      <section
        className={`ip-deck ${isDesktopDeck ? 'ip-deck-desktop' : 'ip-deck-mobile'}`}
        data-active-slide={activeSlide}
      >
        {ALL_SLIDES.map((SlideComp, i) => {
          const n = i + 1
          const isActive = activeSlide === n
          return (
            <div
              key={i}
              className={`ip-deck-slot ${isActive ? 'is-active' : ''}`}
              data-n={n}
              id={`slide-${String(n).padStart(2, '0')}`}
              aria-hidden={isDesktopDeck && !isActive}
            >
              <SlideComp />
            </div>
          )
        })}
        {isDesktopDeck && (
          <>
            <button
              type="button"
              className="ip-deck-nav ip-deck-prev"
              onClick={goPrev}
              disabled={activeSlide === 1}
              aria-label="Previous slide"
            >
              ‹
            </button>
            <button
              type="button"
              className="ip-deck-nav ip-deck-next"
              onClick={goNext}
              disabled={activeSlide === TOTAL_SLIDES}
              aria-label="Next slide"
            >
              ›
            </button>
          </>
        )}
      </section>

      {/* ─── Floating HUD ─────────────────────────────────────────────── */}
      <div className="ip-deck-hud" aria-hidden="false">
        <a
          href="/industry-pros.pdf"
          className="ip-btn ip-btn-outline ip-btn-sm"
          download="UnieLogics-Industry-Partner-Program.pdf"
        >
          Download PDF ↓
        </a>
        <span className="ip-deck-progress mono">
          {String(activeSlide).padStart(2, '0')} / {TOTAL_SLIDES}
        </span>
        <button
          type="button"
          className="ip-deck-jump-apply ip-btn ip-btn-primary ip-btn-sm"
          onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Apply →
        </button>
      </div>

      {/* ─── APPLY FORM (hidden in print) ───────────────────────────────── */}
      <section className="ip-apply-section" id="apply">
        <div className="ip-apply-inner">
          <header className="ip-apply-header">
            <span className="ip-apply-eyebrow mono">APPLY</span>
            <h2 className="ip-apply-title">Tell us about your book.</h2>
            <p className="ip-apply-sub">
              A real person responds within 2 business days. While we finalize a dedicated
              partner tag, your application lands in our get-started queue and our
              partnerships lead reaches out directly.
            </p>
          </header>

          {done ? (
            <div className="ip-apply-thanks">
              <div className="ip-apply-thanks-title">You're on the list.</div>
              <p>
                Thanks for raising your hand. We've routed your application to the partnerships
                lead — expect a real reply within two business days.
              </p>
            </div>
          ) : (
            <form className="ip-apply-form" onSubmit={handleSubmit} noValidate>
              {honeypotField}

              <div className="ip-form-block">
                <label className="ip-form-label">What kind of partner are you? *</label>
                <Tiles options={PARTNER_TYPES} value={partnerType} onToggle={setPartnerType} multi />
              </div>

              <div className="ip-form-block">
                <label className="ip-form-label">What books do you represent? *</label>
                <Tiles options={BOOK_KINDS} value={represents} onToggle={setRepresents} multi />
              </div>

              <div className="ip-form-block">
                <label className="ip-form-label">What do you audit or optimize for? *</label>
                <Tiles options={AUDIT_SPECIALTIES} value={audits} onToggle={setAudits} multi />
              </div>

              <div className="ip-form-row">
                <div className="ip-form-block">
                  <label className="ip-form-label">Client book size *</label>
                  <Tiles options={BOOK_SIZES} value={bookSize} onToggle={setBookSize} />
                </div>
                <div className="ip-form-block">
                  <label className="ip-form-label">How do you bill today? *</label>
                  <Tiles options={BILLING_MODELS} value={billing} onToggle={setBilling} />
                </div>
              </div>

              <div className="ip-form-row">
                <div className="ip-form-block">
                  <label className="ip-form-label">Your name *</label>
                  <input
                    type="text"
                    required
                    value={contact.name}
                    onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                  />
                </div>
                <div className="ip-form-block">
                  <label className="ip-form-label">Work email *</label>
                  <input
                    type="email"
                    required
                    value={contact.email}
                    onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                  />
                </div>
              </div>

              <div className="ip-form-row">
                <div className="ip-form-block">
                  <label className="ip-form-label">Company / brand name *</label>
                  <input
                    type="text"
                    required
                    value={contact.company}
                    onChange={(e) => setContact((c) => ({ ...c, company: e.target.value }))}
                  />
                </div>
                <div className="ip-form-block">
                  <label className="ip-form-label">Company website *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://yourbrand.com"
                    value={contact.companyWebsite}
                    onChange={(e) => setContact((c) => ({ ...c, companyWebsite: e.target.value }))}
                  />
                </div>
              </div>

              <div className="ip-form-block">
                <label className="ip-form-label">Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="+1 555 0100"
                  value={contact.phone}
                  onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                />
              </div>

              <div className="ip-form-block">
                <label className="ip-form-label">Anything else? *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Existing book size, target verticals, current audit positioning, expected close cadence — anything that sharpens our reply."
                  value={contact.anythingElse}
                  onChange={(e) => setContact((c) => ({ ...c, anythingElse: e.target.value }))}
                />
              </div>

              {status && !status.ok && (
                <p className="ip-form-error">{status.message}</p>
              )}

              <button
                type="submit"
                className="ip-btn ip-btn-primary ip-btn-submit"
                disabled={!canSubmit}
              >
                {submitting ? 'Sending…' : 'Apply to the partner program →'}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
