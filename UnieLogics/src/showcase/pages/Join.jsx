// Join — provider workflow ("I run a business that fits the network").
// Multi-step form, plain-language, parallels /audit but for providers.
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { submitJoinRequest } from '../../lib/joinApi'

const PROVIDER_TYPES = [
  { id: 'warehouse', label: 'Warehouse / 3PL', desc: 'You run a fulfillment center, prep house, or 3PL — you have space, shelves, and people picking orders.' },
  { id: 'carrier-fleet', label: 'Carrier or fleet', desc: 'You run trucks. LTL, FTL, regional — any size fleet that moves freight for a living.' },
  { id: 'driver', label: 'Owner-operator driver', desc: 'You own your truck and pick your own loads. You want more matched work without a broker on the phone.' },
  { id: 'oms-marketplace', label: 'OMS or marketplace', desc: 'You build software that handles orders for sellers — a storefront, marketplace, or order-management platform.' },
  { id: 'broker', label: 'Freight broker', desc: 'You match shippers with carriers. You want a brain that surfaces capacity faster than the phone.' },
]

const REGIONS = ['Northeast', 'Southeast', 'Midwest', 'Southwest', 'West', 'National']
const CAPACITY_BANDS = [
  'Small · just getting started',
  'Mid · steady weekly volume',
  'Large · high weekly throughput',
  'Enterprise · national scale',
]
const YEARS_BANDS = ['Under 1 year', '1 – 3 years', '3 – 10 years', '10+ years']
const SYSTEMS = ['WMS', 'TMS', 'OMS', 'EDI', 'Direct API', 'Spreadsheets', 'None yet']

