import './Footer.css'

const SERVICES = [
  'Wedding Photography',
  'Birthday Events',
  'Saree Ceremony',
  'Maternity Photography',
  'Pre-Wedding Shoots',
  'Cinematography',
]

const PRODUCTS = [
  'LED Photo Frames',
  'Mug Printing',
  'Pillow Printing',
  'Magic Mirror',
  'LED Rotating Lamp',
  '3D Photo Lamp',
]

const SOCIALS = [
  { label: 'IG', aria: 'Instagram', href: 'https://www.instagram.com/sandeep___clicks/?hl=en' },
  { label: 'WA', aria: 'WhatsApp',  href: 'https://wa.me/918688153094' },
]

function Footer() {
  return (
    <footer className='footer'>
      <div className='footer-inner'>

        {/* top grid */}
        <div className='footer-grid'>

          {/* brand */}
          <div>
            <a href='#hero' className='footer-brand-link'>
              Sandeeps<span>Cliks</span>
            </a>
            <p className='footer-brand-desc'>
              Visual storytelling from the heart of Hyderabad. Weddings, portraits, events — every frame with purpose.
            </p>
            <div className='footer-socials'>
              {SOCIALS.map(({ label, aria, href }) => (
                <a
                  key={label}
                  href={href}
                  target='_blank'
                  rel='noreferrer'
                  aria-label={aria}
                  className='footer-social-btn'
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* services */}
          <div>
            <h4 className='footer-col-title'>Services</h4>
            {SERVICES.map(item => (
              <a key={item} href='#services' className='footer-link'>{item}</a>
            ))}
          </div>

          {/* products */}
          <div>
            <h4 className='footer-col-title'>Products</h4>
            {PRODUCTS.map(item => (
              <a key={item} href='#products' className='footer-link'>{item}</a>
            ))}
          </div>

          {/* contact */}
          <div>
            <h4 className='footer-col-title'>Contact</h4>
            <a href='tel:+918688153094' className='footer-link'>+91 86881 53094</a>
            <a href='https://wa.me/918688153094' target='_blank' rel='noreferrer' className='footer-link'>WhatsApp Sandeep</a>
            <a href='https://www.instagram.com/sandeep___clicks/?hl=en' target='_blank' rel='noreferrer' className='footer-link'>@sandeep___clicks</a>
            <a href='#' className='footer-link'>Baghlingampally, Hyderabad</a>
            <a href='#booking' className='footer-link footer-link--gold'>Book a Session →</a>
          </div>

        </div>

        {/* bottom bar */}
        <div className='footer-bottom'>
          <p>© 2026 <span>sandeepsclicks</span>. All rights reserved.</p>
          <p>Crafted by <span>Aishwarya Kurakula</span></p>
        </div>

      </div>
    </footer>
  )
}

export default Footer