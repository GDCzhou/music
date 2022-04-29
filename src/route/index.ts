import { createRouter, createWebHashHistory } from 'vue-router'

const Recommend = () => import('@/page/recommend/Recommend.vue')
const Video = () => import('@/page/video/Video.vue')
const Songlist = () => import('@/components/songlist/Songlist.vue')
const routes = [
  { path: '/', redirect: '/recommend' },
  { path: '/recommend', component: Recommend },
  { path: '/video', component: Video },
  { path: '/songlist/:id', component: Songlist,name:'songlist' },
]

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

export default router
