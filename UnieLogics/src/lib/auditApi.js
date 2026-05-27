/**
 * Audit Your Business — direct submission to Cortex + parallel UnieSales mirror.
 *
 * 1. PRIMARY: POST straight to CortexBackend's public intake at
 *      POST https://api.uniecortex.com/v1/public/intake
 *    exactly as cortex's own /audit-request form does, so the existing
 *    onboarding workflow runs identically:
 *      a. CortexBackend persists the audit_request
 *      b. Auto-provisions an invitation + one-time access code
 *      c. Emails the activation link to the operator's work email
 *    This is the canonical success signal — UI status follows this response.
 *
 * 2. PARALLEL (fire-and-forget): POST a normalized envelope to UnieSales
 *      POST https://api.uniesales.com/public/intake/unielogics (tag: 'audit')
 *    so the lead lands in the sales workspace. Failure here NEVER flips the
 *    user-facing success state and NEVER affects the Cortex onboarding email.
 *
 * `audit_type` enum (Pydantic): carrier · rate · warehouse · seller · research · unsure
 * The unielogics form exposes carrier · rate · warehouse · seller · unsure (5 cards,
 * matches cortex's UI exactly).
 */

import { submitToUnieSales } from './leadApi'

const CORTEX_INTAKE_URL =
  import.meta.env?.VITE_CORTEX_INTAKE_URL?.trim() ||
  'https://api.uniecortex.com/v1/public/intake'

// Base URL of cortex's gated app (where /invite/<token> and
// /verify?email=... live). The cortex intake response only returns the
// onboarding URL — the verify URL is emailed but not surfaced in JSON,
// so we build it client-side from the user's email + this stable base.
const CORTEX_APP_BASE =
  import.meta.env?.VITE_CORTEX_APP_URL?.trim() || 'https://ai.uniecortex.com'

const DEFAULT_SOURCE = 'UnieLogics Audit Your Business'

function buildVerifyUrl(email) {
  const trimmed = (email || '').trim().toLowerCase()
  if (!trimmed) return null
  return `${CORTEX_APP_BASE.replace(/\/+$/, '')}/verify?email=${encodeURIComponent(trimmed)}`
}

function readUtm() {
  if (typeof window === 'undefined') return {}
  const p = new URLSearchParams(window.location.search)
  const utm = {}
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
    const v = p.get(k)
    if (v) utm[k] = v
  }
  return utm
}

/**
 * Build the audit_request payload in the exact shape Cortex's Pydantic
 * AuditRequestIn schema accepts. Pure — no side effects.
 */
export function buildAuditPayload(state) {
  const {
    auditType = null,
    contact = {},
    notes = '',
    source = DEFAULT_SOURCE,
  } = state || {}

  const pagePath =
    typeof window !== 'undefined'
      ? window.location.pathname + window.location.search
      : '/audit'

  return {
    form: 'audit_request',
    audit_type: auditType,
    problems: [],
    baseline: {},
    volume: {
      parcels: '',
      lanes: '',
      skus: '',
      revenue: '',
    },
    has_data_ready: false,
    contact: {
      first_name: contact.firstName?.trim() || '',
      last_name: contact.lastName?.trim() || '',
      email: contact.workEmail?.trim().toLowerCase() || '',
      role: contact.role?.trim() || 'Other',
      company: contact.company?.trim() || '',
      company_site: contact.companyWebsite?.trim() || '',
      phone: contact.phone?.trim() || '',
    },
    // Cortex's `notes` field — also stuff the source + UTM into it so
    // the cortex operator knows which surface the lead came from.
    notes: [
      notes?.trim() || '',
      '',
      `Source: ${source}`,
      `Page: ${typeof window !== 'undefined' ? window.location.href : 'n/a'}`,
      ...Object.entries(readUtm()).map(([k, v]) => `${k}: ${v}`),
    ]
      .filter(Boolean)
      .join('\n')
      .slice(0, 4000),
    page_path: pagePath.slice(0, 300),
  }
}

