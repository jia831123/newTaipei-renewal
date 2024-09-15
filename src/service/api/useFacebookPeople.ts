import { useRequest } from '@/hook/useRequest'
export type People = {
  id: string
  name: string
  picture: {
    data: {
      height: number
      is_silhouette: boolean
      url: string
      width: number
    }
  }
}
export type Response = People
const URL = (
  accessToken: string
) => `https://us-central1-delta-vial-435710-e5.cloudfunctions.net/facebook-people?access_token=${accessToken}
`
const useFacebookPeople = (accessToken: string): Promise<Response> => {
  return useRequest({
    url: URL(accessToken),
    method: 'GET'
  })
}

export default useFacebookPeople
