import { useState, useEffect } from 'react'
import { adminLogin } from '../api/auth'
import { uploadPhoto, getAllPhotos, deletePhoto } from '../api/gallery'
import { addProduct, getAllProducts, deleteProduct } from '../api/products'

// Categories matching your Portfolio – subcategories include the extra entries
const CATEGORIES = {
  wedding:    { label: 'Wedding',        subs: ['Pre Wedding', 'Haldi', 'Reception', 'Engagement', 'wedding'] },
  saree:      { label: 'Saree Ceremony', subs: ['Saree Ceremony', 'Dhoti'] },   // ✅ 'haldi' removed
  birthdays:  { label: 'Birthdays',      subs: ['Birthdays', 'Naming Ceremony'] },
  portraits:  { label: 'Portraits',      subs: [] },
  maternity:  { label: 'Maternity',      subs: [] },
}

function Admin() {
  const [password, setPassword]     = useState('')
  const [loggedIn, setLoggedIn]     = useState(false)
  const [error, setError]           = useState('')
  const [activeTab, setActiveTab]   = useState('gallery')

  // gallery state (no title input)
  const [photos, setPhotos]         = useState([])
  const [photoCat, setPhotoCat]     = useState('wedding')
  const [photoSub, setPhotoSub]     = useState('')
  const [photoFile, setPhotoFile]   = useState(null)
  const [photoLoading, setPhotoLoading] = useState(false)
  const [photoMsg, setPhotoMsg]     = useState('')

  // product state (unchanged)
  const [products, setProducts]         = useState([])
  const [productName, setProductName]   = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productCat, setProductCat]     = useState('')
  const [productDesc, setProductDesc]   = useState('')
  const [productFile, setProductFile]   = useState(null)
  const [productLoading, setProductLoading] = useState(false)
  const [productMsg, setProductMsg]     = useState('')

  useEffect(() => {
    const saved = sessionStorage.getItem('adminPassword')
    if (saved) {
      setLoggedIn(true)
      fetchAll(saved)
    }
  }, [])

  const fetchAll = async (pwd) => {
    try {
      const [p, pr] = await Promise.all([
        getAllPhotos(),
        getAllProducts()
      ])
      setPhotos(p)
      setProducts(pr)
    } catch (err) {
      console.error(err)
    }
  }

  const handleLogin = async () => {
    try {
      await adminLogin(password)
      sessionStorage.setItem('adminPassword', password)
      setLoggedIn(true)
      setError('')
      fetchAll(password)
    } catch (err) {
      setError('Wrong password')
    }
  }

  const handlePhotoUpload = async () => {
    if (!photoCat || !photoFile) {
      setPhotoMsg('Please select a category and an image file')
      return
    }
    try {
      setPhotoLoading(true)
      const pwd = sessionStorage.getItem('adminPassword')
      const formData = new FormData()

      const autoTitle = photoFile.name || `Photo_${Date.now()}`
      formData.append('title', autoTitle)

      // Determine category string to save
      let categoryToSave = ''
      if (photoSub) {
        categoryToSave = photoSub   // use the selected subcategory as is
      } else {
        categoryToSave = CATEGORIES[photoCat].label
      }
      formData.append('category', categoryToSave)

      formData.append('image', photoFile)
      await uploadPhoto(formData, pwd)

      setPhotoMsg('Photo uploaded successfully!')
      setPhotoSub('')
      setPhotoFile(null)
      fetchAll(pwd)
    } catch (err) {
      console.error(err)
      setPhotoMsg('Upload failed. Try again.')
    } finally {
      setPhotoLoading(false)
    }
  }

  const handlePhotoDelete = async (id) => {
    if (!window.confirm('Delete this photo?')) return
    try {
      const pwd = sessionStorage.getItem('adminPassword')
      await deletePhoto(id, pwd)
      setPhotos(prev => prev.filter(p => p._id !== id))
    } catch (err) {
      alert('Delete failed')
    }
  }

  const handleProductUpload = async () => {
    if (!productName || !productPrice || !productCat || !productDesc || !productFile) {
      setProductMsg('Please fill all fields and select an image')
      return
    }
    try {
      setProductLoading(true)
      const pwd = sessionStorage.getItem('adminPassword')
      const formData = new FormData()
      formData.append('name', productName)
      formData.append('price', productPrice)
      formData.append('category', productCat)
      formData.append('description', productDesc)
      formData.append('image', productFile)
      await addProduct(formData, pwd)
      setProductMsg('Product added successfully!')
      setProductName('')
      setProductPrice('')
      setProductCat('')
      setProductDesc('')
      setProductFile(null)
      fetchAll(pwd)
    } catch (err) {
      setProductMsg('Upload failed. Try again.')
    } finally {
      setProductLoading(false)
    }
  }

  const handleProductDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return
    try {
      const pwd = sessionStorage.getItem('adminPassword')
      await deleteProduct(id, pwd)
      setProducts(prev => prev.filter(p => p._id !== id))
    } catch (err) {
      alert('Delete failed')
    }
  }

  const subs = CATEGORIES[photoCat]?.subs || []

  // ─── LOGIN SCREEN (unchanged) ───
  if (!loggedIn) {
    return (
      <div style={{
        minHeight: '100vh', background: 'var(--dark)',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <div style={{
          background: 'var(--dark3)',
          border: '0.5px solid rgba(201,137,42,0.2)',
          padding: '3rem', width: '100%', maxWidth: '400px'
        }}>
          <p style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: '1.5rem', color: 'var(--ivory)',
            marginBottom: '0.3rem'
          }}>Admin Panel</p>
          <p style={{
            fontSize: '0.8rem', color: 'var(--muted)',
            marginBottom: '2rem'
          }}>sandeepsclicks</p>

          <label style={{
            fontSize: '0.72rem', letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'var(--gold)',
            display: 'block', marginBottom: '0.5rem'
          }}>Password</label>
          <input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder='Enter admin password'
            style={{
              width: '100%', background: 'var(--dark)',
              border: '0.5px solid rgba(201,137,42,0.2)',
              color: 'var(--ivory)', padding: '0.85rem 1rem',
              fontSize: '0.9rem', outline: 'none',
              marginBottom: '1rem'
            }}
          />
          {error && (
            <p style={{ color: '#e05', fontSize: '0.8rem', marginBottom: '1rem' }}>{error}</p>
          )}
          <button
            onClick={handleLogin}
            style={{
              width: '100%', background: 'var(--gold)',
              color: 'var(--dark)', padding: '0.85rem',
              border: 'none', fontSize: '0.8rem',
              letterSpacing: '0.14em', textTransform: 'uppercase',
              fontWeight: 600, cursor: 'pointer'
            }}
          >Login</button>
        </div>
      </div>
    )
  }

  // ─── ADMIN DASHBOARD ───
  return (
    <div style={{ minHeight: '100vh', background: 'var(--dark)', padding: '3rem 2rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: '2.5rem'
        }}>
          <div>
            <p style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: '1.8rem', color: 'var(--ivory)'
            }}>Admin Panel</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>sandeepsclicks</p>
          </div>
          <button
            onClick={() => { sessionStorage.clear(); setLoggedIn(false) }}
            style={{
              background: 'transparent',
              border: '0.5px solid rgba(201,137,42,0.3)',
              color: 'var(--muted)', padding: '0.5rem 1.2rem',
              fontSize: '0.75rem', cursor: 'pointer',
              letterSpacing: '0.1em', textTransform: 'uppercase'
            }}
          >Logout</button>
        </div>

        {/* tabs */}
        <div style={{
          display: 'flex', borderBottom: '0.5px solid rgba(201,137,42,0.2)',
          marginBottom: '2.5rem'
        }}>
          {['gallery', 'products'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'transparent', border: 'none',
                color: activeTab === tab ? 'var(--gold)' : 'var(--muted)',
                padding: '0.75rem 2rem', fontSize: '0.78rem',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                cursor: 'pointer',
                borderBottom: activeTab === tab
                  ? '2px solid var(--gold)'
                  : '2px solid transparent'
              }}
            >{tab}</button>
          ))}
        </div>

        {/* GALLERY TAB */}
        {activeTab === 'gallery' && (
          <div>
            <p style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: '1.2rem', color: 'var(--ivory)',
              marginBottom: '1.5rem'
            }}>Upload Photo</p>

            <div style={{
              background: 'var(--dark3)',
              border: '0.5px solid rgba(201,137,42,0.15)',
              padding: '2rem', marginBottom: '2.5rem'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem', marginBottom: '1rem'
              }}>
                {/* Category */}
                <div>
                  <label style={labelStyle}>Category</label>
                  <select
                    value={photoCat}
                    onChange={e => { setPhotoCat(e.target.value); setPhotoSub('') }}
                    style={inputStyle}
                  >
                    {Object.entries(CATEGORIES).map(([key, val]) => (
                      <option key={key} value={key}>{val.label}</option>
                    ))}
                  </select>
                </div>

                {/* Sub Category */}
                {subs.length > 0 && (
                  <div>
                    <label style={labelStyle}>Sub Category</label>
                    <select
                      value={photoSub}
                      onChange={e => setPhotoSub(e.target.value)}
                      style={inputStyle}
                    >
                      <option value=''>-- Select sub category --</option>
                      {subs.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* File Input */}
                <div>
                  <label style={labelStyle}>Photo File</label>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={e => setPhotoFile(e.target.files[0])}
                    style={{ ...inputStyle, padding: '0.6rem' }}
                  />
                </div>
              </div>

              {photoMsg && (
                <p style={{
                  fontSize: '0.8rem', marginBottom: '1rem',
                  color: photoMsg.includes('success') ? 'var(--gold)' : '#e05'
                }}>{photoMsg}</p>
              )}

              <button
                onClick={handlePhotoUpload}
                disabled={photoLoading}
                style={submitStyle}
              >
                {photoLoading ? 'Uploading...' : 'Upload Photo'}
              </button>
            </div>

            {/* Photo list */}
            <p style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: '1.2rem', color: 'var(--ivory)',
              marginBottom: '1.5rem'
            }}>Uploaded Photos ({photos.length})</p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px,1fr))',
              gap: '1rem'
            }}>
              {photos.map(photo => (
                <div key={photo._id} style={{
                  background: 'var(--dark3)',
                  border: '0.5px solid rgba(201,137,42,0.12)',
                  overflow: 'hidden'
                }}>
                  <img
                    src={photo.imageUrl} alt={photo.title}
                    style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{ padding: '0.75rem' }}>
                    <p style={{ fontSize: '0.72rem', color: 'var(--gold)', marginBottom: '0.75rem' }}>
                      {photo.category}
                    </p>
                    <button
                      onClick={() => handlePhotoDelete(photo._id)}
                      style={deleteStyle}
                    >Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRODUCTS TAB (unchanged) */}
        {activeTab === 'products' && (
          <div>
            <p style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: '1.2rem', color: 'var(--ivory)',
              marginBottom: '1.5rem'
            }}>Add Product</p>

            <div style={{
              background: 'var(--dark3)',
              border: '0.5px solid rgba(201,137,42,0.15)',
              padding: '2rem', marginBottom: '2.5rem'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem', marginBottom: '1rem'
              }}>
                <div>
                  <label style={labelStyle}>Product Name</label>
                  <input
                    value={productName}
                    onChange={e => setProductName(e.target.value)}
                    placeholder='e.g. Wooden Photo Frame'
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Price (₹)</label>
                  <input
                    value={productPrice}
                    onChange={e => setProductPrice(e.target.value)}
                    placeholder='e.g. 599'
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Category</label>
                  <input
                    value={productCat}
                    onChange={e => setProductCat(e.target.value)}
                    placeholder='e.g. frames'
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Product Image</label>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={e => setProductFile(e.target.files[0])}
                    style={{ ...inputStyle, padding: '0.6rem' }}
                  />
                </div>
                <div style={{ gridColumn: '1/-1' }}>
                  <label style={labelStyle}>Description</label>
                  <textarea
                    value={productDesc}
                    onChange={e => setProductDesc(e.target.value)}
                    placeholder='Short description of the product'
                    rows={3}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>
              </div>

              {productMsg && (
                <p style={{
                  fontSize: '0.8rem', marginBottom: '1rem',
                  color: productMsg.includes('success') ? 'var(--gold)' : '#e05'
                }}>{productMsg}</p>
              )}

              <button
                onClick={handleProductUpload}
                disabled={productLoading}
                style={submitStyle}
              >
                {productLoading ? 'Adding...' : 'Add Product'}
              </button>
            </div>

            <p style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: '1.2rem', color: 'var(--ivory)',
              marginBottom: '1.5rem'
            }}>Products ({products.length})</p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px,1fr))',
              gap: '1rem'
            }}>
              {products.map(product => (
                <div key={product._id} style={{
                  background: 'var(--dark3)',
                  border: '0.5px solid rgba(201,137,42,0.12)',
                  overflow: 'hidden'
                }}>
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl} alt={product.name}
                      style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block' }}
                    />
                  )}
                  <div style={{ padding: '0.75rem' }}>
                    <p style={{ fontSize: '0.82rem', color: 'var(--ivory)', marginBottom: '0.2rem' }}>
                      {product.name}
                    </p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--gold)', marginBottom: '0.75rem' }}>
                      ₹{product.price}
                    </p>
                    <button
                      onClick={() => handleProductDelete(product._id)}
                      style={deleteStyle}
                    >Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Styles (unchanged)
const labelStyle = {
  fontSize: '0.72rem', letterSpacing: '0.12em',
  textTransform: 'uppercase', color: 'var(--gold)',
  display: 'block', marginBottom: '0.5rem', fontWeight: 500
}

const inputStyle = {
  width: '100%', background: 'var(--dark)',
  border: '0.5px solid rgba(201,137,42,0.2)',
  color: 'var(--ivory)', padding: '0.75rem 1rem',
  fontSize: '0.85rem', outline: 'none',
  fontFamily: 'Inter, sans-serif'
}

const submitStyle = {
  background: 'var(--gold)', color: 'var(--dark)',
  padding: '0.8rem 2rem', border: 'none',
  fontSize: '0.78rem', letterSpacing: '0.14em',
  textTransform: 'uppercase', fontWeight: 600,
  cursor: 'pointer'
}

const deleteStyle = {
  background: 'transparent',
  border: '0.5px solid rgba(255,50,50,0.4)',
  color: '#e05', padding: '0.3rem 0.8rem',
  fontSize: '0.72rem', cursor: 'pointer',
  letterSpacing: '0.08em', textTransform: 'uppercase',
  width: '100%'
}

export default Admin