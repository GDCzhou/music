import request from '@/util/axios'


export interface BannerData {
  code:number,
  banners: {
    imageUrl:string
    targetId:number
    titleColor:string
    url:string,
    typeTitle: string
  }[]
}

export const getBanner = async ():Promise<BannerData> => {
  const res = await request({
    url: '/banner',
  })
  return res.data
}

export interface RecommendMusicData {
 result: Data[]
}

export interface Data {
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

export const getCommendMusic =async () => {
    const res = await request({
      url:'/personalized?limit=10',
    })
    return res.data
}


// 推荐歌单详情
export const getSonglistDetail =async (id:number|string) => {
  const res = await request({
    url: '/playlist/detail?id='+id
  })
  return res.data
} 