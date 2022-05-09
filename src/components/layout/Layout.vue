<script lang="ts" setup>
import { useRouter } from 'vue-router'
import Footer from './footer/Footer.vue'

const router = useRouter()
const back = () => {
  router.go(-1)
}
const go = () => {
  router.go(+1)
}
</script>
<template>
  <el-container class="layout">
    <el-container>
      <el-aside class="aside">
        <div class="login" @click="$router.push('/login')">点击登录</div>
        <el-menu router>
          <el-menu-item index="/discover/recommend"> 推荐 </el-menu-item>
          <el-menu-item index="/video"> 视频 </el-menu-item>
          <el-menu-item index="/HIFI"> HIFI发烧音乐 </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header">
          <div class="history-c">
            <span @click="back">&lt</span> <span @click="go">></span>
          </div>
        </el-header>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <el-footer class="footer">
      <Footer />
    </el-footer>
  </el-container>
</template>

<style lang="scss" scoped>
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

.main {
  height: calc(100vh - 160px);
  overflow: scroll;
  overflow-x: hidden;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none;
  padding-top: 0;
}
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.history-c {
  font-size: 30px;
  span {
    cursor: pointer;
    position: relative;
    &::before {
      font-size: 12px;
      width: 40px;
      content: '后退';
      position: absolute;
      top: 0;
      left: 0;
      display: none;
    }
    &:last-child::before {
      content: '前进';
    }
    &:hover {
      &::before {
        display: block;
      }
    }
  }
}
</style>