// Per-provider-type capability questions.
const TYPE_QUESTIONS = {
  warehouse: [
    { key: 'servicesOffered', label: 'Which services do you offer?', kind: 'multi', options: ['Receiving', 'Storage', 'Picking', 'Packing', 'Kitting', 'Returns', 'Cold chain', 'Hazmat'] },
    { key: 'marketplacesSupported', label: 'Which marketplaces or channels do you support today?', kind: 'multi', options: ['Amazon FBA prep', 'Walmart', 'Shopify', 'eBay', 'Direct-to-consumer', 'Other'] },
    { key: 'wmsInUse', label: 'Which warehouse software do you use today? (plain English is fine)', kind: 'text', placeholder: 'e.g. UnieWMS, in-house, paper + spreadsheets' },
  ],
  'carrier-fleet': [
    { key: 'equipmentTypes', label: 'What kind of trucks do you run?', kind: 'multi', options: ['Dry van', 'Reefer (refrigerated)', 'Flatbed', 'Sprinter / cargo van', 'Box truck'] },
    { key: 'laneTypes', label: 'What kind of lanes do you cover?', kind: 'multi', options: ['Regional (within ~250 miles)', 'Over-the-road (long haul)', 'Last-mile (local delivery)'] },
    { key: 'truckCountBand', label: 'How many trucks do you run?', kind: 'select', options: ['1', '2 – 5', '6 – 25', '26 – 100', '100+'] },
    { key: 'hoursOfService', label: 'How do you usually run hours?', kind: 'single', options: ['Solo driver', 'Team driving'] },
  ],
  driver: [
    { key: 'equipmentOwned', label: 'What do you drive?', kind: 'single', options: ['Dry van', 'Reefer (refrigerated)', 'Flatbed', 'Sprinter / cargo van', 'Box truck', 'Other'] },
    { key: 'geosPreferred', label: 'Where do you prefer to drive?', kind: 'multi', options: REGIONS },
    { key: 'weeklyAvailability', label: 'How many hours a week are you usually available?', kind: 'select', options: ['Under 20 hrs', '20 – 40 hrs', '40+ hrs'] },
    { key: 'currentDispatchSource', label: 'Where do most of your loads come from today?', kind: 'text', placeholder: 'e.g. one broker, multiple boards, direct shippers' },
  ],
  'oms-marketplace': [
    { key: 'marketplacesIntegrated', label: 'Which channels do you already connect to?', kind: 'multi', options: ['Amazon', 'Walmart', 'Shopify', 'eBay', 'BigCommerce', 'TikTok Shop', 'Other'] },
    { key: 'activeSellersBand', label: 'How many active sellers / merchants run on your platform?', kind: 'select', options: ['Under 50', '50 – 500', '500 – 5,000', '5,000+'] },
    { key: 'carriersSupported', label: 'Which carriers can your sellers ship with today?', kind: 'multi', options: ['FedEx', 'UPS', 'USPS', 'DHL', 'Regional carriers', 'LTL / freight'] },
  ],
  broker: [
    { key: 'laneFocus', label: 'What kind of freight do you broker?', kind: 'multi', options: ['LTL (less-than-truckload)', 'FTL (full truckload)', 'Last-mile', 'International'] },
    { key: 'carrierBaseSize', label: 'How big is your carrier base?', kind: 'select', options: ['Under 50 carriers', '50 – 500 carriers', '500+ carriers'] },
    { key: 'monthlyLoadsBand', label: 'Roughly how many loads a month do you move?', kind: 'select', options: ['Under 100', '100 – 1,000', '1,000 – 10,000', '10,000+'] },
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
  if (q.kind === 'single' || q.kind === 'yesno') {
    const opts = q.kind === 'yesno' ? ['Yes', 'No'] : q.options
    return (
      <div className="form-group audit-q">
        <label>{q.label}</label>
        <TileGrid options={opts} value={value} onToggle={(id) => setValue(id)} />
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

export default function Join() {
  const [searchParams] = useSearchParams()
  const [providerType, setProviderType] = useState(null)
  const [capabilities, setCapabilities] = useState({})
  const [scale, setScale] = useState({ monthlyCapacityBand: '', regionsCovered: [], yearsOperating: '' })
  const [integrations, setIntegrations] = useState({ systems: [], willingToShareSignal: '' })
  const [contact, setContact] = useState({
    fullName: '', workEmail: '', company: '', roleTitle: '', phone: '', companyWebsite: '',
  })
  const [consent, setConsent] = useState(false)
  const [stepIdx, setStepIdx] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t = searchParams.get('type')
    if (t && PROVIDER_TYPES.some((p) => p.id === t)) setProviderType(t)
  }, [searchParams])

  const steps = useMemo(
    () => ['provider', 'capabilities', 'scale', 'integrations', 'contact'],
    [],
  )
  const stepKey = steps[stepIdx]
  const totalSteps = steps.length
  const typeQuestions = providerType ? TYPE_QUESTIONS[providerType] || [] : []

  const canContinue = () => {
    switch (stepKey) {
      case 'provider': return !!providerType
      case 'capabilities': return true
      case 'scale':
        return !!scale.monthlyCapacityBand && !!scale.yearsOperating
      case 'integrations':
        return !!integrations.willingToShareSignal
      case 'contact':
        return (
          contact.fullName.trim() &&
          contact.workEmail.trim() &&
          contact.company.trim() &&
          consent
        )
      default: return true
    }
  }

  const next = () => setStepIdx((i) => Math.min(i + 1, totalSteps - 1))
  const back = () => setStepIdx((i) => Math.max(i - 1, 0))

  const handleSubmit = async () => {
    setSubmitting(true)
    setStatus(null)
    const result = await submitJoinRequest({
      providerType, capabilities, scale, integrations, contact, consent,
    })
    setSubmitting(false)
    if (result.success) {
      setDone(true)
    } else {
      setStatus({ ok: false, message: result.error || 'Something went wrong. Please try again.' })
    }
  }

  const isLastStep = stepIdx === totalSteps - 1
  const selectedType = PROVIDER_TYPES.find((p) => p.id === providerType)

  return (
    <main>
      <div className="wrap get-started-wrap">
        <section className="get-started-unified">
          <div className="get-started-header">
            <h1 className="page-title">Join the network</h1>
            <p className="page-subtitle">
              You run a warehouse, fleet, OMS, or driver business — we want you plugged in. Tell us
              what you do; we'll show you what the brain looks like from your window, and how to
              start receiving matched work.
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
              <h2 className="section-title">Thanks — you're on the list.</h2>
              <p className="micro" style={{ marginBottom: 16 }}>
                We've recorded your interest. A network onboarding lead will reach out to{' '}
                <strong>{contact.workEmail}</strong> within 2 business days to walk through next
                steps. Nothing for you to do in the meantime.
              </p>
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
              {stepKey === 'provider' && (
                <div className="form-step-panel reveal on">
                  <h2 className="section-title">What kind of business do you run?</h2>
                  <p className="micro" style={{ marginBottom: 16 }}>
                    Pick the one that best describes how you make money today.
                  </p>
                  <TileGrid options={PROVIDER_TYPES} value={providerType} onToggle={setProviderType} />
                </div>
              )}

              {stepKey === 'capabilities' && (
                <div className="form-step-panel reveal on">
                  <h2 className="section-title">
                    {selectedType ? `Tell us about your ${selectedType.label}` : 'Tell us what you do'}
                  </h2>
                  <p className="micro" style={{ marginBottom: 16 }}>
                    Pick everything that applies. We use this to match you to the right work and
                    the right view of the network.
                  </p>
                  {typeQuestions.map((q) => (
                    <Question
                      key={q.key}
                      q={q}
                      value={capabilities[q.key]}
                      setValue={(v) => setCapabilities((c) => ({ ...c, [q.key]: v }))}
                    />
                  ))}
                </div>
              )}

              {stepKey === 'scale' && (
                <div className="form-step-panel reveal on">
                  <h2 className="section-title">How big are you, and where do you operate?</h2>
                  <p className="micro" style={{ marginBottom: 16 }}>
                    No exact numbers needed — rough bands are fine.
                  </p>
                  <div className="form-group audit-q">
                    <label>How would you describe your monthly volume?</label>
                    <select
                      value={scale.monthlyCapacityBand}
                      onChange={(e) => setScale((s) => ({ ...s, monthlyCapacityBand: e.target.value }))}
                    >
                      <option value="">Select…</option>
                      {CAPACITY_BANDS.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div className="form-group audit-q">
                    <label>Which regions do you cover?</label>
                    <TileGrid
                      options={REGIONS}
                      value={scale.regionsCovered}
                      multi
                      onToggle={(id) =>
                        setScale((s) => ({
                          ...s,
                          regionsCovered: s.regionsCovered.includes(id)
                            ? s.regionsCovered.filter((x) => x !== id)
                            : [...s.regionsCovered, id],
                        }))
                      }
                    />
                  </div>
                  <div className="form-group audit-q">
                    <label>How long have you been operating?</label>
                    <select
                      value={scale.yearsOperating}
                      onChange={(e) => setScale((s) => ({ ...s, yearsOperating: e.target.value }))}
                    >
                      <option value="">Select…</option>
                      {YEARS_BANDS.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {stepKey === 'integrations' && (
                <div className="form-step-panel reveal on">
                  <h2 className="section-title">How will Cortex see your work?</h2>
                  <p className="micro" style={{ marginBottom: 16 }}>
                    The AI runs inside your own systems, not in a shared cloud. We connect by
                    consent — you approve what gets shared.
                  </p>
                  <div className="form-group audit-q">
                    <label>What software or connections do you have today?</label>
                    <TileGrid
                      options={SYSTEMS}
                      value={integrations.systems}
                      multi
                      onToggle={(id) =>
                        setIntegrations((i) => ({
                          ...i,
                          systems: i.systems.includes(id)
                            ? i.systems.filter((x) => x !== id)
                            : [...i.systems, id],
                        }))
                      }
                    />
                  </div>
                  <div className="form-group audit-q">
                    <label>
                      Are you open to letting Cortex read signal from your systems (with your
                      approval on every recommendation)?
                    </label>
                    <TileGrid
                      options={['Yes', 'Maybe — tell me more', 'Not yet']}
                      value={integrations.willingToShareSignal}
                      onToggle={(id) => setIntegrations((i) => ({ ...i, willingToShareSignal: id }))}
                    />
                  </div>
                </div>
              )}

              {stepKey === 'contact' && (
                <div className="form-step-panel reveal on">
                  <h2 className="section-title">How do we reach you?</h2>
                  <p className="micro" style={{ marginBottom: 16 }}>
                    A real person will respond within 2 business days.
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
                      I agree to be contacted about joining the UnieLogics network.
                    </span>
                  </label>
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
                  {submitting ? 'Sending…' : isLastStep ? 'Send my application' : 'Continue'}
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </main>
  )
}
