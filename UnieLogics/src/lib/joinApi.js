/**
 * Provider-join submission (the "I want to plug in" workflow).
 *
 * ── BACKEND CONTRACT ───────────────────────────────────────────────────────
 * Submits the structured payload directly to UnieSales' public intake at
 *   POST https://api.uniesales.com/public/intake/unielogics (tag: 'join')
 * via submitToUnieSales(). The full structured payload (providerType,
 * capabilities, scale, integrations, consent) lands verbatim in
 * UnieSales' custom_fields.fields — no flattening into notes.
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

import { submitToUnieSales } from './leadApi'

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

/**
 * Submit a provider-join application directly to UnieSales' public intake.
 * The full structured payload (providerType / capabilities / scale /
 * integrations / consent) is preserved verbatim under `fields`; contact is
 * normalized from the identity block.
 *
 * @returns {Promise<{ success: boolean, lead_id?: string|null, error?: string, payload: object }>}
 */
export async function submitJoinRequest(state) {
  const payload = buildJoinPayload(state)

  if (!payload.identity.fullName || !payload.identity.workEmail) {
    return { success: false, error: 'Name and work email are required', payload }
  }
  if (!payload.consent) {
    return { success: false, error: 'Please accept the consent checkbox to continue', payload }
  }

  const result = await submitToUnieSales({
    tag: 'join',
    contact: {
      contactName: payload.identity.fullName,
      email: payload.identity.workEmail,
      phone: payload.identity.phone || undefined,
      company: payload.identity.company || undefined,
      title: payload.identity.roleTitle || undefined,
    },
    fields: {
      providerType: payload.providerType,
      capabilities: payload.capabilities,
      scale: payload.scale,
      integrations: payload.integrations,
      consent: payload.consent,
      company_site: payload.identity.companyWebsite || '',
    },
    hp_email: state?.hpEmail || '',
  })

  return { ...result, payload }
}
