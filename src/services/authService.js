// src/services/authService.js
import axios from 'axios'

const API = 'http://localhost:3001/api/auth'

export async function login(email, mat_khau) {
  try {
    const response = await axios.post(`${API}/login`, {
      email,
      mat_khau
    })
    return response.data  
  } catch (error) {
    // Ném lỗi ra ngoài để xử lý trong component
    throw error.response?.data?.message || 'Đăng nhập thất bại'
  }
}

export async function register(ho_ten, email, mat_khau) {
  try {
    const response = await axios.post(`${API}/register`, {
      ho_ten,
      email,
      mat_khau
    })
    return response.data
  } catch (error) {
    throw error.response?.data?.message || 'Đăng ký thất bại'
  }
}
