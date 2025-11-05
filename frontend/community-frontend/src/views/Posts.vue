<template>
  <div class="posts-page">
    <div class="page-header">
      <h1>社区帖子</h1>
      <el-button
        type="primary"
        icon="Edit"
        @click="$router.push('/create-post')"
        v-if="isAuthenticated"
      >
        发布新帖
      </el-button>
    </div>

    <!-- 分类筛选器 -->
    <el-card class="filter-card">
      <el-row :gutter="10">
        <el-col :span="8" :xs="24">
          <el-select
            v-model="selectedCategory"
            placeholder="选择分类"
            clearable
            @change="handleCategoryChange"
          >
            <el-option
              v-for="category in categories"
              :key="category.id"
              :label="category.name"
              :value="category.id"
            />
          </el-select>
        </el-col>
        <el-col :span="8" :xs="24">
          <el-select
            v-model="sortBy"
            placeholder="排序方式"
          >
            <el-option label="最新发布" value="newest" />
            <el-option label="最多评论" value="most_comments" />
          </el-select>
        </el-col>
        <el-col :span="8" :xs="24">
          <el-input
            v-model="searchQuery"
            placeholder="搜索帖子..."
            @keyup.enter="handleSearch"
          >
            <template #append>
              <el-button icon="Search" @click="handleSearch" />
            </template>
          </el-input>
        </el-col>
      </el-row>
    </el-card>

    <!-- 帖子列表 -->
    <div class="posts-list">
      <el-card
        class="post-card"
        v-for="post in posts"
        :key="post.id"
      >
        <div class="post-header">
          <el-avatar :size="40">
            {{ post.author.username.charAt(0) }}
          </el-avatar>
          <div class="post-meta">
            <div class="author-info">
              <span class="author-name">{{ post.author.username }}</span>
              <span class="post-date">{{ formatDate(post.created_at) }}</span>
            </div>
            <el-tag v-if="post.category">{{ post.category.name }}</el-tag>
          </div>
        </div>

        <div class="post-content">
          <h3 class="post-title">
            <router-link :to="`/posts/${post.id}`">{{ post.title }}</router-link>
          </h3>
          <p class="post-excerpt">{{ post.content.substring(0, 150) }}...</p>
        </div>

        <div class="post-footer">
          <div class="post-stats">
            <span class="stat-item">
              <el-icon><View /></el-icon> {{ post.views }}
            </span>
            <span class="stat-item">
              <el-icon><ChatDotRound /></el-icon> {{ post.comments_count }}
            </span>
          </div>
          <el-button
            text
            size="small"
            @click="handleLike(post)"
            :class="{ liked: post.liked_by_user }"
          >
            <el-icon><Star /></el-icon>
            <span>{{ post.likes_count }}</span>
          </el-button>
        </div>
      </el-card>
    </div>

    <!-- 分页 -->
    <el-pagination
      class="pagination"
      @current-change="handlePageChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="totalPosts"
      layout="prev, pager, next"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
// 替换为 Element Plus 可用的图标
import { View, ChatDotRound, Star } from '@element-plus/icons-vue'

export default {
  name: 'PostsList',
  components: {
    View,  // 原 Eye 替换为 View
    ChatDotRound,
    Star   // 原 ThumbUp 替换为 Star
  },
  data() {
    return {
      selectedCategory: '',
      sortBy: 'newest',
      searchQuery: '',
      currentPage: 1,
      pageSize: 10,
      totalPosts: 0
    }
  },
  computed: {
    ...mapState(['posts', 'categories', 'isAuthenticated'])
  },
  created() {
    this.fetchCategories()
    this.fetchPosts()

    // 从URL获取搜索参数
    const { search, category } = this.$route.query
    if (search) this.searchQuery = search
    if (category) this.selectedCategory = category
  },
  methods: {
    ...mapActions(['fetchPosts', 'fetchCategories', 'likePost']),
    async fetchPosts() {
      try {
        const params = {
          page: this.currentPage,
          page_size: this.pageSize,
          ordering: this.sortBy === 'newest' ? '-created_at' : '-comments_count'
        }

        if (this.selectedCategory) params.category = this.selectedCategory
        if (this.searchQuery) params.search = this.searchQuery

        const response = await this.fetchPosts(params)
        this.totalPosts = response.count || this.posts.length
      } catch (error) {
        this.$message.error(error.error || '加载帖子失败')
      }
    },
    handleCategoryChange() {
      this.currentPage = 1
      this.fetchPosts()
    },
    handleSearch() {
      this.currentPage = 1
      this.fetchPosts()
    },
    handlePageChange(page) {
      this.currentPage = page
      this.fetchPosts()
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleString()
    },
    async handleLike(post) {
      if (!this.isAuthenticated) {
        this.$message.warning('请先登录')
        return
      }
      try {
        // 调用点赞API
        await this.likePost(post.id)
        post.liked_by_user = !post.liked_by_user
        post.likes_count += post.liked_by_user ? 1 : -1
      } catch (error) {
        this.$message.error(error.error || '操作失败')
      }
    }
  },
  watch: {
    '$route.query': {
      handler() {
        const { search, category } = this.$route.query
        this.searchQuery = search || ''
        this.selectedCategory = category || ''
        this.fetchPosts()
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
/* 样式保持不变 */
.posts-page {
  padding: 20px 0;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.filter-card {
  margin-bottom: 20px;
  padding: 15px;
}

.posts-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.post-card {
  transition: transform 0.2s, box-shadow 0.2s;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.post-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.post-meta {
  flex: 1;
}

.author-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.author-name {
  font-weight: bold;
  color: #303133;
}

.post-date {
  font-size: 12px;
  color: #909399;
}

.post-title {
  margin: 0 0 10px 0;
  font-size: 18px;
}

.post-title a {
  color: #303133;
  text-decoration: none;
}

.post-title a:hover {
  color: #409EFF;
}

.post-excerpt {
  color: #606266;
  margin: 0 0 15px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  border-top: 1px solid #f0f0f0;
}

.post-stats {
  display: flex;
  gap: 15px;
  color: #909399;
  font-size: 14px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.liked {
  color: #409EFF;
}

.pagination {
  text-align: center;
  margin-top: 30px;
}

@media (max-width: 768px) {
  .posts-list {
    grid-template-columns: 1fr;
  }

  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>