import { createApp } from 'vue'
import router from './router'
import  store  from './store'
import './style.css'
import App from './App.vue'
import { Icon } from '@iconify/vue'
createApp(App)
.use(router)
.use(store)
.use(Icon)
.mount('#app')