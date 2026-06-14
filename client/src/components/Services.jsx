function Services() {
  const services = [
    {
      num: '01',
      icon: '💍',
      name: 'Wedding Photography',
      desc: 'Complete coverage from mehndi to reception, capturing every emotional chapter of your wedding day.',
      includes: [
        'Candid + Traditional photography',
        '4K Video Editing',
        'Wedding Teaser & Haldi Teaser',
        '100 Sheets Album (each)',
        'Two photo frames'
      ]
    },
    {
      num: '02',
      icon: '🎂',
      name: 'Birthday Events',
      desc: 'From kids birthdays to milestone celebrations, every laugh and surprise captured beautifully.',
      includes: [
        'Candid + Traditional photography',
        '4K Video Editing',
        'Birthday Teaser',
        '30 Sheets Album',
        'Two photo frames'
      ]
    },
    {
      num: '03',
      icon: '👗',
      name: 'Saree Ceremony',
      desc: 'Elegant coverage of this beautiful tradition, preserving every graceful moment with care.',
      includes: [
        'Candid + Traditional photography',
        '4K Video Editing',
        'Teaser',
        '30 Sheets Album',
        'Two photo frames'
      ]
    },
   {
  num: '04',
  icon: '🌿',
  name: 'Maternity Photography',
  desc: 'Tender, glowing portraits that celebrate the beauty of motherhood and the journey to parenthood.',
  includes: [
    'Candid + natural posed shots',
    'Indoor or outdoor session',
    'Wardrobe & prop guidance',
    '30+ edited photos',
    'Two printed photo frames'
  ]
},
    {
      num: '05',
      icon: '🌅',
      name: 'Pre-Wedding Shoots',
      desc: 'Romantic, cinematic pre-wedding sessions at handpicked locations around Hyderabad and beyond.',
      includes: [
        'Location scouting',
        'Golden hour shooting',
        'Wardrobe consultation',
        '50+ edited photos',
        'Print album'
      ]
    },
   {
  num: '06',
  icon: '🎬',
  name: 'Cinematography',
  desc: 'Cinematic films that tell the story of your event — not just a recording, but a memory you will relive forever.',
  includes: [
    'Full event video coverage',
    '4K cinematic editing',
    'Wedding / event highlight film',
    'Background score & colour grading',
    'Digital delivery + hard disk copy'
  ]
},
  ]

  return (
    <section id='services' style={{ background: 'var(--dark2)', padding: '6rem 4rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* heading */}
        <div className='reveal'>
          <p className='section-eyebrow'>Services</p>
          <h2 className='section-title'>What I offer</h2>
          <p className='section-sub'>
            Tailored photography for every occasion, delivered with care and creativity.
          </p>
        </div>

        {/* grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))',
          gap: '1.5rem', marginTop: '3.5rem'
        }}>
          {services.map(service => (
            <div
              key={service.num}
              className='reveal service-card'
              style={{
                background: 'var(--dark3)',
                border: '0.5px solid rgba(201,137,42,0.15)',
                padding: '2.2rem 2rem',
                position: 'relative', overflow: 'hidden',
                transition: 'border-color 0.3s, transform 0.3s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(201,137,42,0.5)'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.querySelector('.service-bar').style.transform = 'scaleX(1)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(201,137,42,0.15)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.querySelector('.service-bar').style.transform = 'scaleX(0)'
              }}
            >
              {/* gold top bar */}
              <div className='service-bar' style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: '2px', background: 'var(--gold)',
                transform: 'scaleX(0)', transformOrigin: 'left',
                transition: 'transform 0.3s'
              }} />

              {/* number */}
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '3rem',
                color: 'rgba(201,137,42,0.15)',
                position: 'absolute', top: '1rem', right: '1.5rem',
                lineHeight: 1
              }}>{service.num}</span>

              <div style={{ fontSize: '1.8rem', marginBottom: '1.2rem' }}>{service.icon}</div>

              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.3rem', color: 'var(--ivory)',
                marginBottom: '0.6rem'
              }}>{service.name}</h3>

              <p style={{
                fontSize: '0.88rem', color: 'var(--muted)',
                lineHeight: 1.75, marginBottom: '1.5rem'
              }}>{service.desc}</p>

              <ul style={{ listStyle: 'none', fontSize: '0.8rem', color: 'var(--ivory-dim)' }}>
                {service.includes.map(item => (
                  <li key={item} style={{
                    padding: '0.3rem 0',
                    borderBottom: '0.5px solid rgba(255,255,255,0.05)',
                    display: 'flex', alignItems: 'center', gap: '0.6rem'
                  }}>
                    <span style={{
                      width: '4px', height: '4px',
                      background: 'var(--gold)', borderRadius: '50%',
                      flexShrink: 0, display: 'inline-block'
                    }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* cta */}
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <a href='#booking' className='btn-primary'>Book A Session</a>
        </div>

      </div>
    </section>
  )
}

export default Services