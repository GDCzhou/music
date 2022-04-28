<script setup lang="ts"></script>

<template>
  <el-container class="layout">
    <el-container>
      <el-aside class="aside">
        <div>点击登录</div>
        <el-menu> </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header">header</el-header>
        <el-main class="main">main</el-main>
      </el-container>
    </el-container>
    <el-footer class="footer">footer</el-footer>
  </el-container>
</template>

<style lang="scss" scope>
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
</style>
