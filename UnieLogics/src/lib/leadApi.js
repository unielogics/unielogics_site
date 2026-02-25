/**
 * Lead/contact form submission to UnieWMS backend
 * Posts to SalesRequest API - leads appear in super-admin dashboard (franco@unielogics.com)
 * Employment form (footer developer widget) uses source "UnieLogics Employment" → appears under Employment tab
 */

const API_BASE =
  typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL
    ? import.meta.env.VITE_API_BASE_URL
    : 'https://api.uniewms.com/api/v1'

/** Source prefix required for relaxed backend validation (phone optional) */
const SOURCE_PREFIX = 'UnieLogics '

/**
 * Submit a lead/sales request to the UnieWMS backend.
 * Source must start with "UnieLogics " for relaxed validation (phone optional, role auto).
 *
 * @param {object} payload - { name, email, phone?, company?, notes?, source }
 * @returns {Promise<{ success: boolean; id?: string; message?: string; error?: string }>}
 */
export async function submitLead(payload) {
  const { name, email, phone, company, notes, source } = payload
  if (!name?.trim() || !email?.trim()) {
    return { success: false, error: 'Name and email are required' }
  }
  const sourceStr = source && String(source).trim()
  const fullSource = sourceStr?.startsWith(SOURCE_PREFIX)
    ? sourceStr
    : SOURCE_PREFIX + (sourceStr || 'Contact')
  const body = {
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    phone: phone && String(phone).trim() ? String(phone).trim() : undefined,
    company: company?.trim() || undefined,
    notes: notes?.trim() || undefined,
    source: fullSource,
    role: fullSource,
    smsConsent: false,
    callConsent: false,
  }
  try {
    const res = await fetch(`${API_BASE}/sales-request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      return { success: false, error: data.error || 'Submission failed' }
    }
    return { success: true, id: data.id, message: data.message }
  } catch (err) {
    return { success: false, error: err.message || 'Network error' }
  }
}
