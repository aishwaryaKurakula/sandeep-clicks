import { useState } from 'react'
import './BookingForm.css'

const EVENT_TYPES = [
  'Wedding',
  'Pre-Wedding Shoot',
  'Portrait Session',
  'Birthday / Event',
  'Naming Ceremony',
  'Corporate Event',
  'Product Photography',
  'Other',
]

function Field({ label, children }) {
  return (
    <div className='bf-field'>
      <label className='bf-label'>{label}</label>
      {children}
    </div>
  )
}

function BookingForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    location: '',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle | loading | success
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = () => {
    const { name, email, phone, eventType, eventDate, location, message } = form
    if (!name || !email || !phone || !eventType || !eventDate || !location) {
      setErrorMsg('Please fill in all required fields.')
      return
    }
    setErrorMsg('')
    setStatus('loading')

    const whatsappMessage =
      `📸 *New Booking Request from sandeepsclicks*%0A%0A` +
      `*Name:* ${encodeURIComponent(name)}%0A` +
      `*Phone:* ${encodeURIComponent(phone)}%0A` +
      `*Email:* ${encodeURIComponent(email)}%0A` +
      `*Event Type:* ${encodeURIComponent(eventType)}%0A` +
      `*Event Date:* ${encodeURIComponent(eventDate)}%0A` +
      `*Location:* ${encodeURIComponent(location)}%0A` +
      `*Message:* ${encodeURIComponent(message || '—')}`

    window.open(`https://wa.me/918688153094?text=${whatsappMessage}`, '_blank')

    setStatus('success')
    setTimeout(() => {
      setForm({ name: '', email: '', phone: '', eventType: '', eventDate: '', location: '', message: '' })
    }, 500)
  }

  if (status === 'success') {
    return (
      <div className='bf-success'>
        <div className='bf-success-icon'>📸</div>
        <h3 className='bf-success-title'>Request sent via WhatsApp!</h3>
        <p className='bf-success-body'>
          Thank you for reaching out. A WhatsApp chat has been opened with Sandeep.<br />
          Please send the message – Sandeep will get back to you within 24 hours.
        </p>
        <button className='bf-success-btn' onClick={() => setStatus('idle')}>
          Submit another
        </button>
      </div>
    )
  }

  return (
    <div className='bf-form'>
      <div className='bf-grid'>

        <Field label='Your Name *'>
          <input className='bf-input' type='text' name='name' placeholder='Full name'
            value={form.name} onChange={handleChange} />
        </Field>

        <Field label='Phone Number *'>
          <input className='bf-input' type='tel' name='phone' placeholder='+91 XXXXX XXXXX'
            value={form.phone} onChange={handleChange} />
        </Field>

        <Field label='Email Address *'>
          <input className='bf-input' type='email' name='email' placeholder='your@email.com'
            value={form.email} onChange={handleChange} />
        </Field>

        <Field label='Event Date *'>
          <input className='bf-input bf-input--date' type='date' name='eventDate'
            value={form.eventDate} onChange={handleChange} />
        </Field>

        <Field label='Event Type *'>
          <select className='bf-input' name='eventType' value={form.eventType} onChange={handleChange}>
            <option value='' disabled>Select event type</option>
            {EVENT_TYPES.map(t => (
              <option key={t} value={t} style={{ background: 'var(--dark2)' }}>{t}</option>
            ))}
          </select>
        </Field>

        <Field label='Venue / Location *'>
          <input className='bf-input' type='text' name='location' placeholder='City or venue name'
            value={form.location} onChange={handleChange} />
        </Field>

        <div className='bf-full-col'>
          <Field label='Tell me about your event'>
            <textarea
              className='bf-input bf-input--textarea'
              name='message'
              placeholder='Share any special moments, requirements, themes, or questions...'
              value={form.message}
              onChange={handleChange}
            />
          </Field>
        </div>

      </div>

      {errorMsg && <p className='bf-error'>{errorMsg}</p>}

      <button
        className='bf-submit'
        onClick={handleSubmit}
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Opening WhatsApp...' : 'Send Booking Request'}
      </button>

      <p className='bf-note'>
        📸 I respond within 24 hours · No commitment required · Free initial consultation
      </p>
    </div>
  )
}

export default BookingForm