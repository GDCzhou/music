

import { createRouter, createWebHashHistory } from 'vue-router'


const Video = () => import('@/page/video/Video.vue')
const Songlist = () => import('@/components/songlist/Songlist.vue')
const Layout = () => import('@/components/layout/Layout.vue')
const App = () => import('@/App.vue')

const Recommend = () =>
  import('@/page/discover/personalityrecommend/Recommend.vue')
const Customizes = () => import('@/page/discover/Customizes/Customizes.vue')
const LatestMusic = () => import('@/page/discover/LatestMusic/LatestMusic.vue')
const Playlist = () => import('@/page/discover/Playlist/Playlist.vue')
const Leaderboard = () => import('@/page/discover/Leaderboard/Leaderboard.vue')
const Singer = () => import('@/page/discover/Singer/Singer.vue')
const Discover = ()=> import('@/page/discover/Discover.vue')

const discoverRoute = [
  { path: 'recommend', name: 'recommend', component: Recommend },
  {
    path: 'customizes',
    name: 'customizes',
    component: Customizes,
  },
  {
    path: 'playlist',
    name: 'playlist',
    component: Playlist,
  },
  {
    path: 'leaderboard',
    name: 'leaderboard',
    component: Leaderboard,
  },
  {
    path: 'songer',
    name: 'songer',
    component: Singer,
  },
  {
    path: 'latestmusic',
    name: 'latestmusic',
    component: LatestMusic,
  },
]


const routes = [
  {
    path: '/',
    redirect: '/discover',
    component: App,
    children: [
      {
        path: '/home',
        redirect: '/discover',
        component: Layout,
        children: [
          {
            path: '/discover/',
            redirect: '/discover/recommend',
            component: Discover,
            children:  discoverRoute,
          },
  
          {
            path: '/video',
            component: Video,
            name: 'video',
          },
          {
            path: '/songlist/:id',
            name: 'songlist',
            component: Songlist
          }
        ],
      },
    ],
  },
]

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

export default router
