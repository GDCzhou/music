<script lang="ts" setup>
import { getSonglistDetail } from '@/api/recommend'
import type { TabsPaneContext } from 'element-plus'

import { computed, onMounted, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { formateNum, formatTime } from '@/util/util'

import { useStore, usePlayState, usePlaylist, MusicInfo } from '@/store/store'
import { ElMessage } from 'element-plus'
interface Data {
  id: number
  description: string
  name: string
  tags: string[]
  trackCount: number
  tracks: MusicInfo[]
  playCount: number
  coverImgUrl: string
  createTime: number
  creator: {
    avatarUrl: string
    nickname: string
  }
}

const useState = useStore()
const playState = usePlayState()
const playlist = usePlaylist()
const route = useRoute()
const id = ref()
const data = ref<Data | null>(null)
const isloading = ref<boolean>(true)
onMounted(() => {
  const params = route.params
  if (params.id) {
    id.value = params.id
  }
})

const getSonlistData = async (id: string) => {
  const res = await getSonglistDetail(id)
  data.value = res.playlist
  isloading.value = false
}
const formateStr = computed(() => {
  return data.value?.tags.reduce((pre, cur) => {
    return pre + ' / ' + cur
  })
})
watchEffect(() => {
  if (id.value === undefined) return
  getSonlistData(id.value)
})

const activeName = ref('first')
const tabHandleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
const dbClickHandle = async (row: any) => {
  useState.getURL(row.id)
  useState.setMusicInfo(row.id, row.al.picUrl, row.al.name, row.ar[0].name)
  playState.$patch({ isplay: true })
  playlist.setPlaylist(data.value?.tracks as MusicInfo[])
}
</script>
<template>
  <el-skeleton animated v-show="isloading">
    <template #template>
        <div class="container">
          <el-skeleton-item
            variant="rect"
            style="width: 200px; height: 200px"
          />
          <el-skeleton
            :rows="5"
            variant="caption"
            style="flex:1"
          ></el-skeleton>
        </div>
    </template>
  </el-skeleton>
  <div v-show="!isloading">
    <div class="detail">
      <div class="avatar">
        <img :src="data?.coverImgUrl" />
      </div>
      <div class="right">
        <div class="title">
          <div>歌单</div>
          <h2>{{ data?.name }}</h2>
        </div>
        <div class="userInfo">
          <img :src="data?.creator.avatarUrl" />
          <span class="nickname">{{ data?.creator.nickname }}</span>
          <span>{{ new Date(data?.createTime).toLocaleDateString() }}创建</span>
        </div>
        <div class="operation">
          <el-button type="danger" round>播放全部</el-button>
        </div>
        <div class="tags">
          <p>标签: {{ formateStr }}</p>
        </div>
        <div class="playCount">
          <p>
            <span>歌曲数: {{ data?.trackCount }}</span
            >&nbsp;
            <span>播放数: {{ formateNum(data?.playCount) }}</span>
          </p>
        </div>
        <div class="dsc">
          <p>{{ data?.description }}</p>
        </div>
      </div>
    </div>
    <div class="list">
      <el-tabs v-model="activeName" @tab-click="tabHandleClick">
        <el-tab-pane label="歌曲列表" name="first">
          <el-table
            :data="data?.tracks"
            stripe
            style="width: 100%; font-size: 12px"
            @row-dblclick="dbClickHandle"
          >
            <el-table-column type="index" width="50" />
            <el-table-column prop="name" label="音乐标题" />
            <el-table-column prop="ar[0].name" label="歌手" width="180" />
            <el-table-column prop="al.name" label="专辑" />
            <el-table-column label="时长" width="150">
              <template v-slot="scope">
                {{ formatTime(scope.row.dt) }}
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="评论" name="second">评论</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.detail {
  display: flex;
  gap: 25px;
  .avatar {
    flex: 1;
    img {
      width: 100%;
      border-radius: 10px;
    }
  }
  .right {
    flex: 5;
    font-size: 12px;
    .operation {
      margin: 20px 0;
    }
    .title {
      display: flex;
      align-items: center;
      div {
        border: 1px solid #ef6a6a;
        border-radius: 3px;
        margin-right: 5px;
        color: #ef6a6a;
        padding: 0px 5px;
      }
    }
    .playCount {
      margin: 10px 0;
    }
    .userInfo {
      display: flex;
      align-items: center;
      gap: 5px;
      margin: 10px 0;
      line-height: 20px;
      .nickname {
        font-size: 14px;
        color: skyblue;
      }
      img {
        width: 25px;
        height: 25px;
        border-radius: 50%;
      }
    }
  }
}
.list ::v-deep .el-tabs__item.is-active {
  color: #ef6a6a !important;
}
.list ::v-deep .el-tabs__active-bar.is-top {
  background-color: #ef6a6a !important;
}
</style>
