<template>
  <div id="app">
    <el-container>
      <el-header>
        <HeaderComponent />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue'

export default {
  name: 'App',
  components: {
    HeaderComponent
  }
}
</script>

<style>
#app {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', Arial, sans-serif;
  min-height: 100vh;
}

.el-header {
  background-color: #409EFF;
  color: white;
  line-height: 60px;
  padding: 0;
}

.el-main {
  padding: 0;
  min-height: calc(100vh - 60px);
}
</style>