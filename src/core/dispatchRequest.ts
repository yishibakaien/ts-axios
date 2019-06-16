import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { flattenHeaders } from '../helpers/headers'
import { transform } from './transform'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  precessConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function precessConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest)

  // 这里 config.method 类型断言，可以保证运行时有值
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config

  // 这里可以保证运行时 url 是有值的
  return buildURL(url!, params)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}
