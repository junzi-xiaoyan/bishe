<template>
  <div id="app">
    <el-container class="app-container">
      <!-- 顶部导航 -->
      <el-header class="app-header">
        <HeaderComponent />
      </el-header>

      <!-- 主内容区 -->
      <el-container class="app-main-container">
        <!-- 侧边栏 - 仅在大屏幕显示 -->
        <el-aside class="app-aside" :width="240">
          <SidebarComponent />
        </el-aside>

        <!-- 主内容 -->
        <el-main class="app-content">
          <router-view />
        </el-main>
      </el-container>

      <!-- 页脚 -->
      <el-footer class="app-footer">
        <FooterComponent />
      </el-footer>
    </el-container>
  </div>
</template>

<style>
#app {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: #409EFF;
  color: white;
  padding: 0 20px;
  height: 60px !important;
  line-height: 60px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.app-main-container {
  display: flex;
  flex: 1;
}

.app-aside {
  background-color: #f5f7fa;
  border-right: 1px solid #e4e7ed;
  transition: all 0.3s ease;
}

.app-content {
  flex: 1;
  padding: 20px;
  max-width: calc(100vw - 240px);
  margin: 0 auto;
  width: 100%;
  max-width: 1400px;
}

.app-footer {
  text-align: center;
  padding: 20px 0;
  color: #606266;
  border-top: 1px solid #e4e7ed;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .app-aside {
    display: none;
  }
  .app-content {
    max-width: 100vw;
    padding: 10px;
  }
}
</style>