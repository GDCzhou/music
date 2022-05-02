<script lang='ts' setup>
  import { onMounted, ref } from 'vue';

  const progressRef = ref(null)
  const w = ref<number>(50)
  onMounted(() => {
    console.log(progressRef.value);
    
  })
  const mouseDown = (e:MouseEvent) =>{

  }

  const dot = (num:number) => {
    if (num <=5) {
      return {left: 0,right: 'auto'}
    }else {
      return {left: 'auto',right: 0}
    }

  }
</script>
<template>
  <div class="progress" @mousedown="mouseDown" ref="progressRef">
    <div class="progress-wrapper" :style="{width:  w===0?0: w+'px'}">
      <div class="dot" :style="dot(w)"></div>
    </div>
    <div class="progress-wrapper1" :style="{width: w===0?0: w+'px'}"></div>
    <div class="progress-wrapper2"></div>
    <span class="left">00:00</span>
    <span class="right">00:00</span>
  </div>
</template>

<style lang='scss' scoped>
.progress {
  width: 300px;
  height: 4px;
  background-color: #ccc;
  position: relative;
  &:hover {
     .progress-wrapper, .progress-wrapper2 {
       display: block;
     }
  }
}
.progress-wrapper, .progress-wrapper1,.progress-wrapper2{
  position: absolute;
  height: 200%;
  background-color: $red;
  width: 100px;
  top: 50%;
  transform: translateY(-50%);
  }
  .progress-wrapper1 {
    width: 100px;
    height: 100%;
    z-index: 1;
  }
  .progress-wrapper {
    display: none;
    z-index: 2;
    border-radius: 4px;
      .dot {
        height: 10px;
        width: 10px;
        border-radius: 4px;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        background-color: $red;
      }
  }
  .progress-wrapper2 {
    width: 100%;
    height: 200%;
    background-color: #ccc;
    display: none;
  }

  .left,.right {
    position: absolute;
    left: 0;
    top:50%;
    transform: translate(-110%,-50%);
  }
  .right {
    left: auto;
    right: 0;
        transform: translate(110%,-50%);
  }
</style>