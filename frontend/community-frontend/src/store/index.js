import { createStore } from 'vuex'
import axios from 'axios'

// 配置 axios
axios.defaults.baseURL = 'http://localhost:8000/api'

const store = createStore({
  state() {
    return {
      token: localStorage.getItem('token') || null,
      user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
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
      localStorage.setItem('user', JSON.stringify(user))
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
      localStorage.removeItem('user')
      delete axios.defaults.headers.common['Authorization']
    }
  },
  
  actions: {
    // 认证相关
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('/auth/login/', credentials)
        const { token, user } = response.data
        
        // 验证响应数据完整性
        if (!token || !user) {
          throw new Error('登录响应数据不完整')
        }
        
        commit('setToken', token)
        commit('setUser', user)
        return { success: true, data: response.data }
      } catch (error) {
        // 标准化错误处理
        let errorMessage = '登录失败，请稍后重试'
        let errorCode = 'LOGIN_ERROR'
        
        if (error.response) {
          // 服务器返回错误
          errorMessage = error.response.data?.error || error.response.data?.message || errorMessage
          errorCode = error.response.data?.code || errorCode
        } else if (error.request) {
          // 网络错误（无响应）
          errorMessage = '网络连接失败，请检查网络'
          errorCode = 'NETWORK_ERROR'
        } else {
          // 其他错误（如数据验证失败）
          errorMessage = error.message || errorMessage
        }
        
        throw {
          success: false,
          code: errorCode,
          message: errorMessage
        }
      }
    },
    
    async register({ commit }, userData) {
      try {
        const response = await axios.post('/auth/register/', userData)
        const { token, user } = response.data
        
        // 验证响应数据完整性
        if (!token || !user) {
          throw new Error('注册响应数据不完整')
        }
        
        commit('setToken', token)
        commit('setUser', user)
        return { success: true, data: response.data }
      } catch (error) {
        // 标准化错误处理
        let errorMessage = '注册失败，请稍后重试'
        let errorCode = 'REGISTER_ERROR'
        
        if (error.response) {
          errorMessage = error.response.data?.error || error.response.data?.message || errorMessage
          errorCode = error.response.data?.code || errorCode
        } else if (error.request) {
          errorMessage = '网络连接失败，请检查网络'
          errorCode = 'NETWORK_ERROR'
        } else {
          errorMessage = error.message || errorMessage
        }
        
        throw {
          success: false,
          code: errorCode,
          message: errorMessage
        }
      }
    },
    
    async fetchProfile({ commit }) {
      try {
        const response = await axios.get('/auth/profile/')
        commit('setUser', response.data)
        return { success: true, data: response.data }
      } catch (error) {
        let errorMessage = '获取用户信息失败'
        let errorCode = 'FETCH_PROFILE_ERROR'
        
        if (error.response) {
          errorMessage = error.response.data?.error || error.response.data?.message || errorMessage
          errorCode = error.response.data?.code || errorCode
        } else if (error.request) {
          errorMessage = '网络连接失败，请检查网络'
          errorCode = 'NETWORK_ERROR'
        } else {
          errorMessage = error.message || errorMessage
        }
        
        throw {
          success: false,
          code: errorCode,
          message: errorMessage
        }
      }
    },
    
    // 帖子相关
    async fetchPosts({ commit }) {
      try {
        const response = await axios.get('/posts/')
        const posts = response.data.results || response.data
        commit('setPosts', posts)
        return { success: true, data: response.data }
      } catch (error) {
        let errorMessage = '加载帖子失败'
        let errorCode = 'FETCH_POSTS_ERROR'
        
        if (error.response) {
          errorMessage = error.response.data?.error || error.response.data?.message || errorMessage
          errorCode = error.response.data?.code || errorCode
        } else if (error.request) {
          errorMessage = '网络连接失败，请检查网络'
          errorCode = 'NETWORK_ERROR'
        } else {
          errorMessage = error.message || errorMessage
        }
        
        throw {
          success: false,
          code: errorCode,
          message: errorMessage
        }
      }
    },
    
    async createPost({ commit }, postData) {
      try {
        const response = await axios.post('/posts/', postData)
        commit('addPost', response.data)
        return { success: true, data: response.data }
      } catch (error) {
        let errorMessage = '创建帖子失败'
        let errorCode = 'CREATE_POST_ERROR'
        
        if (error.response) {
          errorMessage = error.response.data?.error || error.response.data?.message || errorMessage
          errorCode = error.response.data?.code || errorCode
        } else if (error.request) {
          errorMessage = '网络连接失败，请检查网络'
          errorCode = 'NETWORK_ERROR'
        } else {
          errorMessage = error.message || errorMessage
        }
        
        throw {
          success: false,
          code: errorCode,
          message: errorMessage
        }
      }
    },
    
    // 分类相关
    async fetchCategories({ commit }) {
      try {
        const response = await axios.get('/categories/')
        const categories = response.data.results || response.data
        commit('setCategories', categories)
        return { success: true, data: response.data }
      } catch (error) {
        let errorMessage = '加载分类失败'
        let errorCode = 'FETCH_CATEGORIES_ERROR'
        
        if (error.response) {
          errorMessage = error.response.data?.error || error.response.data?.message || errorMessage
          errorCode = error.response.data?.code || errorCode
        } else if (error.request) {
          errorMessage = '网络连接失败，请检查网络'
          errorCode = 'NETWORK_ERROR'
        } else {
          errorMessage = error.message || errorMessage
        }
        
        throw {
          success: false,
          code: errorCode,
          message: errorMessage
        }
      }
    },
    
    logout({ commit }) {
      commit('logout')
    }
  }
})

// 初始化时设置 token 和用户信息
const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
if (token && user) {
  axios.defaults.headers.common['Authorization'] = `Token ${token}`
}

export default store