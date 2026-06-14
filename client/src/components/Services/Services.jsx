import './Services.css'

const SERVICES = [
  {
    num: '01',
    image: '/services-wedding.png',
    name: 'Wedding Photography',
    desc: 'Complete coverage from mehndi to reception, capturing every emotional chapter of your wedding day.',
    includes: [
      'Candid + Traditional photography',
      '4K Video Editing',
      'Wedding Teaser & Haldi Teaser',
      '100 Sheets Album (each)',
      'Two photo frames',
    ],
  },
  {
    num: '02',
    image: '/services-birthday.png',
    name: 'Birthday Events',
    desc: 'From kids birthdays to milestone celebrations, every laugh and surprise captured beautifully.',
    includes: [
      'Candid + Traditional photography',
      '4K Video Editing',
      'Birthday Teaser',
      '30 Sheets Album',
      'Two photo frames',
    ],
  },
  {
    num: '03',
    image: '/services-saree-ceremony.png',
    name: 'Saree Ceremony',
    desc: 'Elegant coverage of this beautiful tradition, preserving every graceful moment with care.',
    includes: [
      'Candid + Traditional photography',
      '4K Video Editing',
      'Teaser',
      '30 Sheets Album',
      'Two photo frames',
    ],
  },
  {
    num: '04',
    image:'/services-mat.jpeg',
    name: 'Maternity Photography',
    desc: 'Tender, glowing portraits that celebrate the beauty of motherhood and the journey to parenthood.',
    includes: [
      'Candid + natural posed shots',
      'Indoor or outdoor session',
      'Wardrobe & prop guidance',
      '30+ edited photos',
      'Two printed photo frames',
    ],
  },
  {
    num: '05',
    image: '/services-prewedding.jpg',
    name: 'Pre-Wedding Shoots',
    desc: 'Romantic, cinematic pre-wedding sessions at handpicked locations around Hyderabad and beyond.',
    includes: [
      'Location scouting',
      'Golden hour shooting',
      'Wardrobe consultation',
      '50+ edited photos',
      'Print album',
    ],
  },
]

function Services() {
  return (
    <section id='services' className='services-section'>
      <div className='services-inner'>

        <div className='reveal'>
          <p className='section-eyebrow'>Services</p>
          <h2 className='section-title'>What I offer</h2>
          <p className='section-sub'>
            Tailored photography for every occasion, delivered with care and creativity.
          </p>
        </div>

        <div className='services-grid'>
          {SERVICES.map(service => (
            <div key={service.num} className='service-card reveal'>

              <div className='service-bar' />

              <div className='service-card-img-wrap'>
                <img src={service.image} alt={service.name} />
              </div>

              <div className='service-card-body'>
                <span className='service-card-num'>{service.num}</span>
                <h3 className='service-card-name'>{service.name}</h3>
                <p className='service-card-desc'>{service.desc}</p>
                <ul className='service-includes'>
                  {service.includes.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>

        <div className='services-cta'>
          <a href='#booking' className='btn-primary'>Book A Session</a>
        </div>

      </div>
    </section>
  )
}

export default Services