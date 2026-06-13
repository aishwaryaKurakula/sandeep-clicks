import { useEffect } from 'react'

function Hero() {
  useEffect(() => {
    // reveal animation observer
    const reveals = document.querySelectorAll('.reveal')
    reveals.forEach(r => r.classList.add('hidden'))
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.remove('hidden')
          e.target.classList.add('visible')
          observer.unobserve(e.target)
        }
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })
    reveals.forEach(r => observer.observe(r))
    return () => observer.disconnect()
  }, [])

  return (
    <section id='hero' style={{
      height: '100vh', position: 'relative',
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', overflow: 'hidden'
    }}>
      {/* background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(180deg,rgba(13,13,13,0.35) 0%,rgba(13,13,13,0.6) 60%,#0D0D0D 100%),
                     linear-gradient(135deg,#1a1208 0%,#0d0a05 40%,#1a1410 100%)`
      }} />

      {/* texture */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9892A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      {/* shutter blades */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'grid', gridTemplateColumns: 'repeat(8,1fr)',
        pointerEvents: 'none'
      }}>
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{
            background: 'rgba(201,137,42,0.03)',
            transformOrigin: 'top center',
            animation: `shutterOpen 1.8s ease forwards`,
            animationDelay: `${i * 0.08}s`,
            opacity: 0
          }} />
        ))}
      </div>

      {/* content */}
      <div style={{
        position: 'relative', textAlign: 'center',
        maxWidth: '820px', padding: '0 2rem',
        animation: 'fadeUp 1.2s 0.8s ease both'
      }}>
        <p style={{
          fontSize: '0.72rem', letterSpacing: '0.3em',
          textTransform: 'uppercase', color: 'var(--gold)',
          marginBottom: '1.4rem', fontWeight: 500
        }}>Visual Storytelling &nbsp;·&nbsp; Hyderabad</p>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(3.2rem,7vw,6rem)',
          lineHeight: 1.05, color: 'var(--ivory)',
          marginBottom: '1.2rem'
        }}>
          Every frame<br />tells a <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>story</em>
        </h1>

        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1.1rem,2vw,1.45rem)',
          color: 'var(--ivory-dim)', fontStyle: 'italic',
          fontWeight: 300, marginBottom: '2.8rem', lineHeight: 1.5
        }}>
          Weddings, portraits, events — captured with intention,<br />
          printed with permanence.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href='#portfolio' className='btn-primary'>View Portfolio</a>
          <a href='#booking' className='btn-outline'>Book a Session</a>
        </div>
      </div>

      {/* scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '2.5rem',
        left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '0.5rem',
        animation: 'fadeUp 1s 2s both'
      }}>
        <span style={{
          fontSize: '0.65rem', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--muted)'
        }}>Scroll</span>
        <div style={{
          width: '1px', height: '50px',
          background: 'linear-gradient(var(--gold),transparent)',
          animation: 'scrollPulse 2s infinite'
        }} />
      </div>

      <style>{`
        @keyframes shutterOpen {
          0%   { opacity: 1; transform: scaleY(1); }
          60%  { opacity: 1; transform: scaleY(0.02); }
          100% { opacity: 0; transform: scaleY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollPulse {
          0%,100% { opacity: 0.3; transform: scaleY(0.6); }
          50%     { opacity: 1;   transform: scaleY(1); }
        }
      `}</style>
    </section>
  )
}

export default Hero