import { useState } from 'react'
import './Hero.css'

const SHUTTER_COUNT = 8

function Hero() {
  const [flipped, setFlipped] = useState(false)

  return (
    <section id='hero' className='hero-section'>

      {/* backgrounds */}
      <div className='hero-bg-gradient' />
      <div className='hero-bg-texture' />

      {/* shutter blades */}
      <div className='hero-shutters'>
        {[...Array(SHUTTER_COUNT)].map((_, i) => (
          <div
            key={i}
            className='hero-shutter-blade'
            style={{ animationDelay: `${i * 0.08}s` }}
          />
        ))}
      </div>

      {/* main layout */}
      <div className='hero-inner'>

        {/* LEFT — text */}
        <div className='hero-text'>
          <p className='hero-eyebrow'>Visual Storytelling &nbsp;·&nbsp; Hyderabad</p>

          <h1 className='hero-heading'>
            Every frame<br />tells a <em>story</em>
          </h1>

          <p className='hero-subheading'>
            Capturing Moments, One Frame at a Time
          </p>

          <div className='hero-ctas'>
            <a href='#portfolio' className='btn-primary'>View Portfolio</a>
            <a href='#booking'   className='btn-outline'>Book a Session</a>
          </div>
        </div>

        {/* RIGHT — visiting card flip */}
        <div className='hero-card'>
          <div
            className='hero-card-flipper'
            onMouseEnter={() => setFlipped(true)}
            onMouseLeave={() => setFlipped(false)}
            onClick={() => setFlipped(f => !f)}
          >
            <div className={`hero-card-inner${flipped ? ' is-flipped' : ''}`}>

              {/* glow blob */}
              <div aria-hidden='true' className='hero-card-glow-wrap'>
                <div className='hero-card-glow-blob' />
              </div>

              {/* front */}
              <div className='hero-card-face'>
                <img src='/front.jpeg' alt='SandeepsClicks visiting card — front' />
              </div>

              {/* back */}
              <div className='hero-card-face hero-card-back'>
                <img src='/back.jpeg' alt='SandeepsClicks visiting card — back' />
              </div>

            </div>
          </div>

          <p className='hero-card-hint'>Hover or tap to flip</p>
        </div>

      </div>

      {/* scroll indicator */}
      <div className='hero-scroll'>
        <span className='hero-scroll-label'>Scroll</span>
        <div className='hero-scroll-line' />
      </div>

    </section>
  )
}

export default Hero