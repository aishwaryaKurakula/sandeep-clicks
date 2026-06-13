const express = require('express')
const router = express.Router()
const adminAuth = require('../middleware/auth')
const {
  createBooking,
  getAllBookings,
  updateBookingStatus,
  deleteBooking
} = require('../controllers/bookingController')

// public route — client submits booking
router.post('/', createBooking)

// admin only routes
router.get('/',        adminAuth, getAllBookings)
router.patch('/:id',   adminAuth, updateBookingStatus)
router.delete('/:id',  adminAuth, deleteBooking)

module.exports = router