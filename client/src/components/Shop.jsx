import { useState, useEffect } from 'react'
import { getAllProducts } from '../api/products'

function Shop() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const staticProducts = [
  {
    _id: 's1',
    name: 'LED Photo Frames',
    image: '/led.jpg',
    desc: 'Gallery-quality LED frames in various sizes. Perfect for walls and gifting.',
    price: 'Starting ₹799'
  },
  {
    _id: 's2',
    name: 'Mug Printing',
    image: '/mug.jpg',
    desc: 'Custom printed mugs — a daily reminder of your best moments. Great for gifting.',
    price: 'Starting ₹249'
  },
  {
    _id: 's3',
    name: 'T-Shirt Printing',
    image: '/t-shirt-printing.jpeg',
    desc: 'High quality custom printed t-shirts for events, birthdays and gifting.',
    price: 'Starting ₹349'
  },
  {
    _id: 's4',
    name: 'Keychain Printing',
    image: '/keychain-printing.jpg',
    desc: 'Personalised photo keychains — carry your memory everywhere you go.',
    price: 'Starting ₹149'
  },
  {
    _id: 's5',
    name: 'LED Rotating Lamp',
    image: '/rotating-led-lamp.jpeg',
    desc: 'Stunning rotating LED photo lamps. A unique gift for any occasion.',
    price: 'Starting ₹799'
  },
  {
    _id: 's6',
    name: 'Pillow Printing',
    image: '/normal-pillow.jpeg',
    desc: 'Soft custom printed pillows — a cozy way to keep your favourite memory close.',
    price: 'Starting ₹699'
  },
  {
    _id: 's7',
    name: 'Magic Pillow Printing',
    image: '/magic-pillow.jpeg',
    desc: 'Magic pillows that reveal a hidden photo when touched — a delightful surprise gift.',
    price: 'Starting ₹799'
  },
  {
    _id: 's8',
    name: 'Magic Mirror',
    image: '/magic-mirror.jpeg',
    desc: 'A beautiful magic mirror with your favourite photo printed on it.',
    price: 'Starting ₹599'
  },
  {
    _id: 's9',
    name: 'Photo Frames',
    image: '/photo-frame.jpeg',
    desc: 'Classic wooden and designer photo frames in multiple sizes.',
    price: 'Starting ₹599'
  },
  {
    _id: 's10',
    name: 'Pouch Printing',
    image: '/phone-pouch.jpg',
    desc: 'Custom printed pouches perfect for gifting and personal use.',
    price: 'Starting ₹249'
  },
  {
    _id: 's11',
    name: 'Frame Sets',
    image: '/frame-sets.jpg',
    desc: 'Beautiful multi-photo frame sets for walls and special memories.',
    price: 'Starting ₹999'
  },
  {
    _id: 's12',
    name: '3D Photo Lamp',
    image: '/3d-lamp.jpg',
    desc: 'Stunning 3D illusion lamps with your photo — perfect night light gift.',
    price: 'Starting ₹999'
  },
  {
    _id: 's13',
    name: 'Wooden Photo Frame',
    image: '/wooden-photo-frame.jpg',
    desc: 'Premium quality wooden frames that add elegance to any photo.',
    price: 'Starting ₹599'
  }
]
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const data = await getAllProducts()
      setProducts(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false) // ← must be here
    }
  }
  fetchProducts()
}, [])

  const displayProducts =
    products.length > 0 ? products : staticProducts

  const getWhatsAppUrl = (name, price) => {
    const message = `Hi Sandeep, I'm interested in ${name} (${price}). Can you share more details?`

    return `https://wa.me/918688153094?text=${encodeURIComponent(
      message
    )}`
  }

  return (
    <section
      id="products"
      style={{
        background: 'var(--dark2)',
        padding: '6rem 4rem'
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto'
        }}
      >
        <div className="reveal">
          <p className="section-eyebrow">Print Products</p>

          <h2 className="section-title">
            Take the Memory Home
          </h2>

          <p className="section-sub">
            Transform your favourite photos into beautiful
            keepsakes and gifts.
          </p>
        </div>

        {loading && (
          <p
            style={{
              color: 'var(--muted)',
              marginTop: '3rem'
            }}
          >
            Loading products...
          </p>
        )}

        {!loading && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.2rem',
              marginTop: '3.5rem'
            }}
          >
            {displayProducts.map((product) => (
              <div
                key={product._id}
                className="reveal"
                style={{
                  background: 'var(--dark)',
                  border:
                    '0.5px solid rgba(201,137,42,0.12)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor =
                    'rgba(201,137,42,0.4)'
                  e.currentTarget.style.transform =
                    'translateY(-3px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    'rgba(201,137,42,0.12)'
                  e.currentTarget.style.transform =
                    'translateY(0)'
                }}
              >
                {(product.imageUrl || product.image) && (
                  <img
                    src={product.imageUrl || product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '180px',
                      objectFit: 'cover'
                    }}
                  />
                )}

                <div
                  style={{
                    padding: '1.2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1
                  }}
                >
                  <h3
                    style={{
                      fontFamily:
                        "'Playfair Display', serif",
                      fontSize: '1rem',
                      color: 'var(--ivory)',
                      marginBottom: '0.5rem'
                    }}
                  >
                    {product.name}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--muted)',
                      lineHeight: 1.6,
                      marginBottom: '0.8rem',
                      flex: 1
                    }}
                  >
                    {product.desc ||
                      product.description}
                  </p>

                  <p
                    style={{
                      fontSize: '0.78rem',
                      color: 'var(--gold)',
                      letterSpacing: '0.08em',
                      marginBottom: '1rem'
                    }}
                  >
                    {product.price}
                  </p>

                  <a
                    href={getWhatsAppUrl(
                      product.name,
                      product.price
                    )}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'block',
                      padding: '0.5rem 1.2rem',
                      border:
                        '0.5px solid rgba(201,137,42,0.4)',
                      color: 'var(--gold)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      textAlign: 'center',
                      transition: 'all 0.2s',
                      marginTop: 'auto'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        'var(--gold)'
                      e.currentTarget.style.color =
                        'var(--dark)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        'transparent'
                      e.currentTarget.style.color =
                        'var(--gold)'
                    }}
                  >
                    Enquire on WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Shop