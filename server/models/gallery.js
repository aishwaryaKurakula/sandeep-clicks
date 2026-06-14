import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api/gallery'

export const getAllPhotos = async () => {
  const response = await axios.get(BASE_URL)
  return response.data
}

export const getPhotosByCategory = async (category) => {
  const response = await axios.get(`${BASE_URL}/${category}`)
  return response.data
}

export const uploadPhoto = async (formData, password) => {
  const response = await axios.post(BASE_URL, formData, {
    headers: {
      'admin-password': password,
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

export const deletePhoto = async (id, password) => {
  const response = await axios.delete(`${BASE_URL}/${id}`, {
    headers: { 'admin-password': password }
  })
  return response.data
}

export const bulkUploadPhotos = async (formData, password) => {
  const response = await axios.post(`${BASE_URL}/bulk`, formData, {
    headers: {
      'admin-password': password,
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}