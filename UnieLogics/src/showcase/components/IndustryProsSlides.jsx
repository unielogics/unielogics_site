// IndustryProsSlides — 17-slide partner program deck.
//
// Each slide is a React function component returning <Slide>. The same DOM
// renders both the long-scroll hero stack at top of /industry-pros AND the
// horizontal carousel below — the container CSS handles sizing. The same
// markup is what headless Chrome captures to generate public/industry-pros.pdf
// (one slide → one printed page).
//
// Source content: user-supplied 17-slide "Turn Logistics Relationships Into
// Long-Term Recurring Income" partner program presentation. Every figure
// (90%, 30%, $42K, etc.) is copied verbatim from the source — nothing is
// invented in this file.

import { CortexOrbital } from './CortexOrbital'
import { UnieConnectThumb } from './sections'

const BRAND_ICON = 'https://prepcenternearme.s3.us-east-1.amazonaws.com/unielogics/icononly.png'
const UNIEWMS_PNG = 'https://prepcenternearme.s3.us-east-1.amazonaws.com/unielogics/uniewms+(2).png'
const UNIEFREIGHT_PNG = 'https://prepcenternearme.s3.us-east-1.amazonaws.com/unielogics/UNIEFREIGHT.png'

export const TOTAL_SLIDES = 17

/* ─── Slide chrome ────────────────────────────────────────────────────────── */
export function Slide({ n, eyebrow, disclaimer, children, accent = 'lime' }) {
  return (
    <section
      className={`ip-slide ip-slide-${n} ip-accent-${accent}`}
      data-slide={n}
      aria-label={`Slide ${n} of ${TOTAL_SLIDES}`}
    >
      <header className="ip-slide-header">
        <span className="ip-slide-eyebrow">{eyebrow}</span>
        <span className="ip-slide-count mono">{String(n).padStart(2, '0')} / {TOTAL_SLIDES}</span>
      </header>
      <div className="ip-slide-body">{children}</div>
      {disclaimer && <div className="ip-slide-disclaimer">{disclaimer}</div>}
      <footer className="ip-slide-footer">
        <img className="ip-slide-brand" src={BRAND_ICON} alt="UnieLogics" />
        <span className="ip-slide-prog">UnieLogics · Industry Partner Program</span>
        <span className="ip-slide-confidential mono">UnieLogics — Confidential Partner Presentation</span>
      </footer>
    </section>
  )
}

/* ─── 01 Cover ────────────────────────────────────────────────────────────── */
export function Slide01() {
  return (
    <Slide n={1} eyebrow="CORE POSITION">
      <div className="ip-cover-grid">
        <div className="ip-cover-copy">
          <h1 className="ip-cover-title">
            Turn Logistics<br />
            Relationships Into<br />
            <em>Long-Term Recurring</em><br />
            Income
          </h1>
          <p className="ip-cover-sub">
            A corporate partner program for brokers, consultants, auditors, and industry
            professionals who can open doors in warehousing, freight, ecommerce, and
            supply chain operations.
          </p>
          <div className="ip-cover-tags">
            <span>Audit-led selling</span>
            <span>·</span>
            <span>Recurring partner economics</span>
          </div>
        </div>
        <div className="ip-cover-visual">
          <CortexOrbital size={420} compact={true} />
        </div>
      </div>
    </Slide>
  )
}

/* ─── 02 Executive Thesis ─────────────────────────────────────────────────── */
export function Slide02() {
  return (
    <Slide n={2} eyebrow="EXECUTIVE THESIS">
      <h2 className="ip-h2">
        This program turns industry access into a <em>protected revenue channel.</em>
      </h2>
      <p className="ip-lede">
        The partner does not simply refer a name. The partner uses operational audits to create
        urgency, matches the account to the right technology, and earns from active accounts under
        the partner agreement.
      </p>
      <div className="ip-cols ip-cols-3">
        <div className="ip-card">
          <div className="ip-card-tag mono">Relationship</div>
          <p>Partners bring access to warehouses, freight operators, sellers, and logistics decision-makers.</p>
        </div>
        <div className="ip-card">
          <div className="ip-card-tag mono">Audit</div>
          <p>The audit exposes gaps in billing, freight, WMS, OMS, inventory, retention, and operations.</p>
        </div>
        <div className="ip-card">
          <div className="ip-card-tag mono">Revenue Asset</div>
          <p>Closed accounts can produce first-year commissions and recurring income across multiple product lines.</p>
        </div>
      </div>
    </Slide>
  )
}

