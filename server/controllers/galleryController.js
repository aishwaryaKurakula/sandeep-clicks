const Gallery = require('../models/Gallery')
const cloudinary = require('../config/cloudinary')

// GET /api/gallery — anyone can fetch photos
const getAllPhotos = async (req, res) => {
  try {
    const photos = await Gallery.find().sort({ createdAt: -1 })
    res.status(200).json(photos)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET /api/gallery/:category — fetch photos by category
const getPhotosByCategory = async (req, res) => {
  try {
    const photos = await Gallery.find({ 
      category: req.params.category 
    }).sort({ createdAt: -1 })
    res.status(200).json(photos)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// POST /api/gallery — admin only — upload photo
const uploadPhoto = async (req, res) => {
  try {
    const { title, category } = req.body

    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' })
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'sandeepscliks/gallery'
    })

    const photo = await Gallery.create({
      title,
      category,
      imageUrl:     result.secure_url,
      cloudinaryId: result.public_id
    })

    res.status(201).json(photo)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// DELETE /api/gallery/:id — admin only
const deletePhoto = async (req, res) => {
  try {
    const photo = await Gallery.findById(req.params.id)

    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' })
    }

    await cloudinary.uploader.destroy(photo.cloudinaryId)
    await photo.deleteOne()

    res.status(200).json({ message: 'Photo deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { getAllPhotos, getPhotosByCategory, uploadPhoto, deletePhoto }