import { useState, useEffect } from 'react'
import { adminLogin } from '../api/auth'
import { getAllBookings, updateBookingStatus, deleteBooking } from '../api/bookings'
import { getAllPhotos, uploadPhoto, bulkUploadPhotos, deletePhoto } from '../api/gallery'

// ─── helpers ─────────────────────────────────────────────────────────────────

const STATUS_COLORS = {
  pending:   { bg: 'rgba(201,137,42,0.12)', color: '#E8B86D' },
  confirmed: { bg: 'rgba(60,160,80,0.12)',  color: '#5ec97a' },
  completed: { bg: 'rgba(100,100,200,0.12)',color: '#9090e0' },
  cancelled: { bg: 'rgba(200,60,60,0.12)',  color: '#e07070' },
}

function Badge({ status }) {
  const s = STATUS_COLORS[status] || STATUS_COLORS.pending
  return (
    <span style={{
      background: s.bg,
      color: s.color,
      fontSize: '0.7rem',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      padding: '0.25rem 0.7rem',
      fontWeight: 600,
    }}>
      {status}
    </span>
  )
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric'
  })
}

const cell = {
  padding: '0.9rem 1rem',
  fontSize: '0.85rem',
  color: 'var(--ivory-dim)',
  borderBottom: '0.5px solid rgba(255,255,255,0.05)',
  verticalAlign: 'top',
}

const th = {
  ...cell,
  color: 'var(--gold)',
  fontSize: '0.72rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  fontWeight: 600,
  background: 'var(--dark3)',
  borderBottom: '1px solid rgba(201,137,42,0.2)',
}

// ─── Login screen ─────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!pw) return
    setLoading(true)
    setError('')
    try {
      await adminLogin(pw)
      onLogin(pw)
    } catch {
      setError('Incorrect password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--dark)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        background: 'var(--dark3)',
        border: '0.5px solid rgba(201,137,42,0.2)',
        padding: '3rem 2.5rem',
        width: '100%',
        maxWidth: '380px',
      }}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.6rem',
          color: 'var(--ivory)',
          marginBottom: '0.4rem',
        }}>
          Sandeeps<span style={{ color: 'var(--gold)' }}>Cliks</span>
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.82rem', marginBottom: '2rem' }}>
          Admin Dashboard
        </p>

        <label style={{
          fontSize: '0.72rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          marginBottom: '0.5rem',
          display: 'block',
        }}>
          Password
        </label>
        <input
          type="password"
          placeholder="Enter admin password"
          value={pw}
          onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
          style={{
            width: '100%',
            background: 'var(--dark)',
            border: '0.5px solid rgba(201,137,42,0.2)',
            color: 'var(--ivory)',
            padding: '0.85rem 1rem',
            fontSize: '0.9rem',
            outline: 'none',
            marginBottom: '0.5rem',
          }}
        />
        {error && (
          <p style={{ color: '#e07070', fontSize: '0.8rem', marginBottom: '0.8rem' }}>{error}</p>
        )}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: '100%',
            background: 'var(--gold)',
            color: 'var(--dark)',
            padding: '0.85rem',
            fontSize: '0.8rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer',
            marginTop: '0.5rem',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Checking…' : 'Enter Dashboard'}
        </button>
      </div>
    </div>
  )
}

// ─── Bookings tab ─────────────────────────────────────────────────────────────

