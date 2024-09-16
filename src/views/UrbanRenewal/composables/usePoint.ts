import useUrbanRenewal, {
  type RenewalPoint,
  type Response as UrbanRenewalResponse
} from '@/service/api/useUrbanRenewal'
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
const usePoint = (
  map: Ref<L.Map>,
  coordinates: Ref<{
    longitude: number
    latitude: number
  }>
) => {
  const data = ref<UrbanRenewalResponse>()
  const feature = ref<GeoJson[]>([])
  watch(
    () => coordinates.value,
    async function (newValue, oldValue) {
      const result = await useUrbanRenewal({ lng: newValue.longitude, lat: newValue.latitude })
      data.value = result
      if (data.value?.result.length) {
        const markers = L.markerClusterGroup()
        feature.value = data.value.result.map(pointToGeoJson) as unknown as GeoJson[]
        feature.value.forEach((fea) => {
          const marker = L.marker([
            fea.geometry.coordinates[1],
            fea.geometry.coordinates[0]
          ]).bindPopup(`<spn>${fea.properties.stop_name}</span>`)
          markers.addLayer(marker)
        })
        map.value.addLayer(markers)
        //L.geoJSON(feature.value).addTo(map.value)
      }
    }
  )
  return {
    data,
    feature
  }
}
export default usePoint
