import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api/auth'

// admin login
export const adminLogin = async (password) => {
  const response = await axios.post(`${BASE_URL}/login`, { password })
  return response.data
}