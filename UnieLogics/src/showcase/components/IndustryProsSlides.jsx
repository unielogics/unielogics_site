// IndustryProsSlides — 17-slide Account Executive program deck.
//
// Each slide is a React function component returning <Slide>. The same DOM
// renders both the long-scroll hero stack at top of /industry-pros AND the
// horizontal carousel below — the container CSS handles sizing. The same
// markup is what headless Chrome captures to generate public/industry-pros.pdf
// (one slide → one printed page).
//
// Source content: user-supplied 17-slide "Turn Logistics Relationships Into
// Long-Term Recurring Income" Account Executive program presentation. Every figure
// (90%, 30%, $42K, etc.) is copied verbatim from the source — nothing is
// invented in this file.

import { CortexOrbital } from './CortexOrbital'
import { UnieConnectThumb } from './sections'

const BRAND_ICON = 'https://prepcenternearme.s3.us-east-1.amazonaws.com/unielogics/icononly.png'
const UNIEWMS_PNG = 'https://prepcenternearme.s3.us-east-1.amazonaws.com/unielogics/uniewms+(2).png'
const UNIEFREIGHT_PNG = 'https://prepcenternearme.s3.us-east-1.amazonaws.com/unielogics/UNIEFREIGHT.png'

export const TOTAL_SLIDES = 17

/* ─── Slide chrome ──────────────────────────────────────────────────────────
 * The brand-mark + program-label footer is intentionally rendered ONLY on
 * the cover (slide 1) and the closing slide (slide 17). The intermediate
 * slides drop the chrome so every body slide reads as content-first — the
 * counter in the top-right header still confirms "where am I" without the
 * extra weight at the bottom. */
