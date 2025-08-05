import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Admin from './layouts/wrapper/Admin.vue'
import User from './layouts/wrapper/User.vue'
import Restaurant from './layouts/wrapper/Restaurant.vue'
import Teacher from './layouts/wrapper/Teacher.vue'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)
app.use(router)
app.use(Toast, {
    position: 'top-right',
    timeout: 5000,
})
app.component('Admin', Admin)
app.component('User', User)
app.component('Restaurant', Restaurant)
app.component('Teacher', Teacher)
app.mount('#app')
