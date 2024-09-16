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
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import router from './router'
import { useUserStore } from './service/stores/user'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(ElementPlus)
app.use(pinia)
app.use(router)

app.mount('#app')
useUserStore()
