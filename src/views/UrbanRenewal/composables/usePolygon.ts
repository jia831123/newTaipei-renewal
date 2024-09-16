import useGeolocation from '@/service/api/useGeolocation'
import { onMounted, ref, type Ref } from 'vue'
import { type Map } from 'leaflet'
import * as L from 'leaflet'

const usePolygon = (map: Ref<InstanceType<typeof L.Map> | undefined>) => {
  const data = ref()
  const polygon = ref()
  const init = async () => {
    console.log('polygon initialization')
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
    console.log(data.value)
    if (data.value.length && map.value) {
      polygon.value = L.polygon(data.value, { color: 'blue' }).addTo(map.value)
    }
  }

  return {
    init,
    data
  }
}
export default usePolygon
