/**
 * Provider-join submission (the "I want to plug in" workflow).
 *
 * ── BACKEND CONTRACT ───────────────────────────────────────────────────────
 * The dedicated network-onboarding endpoint does not exist yet. Until it does,
 * `submitJoinRequest()` flattens the structured payload into the `notes` field
 * and routes it through the existing lead pipeline (submitLead →
 * https://api.uniewms.com/api/v1/sales-request) so no application is ever lost.
 *
 * `buildJoinPayload()` returns the FULL structured object the backend should
 * eventually receive. When the real endpoint is ready, the only change needed
 * is inside `submitJoinRequest()`: POST `buildJoinPayload(state)` as JSON to
 * the new URL and stop flattening into notes. Nothing else in the app changes.
 *
 * Expected backend behavior on the join payload:
 *   1. Persist the provider application (identity + providerType + capabilities).
 *   2. Notify the network-onboarding team.
 *   3. Send a "we received it" confirmation email to identity.workEmail.
 *
 * Example payload (warehouse provider):
 * {
 *   "source": "UnieLogics Provider Join",
 *   "providerType": "warehouse",
 *   "identity": {
 *     "fullName": "Sam 3PL",
 *     "workEmail": "sam@northeast-3pl.com",
 *     "company": "Northeast 3PL",
 *     "roleTitle": "Owner",
 *     "phone": "+1 555 0144",
 *     "companyWebsite": "northeast-3pl.com"
 *   },
 *   "capabilities": {
 *     "servicesOffered": ["Receiving", "Storage", "Picking", "Packing", "Returns"],
 *     "marketplacesSupported": ["Amazon FBA prep", "Shopify"],
 *     "wmsInUse": "Native UnieWMS"
 *   },
 *   "scale": {
 *     "monthlyCapacityBand": "10,000 – 50,000 / mo",
 *     "regionsCovered": ["Northeast"],
 *     "yearsOperating": "5 – 10"
 *   },
 *   "integrations": {
 *     "systems": ["WMS", "API"],
 *     "willingToShareSignal": "Yes"
 *   },
 *   "consent": true,
 *   "meta": { "submittedAt": "2026-05-21T14:00:00.000Z", "pageUrl": "https://unielogics.com/join", "utm": {} }
 * }
 * ───────────────────────────────────────────────────────────────────────────
 */

import { submitLead } from './leadApi'

const JOIN_SOURCE = 'UnieLogics Provider Join'

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
 * Build the full structured provider-join payload.
 * Pure — no side effects.
 */
export function buildJoinPayload(state) {
  const {
    providerType = null,
    capabilities = {},
    scale = {},
    integrations = {},
    contact = {},
    consent = false,
  } = state || {}

  return {
    source: JOIN_SOURCE,
    providerType,
    identity: {
      fullName: contact.fullName?.trim() || '',
      workEmail: contact.workEmail?.trim().toLowerCase() || '',
      company: contact.company?.trim() || '',
      roleTitle: contact.roleTitle?.trim() || '',
      phone: contact.phone?.trim() || '',
      companyWebsite: contact.companyWebsite?.trim() || '',
    },
    capabilities: capabilities || {},
    scale: {
      monthlyCapacityBand: scale.monthlyCapacityBand || '',
      regionsCovered: Array.isArray(scale.regionsCovered) ? scale.regionsCovered : [],
      yearsOperating: scale.yearsOperating || '',
    },
    integrations: {
      systems: Array.isArray(integrations.systems) ? integrations.systems : [],
      willingToShareSignal: integrations.willingToShareSignal || '',
    },
    consent: !!consent,
    meta: {
      submittedAt: new Date().toISOString(),
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      utm: readUtm(),
    },
  }
}

function flattenToNotes(p) {
  const lines = [
    'PROVIDER JOIN APPLICATION',
    `Provider type: ${p.providerType || 'N/A'}`,
    '---',
    `Role/title: ${p.identity.roleTitle || 'N/A'}`,
    `Website: ${p.identity.companyWebsite || 'N/A'}`,
    '---',
    'Capabilities:',
    ...Object.entries(p.capabilities).map(
      ([k, v]) => `  ${k}: ${Array.isArray(v) ? v.join(', ') : v || 'N/A'}`,
    ),
    '---',
    `Monthly capacity: ${p.scale.monthlyCapacityBand || 'N/A'}`,
    `Regions covered: ${p.scale.regionsCovered.join(', ') || 'N/A'}`,
    `Years operating: ${p.scale.yearsOperating || 'N/A'}`,
    '---',
    `Systems / integrations: ${p.integrations.systems.join(', ') || 'N/A'}`,
    `Willing to share signal: ${p.integrations.willingToShareSignal || 'N/A'}`,
    '---',
    `Consent: ${p.consent ? 'yes' : 'no'}`,
  ]
  return lines.join('\n')
}

/**
 * Submit a provider-join application.
 * Today: routes through the existing lead endpoint (rich notes) so the
 * application is captured. Returns the same shape as submitLead plus the
 * structured payload.
 *
 * @returns {Promise<{ success: boolean, id?: string, error?: string, payload: object }>}
 */
export async function submitJoinRequest(state) {
  const payload = buildJoinPayload(state)

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
    source: JOIN_SOURCE,
  })
  // ──────────────────────────────────────────────────────────────────────────

  return { ...result, payload }
}
