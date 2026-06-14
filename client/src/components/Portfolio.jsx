import { useState, useEffect } from 'react'
import { getAllPhotos } from '../api/gallery'

const CATEGORIES = {
  all:        { label: 'All', subs: [] },
  wedding:    { label: 'Wedding', subs: ['Pre Wedding', 'Haldi', 'Reception', 'Engagement', 'wedding'] },
  saree:      { label: 'Saree Ceremony', subs: ['Saree Ceremony', 'Dhoti'] },
  birthdays:  { label: 'Birthdays', subs: ['Birthdays', 'Naming Ceremony'] },
  portraits:  { label: 'Portraits', subs: [] },
  maternity:  { label: 'Maternity', subs: [] },
}

// Normalise a string for case‑insensitive comparison and map legacy variations
const normalizeCategory = (cat) => {
  if (!cat) return ''
  const lower = cat.toLowerCase().trim()
  const aliasMap = {
    'weddings': 'wedding',
    'pre-wedding': 'pre wedding',
    'dhoti ceremony': 'dhoti',
    'naming ceremony': 'naming ceremony',
    'saree ceremony': 'saree ceremony',
    'haldi': 'haldi',
    'reception': 'reception',
    'engagement': 'engagement',
    'birthday': 'birthdays',
    'maternity': 'maternity',
    'portraits': 'portraits',
  }
  return aliasMap[lower] || lower
}

const PLACEHOLDERS = [
  { id: 1,  cat: 'wedding',  sub: 'Pre Wedding',     h: '220px', bg: 'linear-gradient(135deg,#1a1208,#2d2010)', emoji: '🌅' },
  { id: 2,  cat: 'wedding',  sub: 'Haldi',           h: '260px', bg: 'linear-gradient(135deg,#3d2010,#2a1208)', emoji: '🌸' },
  { id: 3,  cat: 'wedding',  sub: 'Reception',       h: '200px', bg: 'linear-gradient(135deg,#251208,#1a0d05)', emoji: '🎊' },
  { id: 4,  cat: 'wedding',  sub: 'Engagement',      h: '220px', bg: 'linear-gradient(135deg,#251208,#1a0d05)', emoji: '💍' },
  { id: 5,  cat: 'wedding',  sub: 'wedding',         h: '250px', bg: 'linear-gradient(135deg,#2a1a08,#3d2010)', emoji: '💒' },
  { id: 6,  cat: 'saree',    sub: 'Saree Ceremony',  h: '270px', bg: 'linear-gradient(135deg,#1a0808,#2d1010)', emoji: '👗' },
  { id: 7,  cat: 'saree',    sub: 'Dhoti',           h: '255px', bg: 'linear-gradient(135deg,#150808,#1a0808)', emoji: '🪔' },
  { id: 9,  cat: 'birthdays',sub: 'Birthdays',       h: '240px', bg: 'linear-gradient(135deg,#0d1520,#1a2535)', emoji: '🎉' },
  { id: 10, cat: 'birthdays',sub: 'Naming Ceremony', h: '210px', bg: 'linear-gradient(135deg,#1a2535,#0d1520)', emoji: '👶' },
  { id: 11, cat: 'portraits',sub: null,              h: '250px', bg: 'linear-gradient(135deg,#201530,#100d1a)', emoji: '📸' },
  { id: 12, cat: 'maternity',sub: null,              h: '265px', bg: 'linear-gradient(135deg,#100d1a,#201530)', emoji: '🌿' },
]

const topBtnStyle = (active) => ({
  fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase',
  padding: '0.4rem 1.1rem', cursor: 'pointer', borderRadius: '20px',
  transition: 'all 0.2s',
  background: active ? 'rgba(201,137,42,0.1)' : 'transparent',
  border: `0.5px solid ${active ? 'var(--gold)' : 'rgba(201,137,42,0.3)'}`,
  color: active ? 'var(--gold)' : 'var(--muted)',
})

const subBtnStyle = (active) => ({
  fontSize: '0.68rem', letterSpacing: '0.08em', textTransform: 'uppercase',
  padding: '0.3rem 0.85rem', cursor: 'pointer', borderRadius: '20px',
  transition: 'all 0.2s',
  background: active ? 'rgba(201,137,42,0.1)' : 'transparent',
  border: `0.5px solid ${active ? 'var(--gold)' : 'rgba(201,137,42,0.2)'}`,
  color: active ? 'var(--gold)' : 'var(--muted)',
})

