// Audit — adaptive, multi-step audit-request flow.
// Deep-linked via /audit?type=<auditType>&persona=<persona>.
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SchedulePicker } from '../components/SchedulePicker'
import { submitAuditRequest } from '../../lib/auditApi'

const PERSONAS = [
  { id: 'warehouse', label: 'Warehouse / 3PL', desc: 'Fulfillment or warehouse operations' },
  { id: 'freight', label: 'Freight / carrier', desc: 'LTL/FTL, brokerage, carrier matching' },
  { id: 'courier', label: 'Courier / last-mile', desc: 'Local and last-mile delivery' },
  { id: 'brand', label: 'Ecommerce / brand', desc: 'Seller running nationwide fulfillment' },
]

const AUDIT_TYPES = [
  { id: 'label-spine', label: 'Shipping is too expensive', desc: 'Label Spine Audit — benchmark every shipment against the rate it should have paid.' },
  { id: 'task-workflow', label: 'The warehouse feels slow', desc: 'Task & Workflow Audit — score labor velocity, throughput, and zone coverage.' },
  { id: 'order-financial', label: 'Margins are disappearing', desc: 'Order Financial Audit — rebuild margin by lane and region with the current fee model.' },
  { id: 'network', label: 'My network footprint feels wrong', desc: 'Network Audit — score coverage and the DC that closes your biggest gap.' },
  { id: 'product-catalog', label: 'I want more profitable SKUs', desc: 'Product Catalog Audit — landed-cost-per-SKU across demand and fulfillment.' },
  { id: 'complete-business', label: 'A complete business audit', desc: 'Full operating-intelligence review across every system, ending with a scheduled deep-dive.' },
]

const VOLUME_BANDS = ['< 1,000 / mo', '1,000 – 10,000 / mo', '10,000 – 50,000 / mo', '50,000 – 250,000 / mo', '250,000+ / mo']
const LOCATION_BANDS = ['1', '2 – 5', '6 – 20', '20+']
const SYSTEMS = ['WMS', 'TMS', 'OMS', 'Carrier APIs', 'Spreadsheets', 'None yet']
const TIMELINES = ['ASAP', '1 – 3 months', '3 – 6 months', 'Just exploring']

