import Axios, { type AxiosRequestConfig, type Method } from 'axios'

export const useRequest = async <R extends {}, B extends {} = {}>({
  method,
  url,
  data,
  config,
}: {
  method: Method
  url: string
  data?: B
  config?: AxiosRequestConfig
}) => {
  const res = await Axios.request<R>({
    method,
    url,
    data,
    ...config
  })
  return res.data
}

