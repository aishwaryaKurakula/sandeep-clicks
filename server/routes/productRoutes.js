const express = require('express')
const router = express.Router()
const multer = require('multer')
const adminAuth = require('../middleware/auth')
const {
  getAllProducts,
  getProduct,
  addProduct,
  deleteProduct
} = require('../controllers/productController')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage })

// public routes
router.get('/',     getAllProducts)
router.get('/:id',  getProduct)

// admin only routes
router.post('/',       adminAuth, upload.single('image'), addProduct)
router.delete('/:id',  adminAuth, deleteProduct)

module.exports = router