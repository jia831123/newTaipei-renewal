import useUrbanRenewal, {
  type RenewalPoint,
  type Response as UrbanRenewalResponse
} from '@/service/api/useUrbanRenewal'
import { getDefaultLeafletIcon } from '@/utils'
import L from 'leaflet'
import 'leaflet.markercluster'
import { watch, type Ref, ref } from 'vue'
interface GeoJson {
  type: 'Feature'
  properties: {
    [key in string]: unknown
  }
  geometry: {
    type: 'Point'
    coordinates: [number, number]
  }
}
function pointToGeoJson(point: RenewalPoint) {
  return {
    type: 'Feature',
    properties: {
      ...point
    },
    geometry: {
      type: 'Point',
      coordinates: [point.longitude, point.latitude]
    }
  }
}
const usePoint = (map: Ref<InstanceType<typeof L.Map> | undefined>) => {
  const data = ref<UrbanRenewalResponse>()
  const feature = ref<GeoJson[]>([])
  const init = async ([lat, lng]: [number, number]) => {
    const result = await useUrbanRenewal({ lng, lat })
    data.value = result
    if (data.value?.result.length && map.value) {
      const markers = L.markerClusterGroup()
      feature.value = data.value.result.map(pointToGeoJson) as unknown as GeoJson[]
      feature.value.forEach((fea) => {
        const marker = L.marker([fea.geometry.coordinates[1], fea.geometry.coordinates[0]], {
          icon: getDefaultLeafletIcon()
        }).bindPopup(`<spn>${fea.properties.stop_name}</span>`)
        markers.addLayer(marker)
      })
      map.value.addLayer(markers)
      //L.geoJSON(feature.value).addTo(map.value)
    }
  }
  // watch(
  //   () => coordinates.value,
  //   async function (newValue, oldValue) {
  //     const result = await useUrbanRenewal({ lng: newValue.longitude, lat: newValue.latitude })
  //     data.value = result
  //     if (data.value?.result.length && map.value) {
  //       const markers = L.markerClusterGroup()
  //       feature.value = data.value.result.map(pointToGeoJson) as unknown as GeoJson[]
  //       feature.value.forEach((fea) => {
  //         const marker = L.marker([fea.geometry.coordinates[1], fea.geometry.coordinates[0]], {
  //           icon: getDefaultLeafletIcon()
  //         }).bindPopup(`<spn>${fea.properties.stop_name}</span>`)
  //         markers.addLayer(marker)
  //       })
  //       map.value.addLayer(markers)
  //       //L.geoJSON(feature.value).addTo(map.value)
  //     }
  //   }
  // )
  return {
    data,
    feature,
    init
  }
}
export default usePoint
