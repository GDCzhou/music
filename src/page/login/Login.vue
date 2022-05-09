<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { getQrKey, createQr, checkQr, Key, QrState } from '@/api/login'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()

const _getQrkey = async () => {
  const key = await getQrKey()
  if (key.code !== 200) return ElMessage.error('获取二维码失败')
  ElMessage.success('获取二维码成功')
  keys.value = key
  _createQr(keys.value)
}
const _createQr = async (key: Key) => {
  const imgurl = await createQr(key)
  imgsrc.value = imgurl.qrimg
  _checkQr(key)
}
const _checkQr = async (key: Key) => {
  const res = await checkQr(key)
  state.value = res
  if (res.code === 801 || res.code === 802) {
    timer.value = window.setTimeout(() => {
      _checkQr(key)
    }, 5000)
  } else if (res.code === 803) {
    ElMessage.success('登录成功')
    router.push('/')
  }
}

onMounted(() => {
  _getQrkey()
})

onUnmounted(() => {
  clearTimeout(timer.value)
})
const imgsrc = ref<string>('')
const keys = ref<Key>()
const state = ref<QrState>()
const timer = ref<any>(null)
</script>
<template>
  <div class="login">
    <div class="loginFrom">
      <h2>二维码登录</h2>
      <div class="img">
        <img :src="imgsrc" alt="" />
        <div class="refresh" v-show="state?.code === 800" @click="_getQrkey">
          <span class="iconfont icon-refresh"></span>
        </div>
      </div>

      <div class="state">{{ state?.message }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url('../../assets/img/bg.jpg') no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  .loginFrom {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    padding: 100px;
    background: rgba($color: #fff, $alpha: 0.7);
    .img {
      position: relative;
      margin: 20px 0;
      img {
        width: 100%;
        height: 100%;
      }
      .refresh {
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background: rgba($color: #000, $alpha: 0.7);
        span {
          color: red;
          font-size: 60px;
        }
      }
    }
  }
}
</style>
