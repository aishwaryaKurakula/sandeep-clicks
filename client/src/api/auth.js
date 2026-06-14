import axios from 'axios'

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/auth`

// admin login
export const adminLogin = async (password) => {
  const response = await axios.post(`${BASE_URL}/login`, { password })
  return response.data
}