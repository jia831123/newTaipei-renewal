import useGeolocation from '@/service/api/useGeolocation'
import { ref, type Ref } from 'vue'
import { type Map } from 'leaflet'
import * as L from 'leaflet'

const usePolygon = (map: Ref<Map>) => {
  const data = ref()
  const polygon = ref()
  const init = async () => {
    data.value = await useGeolocation()
      .then((res) =>
        res.result.features.map((fea) => [
          ...fea.geometry.coordinates.map((each) => each.map((e) => [e[1], e[0]]))
        ])
      )
      .catch((error) => {
        console.error(error)
        return []
      })
    if (data.value.length) {
      console.log(data.value)
      polygon.value = L.polygon(data.value, { color: 'blue' }).addTo(map.value)
    }
  }
  init()
  return {
    data
  }
}
export default usePolygon
