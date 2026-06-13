import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api/bookings'

// submit booking — used on booking page
export const createBooking = async (bookingData) => {
  const response = await axios.post(BASE_URL, bookingData)
  return response.data
}

// fetch all bookings — admin only
export const getAllBookings = async (password) => {
  const response = await axios.get(BASE_URL, {
    headers: {
      'admin-password': password
    }
  })
  return response.data
}

// update booking status — admin only
export const updateBookingStatus = async (id, status, password) => {
  const response = await axios.patch(`${BASE_URL}/${id}`, { status }, {
    headers: {
      'admin-password': password
    }
  })
  return response.data
}

// delete booking — admin only
export const deleteBooking = async (id, password) => {
  const response = await axios.delete(`${BASE_URL}/${id}`, {
    headers: {
      'admin-password': password
    }
  })
  return response.data
}