function Portfolio() {
  const [allPhotos, setAllPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCat, setActiveCat] = useState('all')
  const [activeSub, setActiveSub] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true)
        const data = await getAllPhotos()
        setAllPhotos(data)
        console.log('Loaded photos:', data.map(p => ({ title: p.title, category: p.category })))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  const handleTopCat = (key) => {
    setActiveCat(key)
    setActiveSub(null)
  }

  const handleSub = (sub) => {
    setActiveSub(sub)
  }

  const subs = CATEGORIES[activeCat]?.subs || []

  // Filter photos – case‑insensitive, using normalised values
  const visiblePhotos = allPhotos.filter(photo => {
    const rawCat = photo.category || ''
    const normCat = normalizeCategory(rawCat)

    if (activeCat === 'all') return true

    const mainLabel = CATEGORIES[activeCat]?.label
    const subList = CATEGORIES[activeCat]?.subs || []

    const normMain = normalizeCategory(mainLabel)
    const normSubs = subList.map(s => normalizeCategory(s))

    if (!activeSub) {
      // Show if category matches main label OR any subcategory
      return normCat === normMain || normSubs.includes(normCat)
    } else {
      // Show only if matches the selected subcategory
      const normActiveSub = normalizeCategory(activeSub)
      return normCat === normActiveSub
    }
  })

  const visiblePlaceholders = PLACEHOLDERS.filter(p => {
    if (activeCat !== 'all' && p.cat !== activeCat) return false
    if (activeSub && p.sub !== activeSub) return false
    return true
  })

  const showPlaceholders = visiblePhotos.length === 0 && !loading

  const getHoverText = (item, isPlaceholder = false) => {
    if (isPlaceholder) {
      return item.sub || CATEGORIES[item.cat]?.label
    }
    return item.category
  }

  return (
    <section id='portfolio' style={{ background: 'var(--dark)', padding: '6rem 4rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <p className='section-eyebrow'>Portfolio</p>
          <h2 className='section-title'>Selected Work</h2>
        </div>

        {/* top filter row */}
        <div style={{
          display: 'flex', gap: '0.5rem', flexWrap: 'wrap',
          paddingBottom: '0.75rem',
          borderBottom: '0.5px solid rgba(201,137,42,0.15)',
          marginBottom: subs.length > 0 ? '0.75rem' : '2rem',
        }}>
          {Object.entries(CATEGORIES).map(([key, val]) => (
            <button key={key} onClick={() => handleTopCat(key)}
              style={topBtnStyle(activeCat === key)}>
              {val.label}
            </button>
          ))}
        </div>

        {/* sub-category row */}
        {subs.length > 0 && (
          <div style={{
            display: 'flex', gap: '0.4rem', flexWrap: 'wrap',
            paddingLeft: '0.75rem',
            borderLeft: '2px solid var(--gold)',
            marginBottom: '2rem',
          }}>
            <button onClick={() => setActiveSub(null)} style={subBtnStyle(activeSub === null)}>
              All {CATEGORIES[activeCat].label}
            </button>
            {subs.map(sub => {
              const active = activeSub === sub
              return (
                <button key={sub} onClick={() => handleSub(sub)} style={subBtnStyle(active)}>
                  {sub}
                </button>
              )
            })}
          </div>
        )}

        {/* masonry grid */}
        <div style={{ columns: 3, columnGap: '1.2rem' }} className='portfolio-grid'>
          {loading && (
            <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '3rem' }}>Loading…</p>
          )}

          {/* real photos */}
          {!loading && visiblePhotos.map(photo => (
            <div key={photo._id} style={{
              breakInside: 'avoid', marginBottom: '1.2rem',
              position: 'relative', overflow: 'hidden',
              cursor: 'pointer', borderRadius: '4px',
            }}
              onMouseEnter={() => setHoveredId(photo._id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <img src={photo.imageUrl} alt={photo.title}
                style={{
                  width: '100%', display: 'block',
                  transition: 'transform 0.4s',
                  transform: hoveredId === photo._id ? 'scale(1.03)' : 'scale(1)',
                }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg,transparent 40%,rgba(13,13,13,0.9) 100%)',
                display: 'flex', alignItems: 'flex-end', padding: '1.2rem',
                opacity: hoveredId === photo._id ? 1 : 0,
                transition: 'opacity 0.3s',
              }}>
                <div>
                  <p style={{ fontSize: '0.7rem', color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
                    {getHoverText(photo, false)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* placeholders */}
          {showPlaceholders && visiblePlaceholders.map(p => (
            <div key={p.id} style={{
              breakInside: 'avoid', marginBottom: '1.2rem',
              position: 'relative', overflow: 'hidden',
              cursor: 'pointer', borderRadius: '4px',
            }}
              onMouseEnter={() => setHoveredId(p.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div style={{
                width: '100%', height: p.h,
                background: p.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2rem', color: 'rgba(201,137,42,0.2)',
                transition: 'transform 0.4s',
                transform: hoveredId === p.id ? 'scale(1.03)' : 'scale(1)',
                border: '0.5px solid rgba(201,137,42,0.1)',
              }}>
                {p.emoji}
              </div>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg,transparent 40%,rgba(13,13,13,0.9) 100%)',
                display: 'flex', alignItems: 'flex-end', padding: '1.2rem',
                opacity: hoveredId === p.id ? 1 : 0,
                transition: 'opacity 0.3s',
              }}>
                <div>
                  <p style={{ fontSize: '0.7rem', color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
                    {getHoverText(p, true)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {!loading && visiblePhotos.length === 0 && visiblePlaceholders.length === 0 && (
            <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '3rem' }}>
              No photos in this category yet.
            </p>
          )}
        </div>
      </div>

      <style>{`
        @media(max-width:900px){ .portfolio-grid{ columns: 2 !important; } }
        @media(max-width:600px){ .portfolio-grid{ columns: 1 !important; } }
      `}</style>
    </section>
  )
}

export default Portfolio