/* ─── 03 Market Problem ──────────────────────────────────────────────────── */
export function Slide03() {
  return (
    <Slide n={3} eyebrow="MARKET PROBLEM">
      <h2 className="ip-h2">
        The industry is full of operational problems<br />
        most operators <em>cannot see clearly.</em>
      </h2>
      <div className="ip-cols ip-cols-4">
        <div className="ip-card">
          <div className="ip-card-tag mono">Warehouses</div>
          <p>Manual workflows, disconnected billing, weak visibility, labor waste, and limited client control.</p>
        </div>
        <div className="ip-card">
          <div className="ip-card-tag mono">Freight</div>
          <p>Inefficient LTL/FTL decisions, poor consolidation, carrier friction, and margin leakage.</p>
        </div>
        <div className="ip-card">
          <div className="ip-card-tag mono">Sellers</div>
          <p>Limited OMS control, weak replenishment intelligence, support issues, and fulfillment blind spots.</p>
        </div>
        <div className="ip-card">
          <div className="ip-card-tag mono">Advisors</div>
          <p>They identify the pain, but rarely own the software that fixes it or the recurring economics.</p>
        </div>
      </div>
    </Slide>
  )
}

/* ─── 04 Partner Opening ─────────────────────────────────────────────────── */
export function Slide04() {
  return (
    <Slide n={4} eyebrow="THE PARTNER OPENING">
      <div className="ip-split">
        <div>
          <h2 className="ip-h2">
            The people closest to the problem<br />
            <em>should own the upside.</em>
          </h2>
          <p className="ip-lede">
            Industry professionals already have access, trust, and context. The
            missing piece is a credible audit engine, enterprise platform, and
            aggressive compensation model.
          </p>
        </div>
        <div className="ip-advantage-card">
          <div className="ip-card-tag mono">PARTNER ADVANTAGE</div>
          <div className="ip-advantage-big">Access</div>
          <p className="ip-advantage-tag">Relationships become revenue assets.</p>
          <p>
            Use the audit to create the business case, then position the right
            product line as the operational solution.
          </p>
        </div>
      </div>
    </Slide>
  )
}

/* ─── 05 Audit-Led Sales Model ───────────────────────────────────────────── */
export function Slide05() {
  const steps = [
    { n: '1', name: 'Audit', body: 'Inspect operations and data.' },
    { n: '2', name: 'Diagnose', body: 'Expose cost, control, and workflow issues.' },
    { n: '3', name: 'Present Gap', body: 'Make the problem visible to decision-makers.' },
    { n: '4', name: 'Sell Solution', body: 'Match WMS, freight, APIs, or OMS.' },
    { n: '5', name: 'Earn', body: 'Build recurring income from active accounts.' },
  ]
  return (
    <Slide n={5} eyebrow="AUDIT-LED SALES MODEL">
      <h2 className="ip-h2">
        Lead with the audit. <em>Close with the platform.</em>
      </h2>
      <p className="ip-lede">
        The audit changes the conversation from "look at our software" to "here are the operational
        problems we found and the system that fixes them."
      </p>
      <div className="ip-flow ip-flow-5">
        {steps.map((s, i) => (
          <div key={s.n} className="ip-flow-step">
            <div className="ip-flow-n mono">{s.n}</div>
            <div className="ip-flow-name">{s.name}</div>
            <p className="ip-flow-body">{s.body}</p>
            {i < steps.length - 1 && <div className="ip-flow-arrow" aria-hidden="true">→</div>}
          </div>
        ))}
      </div>
    </Slide>
  )
}

