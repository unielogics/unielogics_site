// IndustryPros — Industry Account Executive program presentation at /industry-pros.
//
// Structure:
//   1. Hero (split layout, sample-economics card on the right)
//   2. Deck — desktop ≥1024px: one slide at a time with a centered bottom
//      nav bar (PREV | counter | NEXT) + keyboard arrows.
//      Mobile <1024px: all 17 slides flow vertically at natural height.
//   3. Floating HUD (top-right desktop / bottom-pinned mobile) with
//      slide counter, Download PDF, and Apply → uniecortex.
//
// All "Apply" CTAs forward to https://uniecortex.com/industry-pros in a
// new tab. There is intentionally no in-page form on this surface.
//
// /industry-pros?print=1 sets <body data-print="1">; the print + ?print=1
// rules in industry-pros.css override the deck modes so every slot
// renders statically and paginates for the PDF.
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ALL_SLIDES, TOTAL_SLIDES } from '../components/IndustryProsSlides'
import '../styles/industry-pros.css'

const APPLY_URL = 'https://uniecortex.com/industry-pros'

const COMMISSION_ROWS = [
  { product: 'UnieWMS', pct: '90%', label: 'first-year' },
  { product: 'UnieWMS Renewals', pct: '30%', label: 'every year after' },
  { product: 'Cortex APIs', pct: '30%', label: 'ongoing' },
  { product: 'UnieConnect', pct: '30%', label: 'ongoing' },
  { product: 'LTL / FTL Tech', pct: '10%', label: 'eligible usage' },
]

export default function IndustryPros() {
  const [searchParams] = useSearchParams()
  const isPrintMode = searchParams.get('print') === '1'

  // Page-level title + print-mode body flag for headless Chrome.
  useEffect(() => {
    const prevTitle = document.title
    document.title = 'UnieLogics — Industry Account Executive Program'
    if (isPrintMode) document.body.setAttribute('data-print', '1')
    return () => {
      document.title = prevTitle
      document.body.removeAttribute('data-print')
    }
  }, [isPrintMode])

  // Two modes split at 1024px.
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

  // Keyboard nav on desktop (← → / PgUp PgDn). Suppressed while typing.
  useEffect(() => {
    if (!isDesktopDeck || isPrintMode) return
    const onKey = (e) => {
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

  return (
    <main className="ip-page">
      {/* ─── HERO (hidden in print) ────────────────────────────────────── */}
      <section className="ip-hero">
        <div className="ip-hero-inner">
          <div className="ip-hero-copy">
            <span className="ip-hero-pill">ACCOUNT EXECUTIVE PROGRAM · OPEN</span>
            <h1 className="ip-hero-title">
              Turn logistics relationships into <em>long-term recurring</em> income.
            </h1>
            <p className="ip-hero-sub">
              UnieLogics' Account Executive program for brokers, consultants, auditors, and industry
              professionals who can open doors in warehousing, freight, ecommerce, and supply chain
              operations. <strong>Audit-led selling. Recurring AE economics.</strong>
            </p>
            <div className="ip-hero-ctas">
              <a
                href={APPLY_URL}
                target="_blank"
                rel="noreferrer"
                className="ip-btn ip-btn-primary"
              >
                Become an Account Executive ↗
              </a>
              <a
                href="/industry-pros.pdf"
                className="ip-btn ip-btn-outline"
                download="UnieLogics-Account-Executive-Program.pdf"
              >
                Download the deck (PDF) ↓
              </a>
            </div>
          </div>
          <aside className="ip-hero-card">
            <div className="ip-hero-card-tag mono">SAMPLE COMMISSION SCHEDULE</div>
            <div className="ip-hero-card-title">Eligible Account Executive earnings</div>
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
              Based on eligible collected revenue and final Account Executive terms.
              Not an earnings guarantee.
            </p>
          </aside>
        </div>
        <div className="ip-hero-scrollcue" aria-hidden="true">
          <span>Scroll for the deck</span>
          <span className="ip-hero-scrollcue-arrow">↓</span>
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

        {/* Desktop bottom-center control bar — clear, visible, and inside
            the deck frame so the user always sees how to advance. */}
        {isDesktopDeck && (
          <div className="ip-deck-controls" role="group" aria-label="Deck navigation">
            <button
              type="button"
              className="ip-deck-control"
              onClick={goPrev}
              disabled={activeSlide === 1}
              aria-label="Previous slide"
            >
              <span aria-hidden="true">‹</span> Previous
            </button>
            <span className="ip-deck-controls-counter mono">
              {String(activeSlide).padStart(2, '0')} / {TOTAL_SLIDES}
            </span>
            <button
              type="button"
              className="ip-deck-control ip-deck-control-next"
              onClick={goNext}
              disabled={activeSlide === TOTAL_SLIDES}
              aria-label="Next slide"
            >
              Next <span aria-hidden="true">›</span>
            </button>
          </div>
        )}
      </section>

      {/* ─── Floating HUD ─────────────────────────────────────────────── */}
      <div className="ip-deck-hud" aria-hidden="false">
        <a
          href="/industry-pros.pdf"
          className="ip-btn ip-btn-outline ip-btn-sm"
          download="UnieLogics-Account-Executive-Program.pdf"
        >
          Download PDF ↓
        </a>
        <span className="ip-deck-progress mono">
          {String(activeSlide).padStart(2, '0')} / {TOTAL_SLIDES}
        </span>
        <a
          href={APPLY_URL}
          target="_blank"
          rel="noreferrer"
          className="ip-btn ip-btn-primary ip-btn-sm"
        >
          Apply ↗
        </a>
      </div>
    </main>
  )
}
