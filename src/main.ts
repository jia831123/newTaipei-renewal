import '@unocss/reset/normalize.css'
import './assets/main.css'
import 'virtual:uno.css'
import './style/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'leaflet/dist/leaflet.css'
import 'leaflet.locatecontrol' // Import plugin
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css' // Import styles
import router from './router'

const app = createApp(App)
app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.mount('#app')
