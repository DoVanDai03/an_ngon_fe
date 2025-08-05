// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/user/login',
    name: 'Userlogin',
    component: () => import('../components/User/Login/index.vue'),
    meta: {layout: 'Login'},
  },
  {
    path: '/user/register',
    name: 'UserRegister',
    component: () => import('../components/User/Register/index.vue'),
    meta: {layout: 'Register'},
  }
  // Thêm các route khác ở đây nếu cần
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;