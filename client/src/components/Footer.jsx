function Footer() {
  const linkStyle = {
    color: 'var(--muted)',
    textDecoration: 'none',
    fontSize: '0.85rem',
    transition: 'color 0.2s',
    display: 'block',
    marginBottom: '0.6rem',
  }

  const hoverLink = (e) => { e.target.style.color = 'var(--ivory)' }
  const unhoverLink = (e) => { e.target.style.color = 'var(--muted)' }

  return (
    <footer style={{
      background: 'var(--dark)',
      borderTop: '0.5px solid rgba(201,137,42,0.15)',
      padding: '4rem 4rem 2rem',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* top grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '4rem',
          marginBottom: '3rem',
        }}
          className="footer-grid"
        >
          {/* brand */}
          <div>
            <a href="#hero" style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.5rem',
              color: 'var(--ivory)',
              textDecoration: 'none',
              display: 'block',
              marginBottom: '1rem',
            }}>
              Sandeeps<span style={{ color: 'var(--gold)' }}>clicks</span>
            </a>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '280px' }}>
              Visual storytelling from the heart of Hyderabad. Weddings, portraits, events — every frame with purpose.
            </p>

            {/* social */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
              {[
                { label: 'Instagram', short: 'IG', href: '#' },
                { label: 'Facebook', short: 'FB', href: '#' },
                { label: 'WhatsApp', short: 'WA', href: '#' },
                { label: 'YouTube', short: 'YT', href: '#' },
              ].map(({ label, short, href }) => (
                <a
                  key={short}
                  href={href}
                  aria-label={label}
                  style={{
                    width: '36px',
                    height: '36px',
                    border: '0.5px solid rgba(201,137,42,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--muted)',
                    textDecoration: 'none',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--gold)'
                    e.currentTarget.style.color = 'var(--gold)'
                    e.currentTarget.style.background = 'rgba(201,137,42,0.1)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(201,137,42,0.3)'
                    e.currentTarget.style.color = 'var(--muted)'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {short}
                </a>
              ))}
            </div>
          </div>

          {/* services */}
          <div>
            <h4 style={{
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '1.2rem',
            }}>
              Services
            </h4>
            {[
              'Wedding Photography',
              'Portrait Sessions',
              'Event Coverage',
              'Corporate Events',
              'Pre-Wedding Shoots',
            ].map(item => (
              <a key={item} href="#services" style={linkStyle}
                onMouseEnter={hoverLink} onMouseLeave={unhoverLink}>
                {item}
              </a>
            ))}
          </div>

          {/* products */}
          <div>
            <h4 style={{
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '1.2rem',
            }}>
              Products
            </h4>
            {[
              'Framed Prints',
              'Photo Mugs',
              'Photo Albums',
              'Canvas Prints',
              'Gift Combos',
            ].map(item => (
              <a key={item} href="#products" style={linkStyle}
                onMouseEnter={hoverLink} onMouseLeave={unhoverLink}>
                {item}
              </a>
            ))}
          </div>

          {/* contact */}
          <div>
            <h4 style={{
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '1.2rem',
            }}>
              Contact
            </h4>
            <a href="tel:+919999999999" style={linkStyle}
              onMouseEnter={hoverLink} onMouseLeave={unhoverLink}>
              +91 99999 99999
            </a>
            <a href="mailto:hello@sandeepsclicks.com" style={linkStyle}
              onMouseEnter={hoverLink} onMouseLeave={unhoverLink}>
              hello@sandeepsclicks.com
            </a>
            <a href="#" style={linkStyle}
              onMouseEnter={hoverLink} onMouseLeave={unhoverLink}>
              Hyderabad, Telangana
            </a>
            <a href="#booking" style={linkStyle}
              onMouseEnter={hoverLink} onMouseLeave={unhoverLink}>
              Book a Session
            </a>
          </div>
        </div>

        {/* bottom bar */}
        <div style={{
          borderTop: '0.5px solid rgba(255,255,255,0.06)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
            © 2025 <span style={{ color: 'var(--gold)' }}>Sandeepsclicks</span>. All rights reserved.
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
            Crafted by <span style={{ color: 'var(--gold)' }}>Aishwarya Kurakula</span>
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 2.5rem !important; }
          footer { padding: 3rem 2rem 1.5rem !important; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}

export default Footer