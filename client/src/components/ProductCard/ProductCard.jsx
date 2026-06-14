import './ProductCard.css'

const WHATSAPP_NUMBER = '918688153094'

function ProductCard({ product }) {
  const message = `Hi, I'm interested in ${product.name} (₹${product.price})`
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

  return (
    <div className='product-card'>
      <img src={product.imageUrl} alt={product.name} />
      <div className='product-card-body'>
        <h3 className='product-card-name'>{product.name}</h3>
        <p className='product-card-category'>{product.category}</p>
        <p className='product-card-desc'>{product.description}</p>
        <p className='product-card-price'>₹{product.price}</p>
        <a href={whatsappUrl} target='_blank' rel='noreferrer' className='product-card-cta'>
          Enquire on WhatsApp
        </a>
      </div>
    </div>
  )
}

export default ProductCard