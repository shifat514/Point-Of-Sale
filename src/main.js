import { createApp } from 'vue'
import router from './router'
import  store  from './store'
import App from './App.vue'
import './assets/input.css'
import { Icon } from '@iconify/vue';
createApp(App)
.use(router)
.use(store)
.use(Icon)
.mount('#app')
