<template>
  <div class="header">
    <div class="logo">
      <router-link to="/">
        <h2>社区平台</h2>
      </router-link>
    </div>

    <div class="search-bar">
      <el-input
        v-model="searchQuery"
        placeholder="搜索帖子..."
        class="search-input"
        @keyup.enter="handleSearch"
      >
        <template #append>
          <el-button icon="Search" @click="handleSearch" />
        </template>
      </el-input>
    </div>

    <div class="nav">
      <router-link to="/" class="nav-link">首页</router-link>
      <router-link to="/posts" class="nav-link">帖子</router-link>

      <template v-if="!isAuthenticated">
        <router-link to="/login" class="nav-link">登录</router-link>
        <router-link to="/register" class="nav-link primary-btn">注册</router-link>
      </template>

      <template v-if="isAuthenticated">
        <router-link to="/create-post" class="nav-link primary-btn">发布</router-link>
        <router-link to="/profile" class="nav-link">
          <el-avatar :size="32" class="user-avatar">
            {{ user?.username?.charAt(0) || 'U' }}
          </el-avatar>
        </router-link>
        <a href="#" @click="logout" class="nav-link">退出</a>
      </template>

      <!-- 移动端菜单按钮 -->
      <el-button
        icon="Menu"
        class="mobile-menu-btn"
        @click="showMobileMenu = !showMobileMenu"
      />
    </div>

    <!-- 移动端菜单 -->
    <el-drawer
      v-model="showMobileMenu"
      direction="right"
      :width="240"
    >
      <MobileMenuComponent @close="showMobileMenu = false" />
    </el-drawer>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MobileMenuComponent from './MobileMenuComponent.vue'

export default {
  name: 'HeaderComponent',
  components: {
    MobileMenuComponent
  },
  data() {
    return {
      searchQuery: '',
      showMobileMenu: false
    }
  },
  computed: {
    ...mapState(['isAuthenticated', 'user'])
  },
  methods: {
    ...mapActions(['logout']),
    handleSearch() {
      if (this.searchQuery.trim()) {
        this.$router.push({
          path: '/posts',
          query: { search: this.searchQuery.trim() }
        })
      }
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 100%;
}

.logo h2 {
  margin: 0;
  color: white;
}

.logo a {
  text-decoration: none;
}

.search-bar {
  flex: 1;
  max-width: 600px;
  margin: 0 20px;
}

.search-input {
  width: 100%;
}

.nav {
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  text-decoration: none;
}

.primary-btn {
  background-color: white;
  color: #409EFF;
}

.primary-btn:hover {
  background-color: #f0f0f0;
}

.user-avatar {
  vertical-align: middle;
}

.mobile-menu-btn {
  display: none;
  color: white;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .search-bar {
    display: none;
  }

  .mobile-menu-btn {
    display: block;
  }

  .nav-link:not(.primary-btn) {
    display: none;
  }
}
</style>