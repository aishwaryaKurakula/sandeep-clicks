import './About.css'

const STATS = [
  { num: '200+', label: 'Events Shot' },
  { num: '5+',   label: 'Years Experience' },
  { num: '500+', label: 'Happy Clients' },
]

const TAGS = ['Pre-wedding', 'Weddings', 'Birthdays', 'Saree ceremony', 'Corporate', 'Candid']

function About() {
  return (
    <section id='about' className='about-section'>
      <div className='about-inner'>

        {/* left — photo + stats */}
        <div className='about-photo-col'>
          <div className='about-photo-frame'>
            <img
              src='/sandeep.jpeg'
              alt='Sandeep — SandeepsClicks'
            />
          </div>

          <div className='about-corner-accent' />

          <div className='about-stats'>
            {STATS.map(stat => (
              <div key={stat.label} className='about-stat'>
                <div className='about-stat-num'>{stat.num}</div>
                <div className='about-stat-label'>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* right — text */}
        <div className='about-text-col'>
          <p className='section-eyebrow'>About</p>
          <h2 className='section-title'>The eye behind<br />the lens</h2>
          <div className='gold-divider' />

          <p>
            I'm Sandeep - a Hyderabad based photographer with a passion for capturing moments that matter.
            Whether it's the first dance at a wedding, the joy on a child's birthday, or the candid laugh
            at a corporate event, I believe every moment deserves to be preserved beautifully.
          </p>
          <p>
            My work blends cinematic composition with authentic storytelling. I don't just take photographs
            - I craft visual memories that last a lifetime.
          </p>

          <div className='about-tags'>
            {TAGS.map(tag => (
              <span key={tag} className='about-tag'>{tag}</span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default About