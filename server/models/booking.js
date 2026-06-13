const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  eventType: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  message: {
    type: String
  },
  status: {
    type: String,
    default: 'pending'
  }
}, { timestamps: true })

module.exports = mongoose.model('Booking', bookingSchema)