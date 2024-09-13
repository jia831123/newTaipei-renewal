import { useRequest } from '@/hook/useRequest'

interface renewalPoint {
  id: number
  stop_name: string
  name: string
  longitude: number
  latitude: number
  radius: number
  is_tod: number
  distance: number
}
export interface Response {
  result: renewalPoint[]
  tod: boolean
}
export interface Request {
  lng: number
  lat: number
}
const URL = 'https://enterprise.oakmega.ai/api/v1/server/xinbei/calc-distance'
function useUrbanRenewal(req: Request): Promise<Response> {
  return useRequest({
    method: 'POST',
    url: URL
  })
}
export default useUrbanRenewal
