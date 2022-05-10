<script lang="ts" setup>
import {
  useStore,
  usePlayState,
  useOpenPlaylist,
  usePlaylist,
  useplaymode,
} from '@/store/store'
import { formateMusicTime, formatTime, useClickOutside } from '@/util/util'
import { ElMessage } from 'element-plus'
import {
  computed,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  Ref,
  ref,
  watch,
  watchEffect,
} from 'vue'
//
const imgClick = () => {
  console.log(111)
}

const playmode = useplaymode()
const musicInfo = useStore()
const playState = usePlayState()
const openPlaylist = useOpenPlaylist()
const playlist = usePlaylist()
const audioRef = ref<HTMLAudioElement | null>(null)
const volum = ref<number>(50)
const duration = ref<number>(0)
const currentTime = ref<number>(0)
const progress = ref<number>(0)
const isloading = ref<boolean>(false)
// 播放控制
const play = () => {
  try {
    if (!isloading.value) return ElMessage.error('播放错误')
    if (!playState.isplay) {
      audioRef.value?.play()
      ElMessage({
        message: '正在播放',

        type: 'success',
      })
    } else {
      audioRef.value?.pause()
    }
  } catch (error) {
    ElMessage.error('播放错误')
  }

  playState.$patch({ isplay: !playState.isplay })
}

//音量控制
const volumChange = (value: number) => {
  volum.value = value
  ;(audioRef.value as HTMLAudioElement).volume = volum.value / 100
}

//进度条联动
const progressChange = (value: number) => {
  ;(audioRef.value as HTMLAudioElement).currentTime =
    (value / 100) * duration.value
}
onMounted(() => {})

//获取总时长
const canplayHandle = () => {
  isloading.value = true
  duration.value = (audioRef.value as HTMLAudioElement).duration
}

//持续播放
const timeupdateHandle = () => {
  if (!audioRef.value) return
  currentTime.value = (audioRef.value as HTMLAudioElement).currentTime
  if (duration.value > 0) {
    progress.value = (currentTime.value / duration.value) * 100
  }
}

// 下一首
const next = () => {
  musicInfo.next()
}
// 上一首
const previous = () => {
  musicInfo.previous()
}
//切换模式
const switchMode = () => {
  playmode.setMode()
}
const modeClass = computed(() => {
  const mode = {
    random: 'icon-suijisenlin',
    singleLoops: 'icon-hanhan-01-01',
    playSequentially: 'icon-hanhan-01-011',
    listLoops: 'icon-liebiaoxunhuan',
  }
  const key = playmode.mode
  return mode[key]
})

const autoPlay = () => {
  currentTime.value = 0
  progress.value = 0
  isloading.value = false
  playState.$patch({ isplay: false })
  musicInfo.next()
  //todo 实现不同播放模式下一首
  // musicInfo.autoNext()
}

// onMounted(() => {
//   setInterval(() => {
//     console.log(audioRef.value?.readyState)
//   }, 100)
// })
// onBeforeUnmount(() => {
//   audioRef.value?.pause()
//   playState.$patch({ isplay: false })
//   console.log('123')
// })

watch(playState, (playState) => {
  console.log(playState.isplay, '---watch')
})
watchEffect(() => {
  console.log(audioRef.value?.readyState)
})

const isopen = ref<boolean>(false)
const openRef = ref<HTMLElement | null>(null)
const clist = ref<HTMLElement | null>(null)
//打开播放列表
const openPlaylistEvent = () => {
  // openPlaylist.$patch({ openPlaylist: !openPlaylist.openPlaylist })
  console.log(isopen.value)

  isopen.value = !isopen.value
}

useClickOutside(clist as Ref<HTMLElement>, openRef  as Ref<HTMLElement>, () => {
  console.log('side')
  isopen.value = false
})
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
        <span class="song-title">{{ musicInfo.songTitle }}&nbsp;</span
        ><span class="iconfont icon-xiai"></span>
        <p class="singer">{{ musicInfo.songer }}</p>
      </div>
    </div>
    <div class="footer-mid">
      <div class="mode" @click="switchMode">
        <span :class="[modeClass, { iconfont: true }]"></span>
      </div>
      <div class="top" @click="previous">
        <span class="iconfont icon-shangyishou"></span>
      </div>
      <div class="play">
        <span
          :class="[
            !playState.isplay ? 'icon-bofang' : 'icon-zanting',
            { iconfont: true },
          ]"
          @click="play"
        ></span>
      </div>
      <div class="next" @click="next">
        <span class="iconfont icon-xiayishou"></span>
      </div>
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
        <el-slider
          v-model="progress"
          :show-tooltip="false"
          @change="progressChange"
        />
        <span class="p-left">{{ formateMusicTime(currentTime) }}</span>
        <span class="p-right">{{ formateMusicTime(duration) }}</span>
      </div>
    </div>
    <div class="footer-right">
      <div class="volume">
        <span class="iconfont icon-24gl-volumeZero"></span>
        <div class="slider">
          <el-slider
            v-model="volum"
            :show-tooltip="false"
            vertical
            @change="volumChange"
          />
        </div>
      </div>
      <div @click="openPlaylistEvent" ref="openRef">
        <span class="iconfont icon-shouqicaidan"></span>
      </div>
    </div>
    <audio
      :src="musicInfo.url"
      ref="audioRef"
      @canplay="canplayHandle"
      @timeupdate="timeupdateHandle"
      @ended="autoPlay"
      autoplay
    ></audio>
  </div>

  <div
    class="currentPlaylist"
    :style="{ width: isopen ? '380px' : '0' }"
    ref="clist"
  >
    <div class="list-dec">
      <h2>当前播放列表</h2>
      <div>
        <span class="total">共{{ playlist.playlist.length }}首</span>
      </div>
    </div>
    <el-table
      stripe
      :data="playlist.playlist"
      style="width: 100%"
      v-if="playlist.playlist.length > 0"
      height="calc(100% - 60px)"
    >
      <el-table-column type="index" width="50" />
      <el-table-column prop="al.name" />
      <el-table-column prop="ar[0].name" />
      <el-table-column>
        <template v-slot="scope">
          {{ formatTime(scope.row.dt) }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  height: 100%;
  // display: flex;
  // align-items: center;
  // justify-content: space-between;
  position: relative;
  .footer-left {
    display: flex;
    gap: 10px;
    align-items: center;
    position: absolute;
    left: 0;
    height: 100%;
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
    position: absolute;
    left: 50%;
    height: 100%;
    transform: translateX(-50%);
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
      bottom: -13px;
      left: 50%;
      transform: translateX(-50%);
      display: none;
    }
    .progress {
      position: absolute;
      width: 400px;
      bottom: 18px;
      left: 50%;
      transform: translateX(-50%);
      &:hover {
        .el-slider {
          display: flex;
        }
      }
      .p-left,
      .p-right {
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
    position: absolute;
    right: 0;
    height: 100%;
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

.open-p-l {
  height: 80%;
}
.currentPlaylist {
  position: fixed;
  transition: all 0.2s;
  right: 0;
  height: calc(100% - 160px);
  top: 80px;
  z-index: 5;
  overflow: hidden;
  // background-color: pink;
  .list-dec {
    height: 60px;
  }
  .total {
    font-size: 12px;
  }
}
</style>
