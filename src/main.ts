import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import 'element-plus/es/components/message/style/css'

import '@/assets/css/index.scss'
import router from './route/index'

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.mount('#app')
