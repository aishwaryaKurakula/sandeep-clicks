const express = require('express')
const router = express.Router()
const multer = require('multer')
const adminAuth = require('../middleware/auth')
const {
  getAllPhotos,
  getPhotosByCategory,
  uploadPhoto,
  bulkUploadPhotos,
  deletePhoto
} = require('../controllers/galleryController')

const storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, 'uploads/') },
  filename:    (req, file, cb) => { cb(null, Date.now() + '-' + file.originalname) }
})

const upload = multer({ storage })

// public
router.get('/',           getAllPhotos)
router.get('/:category',  getPhotosByCategory)

// admin
router.post('/',      adminAuth, upload.single('image'),           uploadPhoto)
router.post('/bulk',  adminAuth, upload.array('images', 100),      bulkUploadPhotos)
router.delete('/:id', adminAuth,                                   deletePhoto)

module.exports = router