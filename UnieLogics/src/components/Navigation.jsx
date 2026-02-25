import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const LOGO_URL = 'https://prepcenternearme.s3.us-east-1.amazonaws.com/unielogics/logofull.png'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/solutions', label: 'Solutions' },
  { path: '/services', label: 'Services' },
  { path: '/products', label: 'Products' },
  { path: '/industry-problems', label: 'Industry Problems' },
  { path: '/articles', label: 'Articles' },
]

const navGroups = [
  { id: 'offerings', label: 'Offerings', links: [
    { path: '/solutions', label: 'Solutions' },
    { path: '/services', label: 'Services' },
    { path: '/products', label: 'Products' },
  ]},
  { id: 'insights', label: 'Insights', links: [
    { path: '/industry-problems', label: 'Industry Problems' },
    { path: '/articles', label: 'Articles' },
  ]},
]

export default function Navigation() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const closeMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    closeMenu()
  }, [location.pathname])

  useEffect(() => {
    const onEscape = (e) => {
      if (e.key === 'Escape') closeMenu()
    }
    document.addEventListener('keydown', onEscape)
    return () => document.removeEventListener('keydown', onEscape)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      const y = window.scrollY
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${y}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      return () => {
        document.body.style.overflow = ''
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.left = ''
        document.body.style.right = ''
        window.scrollTo(0, y)
      }
    }
  }, [isMenuOpen])

  const isActive = (path) => location.pathname === path

  const mobileMenu = isMenuOpen ? createPortal(
    <>
      <div
        className="mobile-menu-backdrop"
        onClick={closeMenu}
        onKeyDown={(e) => e.key === 'Escape' && closeMenu()}
        aria-hidden="true"
      />
      <aside
        id="mobile-menu"
        className="mobile-menu-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
      >
        <button
          type="button"
          className="mobile-menu-close"
          onClick={closeMenu}
          aria-label="Close menu"
        >
          <span aria-hidden="true">×</span>
        </button>
        <nav className="mobile-menu-nav">
          <Link to="/" className={`mobile-menu-link ${location.pathname === '/' ? 'active' : ''}`} onClick={closeMenu}>
            Home
          </Link>
          {navGroups.map((g) => (
            <div key={g.id} className="mobile-menu-group">
              <span className="mobile-menu-group-label">{g.label}</span>
              {g.links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`mobile-menu-link ${isActive(link.path) ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="mobile-menu-theme">
            <ThemeToggle />
          </div>
        </nav>
      </aside>
    </>,
    document.body
  ) : null

  return (
    <>
      <nav className="navigation topbar" aria-label="Main navigation">
        <div className="topbar-content wrap">
          <div className="brand">
            <Link to="/" className="navigation-logo">
              <img src={LOGO_URL} alt="UnieLogics" />
            </Link>
          </div>
          <div className="nav-desktop right">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-top-link ${isActive(item.path) ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>
          <div className="nav-mobile right">
            <ThemeToggle />
            <button
              type="button"
              className="nav-hamburger"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setIsMenuOpen((v) => !v)}
            >
              <span className="nav-hamburger-icon">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </nav>
      {mobileMenu}
    </>
  )
}
