import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'  // 修改导入名称
import LoginView from '../views/Login.vue'  // 修改导入名称
import RegisterView from '../views/Register.vue'  // 修改导入名称
import PostsList from '../views/Posts.vue'  // 修改导入名称
import ProfileView from '../views/Profile.vue'  // 修改导入名称

const routes = [
  {
    path: '/',
    name: 'HomeView',  // 修改路由名称
    component: HomeView
  },
  {
    path: '/login',
    name: 'LoginView',  // 修改路由名称
    component: LoginView
  },
  {
    path: '/register',
    name: 'RegisterView',  // 修改路由名称
    component: RegisterView
  },
  {
    path: '/posts',
    name: 'PostsList',  // 修改路由名称
    component: PostsList
  },
  {
    path: '/profile',
    name: 'ProfileView',  // 修改路由名称
    component: ProfileView,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router