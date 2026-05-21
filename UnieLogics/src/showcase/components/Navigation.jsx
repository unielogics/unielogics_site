// Navigation — design header ported to the SPA.
// Scroll-aware light/dark, active-route highlight, mobile sheet.
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Anchor } from '../lib/nav'

const BRAND_ICON = 'https://prepcenternearme.s3.us-east-1.amazonaws.com/unielogics/icononly.png'

const LINKS = [
  { href: '/audit', label: 'Audit', key: 'audit' },
  { href: '/join', label: 'Join Our Supply Chain', key: 'join' },
]

const PATH_KEY = {
  '/audit': 'audit',
  '/join': 'join',
}

export default function Navigation() {
  const location = useLocation()
  const active = PATH_KEY[location.pathname] || ''
  const [light, setLight] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const sections = document.querySelectorAll('.section.light, .light-nav-zone')
      let inLight = false
      sections.forEach((s) => {
        const r = s.getBoundingClientRect()
        if (r.top <= 80 && r.bottom >= 80) inLight = true
      })
      setLight(inLight)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

  // Close the sheet whenever the route changes.
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const onLink = () => setMobileOpen(false)

  return (
    <>
      <nav className={`nav ${light ? 'nav-light' : ''}`}>
        <Anchor href="index.html" className="nav-logo">
          <img className="logo-img" src={BRAND_ICON} alt="UnieLogics" />
          UnieLogics
        </Anchor>
        <div className="nav-links">
          {LINKS.map((l) => (
            <Anchor
              key={l.key}
              href={l.href}
              style={active === l.key ? { color: 'var(--accent)' } : {}}
            >
              {l.label}
            </Anchor>
          ))}
        </div>
        <Anchor href="/audit" className="nav-cta">Audit my business →</Anchor>
        <button
          className="nav-mobile-toggle"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="7" x2="21" y2="7"></line><line x1="3" y1="13" x2="21" y2="13"></line><line x1="3" y1="19" x2="21" y2="19"></line></svg>
          )}
        </button>
      </nav>
      <div className={`nav-mobile-sheet ${mobileOpen ? 'is-open' : ''}`}>
        <Anchor href="/audit" onClick={onLink}>Audit my business</Anchor>
        <Anchor href="/join" onClick={onLink}>Join Our Supply Chain</Anchor>
        <Anchor href="/audit" onClick={onLink} className="nav-mobile-cta">Audit my business →</Anchor>
      </div>
    </>
  )
}
