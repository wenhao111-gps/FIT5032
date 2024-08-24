import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import store from './store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

if (Storage.get('token')) {
  store.commit('setToken', localStorage.getItem('token'))
}
router.beforeEach((to, from, next) => {
  if (token) {
    next('/')
  } else {
    getAddress().then((res) => {
      if (res.data.code === 200) {
        location.href = res.data.data.redirectUri
      }
    })
  }
})

export default router
