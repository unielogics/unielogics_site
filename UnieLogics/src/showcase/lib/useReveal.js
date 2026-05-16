import { useEffect, useRef } from 'react'

// Adds the `on` class to `.reveal` children when they enter the viewport.
export function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('on')
        })
      },
      { threshold: 0.15 }
    )
    const els = ref.current.querySelectorAll('.reveal')
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
  return ref
}
