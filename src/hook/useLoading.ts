import { ElLoading } from 'element-plus'
import type { LoadingOptionsResolved } from 'element-plus'
type Option = Partial<
  Omit<LoadingOptionsResolved, 'target' | 'parent'> & {
    target: string | HTMLElement
    body: boolean
  }
>
export const useLoading = (options: Option = {}) => {
  const defaultOptions: Option = {
    lock: true,
    text: '',
    background: 'rgba(255, 255, 255, 0.5)'
  }
  const _options = Object.assign(defaultOptions, options)
  const getLoading = (option = defaultOptions) => ElLoading.service(option)
  const loadingWith = <T, P extends Array<unknown>>(fn: (...args: P) => Promise<T>) => {
    let loading: any
    const showLoading = (options: Option) => {
      loading = getLoading(options)
    }
    const hideLoading = () => {
      if (loading) {
        loading.close()
      }
    }
    return (...args: Parameters<typeof fn>) => {
      try {
        showLoading(_options)
        return fn(...args)
          .then((res) => {
            hideLoading()
            return res
          })
          .catch((err) => {
            hideLoading()
            throw err
          })
      } catch (err) {
        hideLoading()
        throw err
      }
    }
  }
  return { loadingWith, getLoading }
}
