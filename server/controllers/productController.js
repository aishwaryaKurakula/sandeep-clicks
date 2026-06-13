const Product = require('../models/Product')
const cloudinary = require('../config/cloudinary')

// GET /api/products — anyone can fetch products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json(products)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET /api/products/:id — get single product
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.status(200).json(product)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// POST /api/products — admin only
const addProduct = async (req, res) => {
  try {
    const { name, price, category, description } = req.body

    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' })
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'sandeepsclicks/products'
    })

    const product = await Product.create({
      name,
      price,
      category,
      description,
      imageUrl:     result.secure_url,
      cloudinaryId: result.public_id
    })

    res.status(201).json(product)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// DELETE /api/products/:id — admin only
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    await cloudinary.uploader.destroy(product.cloudinaryId)
    await product.deleteOne()

    res.status(200).json({ message: 'Product deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { getAllProducts, getProduct, addProduct, deleteProduct }