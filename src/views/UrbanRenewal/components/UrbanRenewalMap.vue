<template>
    <div id="map" :class="$attrs">
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import * as L from 'leaflet'

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
        longitude: -0.09,
      })
    }
  })
}
const init = async()=>{
  const location = await getLocation().catch((e) => ({
    latitude: 25.03746,
    longitude: 121.564558,
  }))
  let lMap = L.map('map').setView(
     [location.latitude, location.longitude],
    13
  )
  L.tileLayer(
    'https://wmts.nlsc.gov.tw/wmts/EMAP/default/GoogleMapsCompatible/{z}/{y}/{x}',
    {
      maxNativeZoom: 20,
      maxZoom: 20,
    }
  ).addTo(lMap)
  console.log('map add locate')
  // Add the locate control to the map
  L.control.locate().addTo(lMap)

  // Handle location found event
  //lMap.on('locationfound', function (e) {})
}
onMounted(init)
</script>
<style scoped>
#map{
  height: 500px;
}
#list{
  flex-grow: 1;
}
</style>
