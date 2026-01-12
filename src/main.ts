import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/router'
import { createPinia } from 'pinia'
import axiosService from './utils/axiosService'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(createPinia())
// app.config.globalProperties.$axios = axiosService
app.use(axiosService)
app.mount('#app')
