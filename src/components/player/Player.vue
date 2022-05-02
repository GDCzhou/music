<script lang='ts' setup>
import { ref } from 'vue';

  const props = defineProps<{
    url:string
  }>()

  const audioRef = ref<HTMLAudioElement|null>(null)
  // 播放开始
  const play = () => {
    audioRef.value?.play()
  }
  // 播放暂停
  const pause = () => {
    audioRef.value?.pause()
  }

</script>
<template>
  <audio :src="props.url" ref="audioRef" :style="{visibility:'hidden'}"></audio>
</template>

<style lang='scss' scoped>
</style>