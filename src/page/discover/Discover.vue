<script lang="ts" setup>
interface DiscoverRoute {
  path: string
  name: string
}
const discover: DiscoverRoute[] = [
  {
    path: '/discover/recommend',
    name: '个性推荐',
  },
  {
    path: '/discover/customizes',
    name: '专属定制',
  },
  {
    path: '/discover/playlist',
    name: '歌单',
  },
  {
    path: '/discover/leaderboard',
    name: '排行耪',
  },
  {
    path: '/discover/songer',
    name: '歌手',
  },
  {
    path: '/discover/latestmusic',
    name: '最新音乐',
  },
]
</script>
<template>
  <el-menu router 
  mode="horizontal" 
  default-active="/discover/recommend"
  class="horizontal-menu" >
    <el-menu-item :index="item.path" v-for="item in discover">
      {{ item.name }}
    </el-menu-item>
  </el-menu>
  <router-view></router-view>
</template>

<style lang="scss" scoped>
.horizontal-menu.el-menu--horizonta > .el-menu-item.is-active {
  bottom: 1px solid #ea5555 !important;
  color: #000 !important;
}

.el-menu-item.is-active {
  color: #000 !important;
}
.horizontal-menu {
  position: sticky;
  top: 0;
  z-index: 9;
  border-bottom: 0;
}
</style>
