const express = require('express')
const router = express.Router()
const multer = require('multer')
const adminAuth = require('../middleware/auth')
const {
  getAllPhotos,
  getPhotosByCategory,
  uploadPhoto,
  deletePhoto
} = require('../controllers/galleryController')

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
router.get('/',                    getAllPhotos)
router.get('/:category',           getPhotosByCategory)

// admin only routes
router.post('/',    adminAuth, upload.single('image'), uploadPhoto)
router.delete('/:id', adminAuth,                       deletePhoto)

module.exports = router