// Per-audit-type question sets. kind: 'single' | 'multi' | 'select' | 'text' | 'yesno'
const TYPE_QUESTIONS = {
  'label-spine': [
    { key: 'carriersUsed', label: 'Which carriers do you ship with?', kind: 'multi', options: ['FedEx', 'UPS', 'USPS', 'DHL', 'Regional', 'LTL / freight'] },
    { key: 'monthlyParcels', label: 'Approx. monthly parcels', kind: 'select', options: VOLUME_BANDS },
    { key: 'avgWeightBand', label: 'Typical shipment weight', kind: 'select', options: ['< 1 lb', '1 – 5 lb', '5 – 20 lb', '20 lb+', 'Mixed'] },
    { key: 'labelCsvAvailable', label: 'Can you provide a label/shipment CSV export?', kind: 'yesno' },
  ],
  'task-workflow': [
    { key: 'wmsPlatform', label: 'Which WMS do you run?', kind: 'text', placeholder: 'e.g. UnieWMS, in-house, other' },
    { key: 'skuCountBand', label: 'Active SKU count', kind: 'select', options: ['< 500', '500 – 5,000', '5,000 – 25,000', '25,000+'] },
    { key: 'painAreas', label: 'Where does it hurt most?', kind: 'multi', options: ['Slotting', 'Picking', 'Receiving', 'Returns', 'Labor planning'] },
    { key: 'wmsExportAvailable', label: 'Can you provide a WMS task export?', kind: 'yesno' },
  ],
  'order-financial': [
    { key: 'marketplaces', label: 'Where do you sell?', kind: 'multi', options: ['Amazon', 'Walmart', 'Shopify', 'eBay', 'DTC site', 'Other'] },
    { key: 'monthlyRevenueBand', label: 'Approx. monthly revenue', kind: 'select', options: ['< $100k', '$100k – $500k', '$500k – $2M', '$2M – $10M', '$10M+'] },
    { key: 'marginKnownAtOrder', label: 'Do you know true margin at the moment an order is placed?', kind: 'yesno' },
    { key: 'plExportAvailable', label: 'Can you provide a marketplace P&L export?', kind: 'yesno' },
  ],
  'network': [
    { key: 'warehouseCount', label: 'How many warehouses / DCs?', kind: 'select', options: ['1', '2 – 3', '4 – 8', '9+'] },
    { key: 'regionsCovered', label: 'Which regions do you cover today?', kind: 'multi', options: ['Northeast', 'Southeast', 'Midwest', 'Southwest', 'West', 'National'] },
    { key: 'consideringNewDC', label: 'Are you considering opening a new DC?', kind: 'yesno' },
    { key: 'locationsFreeText', label: 'List your current warehouse locations (city/state)', kind: 'text', placeholder: 'e.g. Elizabeth NJ; Reno NV' },
  ],
  'product-catalog': [
    { key: 'catalogSizeBand', label: 'Catalog size', kind: 'select', options: ['< 100 SKUs', '100 – 1,000', '1,000 – 10,000', '10,000+'] },
    { key: 'identifierType', label: 'What identifiers do you have?', kind: 'single', options: ['ASIN', 'UPC', 'SKU', 'Mixed'] },
    { key: 'marketplaces', label: 'Where do you sell?', kind: 'multi', options: ['Amazon', 'Walmart', 'Shopify', 'eBay', 'DTC site', 'Other'] },
    { key: 'demandDataAvailable', label: 'Do you have demand/sales history to share?', kind: 'yesno' },
  ],
  'complete-business': [
    { key: 'focusAreas', label: 'Which areas should the audit prioritize?', kind: 'multi', options: ['Shipping cost', 'Warehouse throughput', 'Order margin', 'Network footprint', 'Catalog profitability', 'Driver / dispatch'] },
    { key: 'decisionRole', label: 'Your role in this decision', kind: 'single', options: ['Decision maker', 'Influencer', 'Researching'] },
    { key: 'integrationDepth', label: 'How far are you looking to go?', kind: 'single', options: ['Just exploring', 'Pilot ready', 'Full rollout'] },
    { key: 'budgetAuthority', label: 'Is budget approved or available?', kind: 'yesno' },
  ],
}

function TileGrid({ options, value, onToggle, multi }) {
  const isSel = (id) => (multi ? Array.isArray(value) && value.includes(id) : value === id)
  return (
    <div className={`form-tile-grid${multi ? ' form-tile-grid-multi' : ''}`}>
      {options.map((o) => {
        const id = typeof o === 'string' ? o : o.id
        const label = typeof o === 'string' ? o : o.label
        const desc = typeof o === 'string' ? null : o.desc
        return (
          <button
            key={id}
            type="button"
            className={`form-tile ${isSel(id) ? 'selected' : ''}`}
            onClick={() => onToggle(id)}
          >
            <span className="form-tile-label">{label}</span>
            {desc && <span className="form-tile-desc">{desc}</span>}
          </button>
        )
      })}
    </div>
  )
}

