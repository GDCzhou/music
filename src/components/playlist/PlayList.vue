<script lang="ts" setup>
import { Data } from '@/api/recommend'
import ListItem from './ListItem.vue'
const props = defineProps<{
  listData: Data[]
}>()


</script>
<template>
  <div>
    <div class="nav">
      <h2><slot></slot></h2>
    </div>
    <div class="playlist">
      <!-- {{props.listData}} -->
      <ListItem v-for="item in props.listData" :data="item" :key="item.id"></ListItem>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.playlist {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
