<template>
    <div class="login-bg">
        <img src="https://img.pikbest.com/wp/202344/cuisine-delicious-vietnamese-on-a-textured-gray-background_9916093.jpg!w700wp"
            alt="background" class="bg-img" />
        <div class="glass-container">
            <!-- Sign In Panel -->
            <div class="panel left">
                <h2 class="text-white">Đăng nhập</h2>
                <div class="social-icons">
                    <button><i class="fab fa-facebook-f"></i></button>
                    <button><i class="fab fa-google"></i></button>
                    <button><i class="fab fa-linkedin-in"></i></button>
                </div>
                <form>
                    <input type="email" v-model="email" placeholder="Email" />
                    <input type="password" v-model="mat_khau" placeholder="Mật khẩu" />
                    <a href="#" class="forgot">Quên mật khẩu ?</a>
                    <!-- <button type="submit" class="sign-in-btn">Đăng nhập</button> -->
                    <button type="submit" class="sign-in-btn" :disabled="loading" @click="handleLogin">
                        {{ loading ? 'Đang xử lý...' : 'Đăng nhập' }}
                    </button>
                </form>
            </div>
            <!-- Hello Friend Panel -->
            <div class="panel right">
                <h2 class="text-white">Xin chào</h2>
                <p>Nhập thông tin cá nhân và bắt đầu hành trình với chúng tôi</p>
                <button class="sign-up-btn" @click="router.push('/user/register')">Đăng ký</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../../../services/authService'
import { useToast } from 'vue-toastification'
import axios from 'axios'


const toast = useToast()

const email = ref('')
const mat_khau = ref('')
const error = ref('')
const loading = ref(false)

const router = useRouter()

async function handleLogin() {
    error.value = ''
    loading.value = true
    try {
        const data = await login(email.value, mat_khau.value)
        // ✅ Lưu token vào localStorage
        if (data.status) {
            toast.success(data.message)
            localStorage.setItem('token', data.token)
            localStorage.setItem('vai_tro', JSON.stringify(data.data.vai_tro))
            // 👉 Chuyển trang
            router.push('/')
        } else {
            
        }

        
    } catch (err) {
        error.value = err
    } finally {
        loading.value = false
    }
}
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

.social-icons {
    display: flex;
    gap: 12px;
    margin-bottom: 18px;
}

.social-icons button {
    background: rgba(255, 255, 255, 0.25);
    border: none;
    border-radius: 50%;
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    transition: background 0.2s;
}

.social-icons button:hover {
    background: rgba(255, 255, 255, 0.45);
}

form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

input {
    margin-bottom: 14px;
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    background: rgba(255, 255, 255, 0.7);
    outline: none;
}

.forgot {
    color: #eee;
    font-size: 13px;
    margin-bottom: 18px;
    text-align: left;
    text-decoration: none;
    transition: color 0.2s;
}

.forgot:hover {
    color: #2ecc71;
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
    transition: background 0.2s;
}

.sign-in-btn:hover,
.sign-up-btn:hover {
    background: #27ae60;
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
}
</style>