import { useState } from 'react'
import { createBooking } from '../api/bookings'

const inputStyle = {
  background: 'var(--dark)',
  border: '0.5px solid rgba(201,137,42,0.2)',
  color: 'var(--ivory)',
  padding: '0.85rem 1rem',
  fontFamily: "'Inter', sans-serif",
  fontSize: '0.9rem',
  outline: 'none',
  width: '100%',
  transition: 'border-color 0.2s',
  appearance: 'none',
  WebkitAppearance: 'none',
}

const labelStyle = {
  fontSize: '0.72rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--gold)',
  fontWeight: 500,
  marginBottom: '0.4rem',
  display: 'block',
}

function Field({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  )
}

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
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleFocus = (e) => { e.target.style.borderColor = 'var(--gold)' }
  const handleBlur = (e) => { e.target.style.borderColor = 'rgba(201,137,42,0.2)' }

  const handleSubmit = async () => {
    const { name, email, phone, eventType, eventDate, location } = form
    if (!name || !email || !phone || !eventType || !eventDate || !location) {
      setErrorMsg('Please fill in all required fields.')
      return
    }
    setErrorMsg('')
    setStatus('loading')
    try {
      await createBooking(form)
      setStatus('success')
      setForm({ name: '', email: '', phone: '', eventType: '', eventDate: '', location: '', message: '' })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err?.response?.data?.message || 'Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div style={{
        background: 'var(--dark3)',
        border: '0.5px solid rgba(201,137,42,0.4)',
        padding: '4rem 3rem',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📸</div>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.8rem',
          color: 'var(--ivory)',
          marginBottom: '0.8rem',
        }}>
          Request received!
        </h3>
        <p style={{ color: 'var(--ivory-dim)', marginBottom: '2rem', lineHeight: 1.8 }}>
          Thank you for reaching out. Sandeep will get back to you within 24 hours
          to confirm your booking details.
        </p>
        <button
          onClick={() => setStatus('idle')}
          style={{
            background: 'transparent',
            border: '1px solid rgba(201,137,42,0.4)',
            color: 'var(--gold)',
            padding: '0.7rem 2rem',
            fontSize: '0.78rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}
          onMouseEnter={e => { e.target.style.background = 'var(--gold)'; e.target.style.color = 'var(--dark)' }}
          onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--gold)' }}
        >
          Submit another
        </button>
      </div>
    )
  }

  return (
    <div style={{
      background: 'var(--dark3)',
      border: '0.5px solid rgba(201,137,42,0.15)',
      padding: '3.5rem',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.5rem',
      }}>
        <Field label="Your Name *">
          <input style={inputStyle} type="text" name="name" placeholder="Full name"
            value={form.name} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
        </Field>

        <Field label="Phone Number *">
          <input style={inputStyle} type="tel" name="phone" placeholder="+91 XXXXX XXXXX"
            value={form.phone} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
        </Field>

        <Field label="Email Address *">
          <input style={inputStyle} type="email" name="email" placeholder="your@email.com"
            value={form.email} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
        </Field>

        <Field label="Event Date *">
          <input style={{ ...inputStyle, colorScheme: 'dark' }} type="date" name="eventDate"
            value={form.eventDate} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
        </Field>

        <Field label="Event Type *">
          <select style={inputStyle} name="eventType" value={form.eventType}
            onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}>
            <option value="" disabled>Select event type</option>
            {EVENT_TYPES.map(t => (
              <option key={t} value={t} style={{ background: 'var(--dark2)' }}>{t}</option>
            ))}
          </select>
        </Field>

        <Field label="Venue / Location *">
          <input style={inputStyle} type="text" name="location" placeholder="City or venue name"
            value={form.location} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
        </Field>

        <div style={{ gridColumn: '1 / -1' }}>
          <Field label="Tell me about your event">
            <textarea
              style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
              name="message"
              placeholder="Share any special moments, requirements, themes, or questions..."
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </Field>
        </div>
      </div>

      {errorMsg && (
        <p style={{
          color: '#e05a5a',
          fontSize: '0.82rem',
          marginTop: '1rem',
          padding: '0.6rem 1rem',
          background: 'rgba(224,90,90,0.08)',
          border: '0.5px solid rgba(224,90,90,0.3)',
        }}>
          {errorMsg}
        </p>
      )}

      <button
        onClick={handleSubmit}
        disabled={status === 'loading'}
        style={{
          width: '100%',
          background: status === 'loading' ? 'var(--gold-dark)' : 'var(--gold)',
          color: 'var(--dark)',
          padding: '1rem',
          fontSize: '0.8rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          fontWeight: 700,
          border: 'none',
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          transition: 'background 0.2s, transform 0.2s',
          marginTop: '1.5rem',
        }}
        onMouseEnter={e => { if (status !== 'loading') e.target.style.background = 'var(--gold-light)' }}
        onMouseLeave={e => { if (status !== 'loading') e.target.style.background = 'var(--gold)' }}
      >
        {status === 'loading' ? 'Sending…' : 'Send Booking Request'}
      </button>

      <p style={{
        fontSize: '0.75rem',
        color: 'var(--muted)',
        textAlign: 'center',
        marginTop: '1rem',
      }}>
        📸 I respond within 24 hours · No commitment required · Free initial consultation
      </p>
    </div>
  )
}

export default BookingForm