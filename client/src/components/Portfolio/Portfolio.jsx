import { useState, useEffect } from 'react'
import { getAllPhotos } from '../../api/gallery'
import './Portfolio.css'

const CATEGORIES = {
  all:       { label: 'All',            subs: [] },
  wedding:   { label: 'Wedding',        subs: ['Pre Wedding', 'Haldi', 'Reception', 'Engagement', 'wedding'] },
  saree:     { label: 'Saree Ceremony', subs: ['Saree Ceremony', 'Dhoti'] },
  birthdays: { label: 'Birthdays',      subs: ['Birthdays', 'Naming Ceremony'] },
  portraits: { label: 'Portraits',      subs: [] },
  maternity: { label: 'Maternity',      subs: [] },
}

const PLACEHOLDERS = [
  { id: 1,  cat: 'wedding',   sub: 'Pre Wedding',    h: '220px', bg: 'linear-gradient(135deg,#1a1208,#2d2010)', emoji: '🌅' },
  { id: 2,  cat: 'wedding',   sub: 'Haldi',          h: '260px', bg: 'linear-gradient(135deg,#3d2010,#2a1208)', emoji: '🌸' },
  { id: 3,  cat: 'wedding',   sub: 'Reception',      h: '200px', bg: 'linear-gradient(135deg,#251208,#1a0d05)', emoji: '🎊' },
  { id: 4,  cat: 'wedding',   sub: 'Engagement',     h: '220px', bg: 'linear-gradient(135deg,#251208,#1a0d05)', emoji: '💍' },
  { id: 5,  cat: 'wedding',   sub: 'wedding',        h: '250px', bg: 'linear-gradient(135deg,#2a1a08,#3d2010)', emoji: '💒' },
  { id: 6,  cat: 'saree',     sub: 'Saree Ceremony', h: '270px', bg: 'linear-gradient(135deg,#1a0808,#2d1010)', emoji: '👗' },
  { id: 7,  cat: 'saree',     sub: 'Dhoti',          h: '255px', bg: 'linear-gradient(135deg,#150808,#1a0808)', emoji: '🪔' },
  { id: 9,  cat: 'birthdays', sub: 'Birthdays',      h: '240px', bg: 'linear-gradient(135deg,#0d1520,#1a2535)', emoji: '🎉' },
  { id: 10, cat: 'birthdays', sub: 'Naming Ceremony',h: '210px', bg: 'linear-gradient(135deg,#1a2535,#0d1520)', emoji: '👶' },
  { id: 11, cat: 'portraits', sub: null,             h: '250px', bg: 'linear-gradient(135deg,#201530,#100d1a)', emoji: '📸' },
  { id: 12, cat: 'maternity', sub: null,             h: '265px', bg: 'linear-gradient(135deg,#100d1a,#201530)', emoji: '🌿' },
]

const normalizeCategory = (cat) => {
  if (!cat) return ''
  const lower = cat.toLowerCase().trim()
  const aliasMap = {
    'weddings':        'wedding',
    'pre-wedding':     'pre wedding',
    'dhoti ceremony':  'dhoti',
    'naming ceremony': 'naming ceremony',
    'saree ceremony':  'saree ceremony',
    'haldi':           'haldi',
    'reception':       'reception',
    'engagement':      'engagement',
    'birthday':        'birthdays',
    'maternity':       'maternity',
    'portraits':       'portraits',
  }
  return aliasMap[lower] || lower
}

function Portfolio() {
  const [allPhotos,  setAllPhotos]  = useState([])
  const [loading,    setLoading]    = useState(true)
  const [activeCat,  setActiveCat]  = useState('all')
  const [activeSub,  setActiveSub]  = useState(null)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true)
        const data = await getAllPhotos()
        setAllPhotos(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  const handleTopCat = (key) => { setActiveCat(key); setActiveSub(null) }

  const subs = CATEGORIES[activeCat]?.subs || []

  const visiblePhotos = allPhotos.filter(photo => {
    const normCat  = normalizeCategory(photo.category || '')
    if (activeCat === 'all') return true
    const normMain = normalizeCategory(CATEGORIES[activeCat]?.label)
    const normSubs = (CATEGORIES[activeCat]?.subs || []).map(s => normalizeCategory(s))
    if (!activeSub) return normCat === normMain || normSubs.includes(normCat)
    return normCat === normalizeCategory(activeSub)
  })

  const visiblePlaceholders = PLACEHOLDERS.filter(p => {
    if (activeCat !== 'all' && p.cat !== activeCat) return false
    if (activeSub && p.sub !== activeSub) return false
    return true
  })

  const showPlaceholders = visiblePhotos.length === 0 && !loading

  return (
    <section id='portfolio' className='portfolio-section'>
      <div className='portfolio-inner'>

        <div className='portfolio-header'>
          <p className='section-eyebrow'>Portfolio</p>
          <h2 className='section-title'>Selected Work</h2>
        </div>

        {/* top filter row */}
        <div className={`portfolio-top-filters${subs.length > 0 ? ' has-subs' : ''}`}>
          {Object.entries(CATEGORIES).map(([key, val]) => (
            <button
              key={key}
              onClick={() => handleTopCat(key)}
              className={`pf-btn-top${activeCat === key ? ' is-active' : ''}`}
            >
              {val.label}
            </button>
          ))}
        </div>

        {/* sub-category row */}
        {subs.length > 0 && (
          <div className='portfolio-sub-filters'>
            <button
              onClick={() => setActiveSub(null)}
              className={`pf-btn-sub${activeSub === null ? ' is-active' : ''}`}
            >
              All {CATEGORIES[activeCat].label}
            </button>
            {subs.map(sub => (
              <button
                key={sub}
                onClick={() => setActiveSub(sub)}
                className={`pf-btn-sub${activeSub === sub ? ' is-active' : ''}`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {/* masonry grid */}
        <div className='portfolio-grid'>

          {loading && (
            <p className='portfolio-loading'>Loading…</p>
          )}

          {/* real photos */}
          {!loading && visiblePhotos.map(photo => (
            <div key={photo._id} className='portfolio-item'>
              <img src={photo.imageUrl} alt={photo.title} />
              <div className='portfolio-item-overlay'>
                <p className='portfolio-item-label'>{photo.category}</p>
              </div>
            </div>
          ))}

          {/* placeholders */}
          {showPlaceholders && visiblePlaceholders.map(p => (
            <div key={p.id} className='portfolio-item'>
              <div
                className='portfolio-item-placeholder'
                style={{ height: p.h, background: p.bg }}
              >
                {p.emoji}
              </div>
              <div className='portfolio-item-overlay'>
                <p className='portfolio-item-label'>
                  {p.sub || CATEGORIES[p.cat]?.label}
                </p>
              </div>
            </div>
          ))}

          {!loading && visiblePhotos.length === 0 && visiblePlaceholders.length === 0 && (
            <p className='portfolio-empty'>No photos in this category yet.</p>
          )}

        </div>
      </div>
    </section>
  )
}

export default Portfolio