<template>
  <div class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>关于社区</h3>
        <p>这是一个基于Vue 3和Django构建的社区平台，旨在提供一个友好的交流环境。</p>
      </div>

      <div class="footer-section">
        <h3>快速链接</h3>
        <ul>
          <li><router-link to="/">首页</router-link></li>
          <li><router-link to="/posts">帖子</router-link></li>
          <li><router-link to="/about">关于我们</router-link></li>
        </ul>
      </div>

      <div class="footer-section">
        <h3>联系我们</h3>
        <p>邮箱: contact@example.com</p>
      </div>
    </div>

    <div class="copyright">
      © {{ new Date().getFullYear() }} 社区平台 - 毕业设计演示
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>

<style scoped>
.footer {
  background-color: #f5f7fa;
  color: #606266;
}

.footer-content {
  display: flex;
  justify-content: space-around;
  padding: 30px 0;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-section h3 {
  color: #303133;
  font-size: 16px;
  margin-bottom: 15px;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section li {
  margin-bottom: 8px;
}

.footer-section a {
  color: #606266;
  text-decoration: none;
}

.footer-section a:hover {
  color: #409EFF;
  text-decoration: underline;
}

.copyright {
  text-align: center;
  padding: 15px 0;
  border-top: 1px solid #e4e7ed;
  font-size: 14px;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    padding: 20px;
    gap: 20px;
  }
}
</style>