function Question({ q, value, setValue }) {
  if (q.kind === 'single') {
    return (
      <div className="form-group audit-q">
        <label>{q.label}</label>
        <TileGrid options={q.options} value={value} onToggle={(id) => setValue(id)} />
      </div>
    )
  }
  if (q.kind === 'multi') {
    const arr = Array.isArray(value) ? value : []
    return (
      <div className="form-group audit-q">
        <label>{q.label}</label>
        <TileGrid
          options={q.options}
          value={arr}
          multi
          onToggle={(id) =>
            setValue(arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id])
          }
        />
      </div>
    )
  }
  if (q.kind === 'yesno') {
    return (
      <div className="form-group audit-q">
        <label>{q.label}</label>
        <TileGrid
          options={['Yes', 'No']}
          value={value}
          onToggle={(id) => setValue(id)}
        />
      </div>
    )
  }
  if (q.kind === 'select') {
    return (
      <div className="form-group audit-q">
        <label>{q.label}</label>
        <select value={value || ''} onChange={(e) => setValue(e.target.value)}>
          <option value="">Select…</option>
          {q.options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>
    )
  }
  return (
    <div className="form-group audit-q">
      <label>{q.label}</label>
      <input
        type="text"
        placeholder={q.placeholder || ''}
        value={value || ''}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

export default function Audit() {
  const [searchParams] = useSearchParams()
  const [persona, setPersona] = useState(null)
  const [auditType, setAuditType] = useState(null)
  const [common, setCommon] = useState({
    primaryProblem: '',
    monthlyVolumeBand: '',
    locationsCount: '',
    systemsInUse: [],
    timeline: '',
    howHeard: '',
  })
  const [answers, setAnswers] = useState({})
  const [contact, setContact] = useState({
    fullName: '', workEmail: '', company: '', roleTitle: '', phone: '', companyWebsite: '',
  })
  const [consent, setConsent] = useState(false)
  const [scheduling, setScheduling] = useState(null)
  const [stepIdx, setStepIdx] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState(null) // { ok, message }
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t = searchParams.get('type')
    if (t && AUDIT_TYPES.some((a) => a.id === t)) setAuditType(t)
    const p = searchParams.get('persona')
    if (p && PERSONAS.some((x) => x.id === p)) setPersona(p)
  }, [searchParams])

  const mode = auditType === 'complete-business' ? 'complete' : 'standard'

  const steps = useMemo(() => {
    const base = ['persona', 'type', 'common', 'specifics', 'contact']
    if (mode === 'complete') base.push('schedule')
    return base
  }, [mode])

  // Clamp step if mode change shrinks the list.
  useEffect(() => {
    if (stepIdx > steps.length - 1) setStepIdx(steps.length - 1)
  }, [steps, stepIdx])

  const stepKey = steps[stepIdx]
  const totalSteps = steps.length
  const typeQuestions = auditType ? TYPE_QUESTIONS[auditType] || [] : []

  const canContinue = () => {
    switch (stepKey) {
      case 'persona': return !!persona
      case 'type': return !!auditType
      case 'common':
        return !!common.monthlyVolumeBand && !!common.locationsCount && !!common.timeline
      case 'specifics': return true
      case 'contact':
        return (
          contact.fullName.trim() &&
          contact.workEmail.trim() &&
          contact.company.trim() &&
          consent
        )
      case 'schedule':
        return !!scheduling?.date && !!scheduling?.timeSlot
      default: return true
    }
  }

  const next = () => setStepIdx((i) => Math.min(i + 1, totalSteps - 1))
  const back = () => setStepIdx((i) => Math.max(i - 1, 0))

  const handleSubmit = async () => {
    setSubmitting(true)
    setStatus(null)
    const result = await submitAuditRequest({
      persona, auditType, mode, common, answers, contact, consent, scheduling,
    })
    setSubmitting(false)
    if (result.success) {
      setDone(true)
    } else {
      setStatus({ ok: false, message: result.error || 'Something went wrong. Please try again.' })
    }
  }

  const isLastStep = stepIdx === totalSteps - 1
  const selectedType = AUDIT_TYPES.find((a) => a.id === auditType)

  return (
    <main>
      <div className="wrap get-started-wrap">
        <section className="get-started-unified">
          <div className="get-started-header">
            <h1 className="page-title">Request your audit</h1>
            <p className="page-subtitle">
              Tell us who you are and where it hurts. We tailor the audit, then email you a
              one-time activation link to run it. Your data never leaves your network.
            </p>
            {!done && (
              <>
                <div className="micro" style={{ marginTop: 16 }}>
                  Step {stepIdx + 1} of {totalSteps}
                </div>
                <div className="get-started-progress">
                  <div
                    className="get-started-progress-bar"
                    style={{ width: `${((stepIdx + 1) / totalSteps) * 100}%` }}
                  />
                </div>
              </>
            )}
          </div>

          {done ? (
            <div className="form-step-panel reveal on" style={{ textAlign: 'center' }}>
              <h2 className="section-title">Check your email</h2>
              <p className="micro" style={{ marginBottom: 16 }}>
                We've sent a one-time activation link to <strong>{contact.workEmail}</strong>.
                Follow the instructions in that email — your end-to-end audit is ready to
                run. Your data stays inside your own systems.
              </p>
              {scheduling?.date && (
                <p className="micro">
                  Deep-dive scheduled for <strong>{scheduling.date}</strong> at{' '}
                  <strong>{scheduling.timeSlot}</strong> ({scheduling.timezone}). We'll send a
                  calendar invite to confirm.
                </p>
              )}
            </div>
          ) : (
            <form
              className="get-started-form"
              onSubmit={(e) => {
                e.preventDefault()
                if (!canContinue()) return
                if (isLastStep) handleSubmit()
                else next()
              }}
            >
              {stepKey === 'persona' && (
                <div className="form-step-panel reveal on">
                  <h2 className="section-title">Who are you?</h2>
                  <p className="micro" style={{ marginBottom: 16 }}>
                    Pick the option that best describes your operation.
                  </p>
                  <TileGrid options={PERSONAS} value={persona} onToggle={setPersona} />
                </div>
              )}

              {stepKey === 'type' && (
                <div className="form-step-panel reveal on">
                  <h2 className="section-title">What are you trying to fix?</h2>
                  <p className="micro" style={{ marginBottom: 16 }}>
                    This shapes the rest of the questions and the audit you'll receive.
                  </p>
                  <TileGrid options={AUDIT_TYPES} value={auditType} onToggle={setAuditType} />
                </div>
              )}

              {stepKey === 'common' && (
                <div className="form-step-panel reveal on">
                  <h2 className="section-title">A few quick numbers</h2>
                  <p className="micro" style={{ marginBottom: 16 }}>
                    Scale and timeline help us calibrate the audit.
                  </p>
                  <div className="form-group audit-q">
                    <label>What's the core problem, in your words? <span className="micro">(optional)</span></label>
                    <input
                      type="text"
                      placeholder="e.g. parcel costs creeping every quarter"
                      value={common.primaryProblem}
                      onChange={(e) => setCommon((c) => ({ ...c, primaryProblem: e.target.value }))}
                    />
                  </div>
                  <div className="form-group audit-q">
                    <label>Approximate monthly volume</label>
                    <select
                      value={common.monthlyVolumeBand}
                      onChange={(e) => setCommon((c) => ({ ...c, monthlyVolumeBand: e.target.value }))}
                    >
                      <option value="">Select…</option>
                      {VOLUME_BANDS.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div className="form-group audit-q">
                    <label>Number of locations</label>
                    <select
                      value={common.locationsCount}
                      onChange={(e) => setCommon((c) => ({ ...c, locationsCount: e.target.value }))}
                    >
                      <option value="">Select…</option>
                      {LOCATION_BANDS.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div className="form-group audit-q">
                    <label>Systems in use today</label>
                    <TileGrid
                      options={SYSTEMS}
                      value={common.systemsInUse}
                      multi
                      onToggle={(id) =>
                        setCommon((c) => ({
                          ...c,
                          systemsInUse: c.systemsInUse.includes(id)
                            ? c.systemsInUse.filter((x) => x !== id)
                            : [...c.systemsInUse, id],
                        }))
                      }
                    />
                  </div>
                  <div className="form-group audit-q">
                    <label>When do you want to start?</label>
                    <select
                      value={common.timeline}
                      onChange={(e) => setCommon((c) => ({ ...c, timeline: e.target.value }))}
                    >
                      <option value="">Select…</option>
                      {TIMELINES.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {stepKey === 'specifics' && (
                <div className="form-step-panel reveal on">
                  <h2 className="section-title">
                    {selectedType ? selectedType.label : 'Tell us more'}
                  </h2>
                  <p className="micro" style={{ marginBottom: 16 }}>
                    {mode === 'complete'
                      ? 'A deeper read so the audit lands on the right levers.'
                      : 'Just enough detail to run a precise audit.'}
                  </p>
                  {typeQuestions.map((q) => (
                    <Question
                      key={q.key}
                      q={q}
                      value={answers[q.key]}
                      setValue={(v) => setAnswers((a) => ({ ...a, [q.key]: v }))}
                    />
                  ))}
                </div>
              )}

              {stepKey === 'contact' && (
                <div className="form-step-panel reveal on">
                  <h2 className="section-title">Where do we send the activation link?</h2>
                  <p className="micro" style={{ marginBottom: 16 }}>
                    The one-time link goes to your work email.
                  </p>
                  <div className="form-group audit-q">
                    <label>Full name *</label>
                    <input type="text" required value={contact.fullName}
                      onChange={(e) => setContact((c) => ({ ...c, fullName: e.target.value }))} />
                  </div>
                  <div className="form-group audit-q">
                    <label>Work email *</label>
                    <input type="email" required value={contact.workEmail}
                      onChange={(e) => setContact((c) => ({ ...c, workEmail: e.target.value }))} />
                  </div>
                  <div className="form-group audit-q">
                    <label>Company *</label>
                    <input type="text" required value={contact.company}
                      onChange={(e) => setContact((c) => ({ ...c, company: e.target.value }))} />
                  </div>
                  <div className="form-group audit-q">
                    <label>Role / title <span className="micro">(optional)</span></label>
                    <input type="text" value={contact.roleTitle}
                      onChange={(e) => setContact((c) => ({ ...c, roleTitle: e.target.value }))} />
                  </div>
                  <div className="form-group audit-q">
                    <label>Phone <span className="micro">(optional)</span></label>
                    <input type="tel" value={contact.phone}
                      onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))} />
                  </div>
                  <div className="form-group audit-q">
                    <label>Company website <span className="micro">(optional)</span></label>
                    <input type="text" placeholder="acme3pl.com" value={contact.companyWebsite}
                      onChange={(e) => setContact((c) => ({ ...c, companyWebsite: e.target.value }))} />
                  </div>
                  <label className="audit-consent">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                    />
                    <span>
                      I agree to be contacted about this audit and understand I'll receive a
                      one-time activation link by email.
                    </span>
                  </label>
                </div>
              )}

              {stepKey === 'schedule' && (
                <div className="form-step-panel reveal on">
                  <h2 className="section-title">Pick a time for your deep-dive</h2>
                  <p className="micro" style={{ marginBottom: 16 }}>
                    Last step — no more questions. Choose a slot and we'll bring the audit to
                    the call.
                  </p>
                  <SchedulePicker value={scheduling} onChange={setScheduling} />
                </div>
              )}

              {status && !status.ok && (
                <p className="error" style={{ marginTop: 16, marginBottom: 0, textAlign: 'center' }}>
                  {status.message}
                </p>
              )}

              <div className="cta-row" style={{ justifyContent: 'center', marginTop: 28, gap: 12 }}>
                {stepIdx > 0 && (
                  <button type="button" className="btn secondary" onClick={back} disabled={submitting}>
                    Back
                  </button>
                )}
                <button type="submit" className="btn" disabled={!canContinue() || submitting}>
                  {submitting ? 'Sending…' : isLastStep ? 'Request my audit' : 'Continue'}
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </main>
  )
}
