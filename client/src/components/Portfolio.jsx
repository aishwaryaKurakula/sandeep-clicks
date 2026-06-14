import { useState, useEffect } from 'react'
import { getAllPhotos, getPhotosByCategory } from '../api/gallery'

const TOP_CATEGORIES = ['all', 'weddings', 'birthdays', 'saree ceremony', 'maternity']

// these are only used in admin panel for upload tagging
// client never sees these — they just see the top categories
const SUB_CATEGORIES = {
  weddings:  ['haldi', 'pre-wedding', 'reception', 'marriage'],
  birthdays: ['birthday', 'naming ceremony'],
}

const PLACEHOLDERS = [
  { id: 1, emoji: '💍', label: 'Wedding Ceremony',   top: 'weddings',       ar: '3/4', bg: 'linear-gradient(135deg,#1a1208,#2d2010)' },
  { id: 2, emoji: '🌸', label: 'Haldi Ceremony',     top: 'weddings',       ar: '4/5', bg: 'linear-gradient(135deg,#2a1a08,#3d2810)' },
  { id: 3, emoji: '🌅', label: 'Pre-Wedding Shoot',  top: 'weddings',       ar: '4/3', bg: 'linear-gradient(135deg,#0d1520,#1a2535)' },
  { id: 4, emoji: '🎊', label: 'Reception Night',    top: 'weddings',       ar: '2/3', bg: 'linear-gradient(135deg,#150d1a,#251030)' },
  { id: 5, emoji: '🎉', label: 'Birthday Party',     top: 'birthdays',      ar: '1/1', bg: 'linear-gradient(135deg,#0d1520,#1a2535)' },
  { id: 6, emoji: '👶', label: 'Naming Ceremony',    top: 'birthdays',      ar: '3/4', bg: 'linear-gradient(135deg,#150d08,#2a1a10)' },
  { id: 7, emoji: '👗', label: 'Saree Ceremony',     top: 'saree ceremony', ar: '3/4', bg: 'linear-gradient(135deg,#1a0d0d,#2d1515)' },
  { id: 8, emoji: '👗', label: 'Saree Draping',      top: 'saree ceremony', ar: '1/1', bg: 'linear-gradient(135deg,#121808,#202d10)' },
  { id: 9, emoji: '🌿', label: 'Maternity Portrait', top: 'maternity',      ar: '3/4', bg: 'linear-gradient(135deg,#100d1a,#201530)' },
]

const btnBase = {
  background: 'transparent',
  padding: '0.4rem 1.1rem',
  fontSize: '0.72rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  cursor: 'pointer',
  transition: 'all 0.2s',
  border: '0.5px solid rgba(201,137,42,0.3)',
  color: 'var(--muted)',
}

const btnActive = {
  ...btnBase,
  border: '0.5px solid var(--gold)',
  color: 'var(--gold)',
  background: 'rgba(201,137,42,0.08)',
}

function Portfolio() {
  const [photos, setPhotos]   = useState([])
  const [loading, setLoading] = useState(true)
  const [topCat, setTopCat]   = useState('all')

  useEffect(() => { fetchPhotos('all') }, [])

  const fetchPhotos = async (cat) => {
    try {
      setLoading(true)
      const data = cat === 'all'
        ? await getAllPhotos()
        : await getPhotosByCategory(cat)
      setPhotos(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleTop = (cat) => {
    setTopCat(cat)
    fetchPhotos(cat)
  }

  const visiblePlaceholders = topCat === 'all'
    ? PLACEHOLDERS
    : PLACEHOLDERS.filter(p => p.top === topCat)

  const showPlaceholders = photos.length === 0 && !loading

  return (
    <section id='portfolio' style={{ background: 'var(--dark)', padding: '6rem 4rem' }}>

      {/* header row */}
      <div style={{
        maxWidth: '1100px', margin: '0 auto 3.5rem',
        display: 'flex', alignItems: 'flex-end',
        justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem'
      }} className='reveal'>
        <div>
          <p className='section-eyebrow'>Portfolio</p>
          <h2 className='section-title'>Selected Work</h2>
        </div>

        {/* top level filters only — no sub-categories shown to client */}
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          {TOP_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => handleTop(cat)}
              style={topCat === cat ? btnActive : btnBase}
            >{cat}</button>
          ))}
        </div>
      </div>

      {/* photo grid */}
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        columns: 3, columnGap: '1.2rem'
      }} className='portfolio-grid'>

        {loading && (
          <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '3rem' }}>
            Loading...
          </p>
        )}

        {/* real photos from backend */}
        {!loading && photos.map(photo => (
          <div key={photo._id} style={{
            breakInside: 'avoid', marginBottom: '1.2rem',
            position: 'relative', overflow: 'hidden', cursor: 'pointer'
          }}>
            <img
              src={photo.imageUrl}
              alt={photo.title}
              style={{ width: '100%', display: 'block', transition: 'transform 0.4s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg,transparent 40%,rgba(13,13,13,0.9) 100%)',
              display: 'flex', alignItems: 'flex-end',
              padding: '1.2rem', opacity: 0, transition: 'opacity 0.3s'
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = 1}
              onMouseLeave={e => e.currentTarget.style.opacity = 0}
            >
              <div>
                <p style={{
                  fontSize: '0.8rem', color: 'var(--ivory)',
                  fontFamily: "'Playfair Display',serif"
                }}>{photo.title}</p>
                <p style={{
                  fontSize: '0.7rem', color: 'var(--gold)',
                  letterSpacing: '0.08em', textTransform: 'uppercase'
                }}>{photo.category}</p>
              </div>
            </div>
          </div>
        ))}

        {/* placeholders */}
        {showPlaceholders && visiblePlaceholders.map(p => (
          <div key={p.id} style={{
            breakInside: 'avoid', marginBottom: '1.2rem',
            position: 'relative', overflow: 'hidden', cursor: 'pointer'
          }}>
            <div style={{
              width: '100%', aspectRatio: p.ar,
              background: p.bg,
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '2rem',
              color: 'rgba(201,137,42,0.2)',
              transition: 'transform 0.4s'
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              {p.emoji}
            </div>
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: '1.2rem',
              background: 'linear-gradient(180deg,transparent,rgba(13,13,13,0.9))'
            }}>
              <p style={{
                fontSize: '0.8rem', color: 'var(--ivory)',
                fontFamily: "'Playfair Display',serif"
              }}>{p.label}</p>
              <p style={{
                fontSize: '0.7rem', color: 'var(--gold)',
                textTransform: 'uppercase', letterSpacing: '0.08em'
              }}>{p.top}</p>
            </div>
          </div>
        ))}

        {/* empty state */}
        {!loading && photos.length === 0 && visiblePlaceholders.length === 0 && (
          <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '3rem' }}>
            No photos in this category yet.
          </p>
        )}
      </div>

      <style>{`
        @media(max-width:900px){ .portfolio-grid{ columns: 2 !important; } }
        @media(max-width:600px){ .portfolio-grid{ columns: 1 !important; } }
      `}</style>
    </section>
  )
}

export default Portfolio