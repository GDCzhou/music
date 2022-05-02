import { defineStore } from 'pinia'
// interface MusicState {
//   url: string
//   isPlay: boolean
//   isEnd: boolean
// }

const url="http://m7.music.126.net/20220502065146/4ffb18502331275f545cf02f4c0c1b93/ymusic/060f/0f09/0e5d/1e3ca94c1d8cbb9c603d97293ff626d3.mp3"
interface MusicUrl {
  url: string
  img:string
  songTitle: string
  songer:string
}
export const useStore = defineStore('musicUrl',{
  state: ():MusicUrl => {
    return {
      url: url,
      img: 'https://cdn.jsdelivr.net/gh/crazybox521/blogImg/music.jpg',
      songTitle: '未知音乐',
      songer: '未知歌手'
    }
  },
  actions: {
    setMusicURL(url:string) {
      this.url = url
   }
  }
})

export const useHistory = defineStore('musicHistory',{
  state:() => {
    return {

    }
  }
})