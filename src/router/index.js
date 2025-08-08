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
  },
  {
    path: '/teacher',
    children: [
      {
        path: 'login',
        name: 'TeacherLogin',
        component: () => import('../components/Teacher/Login/index.vue'),
        meta: {layout: 'Login'},
      },
      {
        path: 'register',
        name: 'TeacherRegister',
        component: () => import('../components/Teacher/Register/index.vue'),
        meta: {layout: 'Register'},
      },
      {
        path: 'verify-email',
        name: 'TeacherVerifyEmail',
        component: () => import('../components/Teacher/Mail/verify.vue'),
        meta: {layout: 'Login'},
      }
    ]
  },
  {
    path: '/restaurant',
    children: [
      {
        path: 'login',
        name: 'RestaurantLogin',
        component: () => import('../components/Restaurant/Login/index.vue'),
        meta: {layout: 'Login'},
      },
      {
        path: 'register',
        name: 'RestaurantRegister',
        component: () => import('../components/Restaurant/Register/index.vue'),
        meta: {layout: 'Register'},
      },
      {
        path: 'verify-email',
        name: 'RestaurantVerifyEmail',
        component: () => import('../components/Restaurant/Mail/verify.vue'),
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