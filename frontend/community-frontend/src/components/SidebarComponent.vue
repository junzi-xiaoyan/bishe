<template>
  <div class="sidebar">
    <div class="sidebar-menu">
      <h3 class="menu-title">社区导航</h3>
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @select="handleSelect"
      >
        <el-menu-item index="1">
          <el-icon><Home /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><Document /></el-icon>
          <span>全部帖子</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><Folder /></el-icon>
          <span>分类浏览</span>
        </el-menu-item>
        <el-menu-item index="4" v-if="isAuthenticated">
          <el-icon><User /></el-icon>
          <span>个人中心</span>
        </el-menu-item>
      </el-menu>
    </div>

    <div class="sidebar-categories" v-if="categories.length">
      <h3 class="menu-title">帖子分类</h3>
      <el-list>
        <el-list-item
          v-for="category in categories"
          :key="category.id"
          class="category-item"
        >
          <router-link :to="`/posts?category=${category.id}`">
            {{ category.name }}
          </router-link>
        </el-list-item>
      </el-list>
    </div>
  </div>
</template>

<script>
import { Home, Document, Folder, User } from '@element-plus/icons-vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'SidebarComponent',
  components: {
    Home, Document, Folder, User
  },
  computed: {
    ...mapState(['categories', 'isAuthenticated'])
  },
  created() {
    this.fetchCategories()
  },
  methods: {
    ...mapActions(['fetchCategories']),
    handleSelect(key) {
      const routeMap = {
        '1': '/',
        '2': '/posts',
        '4': '/profile'
      }
      if (routeMap[key]) {
        this.$router.push(routeMap[key])
      }
    }
  }
}
</script>

<style scoped>
.sidebar {
  padding-top: 20px;
}

.menu-title {
  padding: 0 20px 10px;
  font-size: 14px;
  color: #606266;
  border-bottom: 1px solid #e4e7ed;
  margin-bottom: 10px;
}

.el-menu-vertical-demo {
  border-right: none;
}

.sidebar-categories {
  margin-top: 20px;
}

.category-item a {
  color: #606266;
  text-decoration: none;
}

.category-item a:hover {
  color: #409EFF;
}
</style>