const Gallery = require('../models/gallery')
const cloudinary = require('../config/cloudinary')
const fs = require('fs')

// GET /api/gallery
const getAllPhotos = async (req, res) => {
  try {
    const photos = await Gallery.find().sort({ createdAt: -1 })
    res.status(200).json(photos)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET /api/gallery/:category
const getPhotosByCategory = async (req, res) => {
  try {
    const photos = await Gallery.find({ category: req.params.category }).sort({ createdAt: -1 })
    res.status(200).json(photos)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// POST /api/gallery — single upload
const uploadPhoto = async (req, res) => {
  try {
    const { title, category } = req.body
    if (!req.file) return res.status(400).json({ message: 'Image is required' })

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'sandeep-clicks'
    })
    fs.unlinkSync(req.file.path)

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

// POST /api/gallery/bulk — bulk upload
const bulkUploadPhotos = async (req, res) => {
  try {
    const { category } = req.body
    if (!req.files || req.files.length === 0)
      return res.status(400).json({ message: 'No images provided' })

    const results = await Promise.all(
      req.files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'sandeep-clicks'
        })
        fs.unlinkSync(file.path)
        return Gallery.create({
          title:        file.originalname.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' '),
          category:     category || 'weddings',
          imageUrl:     result.secure_url,
          cloudinaryId: result.public_id
        })
      })
    )

    res.status(201).json({ inserted: results.length, photos: results })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// DELETE /api/gallery/:id
const deletePhoto = async (req, res) => {
  try {
    const photo = await Gallery.findById(req.params.id)
    if (!photo) return res.status(404).json({ message: 'Photo not found' })
    await cloudinary.uploader.destroy(photo.cloudinaryId)
    await photo.deleteOne()
    res.status(200).json({ message: 'Photo deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { getAllPhotos, getPhotosByCategory, uploadPhoto, bulkUploadPhotos, deletePhoto }