/* ─── 06 Audit Tools as the Sales Engine ─────────────────────────────────── */
export function Slide06() {
  return (
    <Slide
      n={6}
      eyebrow="AUDIT TOOLS AS THE SALES ENGINE"
      disclaimer="Sample dashboard for positioning only — not an earnings or savings guarantee."
    >
      <div className="ip-split">
        <div>
          <h2 className="ip-h2">
            Find the problem<br />
            <em>before you sell the fix.</em>
          </h2>
          <p className="ip-lede">
            The audit creates urgency. The software creates the solution.
            The partner earns from the account.
          </p>
          <ul className="ip-bullets">
            <li>Billing leakage and invoice discrepancies</li>
            <li>Freight inefficiencies and consolidation gaps</li>
            <li>WMS, OMS, inventory, and workflow gaps</li>
            <li>Client retention, support, and automation opportunities</li>
          </ul>
        </div>
        <div className="ip-audit-dash">
          <div className="ip-audit-dash-head">
            <span className="mono">Operational Audit Snapshot</span>
            <span className="mono ip-audit-dash-tag">SAMPLE OUTPUT</span>
          </div>
          <div className="ip-audit-grid">
            <div className="ip-audit-tile">
              <div className="ip-audit-num">$42K</div>
              <div className="ip-audit-lbl mono">Estimated Leakage</div>
            </div>
            <div className="ip-audit-tile">
              <div className="ip-audit-num">18%</div>
              <div className="ip-audit-lbl mono">Freight Waste</div>
            </div>
            <div className="ip-audit-tile">
              <div className="ip-audit-num">31</div>
              <div className="ip-audit-lbl mono">Workflow Gaps</div>
            </div>
            <div className="ip-audit-tile">
              <div className="ip-audit-num">High</div>
              <div className="ip-audit-lbl mono">Retention Risk</div>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  )
}

/* ─── 07 Platform Stack ──────────────────────────────────────────────────── */
export function Slide07() {
  return (
    <Slide n={7} eyebrow="PLATFORM STACK">
      <h2 className="ip-h2">
        One partner program.<br />
        <em>Multiple ways to monetize the relationship.</em>
      </h2>
      <div className="ip-stack-grid">
        <div className="ip-stack-card">
          <div className="ip-stack-img ip-stack-img-png">
            <img src={UNIEWMS_PNG} alt="UnieWMS" loading="lazy" />
          </div>
          <div className="ip-stack-body">
            <div className="ip-stack-tag mono">WMS</div>
            <div className="ip-stack-name">UnieWMS</div>
            <p>Warehouse management, billing, inventory, tasks, clients, and operational control.</p>
          </div>
        </div>
        <div className="ip-stack-card">
          <div className="ip-stack-img ip-stack-img-png">
            <img src={UNIEFREIGHT_PNG} alt="LTL / FTL Technology" loading="lazy" />
          </div>
          <div className="ip-stack-body">
            <div className="ip-stack-tag mono">Freight</div>
            <div className="ip-stack-name">LTL / FTL Technology</div>
            <p>Freight workflows, routing support, carrier coordination, and consumption-based logistics technology.</p>
          </div>
        </div>
        <div className="ip-stack-card">
          <div className="ip-stack-img ip-stack-img-svg">
            <CortexOrbital size={160} compact={true} />
          </div>
          <div className="ip-stack-body">
            <div className="ip-stack-tag mono">API</div>
            <div className="ip-stack-name">Cortex APIs</div>
            <p>Audit intelligence, recommendations, automation, optimization, and decision support.</p>
          </div>
        </div>
        <div className="ip-stack-card">
          <div className="ip-stack-img ip-stack-img-svg">
            <UnieConnectThumb />
          </div>
          <div className="ip-stack-body">
            <div className="ip-stack-tag mono">OMS</div>
            <div className="ip-stack-name">UnieConnect</div>
            <p>OMS, marketplace connectivity, seller visibility, fulfillment coordination, and account intelligence.</p>
          </div>
        </div>
      </div>
    </Slide>
  )
}

