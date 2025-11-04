<template>
  <div class="header">
    <div class="logo">
      <h2>社区平台 - 毕业设计演示</h2>
    </div>
    <div class="nav">
      <router-link to="/">首页</router-link>
      <router-link to="/posts">帖子</router-link>
      <router-link to="/login" v-if="!isAuthenticated">登录</router-link>
      <router-link to="/register" v-if="!isAuthenticated">注册</router-link>
      <router-link to="/profile" v-if="isAuthenticated">个人中心</router-link>
      <a href="#" @click="logout" v-if="isAuthenticated">退出</a>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'HeaderComponent',
  computed: {
    ...mapState(['isAuthenticated'])
  },
  methods: {
    ...mapActions(['logout'])
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.logo h2 {
  margin: 0;
  color: white;
}

.nav a {
  color: white;
  text-decoration: none;
  margin-left: 20px;
}

.nav a:hover {
  text-decoration: underline;
}
</style>