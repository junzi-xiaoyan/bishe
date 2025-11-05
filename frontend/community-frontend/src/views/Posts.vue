<template>
  <div class="posts-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <h2>帖子列表</h2>
          <el-button
            v-if="isAuthenticated"
            type="primary"
            @click="showCreateDialog = true"
          >
            发布新帖子
          </el-button>
        </div>
      </template>

      <div v-if="loading" class="loading">
        <el-skeleton :rows="5" animated />
      </div>

      <div v-else-if="posts.length === 0" class="empty">
        <el-empty description="暂无帖子" />
      </div>

      <div v-else class="posts-list">
        <el-card
          v-for="post in posts"
          :key="post.id"
          class="post-item"
          shadow="hover"
        >
          <template #header>
            <div class="post-header">
              <h3>{{ post.title }}</h3>
              <span class="post-meta">
                作者: {{ post.author?.username }} |
                分类: {{ post.category?.name }} |
                {{ formatDate(post.created_at) }}
              </span>
            </div>
          </template>

          <div class="post-content">
            {{ post.content }}
          </div>

          <div class="post-actions">
            <el-button type="text">查看详情</el-button>
            <el-button type="text">评论</el-button>
          </div>
        </el-card>
      </div>
    </el-card>

    <!-- 发布帖子对话框 -->
    <el-dialog v-model="showCreateDialog" title="发布新帖子" width="600px">
      <el-form :model="newPost" :rules="postRules" ref="postFormRef">
        <el-form-item label="标题" prop="title">
          <el-input v-model="newPost.title" placeholder="请输入帖子标题"></el-input>
        </el-form-item>

        <el-form-item label="分类" prop="category_id">
          <el-select v-model="newPost.category_id" placeholder="请选择分类" style="width: 100%">
            <el-option
              v-for="category in categories"
              :key="category.id"
              :label="category.name"
              :value="category.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <el-input
            v-model="newPost.content"
            type="textarea"
            :rows="6"
            placeholder="请输入帖子内容"
          ></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="showCreateDialog = false">取消</el-button>
        <el-button type="primary" @click="handleCreatePost" :loading="creating">
          发布
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PostsList',  // 修改为多单词名称
  data() {
    return {
      loading: false,
      showCreateDialog: false,
      creating: false,
      newPost: {
        title: '',
        category_id: null,
        content: ''
      },
      postRules: {
        title: [
          { required: true, message: '请输入帖子标题', trigger: 'blur' }
        ],
        category_id: [
          { required: true, message: '请选择分类', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入帖子内容', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState(['isAuthenticated', 'posts', 'categories'])
  },
  async mounted() {
    await this.loadPosts()
    await this.loadCategories()
  },
  methods: {
    ...mapActions(['fetchPosts', 'fetchCategories', 'createPost']),

    async loadPosts() {
      this.loading = true
      try {
        await this.fetchPosts()
      } catch (error) {
        this.$message.error('加载帖子失败')
      } finally {
        this.loading = false
      }
    },

    async loadCategories() {
      try {
        await this.fetchCategories()
      } catch (error) {
        // 静默失败，不影响主要功能
      }
    },

    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString()
    },

    async handleCreatePost() {
      try {
        await this.$refs.postFormRef.validate()
        this.creating = true
        await this.createPost(this.newPost)
        this.$message.success('帖子发布成功！')
        this.showCreateDialog = false
        this.resetPostForm()
      } catch (error) {
        this.$message.error(error.error || '发布失败')
      } finally {
        this.creating = false
      }
    },

    resetPostForm() {
      this.newPost = {
        title: '',
        category_id: null,
        content: ''
      }
    }
  }
}
</script>

<style scoped>
.posts-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.post-item {
  margin-bottom: 16px;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.post-header h3 {
  margin: 0;
  color: #409EFF;
}

.post-meta {
  font-size: 12px;
  color: #909399;
  white-space: nowrap;
}

.post-content {
  color: #606266;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-actions {
  margin-top: 12px;
  text-align: right;
}

.loading, .empty {
  padding: 40px 0;
  text-align: center;
}
</style>