/* ─── 08 Aggressive Partner Economics ────────────────────────────────────── */
export function Slide08() {
  const rows = [
    { product: 'UnieWMS', pct: '90%', label: 'first-year commission' },
    { product: 'UnieWMS Renewals', pct: '30%', label: 'every year after' },
    { product: 'LTL / FTL Technology', pct: '10%', label: 'eligible usage earnings' },
    { product: 'Cortex APIs', pct: '30%', label: 'ongoing commission' },
    { product: 'UnieConnect', pct: '30%', label: 'ongoing commission' },
  ]
  return (
    <Slide
      n={8}
      eyebrow="AGGRESSIVE PARTNER ECONOMICS"
      disclaimer="Based on eligible collected revenue and final partner terms."
    >
      <h2 className="ip-h2">
        Compensation designed<br />
        <em>to build a serious book of business.</em>
      </h2>
      <p className="ip-lede">
        The schedule rewards partners for opening doors, using the audit
        process, and helping activate accounts that stay with the platform.
      </p>
      <table className="ip-econ-table">
        <tbody>
          {rows.map((r) => (
            <tr key={r.product}>
              <td className="ip-econ-product">{r.product}</td>
              <td className="ip-econ-pct">{r.pct}</td>
              <td className="ip-econ-label">{r.label}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Slide>
  )
}

/* ─── 09 WMS Revenue Anchor ──────────────────────────────────────────────── */
export function Slide09() {
  return (
    <Slide
      n={9}
      eyebrow="WMS REVENUE ANCHOR"
      disclaimer="Note: This slide describes program economics, not an earnings guarantee. Final agreement controls eligibility, timing, exclusions, and payment rules."
    >
      <div className="ip-split">
        <div>
          <h2 className="ip-h2">
            The WMS offer creates the<br />
            <em>strongest upfront partner incentive.</em>
          </h2>
          <div className="ip-anchor-grid">
            <div className="ip-anchor-cell">
              <div className="ip-anchor-tag mono">FIRST YEAR</div>
              <div className="ip-anchor-num">90%</div>
              <p>Commission on eligible first-year UnieWMS revenue.</p>
            </div>
            <div className="ip-anchor-cell">
              <div className="ip-anchor-tag mono">RENEWALS</div>
              <div className="ip-anchor-num">30%</div>
              <p>Ongoing annual commission after the first year while the account remains active and eligible.</p>
            </div>
            <div className="ip-anchor-cell">
              <div className="ip-anchor-tag mono">PROGRAM LOGIC</div>
              <div className="ip-anchor-num ip-anchor-logic">Audit</div>
              <p>Use audit findings to create the business case for WMS adoption.</p>
            </div>
          </div>
        </div>
        <div className="ip-anchor-visual">
          <img src={UNIEWMS_PNG} alt="UnieWMS dashboard" loading="lazy" />
        </div>
      </div>
    </Slide>
  )
}

/* ─── 10 Partner Account Protection ──────────────────────────────────────── */
export function Slide10() {
  const cards = [
    { title: 'Account Registration', body: 'Partner submits the target account before sales activity is credited.' },
    { title: 'Protection Window', body: 'Registered accounts receive a defined protection window under the partner agreement.' },
    { title: 'Expansion Credit', body: 'If the account expands into additional eligible products, partner economics can follow the registered relationship.' },
    { title: 'Active Account Rule', body: 'Ongoing commissions require active accounts, collected revenue, and compliance with program terms.' },
    { title: 'No Channel Conflict', body: 'Duplicate submissions, existing pipeline accounts, and house accounts are resolved by written program rules.' },
    { title: 'Deal Support', body: 'UnieLogics supports audits, demos, proposals, implementation planning, and product matching.' },
  ]
  return (
    <Slide n={10} eyebrow="PARTNER ACCOUNT PROTECTION">
      <h2 className="ip-h2">
        Serious partners need a<br />
        <em>serious account-registration structure.</em>
      </h2>
      <p className="ip-lede">
        The program should protect legitimate partner-sourced opportunities while giving UnieLogics
        clean rules for qualification, activation, payout, and support.
      </p>
      <div className="ip-cols ip-cols-3">
        {cards.map((c) => (
          <div key={c.title} className="ip-card">
            <div className="ip-card-title">{c.title}</div>
            <p>{c.body}</p>
          </div>
        ))}
      </div>
    </Slide>
  )
}

/* ─── 11 Partner Sales Workflow ──────────────────────────────────────────── */
export function Slide11() {
  const steps = [
    ['1', 'Identify', 'Warehouses, sellers, freight users, distributors, manufacturers, and logistics operators.'],
    ['2', 'Register', 'Submit account for partner protection and deal tracking.'],
    ['3', 'Audit', 'Use operational audit tools to expose gaps and quantify the pain.'],
    ['4', 'Present', 'Review findings with decision-makers and match the product line.'],
    ['5', 'Close', 'UnieLogics supports demo, proposal, onboarding, and implementation.'],
    ['6', 'Earn', 'Partner receives eligible commission on collected revenue under agreement terms.'],
  ]
  return (
    <Slide n={11} eyebrow="PARTNER SALES WORKFLOW">
      <h2 className="ip-h2">
        A simple motion that converts access<br />
        <em>into a software-backed opportunity.</em>
      </h2>
      <ol className="ip-numbered-list">
        {steps.map(([n, name, body]) => (
          <li key={n}>
            <span className="ip-numbered-n mono">{n}</span>
            <div>
              <strong>{name}</strong>
              <p>{body}</p>
            </div>
          </li>
        ))}
      </ol>
    </Slide>
  )
}

/* ─── 12 Who Should Join ─────────────────────────────────────────────────── */
export function Slide12() {
  const ideal = [
    'Freight brokers',
    '3PL consultants',
    'Warehouse advisors',
    'Ecommerce consultants',
    'Supply chain auditors',
    'WMS/OMS implementers',
    'Carrier relationship managers',
    'Marketplace consultants',
  ]
  const targets = [
    'Warehouses and 3PLs',
    'Ecommerce sellers and brands',
    'Distributors and wholesalers',
    'Manufacturers with LTL/FTL needs',
    'Marketplace operators',
    'Freight-heavy operators',
    'Multi-warehouse accounts',
    'Businesses with manual billing or inventory issues',
  ]
  return (
    <Slide n={12} eyebrow="WHO SHOULD JOIN">
      <h2 className="ip-h2">
        Built for industry professionals who can<br />
        <em>open doors and explain operational pain.</em>
      </h2>
      <div className="ip-cols ip-cols-2">
        <div className="ip-card">
          <div className="ip-card-title">Ideal Partners</div>
          <ul className="ip-bullets">
            {ideal.map((x) => <li key={x}>{x}</li>)}
          </ul>
        </div>
        <div className="ip-card">
          <div className="ip-card-title">Target Accounts</div>
          <ul className="ip-bullets">
            {targets.map((x) => <li key={x}>{x}</li>)}
          </ul>
        </div>
      </div>
    </Slide>
  )
}

/* ─── 13 Why Customers Buy ───────────────────────────────────────────────── */
export function Slide13() {
  return (
    <Slide n={13} eyebrow="WHY CUSTOMERS BUY">
      <h2 className="ip-h2">
        The customer buys because the audit<br />
        <em>makes the problem visible.</em>
      </h2>
      <div className="ip-cols ip-cols-2">
        <div className="ip-card ip-card-before">
          <div className="ip-card-title">Before</div>
          <p>Disconnected systems, manual workflows, billing issues, freight waste, weak visibility, and limited client control.</p>
        </div>
        <div className="ip-card ip-card-after">
          <div className="ip-card-title">After</div>
          <p>Centralized operation, audit intelligence, better client retention, freight technology, OMS connectivity, and AI decision support.</p>
        </div>
      </div>
    </Slide>
  )
}

/* ─── 14 Partner Enablement ──────────────────────────────────────────────── */
export function Slide14() {
  const cards = [
    { title: 'Audit Positioning', body: 'Talk tracks and audit categories that help partners identify pain quickly.' },
    { title: 'Sales Materials', body: 'Corporate decks, one-pagers, compensation overview, email sequences, and call scripts.' },
    { title: 'Deal Desk', body: 'Support for demo strategy, pricing, proposal structure, and product matching.' },
    { title: 'Implementation Handoff', body: 'Clear process after close so the customer sees professionalism from day one.' },
    { title: 'Partner Dashboard', body: 'Account registration, deal status, commission visibility, and product education.' },
    { title: 'Training', body: 'Product, audit, objection-handling, and vertical-specific selling resources.' },
  ]
  return (
    <Slide n={14} eyebrow="PARTNER ENABLEMENT">
      <h2 className="ip-h2">
        Partners need more than commission.<br />
        <em>They need a repeatable system.</em>
      </h2>
      <div className="ip-cols ip-cols-3">
        {cards.map((c) => (
          <div key={c.title} className="ip-card">
            <div className="ip-card-title">{c.title}</div>
            <p>{c.body}</p>
          </div>
        ))}
      </div>
    </Slide>
  )
}

/* ─── 15 Governance and Clarity ──────────────────────────────────────────── */
export function Slide15() {
  const cards = [
    { title: 'Eligible Revenue', body: 'Define which collected revenue categories are commissionable.' },
    { title: 'Payment Timing', body: 'Commissions paid after customer payment clears and account status is verified.' },
    { title: 'Chargebacks / Refunds', body: 'Returned or unpaid revenue can adjust commission calculations.' },
    { title: 'Partner Conduct', body: 'No false claims, no savings guarantees, no unauthorized pricing promises.' },
    { title: 'Customer Ownership', body: 'Account registration rules determine credit, conflict handling, and expansion economics.' },
    { title: 'Final Agreement Controls', body: 'Partner agreement overrides all marketing language and program summaries.' },
  ]
  return (
    <Slide n={15} eyebrow="GOVERNANCE AND CLARITY">
      <h2 className="ip-h2">
        Make the upside bold,<br />
        <em>but keep the program terms clean.</em>
      </h2>
      <p className="ip-lede">
        This deck should recruit serious partners while staying clear about eligibility, timing,
        final agreement terms, and the fact that no income outcome is guaranteed.
      </p>
      <div className="ip-cols ip-cols-3">
        {cards.map((c) => (
          <div key={c.title} className="ip-card">
            <div className="ip-card-title">{c.title}</div>
            <p>{c.body}</p>
          </div>
        ))}
      </div>
    </Slide>
  )
}

/* ─── 16 Why Partners Win ────────────────────────────────────────────────── */
export function Slide16() {
  const flow = ['Relationship', 'Audit', 'Usage', 'Software Sale', 'Retention', 'Ongoing Partner Income']
  return (
    <Slide n={16} eyebrow="WHY PARTNERS WIN">
      <h2 className="ip-h2">
        Every account can become<br />
        <em>a long-term revenue asset.</em>
      </h2>
      <p className="ip-lede">
        Partners bring access, trust, and industry knowledge. The
        platform brings the audit tools, software, implementation
        structure, and compensation model.
      </p>
      <div className="ip-win-flow">
        {flow.map((stage, i) => (
          <div key={stage} className="ip-win-stage">
            <span className="ip-win-stage-label">{stage}</span>
            {i < flow.length - 1 && <span className="ip-win-arrow" aria-hidden="true">→</span>}
          </div>
        ))}
      </div>
    </Slide>
  )
}

/* ─── 17 Next Step ───────────────────────────────────────────────────────── */
export function Slide17() {
  return (
    <Slide n={17} eyebrow="NEXT STEP">
      <div className="ip-close-grid">
        <div className="ip-close-copy">
          <h2 className="ip-h2">
            Bring the relationship.<br />
            Use the audit. Sell the fix.<br />
            <em>Keep earning.</em>
          </h2>
          <p className="ip-lede">
            Apply to become a strategic UnieLogics partner. Built for serious brokers, consultants,
            auditors, and logistics professionals ready to help modernize the industry.
          </p>
          <div className="ip-recommended-close">
            <div className="ip-card-tag mono">Recommended Close</div>
            <p>Register the account. Run the audit. Let the findings create the business case.</p>
          </div>
          <div className="ip-close-ctas">
            <a
              href="https://uniecortex.com/industry-pros"
              className="ip-btn ip-btn-primary"
              target="_blank"
              rel="noreferrer"
            >
              Become a strategic partner ↗
            </a>
            <a href="#apply" className="ip-btn ip-btn-outline">Apply on this page →</a>
          </div>
        </div>
        <div className="ip-close-visual">
          <CortexOrbital size={360} compact={true} />
        </div>
      </div>
    </Slide>
  )
}

/* ─── Public registry ────────────────────────────────────────────────────── */
export const ALL_SLIDES = [
  Slide01, Slide02, Slide03, Slide04, Slide05, Slide06, Slide07, Slide08, Slide09,
  Slide10, Slide11, Slide12, Slide13, Slide14, Slide15, Slide16, Slide17,
]
