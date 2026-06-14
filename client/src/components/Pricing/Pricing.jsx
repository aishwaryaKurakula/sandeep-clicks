import { useState } from 'react'
import './Pricing.css'

const TABS = ['wedding', 'birthdays', 'saree ceremony', 'maternity']

const PACKAGES = {
  wedding: [
    {
      name: 'Standard',
      desc: 'Full-day wedding with complete coverage',
      price: '₹1.5L',
      duration: 'Full day coverage',
      featured: false,
      features: ['Traditional Photography', '4K Video Editing', 'Selected Sheets Album', 'Two photo frames', 'Wedding Teaser'],
    },
    {
      name: 'Premium',
      desc: 'Wedding package with everything included',
      price: '₹3L',
      duration: 'Multi-day full coverage',
      featured: true,
      badge: 'Most Popular',
      features: ['Candid + Traditional photography', '4K Editing with Teasers', '100 Sheets Albums each', 'Drone + LED Screen', 'Two photo frames'],
    },
  ],
  birthdays: [
    {
      name: 'Standard',
      desc: 'Beautiful birthday coverage',
      price: '₹25K',
      duration: 'Half day coverage',
      featured: false,
      features: ['Traditional Photography', '4K Video Editing', '25 Sheets Album', 'Two photo frames', 'Birthday Teaser'],
    },
    {
      name: 'Premium',
      desc: 'Complete birthday celebration package',
      price: '₹60K',
      duration: 'Full day coverage',
      featured: true,
      badge: 'Best Value',
      features: ['Candid + Traditional photography', '4K Video Editing with Teaser', '240 Sheets Album', 'Two photo frames', 'Drone + LED Screen'],
    },
  ],
  'saree ceremony': [
    {
      name: 'Standard',
      desc: 'Elegant saree ceremony coverage',
      price: '₹25K',
      duration: 'Half day coverage',
      featured: false,
      features: ['Traditional Photography', '4K Video Editing', '25 Sheets Album', 'Two photo frames', 'Ceremony Teaser'],
    },
    {
      name: 'Premium',
      desc: 'Complete saree ceremony package',
      price: '₹60K',
      duration: 'Full day coverage',
      featured: true,
      badge: 'Best Value',
      features: ['Candid + Traditional photography', '4K Video Editing with Teaser', '240 Sheets Album', 'Two photo frames', 'Drone + LED Screen'],
    },
  ],
  maternity: [
    {
      name: 'Standard',
      desc: 'Professional maternity coverage',
      price: '₹20K',
      duration: 'Up to 4 hours',
      featured: false,
      features: ['Traditional Photography', '4K Video Editing', 'Brand-consistent editing', 'Fast turnaround', 'Usage rights included'],
    },
    {
      name: 'Premium',
      desc: 'Full maternity package',
      price: '₹40K',
      duration: 'Full day',
      featured: true,
      badge: 'Most Popular',
      features: ['Traditional + Candid photography', '4K Video Editing with Teaser', 'PR or Outdoor Drone', 'Brand-consistent editing', 'Priority delivery'],
    },
  ],
}

const scrollToBooking = () =>
  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })

function Pricing() {
  const [activeTab, setActiveTab] = useState('wedding')

  return (
    <section id='pricing' className='pricing-section'>
      <div className='pricing-inner'>

        <div className='reveal'>
          <p className='section-eyebrow'>Pricing</p>
          <h2 className='section-title'>Transparent packages</h2>
          <p className='section-sub'>No hidden fees. Choose what fits your celebration.</p>
        </div>

        {/* tabs */}
        <div className='pricing-tabs'>
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pricing-tab${activeTab === tab ? ' is-active' : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* cards */}
        <div className='pricing-cards'>
          {PACKAGES[activeTab].map(pkg => (
            <div
              key={pkg.name}
              className={`pricing-card reveal${pkg.featured ? ' is-featured' : ''}`}
            >
              {pkg.badge && (
                <span className='pricing-badge'>{pkg.badge}</span>
              )}

              <h3 className='pricing-card-name'>{pkg.name}</h3>
              <p className='pricing-card-desc'>{pkg.desc}</p>

              <div className='pricing-card-price'>{pkg.price}</div>
              <p className='pricing-card-duration'>{pkg.duration}</p>

              <div className='pricing-card-divider' />

              <ul className='pricing-features'>
                {pkg.features.map(f => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              <button className='pricing-cta' onClick={scrollToBooking}>
                Book {pkg.name}
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Pricing