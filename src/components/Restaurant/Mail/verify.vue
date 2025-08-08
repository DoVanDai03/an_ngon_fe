<template>
  <div class="verify-email-container">
    <div class="verify-card">
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <h2>Đang xác thực email</h2>
        <p class="subtitle">Vui lòng đợi trong giây lát...</p>
      </div>
      <div v-else>
        <div v-if="success" class="success-state">
          <div class="icon-circle success">
            <i class="check-icon">✓</i>
          </div>
          <h2>Xác thực thành công!</h2>
          <p class="subtitle">Email của bạn đã được xác thực thành công</p>
          <div class="countdown">
            <p>Tự động chuyển hướng sau <span class="countdown-number">{{ countdown }}</span> giây</p>
            <div class="progress-bar">
              <div class="progress" :style="{ width: (countdown / 5 * 100) + '%' }"></div>
            </div>
          </div>
        </div>
        <div v-else class="error-state">
          <div class="icon-circle error">
            <i class="error-icon">✕</i>
          </div>
          <h2>Xác thực thất bại</h2>
          <p class="subtitle">{{ error }}</p>
          <button @click="goToLogin" class="login-button">
            <span>Đến trang đăng nhập</span>
            <i class="arrow-icon">→</i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const loading = ref(true)
const success = ref(false)
const error = ref('')
const countdown = ref(5)

const verifyEmail = async (token) => {
  try {
    console.log('Verifying token:', token)
    console.log('API URL:', import.meta.env.VITE_API_URL)
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/restaurants/verify-email`, { token })
    console.log('Verification response:', response)
    success.value = true
    startCountdown()
  } catch (err) {
    console.error('Verification error:', err)
    success.value = false
    error.value = err.response?.data?.message || 'Có lỗi xảy ra trong quá trình xác thực email'
  } finally {
    loading.value = false
  }
}

const startCountdown = () => {
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      goToLogin()
    }
  }, 1000)
}

const goToLogin = () => {
  router.push('/restaurant/login')
}

onMounted(() => {
  const token = route.query.token
  if (!token) {
    loading.value = false
    error.value = 'Token xác thực không hợp lệ'
    return
  }
  verifyEmail(token)
})
</script>

<style scoped>
.verify-email-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
}

.verify-email-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://img.pikbest.com/wp/202344/cuisine-delicious-vietnamese-on-a-textured-gray-background_9916093.jpg!w700wp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: brightness(0.8);
  z-index: -1;
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.verify-card {
  background: rgba(255, 255, 255, 0.85);
  padding: 3rem;
  border-radius: 24px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 500px;
  width: 90%;
  transition: all 0.4s ease;
  position: relative;
  backdrop-filter: blur(18px);
  border: 1.5px solid rgba(255, 255, 255, 0.3);
}

.verify-card:hover {
  transform: translateY(-5px);
}

h2 {
  margin: 1rem 0;
  color: #2c3e50;
  font-size: 1.8rem;
  font-weight: 600;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.loading-state .loading-spinner {
  width: 50px;
  height: 50px;
  margin: 0 auto 1.5rem;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.icon-circle {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: white;
  transition: transform 0.3s ease;
}

.icon-circle.success {
  background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
  box-shadow: 0 10px 20px rgba(46, 204, 113, 0.3);
}

.icon-circle.error {
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  box-shadow: 0 10px 20px rgba(231, 76, 60, 0.3);
}

.icon-circle:hover {
  transform: scale(1.1) rotate(5deg);
}

.countdown {
  margin-top: 2rem;
  padding: 1.2rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(46, 204, 113, 0.2);
}

.countdown-number {
  font-weight: bold;
  color: #27ae60;
  font-size: 1.2rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.progress-bar {
  margin-top: 0.8rem;
  height: 6px;
  background-color: rgba(30, 55, 153, 0.1);
  border-radius: 3px;
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.progress {
  height: 100%;
  background: linear-gradient(to right, #2ecc71, #27ae60);
  transition: width 1s linear;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.login-button {
  margin-top: 2rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 8px 15px rgba(46, 204, 113, 0.3);
}

.login-button:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 12px 20px rgba(46, 204, 113, 0.4);
  background: linear-gradient(135deg, #27ae60 0%, #219a52 100%);
}

.login-button:active {
  transform: translateY(-1px);
  box-shadow: 0 5px 10px rgba(46, 204, 113, 0.4);
}

.arrow-icon {
  font-size: 1.3rem;
  transition: all 0.3s ease;
}

.login-button:hover .arrow-icon {
  transform: translateX(6px);
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px rgba(46, 204, 113, 0.5); }
  50% { box-shadow: 0 0 40px rgba(46, 204, 113, 0.8); }
}

.loading-spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #2ecc71;
  box-shadow: 0 0 20px rgba(46, 204, 113, 0.5);
  animation: spin 1s linear infinite, glow 2s ease-in-out infinite !important;
}

h2 {
  color: #2c3e50;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: 0.5px;
}

.subtitle {
  color: #34495e;
  font-size: 1.2rem;
  line-height: 1.6;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
</style>
