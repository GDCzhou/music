const Recommend = () =>
  import('@/page/discover/personalityrecommend/Recommend.vue')
const Customizes = () => import('@/discover/Customizes/Customizes.vue')
const LatestMusic = () => import('@/page/discover/LatestMusic/LatestMusic.vue')
const Playlist = () => import('@/page/discover/Playlist/Playlist.vue')
const Leaderboard = () => import('@/page/discover/Leaderboard/Leaderboard.vue')
const Singer = () => import('@/page/discover/Singer/Singer.vue')

const discoverRoute = [
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
