import axios from 'axios'

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/bookings`

// submit booking
export const createBooking = async (bookingData) => {
  const response = await axios.post(BASE_URL, bookingData)
  return response.data
}

// fetch all bookings
export const getAllBookings = async (password) => {
  const response = await axios.get(BASE_URL, {
    headers: {
      'admin-password': password
    }
  })
  return response.data
}

// update booking status
export const updateBookingStatus = async (id, status, password) => {
  const response = await axios.patch(
    `${BASE_URL}/${id}`,
    { status },
    {
      headers: {
        'admin-password': password
      }
    }
  )
  return response.data
}

// delete booking
export const deleteBooking = async (id, password) => {
  const response = await axios.delete(`${BASE_URL}/${id}`, {
    headers: {
      'admin-password': password
    }
  })
  return response.data
}