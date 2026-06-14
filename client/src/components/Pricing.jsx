import { useState } from 'react'

function Pricing() {
  const [activeTab, setActiveTab] = useState('wedding')

  const tabs = ['wedding', 'birthdays', 'saree ceremony', 'maternity']

  const packages = {
    wedding: [
      {
        name: 'Standard',
        desc: 'Full-day wedding with complete coverage',
        price: '₹1.5L',
        duration: 'Full day coverage',
        featured: false,
        features: [
          'Traditional Photography',
          '4K Video Editing',
          'Selected Sheets Album',
          'Two photo frames',
          'Wedding Teaser'
        ]
      },
      {
        name: 'Premium',
        desc: 'wedding package with everything included',
        price: '₹3L',
        duration: 'Multi-day full coverage',
        featured: true,
        badge: 'Most Popular',
        features: [
          'Candid + Traditional photography',
          '4K Editing with Teasers',
          '100 Sheets Albums each',
          'Drone + LED Screen',
          'Two photo frames'
        ]
      }
    ],
    birthdays: [
      {
        name: 'Standard',
        desc: 'Beautiful birthday coverage',
        price: '₹25K',
        duration: 'Half day coverage',
        featured: false,
        features: [
          'Traditional Photography',
          '4K Video Editing',
          '25 Sheets Album',
          'Two photo frames',
          'Birthday Teaser'
        ]
      },
      {
        name: 'Premium',
        desc: 'Complete birthday celebration package',
        price: '₹60K',
        duration: 'Full day coverage',
        featured: true,
        badge: 'Best Value',
        features: [
          'Candid + Traditional photography',
          '4K Video Editing with Teaser',
          '240 Sheets Album',
          'Two photo frames',
          'Drone + LED Screen'
        ]
      }
    ],
    'saree ceremony': [
      {
        name: 'Standard',
        desc: 'Elegant saree ceremony coverage',
        price: '₹25K',
        duration: 'Half day coverage',
        featured: false,
        features: [
          'Traditional Photography',
          '4K Video Editing',
          '25 Sheets Album',
          'Two photo frames',
          'Ceremony Teaser'
        ]
      },
      {
        name: 'Premium',
        desc: 'Complete saree ceremony package',
        price: '₹60K',
        duration: 'Full day coverage',
        featured: true,
        badge: 'Best Value',
        features: [
          'Candid + Traditional photography',
          '4K Video Editing with Teaser',
          '240 Sheets Album',
          'Two photo frames',
          'Drone + LED Screen'
        ]
      }
    ],
    maternity: [
      {
        name: 'Standard',
        desc: 'Professional corporate event coverage',
        price: '₹20K',
        duration: 'Up to 4 hours',
        featured: false,
        features: [
          'Traditional Photography',
          '4K Video Editing',
          'Brand-consistent editing',
          'Fast turnaround',
          'Usage rights included'
        ]
      },
      {
        name: 'Premium',
        desc: 'Full corporate event package',
        price: '₹40K',
        duration: 'Full day',
        featured: true,
        badge: 'Most Popular',
        features: [
          'Traditional + Candid photography',
          '4K Video Editing with Teaser',
          'PR or Outdoor Drone',
          'Brand-consistent editing',
          'Priority delivery'
        ]
      }
    ]
  }

  return (
    <section id='pricing' style={{ background: 'var(--dark)', padding: '6rem 4rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* heading */}
        <div className='reveal'>
          <p className='section-eyebrow'>Pricing</p>
          <h2 className='section-title'>Transparent packages</h2>
          <p className='section-sub'>No hidden fees. Choose what fits your celebration.</p>
        </div>

        {/* tabs */}
        <div style={{
          display: 'flex',
          marginTop: '2.5rem', marginBottom: '3rem',
          borderBottom: '0.5px solid rgba(201,137,42,0.2)',
          width: 'fit-content', flexWrap: 'wrap'
        }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'transparent', border: 'none',
                color: activeTab === tab ? 'var(--gold)' : 'var(--muted)',
                padding: '0.75rem 2rem',
                fontSize: '0.78rem', letterSpacing: '0.12em',
                textTransform: 'uppercase', cursor: 'pointer',
                position: 'relative', transition: 'color 0.2s',
                borderBottom: activeTab === tab
                  ? '2px solid var(--gold)'
                  : '2px solid transparent'
              }}
            >{tab}</button>
          ))}
        </div>

        {/* two cards side by side — fixed width, centered */}
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          {packages[activeTab].map(pkg => (
            <div
              key={pkg.name}
              className='reveal'
              style={{
                width: '300px',
                flexShrink: 0,
                background: pkg.featured
                  ? 'linear-gradient(135deg,#1a120a,#0d0d0d)'
                  : 'var(--dark3)',
                border: `0.5px solid ${pkg.featured ? 'var(--gold)' : 'rgba(201,137,42,0.15)'}`,
                padding: '2rem 1.5rem',
                position: 'relative'
              }}
            >
              {/* badge */}
              {pkg.badge && (
                <span style={{
                  position: 'absolute', top: '-0.7rem',
                  left: '50%', transform: 'translateX(-50%)',
                  background: 'var(--gold)', color: 'var(--dark)',
                  fontSize: '0.65rem', letterSpacing: '0.15em',
                  textTransform: 'uppercase', padding: '0.25rem 1rem',
                  fontWeight: 600, whiteSpace: 'nowrap'
                }}>{pkg.badge}</span>
              )}

              {/* name + desc */}
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.1rem', color: 'var(--ivory)',
                marginBottom: '0.3rem'
              }}>{pkg.name}</h3>

              <p style={{
                fontSize: '0.78rem', color: 'var(--muted)',
                marginBottom: '1.2rem', lineHeight: 1.5
              }}>{pkg.desc}</p>

              {/* price */}
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '2rem', color: 'var(--gold)',
                lineHeight: 1, marginBottom: '0.2rem'
              }}>{pkg.price}</div>

              <p style={{
                fontSize: '0.72rem', color: 'var(--muted)',
                marginBottom: '1.5rem'
              }}>{pkg.duration}</p>

              {/* divider */}
              <div style={{
                width: '40px', height: '1px',
                background: 'rgba(201,137,42,0.3)',
                marginBottom: '1.2rem'
              }} />

              {/* features */}
              <ul style={{
                listStyle: 'none', fontSize: '0.8rem',
                color: 'var(--ivory-dim)', marginBottom: '1.5rem'
              }}>
                {pkg.features.map(f => (
                  <li key={f} style={{
                    padding: '0.4rem 0',
                    borderBottom: '0.5px solid rgba(255,255,255,0.05)',
                    display: 'flex', alignItems: 'center', gap: '0.7rem'
                  }}>
                    <span style={{ color: 'var(--gold)', fontSize: '0.7rem', flexShrink: 0 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* cta */}
              <button
                onClick={() => document.getElementById('booking')
                  .scrollIntoView({ behavior: 'smooth' })}
                style={{
                  display: 'block', width: '100%',
                  padding: '0.7rem',
                  textAlign: 'center', fontSize: '0.72rem',
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  fontWeight: 600, cursor: 'pointer',
                  border: '1px solid rgba(201,137,42,0.4)',
                  background: pkg.featured ? 'var(--gold)' : 'transparent',
                  color: pkg.featured ? 'var(--dark)' : 'var(--gold)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--gold)'
                  e.currentTarget.style.color = 'var(--dark)'
                }}
                onMouseLeave={e => {
                  if (!pkg.featured) {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'var(--gold)'
                  }
                }}
              >Book {pkg.name}</button>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Pricing