<script lang="ts" setup>
import { useStore } from '@/store/store';
import { formateMusicTime} from '@/util/util';

import { onMounted, ref } from 'vue'


const imgClick = () => {
  console.log(111)
}

const musicInfo = useStore()

const isPlay = ref<boolean>(false)

const audioRef = ref<HTMLAudioElement | null>(null)
const volum = ref<number>(50)
const duration = ref<number>(0)
const currentTime = ref<number>(0)
const progress = ref<number>(0)
// 播放控制
const play = () => {
  if (!isPlay.value) {
    audioRef.value?.play()
    console.log('play');
  } else {
    audioRef.value?.pause()
    console.log('pause');
  }
  isPlay.value = !isPlay.value
}

//音量控制
const volumChange = (value:number) =>{
  console.log(value);
  volum.value = value;
  (audioRef.value as HTMLAudioElement).volume = volum.value/100
}

//进度条联动
const progressChange = (value:number) => {
  console.log(value);
  (audioRef.value as HTMLAudioElement).currentTime = (value / 100) * duration.value
}
onMounted(()=>{

})

//获取总时长
const canplayHandle = () => {
  duration.value = (audioRef.value as HTMLAudioElement).duration
}

//持续播放
const timeupdateHandle = () => {
  currentTime.value =  (audioRef.value as HTMLAudioElement).currentTime
  progress.value = (currentTime.value / duration.value) * 100
}

//播放结束
const endedHandle = () => {
  currentTime.value = 0
  progress.value = 0
  //todo
}

</script>
<template>
  <div class="footer">
    <div class="footer-left">
      <div class="img" @click="imgClick">
        <img :src="musicInfo.img" />
        <div class="img-bg">
          <span class="iconfont icon-arrow-up-bold"></span>
        </div>
      </div>
      <div>
        <span class="song-title">{{musicInfo.songTitle}}&nbsp;</span
        ><span class="iconfont icon-xiai"></span>
        <p class="singer">{{musicInfo.songer}}</p>
      </div>
    </div>
    <div class="footer-mid">
      <div class="mode">
        <span class="iconfont icon-hanhan-01-01"></span>
      </div>
      <div class="top"><span class="iconfont icon-shangyishou"></span></div>
      <div class="play">
        <span
          :class="[!isPlay ? 'icon-bofang':  'icon-zanting' , { iconfont: true }]"
          @click="play"
        ></span>
      </div>
      <div class="next"><span class="iconfont icon-xiayishou"></span></div>
      <div class="lyrics">词</div>
      <div class="progress">
        <el-progress
          :percentage="progress"
          text-inside
          :show-text="false"
          :indeterminate="false"
          :duration="10"
          :stroke-width="4"

        />
        <el-slider v-model="progress" :show-tooltip="false"  @change="progressChange"/>
        <span class="p-left">{{formateMusicTime(currentTime)}}</span>
        <span class="p-right">{{formateMusicTime(duration)}}</span>
      </div>
    </div>
    <div class="footer-right">
      <div class="volume">
        <span class="iconfont icon-24gl-volumeZero"></span>
        <div class="slider">
          <el-slider v-model="volum" :show-tooltip="false" vertical @change="volumChange"/>
        </div>
      </div>
      <div><span class="iconfont icon-shouqicaidan"></span></div>
    </div>
    <audio :src="musicInfo.url" autoplay ref="audioRef" @canplay="canplayHandle" @timeupdate="timeupdateHandle" @ended="endedHandle"></audio>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  .footer-left {
    display: flex;
    gap: 10px;
    align-items: center;
    .img {
      height: 50px;
      width: 50px;
      border-radius: 5px;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      &:hover {
        .img-bg {
          display: block;
        }
      }
      img {
        width: 100%;
        height: 100%;
      }
      .img-bg {
        width: 100%;
        height: 100%;
        background: rgba($color: #000000, $alpha: 0.5);
        position: absolute;
        left: 0;
        top: 0;

        text-align: center;
        color: #fff;
        cursor: pointer;
        display: none;
        .icon-arrow-up-bold {
          font-size: 30px;
          line-height: 50px;
        }
      }
    }
    .song-title {
      font-size: 16px;
    }
    .singer {
      font-size: 14px;
    }
  }
  .footer-mid {
    position: relative;
    display: flex;
    gap: 40px;
    align-items: center;
    justify-content: center;
    .iconfont {
      font-size: 20px;
      cursor: pointer;
      &:hover {
        color: $red;
      }
    }
    .lyrics {
      cursor: pointer;
      &:hover {
        color: $red;
      }
    }
    .el-slider {
      position: absolute;
      width: 400px;
      bottom: -14px;
      left: 50%;
      transform: translateX(-50%);
      display: none;
    }
    .progress {
      position: absolute;
      width: 400px;
      bottom: -12px;
      left: 50%;
      transform: translateX(-50%);
      &:hover {
        .el-slider {
          display: flex;
        }
      }
      .p-left,.p-right {
        position: absolute;
        font-size: 12px;
        bottom: -7px;
      }
      .p-left {
        left: 0;
        transform: translateX(-140%);
      }
      .p-right {
        right: 0;
        transform: translateX(140%);
      }
    }
  }
  .footer-right {
    display: flex;
    align-items: center;
    gap: 20px;
    .iconfont {
      font-size: 30px;
      cursor: pointer;
    }
    .volume {
      position: relative;
      &:hover {
        .slider {
          display: flex;
        }
      }
      .slider {
        position: absolute;
        height: 100px;
        padding: 16px 3px;
        background-color: #fff;
        bottom: 30px;
        border-radius: 5px;
        left: -12px;
        display: none;
        box-shadow: 0px 0px 5px 2px #888888;
        z-index: 6;
      }
    }
  }
}
</style>
