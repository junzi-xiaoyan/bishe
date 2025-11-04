<template>
  <div class="register-container">
    <el-card class="register-card">
      <template #header>
        <div class="card-header">
          <h2>用户注册</h2>
        </div>
      </template>
      
      <el-form :model="registerForm" :rules="rules" ref="registerFormRef">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerForm.email" placeholder="请输入邮箱地址"></el-input>
        </el-form-item>
        
        <el-form-item label="密码" prop="password">
          <el-input 
            v-model="registerForm.password" 
            type="password" 
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        
        <el-form-item label="确认密码" prop="password_confirm">
          <el-input 
            v-model="registerForm.password_confirm" 
            type="password" 
            placeholder="请再次输入密码"
            show-password
          ></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="handleRegister" :loading="loading">
            注册
          </el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
      
      <div class="register-links">
        <router-link to="/login">已有账号？立即登录</router-link>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'RegisterView',  // 修改为多单词名称
  data() {
    const validatePassConfirm = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    
    return {
      registerForm: {
        username: '',
        email: '',
        password: '',
        password_confirm: ''
      },
      loading: false,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度不能少于 6 个字符', trigger: 'blur' }
        ],
        password_confirm: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { validator: validatePassConfirm, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['register']),
    
    async handleRegister() {
      try {
        this.loading = true
        await this.$refs.registerFormRef.validate()
        await this.register(this.registerForm)
        this.$message.success('注册成功！')
        this.$router.push('/')
      } catch (error) {
        this.$message.error(error.error || '注册失败，请稍后重试')
      } finally {
        this.loading = false
      }
    },
    
    resetForm() {
      this.$refs.registerFormRef.resetFields()
    }
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: 20px;
}

.register-card {
  width: 400px;
}

.card-header {
  text-align: center;
}

.register-links {
  text-align: center;
  margin-top: 20px;
}
</style>