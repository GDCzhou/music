/* 二维码登录 */

import request from '@/util/axios'

// 获取二维码key
export interface Key {
  unikey: string
  code: number
}

export const getQrKey = async (): Promise<Key> => {
  const res = await request({
    url: '/login/qr/key',
    params: {
      timestamp: Date.now(),
    },
  })
  return res.data.data
}
// 生成二维码Base 64
interface Imgsrc {
  qrimg: string
  qrurl: string
}
export const createQr = async (key: Key, qrimg = true): Promise<Imgsrc> => {
  const res = await request({
    url: '/login/qr/create',
    params: { key: key.unikey, qrimg, timestamp: Date.now() },
  })
  return res.data.data
}

export interface QrState {
  code: number
  message: string
  cookie: string
}
// 轮询二维码状态 800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)
export const checkQr = async (key: Key):Promise<QrState> => {
  const res = await request({
    url: '/login/qr/check',
    params: { key: key.unikey, timestamp: Date.now() },
  })
  return res.data
}
