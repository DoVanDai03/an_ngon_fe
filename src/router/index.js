// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/user',
    children: [
      {
        path: 'login',
        name: 'Userlogin',
        component: () => import('../components/User/Login/index.vue'),
        meta: {layout: 'Login'},
      },
      {
        path: 'register',
        name: 'UserRegister',
        component: () => import('../components/User/Register/index.vue'),
        meta: {layout: 'Register'},
      },
      {
        path: 'verify-email',
        name: 'VerifyEmail',
        component: () => import('../components/User/Mail/verify.vue'),
        meta: {layout: 'Login'},
      }
    ]
  }
  // Thêm các route khác ở đây nếu cần
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;