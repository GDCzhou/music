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
