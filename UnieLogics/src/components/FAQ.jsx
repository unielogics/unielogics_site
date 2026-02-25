import { useState } from 'react'

const faqItems = [
  {
    q: 'What does the UnieLogics audit reveal?',
    a: 'Our audit engine analyzes thousands of data points across your operations to identify hidden capacity gaps, operational inefficiencies, cost-saving opportunities, and recommended integration strategies.',
  },
  {
    q: 'How long does integration take?',
    a: 'Integration timelines vary by scope. Most warehouses and carriers see initial connectivity within 2–4 weeks. Full predictive coordination is typically live within 8–12 weeks.',
  },
  {
    q: 'Does UnieLogics work with my existing WMS or TMS?',
    a: 'Yes. UnieLogics integrates with major warehouse and transportation management systems. We coordinate across your existing stack rather than replacing it.',
  },
  {
    q: 'What makes the network predictive?',
    a: 'We analyze demand signals, historical patterns, and real-time capacity to forecast where inventory should be placed and how freight should move before spikes occur.',
  },
  {
    q: 'Is there a minimum volume or operation size?',
    a: 'We serve operators from single-warehouse to nationwide networks. The audit helps determine the right entry point and ROI for your scale.',
  },
]

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)

  return (
    <section className="faq-section">
      <div className="wrap faq-wrap">
        <h2 className="section-title faq-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqItems.map((item, idx) => (
            <div
              key={idx}
              className={`faq-item ${openIdx === idx ? 'open' : ''}`}
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            >
              <button type="button" className="faq-question" aria-expanded={openIdx === idx}>
                {item.q}
                <span className="faq-icon" aria-hidden>+</span>
              </button>
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
