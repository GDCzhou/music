<script setup lang="ts"></script>

<template>
  <el-container class="layout">
    <el-container>
      <el-aside class="aside">
        <div class="login">点击登录</div>
        <el-menu router>
          <el-menu-item index="/recommend"> 推荐 </el-menu-item>
          <el-menu-item index="/video"> 视频 </el-menu-item>
          <el-menu-item index="/HIFI"> HIFI发烧音乐 </el-menu-item>
          <!-- <el-menu-item index="/recommend"> 推荐 </el-menu-item> -->
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header">header</el-header>
        <el-main class="main"><router-view></router-view></el-main>
      </el-container>
    </el-container>
    <el-footer class="footer">footer</el-footer>
  </el-container>
</template>

<style lang="scss" scope>
.login {
  height: 70px;
  line-height: 70px;
  text-align: center;
  cursor: pointer;
}
.header {
  background-color: #fcfcfc;
}
.aside {
  background-color: #f4f4f4;
}
.footer {
  background-color: #101121;
  color: #fff;
}
.main {
  height: calc(100vh - 160px);
  overflow: scroll;
  overflow-x:hidden;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none;
}
  ::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>
