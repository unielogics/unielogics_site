import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { submitLead } from '../lib/leadApi'

const PROBLEMS = [
  {
    id: 'warehouses',
    title: 'Warehouses: Space & Labor',
    content: 'Warehouses struggle with space utilization and employee allocation. Inefficient layout and labor scheduling lead to wasted capacity, overtime costs, and missed throughput. Small and mid-sized operators lack the tools that large players use to optimize both.'
  },
  {
    id: 'courier-pricing',
    title: 'Courier Pricing Is Broken',
    content: 'Last-mile and courier pricing is fragmented and opaque. Rates swing wildly, and small operators often pay a premium because they lack volume leverage and visibility. The result: delivery costs that are far too expensive and unpredictable.'
  },
  {
    id: 'small-operators',
    title: 'Small Operators Are Locked Out',
    content: 'Matching technology and service pricing have long been the domain of large enterprises. Small operators cannot access the same demand matching, network intelligence, or fair pricing due to financial limitations—leaving them at a structural disadvantage.'
  }
]

const HERO_PARAGRAPH = [
  'Warehouses struggle with space utilization and employee allocation—inefficient layout and labor scheduling lead to wasted capacity, overtime costs, and missed throughput, while small and mid-sized operators lack the tools that large players use to optimize both. ',
  'Last-mile and courier pricing is fragmented and opaque: rates swing wildly, and small operators often pay a premium because they lack volume leverage and visibility, resulting in delivery costs that are far too expensive and unpredictable. ',
  'Matching technology and fair service pricing have long been the domain of large enterprises—small operators cannot access the same demand matching, network intelligence, or fair pricing due to financial limitations, leaving them at a structural disadvantage.'
].join('')

export default function IndustryProblems() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [contact, setContact] = useState({ name: '', email: '', company: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [carouselPaused, setCarouselPaused] = useState(false)
  const revealRefs = useRef([])
  const carouselRef = useRef(null)
  const resumeTimeoutRef = useRef(null)

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

  useEffect(() => {
    if (carouselPaused) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % PROBLEMS.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [carouselPaused])

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    }
  }, [])

  const handleCarouselPause = () => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current)
      resumeTimeoutRef.current = null
    }
    setCarouselPaused(true)
  }

  const handleCarouselResume = () => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    resumeTimeoutRef.current = setTimeout(() => setCarouselPaused(false), 4000)
  }

  const handleCarouselHoverStart = () => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current)
      resumeTimeoutRef.current = null
    }
    setCarouselPaused(true)
  }

  const handleCarouselHoverEnd = () => {
    setCarouselPaused(false)
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitStatus(null)
    const result = await submitLead({
      name: contact.name,
      email: contact.email,
      company: contact.company,
      notes: contact.message,
      source: 'UnieLogics Industry Problems',
    })
    setSubmitting(false)
    if (result.success) {
      setSubmitStatus({ ok: true, message: "Thanks! We'll reach out shortly." })
      setContact({ name: '', email: '', company: '', message: '' })
    } else {
      setSubmitStatus({ ok: false, message: result.error || 'Something went wrong. Please try again.' })
    }
  }

  return (
    <>
    <main>
      <div className="wrap">
        <section className="page-hero page-section">
          <h1 className="page-title">Industry Problems</h1>
          <p className="page-hero-paragraph">{HERO_PARAGRAPH}</p>
        </section>

        <section className="page-section reveal" ref={(el) => (revealRefs.current[0] = el)}>
          <h2 className="section-title">The Structural Gaps</h2>
          <p className="statement">These are the problems we're solving.</p>

          <div
            className="problems-carousel"
            ref={carouselRef}
            onMouseEnter={handleCarouselHoverStart}
            onMouseLeave={handleCarouselHoverEnd}
            onTouchStart={handleCarouselPause}
            onTouchEnd={handleCarouselResume}
            onTouchCancel={handleCarouselResume}
          >
            <div
              className="problems-carousel-track"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {PROBLEMS.map((problem) => (
                <div key={problem.id} className="problems-carousel-slide">
                  <div className="integration-item">
                    <h3>{problem.title}</h3>
                    <p>{problem.content}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="carousel-nav" aria-label="Carousel navigation">
              <button
                type="button"
                className="carousel-arrow carousel-arrow-prev"
                aria-label="Previous slide"
                onClick={() => setCurrentSlide((prev) => (prev - 1 + PROBLEMS.length) % PROBLEMS.length)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <div className="carousel-dots">
                {PROBLEMS.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`carousel-dot ${currentSlide === idx ? 'active' : ''}`}
                    aria-label={`Go to slide ${idx + 1}`}
                    aria-current={currentSlide === idx ? 'true' : undefined}
                    onClick={() => setCurrentSlide(idx)}
                  />
                ))}
              </div>
              <button
                type="button"
                className="carousel-arrow carousel-arrow-next"
                aria-label="Next slide"
                onClick={() => setCurrentSlide((prev) => (prev + 1) % PROBLEMS.length)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          </div>
        </section>

        <section className="page-section problems-contact-section reveal" ref={(el) => (revealRefs.current[4] = el)}>
          <div className="problems-contact-grid">
            <div className="problems-contact-content">
              <h2 className="section-title">We Are Changing the Game</h2>
              <p className="statement">
                UnieLogics gives small and medium-sized operators access to the same kind of intelligence that was once exclusive to large corporations.
              </p>
              <p className="micro">
                We unify warehouses, carriers, couriers, and sellers in one interconnected network—so that space, labor, and delivery pricing can be optimized instead of left to chance. By leveraging AI and a single platform, we identify inefficiencies that are nearly impossible to see when operating in isolation.
              </p>
              <p className="micro">
                Suppliers, buyers, distributors, transportation companies, and warehouses collaborate seamlessly: costs go down, speed improves, and the ecosystem becomes more balanced. Our mission is to level the playing field—making matching technology and fair service pricing accessible to everyone, not just those with the deepest pockets.
              </p>
              <p className="micro" style={{ marginTop: '16px', marginBottom: 0 }}>
                <Link to="/solutions">See how we unify the market</Link>
              </p>
            </div>
            <div className="problems-contact-form-wrap">
              <form className="problems-contact-form" onSubmit={handleContactSubmit}>
                <h3 className="section-title">Contact us</h3>
                <div className="form-group">
                  <label htmlFor="ip-name">Name</label>
                  <input
                    id="ip-name"
                    type="text"
                    value={contact.name}
                    onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="ip-email">Email</label>
                  <input
                    id="ip-email"
                    type="email"
                    required
                    value={contact.email}
                    onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="ip-company">Company</label>
                  <input
                    id="ip-company"
                    type="text"
                    value={contact.company}
                    onChange={(e) => setContact((c) => ({ ...c, company: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="ip-message">Message</label>
                  <textarea
                    id="ip-message"
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
