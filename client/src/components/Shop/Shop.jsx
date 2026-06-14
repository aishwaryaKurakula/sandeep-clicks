import { useState, useEffect } from 'react'
import { getAllProducts } from '../../api/products'
import './Shop.css'

const STATIC_PRODUCTS = [
  { _id: 's1',  name: 'LED Photo Frames',     image: '/led.jpg',                  desc: 'Gallery-quality LED frames in various sizes. Perfect for walls and gifting.',                    price: 'Starting ₹799' },
  { _id: 's2',  name: 'Mug Printing',          image: '/mug.jpg',                  desc: 'Custom printed mugs — a daily reminder of your best moments. Great for gifting.',               price: 'Starting ₹249' },
  { _id: 's3',  name: 'T-Shirt Printing',      image: '/t-shirt-printing.jpeg',    desc: 'High quality custom printed t-shirts for events, birthdays and gifting.',                       price: 'Starting ₹349' },
  { _id: 's4',  name: 'Keychain Printing',     image: '/keychain-printing.jpg',    desc: 'Personalised photo keychains — carry your memory everywhere you go.',                           price: 'Starting ₹149' },
  { _id: 's5',  name: 'LED Rotating Lamp',     image: '/rotating-led-lamp.jpeg',   desc: 'Stunning rotating LED photo lamps. A unique gift for any occasion.',                            price: 'Starting ₹799' },
  { _id: 's6',  name: 'Pillow Printing',       image: '/normal-pillow.jpeg',       desc: 'Soft custom printed pillows — a cozy way to keep your favourite memory close.',                 price: 'Starting ₹699' },
  { _id: 's7',  name: 'Magic Pillow Printing', image: '/magic-pillow.jpeg',        desc: 'Magic pillows that reveal a hidden photo when touched — a delightful surprise gift.',           price: 'Starting ₹799' },
  { _id: 's8',  name: 'Magic Mirror',          image: '/magic-mirror.jpeg',        desc: 'A beautiful magic mirror with your favourite photo printed on it.',                              price: 'Starting ₹599' },
  { _id: 's9',  name: 'Photo Frames',          image: '/photo-frame.jpeg',         desc: 'Classic wooden and designer photo frames in multiple sizes.',                                    price: 'Starting ₹599' },
  { _id: 's10', name: 'Pouch Printing',        image: '/phone-pouch.jpg',          desc: 'Custom printed pouches perfect for gifting and personal use.',                                   price: 'Starting ₹249' },
  { _id: 's11', name: 'Frame Sets',            image: '/frame-sets.jpg',           desc: 'Beautiful multi-photo frame sets for walls and special memories.',                               price: 'Starting ₹999' },
  { _id: 's12', name: '3D Photo Lamp',         image: '/3d-lamp.jpg',              desc: 'Stunning 3D illusion lamps with your photo — perfect night light gift.',                        price: 'Starting ₹999' },
  { _id: 's13', name: 'Wooden Photo Frame',    image: '/wooden-photo-frame.jpg',   desc: 'Premium quality wooden frames that add elegance to any photo.',                                 price: 'Starting ₹599' },
]

const getWhatsAppUrl = (name, price) => {
  const message = `Hi Sandeep, I'm interested in ${name} (${price}). Can you share more details?`
  return `https://wa.me/918688153094?text=${encodeURIComponent(message)}`
}

function Shop() {
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)

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

  const displayProducts = products.length > 0 ? products : STATIC_PRODUCTS

  return (
    <section id='products' className='shop-section'>
      <div className='shop-inner'>

        <div className='reveal'>
          <p className='section-eyebrow'>Print Products</p>
          <h2 className='section-title'>Take the Memory Home</h2>
          <p className='section-sub'>
            Transform your favourite photos into beautiful keepsakes and gifts.
          </p>
        </div>

        {loading && <p className='shop-loading'>Loading products...</p>}

        {!loading && (
          <div className='shop-grid'>
            {displayProducts.map(product => (
              <div key={product._id} className='shop-card reveal'>

                {(product.imageUrl || product.image) && (
                  <img
                    src={product.imageUrl || product.image}
                    alt={product.name}
                  />
                )}

                <div className='shop-card-body'>
                  <h3 className='shop-card-name'>{product.name}</h3>
                  <p className='shop-card-desc'>{product.desc || product.description}</p>
                  <p className='shop-card-price'>{product.price}</p>
                  <a
                    href={getWhatsAppUrl(product.name, product.price)}
                    target='_blank'
                    rel='noreferrer'
                    className='shop-card-cta'
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