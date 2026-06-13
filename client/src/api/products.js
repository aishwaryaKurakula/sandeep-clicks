import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api/products'

// fetch all products — used on shop page
export const getAllProducts = async () => {
  const response = await axios.get(BASE_URL)
  return response.data
}

// fetch single product — used on product detail page
export const getProduct = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`)
  return response.data
}

// add product — admin only
export const addProduct = async (formData, password) => {
  const response = await axios.post(BASE_URL, formData, {
    headers: {
      'admin-password': password,
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

// delete product — admin only
export const deleteProduct = async (id, password) => {
  const response = await axios.delete(`${BASE_URL}/${id}`, {
    headers: {
      'admin-password': password
    }
  })
  return response.data
}