import request from "@/util/axios"

export interface Music {
  url: string
  id: number
  size: number
  type: string
}

export const geiMusicUrl =async (id:number):Promise<Music[]> => {
 const res =await request({
    url:'/song/url?id=' + id
  })
  return res.data.data
}