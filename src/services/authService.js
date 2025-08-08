// src/services/authService.js
import axios from 'axios'

const API = 'http://localhost:3001/api'

// Helper function to get the correct endpoint based on role
const getEndpoint = (role, action) => {
  // Handle special cases where role name differs from endpoint
  const roleMapping = {
    'teacher': 'teachers', // Use plural for teacher endpoints
    'restaurant': 'restaurants', // Use plural for restaurant endpoints
    'admin': 'admins' // Use plural for admin endpoints
  }
  
  const endpointRole = roleMapping[role] || role
  return `${API}/${endpointRole}/${action}`
}

export async function login(email, mat_khau, role = 'user') {
  try {
    const endpoint = getEndpoint(role, 'login')
    const response = await axios.post(endpoint, {
      email,
      mat_khau
    })
    return response.data  
  } catch (error) {
    // Ném lỗi ra ngoài để xử lý trong component
    throw error.response?.data?.message || 'Đăng nhập thất bại'
  }
}

export async function register(ho_ten, email, mat_khau, role = 'user') {
  try {
    const endpoint = getEndpoint(role, 'register')
    const response = await axios.post(endpoint, {
      ho_ten,
      email,
      mat_khau
    })
    return response.data
  } catch (error) {
    throw error.response?.data?.message || 'Đăng ký thất bại'
  }
}
