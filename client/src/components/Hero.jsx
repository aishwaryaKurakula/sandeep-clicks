import { useState } from 'react'

function Hero() {
  const [flipped, setFlipped] = useState(false)

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

      {/* main layout — text left, card right */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1100px',
        padding: '0 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '4rem',
        animation: 'fadeUp 1.2s 0.8s ease both'
      }} className='hero-inner'>

        {/* LEFT — text content */}
        <div style={{ flex: '1', textAlign: 'left', minWidth: 0 }} className='hero-text'>
          <p style={{
            fontSize: '0.72rem', letterSpacing: '0.3em',
            textTransform: 'uppercase', color: 'var(--gold)',
            marginBottom: '1.4rem', fontWeight: 500
          }}>Visual Storytelling &nbsp;·&nbsp; Hyderabad</p>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.8rem,5vw,5.5rem)',
            lineHeight: 1.05, color: 'var(--ivory)',
            marginBottom: '1.2rem'
          }}>
            Every frame<br />tells a <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>story</em>
          </h1>

          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1rem,1.6vw,1.35rem)',
            color: 'var(--ivory-dim)', fontStyle: 'italic',
            fontWeight: 300, marginBottom: '2.8rem', lineHeight: 1.6
          }}>
            Capturing Moments, One Frame at a Time<br />
            
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href='#portfolio' className='btn-primary'>View Portfolio</a>
            <a href='#booking' className='btn-outline'>Book a Session</a>
          </div>
        </div>

        {/* RIGHT — visiting card flip */}
        <div style={{
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }} className='hero-card'>

          {/* flip container */}
          <div
            onMouseEnter={() => setFlipped(true)}
            onMouseLeave={() => setFlipped(false)}
            onClick={() => setFlipped(f => !f)}
            style={{
              width: '450px',
              aspectRatio: '1.75 / 1',
              perspective: '1000px',
              cursor: 'pointer',
            }}
          >
            <div style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.7s ease',
              transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              borderRadius: '4px',
              boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(201,137,42,0.25)',
            }}>
              {/* FRONT */}
              <div style={{
                position: 'absolute', inset: 0,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                borderRadius: '4px',
                overflow: 'hidden',
              }}>
                <img
                  src='/front.jpeg'
                  alt='SandeepsClicks visiting card — front'
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>

              {/* BACK */}
              <div style={{
                position: 'absolute', inset: 0,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                borderRadius: '4px',
                overflow: 'hidden',
              }}>
                <img
                  src='/back.jpeg'
                  alt='SandeepsClicks visiting card — back'
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          </div>

          {/* caption */}
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '0.85rem',
            fontStyle: 'italic',
            color: 'var(--ivory-dim)',
            letterSpacing: '0.04em',
            textAlign: 'center',
          }}>
            {/* Capturing Moment&apos;s, one frame at a Time */}
          </p>

          {/* hover hint */}
          <p style={{
            fontSize: '0.62rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
          }}>
            Hover or tap to flip
          </p>
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

        /* on mobile: stack vertically, card below text */
        @media (max-width: 900px) {
          .hero-inner {
            flex-direction: column !important;
            text-align: center !important;
            justify-content: center !important;
            padding-top: 6rem !important;
          }
          .hero-text {
            text-align: center !important;
          }
          .hero-text div {
            justify-content: center !important;
          }
          .hero-card div[style*="320px"] {
            width: 260px !important;
          }
        }
      `}</style>
    </section>
  )
}

export default Hero