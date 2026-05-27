/**
 * Lead/contact form submission to UnieSales.
 *
 * All marketing-site lead forms on unielogics.com now post directly to
 * UnieSales' public intake endpoint:
 *
 *   POST {VITE_UNIESALES_INTAKE_URL}/public/intake/unielogics
 *   (default https://api.uniesales.com)
 *
 * Envelope shape (matches UnieSales_Backend/docs/public-site-intake.md):
 *
 *   {
 *     tag,            // one of: audit | join | get_started | developer |
 *                     //         industry_problems | products_inquiry | services_inquiry
 *     page_url,
 *     contact: { contactName, email, phone?, company?, title?, city?, state? },
 *     fields:  { ...form payload verbatim (no nesting limits) },
 *     meta:    { submittedAt, utm? },
 *     hp_email,       // honeypot. Empty string for real users.
 *   }
 *
 * Success codes: 2xx and 409 (de-dupe). Returns { success: true, lead_id }.
 * Failure codes: 400 / 401 / 429 / 5xx → { success: false, error }.
 *
 * Cortex onboarding for `/audit` is preserved separately in auditApi.js;
 * this module never talks to Cortex.
 */

const DEFAULT_BASE = 'https://api.uniesales.com'
const REQUEST_TIMEOUT_MS = 8000

const UNIESALES_BASE =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_UNIESALES_INTAKE_URL?.trim()) ||
  DEFAULT_BASE

function endpointFor(site) {
  return `${UNIESALES_BASE.replace(/\/+$/, '')}/public/intake/${site}`
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

function currentPageUrl() {
  if (typeof window === 'undefined') return ''
  return window.location.href
}

function normalizeContact(contact = {}) {
  const out = {}
  // contactName | name | fullName all accepted as input
  const name =
    contact.contactName?.trim() ||
    contact.name?.trim() ||
    contact.fullName?.trim() ||
    ''
  if (name) out.contactName = name
  if (contact.email) out.email = String(contact.email).trim().toLowerCase()
  if (contact.phone) out.phone = String(contact.phone).trim()
  if (contact.company) out.company = String(contact.company).trim()
  if (contact.title) out.title = String(contact.title).trim()
  if (contact.city) out.city = String(contact.city).trim()
  if (contact.state) out.state = String(contact.state).trim()
  return out
}

/**
 * Submit a lead to UnieSales public intake for the unielogics site.
 *
 * @param {object} args
 * @param {string} args.tag              UnieSales tag (audit | join | ...)
 * @param {object} args.contact          { contactName/name/fullName, email, phone?, company?, title?, city?, state? }
 * @param {object} [args.fields]         Form-specific structured payload (stored verbatim in custom_fields.fields)
 * @param {string} [args.page_url]       Current page URL (defaults to window.location.href)
 * @param {string} [args.hp_email]       Honeypot value (default '')
 * @param {object} [args.meta]           Extra meta (merged with utm + submittedAt)
 * @param {string} [args.site]           Override target site (defaults to 'unielogics')
 * @returns {Promise<{ success: boolean, lead_id?: string|null, status?: number, error?: string }>}
 */
export async function submitToUnieSales({
  tag,
  contact,
  fields = {},
  page_url,
  hp_email = '',
  meta = {},
  site = 'unielogics',
} = {}) {
  if (!tag) return { success: false, error: 'tag is required' }
  const normalized = normalizeContact(contact)
  if (!normalized.email) return { success: false, error: 'email is required' }
  if (!normalized.contactName) return { success: false, error: 'contactName is required' }

  const envelope = {
    tag,
    page_url: page_url || currentPageUrl(),
    contact: normalized,
    fields,
    meta: {
      submittedAt: new Date().toISOString(),
      utm: { ...readUtm(), ...(meta?.utm || {}) },
      ...Object.fromEntries(Object.entries(meta).filter(([k]) => k !== 'utm')),
    },
    hp_email,
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  try {
    const res = await fetch(endpointFor(site), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(envelope),
      signal: controller.signal,
    })
    clearTimeout(timer)
    const data = await res.json().catch(() => ({}))
    // 2xx and 409 (duplicate) both treated as user-facing success per spec.
    if ((res.status >= 200 && res.status < 300) || res.status === 409) {
      return {
        success: true,
        lead_id: data?.lead_id ?? null,
        status: res.status,
      }
    }
    if (res.status === 429) {
      return { success: false, status: 429, error: "You're submitting too fast. Try again in a minute." }
    }
    return {
      success: false,
      status: res.status,
      error: data?.error || data?.message || "Couldn't send right now. Please try again.",
    }
  } catch (err) {
    clearTimeout(timer)
    if (err?.name === 'AbortError') {
      return { success: false, error: "Request timed out. Please try again." }
    }
    return { success: false, error: err?.message || 'Network error. Please try again.' }
  }
}

/**
 * Legacy compatibility shim — translates the old submitLead() shape
 * (name/email/phone/company/notes/source) into the new envelope.
 * Existing callers will be migrated to call submitToUnieSales() directly,
 * but in the meantime they continue to work via this wrapper.
 *
 * `source` infers `tag` from prefix:
 *   "UnieLogics Audit Request"   → audit
 *   "UnieLogics Provider Join"   → join
 *   "UnieLogics Get Started"     → get_started
 *   "UnieLogics Employment"      → developer
 *   "UnieLogics Industry ..."    → industry_problems
 *   "UnieLogics Products ..."    → products_inquiry
 *   "UnieLogics Services ..."    → services_inquiry
 *   anything else                → get_started (safe default)
 */
function inferTagFromLegacySource(source) {
  const s = (source || '').toLowerCase()
  if (s.includes('audit')) return 'audit'
  if (s.includes('join') || s.includes('provider')) return 'join'
  if (s.includes('employment') || s.includes('developer')) return 'developer'
  if (s.includes('industry')) return 'industry_problems'
  if (s.includes('product')) return 'products_inquiry'
  if (s.includes('service')) return 'services_inquiry'
  if (s.includes('get started') || s.includes('get-started')) return 'get_started'
  return 'get_started'
}

export async function submitLead(payload = {}) {
  const { name, email, phone, company, notes, source, hpEmail } = payload
  const tag = inferTagFromLegacySource(source)
  return submitToUnieSales({
    tag,
    contact: { contactName: name, email, phone, company },
    fields: {
      legacy_source: source || 'UnieLogics Contact',
      notes: notes || '',
    },
    hp_email: hpEmail || '',
  }).then((r) => ({
    success: r.success,
    id: r.lead_id ?? undefined,
    message: r.success ? 'Submitted' : undefined,
    error: r.error,
  }))
}
