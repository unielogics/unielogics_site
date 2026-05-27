/**
 * Audit Your Business — direct submission to Cortex.
 *
 * Posts the audit-request straight to CortexBackend's public intake at
 *   POST https://api.uniecortex.com/v1/public/intake
 * exactly as cortex's own /audit-request form does, so the existing
 * onboarding workflow runs identically:
 *   1. CortexBackend persists the audit_request
 *   2. Auto-provisions an invitation + one-time access code
 *   3. Emails the activation link to the operator's work email
 *
 * No bridge, no UnieBackend hop — the user gets the same email + login
 * experience as if they'd filled the form on uniecortex.com.
 *
 * `audit_type` enum (Pydantic): carrier · rate · warehouse · seller · research · unsure
 * The unielogics form exposes carrier · rate · warehouse · seller · unsure (5 cards,
 * matches cortex's UI exactly).
 */

const CORTEX_INTAKE_URL =
  import.meta.env?.VITE_CORTEX_INTAKE_URL?.trim() ||
  'https://api.uniecortex.com/v1/public/intake'

const DEFAULT_SOURCE = 'UnieLogics Audit Your Business'

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
 * Submit an audit-request to Cortex's public intake.
 *
 * @param {object} state Audit form state: { auditType, contact, notes, source? }
 * @returns {Promise<{ success: boolean, reference?: string, error?: string, payload: object }>}
 */
export async function submitAuditRequest(state) {
  const payload = buildAuditPayload(state)

  // Client-side validation matching Cortex's Pydantic constraints
  if (!payload.audit_type) {
    return { success: false, error: 'Please pick an audit type', payload }
  }
  const c = payload.contact
  if (!c.first_name) return { success: false, error: 'First name is required', payload }
  if (!c.last_name) return { success: false, error: 'Last name is required', payload }
  if (!c.email) return { success: false, error: 'Work email is required', payload }
  if (!c.company) return { success: false, error: 'Company is required', payload }

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
      return { success: false, error: message, payload }
    }

    return {
      success: true,
      reference: data?.reference,
      status: data?.status,
      onboardingUrl: data?.onboarding_url || null,
      emailSent: !!data?.email_sent,
      payload,
    }
  } catch (err) {
    return {
      success: false,
      error: err?.message || 'Network error. Please try again.',
      payload,
    }
  }
}
