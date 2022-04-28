<script lang="ts" setup>
import { getBanner } from '@/api/recommend'
import { onMounted, onUnmounted, reactive, ref } from 'vue'

import { BannerData } from '@/api/recommend'

const bannerData = ref<BannerData>({
  code: 0,
  banners: [{ imageUrl: '', targetId: 0, titleColor: '', url: '' ,typeTitle:''}],
})
const bannerTotal = ref<number>(0)
const left = ref<number>(0)
const right = ref<number>(2)
const mid = ref<number>(1)
const idx = ref<number>(0)
let timer = ref<any>(null)

onMounted(async () => {
  const res = await getBanner()
  bannerData.value = res
  console.log(bannerData.value)
  bannerTotal.value = res.banners.length
  auto()
})

onUnmounted(() => {
  clearInterval(timer.value)
})

function auto() {
  timer.value = setInterval(() => {
    left.value = (left.value + 1) % bannerTotal.value
    right.value = (right.value + 1) % bannerTotal.value
    mid.value = (mid.value + 1) % bannerTotal.value
    idx.value = (idx.value + 1) % bannerTotal.value
  }, 3000)
}
const mouseHandle = (index: number) => {
  left.value = index % bannerTotal.value
  right.value = (index + 2) % bannerTotal.value
  mid.value = (index + 1) % bannerTotal.value
  idx.value = index
}
const mouseEnterHandle = () => {
  clearInterval(timer.value)
}
const mouseLeaveHandle = () => {
  timer.value = setInterval(() => {
    left.value = (left.value + 1) % bannerTotal.value
    right.value = (right.value + 1) % bannerTotal.value
    mid.value = (mid.value + 1) % bannerTotal.value
    idx.value = (idx.value + 1) % bannerTotal.value
  }, 3000)
}
const handleClick = (index: number) => {
  console.log(index)

  console.log(bannerData.value.banners[index].imageUrl)
}
</script>
<template>
  <div
    class="bannerContainer"
    @mouseenter="mouseEnterHandle"
    @mouseleave="mouseLeaveHandle"
  >
    <div
      v-for="(item, index) in bannerData.banners"
      :key="item.targetId"
      :class="{
        bannerItem: true,
        left: index === left,
        right: right === index,
        mid: mid === index,
      }"
      @click="handleClick(index)"
    >
      <img :src="item.imageUrl" />
      <div class="typeTitle">{{item.typeTitle}}</div>
    </div>
    <ul class="indicator">
      <li
        v-for="(item, index) in bannerData.banners"
        :key="item.targetId"
        :class="{ indicatorItem: true, isActive: index === idx }"
        @mouseenter="mouseHandle(index)"
      ></li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.bannerContainer {
  position: relative;
  height: 200px;
  width: 100%;
  .bannerItem {
    height: 100%;
    position: absolute;
    transition: all 1s;
    left: 50%;
    transform: translate(-50%);
    z-index: 0;
    border-radius: 10px;
    img {
      height: 100%;
      width: 100%;
       border-radius: 10px;
    }
    .typeTitle {
      position: absolute;
      bottom: 0px;
      right: 0px;
      background-color: #fd5c5c;
      color: #fff;
      border-top-left-radius: 5px;
      border-bottom-right-radius: 5px;
      font-size: 12px;
      padding: 2px 5px;
    }
  }
  .left {
    left: 0;
    transform: scale(0.9);
  }
  .right {
    right: 0;
    transform: scale(0.9);
  }
  .mid {
    left: 50%;
    z-index: 2;
    transform: scale(1) translateX(-50%);
  }
  .indicator {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
    z-index: 3;
    .indicatorItem {
      flex: 1;
      background-color: #fff;
      width: 8px;
      height: 8px;
      border-radius: 4px;
    }
    .isActive {
      background-color: #fd5c5c;
    }
  }
}
</style>