/**
 * Fire the UnieSales mirror in parallel with the Cortex POST. Never throws,
 * never blocks success — failures are silently logged. Stuffs the full
 * Cortex Pydantic payload into `fields` verbatim so the sales team sees the
 * exact audit selections.
 */
function fireUnieSalesMirror(state, cortexPayload, hpEmail) {
  const c = cortexPayload.contact || {}
  // Pull source/state contact names so contactName preserves original casing.
  const stateContact = state?.contact || {}
  const fullName = [c.first_name, c.last_name].filter(Boolean).join(' ').trim()

  return submitToUnieSales({
    tag: 'audit',
    contact: {
      contactName: fullName || stateContact.firstName + ' ' + stateContact.lastName,
      email: c.email,
      phone: c.phone || undefined,
      company: c.company || undefined,
      title: c.role || undefined,
    },
    fields: {
      audit_type: cortexPayload.audit_type,
      problems: cortexPayload.problems || [],
      baseline: cortexPayload.baseline || {},
      volume: cortexPayload.volume || {},
      has_data_ready: !!cortexPayload.has_data_ready,
      notes: cortexPayload.notes || '',
      page_path: cortexPayload.page_path || '',
      company_site: c.company_site || '',
    },
    hp_email: hpEmail || '',
  }).catch((err) => {
    // Fire-and-forget — never surface to user, never break Cortex success.
    if (typeof console !== 'undefined') {
      console.warn('[audit] UnieSales mirror failed (Cortex onboarding unaffected):', err?.message || err)
    }
    return { success: false, error: err?.message }
  })
}

/**
 * Submit an audit-request:
 *   • Primary: Cortex /v1/public/intake (canonical — triggers onboarding email)
 *   • Mirror: UnieSales /public/intake/unielogics (fire-and-forget — feeds sales)
 *
 * Both fire in parallel. The UI's success state is determined entirely by the
 * Cortex response. UnieSales failure is logged and dropped on the floor.
 *
 * @param {object} state Audit form state: { auditType, contact, notes, source?, hpEmail? }
 * @returns {Promise<{ success: boolean, reference?: string, error?: string, payload: object }>}
 */
export async function submitAuditRequest(state) {
  const payload = buildAuditPayload(state)
  const hpEmail = state?.hpEmail || ''

  // Client-side validation matching Cortex's Pydantic constraints
  if (!payload.audit_type) {
    return { success: false, error: 'Please pick an audit type', payload }
  }
  const c = payload.contact
  if (!c.first_name) return { success: false, error: 'First name is required', payload }
  if (!c.last_name) return { success: false, error: 'Last name is required', payload }
  if (!c.email) return { success: false, error: 'Work email is required', payload }
  if (!c.company) return { success: false, error: 'Company is required', payload }

  // Fire UnieSales mirror in parallel — it will resolve in its own .catch()
  // without affecting the Cortex POST below. We don't await the result here.
  const mirrorPromise = fireUnieSalesMirror(state, payload, hpEmail)

  try {
    const res = await fetch(CORTEX_INTAKE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      // Cortex returns 429 on rate-limit, 422 on validation failure, 500 on server error.
      const message =
        (typeof data?.detail === 'string' && data.detail) ||
        (Array.isArray(data?.detail) && data.detail[0]?.msg) ||
        (res.status === 429
          ? 'You\'re submitting too fast. Try again in a minute.'
          : `Submission failed (HTTP ${res.status}). Please try again.`)
      // Ensure mirror finishes (resolves) even on Cortex failure so it isn't dropped.
      mirrorPromise.catch(() => {})
      return { success: false, error: message, payload }
    }

    // Cortex succeeded → user is good. Mirror promise continues in background.
    mirrorPromise.catch(() => {})

    return {
      success: true,
      reference: data?.reference,
      status: data?.status,
      onboardingUrl: data?.onboarding_url || null,
      verifyUrl: buildVerifyUrl(state?.contact?.workEmail),
      emailSent: !!data?.email_sent,
      payload,
    }
  } catch (err) {
    mirrorPromise.catch(() => {})
    return {
      success: false,
      error: err?.message || 'Network error. Please try again.',
      payload,
    }
  }
}
