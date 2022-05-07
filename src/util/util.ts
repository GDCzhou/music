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
  interval = Math.floor(interval || 0) / 1000
  const minute = formatNum(Math.floor(interval / 60))
  const second = formatNum(Math.floor(interval % 60))
  return `${minute}:${second}`
}

export const formateMusicTime = (time: number): string => {
  let minutes:string|number = Math.floor(time / 60)  // 获取时长分钟
  let seconds:string|number = Math.floor(time % 60) // 获取时长秒数
  seconds = seconds < 10 ? '0' + seconds : seconds // 秒
  minutes = minutes < 10 ? '0' + minutes : minutes
  return minutes + ':' + seconds
}

export function getRandomIntInclusive(min:number, max:number):number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
}

export function getLocalStorage(key:string) {
  return JSON.parse(window.localStorage.getItem(key) as string)
}

export function SetLocalStorage(key:string,value:any) {
  return window.localStorage.setItem(key,JSON.stringify(value))
}

export function shuffle(arr:any[]) {
  var len = arr.length;
  for (var i = 0; i < len - 1; i++) {
   // @ts-ignore
      var index = parseInt(Math.random() * (len - i));
      var temp = arr[index];
      arr[index] = arr[len - i - 1];
      arr[len - i - 1] = temp;
  }
  return arr;
}