function BookingsTab({ password }) {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const data = await getAllBookings(password)
      setBookings(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (id, status) => {
    try {
      await updateBookingStatus(id, status, password)
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status } : b))
    } catch (err) {
      alert('Failed to update status.')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this booking?')) return
    try {
      await deleteBooking(id, password)
      setBookings(prev => prev.filter(b => b._id !== id))
    } catch {
      alert('Failed to delete booking.')
    }
  }

  const STATUS_OPTIONS = ['pending', 'confirmed', 'completed', 'cancelled']
  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter)

  const summary = STATUS_OPTIONS.reduce((acc, s) => {
    acc[s] = bookings.filter(b => b.status === s).length
    return acc
  }, {})

  return (
    <div>
      {/* summary cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
        {[
          { label: 'Total', value: bookings.length, color: 'var(--gold)' },
          { label: 'Pending',   value: summary.pending,   color: '#E8B86D' },
          { label: 'Confirmed', value: summary.confirmed, color: '#5ec97a' },
          { label: 'Completed', value: summary.completed, color: '#9090e0' },
        ].map(({ label, value, color }) => (
          <div key={label} style={{
            background: 'var(--dark3)',
            border: '0.5px solid rgba(201,137,42,0.15)',
            padding: '1.2rem 1.5rem',
          }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color, lineHeight: 1 }}>
              {loading ? '…' : value}
            </div>
            <div style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: '0.3rem' }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* filter tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {['all', ...STATUS_OPTIONS].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              background: filter === s ? 'rgba(201,137,42,0.15)' : 'transparent',
              border: `0.5px solid ${filter === s ? 'var(--gold)' : 'rgba(201,137,42,0.25)'}`,
              color: filter === s ? 'var(--gold)' : 'var(--muted)',
              padding: '0.35rem 1rem',
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            {s}
          </button>
        ))}
        <button
          onClick={fetchBookings}
          style={{
            marginLeft: 'auto',
            background: 'transparent',
            border: '0.5px solid rgba(201,137,42,0.25)',
            color: 'var(--muted)',
            padding: '0.35rem 1rem',
            fontSize: '0.72rem',
            cursor: 'pointer',
          }}
        >
          ↻ Refresh
        </button>
      </div>

      {/* table */}
      {loading ? (
        <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '3rem' }}>Loading bookings…</p>
      ) : filtered.length === 0 ? (
        <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '3rem' }}>No bookings found.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--dark2)' }}>
            <thead>
              <tr>
                {['Name', 'Contact', 'Event', 'Date', 'Location', 'Status', 'Actions'].map(h => (
                  <th key={h} style={th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b._id}
                  style={{ transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,137,42,0.04)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={cell}>
                    <div style={{ color: 'var(--ivory)', fontWeight: 500 }}>{b.name}</div>
                    {b.message && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.3rem', maxWidth: '180px' }}>
                        {b.message.slice(0, 60)}{b.message.length > 60 ? '…' : ''}
                      </div>
                    )}
                  </td>
                  <td style={cell}>
                    <div>{b.phone}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{b.email}</div>
                  </td>
                  <td style={cell}>{b.eventType}</td>
                  <td style={cell}>{formatDate(b.eventDate)}</td>
                  <td style={cell}>{b.location}</td>
                  <td style={{ ...cell, whiteSpace: 'nowrap' }}>
                    <Badge status={b.status} />
                  </td>
                  <td style={{ ...cell, whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      <select
                        value={b.status}
                        onChange={e => handleStatusChange(b._id, e.target.value)}
                        style={{
                          background: 'var(--dark)',
                          border: '0.5px solid rgba(201,137,42,0.3)',
                          color: 'var(--ivory)',
                          padding: '0.3rem 0.5rem',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          outline: 'none',
                        }}
                      >
                        {STATUS_OPTIONS.map(s => (
                          <option key={s} value={s} style={{ background: 'var(--dark2)' }}>
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleDelete(b._id)}
                        style={{
                          background: 'rgba(200,60,60,0.12)',
                          border: '0.5px solid rgba(200,60,60,0.3)',
                          color: '#e07070',
                          padding: '0.3rem 0.6rem',
                          fontSize: '0.72rem',
                          cursor: 'pointer',
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// ─── Gallery tab ─────────────────────────────────────────────────────────────

const GALLERY_CATEGORIES = ['wedding', 'portrait', 'event', 'corporate', 'pre-wedding', 'product']

// ─── Gallery tab ─────────────────────────────────────────────────────────────

const GALLERY_CATEGORIES = ['weddings', 'birthdays', 'saree ceremony', 'maternity']

function GalleryTab({ password }) {
  const [photos, setPhotos]         = useState([])
  const [loading, setLoading]       = useState(true)

  // single upload
  const [form, setForm]             = useState({ title: '', category: '' })
  const [file, setFile]             = useState(null)
  const [uploading, setUploading]   = useState(false)
  const [uploadMsg, setUploadMsg]   = useState('')

  // bulk upload
  const [bulkFiles, setBulkFiles]   = useState([])
  const [bulkCategory, setBulkCategory] = useState('')
  const [bulkUploading, setBulkUploading] = useState(false)
  const [bulkMsg, setBulkMsg]       = useState('')
  const [bulkProgress, setBulkProgress] = useState(0)

  useEffect(() => { fetchPhotos() }, [])

  const fetchPhotos = async () => {
    setLoading(true)
    try { const data = await getAllPhotos(); setPhotos(data) } catch {}
    setLoading(false)
  }

  // ── single upload ──
  const handleUpload = async () => {
    if (!form.title || !form.category || !file) {
      setUploadMsg('Please fill all fields and select an image.')
      return
    }
    setUploading(true); setUploadMsg('')
    const fd = new FormData()
    fd.append('title', form.title)
    fd.append('category', form.category)
    fd.append('image', file)
    try {
      await uploadPhoto(fd, password)
      setUploadMsg('✓ Photo uploaded!')
      setForm({ title: '', category: '' }); setFile(null)
      fetchPhotos()
    } catch { setUploadMsg('Upload failed. Try again.') }
    setUploading(false)
  }

  // ── bulk upload ──
  const handleBulkUpload = async () => {
    if (bulkFiles.length === 0 || !bulkCategory) {
      setBulkMsg('Please select a category and at least one image.')
      return
    }
    setBulkUploading(true); setBulkMsg(''); setBulkProgress(0)

    // upload in batches of 5 to avoid overwhelming the server
    const BATCH = 5
    let uploaded = 0
    const allFiles = Array.from(bulkFiles)

    for (let i = 0; i < allFiles.length; i += BATCH) {
      const batch = allFiles.slice(i, i + BATCH)
      const fd = new FormData()
      fd.append('category', bulkCategory)
      batch.forEach(f => fd.append('images', f))
      try {
        await bulkUploadPhotos(fd, password)
        uploaded += batch.length
        setBulkProgress(Math.round((uploaded / allFiles.length) * 100))
      } catch (err) {
        setBulkMsg(`Error uploading batch ${Math.floor(i/BATCH)+1}. ${uploaded} uploaded so far.`)
      }
    }

    setBulkMsg(`✓ ${uploaded} of ${allFiles.length} photos uploaded!`)
    setBulkFiles([]); setBulkCategory('')
    setBulkUploading(false)
    fetchPhotos()
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this photo?')) return
    try {
      await deletePhoto(id, password)
      setPhotos(prev => prev.filter(p => p._id !== id))
    } catch { alert('Delete failed.') }
  }

  const inputStyle = {
    width: '100%', background: 'var(--dark)',
    border: '0.5px solid rgba(201,137,42,0.2)',
    color: 'var(--ivory)', padding: '0.7rem',
    outline: 'none', fontSize: '0.88rem', appearance: 'none'
  }
  const labelStyle = {
    fontSize: '0.7rem', letterSpacing: '0.1em',
    textTransform: 'uppercase', color: 'var(--gold)',
    display: 'block', marginBottom: '0.4rem'
  }

  return (
    <div>

      {/* ── BULK UPLOAD ── */}
      <div style={{
        background: 'var(--dark3)',
        border: '0.5px solid var(--gold)',
        padding: '2rem', marginBottom: '1.5rem'
      }}>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.1rem', color: 'var(--ivory)', marginBottom: '0.4rem'
        }}>
          Bulk Upload
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '1.5rem' }}>
          Select multiple images at once — hold Ctrl / Cmd to select many files
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem', marginBottom: '1rem'
        }}>
          <div>
            <label style={labelStyle}>Category *</label>
            <select
              value={bulkCategory}
              onChange={e => setBulkCategory(e.target.value)}
              style={inputStyle}
            >
              <option value="" disabled>Select category</option>
              {GALLERY_CATEGORIES.map(c => (
                <option key={c} value={c} style={{ background: 'var(--dark2)' }}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Images * ({bulkFiles.length} selected)</label>
            <input
              type="file" accept="image/*" multiple
              onChange={e => setBulkFiles(e.target.files)}
              style={{ color: 'var(--ivory-dim)', fontSize: '0.85rem', paddingTop: '0.5rem' }}
            />
          </div>
        </div>

        {/* progress bar */}
        {bulkUploading && (
          <div style={{ marginBottom: '1rem' }}>
            <div style={{
              background: 'var(--dark)',
              border: '0.5px solid rgba(201,137,42,0.2)',
              height: '8px', borderRadius: '4px', overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${bulkProgress}%`,
                background: 'var(--gold)',
                transition: 'width 0.3s ease'
              }} />
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--gold)', marginTop: '0.4rem' }}>
              Uploading… {bulkProgress}%
            </p>
          </div>
        )}

        {bulkMsg && (
          <p style={{
            fontSize: '0.82rem', marginBottom: '0.8rem',
            color: bulkMsg.startsWith('✓') ? '#5ec97a' : '#e07070'
          }}>{bulkMsg}</p>
        )}

        <button
          onClick={handleBulkUpload}
          disabled={bulkUploading}
          style={{
            background: 'var(--gold)', color: 'var(--dark)',
            padding: '0.75rem 2.5rem',
            fontSize: '0.8rem', letterSpacing: '0.12em',
            textTransform: 'uppercase', fontWeight: 700,
            border: 'none', cursor: bulkUploading ? 'not-allowed' : 'pointer',
            opacity: bulkUploading ? 0.7 : 1
          }}
        >
          {bulkUploading ? `Uploading ${bulkProgress}%…` : `Upload ${bulkFiles.length > 0 ? bulkFiles.length + ' ' : ''}Photos`}
        </button>
      </div>

      {/* ── SINGLE UPLOAD ── */}
      <div style={{
        background: 'var(--dark3)',
        border: '0.5px solid rgba(201,137,42,0.15)',
        padding: '2rem', marginBottom: '2.5rem'
      }}>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.1rem', color: 'var(--ivory)', marginBottom: '1.5rem'
        }}>
          Single Upload
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem', marginBottom: '1rem'
        }}>
          <div>
            <label style={labelStyle}>Title</label>
            <input type="text" placeholder="Photo title"
              value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
              style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Category</label>
            <select value={form.category}
              onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
              style={inputStyle}>
              <option value="" disabled>Select category</option>
              {GALLERY_CATEGORIES.map(c => (
                <option key={c} value={c} style={{ background: 'var(--dark2)' }}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Image</label>
            <input type="file" accept="image/*"
              onChange={e => setFile(e.target.files[0])}
              style={{ color: 'var(--ivory-dim)', fontSize: '0.85rem', paddingTop: '0.4rem' }} />
          </div>
        </div>
        {uploadMsg && (
          <p style={{
            fontSize: '0.82rem', marginBottom: '0.8rem',
            color: uploadMsg.startsWith('✓') ? '#5ec97a' : '#e07070'
          }}>{uploadMsg}</p>
        )}
        <button onClick={handleUpload} disabled={uploading} style={{
          background: 'var(--gold)', color: 'var(--dark)',
          padding: '0.7rem 2rem', fontSize: '0.78rem',
          letterSpacing: '0.12em', textTransform: 'uppercase',
          fontWeight: 700, border: 'none',
          cursor: uploading ? 'not-allowed' : 'pointer',
          opacity: uploading ? 0.7 : 1
        }}>
          {uploading ? 'Uploading…' : 'Upload Photo'}
        </button>
      </div>

      {/* ── PHOTO GRID ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: 'var(--ivory)' }}>
          Gallery ({photos.length} photos)
        </h3>
        <button onClick={fetchPhotos} style={{
          background: 'transparent',
          border: '0.5px solid rgba(201,137,42,0.25)',
          color: 'var(--muted)', padding: '0.35rem 1rem',
          fontSize: '0.72rem', cursor: 'pointer'
        }}>↻ Refresh</button>
      </div>

      {loading ? (
        <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '2rem' }}>Loading gallery…</p>
      ) : photos.length === 0 ? (
        <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '2rem' }}>No photos yet.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '1rem'
        }}>
          {photos.map(photo => (
            <div key={photo._id} style={{
              position: 'relative', background: 'var(--dark3)',
              border: '0.5px solid rgba(201,137,42,0.12)', overflow: 'hidden'
            }}>
              <img src={photo.imageUrl} alt={photo.title}
                style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
              <div style={{ padding: '0.6rem' }}>
                <p style={{ fontSize: '0.78rem', color: 'var(--ivory)', marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{photo.title}</p>
                <p style={{ fontSize: '0.68rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{photo.category}</p>
              </div>
              <button onClick={() => handleDelete(photo._id)} style={{
                position: 'absolute', top: '0.4rem', right: '0.4rem',
                background: 'rgba(13,13,13,0.8)',
                border: '0.5px solid rgba(200,60,60,0.5)',
                color: '#e07070', width: '26px', height: '26px',
                fontSize: '0.75rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Main Admin page ──────────────────────────────────────────────────────────

function Admin() {
  const [password, setPassword] = useState(null)
  const [activeTab, setActiveTab] = useState('bookings')

  if (!password) {
    return <LoginScreen onLogin={setPassword} />
  }

  const tabs = [
    { id: 'bookings', label: '📋 Bookings' },
    { id: 'gallery',  label: '🖼️ Gallery' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--dark)' }}>
      {/* top bar */}
      <div style={{
        background: 'var(--dark2)',
        borderBottom: '0.5px solid rgba(201,137,42,0.2)',
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <a href="/" style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.2rem',
          color: 'var(--ivory)',
          textDecoration: 'none',
        }}>
          Sandeeps<span style={{ color: 'var(--gold)' }}>Cliks</span>
          <span style={{ color: 'var(--muted)', fontSize: '0.75rem', marginLeft: '0.8rem', fontFamily: 'Inter, sans-serif' }}>
            Admin
          </span>
        </a>
        <button
          onClick={() => setPassword(null)}
          style={{
            background: 'transparent',
            border: '0.5px solid rgba(201,137,42,0.3)',
            color: 'var(--muted)',
            padding: '0.4rem 1rem',
            fontSize: '0.75rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}
          onMouseEnter={e => e.target.style.color = 'var(--ivory)'}
          onMouseLeave={e => e.target.style.color = 'var(--muted)'}
        >
          Log out
        </button>
      </div>

      {/* tab nav */}
      <div style={{
        padding: '0 2rem',
        borderBottom: '0.5px solid rgba(201,137,42,0.12)',
        display: 'flex',
        gap: '0',
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid var(--gold)' : '2px solid transparent',
              color: activeTab === tab.id ? 'var(--gold)' : 'var(--muted)',
              padding: '1rem 1.5rem',
              fontSize: '0.82rem',
              letterSpacing: '0.08em',
              cursor: 'pointer',
              transition: 'color 0.2s',
              marginBottom: '-0.5px',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* content */}
      <div style={{ padding: '2.5rem 2rem', maxWidth: '1300px', margin: '0 auto' }}>
        {activeTab === 'bookings' && <BookingsTab password={password} />}
        {activeTab === 'gallery'  && <GalleryTab  password={password} />}
      </div>
    </div>
  )
}

export default Admin