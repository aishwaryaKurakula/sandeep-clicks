const Booking = require('../models/booking')

// POST /api/bookings — client submits booking
const createBooking = async (req, res) => {
  try {
    const { name, email, phone, eventType, eventDate, location, message } = req.body

    const booking = await Booking.create({
      name,
      email,
      phone,
      eventType,
      eventDate,
      location,
      message
    })

    res.status(201).json({ 
      message: 'Booking received successfully',
      booking 
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET /api/bookings — admin only — see all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ eventDate: 1 })
    res.status(200).json(bookings)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// PATCH /api/bookings/:id — admin only — update booking status
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' })
    }

    res.status(200).json(booking)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// DELETE /api/bookings/:id — admin only
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' })
    }

    await booking.deleteOne()
    res.status(200).json({ message: 'Booking deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { createBooking, getAllBookings, updateBookingStatus, deleteBooking }
