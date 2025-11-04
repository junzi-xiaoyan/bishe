<template>
  <div class="profile-container">
    <el-card>
      <template #header>
        <h2>个人中心</h2>
      </template>
      
      <div v-if="user" class="profile-content">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-card shadow="hover">
              <template #header>
                <h3>基本信息</h3>
              </template>
              
              <div class="user-info">
                <div class="avatar-section">
                  <el-avatar :size="100" :src="user.avatar" />
                </div>
                
                <div class="info-list">
                  <div class="info-item">
                    <span class="label">用户名:</span>
                    <span class="value">{{ user.username }}</span>
                  </div>
                  
                  <div class="info-item">
                    <span class="label">邮箱:</span>
                    <span class="value">{{ user.email }}</span>
                  </div>
                  
                  <div class="info-item" v-if="user.bio">
                    <span class="label">个人简介:</span>
                    <span class="value">{{ user.bio }}</span>
                  </div>
                  
                  <div class="info-item" v-if="user.location">
                    <span class="label">所在地:</span>
                    <span class="value">{{ user.location }}</span>
                  </div>
                  
                  <div class="info-item">
                    <span class="label">注册时间:</span>
                    <span class="value">{{ formatDate(user.created_at) }}</span>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
          
          <el-col :span="16">
            <el-card shadow="hover">
              <template #header>
                <h3>我的帖子</h3>
              </template>
              
              <div v-if="userPosts.length === 0" class="empty-posts">
                <el-empty description="您还没有发布过帖子" />
                <el-button type="primary" @click="$router.push('/posts')">
                  去发布帖子
                </el-button>
              </div>
              
              <div v-else class="user-posts">
                <el-card 
                  v-for="post in userPosts" 
                  :key="post.id" 
                  class="user-post-item" 
                  shadow="hover"
                >
                  <template #header>
                    <div class="post-header">
                      <h4>{{ post.title }}</h4>
                      <span class="post-date">{{ formatDate(post.created_at) }}</span>
                    </div>
                  </template>
                  
                  <div class="post-excerpt">
                    {{ post.content.substring(0, 100) }}...
                  </div>
                </el-card>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      
      <div v-else class="loading">
        <el-skeleton :rows="3" animated />
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ProfileView',  // 修改为多单词名称
  data() {
    return {
      loading: false,
      userPosts: []
    }
  },
  computed: {
    ...mapState(['user', 'posts'])
  },
  async mounted() {
    await this.loadUserProfile()
    this.filterUserPosts()
  },
  methods: {
    ...mapActions(['fetchProfile', 'fetchPosts']),
    
    async loadUserProfile() {
      this.loading = true
      try {
        await this.fetchProfile()
        await this.fetchPosts()
      } catch (error) {
        this.$message.error('加载用户信息失败')
      } finally {
        this.loading = false
      }
    },
    
    filterUserPosts() {
      if (this.user && this.posts) {
        this.userPosts = this.posts.filter(post => post.author?.id === this.user.id)
      }
    },
    
    formatDate(dateString) {
      return new Date(dateString).toLocaleString()
    }
  },
  watch: {
    posts() {
      this.filterUserPosts()
    }
  }
}
</script>

<style scoped>
.profile-container {
  padding: 20px;
}

.profile-content {
  margin-top: 20px;
}

.user-info {
  text-align: center;
}

.avatar-section {
  margin-bottom: 20px;
}

.info-list {
  text-align: left;
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.label {
  font-weight: bold;
  color: #606266;
}

.value {
  color: #909399;
}

.empty-posts {
  text-align: center;
  padding: 40px 0;
}

.user-posts {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.user-post-item {
  margin-bottom: 12px;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-header h4 {
  margin: 0;
  color: #409EFF;
}

.post-date {
  font-size: 12px;
  color: #909399;
}

.post-excerpt {
  color: #606266;
  line-height: 1.5;
}

.loading {
  padding: 40px 0;
}
</style>