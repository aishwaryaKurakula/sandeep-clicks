import axios from 'axios'

const BASE_URL = 'https://sandeep-clicks.onrender.com/api/gallery'

// fetch all photos — used on gallery page
export const getAllPhotos = async () => {
  const response = await axios.get(BASE_URL)
  return response.data
}

// fetch photos by category — used for filtering
export const getPhotosByCategory = async (category) => {
  const response = await axios.get(`${BASE_URL}/${category}`)
  return response.data
}

// upload photo — admin only
export const uploadPhoto = async (formData, password) => {
  const response = await axios.post(BASE_URL, formData, {
    headers: {
      'admin-password': password,
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

// delete photo — admin only
export const deletePhoto = async (id, password) => {
  const response = await axios.delete(`${BASE_URL}/${id}`, {
    headers: {
      'admin-password': password
    }
  })
  return response.data
}
// bulk upload photos — admin only
export const bulkUploadPhotos = async (formData, password) => {
  const response = await axios.post(`${BASE_URL}/bulk`, formData, {
    headers: {
      'admin-password': password,
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}