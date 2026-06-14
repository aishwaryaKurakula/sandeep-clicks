function About() {
  return (
    <section id='about' style={{ background: 'var(--dark2)', padding: '6rem 4rem' }}>
      <div
        style={{
          maxWidth: '1100px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '5rem', alignItems: 'center'
        }}
        className='about-inner'
      >

        {/* left — photo + stats */}
        <div style={{ position: 'relative' }}>
          <div style={{
            width: '100%', aspectRatio: '4/5',
maxHeight: '520px',
            background: 'var(--dark3)',
            border: '1px solid rgba(201,137,42,0.2)',
            overflow: 'hidden',
          }}>
            <img
              src='/sandeep.jpeg'
              alt='Sandeep — SandeepsClicks'
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                display: 'block',
              }}
            />
          </div>

          {/* decorative corner accent */}
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
              { num: '500+', label: 'Happy Clients' },
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '2.2rem', color: 'var(--gold)', lineHeight: 1
                }}>
                  {stat.num}
                </div>
                <div style={{
                  fontSize: '0.7rem', letterSpacing: '0.15em',
                  textTransform: 'uppercase', color: 'var(--muted)', marginTop: '0.3rem'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* right — text */}
        <div>
          <p className='section-eyebrow'>About</p>
          <h2 className='section-title'>The eye behind<br />the lens</h2>
          <div className='gold-divider' />
          <p style={{ color: 'var(--ivory-dim)', lineHeight: 1.9, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
            I'm Sandeep - a Hyderabad based photographer with a passion for capturing moments that matter.
            Whether it's the first dance at a wedding, the joy on a child's birthday, or the candid laugh
            at a corporate event, I believe every moment deserves to be preserved beautifully.
          </p>
          <p style={{ color: 'var(--ivory-dim)', lineHeight: 1.9, marginBottom: '1.8rem', fontSize: '0.95rem' }}>
            My work blends cinematic composition with authentic storytelling. I don't just take photographs
            - I craft visual memories that last a lifetime.
          </p>

          {/* tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {['Pre-wedding', 'Weddings', 'Birthdays', 'Saree ceremony', 'Corporate', 'Candid'].map(tag => (
              <span key={tag} style={{
                fontSize: '0.72rem', letterSpacing: '0.1em',
                textTransform: 'uppercase', padding: '0.4rem 1rem',
                border: '0.5px solid rgba(201,137,42,0.35)',
                color: 'var(--gold-light)'
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
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