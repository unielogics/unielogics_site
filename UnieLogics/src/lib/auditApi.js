/**
 * Audit Your Business — submission.
 *
 * ── BACKEND CONTRACT ───────────────────────────────────────────────────────
 * The new UnieSales public endpoint isn't wired yet. Until it is, we route
 * through the existing lead pipeline (submitLead → /api/v1/sales-request)
 * which now returns 410 Gone — so submissions effectively land in the void
 * until Franco delivers the UnieSales URL. The structured payload below is
 * still built and returned so callers can verify the shape.
 *
 * When the UnieSales endpoint is ready, replace the submitLead call in
 * `submitAuditRequest()` with a direct POST of `buildAuditPayload(state)`
 * to the new URL. Nothing else needs to change.
 *
 * Expected backend behaviour on the audit payload:
 *   1. Persist the audit request (auditType + identity + notes).
 *   2. Issue a one-time activation token and email an activation link to
 *      identity.workEmail with instructions to run the audit.
 *
 * Example payload:
 * {
 *   "source": "UnieLogics Audit Your Business",
 *   "auditType": "label-spine",
 *   "identity": {
 *     "firstName": "Jane",
 *     "lastName": "Operator",
 *     "workEmail": "jane@acme3pl.com",
 *     "role": "COO / Ops lead",
 *     "company": "Acme 3PL",
 *     "companyWebsite": "https://acme3pl.com",
 *     "phone": "+1 555 0100"
 *   },
 *   "notes": "Mid-sized 3PL on the East Coast...",
 *   "meta": {
 *     "submittedAt": "2026-05-26T22:00:00.000Z",
 *     "pageUrl": "https://unielogics.com/audit?type=label-spine",
 *     "utm": {}
 *   }
 * }
 * ───────────────────────────────────────────────────────────────────────────
 */

import { submitLead } from './leadApi'

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
 * Build the full structured audit payload (the artifact handed to the backend).
 * Pure — no side effects.
 * @param {object} state Audit form state: { auditType, contact, notes, source? }
 */
export function buildAuditPayload(state) {
  const {
    auditType = null,
    contact = {},
    notes = '',
    source = DEFAULT_SOURCE,
  } = state || {}

  return {
    source,
    auditType,
    identity: {
      firstName: contact.firstName?.trim() || '',
      lastName: contact.lastName?.trim() || '',
      workEmail: contact.workEmail?.trim().toLowerCase() || '',
      role: contact.role?.trim() || '',
      company: contact.company?.trim() || '',
      companyWebsite: contact.companyWebsite?.trim() || '',
      phone: contact.phone?.trim() || '',
    },
    notes: notes?.trim() || '',
    meta: {
      submittedAt: new Date().toISOString(),
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      utm: readUtm(),
    },
  }
}

/** Human-readable flattening of the structured payload for the notes field. */
function flattenToNotes(p) {
  const lines = [
    'AUDIT YOUR BUSINESS — REQUEST',
    `Audit type: ${p.auditType || 'N/A'}`,
    '---',
    `Role: ${p.identity.role || 'N/A'}`,
    `Website: ${p.identity.companyWebsite || 'N/A'}`,
  ]
  if (p.notes) {
    lines.push('---', 'Operator notes:', p.notes)
  }
  return lines.join('\n')
}

/**
 * Submit an audit-your-business request.
 *
 * @returns {Promise<{ success: boolean, id?: string, error?: string, payload: object }>}
 */
export async function submitAuditRequest(state) {
  const payload = buildAuditPayload(state)

  if (!payload.auditType) {
    return { success: false, error: 'Please pick an audit type', payload }
  }
  if (!payload.identity.firstName || !payload.identity.lastName || !payload.identity.workEmail) {
    return { success: false, error: 'First name, last name, and work email are required', payload }
  }
  if (!payload.identity.company) {
    return { success: false, error: 'Company is required', payload }
  }

  // ── Integration seam ──────────────────────────────────────────────────────
  // When the UnieSales endpoint exists, replace the submitLead call below
  // with a direct POST of `payload` to https://api.uniesales.com/api/public/leads
  // (or whatever the final URL ends up being).
  const result = await submitLead({
    name: `${payload.identity.firstName} ${payload.identity.lastName}`.trim(),
    email: payload.identity.workEmail,
    phone: payload.identity.phone || undefined,
    company: payload.identity.company || undefined,
    notes: flattenToNotes(payload),
    source: payload.source,
  })
  // ──────────────────────────────────────────────────────────────────────────

  return { ...result, payload }
}
