// SchedulePicker — self-contained Calendly-style date + time picker.
// No external dependency. Emits { date: 'YYYY-MM-DD', timeSlot: 'HH:MM', timezone }.
import { useMemo, useState } from 'react'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
]

function ymd(d) {
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

function startOfToday() {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

export function SchedulePicker({ value, onChange }) {
  const today = startOfToday()
  const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() })
  const timezone = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
    [],
  )

  const selectedDate = value?.date || null
  const selectedSlot = value?.timeSlot || null

  const grid = useMemo(() => {
    const first = new Date(view.year, view.month, 1)
    const startPad = first.getDay()
    const daysInMonth = new Date(view.year, view.month + 1, 0).getDate()
    const cells = []
    for (let i = 0; i < startPad; i++) cells.push(null)
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(view.year, view.month, d))
    return cells
  }, [view])

  const atFirstMonth =
    view.year === today.getFullYear() && view.month === today.getMonth()

  const shiftMonth = (delta) => {
    setView((v) => {
      const m = v.month + delta
      return { year: v.year + Math.floor(m / 12), month: ((m % 12) + 12) % 12 }
    })
  }

  const pickDate = (d) => {
    onChange({ date: ymd(d), timeSlot: null, timezone })
  }
  const pickSlot = (slot) => {
    onChange({ date: selectedDate, timeSlot: slot, timezone })
  }

  const isPast = (d) => d < today
  const isWeekend = (d) => d.getDay() === 0 || d.getDay() === 6
  const disabled = (d) => isPast(d) || isWeekend(d)

  return (
    <div className="sched">
      <div className="sched-cal">
        <div className="sched-cal-head">
          <button
            type="button"
            className="sched-nav"
            onClick={() => shiftMonth(-1)}
            disabled={atFirstMonth}
            aria-label="Previous month"
          >
            ‹
          </button>
          <div className="sched-month">{MONTHS[view.month]} {view.year}</div>
          <button
            type="button"
            className="sched-nav"
            onClick={() => shiftMonth(1)}
            aria-label="Next month"
          >
            ›
          </button>
        </div>
        <div className="sched-weekdays">
          {WEEKDAYS.map((w) => (
            <span key={w}>{w}</span>
          ))}
        </div>
        <div className="sched-days">
          {grid.map((d, i) =>
            d ? (
              <button
                key={i}
                type="button"
                className={`sched-day${selectedDate === ymd(d) ? ' is-selected' : ''}`}
                onClick={() => pickDate(d)}
                disabled={disabled(d)}
              >
                {d.getDate()}
              </button>
            ) : (
              <span key={i} className="sched-day is-empty" />
            ),
          )}
        </div>
        <div className="sched-tz">Times shown in {timezone}</div>
      </div>

      <div className="sched-slots">
        {!selectedDate && (
          <p className="sched-hint">Select a day to see available times.</p>
        )}
        {selectedDate && (
          <>
            <div className="sched-slots-head">
              {new Date(selectedDate + 'T00:00:00').toLocaleDateString(undefined, {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <div className="sched-slot-grid">
              {TIME_SLOTS.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`sched-slot${selectedSlot === s ? ' is-selected' : ''}`}
                  onClick={() => pickSlot(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
