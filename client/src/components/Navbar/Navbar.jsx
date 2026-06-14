import { useState, useEffect } from 'react'
import './Navbar.css'

const NAV_LINKS    = ['about', 'portfolio', 'services', 'pricing', 'products', 'testimonials']
const MOBILE_LINKS = ['about', 'portfolio', 'services', 'pricing', 'products', 'booking']

function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      <nav className={`navbar${scrolled ? ' is-scrolled' : ''}`}>

        <a href='#hero' className='navbar-logo'>
          Sandeeps<span>clicks</span>
        </a>

        {/* desktop links */}
        <ul className='navbar-links'>
          {NAV_LINKS.map(link => (
            <li key={link}>
              <a href={`#${link}`}>{link}</a>
            </li>
          ))}
        </ul>

        <a href='#booking' className='navbar-cta'>Book Now</a>

        {/* hamburger */}
        <button
          className='navbar-hamburger'
          onClick={() => setMobileOpen(true)}
          aria-label='Open menu'
        >
          <span /><span /><span />
        </button>

      </nav>

      {/* mobile overlay */}
      {mobileOpen && (
        <div className='mobile-nav'>
          <button className='mobile-nav-close' onClick={closeMobile} aria-label='Close menu'>
            ✕
          </button>
          {MOBILE_LINKS.map(link => (
            <a key={link} href={`#${link}`} onClick={closeMobile}>
              {link}
            </a>
          ))}
        </div>
      )}
    </>
  )
}

export default Navbar