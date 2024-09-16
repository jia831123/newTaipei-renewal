<template>
  <div id="map" :class="$attrs"></div>
</template>
<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue'
import * as L from 'leaflet'
import usePolygon from '../../composables/usePolygon'
import usePoint from '../../composables/usePoint'
import { watch } from 'vue'
import aimSvg from '@/assets/aim.svg'
import { type Response as UrbanRenewalResponse } from '@/service/api/useUrbanRenewal'
import { useUserStore } from '@/service/stores/user'
import { useLoading } from '@/hook/useLoading'

function getLocation(): Promise<{ latitude: number; longitude: number }> {
  return new Promise((resolve, rej) => {
    console.log('getLocation')
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('getLocation successfully')
          const { latitude, longitude } = position.coords
          return resolve({ latitude, longitude })
        },
        (error) => {
          // 錯誤回調
          console.error('Error Code:', error.code)
          console.error('Error Message:', error.message)
          rej('get location failed')
        },
        { timeout: 5000 }
      )
    } else {
      return resolve({
        latitude: 51.505,
        longitude: -0.09
      })
    }
  })
}
const map = shallowRef()
const location = ref({ latitude: 0, longitude: 0 })
const { getLoading } = useLoading()
const emit = defineEmits<{
  (e: 'update:pointData', d: UrbanRenewalResponse): void
}>()
const handleLocateButtonClick = () => {
  map.value.locate()
}
const user = useUserStore()
const init = async () => {
  const loading = getLoading()
  location.value = await getLocation().catch((e) => ({
    latitude: 25.03746,
    longitude: 121.564558
  }))
  map.value = L.map('map').setView([location.value.latitude, location.value.longitude], 13)
  L.tileLayer('https://wmts.nlsc.gov.tw/wmts/EMAP/default/GoogleMapsCompatible/{z}/{y}/{x}', {
    maxNativeZoom: 20,
    maxZoom: 20
  }).addTo(map.value)
  map.value.attributionControl.addAttribution(
    `<img style="cursor: pointer" id="attribution-image" width="50" height="50" src="${aimSvg}"/>`
  )
  setTimeout(() => {
    const imgElement = document.getElementById('attribution-image')
    if (imgElement) {
      imgElement.addEventListener('click', handleLocateButtonClick)
    }
    loading.close()
  }, 0)
  map.value.on('locationfound', (e: { latlng: [number, number] }) => {
    const customPopupHtml = `
      <div>
        <p>你在這裡</p>
      </div>
      <div style="display:flex;justify-content:center">
        <img width="50" height="50" src="${user.googlePeople?.photos[0]?.url}"/>  
        <img width="50" height="50"  src="${user.facebookPeople?.picture.data.url}"/>  
      </div>
    `
    L.marker(e.latlng).addTo(map.value).bindPopup(customPopupHtml).openPopup()
  })
  // Handle location found event
  //lMap.on('locationfound', function (e) {})
}
onMounted(init)
const { data: polygonData } = usePolygon(map)
const { data: pointData } = usePoint(map, location)
watch(
  () => pointData.value,
  (data) => {
    if (data) emit('update:pointData', data)
  }
)
defineExpose({
  setView: (center: [number, number], zoom?: number) => {
    map.value?.setView(center, zoom)
  }
})
</script>
<style scoped>
#map {
  height: 500px;
}
#list {
  flex-grow: 1;
}
</style>
