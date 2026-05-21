/**
 * Audit-request submission.
 *
 * ── BACKEND CONTRACT ───────────────────────────────────────────────────────
 * The dedicated audit-activation endpoint does not exist yet. Until it does,
 * `submitAuditRequest()` flattens the structured payload into the `notes`
 * field and routes it through the existing lead pipeline (submitLead →
 * https://api.uniewms.com/api/v1/sales-request) so no request is ever lost.
 *
 * `buildAuditPayload()` returns the FULL structured object the backend should
 * eventually receive. When the real endpoint is ready, the only change needed
 * is inside `submitAuditRequest()`: POST `buildAuditPayload(state)` as JSON to
 * the new URL and stop flattening into notes. Nothing else in the app changes.
 *
 * Expected backend behavior on the audit payload:
 *   1. Persist the audit request (identity + persona + auditType + answers).
 *   2. Issue a ONE-TIME activation token and email an activation link to
 *      identity.workEmail with instructions to run the auditing tool.
 *   3. For mode === 'complete', persist `scheduling` and confirm the slot.
 *
 * Example payload (mode 'complete'):
 * {
 *   "source": "UnieLogics Audit Request",
 *   "mode": "complete",
 *   "persona": "warehouse",
 *   "auditType": "complete-business",
 *   "identity": {
 *     "fullName": "Jane Operator",
 *     "workEmail": "jane@acme3pl.com",
 *     "company": "Acme 3PL",
 *     "roleTitle": "VP Operations",
 *     "phone": "+1 555 0100",
 *     "companyWebsite": "acme3pl.com"
 *   },
 *   "common": {
 *     "primaryProblem": "Margins disappearing on small parcels",
 *     "monthlyVolumeBand": "10k-50k",
 *     "locationsCount": "2-5",
 *     "systemsInUse": ["WMS", "OMS", "carrier APIs"],
 *     "timeline": "1-3 months",
 *     "howHeard": "Referral"
 *   },
 *   "answers": {
 *     "carriersUsed": ["FedEx", "UPS", "USPS"],
 *     "marketplaces": ["Amazon", "Shopify"],
 *     "decisionRole": "Decision maker",
 *     "budgetAuthority": "yes",
 *     "focusAreas": ["Shipping cost", "Network footprint"]
 *   },
 *   "scheduling": { "date": "2026-06-02", "timeSlot": "10:30", "timezone": "America/New_York" },
 *   "consent": true,
 *   "meta": { "submittedAt": "2026-05-18T14:00:00.000Z", "pageUrl": "https://unielogics.com/audit?type=complete-business", "utm": {} }
 * }
 * ───────────────────────────────────────────────────────────────────────────
 */

import { submitLead } from './leadApi'

const AUDIT_SOURCE = 'UnieLogics Audit Request'

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
 * @param {object} state Audit form state.
 */
export function buildAuditPayload(state) {
  const {
    persona = null,
    auditType = null,
    mode = 'standard',
    common = {},
    answers = {},
    contact = {},
    consent = false,
    scheduling = null,
  } = state || {}

  return {
    source: AUDIT_SOURCE,
    mode,
    persona,
    auditType,
    identity: {
      fullName: contact.fullName?.trim() || '',
      workEmail: contact.workEmail?.trim().toLowerCase() || '',
      company: contact.company?.trim() || '',
      roleTitle: contact.roleTitle?.trim() || '',
      phone: contact.phone?.trim() || '',
      companyWebsite: contact.companyWebsite?.trim() || '',
    },
    common: {
      primaryProblem: common.primaryProblem?.trim() || '',
      monthlyVolumeBand: common.monthlyVolumeBand || '',
      locationsCount: common.locationsCount || '',
      systemsInUse: Array.isArray(common.systemsInUse) ? common.systemsInUse : [],
      timeline: common.timeline || '',
      howHeard: common.howHeard?.trim() || '',
    },
    answers: answers || {},
    scheduling: mode === 'complete' ? scheduling || null : null,
    consent: !!consent,
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
    'AUDIT REQUEST',
    `Mode: ${p.mode}`,
    `Audit type: ${p.auditType || 'N/A'}`,
    `Persona: ${p.persona || 'N/A'}`,
    '---',
    `Role/title: ${p.identity.roleTitle || 'N/A'}`,
    `Website: ${p.identity.companyWebsite || 'N/A'}`,
    '---',
    `Primary problem: ${p.common.primaryProblem || 'N/A'}`,
    `Monthly volume: ${p.common.monthlyVolumeBand || 'N/A'}`,
    `Locations: ${p.common.locationsCount || 'N/A'}`,
    `Systems in use: ${p.common.systemsInUse.join(', ') || 'N/A'}`,
    `Timeline: ${p.common.timeline || 'N/A'}`,
    `How heard: ${p.common.howHeard || 'N/A'}`,
    '---',
    'Audit-specific answers:',
    ...Object.entries(p.answers).map(
      ([k, v]) => `  ${k}: ${Array.isArray(v) ? v.join(', ') : v}`,
    ),
  ]
  if (p.scheduling) {
    lines.push(
      '---',
      `Requested call: ${p.scheduling.date} ${p.scheduling.timeSlot} (${p.scheduling.timezone})`,
    )
  }
  lines.push('---', `Consent: ${p.consent ? 'yes' : 'no'}`)
  return lines.join('\n')
}

/**
 * Submit an audit request.
 * Today: routes through the existing lead endpoint (rich notes) so the lead is
 * captured. Returns the same shape as submitLead plus the structured payload.
 *
 * @returns {Promise<{ success: boolean, id?: string, error?: string, payload: object }>}
 */
export async function submitAuditRequest(state) {
  const payload = buildAuditPayload(state)

  if (!payload.identity.fullName || !payload.identity.workEmail) {
    return { success: false, error: 'Name and work email are required', payload }
  }
  if (!payload.consent) {
    return { success: false, error: 'Please accept the consent checkbox to continue', payload }
  }

  // ── Integration seam ──────────────────────────────────────────────────────
  // When the dedicated endpoint exists, replace the block below with a direct
  // POST of `payload` to the new URL.
  const result = await submitLead({
    name: payload.identity.fullName,
    email: payload.identity.workEmail,
    phone: payload.identity.phone || undefined,
    company: payload.identity.company || undefined,
    notes: flattenToNotes(payload),
    source: AUDIT_SOURCE,
  })
  // ──────────────────────────────────────────────────────────────────────────

  return { ...result, payload }
}
