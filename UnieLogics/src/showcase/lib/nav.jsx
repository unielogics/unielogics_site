import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

// Map the design prototype's static hrefs onto SPA routes.
const PAGE_MAP = {
  'index.html': '/',
  'cortex.html': '/cortex',
  'wms.html': '/wms',
  'tms.html': '/tms',
  'products.html': '/products',
}

function resolve(href) {
  if (!href) return { kind: 'none' }
  if (/^(https?:|mailto:|tel:)/.test(href)) return { kind: 'external', href }
  if (href.startsWith('#')) return { kind: 'hash', hash: href.slice(1) }
  const [page, hash] = href.split('#')
  const path = PAGE_MAP[page] ?? (page.startsWith('/') ? page : '/')
  return { kind: 'route', path, hash: hash || '' }
}

function smoothScrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// Drop-in replacement for the prototype's <a href="...">.
export function Anchor({ href, children, onClick, ...rest }) {
  const navigate = useNavigate()
  const location = useLocation()

  const target = resolve(href)

  if (target.kind === 'external') {
    return (
      <a href={target.href} target="_blank" rel="noreferrer" onClick={onClick} {...rest}>
        {children}
      </a>
    )
  }

  const handle = (e) => {
    if (onClick) onClick(e)
    if (e.defaultPrevented) return
    if (target.kind === 'none') return
    e.preventDefault()
    if (target.kind === 'hash') {
      smoothScrollTo(target.hash)
      return
    }
    // route
    if (target.path === location.pathname) {
      if (target.hash) smoothScrollTo(target.hash)
      else window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate(target.hash ? `${target.path}#${target.hash}` : target.path)
    }
  }

  const hrefAttr =
    target.kind === 'hash'
      ? `#${target.hash}`
      : target.path + (target.hash ? `#${target.hash}` : '')

  return (
    <a href={hrefAttr} onClick={handle} {...rest}>
      {children}
    </a>
  )
}

// Reset scroll on route change; honor #hash deep-links.
export function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      // wait a frame for the route's DOM to mount
      const t = setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        else window.scrollTo(0, 0)
      }, 60)
      return () => clearTimeout(t)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}
