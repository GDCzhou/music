import { geiMusicUrl } from '@/api/music'
import {
  getLocalStorage,
  getRandomIntInclusive,
  SetLocalStorage,
} from '@/util/util'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'

const url =
  'http://m7.music.126.net/20220502065146/4ffb18502331275f545cf02f4c0c1b93/ymusic/060f/0f09/0e5d/1e3ca94c1d8cbb9c603d97293ff626d3.mp3'
interface MusicUrl {
  id: number
  url: string
  img: string
  songTitle: string
  songer: string
}

const LD = JSON.parse(window.localStorage.getItem('music') as string)

const initMusic = ref<MusicUrl>({
  id: 0,
  url: url,
  img: 'https://cdn.jsdelivr.net/gh/crazybox521/blogImg/music.jpg',
  songTitle: '未知音乐',
  songer: '未知歌手',
})

export const useStore = defineStore('musicUrl', {
  state: () => {
    return getLocalStorage('music') || initMusic
  },
  actions: {
    setMusicInfo(id: number, img: string, songTitle: string, songer: string) {
      this.id = id
      this.img = img
      this.songTitle = songTitle
      this.songer = songer
    },

    next() {
      const playlist = usePlaylist()
      const playmode = useplaymode()
      if (playlist.playlist.length < 1) return
      let currentIndex = playlist.playlist.findIndex(
        (item: { id: any }) => item.id === this.id
      )
      let currentMusic
      if (playmode.mode === 'random') {
        currentIndex = getRandomIntInclusive(0, playlist.playlist.length - 1)
      } else if (currentIndex === playlist.playlist.length - 1) {
        currentIndex = 0
      } else {
        currentIndex += 1
      }
      currentMusic = playlist.playlist[currentIndex]
      this.id = currentMusic.id
      this.img = currentMusic.al.picUrl
      this.songTitle = currentMusic.name
      this.songer = currentMusic.ar.name
      this.getURL(currentMusic.id)
      console.log(this.$state)

      SetLocalStorage('music', this.$state)
    },
    previous() {
      const playlist = usePlaylist()
      if (playlist.playlist.length < 1) return
      let currentIndex = playlist.playlist.findIndex(
        (item: { id: any }) => item.id === this.id
      )
      let currentMusic
      if (currentIndex > -1 && currentIndex > 0) {
        currentIndex -= 1
      } else if (currentIndex > -1 && currentIndex === 0) {
        currentIndex = playlist.playlist.length - 1
      }
      currentMusic = playlist.playlist[currentIndex]
      this.id = currentMusic.id
      this.img = currentMusic.al.picUrl
      this.songTitle = currentMusic.name
      this.songer = currentMusic.ar.name
      this.getURL(currentMusic.id)
    },
    autoNext() {
      //todo
    },
    async getURL(id: number) {
      const playstate = usePlayState()
      try {
        const res = await geiMusicUrl(id)
        const url = res[0].url
        this.url = url
        playstate.$patch({ isplay: true })
        ElMessage({
          message: '正在播放',
          type: 'success',
        })
      } catch (error) {
        playstate.$patch({ isplay: false })
        ElMessage({
          message: '音乐不能播放',
        })
      }
    },
  },
})

const isplay = ref<boolean>(false)

export const usePlayState = defineStore('playstate', {
  state: () => {
    return {
      isplay: isplay,
    }
  },
})
export interface MusicInfo {
  name: string //歌名
  id: number
  ar: {
    id: number
    name: string //歌手
  }
  al: {
    id: number
    picUrl: string //图片
    name: string //专辑
  }
}

const playlist = ref<MusicInfo[] | []>([])
export const usePlaylist = defineStore('playlist', {
  state: () => {
    return { playlist:getLocalStorage('playlist') || playlist }
  },
  actions: {
    setPlaylist(list: MusicInfo[]) {
      SetLocalStorage('playlist',list)
      return (this.playlist = list)
    },
  },
})

const openPlaylist = ref<boolean>(false)
export const useOpenPlaylist = defineStore('openPlaylist', {
  state: () => {
    return { openPlaylist }
  },
})

type Mode = 'random' | 'singleLoops' | 'playSequentially' | 'listLoops'

interface PlayMode {
  mode: Ref<Mode>
}

const mode = ref<Mode>('random')
export const useplaymode = defineStore('playmode', {
  state: (): PlayMode => {
    return { mode: getLocalStorage('mode')|| mode }
  },
  actions: {
    setMode() {
      const modeList: Mode[] = [
        'random',
        'singleLoops',
        'playSequentially',
        'listLoops',
      ]
      this.mode = modeList[(modeList.indexOf(this.mode) + 1) % modeList.length]
      SetLocalStorage('mode',this.mode)
      console.log(this.mode)
    },
  },
})

export const useHistory = defineStore('musicHistory', {
  state: () => {
    return {}
  },
})