export function Slide({ n, eyebrow, disclaimer, children, accent = 'lime' }) {
  const showFooter = n === 1 || n === TOTAL_SLIDES
  return (
    <section
      className={`ip-slide ip-slide-${n} ip-accent-${accent} ${showFooter ? 'has-slide-footer' : 'no-slide-footer'}`}
      data-slide={n}
      aria-label={`Slide ${n} of ${TOTAL_SLIDES}`}
    >
      <header className="ip-slide-header">
        <span className="ip-slide-eyebrow">{eyebrow}</span>
        <span className="ip-slide-count mono">{String(n).padStart(2, '0')} / {TOTAL_SLIDES}</span>
      </header>
      <div className="ip-slide-body">{children}</div>
      {disclaimer && <div className="ip-slide-disclaimer">{disclaimer}</div>}
      {showFooter && (
        <footer className="ip-slide-footer">
          <img className="ip-slide-brand" src={BRAND_ICON} alt="UnieLogics" />
          <span className="ip-slide-prog">UnieLogics · Industry Account Executive Program</span>
          <span className="ip-slide-confidential mono">UnieLogics — Confidential Account Executive Presentation</span>
        </footer>
      )}
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
            UnieLogics' Account Executive program for brokers, consultants, auditors, and industry
            professionals who can open doors in warehousing, freight, ecommerce, and
            supply chain operations.
          </p>
          <div className="ip-cover-tags">
            <span>Audit-led selling</span>
            <span>·</span>
            <span>Recurring AE economics</span>
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
        The Account Executive does not simply refer a name. The AE uses operational audits to
        create urgency, matches the account to the right technology, and earns from active accounts
        under the Account Executive agreement.
      </p>
      <div className="ip-cols ip-cols-3">
        <div className="ip-card">
          <div className="ip-card-tag mono">Relationship</div>
          <p>Account Executives bring access to warehouses, freight operators, sellers, and logistics decision-makers.</p>
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

/* ─── 04 The Opening ─────────────────────────────────────────────────── */
export function Slide04() {
  return (
    <Slide n={4} eyebrow="THE OPENING">
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
          <div className="ip-card-tag mono">ACCOUNT EXECUTIVE ADVANTAGE</div>
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
    >
      <div className="ip-split">
        <div>
          <h2 className="ip-h2">
            Find the problem<br />
            <em>before you sell the fix.</em>
          </h2>
          <p className="ip-lede">
            The audit creates urgency. The software creates the solution.
            The Account Executive earns from the account.
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
        One Account Executive program.<br />
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

/* ─── 08 Aggressive Account Executive Economics ─────────────────────────── */
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
      eyebrow="AGGRESSIVE ACCOUNT EXECUTIVE ECONOMICS"
      disclaimer="Based on eligible collected revenue and final Account Executive terms."
    >
      <h2 className="ip-h2">
        Compensation designed<br />
        <em>to build a serious book of business.</em>
      </h2>
      <p className="ip-lede">
        The schedule rewards Account Executives for opening doors, using the audit
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
    >
      <div className="ip-split">
        <div>
          <h2 className="ip-h2">
            The WMS offer creates the<br />
            <em>strongest upfront Account Executive incentive.</em>
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

/* ─── 10 Account Executive Account Protection ──────────────────────────── */
export function Slide10() {
  const cards = [
    { title: 'Account Registration', body: 'Account Executive submits the target account before sales activity is credited.' },
    { title: 'Protection Window', body: 'Registered accounts receive a defined protection window under the Account Executive agreement.' },
    { title: 'Expansion Credit', body: 'If the account expands into additional eligible products, Account Executive economics can follow the registered relationship.' },
    { title: 'Active Account Rule', body: 'Ongoing commissions require active accounts, collected revenue, and compliance with program terms.' },
    { title: 'No Channel Conflict', body: 'Duplicate submissions, existing pipeline accounts, and house accounts are resolved by written program rules.' },
    { title: 'Deal Support', body: 'UnieLogics supports audits, demos, proposals, implementation planning, and product matching.' },
  ]
  return (
    <Slide n={10} eyebrow="ACCOUNT EXECUTIVE PROTECTION">
      <h2 className="ip-h2">
        Serious Account Executives need a<br />
        <em>serious account-registration structure.</em>
      </h2>
      <p className="ip-lede">
        The program should protect legitimate AE-sourced opportunities while giving UnieLogics
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

/* ─── 11 Account Executive Sales Workflow ─────────────────────────────── */
export function Slide11() {
  const steps = [
    ['1', 'Identify', 'Warehouses, sellers, freight users, distributors, manufacturers, and logistics operators.'],
    ['2', 'Register', 'Submit account for Account Executive protection and deal tracking.'],
    ['3', 'Audit', 'Use operational audit tools to expose gaps and quantify the pain.'],
    ['4', 'Present', 'Review findings with decision-makers and match the product line.'],
    ['5', 'Close', 'UnieLogics supports demo, proposal, onboarding, and implementation.'],
    ['6', 'Earn', 'Account Executive receives eligible commission on collected revenue under agreement terms.'],
  ]
  return (
    <Slide n={11} eyebrow="ACCOUNT EXECUTIVE SALES WORKFLOW">
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
          <div className="ip-card-title">Ideal Account Executives</div>
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

/* ─── 13 Why Customers Buy — visual Before → After ─────────────────────── */
export function Slide13() {
  return (
    <Slide n={13} eyebrow="WHY CUSTOMERS BUY">
      <h2 className="ip-h2">
        The customer buys because the audit<br />
        <em>makes the problem visible.</em>
      </h2>

      <div className="ip-ba">
        {/* ── BEFORE ─────────────────────────────────────────────────── */}
        <div className="ip-ba-side ip-ba-before" aria-label="Before UnieLogics">
          <div className="ip-ba-head">
            <span className="ip-ba-eyebrow mono">BEFORE</span>
            <span className="ip-ba-state">Disconnected operation</span>
          </div>

          <ul className="ip-ba-grid" role="list">
            <li className="ip-ba-tag">
              <svg className="ip-ba-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3"  y="4"  width="6" height="6" rx="1.2" />
                <rect x="15" y="4"  width="6" height="6" rx="1.2" />
                <rect x="3"  y="14" width="6" height="6" rx="1.2" />
                <rect x="15" y="14" width="6" height="6" rx="1.2" />
                <path d="M9 7h3M12 7v10M12 17h3" strokeDasharray="2 2" opacity=".55" />
              </svg>
              <span>Disconnected systems</span>
            </li>
            <li className="ip-ba-tag">
              <svg className="ip-ba-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 19c2-3 4-3 6 0s4 3 6 0 4-3 4-3" />
                <path d="M4 8c2-3 4-3 6 0" opacity=".55" />
                <circle cx="20" cy="6" r="1.4" />
              </svg>
              <span>Manual workflows</span>
            </li>
            <li className="ip-ba-tag">
              <svg className="ip-ba-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="1.5" />
                <path d="M3 9h18" />
                <path d="M7 14h4" />
                <path d="M15 13l4 4M19 13l-4 4" />
              </svg>
              <span>Billing issues</span>
            </li>
            <li className="ip-ba-tag">
              <svg className="ip-ba-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 17h11l2-3h4l-1 4-2 1H4z" />
                <circle cx="8"  cy="19" r="1.6" />
                <circle cx="17" cy="19" r="1.6" />
                <path d="M6 11l3-3M6 8l3 3" opacity=".75" />
              </svg>
              <span>Freight waste</span>
            </li>
            <li className="ip-ba-tag">
              <svg className="ip-ba-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z" opacity=".55" />
                <path d="M4 4l16 16" />
              </svg>
              <span>Weak visibility</span>
            </li>
            <li className="ip-ba-tag">
              <svg className="ip-ba-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="4" y="10" width="16" height="10" rx="1.5" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                <path d="M10 15h4" />
              </svg>
              <span>Limited client control</span>
            </li>
          </ul>
        </div>

        {/* ── ARROW ───────────────────────────────────────────────────── */}
        <div className="ip-ba-bridge" aria-hidden="true">
          <span className="ip-ba-bridge-label mono">AUDIT</span>
          <svg className="ip-ba-arrow" viewBox="0 0 60 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12h52" />
            <path d="M46 5l8 7-8 7" />
          </svg>
          <span className="ip-ba-bridge-sub mono">makes it visible</span>
        </div>

        {/* ── AFTER ──────────────────────────────────────────────────── */}
        <div className="ip-ba-side ip-ba-after" aria-label="After UnieLogics">
          <div className="ip-ba-head">
            <span className="ip-ba-eyebrow mono">AFTER</span>
            <span className="ip-ba-state">Unified intelligence</span>
          </div>

          <ul className="ip-ba-grid" role="list">
            <li className="ip-ba-tag">
              <svg className="ip-ba-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="3.2" />
                <circle cx="12" cy="12" r="8.5" opacity=".4" />
                <path d="M12 4v3.2M12 16.8V20M4 12h3.2M16.8 12H20" />
              </svg>
              <span>Centralized operation</span>
            </li>
            <li className="ip-ba-tag">
              <svg className="ip-ba-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="14" height="16" rx="1.5" />
                <path d="M7 9h6M7 12h6M7 15h4" />
                <path d="M17 15l2.5 2.5L23 14" />
              </svg>
              <span>Audit intelligence</span>
            </li>
            <li className="ip-ba-tag">
              <svg className="ip-ba-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 21s-7-4.5-7-10a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5.5-7 10-7 10z" />
                <path d="M9 11l2 2 4-4" />
              </svg>
              <span>Client retention</span>
            </li>
            <li className="ip-ba-tag">
              <svg className="ip-ba-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 17h11l2-3h4l-1 4-2 1H4z" />
                <circle cx="8"  cy="19" r="1.6" />
                <circle cx="17" cy="19" r="1.6" />
                <path d="M7 11l2-2 2 2 2-3" />
              </svg>
              <span>Freight technology</span>
            </li>
            <li className="ip-ba-tag">
              <svg className="ip-ba-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="6"  cy="6"  r="2.2" />
                <circle cx="18" cy="6"  r="2.2" />
                <circle cx="6"  cy="18" r="2.2" />
                <circle cx="18" cy="18" r="2.2" />
                <circle cx="12" cy="12" r="2.2" />
                <path d="M8 6h8M8 18h8M6 8v8M18 8v8M7.5 7.5l3 3M13.5 13.5l3 3M16.5 7.5l-3 3M10.5 13.5l-3 3" />
              </svg>
              <span>OMS connectivity</span>
            </li>
            <li className="ip-ba-tag">
              <svg className="ip-ba-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3a6 6 0 0 0-4 10.5V16h8v-2.5A6 6 0 0 0 12 3z" />
                <path d="M9 19h6M10 21h4" />
                <path d="M12 8v3M10.5 9.5h3" />
              </svg>
              <span>AI decision support</span>
            </li>
          </ul>
        </div>
      </div>
    </Slide>
  )
}

/* ─── 14 Account Executive Enablement ─────────────────────────────────── */
export function Slide14() {
  const cards = [
    { title: 'Audit Positioning', body: 'Talk tracks and audit categories that help Account Executives identify pain quickly.' },
    { title: 'Sales Materials', body: 'Corporate decks, one-pagers, compensation overview, email sequences, and call scripts.' },
    { title: 'Deal Desk', body: 'Support for demo strategy, pricing, proposal structure, and product matching.' },
    { title: 'Implementation Handoff', body: 'Clear process after close so the customer sees professionalism from day one.' },
    { title: 'AE Dashboard', body: 'Account registration, deal status, commission visibility, and product education.' },
    { title: 'Training', body: 'Product, audit, objection-handling, and vertical-specific selling resources.' },
  ]
  return (
    <Slide n={14} eyebrow="ACCOUNT EXECUTIVE ENABLEMENT">
      <h2 className="ip-h2">
        Account Executives need more than commission.<br />
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
    { title: 'Account Executive Conduct', body: 'No false claims, no savings guarantees, no unauthorized pricing promises.' },
    { title: 'Customer Ownership', body: 'Account registration rules determine credit, conflict handling, and expansion economics.' },
    { title: 'Final Agreement Controls', body: 'Account Executive agreement overrides all marketing language and program summaries.' },
  ]
  return (
    <Slide n={15} eyebrow="GOVERNANCE AND CLARITY">
      <h2 className="ip-h2">
        Make the upside bold,<br />
        <em>but keep the program terms clean.</em>
      </h2>
      <p className="ip-lede">
        This deck should recruit serious Account Executives while staying clear about eligibility, timing,
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

/* ─── 16 Why Account Executives Win ────────────────────────────────────── */
export function Slide16() {
  // Six-stage value chain rendered as a horizontal icon flow. The final
  // stage (Ongoing AE Income) carries the lime "win" accent so the eye
  // lands on the outcome, not the path.
  const flow = [
    {
      label: 'Relationship',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="8" cy="8" r="3" />
          <circle cx="16" cy="8" r="3" />
          <path d="M2 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
          <path d="M22 20c0-3.3-2.7-6-6-6-.6 0-1.2.1-1.7.2" />
        </svg>
      ),
    },
    {
      label: 'Audit',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="5" y="4" width="14" height="17" rx="1.5" />
          <path d="M9 4V2.5h6V4" />
          <path d="M8 10l2 2 4-4" />
          <path d="M8 16h8" />
        </svg>
      ),
    },
    {
      label: 'Usage',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 20h18" />
          <path d="M6 20V12" />
          <path d="M11 20V8" />
          <path d="M16 20v-6" />
          <path d="M21 20V4" />
        </svg>
      ),
    },
    {
      label: 'Software Sale',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="13" rx="1.5" />
          <path d="M3 8h18" />
          <path d="M8 21h8" />
          <path d="M12 17v4" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
    {
      label: 'Retention',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 21s-7-4.5-7-10a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5.5-7 10-7 10z" />
        </svg>
      ),
    },
    {
      label: 'Ongoing AE Income',
      win: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <ellipse cx="12" cy="6" rx="7" ry="2.4" />
          <path d="M5 6v4c0 1.3 3.1 2.4 7 2.4s7-1.1 7-2.4V6" />
          <path d="M5 12v4c0 1.3 3.1 2.4 7 2.4s7-1.1 7-2.4v-4" />
          <path d="M9 6.5v12M15 6.5v12" opacity=".5" />
        </svg>
      ),
    },
  ]
  return (
    <Slide n={16} eyebrow="WHY ACCOUNT EXECUTIVES WIN">
      <h2 className="ip-h2">
        Every account can become<br />
        <em>a long-term revenue asset.</em>
      </h2>
      <p className="ip-lede">
        Account Executives bring access, trust, and industry knowledge. The
        platform brings the audit tools, software, implementation
        structure, and compensation model.
      </p>
      <div className="ip-win-iconflow" role="list">
        {flow.map((stage, i) => (
          <div key={stage.label} className="ip-win-iconflow-step-wrap">
            <div
              className={`ip-win-iconflow-step ${stage.win ? 'is-win' : ''}`}
              role="listitem"
            >
              <div className="ip-win-iconflow-icon">{stage.icon}</div>
              <div className="ip-win-iconflow-label">{stage.label}</div>
              <div className="ip-win-iconflow-n mono">
                {String(i + 1).padStart(2, '0')}
              </div>
            </div>
            {i < flow.length - 1 && (
              <div className="ip-win-iconflow-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 7h20" />
                  <path d="M16 2l5 5-5 5" />
                </svg>
              </div>
            )}
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
            Apply to become a UnieLogics Account Executive. Built for serious brokers, consultants,
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
              Become an Account Executive ↗
            </a>
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
