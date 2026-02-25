import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const LOGO_URL = 'https://prepcenternearme.s3.us-east-1.amazonaws.com/unielogics/logofull.png'

// Desktop: all links flat in header
const navItems = [
  { path: '/', label: 'Home' },
  { path: '/solutions', label: 'Solutions' },
  { path: '/services', label: 'Services' },
  { path: '/products', label: 'Products' },
  { path: '/industry-problems', label: 'Industry Problems' },
  { path: '/articles', label: 'Articles' },
]

// Mobile panel: grouped for readability
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
  const navRef = useRef(null)

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const isActive = (path) => location.pathname === path

  return (
    <nav className="navigation topbar" ref={navRef} aria-label="Main navigation">
      <div className="topbar-content wrap">
        <div className="brand">
          <Link to="/" className="navigation-logo">
            <img src={LOGO_URL} alt="UnieLogics" />
          </Link>
        </div>

        {/* Desktop: all links in header */}
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

        {/* Mobile: hamburger + theme */}
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
            <span className={`nav-hamburger-icon ${isMenuOpen ? 'open' : ''}`}>
              <span className="nav-hamburger-line" />
              <span className="nav-hamburger-line" />
              <span className="nav-hamburger-line" />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu overlay + panel */}
      <div
        className={`menu-overlay ${isMenuOpen ? 'open' : ''}`}
        aria-hidden={!isMenuOpen}
        onClick={() => setIsMenuOpen(false)}
      />
      <div
        id="mobile-menu"
        className={`menu-panel ${isMenuOpen ? 'open' : ''}`}
        aria-hidden={!isMenuOpen}
      >
        <div className="menu-panel-inner">
          <Link
            to="/"
            className={`menu-panel-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          {navGroups.map((group) => (
            <div key={group.id} className="menu-panel-group">
              <span className="menu-panel-group-label">{group.label}</span>
              {group.links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`menu-panel-link ${isActive(link.path) ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="menu-panel-theme">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
