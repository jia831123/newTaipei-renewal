<template>
  <div id="map" :class="$attrs">
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as L from 'leaflet'
import usePolygon from '../../composables/usePolygon';
import usePoint from '../../composables/usePoint';
import { watch } from 'vue';
import  {
  type Response as UrbanRenewalResponse
} from '@/service/api/useUrbanRenewal'

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
const map = ref()
const location =ref({latitude:0,longitude:0})

const emit = defineEmits<{
  (e:'update:pointData',d:UrbanRenewalResponse):void
}>()
const init = async()=>{
 location.value = await getLocation().catch((e) => ({
  latitude: 25.03746,
  longitude: 121.564558,
}))
map.value  = L.map('map').setView(
   [location.value.latitude, location.value.longitude],
  13
)
L.tileLayer(
  'https://wmts.nlsc.gov.tw/wmts/EMAP/default/GoogleMapsCompatible/{z}/{y}/{x}',
  {
    maxNativeZoom: 20,
    maxZoom: 20,
  }
).addTo(map.value )
console.log('map add locate')
// Add the locate control to the map
L.control.locate().addTo(map.value )
// Handle location found event
//lMap.on('locationfound', function (e) {})
}
onMounted(init)
const{data:polygonData}=usePolygon(map)

const {data:pointData}=usePoint(map,location)
watch(()=>pointData.value,(data)=>{
  if(data) emit('update:pointData',data)
})
</script>
<style scoped>
#map{
height: 500px;
}
#list{
flex-grow: 1;
}
</style>
