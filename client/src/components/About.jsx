import { useState } from 'react'

function About() {
  const [flipped, setFlipped] = useState(false)

  return (
    <section id='about' style={{ background: 'var(--dark2)', padding: '6rem 4rem' }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '5rem', alignItems: 'center'
      }} className='about-inner'>

        {/* left — photo frame + stats */}
        <div className='reveal' style={{ position: 'relative' }}>
          <div style={{
            width: '100%', aspectRatio: '3/4',
            background: 'var(--dark3)',
            border: '1px solid rgba(201,137,42,0.2)',
            overflow: 'hidden', display: 'flex',
            alignItems: 'center', justifyContent: 'center'
          }}>
            {/* replace this div with an <img> once Sandeep gives his photo */}
            <div style={{
              width: '85%', height: '85%',
              background: 'linear-gradient(135deg,#1c1408,#2a1e0a)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '1rem',
              border: '0.5px solid rgba(201,137,42,0.15)'
            }}>
              <div style={{ fontSize: '4rem', opacity: 0.6, color: 'var(--gold)' }}>📷</div>
              <span style={{
                fontSize: '0.7rem', letterSpacing: '0.2em',
                textTransform: 'uppercase', color: 'var(--muted)'
              }}>SandeepsCliks</span>
            </div>
          </div>
          <div style={{
            position: 'absolute', bottom: '-1.2rem', right: '-1.2rem',
            width: '60%', height: '60%',
            border: '1px solid rgba(201,137,42,0.25)', zIndex: -1
          }} />

          {/* stats */}
          <div style={{ display: 'flex', gap: '2rem', marginTop: '2.5rem' }}>
            {[
              { num: '200+', label: 'Events Shot' },
              { num: '5+',   label: 'Years Experience' },
              { num: '500+', label: 'Happy Clients' }
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '2.2rem', color: 'var(--gold)', lineHeight: 1
                }}>{stat.num}</div>
                <div style={{
                  fontSize: '0.7rem', letterSpacing: '0.15em',
                  textTransform: 'uppercase', color: 'var(--muted)', marginTop: '0.3rem'
                }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* right — text */}
        <div className='reveal'>
          <p className='section-eyebrow'>About</p>
          <h2 className='section-title'>The eye behind<br />the lens</h2>
          <div className='gold-divider' />
          <p style={{ color: 'var(--ivory-dim)', lineHeight: 1.9, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
            I'm Sandeep — a Hyderabad-based photographer with a passion for capturing moments that matter. Whether it's the first dance at a wedding, the joy on a child's birthday, or the candid laugh at a corporate event, I believe every moment deserves to be preserved beautifully.
          </p>
          <p style={{ color: 'var(--ivory-dim)', lineHeight: 1.9, marginBottom: '1.8rem', fontSize: '0.95rem' }}>
            My work blends cinematic composition with authentic storytelling. I don't just take photographs — I craft visual memories that last a lifetime.
          </p>

          {/* tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '3rem' }}>
            {['Weddings','Portraits','Events','Corporate','Candid','Pre-wedding'].map(tag => (
              <span key={tag} style={{
                fontSize: '0.72rem', letterSpacing: '0.1em',
                textTransform: 'uppercase', padding: '0.4rem 1rem',
                border: '0.5px solid rgba(201,137,42,0.35)',
                color: 'var(--gold-light)'
              }}>{tag}</span>
            ))}
          </div>

          {/* visiting card flip */}
          <p style={{
            fontSize: '0.7rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--muted)',
            marginBottom: '1rem'
          }}>My Card — hover or tap to flip</p>

          <div
            onMouseEnter={() => setFlipped(true)}
            onMouseLeave={() => setFlipped(false)}
            onClick={() => setFlipped(!flipped)}
            style={{
              width: '100%', maxWidth: '420px',
              aspectRatio: '1.75/1',
              perspective: '1000px', cursor: 'pointer'
            }}
          >
            <div style={{
              width: '100%', height: '100%',
              position: 'relative',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.7s ease',
              transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}>

              {/* FRONT */}
              <div style={{
                position: 'absolute', inset: 0,
                backfaceVisibility: 'hidden',
                background: '#F5F0E8',
                overflow: 'hidden'
              }}>
                {/* top bar */}
                <div style={{
                  height: '28px',
                  background: 'linear-gradient(90deg, #2A2D3E 60%, #C9892A 60%)'
                }} />

                {/* card body */}
                <div style={{ padding: '0.75rem 1rem', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '1rem', color: '#1a1a1a', fontWeight: 600
                    }}>Sandeep Kumar</span>
                    <span style={{ fontSize: '0.75rem', color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ color: '#25D366', fontSize: '0.9rem' }}>📱</span> 8688153094
                    </span>
                  </div>

                  {/* logo area */}
                  <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
                    <div style={{
                      fontSize: '2.5rem', lineHeight: 1,
                      color: '#1a1a1a'
                    }}>📷</div>
                    <div style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '1.1rem', fontWeight: 700,
                      color: '#1a1a1a', letterSpacing: '0.05em'
                    }}>
                      SAN<span style={{ color: '#C9892A' }}>D</span>EEP
                    </div>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '0.7rem', fontStyle: 'italic',
                      color: '#555', marginTop: '0.25rem'
                    }}>"Capturing Moment's, one at Time"</div>
                  </div>
                </div>

                {/* bottom bar */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '28px',
                  background: 'linear-gradient(90deg, #C9892A 40%, #2A2D3E 40%)',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', padding: '0 1rem'
                }}>
                  <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem' }}>
                    <span>📸</span><span>🐦</span><span>📘</span><span>✉️</span>
                  </div>
                  <span style={{
                    color: 'var(--ivory)', fontSize: '0.7rem',
                    letterSpacing: '0.1em', textTransform: 'uppercase'
                  }}>SanDeep Clicks</span>
                </div>
              </div>

              {/* BACK */}
              <div style={{
                position: 'absolute', inset: 0,
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                background: '#F5F0E8',
                overflow: 'hidden'
              }}>
                {/* top bar */}
                <div style={{
                  height: '28px',
                  background: 'linear-gradient(90deg, #C9892A 40%, #2A2D3E 40%)'
                }} />

                <div style={{
                  display: 'grid', gridTemplateColumns: '1fr auto',
                  padding: '0.75rem 1rem', gap: '1rem', height: 'calc(100% - 56px)'
                }}>
                  {/* services list */}
                  <div>
                    {[
                      'All Types of Events',
                      'Photography & Videography',
                      'Candid Photography',
                      'Cinematography',
                      'LED Screens',
                      'Flower & Balloon Decoration',
                      'Customized Photo Frames & Gifts'
                    ].map(service => (
                      <div key={service} style={{
                        fontSize: '0.65rem', color: '#2a2a2a',
                        marginBottom: '0.2rem',
                        display: 'flex', alignItems: 'center', gap: '0.4rem'
                      }}>
                        <span style={{ color: '#C9892A', fontSize: '0.5rem' }}>◆</span>
                        {service}
                      </div>
                    ))}
                    <div style={{
                      marginTop: '0.5rem',
                      fontSize: '0.6rem', color: '#555',
                      display: 'flex', alignItems: 'center', gap: '0.3rem'
                    }}>
                      📍 Baghlingampally, Nallakunta Hyd-44
                    </div>
                  </div>

                  {/* instagram + logo */}
                  <div style={{
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'space-between'
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        width: '60px', height: '60px',
                        border: '2px solid #C9892A',
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'center', fontSize: '1.5rem'
                      }}>📷</div>
                      <div style={{
                        fontSize: '0.55rem', color: '#C9892A',
                        marginTop: '0.3rem', letterSpacing: '0.05em'
                      }}>@SAN_DEEP_CLICKS</div>
                    </div>
                    <div style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '0.9rem', fontWeight: 700, color: '#1a1a1a'
                    }}>SAN<span style={{ color: '#C9892A' }}>D</span>EEP</div>
                  </div>
                </div>

                {/* bottom bar */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '28px',
                  background: 'linear-gradient(90deg, #2A2D3E 60%, #C9892A 60%)'
                }} />
              </div>

            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media(max-width:900px){
          .about-inner {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  )
}

export default About