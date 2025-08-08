<template>
    <div class="login-bg">
        <img src="https://img.pikbest.com/wp/202344/cuisine-delicious-vietnamese-on-a-textured-gray-background_9916093.jpg!w700wp"
            alt="background" class="bg-img" />
        <div class="glass-container">
            <!-- Sign In Panel -->
            <div class="panel left">
                <h2 class="text-white">Đăng ký - Giáo viên</h2>
                <form @submit.prevent="handleRegister" novalidate>
                    <div class="input-group">
                        <input 
                            type="text" 
                            placeholder="Họ và tên" 
                            v-model="formData.ho_ten" 
                            :class="{ 'error': errors.ho_ten }"
                            @blur="validateField('ho_ten')"
                            required 
                        />
                        <span v-if="errors.ho_ten" class="error-text">{{ errors.ho_ten }}</span>
                    </div>
                    
                    <div class="input-group">
                        <input 
                            type="email" 
                            placeholder="Email" 
                            v-model="formData.email" 
                            :class="{ 'error': errors.email }"
                            @blur="validateField('email')"
                            required 
                        />
                        <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
                    </div>
                    
                    <div class="input-group">
                        <input 
                            type="password" 
                            placeholder="Mật khẩu" 
                            v-model="formData.mat_khau" 
                            :class="{ 'error': errors.mat_khau }"
                            @blur="validateField('mat_khau')"
                            required 
                        />
                        <span v-if="errors.mat_khau" class="error-text">{{ errors.mat_khau }}</span>
                    </div>
                    
                    <div class="input-group">
                        <input 
                            type="password" 
                            placeholder="Nhập lại mật khẩu" 
                            v-model="formData.mat_khau_xac_nhan" 
                            :class="{ 'error': errors.mat_khau_xac_nhan }"
                            @blur="validateField('mat_khau_xac_nhan')"
                            required 
                        />
                        <span v-if="errors.mat_khau_xac_nhan" class="error-text">{{ errors.mat_khau_xac_nhan }}</span>
                    </div>
                    
                    <div v-if="generalError" class="general-error">{{ generalError }}</div>
                    
                    <button type="submit" class="sign-in-btn" :disabled="loading || !isFormValid">
                        <span v-if="loading" class="loading-spinner"></span>
                        {{ loading ? 'Đang xử lý...' : 'Đăng ký' }}
                    </button>
                </form>
            </div>
            <!-- Hello Friend Panel -->
            <div class="panel right">
                <h2 class="text-white">Xin chào</h2>
                <p>Nếu bạn đã có tài khoản? click vào đây để đăng nhập ngay</p>
                <button class="sign-up-btn" @click="goToLogin">Đăng nhập</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '../../../services/authService'
import { useToast } from 'vue-toastification'

// Composables
const toast = useToast()
const router = useRouter()

// Reactive data
const formData = reactive({
    ho_ten: '',
    email: '',
    mat_khau: '',
    mat_khau_xac_nhan: ''
})

const errors = reactive({
    ho_ten: '',
    email: '',
    mat_khau: '',
    mat_khau_xac_nhan: ''
})

const generalError = ref('')
const loading = ref(false)

// Computed properties
const isFormValid = computed(() => {
    return formData.ho_ten && 
           formData.email && 
           formData.mat_khau && 
           formData.mat_khau_xac_nhan &&
           !Object.values(errors).some(error => error)
})

// Validation functions
const validateField = (fieldName) => {
    errors[fieldName] = ''
    
    switch (fieldName) {
        case 'ho_ten':
            if (!formData.ho_ten.trim()) {
                errors.ho_ten = 'Họ và tên không được để trống'
            } else if (formData.ho_ten.trim().length < 3) {
                errors.ho_ten = 'Họ và tên phải có ít nhất 3 ký tự'
            } else if (formData.ho_ten.trim().length > 100) {
                errors.ho_ten = 'Họ và tên không được quá 100 ký tự'
            }
            break
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!formData.email.trim()) {
                errors.email = 'Email không được để trống'
            } else if (!emailRegex.test(formData.email.trim())) {
                errors.email = 'Email không hợp lệ'
            }
            break
            
        case 'mat_khau':
            if (!formData.mat_khau) {
                errors.mat_khau = 'Mật khẩu không được để trống'
            } else if (formData.mat_khau.length < 6) {
                errors.mat_khau = 'Mật khẩu phải có ít nhất 6 ký tự'
            } else if (formData.mat_khau.length > 50) {
                errors.mat_khau = 'Mật khẩu không được quá 50 ký tự'
            }
            break
            
        case 'mat_khau_xac_nhan':
            if (!formData.mat_khau_xac_nhan) {
                errors.mat_khau_xac_nhan = 'Vui lòng nhập lại mật khẩu'
            } else if (formData.mat_khau_xac_nhan !== formData.mat_khau) {
                errors.mat_khau_xac_nhan = 'Mật khẩu xác nhận không khớp'
            }
            break
    }
}

