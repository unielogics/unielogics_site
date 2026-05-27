// Honeypot field — hardened against Chrome autofill while remaining bait for bots.
//
// Why this isn't trivial: when the input's `name` attribute literally contains
// "email", Chrome ignores `autocomplete="off"` and fills it with the user's
// saved address anyway. We saw this in UnieSales server logs — real users
// submitting from unielogics.com were getting silently dropped because their
// autofilled email landed in `hp_email`, triggering the bot-detection branch
// on the backend.
//
// The fix is two-pronged:
//   1. Render the input with a name attribute that doesn't look email-ish
//      (so Chrome's heuristic doesn't target it for autofill).
//   2. Make the input *uncontrolled* and read its value off the DOM at submit
//      time. That way React doesn't fight (or accidentally adopt) any value
//      Chrome may still try to inject — but real bots that programmatically
//      fill every input on the page will still leave fingerprints we can read.
//
// We send the captured value to the backend under the documented `hp_email`
// JSON key regardless of the rendered input's name attribute — the backend
// only cares about the body shape, not the HTML form-name.
import { useCallback, useRef } from 'react'

// Deliberately non-email-ish, non-standard. Bots fill anything; Chrome ignores.
const HP_FIELD_NAME = '__website_check'

const wrapperStyle = {
  position: 'absolute',
  left: '-9999px',
  top: 'auto',
  width: 1,
  height: 1,
  overflow: 'hidden',
}

/**
 * Returns:
 *   field    — JSX to render somewhere inside your <form>
 *   getValue — call at submit time to read the current DOM value
 *
 * Real users with Chrome autofill on: getValue() returns ''.
 * Bots that fill every input: getValue() returns whatever they put in,
 * which the backend then drops via its honeypot guard.
 */
export function useHoneypot() {
  const ref = useRef(null)
  const getValue = useCallback(() => ref.current?.value || '', [])
  const field = (
    <div aria-hidden="true" style={wrapperStyle}>
      <label>
        Don't fill this out
        <input
          ref={ref}
          name={HP_FIELD_NAME}
          type="text"
          defaultValue=""
          autoComplete="off"
          tabIndex={-1}
          inputMode="none"
          data-1p-ignore="true"
          data-lpignore="true"
        />
      </label>
    </div>
  )
  return { field, getValue }
}
