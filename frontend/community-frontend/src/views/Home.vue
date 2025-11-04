<template>
  <div class="home">
    <el-card class="welcome-card">
      <template #header>
        <div class="card-header">
          <h2>欢迎来到社区平台</h2>
        </div>
      </template>
      
      <p>这是一个基于 Vue 3 + Django 的社区平台演示项目</p>
      <p>功能包括：用户注册登录、帖子发布、评论系统等</p>
      
      <div class="features">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-card shadow="hover">
              <template #header>
                <div class="feature-header">
                  <el-icon><User /></el-icon>
                  <span>用户管理</span>
                </div>
              </template>
              <p>完整的用户注册、登录、个人信息管理功能</p>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover">
              <template #header>
                <div class="feature-header">
                  <el-icon><Document /></el-icon>
                  <span>帖子系统</span>
                </div>
              </template>
              <p>发布、浏览、搜索社区帖子</p>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover">
              <template #header>
                <div class="feature-header">
                  <el-icon><ChatDotRound /></el-icon>
                  <span>评论互动</span>
                </div>
              </template>
              <p>对帖子进行评论和回复</p>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import { User, Document, ChatDotRound } from '@element-plus/icons-vue'

export default {
  name: 'HomeView',  // 修改为多单词名称
  components: {
    User, Document, ChatDotRound
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
}

.welcome-card {
  max-width: 1200px;
  margin: 0 auto;
}

.features {
  margin-top: 30px;
}

.feature-header {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>