import { useState, useEffect } from 'react'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.25rem 4rem',
        background: scrolled ? 'rgba(13,13,13,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '0.5px solid rgba(201,137,42,0.2)' : 'none',
        transition: 'background 0.4s, backdrop-filter 0.4s'
      }}>
        <a href='#hero' style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.4rem',
          color: 'var(--ivory)',
          textDecoration: 'none',
          letterSpacing: '0.02em'
        }}>
          Sandeeps<span style={{ color: 'var(--gold)' }}>clicks</span>
        </a>

        {/* desktop links */}
        <ul style={{
          display: 'flex', gap: '2.5rem', listStyle: 'none'
        }} className='desktop-nav'>
          {['about','portfolio','services','pricing','products','testimonials'].map(link => (
            <li key={link}>
              <a href={`#${link}`} style={{
                color: 'var(--ivory-dim)', textDecoration: 'none',
                fontSize: '0.82rem', letterSpacing: '0.12em',
                textTransform: 'uppercase', fontWeight: 500,
                transition: 'color 0.2s'
              }}
              onMouseEnter={e => e.target.style.color = 'var(--gold)'}
              onMouseLeave={e => e.target.style.color = 'var(--ivory-dim)'}
              >{link}</a>
            </li>
          ))}
        </ul>

        <a href='#booking' style={{
          background: 'var(--gold)', color: 'var(--dark)',
          padding: '0.5rem 1.4rem', fontSize: '0.78rem',
          letterSpacing: '0.12em', textTransform: 'uppercase',
          fontWeight: 600, textDecoration: 'none',
          transition: 'background 0.2s'
        }}
        onMouseEnter={e => e.target.style.background = 'var(--gold-light)'}
        onMouseLeave={e => e.target.style.background = 'var(--gold)'}
        className='desktop-nav'
        >Book Now</a>

        {/* hamburger */}
        <button
          onClick={() => setMobileOpen(true)}
          style={{
            display: 'none', flexDirection: 'column', gap: '5px',
            background: 'none', border: 'none', cursor: 'pointer', padding: '4px'
          }}
          className='hamburger'
        >
          <span style={{ width: '22px', height: '1.5px', background: 'var(--ivory)', display: 'block' }} />
          <span style={{ width: '22px', height: '1.5px', background: 'var(--ivory)', display: 'block' }} />
          <span style={{ width: '22px', height: '1.5px', background: 'var(--ivory)', display: 'block' }} />
        </button>
      </nav>

      {/* mobile nav */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(13,13,13,0.98)',
          zIndex: 99, display: 'flex',
          flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', gap: '2rem'
        }}>
          <button onClick={closeMobile} style={{
            position: 'absolute', top: '1.5rem', right: '2rem',
            background: 'none', border: 'none',
            color: 'var(--ivory)', fontSize: '1.5rem', cursor: 'pointer'
          }}>✕</button>
          {['about','portfolio','services','pricing','products','booking'].map(link => (
            <a key={link} href={`#${link}`} onClick={closeMobile} style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.8rem', color: 'var(--ivory)',
              textDecoration: 'none', textTransform: 'capitalize'
            }}>{link}</a>
          ))}
        </div>
      )}

      <style>{`
        @media(max-width:900px){
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}

export default Navbar