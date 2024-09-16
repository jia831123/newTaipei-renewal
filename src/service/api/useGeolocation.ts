import { useRequest } from '@/hook/useRequest'

export interface Response {
  result: {
    type: string
    name: string
    crs: {
      type: string
      properties: {
        name: string
      }
    }
    features: Array<{
      type: string
      properties: {
        TxtMemo: string
        SHAPE_Area: number
        分區: string
      }
      geometry: {
        type: string
        coordinates: Array<Array<Array<number>>>
      }
    }>
  }
}
const URL = `https://enterprise.oakmega.ai/api/v1/server/xinbei/geolocation-json?directory=tucheng.json&time=${new Date().getTime()}`
function useGeolocation(): Promise<Response> {
  return useRequest({
    method: 'GET',
    url: URL
  })
}
export default useGeolocation
