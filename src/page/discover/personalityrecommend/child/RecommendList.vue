<script lang="ts" setup>
import { getCommendMusic } from '@/api/recommend'
import PlayList from '@/components/playlist/PlayList.vue'
import { onMounted, reactive, ref } from 'vue'

interface Data {
  alg: string
  canDislike: boolean
  copywriter: string
  highQuality: boolean
  id: number
  name: string
  picUrl: string
  playCount: number
  trackCount: number
  trackNumberUpdateTime: number
  type: number
}
let playlistData = ref<Data[]>([])
let list = reactive(playlistData)


onMounted(async () => {
  const res = await getCommendMusic()
  playlistData.value = res.result
})
</script>
<template>
  <div>

      <suspense>
        <template #default>
          <PlayList :listData="list"> 推荐歌单> </PlayList>
        </template>
        <template #fallback>
          <el-skeleton :throttle="500"></el-skeleton>
        </template>
      </suspense>
  </div>
</template>

<style lang="scss" scoped></style>
