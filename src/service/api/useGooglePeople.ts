import { useRequest } from '@/hook/useRequest'
export type People = {
  resourceName: string
  etag: string
  names: Array<{
    metadata: {
      primary: boolean
      source: {
        type: string
        id: string
      }
      sourcePrimary: boolean
    }
    displayName: string
    familyName: string
    givenName: string
    displayNameLastFirst: string
    unstructuredName: string
  }>
  photos: Array<{
    metadata: {
      primary: boolean
      source: {
        type: string
        id: string
      }
    }
    url: string
  }>
  emailAddresses: Array<{
    metadata: {
      primary: boolean
      verified: boolean
      source: {
        type: string
        id: string
      }
      sourcePrimary: boolean
    }
    value: string
  }>
}
const URL = (accessToken: string) =>
  `https://asia-east1-delta-vial-435710-e5.cloudfunctions.net/google-people?access_token=${accessToken}`
type Response = People
const useGooglePeople = (accessToken: string): Promise<Response> => {
  return useRequest({
    url: URL(accessToken),
    method: 'GET'
  })
}

export default useGooglePeople