const validateForm = () => {
    Object.keys(formData).forEach(field => {
        validateField(field)
    })
    return !Object.values(errors).some(error => error)
}

// Navigation functions
const goToLogin = () => {
    router.push('/teacher/login')
}

// API functions
const handleRegister = async () => {
    if (!validateForm()) {
        toast.error('Vui lòng kiểm tra lại thông tin đăng ký')
        return
    }
    
    loading.value = true
    generalError.value = ''
    
    try {
        const response = await register(
            formData.ho_ten.trim(),
            formData.email.trim(),
            formData.mat_khau,
            'teacher' // This will be mapped to 'teachers' in authService
        )
        
        if (response.status) {
            toast.success(response.message || 'Đăng ký thành công!')
            
            // Store user data if provided
            if (response.token) {
                localStorage.setItem('token', response.token)
            }
            if (response.user) {
                localStorage.setItem('user', JSON.stringify(response.user))
            }
            
            // Clear form
            Object.keys(formData).forEach(key => {
                formData[key] = ''
            })
            Object.keys(errors).forEach(key => {
                errors[key] = ''
            })
            
            // Redirect to login
            setTimeout(() => {
                router.push('/teacher/login')
            }, 1500)
        } else {
            generalError.value = response.message || 'Đăng ký thất bại'
        }
        
    } catch (error) {
        console.error('Registration error:', error)
        
        if (error.response?.data?.message) {
            generalError.value = error.response.data.message
        } else if (error.message) {
            generalError.value = error.message
        } else {
            generalError.value = 'Có lỗi xảy ra, vui lòng thử lại sau'
        }
        
        toast.error(generalError.value)
    } finally {
        loading.value = false
    }
}

// Lifecycle hooks
onMounted(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    
    if (token && user) {
        try {
            const userData = JSON.parse(user)
            if (userData.role === 'teacher') {
                router.push('/teachers/dashboard')
            }
        } catch (e) {
            // Invalid user data, clear it
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        }
    }
})
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.text-white {
    color: #fff;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
}

.login-bg {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

.bg-img {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    z-index: 1;
}

.glass-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    max-width: 95vw;
    height: 420px;
    display: flex;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.25);
    z-index: 2;
    background: transparent;
}

.panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(18px);
    background: rgba(255, 255, 255, 0.18);
    box-shadow: 0 4px 32px rgba(0, 0, 0, 0.10);
    padding: 40px 32px;
}

.left {
    border-right: 1.5px solid rgba(255, 255, 255, 0.25);
}

.right {
    border-left: 1.5px solid rgba(255, 255, 255, 0.25);
    text-align: center;
}

h2 {
    margin-bottom: 18px;
    color: #fff;
    letter-spacing: 1px;
}

form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

.input-group {
    margin-bottom: 14px;
    position: relative;
}

input {
    width: 100%;
    padding: 12px;
    border: 2px solid transparent;
    border-radius: 8px;
    font-size: 16px;
    background: rgba(255, 255, 255, 0.7);
    outline: none;
    transition: all 0.3s ease;
    box-sizing: border-box;
}

input:focus {
    border-color: #2ecc71;
    background: rgba(255, 255, 255, 0.9);
}

input.error {
    border-color: #e74c3c;
    background: rgba(231, 76, 60, 0.1);
}

.error-text {
    color: #e74c3c;
    font-size: 12px;
    margin-top: 4px;
    display: block;
}

.general-error {
    color: #e74c3c;
    font-size: 14px;
    margin-bottom: 10px;
    text-align: center;
    padding: 8px;
    background: rgba(231, 76, 60, 0.1);
    border-radius: 4px;
}

.sign-in-btn,
.sign-up-btn {
    padding: 12px;
    background: #2ecc71;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    font-weight: bold;
    margin-top: 6px;
    box-shadow: 0 2px 8px rgba(46, 204, 113, 0.12);
    transition: all 0.3s ease;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.sign-in-btn:hover:not(:disabled),
.sign-up-btn:hover {
    background: #27ae60;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(46, 204, 113, 0.2);
}

.sign-in-btn:disabled {
    background: #95a5a6;
    cursor: not-allowed;
    transform: none;
}

.loading-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top: 2px solid #fff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.right p {
    color: #fff;
    margin-bottom: 24px;
    font-size: 15px;
}

@media (max-width: 700px) {
    .glass-container {
        flex-direction: column;
        width: 98vw;
        height: auto;
        min-height: 500px;
    }

    .panel {
        border: none !important;
        padding: 32px 12px;
    }
    
    input {
        font-size: 14px;
        padding: 10px;
    }
    
    .sign-in-btn,
    .sign-up-btn {
        font-size: 14px;
        padding: 10px;
    }
}
</style>
