import BookingForm from '../BookingForm/BookingForm'
import './Booking.css'

function Booking() {
  return (
    <section id='booking' className='booking-section'>
      <div className='booking-inner'>

        <div className='booking-header'>
          <p className='section-eyebrow'>Book a Session</p>
          <h2 className='section-title'>
            Let&apos;s create something{' '}
            <em className='booking-title-em'>beautiful</em>{' '}
            together
          </h2>
          <div className='gold-divider' />
          <p className='section-sub'>
            Fill out the form and I will get back to you within 24 hours.
          </p>
        </div>

        <BookingForm />

      </div>
    </section>
  )
}

export default Booking