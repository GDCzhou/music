<script lang='ts' setup>
import Banner from './child/Banner.vue';
import RecommendList from './child/RecommendList.vue';

</script>
<template>
  <el-menu>

  </el-menu>
  <Banner />
  <RecommendList class="list"></RecommendList>
</template>

<style lang='scss' scoped>
.list {
  padding: 0 25px;
}
</style>