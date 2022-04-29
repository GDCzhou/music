<script lang="ts" setup>
import { Data } from '@/api/recommend'
import { formateNum } from '@/util/util';
import { computed } from 'vue';

import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
  data: Data
}>()


const handleClick = (id: number) => {
  router.push({ path: '/songlist', name: 'songlist', params: { id } })
}
</script>
<template>
  <div class="listItem" @click="handleClick(props.data.id)">
    <div class="playcount">{{ formateNum(props.data.playCount)}}</div>
    <div class="top">
      <img :src="props.data.picUrl" alt="" />
    </div>
    <div class="bottom">
      <p>{{ props.data.name }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.listItem {
  width: calc(20% - 20px);
  margin: 0 10px 20px 0px;
  position: relative;
  cursor: pointer;
  .playcount {
    position: absolute;
    right: 5px;
    top: 5px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.955);
  }
  .top {
    width: 100%;

    img {
      width: 100%;
      border-radius: 10px;
    }
  }
  &:nth-child(5n) {
    margin-right: 0;
  }
}
</style>
