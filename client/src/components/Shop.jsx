import { useState, useEffect } from 'react'
import { getAllProducts } from '../api/products'

function Shop() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // fallback static products shown before Sandeep adds real ones
  const staticProducts = [
    {
      _id: 's1',
      icon: '🖼️',
      name: 'LED Photo Frames',
      desc: 'Gallery-quality LED frames in various sizes. Perfect for walls and gifting.',
      price: '799'
    },
    {
      _id: 's2',
      icon: '☕',
      name: 'Mug Printing',
      desc: 'Custom printed mugs — a daily reminder of your best moments. Great for gifting.',
      price: '249'
    },
    {
      _id: 's3',
      icon: '👕',
      name: 'T-Shirt Printing',
      desc: 'High quality custom printed t-shirts for events, birthdays and gifting.',
      price: '349'
    },
    {
      _id: 's4',
      icon: '🔑',
      name: 'Keychain Printing',
      desc: 'Personalised photo keychains — carry your memory everywhere you go.',
      price: '149'
    },
    {
      _id: 's5',
      icon: '💡',
      name: 'LED Rotating Lamp',
      desc: 'Stunning rotating LED photo lamps. A unique gift for any occasion.',
      price: '799'
    },
    {
      _id: 's6',
      icon: '🛋️',
      name: 'Pillow Printing',
      desc: 'Soft custom printed pillows. Normal and magic variants available.',
      price: '699'
    },
    {
      _id: 's7',
      icon: '🪞',
      name: 'Magic Mirror',
      desc: 'A beautiful magic mirror with your favourite photo printed on it.',
      price: '599'
    },
    {
      _id: 's8',
      icon: '🖼️',
      name: 'Photo Frames',
      desc: 'Classic wooden and designer photo frames in multiple sizes.',
      price: '599'
    },
    {
      _id: 's9',
      icon: '👜',
      name: 'Pouch Printing',
      desc: 'Custom printed pouches perfect for gifting and personal use.',
      price: '249'
    },
    {
      _id: 's10',
      icon: '🗂️',
      name: 'Frame Sets',
      desc: 'Beautiful multi-photo frame sets for walls and special memories.',
      price: '999'
    },
    {
      _id: 's11',
      icon: '🏮',
      name: '3D Photo Lamp',
      desc: 'Stunning 3D illusion lamps with your photo — perfect night light gift.',
      price: '999'
    },
    {
      _id: 's12',
      icon: '🪵',
      name: 'Wooden Photo Frame',
      desc: 'Premium quality wooden frames that add elegance to any photo.',
      price: '599'
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
        setLoading(false)
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
        {/* heading */}
        <div className="reveal">
          <p className="section-eyebrow">Print Products</p>

          <h2 className="section-title">
            Take the memory home
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
                'repeat(auto-fit, minmax(220px,1fr))',
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
                  padding: '2rem 1.5rem',
                  textAlign: 'center',
                  transition:
                    'border-color 0.3s, transform 0.3s'
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
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '160px',
                      objectFit: 'cover',
                      marginBottom: '1rem'
                    }}
                  />
                ) : (
                  <div
                    style={{
                      fontSize: '2.5rem',
                      marginBottom: '1rem'
                    }}
                  >
                    {product.icon}
                  </div>
                )}

                <h3
                  style={{
                    fontFamily:
                      "'Playfair Display', serif",
                    fontSize: '1.1rem',
                    color: 'var(--ivory)',
                    marginBottom: '0.5rem'
                  }}
                >
                  {product.name}
                </h3>

                <p
                  style={{
                    fontSize: '0.82rem',
                    color: 'var(--muted)',
                    lineHeight: 1.6,
                    marginBottom: '1rem'
                  }}
                >
                  {product.desc || product.description}
                </p>

                <p
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--gold)',
                    letterSpacing: '0.08em',
                    marginBottom: '1.2rem'
                  }}
                >
                  Starting ₹{product.price}
                </p>

                <a
                  href={getWhatsAppUrl(
                    product.name,
                    `₹${product.price}`
                  )}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-block',
                    padding: '0.5rem 1.2rem',
                    border:
                      '0.5px solid rgba(201,137,42,0.4)',
                    color: 'var(--gold)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    transition: 'all 0.2s'
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
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Shop