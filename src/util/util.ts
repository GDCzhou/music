


export function formateNum(num: number) {
  if (num > 0 && num < 10000) {
    return num
  }
  if (num >= 10000 && num < 100000000) {
    return (num / 10000).toFixed(0) + '万'
  } else {
    return (num / 100000000).toFixed(0) + '亿'
  }
}

export const formatNum = (num: number | string, n = 2) => {
  let len = num.toString().length

  while (len < n) {
    num = '0' + num
    len++
  }

  return num
}

export const formatTime = (interval?: number) => {
  interval = Math.floor(interval || 0) /1000
  const minute = formatNum(Math.floor((interval / 60)))
  const second = formatNum(Math.floor(interval % 60))
  return `${minute}:${second}`
}
