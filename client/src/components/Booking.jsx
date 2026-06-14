import BookingForm from './BookingForm'

function Booking() {
  return (
    <section id="booking" style={{
      padding: '6rem 4rem',
      background: 'var(--dark2)',
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <p className="section-eyebrow">Book a Session</p>
          <h2 className="section-title">
            Let&apos;s create something{' '}
            <em style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              color: 'var(--gold)',
            }}>
              beautiful
            </em>{' '}
            together
          </h2>
          <div className="gold-divider" />
          <p className="section-sub">
            Fill out the form and I will get back to you within 24 hours.
          </p>
        </div>

        <BookingForm />
      </div>

      <style>{`
        @media (max-width: 900px) {
          #booking { padding: 4rem 2rem; }
        }
      `}</style>
    </section>
  )
}

export default Booking