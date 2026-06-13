function ProductCard({ product }) {
  const message = `Hi, I'm interested in ${product.name} (₹${product.price})`
  const whatsappUrl = `https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(message)}`

  return (
    <div className='product-card'>
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.category}</p>
      <p>{product.description}</p>
      <p>₹{product.price}</p>
      <a href={whatsappUrl} target='_blank' rel='noreferrer'>
        Enquire on WhatsApp
      </a>
    </div>
  )
}

export default ProductCard