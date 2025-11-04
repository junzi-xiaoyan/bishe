import { createStore } from 'vuex'
import axios from 'axios'

// 配置 axios
axios.defaults.baseURL = 'http://localhost:8000/api'

const store = createStore({
  state() {
    return {
      token: localStorage.getItem('token') || null,
      user: null,
      isAuthenticated: !!localStorage.getItem('token'),
      posts: [],
      categories: [],
      currentPost: null
    }
  },
  
  mutations: {
    setToken(state, token) {
      state.token = token
      state.isAuthenticated = true
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Token ${token}`
    },
    
    setUser(state, user) {
      state.user = user
    },
    
    setPosts(state, posts) {
      state.posts = posts
    },
    
    setCategories(state, categories) {
      state.categories = categories
    },
    
    setCurrentPost(state, post) {
      state.currentPost = post
    },
    
    addPost(state, post) {
      state.posts.unshift(post)
    },
    
    logout(state) {
      state.token = null
      state.user = null
      state.isAuthenticated = false
      state.posts = []
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    }
  },
  
  actions: {
    // 认证相关
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('/auth/login/', credentials)
        commit('setToken', response.data.token)
        commit('setUser', response.data.user)
        return response.data
      } catch (error) {
        throw error.response?.data || { error: '登录失败' }
      }
    },
    
    async register({ commit }, userData) {
      try {
        const response = await axios.post('/auth/register/', userData)
        commit('setToken', response.data.token)
        commit('setUser', response.data.user)
        return response.data
      } catch (error) {
        throw error.response?.data || { error: '注册失败' }
      }
    },
    
    async fetchProfile({ commit }) {
      try {
        const response = await axios.get('/auth/profile/')
        commit('setUser', response.data)
        return response.data
      } catch (error) {
        throw error.response?.data || { error: '获取用户信息失败' }
      }
    },
    
    // 帖子相关
    async fetchPosts({ commit }) {
      try {
        const response = await axios.get('/posts/')
        commit('setPosts', response.data.results || response.data)
        return response.data
      } catch (error) {
        throw error.response?.data || { error: '加载帖子失败' }
      }
    },
    
    async createPost({ commit }, postData) {
      try {
        const response = await axios.post('/posts/', postData)
        commit('addPost', response.data)
        return response.data
      } catch (error) {
        throw error.response?.data || { error: '创建帖子失败' }
      }
    },
    
    // 分类相关
    async fetchCategories({ commit }) {
      try {
        const response = await axios.get('/categories/')
        commit('setCategories', response.data.results || response.data)
        return response.data
      } catch (error) {
        throw error.response?.data || { error: '加载分类失败' }
      }
    },
    
    logout({ commit }) {
      commit('logout')
    }
  }
})

// 初始化时设置 token
const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Token ${token}`
}

export default store