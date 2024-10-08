<template>
  <div id="map" :class="$attrs"></div>
</template>
<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue'
import * as L from 'leaflet'
import usePolygon from './composables/usePolygon'
import usePoint from './composables/usePoint'
import { watch } from 'vue'
import aimSvg from '@/assets/aim.svg'
import { type Response as UrbanRenewalResponse } from '@/service/api/useUrbanRenewal'
import { useUserStore } from '@/service/stores/user'
import { useLoading } from '@/hook/useLoading'
import { getDefaultLeafletIcon } from '@/utils'

const user = useUserStore()
const map = shallowRef<InstanceType<typeof L.Map>>()
const location = ref({ latitude: 0, longitude: 0 })
const { getLoading } = useLoading()
const { init: polygonInit } = usePolygon(map)
const { init: pointInit, data: pointData } = usePoint(map)
const emit = defineEmits<{
  (e: 'update:pointData', d: UrbanRenewalResponse): void
}>()
const getLocation = (): Promise<{ latitude: number; longitude: number }> => {
  return new Promise((resolve, rej) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          return resolve({ latitude, longitude })
        },
        (error) => {
          console.error('Error Code:', error.code)
          console.error('Error Message:', error.message)
          rej('get location failed')
        },
        { timeout: 5000 }
      )
    } else {
      return resolve({
        latitude: 25.03746,
        longitude: 121.56455
      })
    }
  })
}
const handleLocateButtonClick = () => {
  if (!map.value) return
  const data = map.value.locate({ setView: true }).getCenter() as {
    lat: 24.9551822
    lng: 121.3486246
  }
  location.value = {
    latitude: data.lat,
    longitude: data.lng
  }
}

const init = async () => {
  const loading = getLoading()
  //1.get Location info
  location.value = await getLocation().catch((e) => ({
    latitude: 25.03746,
    longitude: 121.564558
  }))

  //2.init map
  map.value = L.map('map').setView([location.value.latitude, location.value.longitude], 13)
  L.tileLayer('https://wmts.nlsc.gov.tw/wmts/EMAP/default/GoogleMapsCompatible/{z}/{y}/{x}', {
    maxNativeZoom: 20,
    maxZoom: 20
  }).addTo(map.value)

  //3.add locate icon
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
  map.value.on('locationfound', (e) => {
    if (!map.value) return
    const customPopupHtml = `
      <div>
        <p>你在這裡</p>
      </div>
      <div style="display:flex;justify-content:center">
        <img width="50" height="50" src="${user.googlePeople?.photos[0]?.url}"/>  
        <img width="50" height="50"  src="${user.facebookPeople?.picture.data.url}"/>  
      </div>
    `
    L.marker(e.latlng, { icon: getDefaultLeafletIcon() })
      .addTo(map.value)
      .bindPopup(customPopupHtml)
      .openPopup()
  })

  //4.init point and polygon
  polygonInit()
  pointInit([location.value.latitude, location.value.longitude])
}
onMounted(init)

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
