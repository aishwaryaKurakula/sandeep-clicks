const TESTIMONIALS = [
  {
    text: "Sandeep captured our wedding like no one else could have. The photos are breathtaking — we keep going back to the gallery every week. Best investment we made for our big day.",
    author: "Priya & Karthik",
    event: "Wedding, Hyderabad",
  },
  {
    text: "We booked Sandeep for our daughter's naming ceremony and were blown away. He was unobtrusive, professional, and the edited photos came back in 3 days looking absolutely stunning.",
    author: "Ramesh Babu",
    event: "Naming Ceremony",
  },
  {
    text: "Our product photos for the launch campaign turned out better than we imagined. Sandeep understood the brand perfectly and delivered well within the deadline.",
    author: "Meena Krishnaswamy",
    event: "Corporate, Brand Launch",
  },
]

function TestimonialCard({ text, author, event }) {
  return (
    <div style={{
      background: 'var(--dark3)',
      border: '0.5px solid rgba(201,137,42,0.12)',
      padding: '2rem',
      position: 'relative',
    }}>
      {/* decorative opening quote */}
      <span style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '5rem',
        color: 'rgba(201,137,42,0.15)',
        position: 'absolute',
        top: '-0.5rem',
        left: '1.2rem',
        lineHeight: 1,
        pointerEvents: 'none',
        userSelect: 'none',
      }}>&ldquo;</span>

      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '1.1rem',
        color: 'var(--ivory-dim)',
        fontStyle: 'italic',
        lineHeight: 1.7,
        marginBottom: '1.5rem',
        paddingTop: '1.5rem',
      }}>
        {text}
      </p>

      <p style={{
        fontSize: '0.78rem',
        letterSpacing: '0.08em',
        color: 'var(--gold)',
        textTransform: 'uppercase',
      }}>
        {author}
      </p>
      <p style={{
        fontSize: '0.72rem',
        color: 'var(--muted)',
        marginTop: '0.2rem',
      }}>
        {event}
      </p>
    </div>
  )
}

function Testimonials() {
  return (
    <section id="testimonials" style={{
      padding: '6rem 4rem',
      background: 'var(--dark)',
    }}>
      {/* header */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <p className="section-eyebrow">Client Love</p>
        <h2 className="section-title">What they say</h2>
      </div>

      {/* grid */}
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.5rem',
      }}>
        {TESTIMONIALS.map((t) => (
          <TestimonialCard key={t.author} {...t} />
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          #testimonials { padding: 4rem 2rem; }
        }
      `}</style>
    </section>
  )
}

export default Testimonials